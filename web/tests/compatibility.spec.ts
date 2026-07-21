import { test, expect } from "@playwright/test";
import {
  assertNoCriticalDiagnostics,
  capturePageDiagnostics,
} from "./support/diagnostics";
import { KEY_PUBLIC_ROUTES, PUBLIC_AUTH_ROUTES } from "./support/routes";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of KEY_PUBLIC_ROUTES) {
  test(`${route} renders without browser diagnostics`, async ({ page }, testInfo) => {
    const diagnostics = capturePageDiagnostics(page);
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.status(), `${route} response status`).toBeLessThan(400);
    await expect(page.locator("main, body").first()).toBeVisible();
    await assertNoCriticalDiagnostics(diagnostics, testInfo);
  });
}

test("mobile navigation supports touch-sized controls", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  const box = await menuButton.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

  await expect(page.locator(".mnav__overlay")).toBeAttached();
  await menuButton.tap();
  await expect(page.locator(".mnav__overlay")).toHaveAttribute(
    "data-pointer-focus",
    "true",
  );
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();

  const close = page.getByRole("button", { name: "Close menu" });
  await expect(close).toBeFocused();
  const outline = await close.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).toBe("none");

  await close.tap();
  await expect(menuButton).toBeFocused();
  expect(
    await menuButton.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe("none");

  await menuButton.press("Enter");
  await expect(page.locator(".mnav__overlay")).not.toHaveAttribute(
    "data-pointer-focus",
    "true",
  );
  await expect(close).toBeFocused();
  expect(await close.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe(
    "solid",
  );
});

for (const route of PUBLIC_AUTH_ROUTES) {
  test(`${route} form remains usable on mobile`, async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile profile only");
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const password = page.locator('input[type="password"]');
    await expect(password).toBeVisible();
    await password.focus();
    await expect(password).toBeFocused();

    const fontSize = await password.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    expect(fontSize, "iOS form controls should avoid focus zoom").toBeGreaterThanOrEqual(16);
  });
}

test("viewport metadata opts into safe-area support", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
  expect(viewport).toContain("width=device-width");
  expect(viewport).toContain("viewport-fit=cover");
});

test("homepage reduced-motion heading does not cover the hero", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const heading = page.locator(".scrub-heading");
  await expect(heading).toBeHidden();

  const overlapsHero = await page.evaluate(() => {
    const hero = document.querySelector(".hero-head");
    const scrubHeading = document.querySelector(".scrub-heading");
    if (!hero || !scrubHeading) return false;
    const a = hero.getBoundingClientRect();
    const b = scrubHeading.getBoundingClientRect();
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  });
  expect(overlapsHero).toBe(false);
});

test("homepage primary mobile controls are touch sized", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const selector of [
    ".site-header__cta",
    "#wf-navDown",
    "#sd-navDown",
    ".home-blog__seeall",
    ".news-arrow",
  ]) {
    const control = page.locator(selector).first();
    await expect(control, selector).toBeAttached();
    const box = await control.boundingBox();
    expect(box?.width ?? 0, `${selector} width`).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0, `${selector} height`).toBeGreaterThanOrEqual(44);
  }
});

test("blog rail controls stay above the Safari scroll layer", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/blog", { waitUntil: "domcontentloaded" });

  const next = page.locator(".loop-controls").getByRole("button", { name: "Next" });
  await next.scrollIntoViewIfNeeded();
  const hitIsControl = await next.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
    return Boolean(hit && element.contains(hit));
  });
  expect(hitIsControl).toBe(true);

  await next.tap();
  await expect
    .poll(() => page.locator(".loop-rail").evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(10);
});

test("blog loop deep link closes and clears its URL state", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/blog?loop=earth-day-team", { waitUntil: "domcontentloaded" });

  const modal = page.locator(".loop-modal");
  await expect(modal).toBeVisible();
  const modalGeometry = await modal.evaluate((element) => {
    const panel = element.querySelector(".loop-modal__panel");
    const photo = element.querySelector(".loop-modal__photo");
    const panelRect = panel?.getBoundingClientRect();
    const photoRect = photo?.getBoundingClientRect();
    return {
      viewportHeight: innerHeight,
      panelBottom: panelRect?.bottom ?? Infinity,
      photoHeight: photoRect?.height ?? Infinity,
    };
  });
  expect(modalGeometry.panelBottom).toBeLessThanOrEqual(modalGeometry.viewportHeight);
  expect(modalGeometry.photoHeight).toBeLessThanOrEqual(
    modalGeometry.viewportHeight * 0.47,
  );
  await modal.getByRole("button", { name: "Close" }).tap();
  await expect(modal).toBeHidden();
  await expect(page).toHaveURL(/\/blog$/);
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
    .not.toBe("hidden");
});

test("blog avoids automatic RSC prefetch bursts on the LAN QA origin", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  const prefetchedRsc: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.searchParams.has("_rsc")) prefetchedRsc.push(url.href);
  });

  await page.goto("/blog", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  expect(prefetchedRsc).toEqual([]);
});

