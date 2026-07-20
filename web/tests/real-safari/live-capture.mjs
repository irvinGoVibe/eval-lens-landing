#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sessionId = process.env.SAFARI_SESSION_ID;
const route = process.argv[2] ?? "/";
const slug = process.argv[3] ?? (route.replace(/^\/|\/$/g, "").replaceAll("/", "-") || "home");
const origin = process.env.REAL_SAFARI_ORIGIN ?? "http://192.168.1.4:3405";
const webdriver = process.env.SAFARIDRIVER_URL ?? "http://127.0.0.1:4447";
const outputDir = resolve("test-results/real-safari/live", slug);

if (!sessionId) {
  console.error("SAFARI_SESSION_ID is required.");
  process.exit(2);
}

async function command(path, init = {}) {
  const response = await fetch(`${webdriver}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
    signal: AbortSignal.timeout(60_000),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.value?.error) {
    throw new Error(payload.value?.message ?? `WebDriver request failed with ${response.status}`);
  }
  return payload.value;
}

async function execute(script) {
  return command(`/session/${sessionId}/execute/sync`, {
    method: "POST",
    body: JSON.stringify({ script, args: [] }),
  });
}

const url = new URL(route, origin).toString();
await command(`/session/${sessionId}/url`, {
  method: "POST",
  body: JSON.stringify({ url }),
});

const deadline = Date.now() + 30_000;
while (Date.now() < deadline) {
  if ((await execute("return document.readyState")) === "complete") break;
  await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
}
await new Promise((resolvePromise) => setTimeout(resolvePromise, 2_000));

const audit = await execute(`
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
  };
  const selector = (element) => {
    if (element.id) return '#' + CSS.escape(element.id);
    const parts = [];
    for (let node = element; node && node.nodeType === 1 && parts.length < 5; node = node.parentElement) {
      let part = node.localName;
      if (node.classList.length) part += '.' + [...node.classList].slice(0, 2).map(CSS.escape).join('.');
      parts.unshift(part);
    }
    return parts.join(' > ');
  };
  const details = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      selector: selector(element),
      text: (element.innerText || element.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' ').slice(0, 160),
      rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
      position: getComputedStyle(element).position,
      fontSize: getComputedStyle(element).fontSize,
      zIndex: getComputedStyle(element).zIndex,
    };
  };
  const important = [...document.querySelectorAll('h1, h2, h3, p, a, button, input, select, textarea')]
    .filter(visible)
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= innerHeight * 2;
    })
    .slice(0, 100)
    .map(details);
  const touchTargets = [...document.querySelectorAll('a, button, input, select, textarea, [role="button"]')]
    .filter(visible)
    .map(details)
    .filter(({ rect }) => rect.width < 44 || rect.height < 44)
    .slice(0, 100);
  const fixedOrSticky = [...document.querySelectorAll('body *')]
    .filter(visible)
    .filter((element) => ['fixed', 'sticky'].includes(getComputedStyle(element).position))
    .map(details)
    .slice(0, 50);
  return {
    capturedAt: new Date().toISOString(),
    url: location.href,
    title: document.title,
    userAgent: navigator.userAgent,
    viewport: {
      innerWidth,
      innerHeight,
      visualWidth: visualViewport?.width ?? null,
      visualHeight: visualViewport?.height ?? null,
      dpr: devicePixelRatio,
      screenWidth: screen.width,
      screenHeight: screen.height,
    },
    document: {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    },
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    viewportMeta: document.querySelector('meta[name="viewport"]')?.content ?? null,
    headings: [...document.querySelectorAll('h1, h2, h3')].filter(visible).map(details),
    importantAboveFold: important,
    undersizedTouchTargets: touchTargets,
    smallFormFonts: [...document.querySelectorAll('input, select, textarea')]
      .filter(visible)
      .filter((element) => parseFloat(getComputedStyle(element).fontSize) < 16)
      .map(details),
    fixedOrSticky,
  };
`);

const [screenshot, source] = await Promise.all([
  command(`/session/${sessionId}/screenshot`),
  command(`/session/${sessionId}/source`),
]);

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDir, "screenshot.png"), screenshot, "base64"),
  writeFile(resolve(outputDir, "dom.html"), source),
  writeFile(resolve(outputDir, "audit.json"), JSON.stringify(audit, null, 2)),
]);

console.log(JSON.stringify({ status: "captured", route, outputDir, audit }, null, 2));
