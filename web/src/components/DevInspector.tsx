"use client";

import { useEffect } from "react";

/**
 * GLOBAL dev inspector — the section-lab `LabMarkers` affordance, generalized to
 * any production page when served from localhost.
 *
 * For every `Lab*` section on the page (matched by its `lab-*` archetype class,
 * NOT by `data-marker`, which real pages don't carry) it injects a small corner
 * "окошечко" that lets you flip, live and per-section:
 *   • **Вид (version)** — v1 / v2 / … — toggles `hidden` on the `[data-version]`
 *     payloads the component already renders into the DOM, and
 *   • **Цвет (surface)** — Light / Soft / Dark — swaps the `.band` surface class
 *     (`band` / `band soft` / `band ink`).
 * Clicking the name copies the component name (to bake the chosen props back into
 * the page). Each choice persists per route + section in localStorage.
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
};

const STYLE_ID = "dev-inspector-style";
const CSS = `
.dev-inspector{position:absolute;z-index:90;display:flex;flex-direction:column;gap:6px;
  padding:8px;border-radius:10px;font:500 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;
  background:rgba(17,17,21,.82);color:#e9e9ee;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  box-shadow:0 6px 20px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);opacity:.32;transition:opacity .15s;
  pointer-events:auto;user-select:none;max-width:240px;}
.dev-inspector:hover{opacity:1;}
.dev-inspector__name{all:unset;cursor:copy;font-weight:600;letter-spacing:.02em;color:#c9c4ff;padding:1px 2px;}
.dev-inspector__name.is-copied{color:#7ee0a6;}
.dev-inspector__row{display:flex;gap:6px;flex-wrap:wrap;}
.dev-inspector__seg{display:inline-flex;border-radius:7px;overflow:hidden;border:1px solid rgba(255,255,255,.16);}
.dev-inspector__seg button{all:unset;cursor:pointer;padding:3px 8px;font:inherit;color:#bdbdc7;}
.dev-inspector__seg button + button{border-left:1px solid rgba(255,255,255,.12);}
.dev-inspector__seg button.is-active{background:#6c5cff;color:#fff;}
.dev-inspector__seg button:disabled{opacity:.4;cursor:default;}
.dev-inspector__label{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#85858f;align-self:center;}
.dev-inspector-fab{all:unset;position:fixed;bottom:14px;right:14px;z-index:2147483000;cursor:pointer;
  padding:6px 12px;border-radius:999px;font:600 11px/1 ui-monospace,monospace;color:#e9e9ee;
  background:rgba(17,17,21,.85);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 14px rgba(0,0,0,.4);}
.dev-inspector-hidden .dev-inspector{display:none;}
`;

type Surface = "light" | "soft" | "ink";

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
    // body-level panels recompute their document-coord position on resize /
    // layout shifts (not on scroll — document coords are scroll-stable).
    const repositions: Array<() => void> = [];
    const repositionAll = () => {
      for (const r of repositions) r();
    };

    // Idempotently enhance one section (no-op if already done). Returns a cleanup.
    function enhance(section: HTMLElement) {
      if (enhancedSections.has(section)) return;
      // identify the archetype lab-* token (skip helper classes like lab-inspector)
      const labClass = Array.from(section.classList).find(
        (c) => c.startsWith("lab-") && c !== "lab-inspector",
      );
      if (!labClass) return;
      enhancedSections.add(section);

      const meta = ARCHETYPE[labClass] ?? { label: labClass, component: labClass };
      // stable index = position among same-archetype sections in the DOM
      const idx = Array.from(
        document.querySelectorAll<HTMLElement>(`section.${labClass}`),
      ).indexOf(section);
      const id = `${labClass}-${idx < 0 ? 0 : idx}`;
      const keySurface = `dev:${path}:${id}:surface`;
      const keyVersion = `dev:${path}:${id}:version`;

      // discover this section's own version payloads (not nested ones)
      const versions = Array.from(
        section.querySelectorAll<HTMLElement>("[data-version]"),
      ).filter((el) => el.closest('section[class*="lab-"]') === section);
      const versionIds =
        versions.length > 0
          ? [...new Set(versions.map((el) => el.dataset.version ?? "1"))].sort()
          : ["1"];

      // The panel lives on <body> (NOT inside the section) so we never add a
      // child / inline style to a React-owned node — that would diff against the
      // SSR HTML and trip hydration on every Fast Refresh. It is positioned in
      // DOCUMENT coordinates (rect + scroll), so it tracks the section on scroll
      // for free and only needs recompute on resize / layout shifts.
      const panel = document.createElement("div");
      panel.className = "dev-inspector";

      const name = document.createElement("button");
      name.type = "button";
      name.className = "dev-inspector__name";
      name.tabIndex = -1;
      name.textContent = meta.label;
      name.title = `Click to copy: ${meta.component}`;

      // surface segmented control — Light / Soft / Dark
      const seg = document.createElement("div");
      seg.className = "dev-inspector__seg";
      const surfBtns: Record<Surface, HTMLButtonElement> = {} as Record<Surface, HTMLButtonElement>;
      (["light", "soft", "ink"] as const).forEach((surf) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.textContent = surf === "light" ? "Light" : surf === "soft" ? "Soft" : "Dark";
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          applySurface(surf);
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
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          applyVersion(vid);
          safeSet(keyVersion, vid);
        });
        verBtns[vid] = b;
        vseg.appendChild(b);
      });

      function applySurface(surf: Surface) {
        // Only touch the React-owned section's classList when the surface
        // ACTUALLY changes (a user toggle, post-hydration). Re-applying the
        // current surface on restore would reorder classes (band ink lab-hero ->
        // band lab-hero ink) and trip hydration on the next Fast Refresh.
        const cur: Surface = section.classList.contains("ink")
          ? "ink"
          : section.classList.contains("soft")
            ? "soft"
            : "light";
        if (cur !== surf) {
          section.classList.remove("soft", "ink");
          if (surf !== "light") section.classList.add(surf);
        }
        (Object.keys(surfBtns) as Surface[]).forEach((s) =>
          surfBtns[s].classList.toggle("is-active", s === surf),
        );
      }
      function applyVersion(vid: string) {
        for (const el of versions) el.hidden = (el.dataset.version ?? "1") !== vid;
        for (const [v, b] of Object.entries(verBtns))
          b.classList.toggle("is-active", v === vid);
      }

      let resetTimer: number | undefined;
      const onCopy = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const curSurf = section.classList.contains("ink")
          ? 'surface="ink"'
          : section.classList.contains("soft")
            ? 'surface="soft"'
            : 'surface="light"';
        const curVer =
          versionIds.length > 1
            ? ` version={${(safeGet(keyVersion) ?? versionIds[0]).replace(/\D/g, "")}}`
            : "";
        copyText(`<${meta.component} ${curSurf}${curVer} />`);
        name.classList.add("is-copied");
        const prev = name.textContent;
        name.textContent = "Copied ✓";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          name.classList.remove("is-copied");
          name.textContent = prev;
        }, 1200);
      };
      name.addEventListener("click", onCopy);

      const row = document.createElement("div");
      row.className = "dev-inspector__row";
      row.appendChild(seg);
      row.appendChild(vseg);
      panel.appendChild(name);
      panel.appendChild(row);
      document.body.appendChild(panel);

      // Position over the section's top-right in DOCUMENT coordinates. Document
      // coords don't change on scroll, so this only needs recompute on resize /
      // layout shifts — no scroll handler, no per-frame work.
      const reposition = () => {
        const r = section.getBoundingClientRect();
        const top = r.top + window.scrollY + 8;
        const left = r.right + window.scrollX - panel.offsetWidth - 8;
        panel.style.top = `${Math.max(0, top)}px`;
        panel.style.left = `${Math.max(0, left)}px`;
      };
      reposition();
      repositions.push(reposition);

      // restore persisted state
      const initSurf = (safeGet(keySurface) as Surface | null) ??
        (section.classList.contains("ink") ? "ink" : section.classList.contains("soft") ? "soft" : "light");
      applySurface(initSurf);
      const storedVer = safeGet(keyVersion);
      applyVersion(storedVer && versionIds.includes(storedVer) ? storedVer : versionIds[0]);

      cleanups.push(() => {
        window.clearTimeout(resetTimer);
        name.removeEventListener("click", onCopy);
        panel.remove();
        const i = repositions.indexOf(reposition);
        if (i >= 0) repositions.splice(i, 1);
        enhancedSections.delete(section);
      });
    }

    // Scan the page and enhance every not-yet-enhanced Lab* section. Idempotent,
    // so it's safe to call on mount AND whenever the DOM mutates (route change,
    // StrictMode remount, HMR) — panels appear once the sections exist.
    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('section[class*="lab-"]')
        .forEach(enhance);
      // sections may have shifted (new panels, late layout) — re-place existing ones
      repositionAll();
    };

    // floating show/hide-all toggle (created once)
    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "dev-inspector-fab";
    let hidden = safeGet("dev:inspector:hidden") === "1";
    const syncFab = () => {
      document.documentElement.classList.toggle("dev-inspector-hidden", hidden);
      fab.textContent = hidden ? "⚙ dev: show" : "⚙ dev: hide";
    };
    fab.addEventListener("click", () => {
      hidden = !hidden;
      safeSet("dev:inspector:hidden", hidden ? "1" : "0");
      syncFab();
    });
    document.body.appendChild(fab);
    syncFab();
    cleanups.push(() => fab.remove());

    // initial scan (after paint) + keep watching for new/replaced sections
    const raf = requestAnimationFrame(scan);
    let debounce: number | undefined;
    const observer = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 120);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // recompute panel positions on viewport resize (document coords shift)
    let resizeDebounce: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeDebounce);
      resizeDebounce = window.setTimeout(repositionAll, 80);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      window.clearTimeout(debounce);
      window.clearTimeout(resizeDebounce);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
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
