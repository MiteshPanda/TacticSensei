import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests to FastAPI backend during development only
  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "https://learnfootball-backend.onrender.com")
      .replace(/\/api\/v1\/?$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
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
