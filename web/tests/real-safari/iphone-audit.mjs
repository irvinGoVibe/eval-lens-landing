#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const command = args[0]?.startsWith("--") ? "audit" : (args.shift() ?? "audit");

function option(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
}

function localIPv4() {
  for (const entries of Object.values(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === "IPv4" && !entry.internal && !entry.address.startsWith("169.254.")) {
        return entry.address;
      }
    }
  }
  return undefined;
}

function listIPhones() {
  const xctrace = spawnSync("xcrun", ["xctrace", "list", "devices"], { encoding: "utf8" });
  const activeSection = (xctrace.stdout ?? "").split("== Devices Offline ==")[0];
  const activeUdids = new Set(
    [...activeSection.matchAll(/\(([0-9A-F-]{20,})\)$/gim)].map((match) => match[1].toLowerCase()),
  );
  const result = spawnSync(
    "xcrun",
    ["devicectl", "list", "devices", "--quiet", "--json-output", "-"],
    { encoding: "utf8" },
  );
  try {
    const payload = JSON.parse(result.stdout ?? "{}");
    return (payload.result?.devices ?? [])
      .filter((candidate) => candidate.hardwareProperties?.deviceType === "iPhone")
      .map((candidate) => {
        const connectionState = candidate.connectionProperties?.tunnelState ?? "unknown";
        const udid = candidate.hardwareProperties?.udid;
        return {
          name: candidate.deviceProperties?.name,
          model: candidate.hardwareProperties?.marketingName,
          version: candidate.deviceProperties?.osVersionNumber,
          udid,
          state: activeUdids.has(udid?.toLowerCase()) ? "available" : "offline",
          connectionState,
          pairingState: candidate.connectionProperties?.pairingState,
          developerMode: candidate.deviceProperties?.developerModeStatus,
        };
      });
  } catch {
    return [];
  }
}

const ip = localIPv4();
const targetUrl = option("url", process.env.REAL_SAFARI_URL ?? (ip ? `http://${ip}:3005/` : undefined));
const requestedDevice = option("device", process.env.REAL_SAFARI_DEVICE_UDID);
const port = Number(option("port", process.env.SAFARIDRIVER_PORT ?? "4445"));
const outputDir = resolve(option("output", "test-results/real-safari"));
const diagnose = process.env.SAFARIDRIVER_DIAGNOSE !== "false";
const devices = listIPhones();
const device = requestedDevice
  ? devices.find((candidate) => candidate.udid.toLowerCase() === requestedDevice.toLowerCase())
  : devices.find((candidate) => candidate.state === "available");

async function canReach(url) {
  if (!url) return false;
  try {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(5_000) });
    return response.status < 500;
  } catch {
    return false;
  }
}

function printDoctor(targetReachableFromMac) {
  console.log(
    JSON.stringify(
      {
        safaridriver: "/usr/bin/safaridriver",
        targetUrl,
        targetReachableFromMac,
        devices,
        selectedDevice: device ?? null,
        requiredPhoneSettings: [
          "Settings > Apps > Safari > Advanced > Web Inspector",
          "Settings > Apps > Safari > Advanced > Remote Automation",
          "Trust this computer and keep the iPhone unlocked",
        ],
      },
      null,
      2,
    ),
  );
}

async function webdriver(baseUrl, path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
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

async function waitForDriver(baseUrl) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      await webdriver(baseUrl, "/status");
      return;
    } catch {
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
    }
  }
  throw new Error("safaridriver did not become ready within 15 seconds");
}

async function execute(baseUrl, sessionId, script, args = []) {
  return webdriver(baseUrl, `/session/${sessionId}/execute/sync`, {
    method: "POST",
    body: JSON.stringify({ script, args }),
  });
}

if (command === "doctor") {
  const targetReachableFromMac = await canReach(targetUrl);
  printDoctor(targetReachableFromMac);
  process.exit(device && targetReachableFromMac ? 0 : 2);
}

if (command !== "audit") {
  console.error(`Unknown command: ${command}. Use "doctor" or "audit".`);
  process.exit(2);
}

if (!targetUrl) {
  console.error("No LAN URL found. Pass --url or set REAL_SAFARI_URL.");
  process.exit(2);
}

if (!device) {
  console.error("No available physical iPhone found. Connect, unlock, trust the Mac, and rerun pnpm test:safari:iphone:doctor.");
  console.error(JSON.stringify({ devices }, null, 2));
  process.exit(2);
}

if (!(await canReach(targetUrl))) {
  console.error(`The target is not reachable from the Mac: ${targetUrl}`);
  process.exit(2);
}

