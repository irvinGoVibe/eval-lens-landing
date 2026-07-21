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

test("homepage mobile header replaces Launch App with the burger menu", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveClass(/hero-ready/, { timeout: 20_000 });

  await expect(page.locator(".site-header__cta")).toBeHidden();
  const menuButton = page.locator(".site-header").getByRole("button", {
    name: "Open menu",
  });
  await expect(menuButton).toBeVisible();
  await menuButton.tap();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await expect(page.locator(".mnav__overlay")).toHaveClass(/mnav__overlay--dark/);
  await expect(dialog.getByText("On this page", { exact: true })).toBeVisible();
  await expect(dialog.locator(".mnav__anchors a")).toHaveCount(4);

  await dialog.getByRole("link", { name: "Entry point" }).tap();
  await expect(page).toHaveURL(/#workflow$/);
  await expect(dialog).toBeHidden();
});

test("mobile menu brand returns to the homepage", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile profile only");
  await page.goto("/trust/methodology", { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: "Open menu" }).tap();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await dialog.getByRole("link", { name: "EvalLens home" }).tap();

  await expect(page).toHaveURL(/\/$/);
  await expect(dialog).toBeHidden();
});

test("mobile menu split row highlights as one card while keeping both actions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/trust/methodology", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();

  const group = page.locator(".mnav__group").filter({ hasText: "Product" }).first();
  const row = group.locator(".mnav__row");
  const pageLink = group.locator(".mnav__row-link");
  const accordionButton = group.locator(".mnav__row-toggle");

  await pageLink.hover();
  await page.waitForTimeout(250);
  const hoverStyle = await row.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    shadow: getComputedStyle(element).boxShadow,
  }));
  expect(hoverStyle.background).not.toMatch(/rgba\(0, 0, 0, 0\)|\/ 0\)/);
  expect(hoverStyle.shadow).toContain("inset");
  await expect(pageLink).toHaveAttribute("href", "/product/overview");

  await accordionButton.click();
  await expect(group).toHaveAttribute("data-expanded", "true");
  await expect(accordionButton).toHaveAttribute("aria-expanded", "true");
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

test("partner access modal fits the visible mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 660 });
  await page.goto("/", { waitUntil: "networkidle" });

  await page.locator('[data-partner-access="true"]').click({ noWaitAfter: true });
  const modal = page.locator(".partner-modal[data-open]");
  await expect(modal).toBeVisible();

  const geometry = await modal.evaluate((root) => {
    const panel = root.querySelector<HTMLElement>(".partner-modal__panel")!;
    const close = root.querySelector<HTMLElement>(".partner-modal__close")!;
    const note = root.querySelector<HTMLElement>(".partner-modal__note")!;
    const panelRect = panel.getBoundingClientRect();
    const closeRect = close.getBoundingClientRect();
    const noteRect = note.getBoundingClientRect();
    return {
      viewportHeight: window.innerHeight,
      panelTop: panelRect.top,
      panelBottom: panelRect.bottom,
      closeTop: closeRect.top,
      noteBottom: noteRect.bottom,
      clientHeight: panel.clientHeight,
      scrollHeight: panel.scrollHeight,
    };
  });

  expect(geometry.panelTop).toBeGreaterThanOrEqual(0);
  expect(geometry.panelBottom).toBeLessThanOrEqual(geometry.viewportHeight);
  expect(geometry.closeTop).toBeGreaterThanOrEqual(0);
  expect(geometry.noteBottom).toBeLessThanOrEqual(geometry.panelBottom);
  expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.clientHeight);
});

test("homepage report-demo CTA opens partner access and the final CTA has one action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: /View live report demo/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.getByRole("button", { name: /Close partner access dialog/i }).click();
  const finalActions = page.locator(".cta-band--dark .cta-band__actions");
  await expect(finalActions.getByRole("link", { name: /Book a demo/i })).toHaveCount(1);
  await expect(finalActions.getByRole("link", { name: /See it live/i })).toHaveCount(0);
});

