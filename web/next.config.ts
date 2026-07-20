import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components (Next 16): enables `use cache`, `cacheTag`, `cacheLife`.
  cacheComponents: true,
  // Physical-device QA reaches the user-owned dev server over the local Wi-Fi
  // address. Next blocks cross-origin dev chunks/HMR unless that LAN hostname
  // is explicitly trusted, which leaves Safari with server HTML but no React
  // hydration. This setting is development-only inside Next.js.
  allowedDevOrigins: ["192.168.*.*"],
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
