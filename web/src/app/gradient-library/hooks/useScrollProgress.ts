"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-progress (0 → 1) of an element travelling through the viewport.
 *
 * Progressive enhancement / fallback strategy:
 *  - An IntersectionObserver gates work so we only listen to scroll while the
 *    element is on screen (never blocks scrolling, no per-frame work off-view).
 *  - While visible, a passive scroll/resize listener maps the element's centre
 *    travel to 0..1. Reverses naturally on up-scroll.
 *  - `enabled = false` (e.g. native CSS `animation-timeline: view()` is
 *    supported and opted into, or reduced-motion) skips all of it.
 *
 * Returns a ref to attach and the live progress value.
 */
export function useScrollProgress(enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let visible = false;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element's top hits the bottom of the viewport,
      // 1 when its bottom passes the top — i.e. full travel through view.
      const total = vh + r.height;
      const travelled = vh - r.top;
      const p = Math.min(1, Math.max(0, travelled / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(compute);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) compute();
      },
      { threshold: 0 },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    compute();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return { ref, progress };
}
