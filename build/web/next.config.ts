import type { NextConfig } from "next"

// The browser only talks to this origin. /api/* is proxied to the Sawa agents
// (FastAPI). Locally that is uvicorn on :8000; in production, the API deployment.
const API_ORIGIN = process.env.SAWA_API_ORIGIN ?? "http://127.0.0.1:8000"

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_ORIGIN}/api/:path*` }]
  },
}

export default nextConfig
