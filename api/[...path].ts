import type { IncomingMessage, ServerResponse } from "node:http";

const apiBundle = "../artifacts/api-server/dist/vercel.mjs";

type VercelRequest = IncomingMessage & {
  query?: Record<string, string | string[]>;
};

type VercelResponse = ServerResponse;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mod = await import(apiBundle);
  return mod.default(req, res);
}
