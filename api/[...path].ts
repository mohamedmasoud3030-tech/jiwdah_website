import type { VercelRequest, VercelResponse } from "@vercel/node";

const apiBundle = "../artifacts/api-server/dist/vercel.mjs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mod = await import(apiBundle);
  return mod.default(req, res);
}
