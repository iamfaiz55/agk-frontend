
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.agkinfrastructures.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['agkinfrastructures.com', 'www.agkinfrastructures.com', 'localhost:3000', 'localhost:3100']
    }
  }
};

export default nextConfig;
