import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke/e2e config. Runs against a PRODUCTION build (`next start`) on a
 * dedicated port (3405) so it never collides with the dev server pinned to
 * 3005. CI builds with BLOG_SOURCE=static (no Supabase env needed there).
 * Local: run `pnpm build` first, then `pnpm test:e2e`.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3405",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    // browserName forced: only chromium is installed locally/CI; the
    // device preset otherwise defaults to webkit.
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm exec next start --port 3405",
    port: 3405,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
