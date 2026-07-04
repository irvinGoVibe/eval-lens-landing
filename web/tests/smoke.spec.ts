import { test, expect, type Page } from "@playwright/test";

/**
 * Smoke suite — the minimal regression net for a static marketing site with a
 * Supabase-backed blog and a cookie-gated /admin. Asserts render + critical
 * interactions, not animation aesthetics (the hero copy intentionally reveals
 * ~1.5s after the intro video starts, hence generous visibility timeouts).
 */

/** Collect real console errors (ignore benign resource-abort noise). */
function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (/ERR_ABORTED|favicon/i.test(text)) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

test("homepage renders hero and scrolls without console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto("/");
  // Hero h1 stays opacity:0 until the intro choreography adds .hero-ready.
  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible({ timeout: 20_000 });
  await expect(page.locator("body")).toHaveClass(/hero-ready/, { timeout: 20_000 });
  // The homepage locks body scroll until hero-ready — verify it unlocks.
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(600);
  const scrolled = await page.evaluate(() => window.scrollY);
  expect(scrolled).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test("mobile nav opens, navigates, and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only interaction");
  await page.goto("/pricing");
  await page.getByRole("button", { name: "Open menu" }).click();
  const panel = page.getByRole("dialog", { name: "Site navigation" });
  await expect(panel).toBeVisible();
  // sub-links live in collapsed accordion groups — expand Trust first
  await panel.getByRole("button", { name: /Toggle Trust links/i }).click();
  const link = panel.getByRole("link", { name: /Methodology/i }).first();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/trust\/methodology/);
  await expect(panel).toBeHidden({ timeout: 10_000 });
});

test("blog list renders and an article opens", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto("/blog");
  // scope to the page body — the (hidden) global nav also carries /blog/ links
  const articleLink = page
    .locator('main a[href^="/blog/"]:not([href^="/blog/all"]), .blog-wrap a[href^="/blog/"]:not([href^="/blog/all"])')
    .first();
  await expect(articleLink).toBeVisible({ timeout: 15_000 });
  await articleLink.click();
  await expect(page).toHaveURL(/\/blog\/[^/]+$/);
  // target the article's own h1 — during the soft App Router transition the
  // outgoing list page's masthead h1 briefly coexists with it
  await expect(page.locator("h1.article-title")).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(".article-body, article").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("contact page renders its CTA content", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto("/company/contact");
  await expect(page.locator("h1")).toBeVisible({ timeout: 15_000 });
  expect(errors).toEqual([]);
});

test("admin API rejects a wrong password and admin UI is gated", async ({ page, request }) => {
  const res = await request.post("/api/admin/login", {
    data: { password: "wrong-password-smoke-test" },
  });
  // 401 = wrong password; 503 = CMS_PASSWORD not configured in this env.
  // Both mean "no session issued" — the gate holds either way.
  expect([401, 503]).toContain(res.status());
  // Without a session cookie the admin shell must show the login gate,
  // not the CMS chrome.
  await page.goto("/admin");
  await expect(page.locator('input[type="password"]')).toBeVisible({ timeout: 15_000 });
});

test("unknown route returns 404 page with recovery links", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/off the map/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
});

test("every internal link on /sitemap resolves", async ({ page, request }) => {
  test.slow();
  await page.goto("/sitemap");
  const hrefs = await page.$$eval('a[href^="/"]', (as) =>
    Array.from(new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!))),
  );
  expect(hrefs.length).toBeGreaterThan(10);
  const broken: string[] = [];
  for (const href of hrefs) {
    if (href === "/404") continue; // the human sitemap lists the 404 page itself
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
});
