"use client";

import { useEffect } from "react";

/**
 * GLOBAL dev inspector — the section-lab `LabMarkers` affordance, generalized to
 * any production page when served from localhost.
 *
 * Everything lives in ONE dock pinned bottom-right. Its sections list holds a row
 * per `Lab*`/`DS` section on the page (matched by archetype class, NOT by
 * `data-marker`, which real pages don't carry); each row lets you flip, live and
 * per-section:
 *   • **Вид (version)** — v1 / v2 / … — toggles `hidden` on the `[data-version]`
 *     payloads the component already renders into the DOM, and
 *   • **Цвет (surface)** — Light / Dark — swaps the `.band` surface class
 *     (`band soft` / `band ink`).
 * Hovering a row outlines its section on the page; clicking the name scrolls the
 * section into view and copies its `<Component …/>` tag (to bake the chosen props
 * back into the page). Each choice persists per route + section in localStorage.
 *
 * The dock's bar carries the global controls:
 *   • **save** — snapshots the CURRENT surface + visible version of EVERY section
 *     (read from the live DOM) and copies one paste-ready block (also
 *     `console.table` + localStorage). The browser can't write source on a static
 *     site, so you bake the snapshot's values into the page props by hand.
 *   • **hide** — collapses the whole dock to a single dim "⚙ dev" tray chip;
 *     clicking the chip expands it again. State persists in localStorage.
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

/* Inspector recognises both the legacy `.lab-*` substrate and the clean `.ds-*`
 * design-system sections. The selector substring-matches (cheap over-match is a
 * no-op: `archetypeToken` re-checks with a strict prefix and bails otherwise). */
const SECTION_SELECTOR = 'section[class*="lab-"], section[class*="ds-"]';
const archetypeToken = (section: HTMLElement) =>
  Array.from(section.classList).find(
    (c) => (c.startsWith("lab-") || c.startsWith("ds-")) && c !== "lab-inspector",
  );

const STYLE_ID = "dev-inspector-style";
const CSS = `
/* segmented controls (surface + version), reused inside the dock bar */
.dev-inspector__seg{display:inline-flex;border-radius:7px;overflow:hidden;border:1px solid rgba(255,255,255,.16);}
.dev-inspector__seg button{all:unset;cursor:pointer;padding:3px 8px;font:inherit;color:#bdbdc7;}
.dev-inspector__seg button + button{border-left:1px solid rgba(255,255,255,.12);}
.dev-inspector__seg button.is-active{background:#6c5cff;color:#fff;}
.dev-inspector__seg button:disabled{opacity:.4;cursor:default;}

/* one compact dock pinned bottom-right; shows controls for the CURRENT section
   (the one under the viewport centre), updated live on scroll */
.dev-dock{position:fixed;bottom:14px;right:14px;z-index:2147483000;display:flex;align-items:center;gap:7px;
  padding:5px 5px 5px 10px;border-radius:999px;font:600 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;color:#e9e9ee;
  background:rgba(17,17,21,.85);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 14px rgba(0,0,0,.4);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:opacity .15s,padding .15s;}
/* current-section block: name + surface seg + version seg (empty when no section) */
.dev-dock__cur{display:flex;align-items:center;gap:7px;}
.dev-dock__cur:empty{display:none;}
.dev-dock__name{all:unset;cursor:copy;font-weight:600;letter-spacing:.02em;color:#c9c4ff;white-space:nowrap;}
.dev-dock__name.is-copied{color:#7ee0a6;}
.dev-dock__sep{width:1px;height:18px;background:rgba(255,255,255,.14);}
.dev-dock__brand{color:#85858f;font-size:9px;letter-spacing:.1em;text-transform:uppercase;}
.dev-dock__btn{all:unset;cursor:pointer;padding:5px 11px;border-radius:999px;color:#e9e9ee;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);transition:background .12s,color .12s;}
.dev-dock__btn:hover{background:rgba(255,255,255,.14);}
.dev-dock__save.is-saved{color:#7ee0a6;border-color:rgba(126,224,166,.4);background:rgba(126,224,166,.08);}
/* the tray chip (own styling — NOT a .dev-dock__btn, so it dodges the reset) */
.dev-dock__chip{all:unset;cursor:pointer;padding:6px 12px;border-radius:999px;color:#e9e9ee;}
.dev-dock .dev-dock__chip{display:none;}
/* collapsed: shrink the whole dock to a single dim tray chip */
.dev-dock.is-collapsed{padding:0;opacity:.45;}
.dev-dock.is-collapsed:hover{opacity:1;}
.dev-dock.is-collapsed .dev-dock__cur,
.dev-dock.is-collapsed .dev-dock__sep,
.dev-dock.is-collapsed .dev-dock__brand,
.dev-dock.is-collapsed .dev-dock__save,
.dev-dock.is-collapsed .dev-dock__hide{display:none;}
.dev-dock.is-collapsed .dev-dock__chip{display:inline-flex;align-items:center;gap:5px;}
`;

