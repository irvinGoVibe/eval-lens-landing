import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components (Next 16): enables `use cache`, `cacheTag`, `cacheLife`.
  cacheComponents: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wlnkmhxeuwvnyojiksfu.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Versioned static media under public/assets — safe to cache forever;
        // file replacements ship under a new name or ?v= cache-bust.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
