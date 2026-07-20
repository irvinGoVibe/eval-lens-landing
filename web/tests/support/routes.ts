export const PUBLIC_ROUTES = [
  "/",
  "/blog",
  "/blog/all",
  "/company/about",
  "/company/contact",
  "/demoday",
  "/one-pager",
  "/pricing",
  "/privacy",
  "/product",
  "/product/entry-hub",
  "/product/evidence-based-reports",
  "/product/overview",
  "/product/review-board",
  "/security",
  "/sitemap",
  "/terms",
  "/trust",
  "/trust/consistency-reliability",
  "/trust/methodology",
  "/trust/prompt-injection-safety",
  "/trust/security-privacy",
  "/trust/use-cases",
] as const;

export const KEY_PUBLIC_ROUTES = [
  "/",
  "/product/overview",
  "/trust/methodology",
  "/pricing",
  "/blog",
  "/company/contact",
] as const;

export const PUBLIC_AUTH_ROUTES = ["/admin/login"] as const;

export const PROTECTED_ROUTES = [
  "/admin",
  "/admin/blog/articles",
  "/admin/blog/articles/new",
  "/admin/blog/reposts",
  "/admin/blog/reposts/new",
  "/admin/home/featured",
] as const;
