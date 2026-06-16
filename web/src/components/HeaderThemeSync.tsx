"use client";

import { useEffect } from "react";

/**
 * Makes the internal-page header adapt to the band it currently sits over.
 *
 * Internal pages alternate light `.band` and dark `.band.ink` sections. As the
 * page scrolls, whichever band passes under the sticky header decides the
 * header's variant: over a dark band it flips to `page-header--dark`, over a
 * light one it flips back. CSS transitions on the header's background/text turn
 * the swap into a smooth cross-fade rather than a hard cut.
 *
 * Self-contained by design: internal pages don't mount `ScrollOrchestrator`
 * (the homepage's shared rAF loop), so this one rAF-throttled listener owns the
 * behavior for the whole internal-page surface.
 */
export function HeaderThemeSync() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".page-header");
    if (!header) return;
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>(".band"),
    );
    if (!bands.length) return;

    let raf = 0;
    const sync = () => {
      raf = 0;
      // Sample just below the header's lower edge — that's the surface the bar
      // visually overlaps.
      const line = header.getBoundingClientRect().bottom - 1;
      let dark = false;
      for (const band of bands) {
        const r = band.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          dark = band.classList.contains("ink");
          break;
        }
      }
      header.classList.toggle("page-header--dark", dark);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
