import { expect, test, type Page } from "@playwright/test";

const DETAIL_ROUTES = [
  "/trust/use-cases/accelerators",
  "/trust/use-cases/corporate-innovation",
  "/trust/use-cases/crowdfunding",
  "/trust/use-cases/grants-prizes",
  "/trust/use-cases/hackathons",
  "/trust/use-cases/pitch-competitions",
  "/trust/use-cases/tenders",
  "/trust/use-cases/vc-open-calls",
] as const;

function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // Vercel Analytics is intentionally unavailable under local `next start`.
    // Its script 404 is filtered explicitly in response handling below.
    if (/Failed to load resource.*404/i.test(text)) return;
    errors.push(text);
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("response", (response) => {
    if (response.url().includes("/_vercel/insights/script.js")) return;
    if (response.status() >= 400) errors.push(`[${response.status()}] ${response.url()}`);
  });
  return errors;
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("use-case hub keeps its existing media hero", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto("/trust/use-cases");

  const hero = page.locator("#hero-usecases");
  await expect(hero.locator("h1")).toContainText("Make every shortlist easier to explain");
  await expect(hero.locator("video")).toBeVisible();
  await expect(hero.getByRole("link", { name: "See sample output" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Book a workflow call" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth),
  );
  expect(errors).toEqual([]);
});

test("every use-case detail route renders the shared editorial system", async ({ page }) => {
  const errors = trackConsoleErrors(page);

  for (const route of DETAIL_ROUTES) {
    await page.goto(route);

    const hero = page.locator("main > section").first();
    await expect(hero.locator("h1")).toBeVisible();
    await expect(hero.locator(".btn")).toHaveCount(2);

    const reportStack = hero.locator('img[src*="evidence-report-stack"]');
    await expect(reportStack).toBeVisible();
    expect(await reportStack.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

    await expect(page.locator('nav[aria-label="Other EvalLens use cases"] a')).toHaveCount(8);
    await expect(page.locator(".tr-gradient-bridge, .tr-masked-divider")).toHaveCount(0);

    const surfaceSequence = await page.locator("main").evaluate((main) => {
      const sections = Array.from(main.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.tagName === "SECTION",
      );
      const cinemaIndex = sections.findIndex((section) => section.id === "questions-cinema");
      return {
        cinemaIndex,
        darkBeforeCinema: sections
          .slice(0, cinemaIndex)
          .filter((section) => section.classList.contains("ink"))
          .map((section) => section.id || section.className),
        lightAfterCinema: sections
          .slice(cinemaIndex + 1)
          .filter(
            (section) =>
              section.classList.contains("light") || section.classList.contains("soft"),
          )
          .map((section) => section.id || section.className),
      };
    });

    expect(surfaceSequence.cinemaIndex).toBeGreaterThan(0);
    expect(surfaceSequence.darkBeforeCinema).toEqual([]);
    expect(surfaceSequence.lightAfterCinema).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    );
  }

  expect(errors).toEqual([]);
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 430, height: 932 },
]) {
  test(`detail routes stay contained at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = trackConsoleErrors(page);

    for (const route of DETAIL_ROUTES) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        viewport.width,
      );
    }

    expect(errors).toEqual([]);
  });
}
