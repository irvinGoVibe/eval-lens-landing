"use client";

import { useEffect } from "react";

/**
 * Dev inspector for the Section Lab stand. For every `[data-marker]` section it
 * injects a corner panel that:
 *   1. names the catalog archetype (click to copy), and
 *   2. exposes three per-block controls used while iterating —
 *      • a **surface** toggle (Light / Dark → swaps `.band.soft`/`.band.ink`),
 *      • **version tabs** (v1 / v2 / … ) that switch saved design versions, and
 *      • a **content** toggle (Placeholder / Real → sets `data-content` on the
 *        section) that flips between the neutral lab copy and real EvalLense
 *        copy for blocks that ship both (others just carry the attribute).
 *
 * All three are PER-SECTION and independent. Versions are declared in the
 * markup (`[data-version="1|2|…"]`); content modes are declared as sibling
 * `[data-content-variant="placeholder|real"]` payloads that CSS shows/hides per
 * the section's `data-content`. Each choice persists per-section in localStorage
 * so it survives reloads.
 *
 * Imperative, ScrollFX-style: it enhances the existing DOM and renders nothing.
 */
export function LabMarkers() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".section-lab section.band[data-marker]"),
    );
    const cleanups: Array<() => void> = [];

    for (const section of sections) {
      const marker = section.getAttribute("data-marker");
      if (!marker) continue;

      // --- discover this section's own version variants (not nested ones) ---
      const versions = Array.from(
        section.querySelectorAll<HTMLElement>("[data-version]"),
      ).filter((el) => el.closest("section.band[data-marker]") === section);
      const versionIds =
        versions.length > 0
          ? [...new Set(versions.map((el) => el.dataset.version ?? "1"))].sort()
          : ["1"];

      const keySurface = `lab:surface:${marker}`;
      const keyVersion = `lab:version:${marker}`;
      const keyContent = `lab:content:${marker}`;

      // --- build the panel ---
      const panel = document.createElement("div");
      panel.className = "lab-inspector";

      const name = document.createElement("button");
      name.type = "button";
      name.className = "lab-inspector__name";
      name.tabIndex = -1;
      name.textContent = marker;
      name.title = `Click to copy: ${marker}`;
      name.setAttribute("aria-label", `Copy section type: ${marker}`);

      const row = document.createElement("div");
      row.className = "lab-inspector__row";

      // surface segmented control
      const seg = document.createElement("div");
      seg.className = "lab-inspector__seg";
      seg.setAttribute("role", "group");
      seg.setAttribute("aria-label", "Surface");
      const surfBtns: Record<string, HTMLButtonElement> = {};
      (["soft", "ink"] as const).forEach((surf) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.dataset.surf = surf;
        b.textContent = surf === "soft" ? "Light" : "Dark";
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          applySurface(surf);
          try {
            localStorage.setItem(keySurface, surf);
          } catch {
            /* private mode — non-fatal */
          }
        });
        surfBtns[surf] = b;
        seg.appendChild(b);
      });

      // version tabs
      const vers = document.createElement("div");
      vers.className = "lab-inspector__vers";
      vers.setAttribute("role", "group");
      vers.setAttribute("aria-label", "Versions");
      const verBtns: Record<string, HTMLButtonElement> = {};
      versionIds.forEach((id) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.dataset.ver = id;
        b.textContent = `v${id}`;
        b.disabled = versionIds.length < 2;
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          applyVersion(id);
          try {
            localStorage.setItem(keyVersion, id);
          } catch {
            /* non-fatal */
          }
        });
        verBtns[id] = b;
        vers.appendChild(b);
      });

      // content tabs (Placeholder | Real) — per block, like surface/version
      const cont = document.createElement("div");
      cont.className = "lab-inspector__content";
      cont.setAttribute("role", "group");
      cont.setAttribute("aria-label", "Content");
      const contBtns: Record<string, HTMLButtonElement> = {};
      (["placeholder", "real"] as const).forEach((mode) => {
        const b = document.createElement("button");
        b.type = "button";
        b.tabIndex = -1;
        b.dataset.content = mode;
        b.textContent = mode === "placeholder" ? "Placeholder" : "Real";
        b.setAttribute("aria-pressed", "false");
        b.setAttribute("aria-label", `${mode === "placeholder" ? "Placeholder" : "Real"} content for this block`);
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          applyContent(mode);
          try {
            localStorage.setItem(keyContent, mode);
          } catch {
            /* non-fatal */
          }
        });
        contBtns[mode] = b;
        cont.appendChild(b);
      });

      function applySurface(surf: "soft" | "ink") {
        section.classList.remove("soft", "ink");
        section.classList.add(surf);
        for (const [s, b] of Object.entries(surfBtns)) {
          b.classList.toggle("is-active", s === surf);
        }
      }
      function applyVersion(id: string) {
        for (const el of versions) {
          const show = (el.dataset.version ?? "1") === id;
          el.hidden = !show;
          // Re-reveal the shown version: its [data-reveal] nodes were `hidden`
          // when ScrollFX observed them, so they never got `.is-in` (opacity:0).
          if (show)
            el
              .querySelectorAll<HTMLElement>("[data-reveal]")
              .forEach((r) => r.classList.add("is-in"));
        }
        for (const [v, b] of Object.entries(verBtns)) {
          b.classList.toggle("is-active", v === id);
        }
      }
      function applyContent(mode: "placeholder" | "real") {
        section.dataset.content = mode;
        for (const [m, b] of Object.entries(contBtns)) {
          const on = m === mode;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        }
      }

      // copy name on click
      let resetTimer: number | undefined;
      const onCopy = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        copyText(marker);
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

      row.appendChild(seg);
      row.appendChild(vers);
      row.appendChild(cont);
      panel.appendChild(name);
      panel.appendChild(row);
      section.appendChild(panel);

      // --- restore persisted state ---
      const initSurf =
        safeGet(keySurface) ?? (section.classList.contains("ink") ? "ink" : "soft");
      applySurface(initSurf === "ink" ? "ink" : "soft");
      const storedVer = safeGet(keyVersion);
      applyVersion(storedVer && versionIds.includes(storedVer) ? storedVer : versionIds[0]);
      // Content default is "placeholder"; any other stored value than "real" falls back.
      applyContent(safeGet(keyContent) === "real" ? "real" : "placeholder");

      cleanups.push(() => {
        window.clearTimeout(resetTimer);
        name.removeEventListener("click", onCopy);
        panel.remove();
      });
    }

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
    /* best effort — dev-only affordance */
  }
  area.remove();
}
