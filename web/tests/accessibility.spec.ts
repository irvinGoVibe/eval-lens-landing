import axe, { type AxeResults } from "axe-core";
import { test, expect } from "@playwright/test";

const routes = ["/", "/pricing", "/admin/login"] as const;

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`${route} has no serious or critical axe violations`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.addScriptTag({ content: axe.source });
    const results = await page.evaluate<AxeResults, string[]>((tags) => {
      const axeWindow = window as unknown as {
        axe: {
          run: (
            context: Document,
            options: { runOnly: { type: "tag"; values: string[] } },
          ) => Promise<AxeResults>;
        };
      };
      return axeWindow.axe.run(document, {
        runOnly: { type: "tag", values: tags },
      });
    }, ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
    const blocking = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    await testInfo.attach("axe-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });
    expect(blocking).toEqual([]);
  });
}
