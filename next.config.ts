import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d112y698adiu2z.cloudfront.net",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