test("mobile step rails swipe through the same stage as their arrows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 402, height: 660 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#wf-rail .step.active")).toHaveAttribute("data-step", "1");
  await expect(page.locator("#sd-rail .step.active")).toHaveAttribute("data-step", "1");

  const swipeLeft = async (selector: string) => {
    await page.locator(selector).evaluate((element) => {
      const dispatchTouch = (type: "touchstart" | "touchend", x: number) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        const touch = { clientX: x, clientY: 120 };
        Object.defineProperty(event, type === "touchstart" ? "touches" : "changedTouches", {
          value: [touch],
        });
        element.dispatchEvent(event);
      };
      dispatchTouch("touchstart", 300);
      dispatchTouch("touchend", 210);
    });
  };

  await swipeLeft("#wf-rail");
  await expect(page.locator("#wf-rail .step.active")).toHaveAttribute("data-step", "2");
  await expect(page.locator("#wf-window")).toHaveAttribute("data-stage", "2");

  await swipeLeft("#sd-rail");
  await expect(page.locator("#sd-rail .step.active")).toHaveAttribute("data-step", "2");
  await expect(page.locator("#sd-window")).toHaveAttribute("data-stage", "2");
});

test("workflow create-entry action advances to the link-ready slide", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("#wf-window")).toHaveAttribute("data-stage", "1");
  await page.locator("#wf-createBtn").click();

  await expect(page.locator("#wf-window")).toHaveAttribute("data-stage", "2");
  await expect(page.locator("#wf-rail .step.active")).toHaveAttribute("data-step", "2");
  await expect(page.locator("#wf-layerA")).toHaveClass(/\bon\b/);
  await expect(page.locator("#wf-linkCard")).toBeVisible();
});