const baseUrl = `http://127.0.0.1:${port}`;
const driverArgs = [...(diagnose ? ["--diagnose"] : []), "--port", String(port)];
const driver = spawn("/usr/bin/safaridriver", driverArgs, {
  stdio: ["ignore", "pipe", "pipe"],
});
let driverLog = "";
let sessionId;

driver.stdout.on("data", (chunk) => (driverLog += chunk.toString()));
driver.stderr.on("data", (chunk) => (driverLog += chunk.toString()));

try {
  await waitForDriver(baseUrl);
  const wakeDevice = spawnSync(
    "xcrun",
    ["devicectl", "device", "info", "lockState", "--device", device.udid, "--timeout", "10"],
    { encoding: "utf8" },
  );
  if (wakeDevice.status !== 0 || /passcodeRequired:\s*true/i.test(wakeDevice.stdout ?? "")) {
    throw new Error(
      `The iPhone is locked or its CoreDevice tunnel could not be activated.\n${wakeDevice.stdout ?? ""}${wakeDevice.stderr ?? ""}`,
    );
  }
  const session = await webdriver(baseUrl, "/session", {
    method: "POST",
    body: JSON.stringify({
      capabilities: {
        alwaysMatch: {
          browserName: "Safari",
          platformName: "iOS",
          "safari:deviceType": "iPhone",
          "safari:deviceUDID": device.udid,
          "safari:useSimulator": false,
          "safari:automaticInspection": true,
          "safari:diagnose": diagnose,
        },
      },
    }),
  });
  sessionId = session.sessionId;

  await webdriver(baseUrl, `/session/${sessionId}/url`, {
    method: "POST",
    body: JSON.stringify({ url: targetUrl }),
  });

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const readyState = await execute(baseUrl, sessionId, "return document.readyState");
    if (readyState === "complete") break;
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  await new Promise((resolvePromise) => setTimeout(resolvePromise, 1_000));

  const audit = await execute(
    baseUrl,
    sessionId,
    `
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
      const viewport = { width: innerWidth, height: innerHeight, dpr: devicePixelRatio };
      const oversizedElements = [...document.querySelectorAll('body *')]
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.right > innerWidth + 1 || rect.left < -1 || rect.width > innerWidth + 1)
        .slice(0, 50)
        .map(({ element, rect }) => ({
          selector: selector(element),
          tag: element.localName,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          scrollWidth: element.scrollWidth,
          overflowX: getComputedStyle(element).overflowX,
        }));
      const undersizedTouchTargets = [...document.querySelectorAll('a, button, input, select, textarea, [role="button"]')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
        })
        .slice(0, 50)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { selector: selector(element), width: Math.round(rect.width), height: Math.round(rect.height) };
        });
      const smallFormFonts = [...document.querySelectorAll('input, select, textarea')]
        .filter((element) => parseFloat(getComputedStyle(element).fontSize) < 16)
        .map((element) => ({ selector: selector(element), fontSize: getComputedStyle(element).fontSize }));
      return {
        url: location.href,
        title: document.title,
        userAgent: navigator.userAgent,
        viewport,
        screen: { width: screen.width, height: screen.height, orientation: screen.orientation?.type ?? null },
        document: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth },
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
        oversizedElements,
        undersizedTouchTargets,
        smallFormFonts,
        viewportMeta: document.querySelector('meta[name="viewport"]')?.content ?? null,
        safeAreaProbe: getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top').trim() || null,
      };
    `,
  );
  const screenshot = await webdriver(baseUrl, `/session/${sessionId}/screenshot`);
  const source = await webdriver(baseUrl, `/session/${sessionId}/source`);
  const report = {
    capturedAt: new Date().toISOString(),
    device,
    capabilities: session.capabilities,
    audit,
    limitations: [
      "Classic Safari WebDriver does not expose complete console and network logs; use Safari Web Inspector alongside this session.",
      "The automation session is isolated from personal Safari tabs and browsing data.",
    ],
  };

  await mkdir(outputDir, { recursive: true });
  await Promise.all([
    writeFile(resolve(outputDir, "iphone-safari.png"), screenshot, "base64"),
    writeFile(resolve(outputDir, "iphone-safari-dom.html"), source),
    writeFile(resolve(outputDir, "iphone-safari-report.json"), JSON.stringify(report, null, 2)),
  ]);
  console.log(JSON.stringify({ status: "passed", outputDir, ...report }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  if (/enable|automation|permission|not authorized/i.test(`${error}\n${driverLog}`)) {
    console.error("Enable Apple WebDriver once with: /usr/bin/safaridriver --enable");
  }
  if (driverLog.trim()) console.error(driverLog.trim());
  process.exitCode = 1;
} finally {
  if (sessionId) {
    await webdriver(baseUrl, `/session/${sessionId}`, { method: "DELETE" }).catch(() => undefined);
  }
  driver.kill("SIGTERM");
}
