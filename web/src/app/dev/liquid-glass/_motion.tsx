"use client";

/**
 * EXTERNAL transition layer for /dev/liquid-glass.
 *
 * Every effect here wraps a DS-section from OUTSIDE or sits BETWEEN sections as
 * its own element. None of them touch a section's DOM, layout, order, spacing or
 * text — they only add clip-path / transform / opacity on an external wrapper or
 * seam. Internal section reveals are owned by `<ScrollFX/>` (the DS sections use
 * `data-reveal`), not by this file.
 *
 * Built on `motion` (Framer Motion v12 — already in the repo, no new dep).
 * Reversible (scroll-linked) and reduced-motion-safe.
 *
 *   · ApertureReveal   — external clip-path circle opening over a section
 *   · GlassOcclusion   — dark frosted glass panel expanding across a seam
 *   · DepthPush        — external depth push (scale) on a same-surface seam
 *   · HeroPointer      — pointer parallax for the hero gradient field
 */

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/* ApertureReveal — clip-path circle opening as a section scrolls in.
   Purely visual on an external wrapper; the section inside is untouched. */
export function ApertureReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });
  const radius = useTransform(scrollYProgress, [0, 1], [16, 130]);
  const clip = useTransform(radius, (r) => `circle(${r}% at 50% 42%)`);
  return (
    <div ref={ref} className="lgx-aperture">
      <motion.div
        className="lgx-aperture__inner"
        style={reduce ? undefined : { clipPath: clip, willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* GlassOcclusion — the white→black bridge. A dark frosted glass panel expands
   from a slit to fill the seam and then dissolves, revealing the dark section
   below. Lives entirely in its own seam element between two wrappers. */
export function GlassOcclusion() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const inset = useTransform(scrollYProgress, [0.1, 0.45, 0.8], [46, 0, 0]);
  const clip = useTransform(inset, (v) => `inset(${v}% 0% ${v}% 0%)`);
  const opacity = useTransform(scrollYProgress, [0.05, 0.4, 0.7, 0.96], [0, 1, 1, 0]);
  if (reduce) return <div className="lgx-seam lgx-seam--static" aria-hidden />;
  return (
    <div ref={ref} className="lgx-seam lgx-seam--occ" aria-hidden>
      <motion.div className="lgx-occ" style={{ clipPath: clip, opacity, willChange: "clip-path, opacity" }} />
    </div>
  );
}

/* DepthPush — a gentle depth push on an external wrapper, for same-surface
   seams where a full occlusion would be too much. Scale only, never layout. */
export function DepthPush({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.62"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 1]);
  return (
    <div ref={ref}>
      <motion.div
        style={reduce ? undefined : { scale, opacity, transformOrigin: "center top", willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* HeroPointer — pointer parallax for the hero gradient field. Sets CSS vars on
   an external wrapper; the gradient layer (a child) reads them. No section DOM. */
export function HeroPointer({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--lgx-mx", `${nx * 40}px`);
        el.style.setProperty("--lgx-my", `${ny * 30}px`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);
  return (
    <div ref={ref} className="lgx-pointer">
      {children}
    </div>
  );
}
