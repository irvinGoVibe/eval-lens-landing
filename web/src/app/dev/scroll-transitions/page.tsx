import type { Metadata } from "next";
import { TransitionsDemo } from "./TransitionsDemo";
import "./scroll-transitions.css";

/**
 * dev/scroll-transitions — ISOLATED prototype of the TONE-FLIP transition
 * (light → dark) for section boundaries, driven by GSAP ScrollTrigger.
 *
 * The transition sits between TWO real DS sections (light StatementHero on top,
 * dark FullStatement below). On scroll through the pinned middle section:
 *   - one heading (eyebrow + lens accent + subtitle) rides UP into the centre
 *     and HOLDS there;
 *   - the background flips light → dark via a 3-layer OPACITY crossfade (no
 *     moving seam) through a vivid aurora BLOOM, not grey;
 *   - the heading INVERTS black → white as the dark surface arrives.
 *
 * This is the reusable boundary move — the approved through-flip family (cf.
 * /dev/parallax-spike's opacity crossfade), NOT a forbidden `tr-gradient-bridge`.
 *
 * All GSAP runs client-side inside <TransitionsDemo/> (useGSAP, auto-cleanup,
 * scoped, prefers-reduced-motion aware). Everything is scoped under `.tg`.
 * Throwaway dev stand — do NOT import elsewhere, do NOT touch globals.css.
 */
export const metadata: Metadata = {
  title: "Scroll transitions (dev)",
  robots: { index: false, follow: false },
};

export default function ScrollTransitionsPage() {
  return <TransitionsDemo />;
}