type Surface = "light" | "ink";

// Track enhanced sections OUT-OF-DOM so we never mutate a React-owned node's
// attributes (a `data-*` flag would diff against SSR HTML and trip hydration).
const enhancedSections = new WeakSet<HTMLElement>();

export function DevInspector() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const host = location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return;

    // self-contained styles (no dependency on .section-lab-scoped CSS)
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const path = location.pathname;
    const cleanups: Array<() => void> = [];

    // A registry of every Lab*/DS section's metadata (NO per-section DOM). The
    // dock renders controls for ONE section at a time — the one under the viewport
    // centre — so we only need the data here; `renderCurrent` builds the live
    // controls on demand and rebinds them as you scroll between sections.
    type Entry = {
      section: HTMLElement;
      id: string;
      meta: { label: string; component: string };
      keySurface: string;
      keyVersion: string;
      versions: HTMLElement[];
      versionIds: string[];
    };
    const registry: Entry[] = [];

    // Register a section once (idempotent). Records its archetype, version
    // payloads and persistence keys — but touches nothing in the DOM, so it can't
    // perturb hydration.
    function register(section: HTMLElement) {
      if (enhancedSections.has(section)) return;
      const labClass = archetypeToken(section);
      if (!labClass) return;
      enhancedSections.add(section);

      const meta = ARCHETYPE[labClass] ?? { label: labClass, component: labClass };
      const idx = Array.from(
        document.querySelectorAll<HTMLElement>(`section.${labClass}`),
      ).indexOf(section);
      const id = `${labClass}-${idx < 0 ? 0 : idx}`;
      const versions = Array.from(
        section.querySelectorAll<HTMLElement>("[data-version]"),
      ).filter((el) => el.closest(SECTION_SELECTOR) === section);
      const versionIds =
        versions.length > 0
          ? [...new Set(versions.map((el) => el.dataset.version ?? "1"))].sort()
          : ["1"];

      registry.push({
        section,
        id,
        meta,
        keySurface: `dev:${path}:${id}:surface`,
        keyVersion: `dev:${path}:${id}:version`,
        versions,
        versionIds,
      });
      // keep the registry in document order so "nearest above/below" is meaningful
      registry.sort((a, b) =>
        a.section.compareDocumentPosition(b.section) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );
    }

    // Which section is the user looking at? The one whose box straddles the
    // viewport centre; failing that (gaps between sections), the nearest one.
    function pickActive(): Entry | null {
      if (!registry.length) return null;
      const cy = window.innerHeight / 2;
      let best: Entry | null = null;
      let bestDist = Infinity;
      for (const e of registry) {
        const r = e.section.getBoundingClientRect();
        if (r.top <= cy && r.bottom >= cy) return e;
        const dist = r.bottom < cy ? cy - r.bottom : r.top - cy;
        if (dist < bestDist) {
          bestDist = dist;
          best = e;
        }
      }
      return best;
    }

    // Scan + register every not-yet-seen section, then refresh the current view.
    // Idempotent — safe on mount and on every DOM mutation (route change, HMR).
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach(register);
      pickAndRender();
    };

    // ONE compact dock (created once), pinned bottom-right:
    //   [ <current section name> · surface · version ] | dev · save · hide
    // The current-section block is rebuilt by `renderCurrent` as you scroll; the
    // bar buttons are static. "hide" collapses everything to a dim tray chip.
    const dock = document.createElement("div");
    dock.className = "dev-dock";

    // current-section block — filled by renderCurrent(), empty when nothing active
    const cur = document.createElement("div");
    cur.className = "dev-dock__cur";

    const sep = document.createElement("span");
    sep.className = "dev-dock__sep";

    const brand = document.createElement("span");
    brand.className = "dev-dock__brand";
    brand.textContent = "dev";

    // Save: snapshot every section's CURRENT surface + visible version (read from
    // the live DOM, so it reflects exactly what you toggled) → copy a paste-ready
    // block + console.table, and stash it in localStorage. The browser can't write
    // source on a static site, so you bake the values into the page props by hand.
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "dev-dock__btn dev-dock__save";
    saveBtn.textContent = "save";
    let saveTimer: number | undefined;
    saveBtn.addEventListener("click", () => {
      const snap = buildSnapshot(path);
      copyText(snap.text);
      safeSet(`dev:${path}:snapshot`, snap.text);
      // eslint-disable-next-line no-console
      console.log(`%c[dev-inspector] snapshot copied (${snap.rows.length} sections)`, "color:#7ee0a6", `\n\n${snap.text}\n`);
      // eslint-disable-next-line no-console
      console.table?.(snap.rows);
      saveBtn.classList.add("is-saved");
      saveBtn.textContent = `✓ ${snap.rows.length}`;
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveBtn.classList.remove("is-saved");
        saveBtn.textContent = "save";
      }, 1500);
    });

    // hide/show: collapses the dock to a tray chip
    let hidden = safeGet("dev:inspector:hidden") === "1";
    const hideBtn = document.createElement("button");
    hideBtn.type = "button";
    hideBtn.className = "dev-dock__btn dev-dock__hide";
    hideBtn.textContent = "hide";

    // the collapsed tray — same element acts as the affordance to expand again
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "dev-dock__chip";
    chip.textContent = "⚙ dev";

    const syncDock = () => {
      dock.classList.toggle("is-collapsed", hidden);
    };
    hideBtn.addEventListener("click", () => {
      hidden = true;
      safeSet("dev:inspector:hidden", "1");
      syncDock();
    });
    chip.addEventListener("click", () => {
      hidden = false;
      safeSet("dev:inspector:hidden", "0");
      syncDock();
    });

    dock.appendChild(cur);
    dock.appendChild(sep);
    dock.appendChild(brand);
    dock.appendChild(saveBtn);
    dock.appendChild(hideBtn);
    dock.appendChild(chip);
    document.body.appendChild(dock);
    syncDock();
    cleanups.push(() => {
      window.clearTimeout(saveTimer);
      window.clearTimeout(curResetTimer);
      dock.remove();
    });

    // Build the live controls for the active section into `cur`, rebinding them to
    // that section. Rebuilt only when the active section CHANGES (cheap; scroll
    // ticks that stay on the same section are no-ops). All section mutations happen
    // on an explicit click (post-hydration), never on render — so hydration is safe.
    let activeId: string | null = null;
    let curResetTimer: number | undefined;
    function renderCurrent(entry: Entry | null) {
      // toggle the "dev" brand (shown only when no section is active) vs the divider
      brand.style.display = entry ? "none" : "";
      sep.style.display = entry ? "" : "none";
      if (!entry) {
        cur.replaceChildren();
        activeId = null;
        return;
      }
      if (entry.id === activeId) return; // same section — nothing to rebuild
      activeId = entry.id;
      const { section, meta, versions, versionIds, keySurface, keyVersion } = entry;

      const curSurf = (): Surface =>
        section.classList.contains("ink") ? "ink" : "light";

      const name = document.createElement("button");
      name.type = "button";
      name.className = "dev-dock__name";
      name.tabIndex = -1;
      name.textContent = meta.label;
      name.title = `Copy: ${meta.component}`;

      // surface segmented control — Light / Dark. The light render IS the
      // component's `.band.soft` fill (its real light surface); dark is `.band.ink`.
      const seg = document.createElement("div");
      seg.className = "dev-inspector__seg";
      const surfBtns: Record<Surface, HTMLButtonElement> = {} as Record<Surface, HTMLButtonElement>;
      (["light", "ink"] as const).forEach((surf) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.textContent = surf === "light" ? "Light" : "Dark";
        b.addEventListener("click", () => {
          if (curSurf() !== surf) {
            section.classList.remove("soft", "ink");
            section.classList.add(surf === "ink" ? "ink" : "soft");
          }
          (Object.keys(surfBtns) as Surface[]).forEach((s) =>
            surfBtns[s].classList.toggle("is-active", s === surf),
          );
          safeSet(keySurface, surf);
        });
        surfBtns[surf] = b;
        seg.appendChild(b);
      });

      // version segmented control — v1 / v2 / …
      const vseg = document.createElement("div");
      vseg.className = "dev-inspector__seg";
      const verBtns: Record<string, HTMLButtonElement> = {};
      versionIds.forEach((vid) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.textContent = `v${vid}`;
        b.disabled = versionIds.length < 2;
        b.addEventListener("click", () => {
          for (const el of versions) el.hidden = (el.dataset.version ?? "1") !== vid;
          for (const [v, vb] of Object.entries(verBtns))
            vb.classList.toggle("is-active", v === vid);
          safeSet(keyVersion, vid);
        });
        verBtns[vid] = b;
        vseg.appendChild(b);
      });

      // name click copies the paste-ready `<Component …/>` tag for this section
      name.addEventListener("click", () => {
        const s = curSurf();
        const visibleVer =
          versions.find((el) => !el.hidden)?.dataset.version ?? versionIds[0];
        const verProp =
          versionIds.length > 1 ? ` version={${visibleVer.replace(/\D/g, "")}}` : "";
        copyText(`<${meta.component} surface="${s}"${verProp} />`);
        name.classList.add("is-copied");
        const prev = meta.label;
        name.textContent = "Copied ✓";
        window.clearTimeout(curResetTimer);
        curResetTimer = window.setTimeout(() => {
          name.classList.remove("is-copied");
          name.textContent = prev;
        }, 1200);
      });

      // reflect the section's CURRENT live state on the fresh controls
      const s = curSurf();
      (Object.keys(surfBtns) as Surface[]).forEach((k) =>
        surfBtns[k].classList.toggle("is-active", k === s),
      );
      const vNow = versions.find((el) => !el.hidden)?.dataset.version ?? versionIds[0];
      for (const [v, vb] of Object.entries(verBtns))
        vb.classList.toggle("is-active", v === vNow);

      cur.replaceChildren(name, seg, vseg);
    }

    // pick the active section and render it (rebuild only on change)
    function pickAndRender() {
      renderCurrent(pickActive());
    }

    // initial scan (after paint) + keep watching for new/replaced sections
    const raf = requestAnimationFrame(scan);
    let debounce: number | undefined;
    const observer = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 120);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // follow the scroll: re-pick the active section (rAF-throttled). renderCurrent
    // only rebuilds when the section actually changes, so ticks are near-free.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        pickAndRender();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    cleanups.push(() => {
      cancelAnimationFrame(raf);
      window.clearTimeout(debounce);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
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
 * Read the CURRENT state of every `Lab*` section on the page straight from the
 * live DOM (surface = the `.band` class you toggled; version = the visible
 * `[data-version]` payload) and format a paste-ready snapshot. Used by the Save
 * FAB so the chosen versions/surfaces can be baked into the page props by hand.
 */
function buildSnapshot(path: string): { text: string; rows: SnapshotRow[] } {
  const rows: SnapshotRow[] = [];
  Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)).forEach(
    (section, i) => {
      const labClass = archetypeToken(section);
      if (!labClass) return;
      const meta = ARCHETYPE[labClass] ?? { label: labClass, component: labClass };
      const surface: Surface = section.classList.contains("ink") ? "ink" : "light";
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
    `   surface = "light" | "ink". Bake into the page props. */`,
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