test("tapping either demo window advances its slide", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const tapWindow = async (selector: string) => {
    await page.locator(selector).evaluate((element) => {
      element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  };

  await tapWindow("#wf-window");
  await expect(page.locator("#wf-window")).toHaveAttribute("data-stage", "2");
  await tapWindow("#wf-window");
  await expect(page.locator("#wf-window")).toHaveAttribute("data-stage", "3");

  await tapWindow("#sd-window");
  await expect(page.locator("#sd-window")).toHaveAttribute("data-stage", "2");
  await tapWindow("#sd-window");
  await expect(page.locator("#sd-window")).toHaveAttribute("data-stage", "3");
});

test("mobile workflow cards contain their full wrapped copy", async ({ page }) => {
  // 402px catches the iPhone 16 Pro rail width after the arrow column is
  // subtracted; viewport-based card widths used to overflow this rail by 33px.
  await page.setViewportSize({ width: 402, height: 660 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const selector of ["#wf-rail .step", "#sd-rail .step"]) {
    const cards = page.locator(selector);
    const rail = cards.first().locator("xpath=..");
    const railWidth = await rail.evaluate((element) => element.clientWidth);
    const count = await cards.count();
    for (let index = 0; index < count; index += 1) {
      const geometry = await cards.nth(index).evaluate((card) => {
        const body = card.querySelector<HTMLElement>(".body");
        const description = card.querySelector<HTMLElement>(".desc");
        if (!body || !description) return null;
        const cardRect = card.getBoundingClientRect();
        const bodyRect = body.getBoundingClientRect();
        const descriptionRect = description.getBoundingClientRect();
        return {
          cardWidth: cardRect.width,
          copyFits:
            body.scrollWidth <= body.clientWidth + 1 &&
            description.scrollHeight <= description.clientHeight + 1 &&
            bodyRect.right <= cardRect.right + 1 &&
            descriptionRect.bottom <= cardRect.bottom + 1,
        };
      });
      expect(geometry, `${selector} card ${index + 1} should be measurable`).not.toBeNull();
      expect(
        geometry?.cardWidth ?? Number.POSITIVE_INFINITY,
        `${selector} card ${index + 1} should fit the rail width`,
      ).toBeLessThanOrEqual(railWidth + 1);
      expect(
        geometry?.copyFits,
        `${selector} card ${index + 1} should contain its copy`,
      ).toBe(true);
    }
  }
});

test("mobile unicorn enables calibrated tilt control after the section scroll gesture", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile sensor profile only");
  await page.addInitScript(() => {
    class MockDeviceOrientationEvent extends Event {
      beta: number | null;
      gamma: number | null;

      constructor(
        type: string,
        init: { beta?: number | null; gamma?: number | null } = {},
      ) {
        super(type);
        this.beta = init.beta ?? null;
        this.gamma = init.gamma ?? null;
      }

      static async requestPermission() {
        return "granted" as const;
      }
    }

    Object.defineProperty(window, "DeviceOrientationEvent", {
      configurable: true,
      value: MockDeviceOrientationEvent,
    });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const control = page.locator('[data-gyro-control=""]').first();
  await control.scrollIntoViewIfNeeded();
  await expect(control).toHaveAttribute("data-gyro-state", "needs-permission");
  await page.locator("body").dispatchEvent("touchend");
  await expect(control).toHaveAttribute("data-gyro-state", "calibrating");

  await page.evaluate(() => {
    window.dispatchEvent(
      new DeviceOrientationEvent("deviceorientation", { beta: 80, gamma: 0 }),
    );
    window.dispatchEvent(
      new DeviceOrientationEvent("deviceorientation", { beta: 104, gamma: 28 }),
    );
  });

  await expect(control).toHaveAttribute("data-gyro-state", "active");
  const tilt = await control.evaluate((element) => ({
    x: Number((element as HTMLElement).dataset.gyroX),
    y: Number((element as HTMLElement).dataset.gyroY),
  }));
  // WebKit's emulated screen angle can be 90° while Chromium reports 0°;
  // either mapping must produce a strong, bounded two-axis response.
  expect(Math.abs(tilt.x)).toBeGreaterThanOrEqual(0.8);
  expect(Math.abs(tilt.y)).toBeGreaterThanOrEqual(0.8);
  expect(Math.abs(tilt.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(tilt.y)).toBeLessThanOrEqual(1);
});

test("Entry Hub tonal layers follow their seams with reduced motion", async ({
  page,
}) => {
  await page.goto("/product/entry-hub", { waitUntil: "domcontentloaded" });

  const layers = page.locator(".ds-relight, .ds-redark");
  const seams = page.locator(".ds-zone__flip-seam");
  await expect(layers).toHaveCount(2);
  await expect(seams).toHaveCount(2);

  const seamPositions = await seams.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().top + window.scrollY),
  );
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const threshold = (position: number) => position - viewportHeight / 2;
  const states = [
    { y: threshold(seamPositions[0]) - 100, expected: ["0", "0"] },
    {
      y: (threshold(seamPositions[0]) + threshold(seamPositions[1])) / 2,
      expected: ["1", "0"],
    },
    { y: threshold(seamPositions[1]) + 100, expected: ["1", "1"] },
    {
      y: (threshold(seamPositions[0]) + threshold(seamPositions[1])) / 2,
      expected: ["1", "0"],
    },
    { y: threshold(seamPositions[0]) - 100, expected: ["0", "0"] },
  ];

  for (const state of states) {
    await page.evaluate((y) => window.scrollTo(0, y), state.y);
    await expect
      .poll(() =>
        layers.evaluateAll((elements) =>
          elements.map((element) => getComputedStyle(element).opacity),
        ),
      )
      .toEqual(state.expected);
  }
});

test("Cinema keeps the full web transition with reduced motion", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile cinematic profile");
  await page.goto("/product/evidence-based-reports", {
    waitUntil: "domcontentloaded",
  });

  const video = page
    .locator("video.ds-cinema__vid")
    .filter({ has: page.locator('source[src*="beyond-number-cinema"]') })
    .first();
  const cinema = video.locator("xpath=ancestor::section[contains(@class, 'ds-cinema')]");
  const stage = cinema.locator(".ds-cinema__stage");
  const mobileKnockout = cinema.locator(".ds-cinema__knockout--m");

  await expect(video).toBeAttached();
  const geometry = await cinema.evaluate((section) => {
    const htmlSection = section as HTMLElement;
    return {
      top: htmlSection.getBoundingClientRect().top + window.scrollY,
      height: htmlSection.offsetHeight,
      viewport: window.innerHeight,
    };
  });
  expect(geometry.height).toBeGreaterThanOrEqual(geometry.viewport * 2.9);

  await page.evaluate(
    ({ top, height, viewport }) =>
      window.scrollTo(0, top + (height - viewport) * 0.4),
    geometry,
  );

  await expect
    .poll(() =>
      cinema.evaluate((section) =>
        Number.parseFloat(
          (section as HTMLElement).style.getPropertyValue("--pin") || "0",
        ),
      ),
    )
    .toBeGreaterThan(0.35);
  await expect
    .poll(() =>
      cinema.evaluate((section) =>
        Number.parseFloat(
          (section as HTMLElement).style.getPropertyValue("--pin") || "0",
        ),
      ),
    )
    .toBeLessThan(0.45);

  await expect(stage).toHaveCSS("position", "sticky");
  await expect(video).toHaveCSS("opacity", "1");
  await expect(mobileKnockout).toBeVisible();
  const stageBox = await stage.boundingBox();
  expect(stageBox?.height ?? 0).toBeCloseTo(geometry.viewport, 0);
});

test("Evidence Reports Cinema supporting copy stays in its upper safe zone", async ({
  page,
}) => {
  await page.goto("/product/evidence-based-reports", {
    waitUntil: "domcontentloaded",
  });

  const cinema = page.locator("#beyond");
  const geometry = await cinema.evaluate((section) => ({
    top: section.getBoundingClientRect().top + window.scrollY,
    height: section.clientHeight,
    viewport: window.innerHeight,
  }));

  await page.evaluate(
    ({ top, height, viewport }) =>
      window.scrollTo(0, top + (height - viewport) * 0.9),
    geometry,
  );
  await expect
    .poll(() =>
      cinema.evaluate((section) =>
        Number.parseFloat(
          (section as HTMLElement).style.getPropertyValue("--pin") || "0",
        ),
      ),
    )
    .toBeGreaterThan(0.85);

  const [copyBox, stageBox] = await Promise.all([
    cinema.locator(".ds-cinema__copy").boundingBox(),
    cinema.locator(".ds-cinema__stage").boundingBox(),
  ]);

  expect(copyBox).not.toBeNull();
  expect(stageBox).not.toBeNull();
  expect(copyBox!.y + copyBox!.height).toBeLessThan(
    stageBox!.y + stageBox!.height * 0.34,
  );
});

test("Demo Day stages follow the visible mobile viewport", async ({ page }) => {
  await page.goto("/demoday", { waitUntil: "domcontentloaded" });

  const metrics = await page.evaluate(() => {
    const transition = document.querySelector<HTMLElement>(
      'main > section.band.ink[aria-hidden="true"]',
    );
    const gallery = document.querySelector<HTMLElement>(".lab-gallery__v--expr");
    const liveDemo = document.querySelector<HTMLElement>(
      "#live-demo > .ds-hero__v--media",
    );
    return {
      viewport: innerHeight,
      authoredTransitionHeight: transition?.style.minHeight,
      transition: Number.parseFloat(getComputedStyle(transition!).minHeight),
      gallery: Number.parseFloat(getComputedStyle(gallery!).minHeight),
      liveDemo: Number.parseFloat(getComputedStyle(liveDemo!).minHeight),
    };
  });

  expect(metrics.authoredTransitionHeight).toBe("40svh");
  expect(metrics.transition).toBeCloseTo(metrics.viewport * 0.4, 0);
  expect(metrics.gallery).toBeCloseTo(
    Math.min(820, Math.max(560, metrics.viewport * 0.72)),
    0,
  );
  expect(metrics.liveDemo).toBeCloseTo(
    Math.min(880, Math.max(560, metrics.viewport * 0.82)),
    0,
  );
});

test("DPA sub-processor copy keeps the frozen mobile wrapping", async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 402, height: 660 });
  await page.goto("/dpa", { waitUntil: "domcontentloaded" });

  const metrics = await page.locator("#subprocessors p").evaluate((paragraph) => {
    const style = getComputedStyle(paragraph);
    const height = paragraph.getBoundingClientRect().height;
    const lineHeight = Number.parseFloat(style.lineHeight);
    return {
      lines: Math.round(height / lineHeight),
      letterSpacing: style.letterSpacing,
      webkitSystemFont: CSS.supports("font", "-apple-system-body"),
    };
  });

  expect(metrics.lines).toBe(10);
  if (browserName === "webkit") {
    expect(metrics.webkitSystemFont).toBe(true);
    expect(metrics.letterSpacing).toBe("-0.08px");
  } else {
    expect(metrics.webkitSystemFont).toBe(false);
    expect(metrics.letterSpacing).toBe("normal");
  }
});

