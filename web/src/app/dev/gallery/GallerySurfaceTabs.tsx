"use client";

import { useEffect } from "react";

/**
 * Gallery-only helper: adds a per-section SURFACE switcher (Light | Dark).
 *
 * A section's surface is just a class on its `<section class="band soft|ink …">`:
 *   • Light = `.soft` → `var(--bg-soft)` (default neutral surface)
 *   • Dark  = `.ink`  → `var(--bg-ink)` + light text
 * Geometry is surface-invariant (within a version, light ≡ ink — only color
 * changes), so a plain class swap is enough — exactly what LabMarkers.applySurface
 * does on /dev/section-lab.
 *
 * For every `main section.band` it:
 *   1. reads the section's OWN current surface
 *      (`section.classList.contains("ink") ? "ink" : "soft"`) — each section keeps
 *      its natural default, we do NOT force everything to light;
 *   2. renders a small `Light | Dark` pill group into the `[data-surface-slot]`
 *      of the banner that immediately precedes the section, with the matching
 *      button active;
 *   3. wires clicks to applySurface("soft"|"ink") = remove("soft","ink") +
 *      add(surf), updating aria-pressed / is-active on the buttons.
 *
 * Surface is an independent axis: it only touches the `soft`/`ink` class on the
 * section itself, so it composes cleanly with GalleryVersionTabs (which toggles
 * `hidden` on `[data-version]` layers) and GalleryRealContent (which sets
 * `data-content="real"`). Imperative, ScrollFX-style: enhances existing DOM,
 * renders nothing. A `gallery:surface:set` window event lets a master toggle
 * drive every section's buttons in sync.
 */
export function GallerySurfaceTabs() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section.band"),
    );
    const cleanups: Array<() => void> = [];

    for (const section of sections) {
      // --- find the banner slot for this section ---
      // The GalleryBanner is a `.gallery-banner-wrap` rendered immediately
      // before the section; walk back to the nearest one.
      let prev = section.previousElementSibling;
      while (prev && !prev.classList.contains("gallery-banner-wrap")) {
        prev = prev.previousElementSibling;
      }
      const slot = prev?.querySelector<HTMLElement>("[data-surface-slot]");
      if (!slot) continue;

      // --- build the segmented control ---
      const group = document.createElement("div");
      group.className = "gallery-stabs";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", "Surface");

      const btns: Record<"soft" | "ink", HTMLButtonElement> = {} as Record<
        "soft" | "ink",
        HTMLButtonElement
      >;

      const applySurface = (surf: "soft" | "ink") => {
        section.classList.remove("soft", "ink");
        section.classList.add(surf);
        (Object.entries(btns) as Array<["soft" | "ink", HTMLButtonElement]>).forEach(
          ([s, b]) => {
            const on = s === surf;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-pressed", String(on));
          },
        );
      };

      (["soft", "ink"] as const).forEach((surf) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "gallery-stabs__btn";
        b.dataset.surf = surf;
        b.textContent = surf === "soft" ? "Light" : "Dark";
        b.setAttribute("aria-pressed", "false");
        b.setAttribute(
          "aria-label",
          surf === "soft" ? "Light surface" : "Dark surface",
        );
        b.addEventListener("click", (e) => {
          e.preventDefault();
          applySurface(surf);
        });
        btns[surf] = b;
        group.appendChild(b);
      });

      slot.appendChild(group);

      // Default to the section's OWN natural surface — not a forced value.
      applySurface(section.classList.contains("ink") ? "ink" : "soft");

      // Master toggle (All Light / All Dark) broadcasts this event.
      const onBroadcast = (e: Event) => {
        const surf = (e as CustomEvent<"soft" | "ink">).detail;
        if (surf === "soft" || surf === "ink") applySurface(surf);
      };
      window.addEventListener("gallery:surface:set", onBroadcast);

      cleanups.push(() => {
        window.removeEventListener("gallery:surface:set", onBroadcast);
        group.remove();
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}

/**
 * Master surface toggle for the top of the gallery: "All Light" / "All Dark".
 * Broadcasts a `gallery:surface:set` event that every per-section
 * GallerySurfaceTabs control listens for, so a single click flips (and
 * re-syncs the buttons of) every section at once.
 */
export function GallerySurfaceMaster() {
  return (
    <div
      className="gallery-smaster"
      role="group"
      aria-label="All surfaces"
    >
      <span className="gallery-smaster__label">All surfaces</span>
      <div className="gallery-stabs" role="group" aria-label="All surfaces toggle">
        <button
          type="button"
          className="gallery-stabs__btn"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("gallery:surface:set", { detail: "soft" }),
            )
          }
        >
          All Light
        </button>
        <button
          type="button"
          className="gallery-stabs__btn"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("gallery:surface:set", { detail: "ink" }),
            )
          }
        >
          All Dark
        </button>
      </div>
    </div>
  );
}
