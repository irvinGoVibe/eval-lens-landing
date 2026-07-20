import type { Page } from "@playwright/test";

export type InteractionState = {
  id: string;
  prepare(page: Page): Promise<void>;
};

async function dismissPartnerModal(page: Page) {
  const notNow = page.getByRole("button", { name: "Not now" });
  if (await notNow.isVisible().catch(() => false)) await notNow.click();
}

export const homeScenario = {
  async stabilize(page: Page) {
    await page.locator("body.hero-ready").waitFor({ state: "attached", timeout: 20_000 });
    await dismissPartnerModal(page);
  },
  interactionStates: [
    {
      id: "partner-modal-open",
      async prepare(page: Page) {
        await page.evaluate(() => window.scrollTo(0, 0));
        const trigger = page.getByRole("button", { name: /Try live demo/i }).first();
        await trigger.click();
        await page.getByRole("dialog").waitFor({ state: "visible", timeout: 10_000 });
      },
    },
  ] satisfies InteractionState[],
};
