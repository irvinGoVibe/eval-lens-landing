"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Copy-to-clipboard with a transient "copied" flag and a textarea fallback. */
export function useClipboard(resetMs = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetMs],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { copied, copy };
}

/** Tracks the OS `prefers-reduced-motion` setting, live. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True on coarse (touch) pointers — used to disable pointer-reactive presets. */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}

/**
 * Scroll-progress (0 → 1) of an element travelling through the viewport.
 *  - An IntersectionObserver gates work to while the element is on screen.
 *  - A passive scroll/resize listener maps centre-travel to 0..1, reversing
 *    naturally on up-scroll.
 *  - `enabled = false` (reduced motion, or off-screen) skips all listeners.
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
      const total = vh + r.height;
      const travelled = vh - r.top;
      setProgress(Math.min(1, Math.max(0, travelled / total)));
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
