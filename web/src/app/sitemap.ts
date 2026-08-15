import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog.server";
import { SITE_URL } from "@/lib/site-url";

/**
 * Machine sitemap (served at /sitemap.xml via the App Router file convention).
 * Static marketing routes + dynamic blog articles from the CMS. The human
 *-readable /sitemap page, /admin/* and /api/* are intentionally excluded.
 */

/** Every live static route. Keep in sync with src/lib/site-nav.ts. */
const STATIC_ROUTES = [
  "/",
  "/product",
  "/product/overview",
  "/product/entry-hub",
  "/product/evidence-based-reports",
  "/product/review-board",
  "/trust",
  "/trust/methodology",
  "/trust/use-cases",
  "/trust/use-cases/pitch-competitions",
  "/trust/use-cases/vc-open-calls",
  "/trust/use-cases/angel-networks",
  "/trust/use-cases/accelerators",
  "/trust/use-cases/corporate-innovation",
  "/trust/use-cases/grants-prizes",
  "/trust/use-cases/crowdfunding",
  "/trust/use-cases/tenders",
  "/trust/consistency-reliability",
  "/trust/prompt-injection-safety",
  "/trust/security-privacy",
  "/pricing",
  "/company/about",
  "/company/contact",
  "/one-pager",
  "/blog",
  "/blog/all",
  "/privacy",
  "/terms",
  "/security",
  "/cookies",
  "/dpa",
  "/subprocessors",
  "/acceptable-use",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path === "/blog" || path === "/blog/all" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog") ? 0.6 : 0.7,
  }));

  // Blog articles from the CMS; a CMS outage must not break the whole build.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "yearly",
      priority: 0.5,
    }));
  } catch {
    // sitemap still serves the static routes
  }

  return [...staticEntries, ...postEntries];
}
