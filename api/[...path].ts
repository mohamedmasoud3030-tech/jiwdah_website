const apiBundle = "../artifacts/api-server/dist/vercel.mjs";

type AnyRequest = Parameters<NonNullable<unknown extends never ? never : (req: any, res: any) => unknown>>[0];
type AnyResponse = Parameters<NonNullable<unknown extends never ? never : (req: any, res: any) => unknown>>[1];

export default async function handler(req: AnyRequest, res: AnyResponse) {
  const mod = await import(apiBundle);
  return mod.default(req, res);
}
