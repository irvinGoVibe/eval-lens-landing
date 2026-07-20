import { expect, type Page, type TestInfo } from "@playwright/test";

export type PageDiagnostics = {
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
};

const benignFailure = /ERR_ABORTED|NS_BINDING_ABORTED|cancelled|favicon/i;

export function capturePageDiagnostics(page: Page): PageDiagnostics {
  const diagnostics: PageDiagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
  };

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (!benignFailure.test(text)) diagnostics.consoleErrors.push(text);
  });

  page.on("pageerror", (error) => diagnostics.pageErrors.push(String(error)));

  page.on("requestfailed", (request) => {
    const detail = `${request.method()} ${request.url()} — ${request.failure()?.errorText ?? "failed"}`;
    if (!benignFailure.test(detail)) diagnostics.failedRequests.push(detail);
  });

  return diagnostics;
}

export async function assertNoCriticalDiagnostics(
  diagnostics: PageDiagnostics,
  testInfo: TestInfo,
) {
  await testInfo.attach("browser-diagnostics", {
    body: JSON.stringify(diagnostics, null, 2),
    contentType: "application/json",
  });

  expect.soft(diagnostics.consoleErrors, "console errors").toEqual([]);
  expect.soft(diagnostics.pageErrors, "page errors").toEqual([]);
  expect.soft(diagnostics.failedRequests, "failed network requests").toEqual([]);
}

export async function stabilizeVisuals(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });
  await page.evaluate(() => {
    document.getAnimations().forEach((animation) => animation.pause());
    document.querySelectorAll("video").forEach((video) => video.pause());
  });
}
