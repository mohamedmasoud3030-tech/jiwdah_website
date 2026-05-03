import type { Request, Response } from "express";
import * as jose from "jose";
import cookie from "cookie";
import { db } from "@workspace/db";
import { users } from "@workspace/db";
import { eq } from "drizzle-orm";

const SESSION_COOKIE = "kimi_sid";
const SESSION_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function getEnv(key: string): string {
  return process.env[key] ?? "";
}

async function exchangeAuthCode(code: string, redirectUri: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: getEnv("APP_ID"),
    redirect_uri: redirectUri,
    client_secret: getEnv("APP_SECRET"),
  });

  const resp = await fetch(`${getEnv("KIMI_AUTH_URL")}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Token exchange failed (${resp.status}): ${text}`);
  }

  return resp.json() as Promise<{ access_token: string; token_type: string }>;
}

const jwksCache = new Map<string, ReturnType<typeof jose.createRemoteJWKSet>>();

function getJwks() {
  const url = `${getEnv("KIMI_AUTH_URL")}/api/.well-known/jwks.json`;
  if (!jwksCache.has(url)) {
    jwksCache.set(url, jose.createRemoteJWKSet(new URL(url)));
  }
  return jwksCache.get(url)!;
}

async function verifyAccessToken(accessToken: string): Promise<{ userId: string }> {
  const { payload } = await jose.jwtVerify(accessToken, getJwks());
  const userId = payload.user_id as string;
  if (!userId) throw new Error("user_id missing from access token");
  return { userId };
}

async function getUserProfile(accessToken: string) {
  const resp = await fetch(`${getEnv("KIMI_OPEN_URL")}/v1/users/me/profile`, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  if (!resp.ok) return null;
  return resp.json() as Promise<{ user_id: string; name: string; avatar_url: string }>;
}

async function signSessionToken(payload: { unionId: string; clientId: string }): Promise<string> {
  const secret = new TextEncoder().encode(getEnv("APP_SECRET"));
  return new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 year")
    .sign(secret);
}

function isLocalhost(host: string): boolean {
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

export function createOAuthCallbackHandler() {
  return async (req: Request, res: Response) => {
    const { code, state, error } = req.query as Record<string, string>;

    if (error) {
      if (error === "access_denied") return res.redirect("/");
      return res.status(400).json({ error });
    }

    if (!code || !state) {
      return res.status(400).json({ error: "code and state are required" });
    }

    try {
      const redirectUri = Buffer.from(state, "base64").toString();
      const tokenResp = await exchangeAuthCode(code, redirectUri);
      const { userId } = await verifyAccessToken(tokenResp.access_token);
      const profile = await getUserProfile(tokenResp.access_token);

      const ownerUnionId = getEnv("OWNER_UNION_ID");
      const role = (ownerUnionId && userId === ownerUnionId) ? "admin" : "user";

      await db.insert(users).values({
        unionId: userId,
        name: profile?.name,
        avatar: profile?.avatar_url,
        role,
        lastSignInAt: new Date(),
      }).onConflictDoUpdate({
        target: users.unionId,
        set: {
          name: profile?.name,
          avatar: profile?.avatar_url,
          lastSignInAt: new Date(),
          ...(ownerUnionId && userId === ownerUnionId ? { role: "admin" } : {}),
        },
      });

      const token = await signSessionToken({ unionId: userId, clientId: getEnv("APP_ID") });

      const host = req.headers.host || "";
      const localhost = isLocalhost(host);

      res.setHeader(
        "set-cookie",
        cookie.serialize(SESSION_COOKIE, token, {
          httpOnly: true,
          path: "/",
          sameSite: localhost ? "lax" : "none",
          secure: !localhost,
          maxAge: SESSION_MAX_AGE_MS / 1000,
        }),
      );

      return res.redirect("/");
    } catch (err) {
      logger.error({ err }, "OAuth callback failed");
      return res.status(500).json({ error: "OAuth callback failed" });
    }
  };
}

import { logger } from "../lib/logger";
