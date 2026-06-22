import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import "./overlap-spike.css";

/**
 * dev/overlap-spike — ISOLATED, throwaway proof-of-concept.
 *
 * Proves ONE thing: a scroll-driven OVERLAP transition between stacked
 * full-width sections — a LIGHT section A that a DARK/ink section B glides up
 * and bleeds over as you scroll, then a LIGHT section C that rises back over
 * the ink on exit.
 *
 * Motion is driven ONLY by ScrollFX (`<ScrollFX/>` writes `--scrub` 0→1 on the
 * `[data-scrub]` overlap wrappers). All geometry/feather/glow is CSS, scoped
 * under `.overlap-spike` (co-located overlap-spike.css). No real page, no
 * shared component, no third-party anim lib is touched.
 *
 * See overlap-spike.css for the full mechanics writeup.
 */
export const metadata: Metadata = {
  title: "Overlap spike (dev)",
  robots: { index: false, follow: false },
};

export default function OverlapSpikePage() {
  return (
    <>
      <main className="overlap-spike">
        {/* 1 — LIGHT section A (top, visible at scroll=0 with start of overlap) */}
        <section className="ovl-sec ovl-light">
          <div className="ovl-inner">
            <span className="ovl-eyebrow">Section A · Light</span>
            <h2>Where the story begins, in daylight.</h2>
            <p>
              A calm, bright opening on our base surface. Scroll down and watch
              the next section glide up and bleed over this one — no hard divider
              line, just a soft cinematic cross-fade at the seam.
            </p>
          </div>
        </section>

        {/* 2 — OVERLAP A→B: DARK ink section B rises over A.
            The wrapper carries data-scrub; ScrollFX writes --scrub 0→1 as it
            crosses the viewport, which drives the glide + seam bloom. */}
        <div className="ovl-overlap" data-scrub>
          <section className="ovl-sec ovl-ink">
            <span className="ovl-seam" aria-hidden="true" />
            <div className="ovl-inner">
              <span className="ovl-eyebrow">Section B · Ink</span>
              <h2>The room dims, and depth takes over.</h2>
              <p>
                This dark panel doesn&rsquo;t land as a rectangle — its top edge
                is feathered, so the light section above bleeds softly through
                while it rises into place. A faint violet glow blooms at the
                seam during the cross, then settles.
              </p>
            </div>
          </section>
        </div>

        {/* 3 — OVERLAP B→C: LIGHT section C rises back over the ink on exit. */}
        <div className="ovl-overlap ovl-overlap--exit" data-scrub>
          <section className="ovl-sec ovl-rise ovl-light--soft">
            <span className="ovl-seam ovl-seam--exit" aria-hidden="true" />
            <div className="ovl-inner">
              <span className="ovl-eyebrow">Section C · Light</span>
              <h2>And we surface again, back into the light.</h2>
              <p>
                The exit mirrors the entrance: this light section glides up over
                the ink with the same feathered seam, so you cross back out of
                the dark moment as smoothly as you fell into it.
              </p>
            </div>
          </section>
        </div>

        <div className="ovl-tail" aria-hidden="true" />
      </main>

      {/* Mount the scroll engine once, after content. */}
      <ScrollFX />
    </>
  );
}
