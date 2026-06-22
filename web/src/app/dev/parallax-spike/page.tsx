import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import "./parallax-spike.css";

/**
 * dev/parallax-spike — ISOLATED, throwaway proof-of-concept.
 *
 * Proves ONE thing, cleanly: a CONTINUOUS through-background ("сквозной фон")
 * behind transparent stacked sections that FLIPS light→dark FAST, in one pass.
 *
 * Two FIXED full-viewport layers behind transparent sections:
 *   - layer A (.px-bg-light) — the EXACT hero gradient (globals.css
 *     `.lab-hero__bg`), used verbatim.
 *   - layer B (.px-bg-dark)  — the hero's INK gradient
 *     (`.lab-hero.ink .lab-hero__bg`), REVERSED (angle 132deg → 312deg) so it
 *     mirrors A. It sits on top of A and crossfades in (opacity 0→1).
 *
 * THE FAST ONE-PASS FLIP — progress that is genuinely 0 at the very top
 * --------------------------------------------------------------------
 * The flip is driven by a `[data-pin]` section (.px-driver) placed FIRST in
 * the page. ScrollFX's pin maths is `--pin = clamp01(-rect.top / (height - vh))`:
 * at scrollY=0 the section top sits at the viewport top, so `rect.top === 0`
 * and `--pin === 0`. (A `[data-scrub]` element at the page top reads ≈0.48 at
 * scrollY=0 — its progress maps an element CROSSING the viewport, so a top-of-
 * page element is already half-crossed. That was the muddy-gray-at-top bug.)
 *
 * The pin track is SHORT — total height ≈ 2× viewport, so `height - vh ≈ vh`,
 * i.e. `--pin` travels 0→1 across ~one viewport of scroll, then ScrollFX clamps
 * it to 1 for the rest of the page (HOLD dark). Layer B is a CHILD of the pin
 * section, so it inherits `--pin` via the CSS cascade even though it is
 * `position:fixed` (custom-property inheritance follows the DOM tree, not the
 * layout containing block). `opacity:var(--pin)` crossfades B in — 0 at the top
 * (fully light), 1 after one viewport (fully dark).
 *
 * Sections are transparent so the two layers read as one continuous
 * background — no per-section bg, no seams. Text recolors: the first section
 * reads against light (`--fg`); the rest carry `.px-on-dark` (`--fg-on-dark`)
 * since the flip is fast and the background is dark by then.
 *
 * Motion: only the `--pin` crossfade (CSS) + gentle `data-reveal` entrance.
 * No per-section useEffect, no anim lib. prefers-reduced-motion: layer B is
 * forced fully opaque (dark state) and reveals show immediately.
 */
export const metadata: Metadata = {
  title: "Parallax spike (dev)",
  robots: { index: false, follow: false },
};

export default function ParallaxSpikePage() {
  return (
    <>
      <main className="parallax-spike">
        {/* ── Through-background: two fixed full-viewport layers ────────────
            A = the exact hero gradient (light). B = the reversed ink hero
            gradient (dark), crossfaded in over the short driver below. */}
        <div className="px-bg-light" aria-hidden="true" />

        {/* First-in-page [data-pin] driver: ~2× viewport tall so --pin travels
            0→1 across ~one viewport of scroll. --pin is 0 at scrollY=0 (the
            section top sits at the viewport top → rect.top === 0), so the flip
            genuinely starts fully light. Layer B lives INSIDE it so it inherits
            --pin even while position:fixed. */}
        <div className="px-driver" data-pin data-pin-steps="1" aria-hidden="true">
          <div className="px-bg-dark" aria-hidden="true" />
        </div>

        {/* ── Transparent content sections ─────────────────────────────────── */}
        <section className="px-sec" data-reveal="up">
          <div className="px-inner">
            <span className="px-eyebrow">Continuous background</span>
            <h2>One background, behind everything.</h2>
            <p>
              Two fixed layers read as a single through-background — not one per
              section. It opens on the exact hero gradient: a calm violet-to-cyan
              wash over soft white, showing through every block.
            </p>
          </div>
        </section>

        {/* The flip is fast: by here the dark layer has crossfaded in. Text
            recolors to the light token so it stays legible. */}
        <section className="px-sec px-on-dark" data-reveal="up">
          <div className="px-inner">
            <span className="px-eyebrow">Fast one-pass flip</span>
            <h2>Scroll a little — it goes dark.</h2>
            <p>
              The dark layer is the hero ink gradient, mirrored. It crossfades in
              over a single short pass near the top, so the whole background
              flips light→dark quickly, then holds.
            </p>
          </div>
        </section>

        <section className="px-sec px-on-dark" data-reveal="up">
          <div className="px-inner">
            <span className="px-eyebrow">Into the dark</span>
            <h2>The same background, now ink.</h2>
            <p>
              This is not a black box dropped into the layout — it is the same
              continuous background, simply held at its dark end. The copy stays
              readable against the deep gradient.
            </p>
          </div>
        </section>

        <section className="px-sec px-on-dark" data-reveal="up">
          <div className="px-inner">
            <span className="px-eyebrow">No seam</span>
            <h2>It flips, it never cuts.</h2>
            <p>
              There is no divider between sections. The crossfade carries the
              whole page in one breath, from the hero light to the mirrored ink.
            </p>
          </div>
        </section>

        <section className="px-sec px-on-dark" data-reveal="up">
          <div className="px-inner">
            <span className="px-eyebrow">Held dark</span>
            <h2>One surface, top to bottom.</h2>
            <p>
              Past the first pass the background stays dark — the same
              uninterrupted surface it opened with in light. Clean, quiet, and
              entirely premium.
            </p>
          </div>
        </section>
      </main>

      {/* Mount the scroll engine once, after content — drives --scrub + reveals. */}
      <ScrollFX />
    </>
  );
}
