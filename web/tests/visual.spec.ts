import { test, expect } from "@playwright/test";
import { stabilizeVisuals } from "./support/diagnostics";

test("homepage mobile compatibility baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveClass(/hero-ready/, { timeout: 20_000 });
  await page.addStyleTag({
    content: `
      #hero .hero-media-stack,
      #hero .hero-unicorn-wrap,
      #hero .hero-splashes { visibility: hidden !important; }
    `,
  });
  await stabilizeVisuals(page);
  await expect(page).toHaveScreenshot("homepage-mobile.png", {
    fullPage: false,
    animations: "disabled",
    caret: "hide",
    scale: "css",
  });
});
