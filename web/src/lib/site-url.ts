/**
 * Canonical site origin for absolute URLs (metadataBase, sitemap, robots,
 * JSON-LD). Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override (set in Vercel env when the
 *      custom domain is attached);
 *   2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel at build time;
 *   3. localhost fallback for local builds.
 * Server/build-time only — no secrets involved.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3005");
