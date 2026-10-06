// Server components call the backend directly; client components go through the /api rewrite.
const BASE = typeof window === "undefined" ? process.env.API_URL || "http://127.0.0.1:8010" : "";

export class ApiError extends Error {
  constructor(status, detail) {
    super(typeof detail === "string" ? detail : `Request failed (${status})`);
    this.status = status;
  }
}

export async function api(path, { params, ...init } = {}) {
  const qs = params
    ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== "")).toString()
    : "";
  const res = await fetch(`${BASE}/api${path}${qs}`, { cache: "no-store", ...init });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail);
  }
  return res.json();
}

// Local calendar date -> "YYYY-MM-DD" (toISOString would shift to UTC).
export const isoDate = (d) =>
  d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : null;
