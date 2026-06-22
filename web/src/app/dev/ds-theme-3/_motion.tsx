"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Page-scoped scroll-linked motion wrappers for `/dev/ds-theme-3`
 * ("Silver Nebula", Order 1: Open & Deep).
 *
 * These are NOT new DS sections or atoms — they are the page's transition layer
 * welding the light chapters to the single deep nebula chapter. They are the
 * ONLY place the `motion` package is wired on the page; every Lab* section's own
 * motion still rides the single `<ScrollFX/>` at the end. NO backdrop-blur /
 * frosted-glass approach is used (that direction was rejected) — every transition
 * is a scroll-linked slab/gradient and degrades to a static, non-overlapping
 * fallback under `prefers-reduced-motion` (also enforced in CSS). Layout/visuals
 * live in globals.css scoped under `.ds-theme-3`.
 *
 *   · LightToDarkRise   self-contained dark slab rising over the light bento → ink bridge
 *   · DarkToLightLift   wraps the light methodology; it lifts back over the dark cinema
 *   · GradientDissolve  CSS-gradient ramp light → nebula into the CTA finale
 */

/** Light → dark bridge. A self-contained transition BAND: a DARK rounded slab
 *  rises UP over the preceding light section as it enters (translateY 96→0,
 *  scale .965→1, top radius 40→0), carrying only an eyebrow + one line. Its
 *  bottom edge bleeds opaquely into the dark chapter (no white gap). 1px lens
 *  seam on its top edge. Reduced motion → static, flat. */
export function LightToDarkRise({
  eyebrow,
  line,
}: {
  eyebrow: string;
  line: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 40%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [96, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const style = reduce
    ? undefined
    : { y, scale, borderTopLeftRadius: radius, borderTopRightRadius: radius };
  return (
    <div ref={ref} className="ds3-riseover">
      <motion.div className="ds3-riseover__slab" style={style as never}>
        <span className="ds3-riseover__eyebrow">{eyebrow}</span>
        <p className="ds3-riseover__line">{line}</p>
      </motion.div>
    </div>
  );
}

/** Dark → light return. WRAPS the next light section (LabNumbered). The wrapped
 *  LIGHT surface slides UP and settles over the dark cinema (translateY 96→0,
 *  scale .965→1, top radius 40→0); negative top margin overlaps the cinema, soft
 *  light shadow, 1px lens seam on top. Mirrors ds-theme-2's `RiseOver --light`.
 *  Reduced motion → static, flat. */
export function DarkToLightLift({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 38%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [96, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const style = reduce
    ? undefined
    : { y, scale, borderTopLeftRadius: radius, borderTopRightRadius: radius };
  return (
    <motion.div ref={ref} className="ds3-lift" style={style as never}>
      {children}
    </motion.div>
  );
}

/** Light → dark dissolve. A self-contained CSS-gradient transition band (no real
 *  content) between the light QuietCta and the dark CTA band: a 5-stop ramp
 *  light → soft-tint → violet-gray → raised → nebula. A very subtle scrub-linked
 *  parallax on an inner accent layer keeps it alive without drama. Reduced motion
 *  → static. */
export function GradientDissolve() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const style = reduce ? undefined : { y };
  return (
    <div ref={ref} className="ds3-dissolve" aria-hidden="true">
      <motion.div className="ds3-dissolve__accent" style={style as never} />
    </div>
  );
}
