import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/** Served at /robots.txt via the App Router file convention. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
