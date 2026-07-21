"use client";

import { useEffect } from "react";

import { onScrollFrame } from "@/lib/scroll-bus";

/**
 * Makes the internal-page header adapt to the band it currently sits over.
 *
 * Internal pages alternate light `.band` and dark `.band.ink` sections. As the
 * page scrolls, whichever band passes under the sticky header decides the
 * header's variant: over a dark band it flips to `page-header--dark`, over a
 * light one it flips back. CSS transitions on the header's background/text turn
 * the swap into a smooth cross-fade rather than a hard cut.
 *
 * Internal pages don't mount `ScrollOrchestrator` (the homepage's rAF loop),
 * so this component owns the behavior for the whole internal-page surface. It
 * still shares the page-wide scroll frame (`@/lib/scroll-bus`) rather than
 * binding a listener of its own.
 */
export function HeaderThemeSync() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".page-header");
    if (!header) return;
    let lastY = window.scrollY;
    let pointerNearHeader = false;
    const HEADER_REVEAL_ZONE = 96;
    const sync = () => {
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
    const unsubscribeScroll = onScrollFrame(sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      unsubscribeScroll();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}
