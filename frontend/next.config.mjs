const API_URL = process.env.API_URL || "http://127.0.0.1:8010";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Browser requests to /api/* are proxied to the FastAPI backend, so no CORS setup is needed in dev.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
