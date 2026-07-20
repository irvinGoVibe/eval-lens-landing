import { defineConfig, devices } from "@playwright/test";

const testPort = Number(process.env.PLAYWRIGHT_PORT ?? 3405);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${testPort}`;

const desktopViewport = { width: 1440, height: 900 };
const pairedMobileViewport = { width: 390, height: 844 };

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  outputDir: "test-results/playwright",
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}{ext}",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    locale: "en-US",
    timezoneId: "Asia/Ho_Chi_Minh",
    serviceWorkers: "block",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: desktopViewport },
    },
    {
      name: "desktop-firefox",
      use: { ...devices["Desktop Firefox"], viewport: desktopViewport },
    },
    {
      name: "desktop-webkit",
      use: { ...devices["Desktop Safari"], viewport: desktopViewport },
    },
    {
      name: "mobile-chromium",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        viewport: pairedMobileViewport,
      },
    },
    {
      name: "mobile-webkit",
      use: {
        ...devices["iPhone 13"],
        browserName: "webkit",
        viewport: pairedMobileViewport,
      },
    },
    { name: "iphone-se", use: { ...devices["iPhone SE"] } },
    { name: "iphone-13", use: { ...devices["iPhone 13"] } },
    { name: "iphone-14-pro", use: { ...devices["iPhone 14 Pro"] } },
    {
      name: "iphone-14-pro-max",
      use: { ...devices["iPhone 14 Pro Max"] },
    },
    { name: "ipad-mini", use: { ...devices["iPad Mini"] } },
    { name: "ipad", use: { ...devices["iPad (gen 11)"] } },
  ],
  webServer: {
    command: `pnpm exec next start --port ${testPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
