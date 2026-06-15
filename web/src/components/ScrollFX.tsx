"use client";

import { useEffect } from "react";

/**
 * Scroll FX runtime for INTERNAL pages (not the homepage — that's
 * ScrollOrchestrator). One shared rAF loop per page, opt-in purely via
 * data-attributes, with proper cleanup so client-side navigation between
 * pages neither stacks listeners nor leaves the engine dead.
 *
 *   [data-reveal]                fade/translate in on enter (IO).
 *     variants: data-reveal="fade|up|left|right|scale"
 *     stagger:  style={{ "--reveal-delay": "120ms" }}
 *   [data-scrub]                 writes --scrub 0→1 as it crosses the viewport.
 *   [data-pin][data-pin-steps=N] tall track + sticky [data-pin-stage];
 *     writes --pin 0→1 and lights [data-pin-step] children sequentially
 *     (.is-active cumulative, .is-current = the active one, --pin-step index).
 *
 * Respects prefers-reduced-motion: reveals show immediately, pins settle
 * fully revealed, scrubs pin to a static end state.
 *
 * Mount once per internal page (after the footer), like the homepage mounts
 * ScrollOrchestrator. Keeps the CLAUDE.md rule: no per-section useEffect —
 * a single loop drives the whole page.
 */
export function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    /* 1 — reveal on enter */
    const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
    let io: IntersectionObserver | null = null;
    if (reveals.length) {
      if (reduce) {
        reveals.forEach((el) => el.classList.add("is-in"));
      } else {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-in");
                io?.unobserve(e.target);
              }
            });
          },
          { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
        );
        reveals.forEach((el) => io!.observe(el));
      }
    }

    /* 2 + 3 — scrub & pin share one rAF loop */
    const scrubs = Array.from(document.querySelectorAll("[data-scrub]")) as HTMLElement[];
    const pins = Array.from(document.querySelectorAll("[data-pin]")) as HTMLElement[];

    if (reduce) {
      scrubs.forEach((el) => el.style.setProperty("--scrub", "1"));
      pins.forEach((section) => {
        section.style.setProperty("--pin", "1");
        section.querySelectorAll("[data-pin-step]").forEach((it) => {
          it.classList.add("is-active", "is-current");
        });
      });
      return () => io?.disconnect();
    }

    if (!scrubs.length && !pins.length) {
      return () => io?.disconnect();
    }

    const paintScrub = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = vh + r.height;
      const traveled = vh - r.top;
      el.style.setProperty("--scrub", clamp01(total > 0 ? traveled / total : 0).toFixed(4));
    };

    const paintPin = (section: HTMLElement) => {
      const declared = parseInt(section.getAttribute("data-pin-steps") || "0", 10);
      const items = Array.from(section.querySelectorAll("[data-pin-step]"));
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = section.offsetHeight - vh;
      const p = scrollable > 0 ? clamp01(-r.top / scrollable) : r.top < vh ? 1 : 0;
      section.style.setProperty("--pin", p.toFixed(4));
      const n = declared || items.length || 1;
      if (items.length) {
        const activeIdx = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
        items.forEach((it, i) => {
          it.classList.toggle("is-active", i <= activeIdx);
          it.classList.toggle("is-current", i === activeIdx);
        });
        section.style.setProperty("--pin-step", String(activeIdx));
      }
    };

    let rafPending = false;
    const paint = () => {
      rafPending = false;
      scrubs.forEach(paintScrub);
      pins.forEach(paintPin);
    };
    const schedule = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
