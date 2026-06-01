// Vercel routes API requests through this stable bridge after the workspace build.
import app from "../artifacts/api-server/dist/vercel.mjs";

export default function handler(req, res) {
  const url = new URL(req.url ?? "/", "http://localhost");
  const forwardedPath = url.searchParams.get("__path") ?? "";
  url.searchParams.delete("__path");

  const pathname = forwardedPath ? `/api/${forwardedPath}` : "/api";
  req.url = `${pathname}${url.search}`;

  return app(req, res);
}
