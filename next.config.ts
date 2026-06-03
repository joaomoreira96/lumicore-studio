import type { NextConfig } from "next";
import { ASSET_VERSION } from "./src/lib/constants";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async headers() {
    const logoCache = `public, max-age=31536000, immutable`;
    return [
      {
        source: "/LumicoreStudioLogo.png",
        headers: [
          { key: "Cache-Control", value: logoCache },
          { key: "X-Asset-Version", value: ASSET_VERSION },
        ],
      },
      {
        source: "/LumicoreStudioSuperMinimalistLogo.png",
        headers: [
          { key: "Cache-Control", value: logoCache },
          { key: "X-Asset-Version", value: ASSET_VERSION },
        ],
      },
    ];
  },
};

export default nextConfig;
