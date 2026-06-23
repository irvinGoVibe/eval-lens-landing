import type { Metadata } from "next";
import { TransitionsDemo } from "./TransitionsDemo";
import "./scroll-transitions.css";

/**
 * dev/scroll-transitions — ISOLATED prototype of the TONE-FLIP transition
 * (light → dark) for section boundaries, driven by GSAP ScrollTrigger.
 *
 * The transition sits between TWO real DS sections (light StatementHero on top,
 * dark FullStatement below). The heading BELONGS to the bottom dark section.
 * On scroll through the pinned middle section:
 *   1. the bottom section's heading RIDES UP from below into the centre, over
 *      the still-light gradient;
 *   2. once centred, the background flips light → dark via a 3-layer OPACITY
 *      crossfade through a vivid aurora BLOOM (no moving seam, no grey) and the
 *      heading INVERTS black → white;
 *   3. by the pin's end the gradient == the dark section below and the heading
 *      is centred — so it hands off to the bottom section's own (identical,
 *      centred) heading: it "settles into its place".
 *
 * Reusable boundary move (cf. /dev/parallax-spike's opacity crossfade), NOT a
 * forbidden `tr-gradient-bridge`. Pixel-perfect handoff would want GSAP Flip.
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
