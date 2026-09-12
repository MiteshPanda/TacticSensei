import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests to FastAPI backend during development only
  async rewrites() {
    if (process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },

  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable React strict mode
  reactStrictMode: true,

  // Automatically create a standalone folder that copies only necessary files for production
  output: "standalone",
};

export default nextConfig;
