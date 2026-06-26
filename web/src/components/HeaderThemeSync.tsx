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
    let raf = 0;
    let lastY = window.scrollY;
    let pointerNearHeader = false;
    const HEADER_REVEAL_ZONE = 96;
    const sync = () => {
      raf = 0;
      const r = header.getBoundingClientRect();
      const x = Math.round(window.innerWidth / 2);
      // Probe just below the fixed 56px bar row, NOT the header's bottom — the
      // header grows when the menu opens, so `r.bottom` would drift into the
      // open panel and read the wrong band.
      const y = Math.max(1, Math.round(r.top + 56 - 2));
      const band = document
        .elementsFromPoint(x, y)
        .find(
          (el): el is HTMLElement =>
            el instanceof HTMLElement && el.classList.contains("band"),
        );
      const dark = Boolean(band?.classList.contains("ink"));
      header.classList.toggle("page-header--dark", dark);

      const yNow = window.scrollY;
      const delta = yNow - lastY;
      if (yNow <= 4) {
        header.classList.remove("is-hidden");
      } else if (delta > 8 && !pointerNearHeader) {
        header.classList.add("is-hidden");
      } else if (delta < -6) {
        header.classList.remove("is-hidden");
      }
      if (Math.abs(delta) > 1) lastY = yNow;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerNearHeader = event.clientY <= HEADER_REVEAL_ZONE;
      if (pointerNearHeader) {
        header.classList.remove("is-hidden");
        return;
      }

      const menuOpen = Boolean(
        header.querySelector('.gnav__trigger[aria-expanded="true"]'),
      );
      if (window.scrollY > 4 && !menuOpen) {
        header.classList.add("is-hidden");
      }
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
