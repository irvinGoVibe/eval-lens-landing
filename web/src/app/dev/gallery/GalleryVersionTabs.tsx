"use client";

import { useEffect } from "react";

/**
 * Gallery-only helper: adds a lightweight per-section VERSION switcher.
 *
 * Each Lab* component renders its saved design versions as sibling layers
 * carrying `data-version="1|2|3|…"`; every layer except the first ships with the
 * `hidden` attribute, so SSR shows v1 by default. In /dev/section-lab the
 * LabMarkers inspector flips these per block, but it scopes to `.section-lab`
 * and also carries surface/content toggles + localStorage — too heavy for the
 * gallery. This component adds ONLY version tabs.
 *
 * For every `main section.band` it:
 *   1. finds the section's OWN version layers (`[data-version]` whose nearest
 *      `section.band` ancestor is this section — so nested sections aren't
 *      caught), and collects the unique, sorted version ids;
 *   2. if there are ≤1 versions, adds nothing (nothing to switch);
 *   3. otherwise renders a small `v1 v2 v3 …` button row into the
 *      `[data-version-slot]` of the banner that immediately precedes the
 *      section, and wires clicks to toggle `hidden` on the layers.
 *
 * It does NOT touch `data-content`, so it composes cleanly with
 * GalleryRealContent (which sets `data-content="real"`). Imperative,
 * ScrollFX-style: enhances existing DOM, renders nothing.
 */
export function GalleryVersionTabs() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section.band"),
    );
    const cleanups: Array<() => void> = [];

    for (const section of sections) {
      // --- discover this section's OWN version layers (not nested ones) ---
      const layers = Array.from(
        section.querySelectorAll<HTMLElement>("[data-version]"),
      ).filter((el) => el.closest("section.band") === section);

      const versionIds = [
        ...new Set(layers.map((el) => el.dataset.version ?? "1")),
      ].sort();

      // Nothing to switch — skip.
      if (versionIds.length < 2) continue;

      // --- find the banner slot for this section ---
      // The GalleryBanner is a `.gallery-banner-wrap` rendered immediately
      // before the section; walk back to the nearest one.
      let prev = section.previousElementSibling;
      while (prev && !prev.classList.contains("gallery-banner-wrap")) {
        prev = prev.previousElementSibling;
      }
      const slot = prev?.querySelector<HTMLElement>("[data-version-slot]");
      if (!slot) continue;

      // --- build the tab group ---
      const group = document.createElement("div");
      group.className = "gallery-vtabs";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", "Version");

      const btns: Record<string, HTMLButtonElement> = {};

      const applyVersion = (id: string) => {
        for (const el of layers) {
          el.hidden = (el.dataset.version ?? "1") !== id;
        }
        for (const [v, b] of Object.entries(btns)) {
          b.setAttribute("aria-pressed", String(v === id));
        }
      };

      versionIds.forEach((id) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "gallery-vtabs__btn";
        b.textContent = `v${id}`;
        b.setAttribute("aria-pressed", "false");
        b.setAttribute("aria-label", `Show version ${id}`);
        b.addEventListener("click", (e) => {
          e.preventDefault();
          applyVersion(id);
        });
        btns[id] = b;
        group.appendChild(b);
      });

      slot.appendChild(group);

      // Default to v1 (first id) — matches SSR where only v1 is visible.
      applyVersion(versionIds[0]);

      cleanups.push(() => {
        group.remove();
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}