test("blog article avoids automatic RSC prefetch bursts on the LAN QA origin", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  const prefetchedRsc: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.searchParams.has("_rsc")) prefetchedRsc.push(url.href);
  });

  await page.goto("/blog/how-to-prepare-for-our-pitch-competition", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(500);

  await page.locator(".blog-section--related").getByRole("link", { name: /See all/ }).tap();
  await expect(page).toHaveURL(/\/blog\/all$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("All News");
  expect(prefetchedRsc).toEqual([]);
});

test("about origin-story CTA opens the published article", async ({ page }) => {
  await page.goto("/company/about", { waitUntil: "domcontentloaded" });

  const originStory = page.getByRole("link", { name: /Read the full story/ });
  await expect(originStory).toHaveAttribute(
    "href",
    "/blog/from-ai-jury-to-evallense",
  );
  await originStory.click();

  await expect(page).toHaveURL(/\/blog\/from-ai-jury-to-evallense$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "From AI Jury to EvalLens: what 400+ runs taught us",
  );
});

test("all-news mobile cards are ready before Safari reaches the fourth story", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/blog/all", { waitUntil: "domcontentloaded" });

  const images = page.locator(".blog-grid .blog-card__img");
  expect(await images.count()).toBeGreaterThanOrEqual(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(images.nth(index)).toHaveAttribute("loading", "eager");
    await expect(images.nth(index)).toHaveAttribute(
      "sizes",
      /calc\(100vw - 40px\)/,
    );
  }

  await page.evaluate(() => scrollTo({ top: 1485, left: 0, behavior: "instant" }));
  await expect
    .poll(() =>
      images.nth(3).evaluate((image) => {
        const element = image as HTMLImageElement;
        return element.complete && element.naturalWidth > 0;
      }),
    )
    .toBe(true);
});

test("all-news filters render and the backlink clears filter state", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");

  for (const [query, heading, articleCount] of [
    ["product", "Product Updates", 1],
    ["research", "Research", 4],
    ["press-release", "Press Releases", 1],
  ] as const) {
    const automaticRsc: string[] = [];
    const onRequest = (request: { url(): string }) => {
      const url = new URL(request.url());
      if (url.searchParams.has("_rsc")) automaticRsc.push(url.href);
    };
    page.on("request", onRequest);
    await page.goto(`/blog/all?${query}`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator(".blog-grid .blog-card")).toHaveCount(articleCount);
    await page.waitForTimeout(300);
    expect(automaticRsc).toEqual([]);
    page.off("request", onRequest);
  }

  await page.getByRole("link", { name: "All News" }).tap();
  await expect(page).toHaveURL(/\/blog\/all$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("All News");
});

test("RSC preflight supports physical Safari on a LAN host", async ({ request }) => {
  const origin = "http://127.0.0.1:3405";
  const response = await request.fetch("/blog?_rsc=physical-safari", {
    method: "OPTIONS",
    headers: {
      Origin: origin,
      "Access-Control-Request-Method": "GET",
      "Access-Control-Request-Headers": "rsc,next-router-state-tree",
      "Access-Control-Request-Private-Network": "true",
    },
  });

  expect(response.status()).toBe(204);
  expect(response.headers()["access-control-allow-origin"]).toBe(origin);
  expect(response.headers()["access-control-allow-credentials"]).toBe("true");
  expect(response.headers()["access-control-allow-private-network"]).toBe("true");
  expect(response.headers()["access-control-max-age"]).toBe("600");
});

test("RSC GET authorizes the exact private-LAN QA origin", async ({ request }) => {
  for (const host of ["192.168.1.4", "physical-qa.local", "physical-qa.local."]) {
    const origin = `http://${host}:3405`;
    const response = await request.get(
      "http://127.0.0.1:3405/blog?_rsc=physical-safari",
      { headers: { Host: `${host}:3405`, Origin: origin, RSC: "1" } },
    );

    expect(response.ok()).toBe(true);
    expect(response.headers()["access-control-allow-origin"]).toBe(origin);
    expect(response.headers()["access-control-allow-credentials"]).toBe("true");
    expect(response.headers()["access-control-allow-private-network"]).toBe("true");
  }
});

test("homepage partner access CTA remains tappable above the problem overlap", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveClass(/hero-ready/, { timeout: 20_000 });

  const trigger = page.getByRole("button", { name: /Try live demo/i }).first();
  const hitTarget = await trigger.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
    return Boolean(hit && element.contains(hit));
  });
  expect(hitTarget).toBe(true);

  await trigger.tap();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("homepage mobile scrub pins, advances, and releases", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const metrics = await page.locator(".scrub-track").evaluate((track) => {
    const rect = track.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: rect.height,
      viewport: window.innerHeight,
    };
  });

  await page.evaluate((y) => window.scrollTo(0, y), metrics.top + 2);
  await expect(page.locator(".scrub-heading")).toBeVisible();

  const pinHeight = await page.locator(".scrub-pin").evaluate(
    (pin) => pin.getBoundingClientRect().height,
  );
  expect(Math.abs(pinHeight - metrics.viewport)).toBeLessThanOrEqual(1);

  await page.evaluate(
    ({ top, height, viewport }) =>
      window.scrollTo(0, top + (height - viewport) * 0.9),
    metrics,
  );
  await expect(page.locator(".scrub-heading")).toBeHidden();
});
