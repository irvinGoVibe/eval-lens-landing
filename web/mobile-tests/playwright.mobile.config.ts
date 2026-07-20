import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const testPort = Number(process.env.PLAYWRIGHT_PORT ?? 3405);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${testPort}`;
const runId = process.env.MOBILE_QA_RUN_ID ?? new Date().toISOString().replace(/[:.]/g, "-");
const runRoot = path.resolve("mobile-tests", "runs", runId);

export default defineConfig({
  testDir: ".",
  testMatch: "mobile-audit.spec.ts",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ["list"],
    ["html", { outputFolder: path.join(runRoot, "html-report"), open: "never" }],
  ],
  outputDir: path.join(runRoot, "artifacts"),
  use: {
    baseURL,
    locale: "en-US",
    timezoneId: "Asia/Ho_Chi_Minh",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "mobile-qa-chromium",
      use: { ...devices["iPhone 13"], browserName: "chromium" },
    },
    {
      name: "mobile-qa-webkit",
      use: { ...devices["iPhone 13"], browserName: "webkit" },
    },
  ],
  webServer: {
    command: `pnpm exec next start --port ${testPort}`,
    cwd: path.resolve("."),
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
