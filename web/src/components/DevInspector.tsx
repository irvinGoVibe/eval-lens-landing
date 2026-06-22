"use client";

import { useEffect } from "react";

/**
 * GLOBAL dev tool — a single floating button, **⚙ dev: save**, available on any
 * production page when served from localhost.
 *
 * It snapshots the CURRENT surface + visible version of EVERY `Lab*` / `ds-*`
 * section on the page (read from the live DOM) and copies one paste-ready block
 * (also `console.table` + localStorage). The browser can't write source on a
 * static site, so you bake the snapshot's values into the page props by hand.
 *
 * (The old per-section corner panels — name + Light/Dark/version toggles
 * injected over each reusable block — were removed; only this bottom FAB
 * remains.)
 *
 * Imperative, ScrollFX-style: enhances the existing DOM and renders nothing.
 *
 * GATING: this file is only mounted by the root layout under
 * `process.env.NODE_ENV !== "production"` (dead-code-eliminated from the prod
 * bundle), and additionally no-ops at runtime unless the host is localhost. It
 * never appears on the deployed site.
 */

const ARCHETYPE: Record<string, { label: string; component: string }> = {
  "lab-hero": { label: "Statement hero", component: "LabStatementHero" },
  "lab-statement": { label: "Statement", component: "LabStatement" },
  "lab-process": { label: "Pinned steps", component: "LabPinnedSteps" },
  "lab-editorial": { label: "Editorial split", component: "LabEditorialSplit" },
  "lab-split-ring": { label: "Split ring", component: "LabSplitRing" },
  "lab-gallery": { label: "Gallery rail", component: "LabGallery" },
  "lab-bento": { label: "Bento", component: "LabBento" },
  "lab-hub": { label: "Hub map", component: "LabHubMap" },
  "lab-stat": { label: "Stat band", component: "LabStatBand" },
  "lab-numbered": { label: "Numbered", component: "LabNumbered" },
  "lab-risk": { label: "Risk → control", component: "LabRiskControl" },
  "lab-quiet-cta": { label: "Quiet CTA", component: "LabQuietCta" },
  "lab-pricing": { label: "Pricing", component: "LabPricing" },
  "lab-compare": { label: "Compare table", component: "LabCompareTable" },
  "lab-faq": { label: "FAQ", component: "LabFaq" },
  "lab-cinema": { label: "Cinema scrim", component: "LabCinemaScrim" },
  "lab-cine": { label: "Cinema", component: "DsCinema" },
  // clean DS extractions (prefix-free @/components/ds; render `.ds-*`, no `.lab-*`)
  "ds-split": { label: "Editorial split", component: "EditorialSplit" },
  "ds-numbered": { label: "Numbered", component: "Numbered" },
  "ds-quiet-cta": { label: "Quiet CTA", component: "QuietCta" },
  "ds-statband": { label: "Stat band", component: "StatBand" },
  "ds-chipgrid": { label: "Chip grid", component: "ChipGrid" },
};

/* Recognise both the legacy `.lab-*` substrate and the clean `.ds-*`
 * design-system sections. The selector substring-matches (cheap over-match is a
 * no-op: `archetypeToken` re-checks with a strict prefix and bails otherwise). */
const SECTION_SELECTOR = 'section[class*="lab-"], section[class*="ds-"]';
const archetypeToken = (section: HTMLElement) =>
  Array.from(section.classList).find(
    (c) => (c.startsWith("lab-") || c.startsWith("ds-")) && c !== "lab-inspector",
  );

const STYLE_ID = "dev-inspector-style";
const CSS = `
.dev-inspector-fab{all:unset;position:fixed;bottom:14px;right:14px;z-index:2147483000;cursor:pointer;
  padding:6px 12px;border-radius:999px;font:600 11px/1 ui-monospace,monospace;color:#e9e9ee;
  background:rgba(17,17,21,.85);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 14px rgba(0,0,0,.4);}
.dev-inspector-fab.is-saved{color:#7ee0a6;border-color:rgba(126,224,166,.4);}
`;

type Surface = "light" | "soft" | "ink";

export function DevInspector() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const host = location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return;

    // self-contained styles
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const path = location.pathname;
    const cleanups: Array<() => void> = [];

    // Save: snapshot every section's CURRENT surface + visible version (read from
    // the live DOM) → copy a paste-ready block + console.table, and stash it in
    // localStorage. The browser can't write source on a static site, so you bake
    // the values into the page props by hand.
    const saveFab = document.createElement("button");
    saveFab.type = "button";
    saveFab.className = "dev-inspector-fab";
    saveFab.textContent = "⚙ dev: save";
    let saveTimer: number | undefined;
    saveFab.addEventListener("click", () => {
      const snap = buildSnapshot(path);
      copyText(snap.text);
      safeSet(`dev:${path}:snapshot`, snap.text);
      // eslint-disable-next-line no-console
      console.log(`%c[dev-inspector] snapshot copied (${snap.rows.length} sections)`, "color:#7ee0a6", `\n\n${snap.text}\n`);
      // eslint-disable-next-line no-console
      console.table?.(snap.rows);
      saveFab.classList.add("is-saved");
      saveFab.textContent = `✓ saved ${snap.rows.length}`;
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveFab.classList.remove("is-saved");
        saveFab.textContent = "⚙ dev: save";
      }, 1500);
    });
    document.body.appendChild(saveFab);
    cleanups.push(() => {
      window.clearTimeout(saveTimer);
      saveFab.remove();
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode — non-fatal */
  }
}

type SnapshotRow = {
  i: number;
  component: string;
  surface: Surface;
  version: string | null;
};

/**
 * Read the CURRENT state of every `Lab*` / `ds-*` section on the page straight
 * from the live DOM (surface = the `.band` class; version = the visible
 * `[data-version]` payload) and format a paste-ready snapshot. Used by the Save
 * FAB so the chosen versions/surfaces can be baked into the page props by hand.
 */
function buildSnapshot(path: string): { text: string; rows: SnapshotRow[] } {
  const rows: SnapshotRow[] = [];
  Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)).forEach(
    (section) => {
      const labClass = archetypeToken(section);
      if (!labClass) return;
      const meta = ARCHETYPE[labClass] ?? { label: labClass, component: labClass };
      const surface: Surface = section.classList.contains("ink")
        ? "ink"
        : section.classList.contains("soft")
          ? "soft"
          : "light";
      const versions = Array.from(
        section.querySelectorAll<HTMLElement>("[data-version]"),
      ).filter((el) => el.closest(SECTION_SELECTOR) === section);
      const distinct = new Set(versions.map((el) => el.dataset.version ?? "1"));
      const visibleVer = versions.find((el) => !el.hidden)?.dataset.version ?? null;
      const version = distinct.size > 1 ? visibleVer ?? "1" : null;
      rows.push({ i: rows.length + 1, component: meta.component, surface, version });
    },
  );

  const lines = rows.map((r) => {
    const num = String(r.i).padStart(2, "0");
    const ver = r.version ? `  version={${r.version}}` : "";
    return `${num}  ${r.component.padEnd(18)} surface="${r.surface}"${ver}`;
  });
  const text = [
    `/* dev-inspector snapshot · ${path} · ${rows.length} section(s)`,
    `   surface = rendered .band class; for components typed "light"|"ink" pass`,
    `   "light" where this says "soft" (same render). Bake into the page props. */`,
    ...lines,
  ].join("\n");
  return { text, rows };
}

/** Clipboard write with a legacy fallback for non-secure contexts. */
function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    return;
  }
  legacyCopy(text);
}
function legacyCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } catch {
    /* best effort — dev-only */
  }
  area.remove();
}
