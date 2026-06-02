type UploadResponse = { objectPath: string; filename: string };

export async function uploadProjectMedia(file: File) {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/upload", { method: "POST", body, credentials: "include" });
  const payload = await response.json() as UploadResponse | { error?: string };
  if (!response.ok || !("objectPath" in payload)) throw new Error("error" in payload ? payload.error || "Upload failed" : "Upload failed");
  return new URL(payload.objectPath, window.location.origin).toString();
}
