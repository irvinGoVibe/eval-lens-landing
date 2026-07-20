#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { networkInterfaces } from "node:os";

const argv = process.argv.slice(2);
const command = argv[0]?.startsWith("--") ? "doctor" : (argv.shift() ?? "doctor");

function option(name, fallback) {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
}

function isPrivateIPv4(address) {
  return (
    address.startsWith("10.") ||
    address.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(address)
  );
}

function lanIPv4() {
  const candidates = [];
  for (const [name, entries] of Object.entries(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family !== "IPv4" || entry.internal || entry.address.startsWith("169.254.")) continue;
      candidates.push({ name, address: entry.address });
    }
  }
  return (
    candidates.find(({ name, address }) => name === "en0" && isPrivateIPv4(address)) ??
    candidates.find(({ address }) => isPrivateIPv4(address)) ??
    candidates[0]
  )?.address;
}

function listIPhones() {
  const result = spawnSync(
    "xcrun",
    ["devicectl", "list", "devices", "--quiet", "--json-output", "-"],
    { encoding: "utf8" },
  );
  try {
    const payload = JSON.parse(result.stdout || "{}");
    return (payload.result?.devices ?? [])
      .filter((candidate) => candidate.hardwareProperties?.deviceType === "iPhone")
      .map((candidate) => ({
        name: candidate.deviceProperties?.name,
        model: candidate.hardwareProperties?.marketingName,
        osVersion: candidate.deviceProperties?.osVersionNumber,
        udid: candidate.hardwareProperties?.udid,
        pairingState: candidate.connectionProperties?.pairingState,
        tunnelState: candidate.connectionProperties?.tunnelState,
        developerMode: candidate.deviceProperties?.developerModeStatus,
      }));
  } catch {
    return [];
  }
}

async function request(url, init = {}, timeout = 12_000) {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
    signal: AbortSignal.timeout(timeout),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.value?.error) {
    throw new Error(payload.value?.message || `Request failed with ${response.status}`);
  }
  return payload.value;
}

async function reachable(url) {
  try {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(5_000) });
    return response.status < 500;
  } catch {
    return false;
  }
}

async function waitForDriver(baseUrl) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      await request(`${baseUrl}/status`, {}, 1_000);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("safaridriver did not become ready within 15 seconds");
}

const appPort = Number(option("port", process.env.PHYSICAL_IPHONE_APP_PORT || "3405"));
const driverPort = Number(option("driver-port", process.env.SAFARIDRIVER_PORT || "4450"));
const discoveredIp = lanIPv4();
const targetUrl = option(
  "url",
  process.env.PHYSICAL_IPHONE_URL || (discoveredIp ? `http://${discoveredIp}:${appPort}/` : undefined),
);
const requestedDevice = option("device", process.env.REAL_SAFARI_DEVICE_UDID);
const devices = listIPhones();
const device = requestedDevice
  ? devices.find((candidate) => candidate.udid?.toLowerCase() === requestedDevice.toLowerCase())
  : devices.find((candidate) => candidate.pairingState === "paired") ?? devices[0];

if (!targetUrl) {
  console.error("No LAN IPv4 address found. Pass --url explicitly.");
  process.exit(2);
}

const targetReachableFromMac = await reachable(targetUrl);
const common = {
  command,
  targetUrl,
  targetReachableFromMac,
  selectedDevice: device ?? null,
  devices,
};

if (command === "doctor" || command === "manual") {
  console.log(
    JSON.stringify(
      {
        status: command === "manual" ? "manual-ready" : "doctor",
        ...common,
        mode: command === "manual" ? "manual" : undefined,
        note:
          command === "manual"
            ? "Open targetUrl in a normal Safari tab. No WebDriver session was started."
            : undefined,
      },
      null,
      2,
    ),
  );
  process.exit(targetReachableFromMac ? 0 : 2);
}

if (command !== "automate") {
  console.error(`Unknown command: ${command}. Use doctor, manual, or automate.`);
  process.exit(2);
}

if (!targetReachableFromMac) {
  console.error(`Target is not reachable from the Mac: ${targetUrl}`);
  process.exit(2);
}
if (!device?.udid) {
  console.error("No paired physical iPhone found. Connect, unlock, and trust the device.");
  process.exit(2);
}

const webdriverUrl = `http://127.0.0.1:${driverPort}`;
if (await reachable(`${webdriverUrl}/status`)) {
  console.error(`Driver port ${driverPort} is already in use. Choose another --driver-port.`);
  process.exit(2);
}

const driver = spawn("/usr/bin/safaridriver", ["--diagnose", "--port", String(driverPort)], {
  stdio: ["ignore", "pipe", "pipe"],
});
let driverLog = "";
let sessionId;
driver.stdout.on("data", (chunk) => (driverLog += chunk.toString()));
driver.stderr.on("data", (chunk) => (driverLog += chunk.toString()));

async function release() {
  if (sessionId) {
    await request(`${webdriverUrl}/session/${sessionId}`, { method: "DELETE" }, 5_000).catch(() => undefined);
  }
  if (!driver.killed) driver.kill("SIGTERM");
  console.log(JSON.stringify({ status: "released", sessionId: sessionId ?? null, targetUrl }));
}

try {
  await waitForDriver(webdriverUrl);
  const lockState = spawnSync(
    "xcrun",
    ["devicectl", "device", "info", "lockState", "--device", device.udid, "--timeout", "10"],
    { encoding: "utf8" },
  );
  if (lockState.status !== 0 || /passcodeRequired:\s*true/i.test(lockState.stdout || "")) {
    throw new Error(`The iPhone is locked or unavailable.\n${lockState.stdout || ""}${lockState.stderr || ""}`);
  }

  const session = await request(`${webdriverUrl}/session`, {
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
          "safari:diagnose": true,
        },
      },
    }),
  }, 60_000);
  sessionId = session.sessionId;

  await request(`${webdriverUrl}/session/${sessionId}/url`, {
    method: "POST",
    body: JSON.stringify({ url: targetUrl }),
  }, 30_000);

  console.log(
    JSON.stringify(
      {
        status: "automation-ready",
        mode: "automated",
        targetUrl,
        webdriverUrl,
        sessionId,
        device,
        capabilities: session.capabilities,
        release: "Send Ctrl+C to this process and wait for status=released.",
      },
      null,
      2,
    ),
  );

  await new Promise((resolve) => {
    process.once("SIGINT", resolve);
    process.once("SIGTERM", resolve);
    process.once("SIGHUP", resolve);
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  if (/enable|automation|permission|not authorized/i.test(`${error}\n${driverLog}`)) {
    console.error("The user may need to authorize once with: /usr/bin/safaridriver --enable");
  }
  if (driverLog.trim()) console.error(driverLog.trim());
  process.exitCode = 1;
} finally {
  await release();
}
