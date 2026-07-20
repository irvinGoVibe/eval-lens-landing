#!/usr/bin/env node

import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const cwd = process.cwd();
const appDir = existsSync(join(cwd, "web", "src", "app"))
  ? join(cwd, "web", "src", "app")
  : join(cwd, "src", "app");

if (!existsSync(appDir)) {
  console.error("Could not find web/src/app or src/app from the current directory.");
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function routeFromFile(file) {
  const parts = relative(appDir, file).split(sep).slice(0, -1);
  const visible = parts.filter((part) => !part.startsWith("(") && !part.startsWith("@"));
  return `/${visible.join("/")}`.replace(/\/$/, "") || "/";
}

const pages = walk(appDir).filter((file) => file.endsWith(`${sep}page.tsx`));
const routes = [...new Set(pages.map(routeFromFile))].sort();
const dynamic = routes.filter((route) => route.includes("["));
const publicAuth = routes.filter((route) => route === "/admin/login");
const protectedRoutes = routes.filter(
  (route) => route.startsWith("/admin") && !publicAuth.includes(route),
);
const publicRoutes = routes.filter(
  (route) => !route.startsWith("/admin") && !dynamic.includes(route),
);

process.stdout.write(
  `${JSON.stringify({ appDir, publicRoutes, publicAuth, protectedRoutes, dynamic }, null, 2)}\n`,
);
