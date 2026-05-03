import type { Request } from "express";
import type { User } from "@workspace/db";
import { db } from "@workspace/db";
import { users } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as jose from "jose";
import cookie from "cookie";

export type TrpcContext = {
  req: Request;
  user?: User;
  db: typeof db;
};

const SESSION_COOKIE = "kimi_sid";

export async function createTrpcContext(req: Request): Promise<TrpcContext> {
  const ctx: TrpcContext = { req, db };

  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies[SESSION_COOKIE];
    if (token) {
      const appSecret = process.env.APP_SECRET || "";
      const secret = new TextEncoder().encode(appSecret);
      const { payload } = await jose.jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });
      const unionId = payload.unionId as string;
      if (unionId) {
        const [user] = await db.select().from(users).where(eq(users.unionId, unionId)).limit(1);
        if (user) ctx.user = user;
      }
    }
  } catch {
    // Auth is optional
  }

  return ctx;
}
