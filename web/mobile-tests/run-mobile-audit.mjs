import { spawn } from "node:child_process";

const phase = process.argv[2] === "retest" ? "retest" : "audit";
const passthrough = process.argv.slice(3);
const runId =
  process.env.MOBILE_QA_RUN_ID ??
  new Date().toISOString().replace(/[:.]/g, "-");

const child = spawn(
  "pnpm",
  ["exec", "playwright", "test", "--config", "mobile-tests/playwright.mobile.config.ts", ...passthrough],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      MOBILE_QA_PHASE: phase,
      MOBILE_QA_RUN_ID: runId,
    },
  },
);

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exitCode = code ?? 1;
});
