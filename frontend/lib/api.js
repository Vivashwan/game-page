// Server components call the backend directly: on Vercel through the service binding (BACKEND_URL),
// locally through API_URL. In the browser, requests go to /api on the same origin.
const SERVER_BASE = (process.env.BACKEND_URL || process.env.API_URL || "http://127.0.0.1:8010").replace(/\/+$/, "");
const BASE = typeof window === "undefined" ? SERVER_BASE : "";

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
