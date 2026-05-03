import type { Request } from "express";
import type { User } from "@workspace/db";
import { db } from "@workspace/db";
import { users } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as jose from "jose";
import cookie from "cookie";

export const SESSION_COOKIE = "kimi_sid";
export const SESSION_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export type AuthContext = {
  user?: User;
};

export async function createAuthContext(req: Request): Promise<AuthContext> {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies[SESSION_COOKIE];
    if (!token) return {};

    const appSecret = process.env.APP_SECRET || "";
    const secret = new TextEncoder().encode(appSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    const unionId = payload.unionId as string;
    if (!unionId) return {};

    const [user] = await db.select().from(users).where(eq(users.unionId, unionId)).limit(1);
    return user ? { user } : {};
  } catch {
    return {};
  }
}

export async function signSessionToken(payload: { unionId: string; clientId: string }): Promise<string> {
  const appSecret = process.env.APP_SECRET || "";
  const secret = new TextEncoder().encode(appSecret);
  return new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 year")
    .sign(secret);
}
