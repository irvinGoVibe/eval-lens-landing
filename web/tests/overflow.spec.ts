import { test, expect } from "@playwright/test";
import { KEY_PUBLIC_ROUTES } from "./support/routes";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

type OverflowFinding = {
  selector: string;
  left: number;
  right: number;
  width: number;
  position: string;
  overflowX: string;
};

for (const route of KEY_PUBLIC_ROUTES) {
  test(`${route} has no horizontal document overflow`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const result = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const selectorFor = (element: Element) => {
        if (element.id) return `#${CSS.escape(element.id)}`;
        const classes = Array.from(element.classList).slice(0, 3).map(CSS.escape);
        return `${element.tagName.toLowerCase()}${classes.length ? `.${classes.join(".")}` : ""}`;
      };

      const findings: OverflowFinding[] = [];
      for (const element of Array.from(document.body.querySelectorAll("*"))) {
        if (element.matches("script, style, link, meta, svg defs *, [aria-hidden='true']")) continue;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") continue;
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (rect.width > viewportWidth + 1 || rect.left < -1 || rect.right > viewportWidth + 1) {
          findings.push({
            selector: selectorFor(element),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            position: style.position,
            overflowX: style.overflowX,
          });
        }
        if (findings.length >= 50) break;
      }

      return {
        viewportWidth,
        documentWidth: document.documentElement.scrollWidth,
        findings,
      };
    });

    await testInfo.attach("overflow-findings", {
      body: JSON.stringify({ route, ...result }, null, 2),
      contentType: "application/json",
    });

    expect(result.documentWidth, "documentElement.scrollWidth").toBeLessThanOrEqual(
      result.viewportWidth + 1,
    );
  });
}
