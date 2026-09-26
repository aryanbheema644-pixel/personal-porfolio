import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // the dev filesystem cache kept serving stale globals.css
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
