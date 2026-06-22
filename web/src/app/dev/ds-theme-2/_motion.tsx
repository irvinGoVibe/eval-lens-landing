"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Page-scoped scroll-linked motion wrappers for `/dev/ds-theme-2`.
 *
 * These are NOT new DS sections or atoms — they are the page's transition layer
 * (the brief asks for Lens Bridge / Frosted Glass Wipe / chapter rise). They are
 * the ONLY place the `motion` package is wired on the page; every Lab* section's
 * own motion still rides the single `<ScrollFX/>` at the end. All three degrade
 * to a static, non-overlapping fallback under `prefers-reduced-motion` (also
 * enforced in CSS). The shared liquid-glass material is reused via
 * `.bg-glass-tinted` — no one-off glass look. Layout/visuals live in globals.css
 * scoped under `.ds-theme-2`.
 */

/** Chapter rise: the wrapped section slides UP and settles over the previous
 *  section as it enters (scroll-linked, no blur). `--light` carries the light
 *  surface for the dark → light return; default carries the nebula surface. */
export function RiseOver({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
    <motion.div
      ref={ref}
      className={`ds2-riseover ${className}`}
      style={style as never}
    >
      {children}
    </motion.div>
  );
}

/** Lens Bridge: a glass "product window" that straddles the seam between the
 *  light editorial chapter and the darkening glass-wipe below it — one shared
 *  visual anchor tying the two surfaces. Subtle scrub-linked lift + scale. */
export function LensBridge({
  label,
  hint,
  ariaLabel,
}: {
  label: string;
  hint: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const style = reduce ? undefined : { y, scale };
  return (
    <div ref={ref} className="ds2-lens-bridge">
      <motion.figure
        className="ds2-lens-bridge__window bg-glass-tinted"
        style={style as never}
        role="img"
        aria-label={ariaLabel}
      >
        <span className="ds2-lens-bridge__sheen" aria-hidden="true" />
        <span className="ds2-lens-bridge__label">{label}</span>
        <span className="ds2-lens-bridge__hint">{hint}</span>
      </motion.figure>
    </div>
  );
}

/** Frosted Glass Wipe (Apple Vision Pro flavour): a sticky frosted glass slab
 *  travels across the viewport while the band behind it ramps from the light
 *  surface to the nebula — the surface changes "behind the glass". The slab
 *  carries the dark chapter's opening statement. Self-contained transition band
 *  (no other content), so it can never cover real content. Reduced motion →
 *  a static centered glass bridge (handled here + in CSS). */
export function GlassWipe({
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
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const slabStyle = reduce ? undefined : { y, scale };
  return (
    <section ref={ref} className="ds2-wipe" data-from="soft" data-to="ink">
      <div className="ds2-wipe__sticky">
        <div className="ds2-wipe__field" aria-hidden="true" />
        <motion.div
          className="ds2-wipe__slab bg-glass-tinted"
          style={slabStyle as never}
        >
          <span className="ds2-wipe__eyebrow">{eyebrow}</span>
          <p className="ds2-wipe__line">{line}</p>
        </motion.div>
      </div>
    </section>
  );
}