test("one-pager trust media reserves its mobile geometry before decode", async ({
  page,
}) => {
  await page.setViewportSize({ width: 402, height: 660 });
  await page.route("**/_next/image?**", async (route) => {
    if (route.request().url().includes("final-decision-human-ranking.webp")) {
      await route.abort();
      return;
    }
    await route.continue();
  });
  await page.goto("/one-pager", { waitUntil: "domcontentloaded" });

  const metrics = await page
    .locator("#trust .lab-bento__media--img")
    .evaluate((image: HTMLImageElement) => {
      const box = image.getBoundingClientRect();
      return {
        naturalWidth: image.naturalWidth,
        width: box.width,
        height: box.height,
      };
    });

  expect(metrics.naturalWidth, "the test must observe the pre-decode state").toBe(0);
  expect(metrics.width).toBeGreaterThan(300);
  expect(metrics.height).toBeCloseTo((metrics.width * 972) / 1619, 0);
});

test("sitemap does not prefetch its intentional 404 destination", async ({ page }) => {
  const requested404s: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname === "/404") requested404s.push(url.href);
  });

  await page.goto("/sitemap", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);

  await expect(page.locator('a[href="/404"]')).toBeVisible();
  expect(requested404s).toEqual([]);
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

test("trust hub avoids automatic RSC prefetch bursts on the LAN QA origin", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile profile only");
  const prefetchedRsc: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.searchParams.has("_rsc")) prefetchedRsc.push(url.href);
  });

  await page.goto("/trust", { waitUntil: "networkidle" });
  await page.locator("#map").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  expect(prefetchedRsc).toEqual([]);
});

