import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components (Next 16): enables `use cache`, `cacheTag`, `cacheLife`.
  cacheComponents: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wlnkmhxeuwvnyojiksfu.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
};

export default nextConfig;
