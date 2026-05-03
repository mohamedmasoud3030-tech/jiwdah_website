import type { Request, Response } from "express";
import type { User } from "@workspace/db";
import { db } from "@workspace/db";
import { createAuthContext } from "../middleware/auth";

export type TrpcContext = {
  req: Request;
  res: Response;
  user?: User;
  db: typeof db;
};

export async function createTrpcContext(req: Request, res: Response): Promise<TrpcContext> {
  const { user } = await createAuthContext(req);
  return { req, res, db, user };
}

export { SESSION_COOKIE } from "../middleware/auth";