test("consistency lazy videos start without aborted reloads", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const failedMedia: string[] = [];
  page.on("requestfailed", (request) => {
    if (request.resourceType() === "media") failedMedia.push(request.url());
  });

  await page.goto("/trust/consistency-reliability", {
    waitUntil: "domcontentloaded",
  });

  for (const selector of [
    "#mechanisms video",
    "#benchmark video",
    ".consistency-honest-edge video",
  ]) {
    const video = page.locator(selector);
    await video.scrollIntoViewIfNeeded();
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState))
      .toBeGreaterThanOrEqual(2);
  }

  expect(failedMedia).toEqual([]);
});

test("non-cinema background videos settle when motion is reduced", async ({ page }) => {
  await page.goto("/trust/consistency-reliability", {
    waitUntil: "domcontentloaded",
  });

  const videos = page.locator("main video:not(.ds-cinema__vid)");
  for (let index = 0; index < (await videos.count()); index += 1) {
    await videos.nth(index).scrollIntoViewIfNeeded();
  }

  await expect
    .poll(() =>
      videos.evaluateAll((elements: HTMLVideoElement[]) =>
        elements.every((video) => video.paused && video.currentTime < 0.05),
      ),
    )
    .toBe(true);
});

test("methodology zone blobs stay static when motion is reduced", async ({
  page,
}) => {
  await page.goto("/trust/methodology", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLElement>(".ds-blob")).every(
      (blob) => Boolean(blob.style.width),
    ),
  );

  const blobs = page.locator(".ds-blob");
  const before = await blobs.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).transform),
  );
  await page.evaluate(() => scrollTo({ top: 8_000, left: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  const after = await blobs.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).transform),
  );

  expect(before.every((transform) => transform === "none")).toBe(true);
  expect(after).toEqual(before);
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
