import type { Metadata } from "next";
import "./gradient-dark-lobes.css";

/**
 * dev/gradient-dark-lobes — focused stand for tuning the PAIRED DARK "lobes"
 * canvas gradient (the CSS counterpart of `.ds-canvas__bg--lobes`, used by the
 * tone-flip seam on /dev/canvas-bg). Scroll-snap through full-viewport
 * candidates; each carries a sample heading + glass card so we judge the
 * gradient AND light-on-dark legibility. The winner is promoted into
 * `.ds-canvas__bg--lobes-dark`. Not wired into the real site.
 */
export const metadata: Metadata = {
  title: "Gradient · dark lobes (dev)",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    key: "v2a",
    label: "V2-A · Balanced triad",
    eyebrow: "Full brand spectrum",
    sub: "Violet, cyan and blue spread across the top for the full brand spectrum, sinking into a clean black floor.",
  },
  {
    key: "v2b",
    label: "V2-B · Richer violet",
    eyebrow: "Punchier ribbon",
    sub: "A warmer, deeper violet ribbon up top with a cyan mid-left accent — the strongest brand presence.",
  },
  {
    key: "v2c",
    label: "V2-C · Wide calm",
    eyebrow: "Quiet premium",
    sub: "A single broad low-opacity ribbon, the most black and restrained — the quiet read for dense content.",
  },
] as const;

export default function GradientDarkLobesPage() {
  return (
    <main className="gdl">
      {/* V5 · CSS sparks — soft brand "вспышки" that float + breathe in the centre */}
      <section className="gdl-panel">
        <div className="gdl-bg gdl-bg--sparks" aria-hidden="true">
          <span className="gdl-spark gdl-spark--1" />
          <span className="gdl-spark gdl-spark--2" />
          <span className="gdl-spark gdl-spark--3" />
        </div>
        <div className="gdl-sample">
          <span className="gdl-label">V5 · CSS sparks</span>
          <p className="gdl-eyebrow">floating brand flashes</p>
          <h2 className="gdl-h">
            <span className="gdl-accent">Evidence</span> over opinion
          </h2>
          <p className="gdl-sub">
            Pure-CSS brand вспышки that slowly float and breathe in the centre over black — the dark-Bento motion, no video.
          </p>
          <div className="gdl-card">
            <h3>Glass card on the dark canvas</h3>
            <p>Frosts the gradient behind it — a quick legibility check for cards, scores and copy sitting over the dark surface.</p>
          </div>
        </div>
      </section>

      {VARIANTS.map((v) => (
        <section className="gdl-panel" key={v.key}>
          <div className={`gdl-bg gdl-bg--${v.key}`} aria-hidden="true" />
          <div className="gdl-sample">
            <span className="gdl-label">{v.label}</span>
            <p className="gdl-eyebrow">{v.eyebrow}</p>
            <h2 className="gdl-h">
              <span className="gdl-accent">Evidence</span> over opinion
            </h2>
            <p className="gdl-sub">{v.sub}</p>
            <div className="gdl-card">
              <h3>Glass card on the dark canvas</h3>
              <p>Frosts the gradient behind it — a quick legibility check for cards, scores and copy sitting over the dark surface.</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
