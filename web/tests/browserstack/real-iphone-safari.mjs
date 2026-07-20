#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const targetUrl = process.env.BROWSERSTACK_URL;

const missing = [
  ["BROWSERSTACK_USERNAME", username],
  ["BROWSERSTACK_ACCESS_KEY", accessKey],
  ["BROWSERSTACK_URL", targetUrl],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  console.error(`BrowserStack smoke skipped: missing ${missing.join(", ")}.`);
  process.exit(2);
}

const auth = Buffer.from(`${username}:${accessKey}`).toString("base64");
const webdriver = "https://hub-cloud.browserstack.com/wd/hub";
const headers = { Authorization: `Basic ${auth}`, "Content-Type": "application/json" };
let sessionId;

async function command(path, init = {}) {
  const response = await fetch(`${webdriver}${path}`, {
    ...init,
    headers: { ...headers, ...init.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.value?.error) {
    throw new Error(payload.value?.message ?? `WebDriver request failed with ${response.status}`);
  }
  return payload.value;
}

try {
  const value = await command("/session", {
    method: "POST",
    body: JSON.stringify({
      capabilities: {
        alwaysMatch: {
          browserName: "Safari",
          platformName: "iOS",
          "bstack:options": {
            deviceName: process.env.BROWSERSTACK_DEVICE ?? "iPhone 15",
            osVersion: process.env.BROWSERSTACK_OS_VERSION ?? "17",
            realMobile: "true",
            local: process.env.BROWSERSTACK_LOCAL ?? "false",
            projectName: "EvalLens Safari Compatibility",
            sessionName: "real iPhone Safari smoke",
          },
        },
      },
    }),
  });
  sessionId = value.sessionId;

  await command(`/session/${sessionId}/url`, {
    method: "POST",
    body: JSON.stringify({ url: targetUrl }),
  });
  const title = await command(`/session/${sessionId}/title`);
  const screenshot = await command(`/session/${sessionId}/screenshot`);
  const outputDir = resolve("test-results/browserstack");
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, "real-iphone-safari.png"), screenshot, "base64");
  console.log(JSON.stringify({ status: "passed", title, sessionId }, null, 2));
} finally {
  if (sessionId) {
    await command(`/session/${sessionId}`, { method: "DELETE" }).catch(() => undefined);
  }
}
