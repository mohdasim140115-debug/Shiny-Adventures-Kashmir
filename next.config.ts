import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  // Add permanent redirects here if any previously published URL changes, e.g.
  // { source: "/tour-packages", destination: "/packages", permanent: true }
  async redirects() {
    return [];
  },
};

export default nextConfig;
