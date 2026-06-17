import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";

export const metadata: Metadata = {
  title: "EvalLense — Visual Lab",
  description:
    "Internal catalog for visual-layer primitives: ink ambient glow background and cross-surface gradient bridges.",
};

export default function VisualLabPage() {
  return (
    <>
      <main className="section-lab">
        {/* Page heading */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge v1
            </span>
            <h1 className="title">Visual layer primitives</h1>
            <p className="sub">
              Static catalog of the two approved visual-layer primitives:{" "}
              <code>bg-ink-ambient-glow</code> and <code>tr-gradient-bridge</code>.
              Eyeball text contrast over the glow and seam quality on each bridge.
            </p>
          </div>
        </section>

        {/* Demo A — bg-ink-ambient-glow */}
        <section className="band ink bg-ink-ambient-glow">
          <div className="bg-ink-ambient-glow__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Demo A · bg-ink-ambient-glow
            </span>
            <h2 className="title">
              Text stays readable over an <span className="grad-word">ambient glow</span>
            </h2>
            <p className="sub">
              The decorative radial layer sits behind the content with
              <code> pointer-events:none</code> and <code>aria-hidden</code>, while real
              copy is promoted above it. This paragraph exists so we can judge contrast and
              legibility of body text over the violet / cyan / aqua wash on the ink surface.
            </p>
            <p className="caption">bg-ink-ambient-glow</p>
          </div>
        </section>

        {/* Demo B — tr-gradient-bridge (four directions) */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Demo B · tr-gradient-bridge
            </span>
            <h2 className="title">Cross-surface bridges</h2>
            <p className="sub">
              Four required directions, each a short <code>from</code> band, the bridge, then
              the <code>to</code> band. Check that the seam blends cleanly with no banding.
            </p>
          </div>
        </section>

        {/* soft → ink */}
        <section className="band soft">
          <div className="wrap">
            <p className="sub">soft → ink · from (soft)</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true"></div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">soft → ink · to (ink)</p>
          </div>
        </section>

        {/* ink → soft */}
        <section className="band ink">
          <div className="wrap">
            <p className="sub">ink → soft · from (ink)</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true"></div>
        <section className="band soft">
          <div className="wrap">
            <p className="sub">ink → soft · to (soft)</p>
          </div>
        </section>

        {/* light → ink */}
        <section className="band">
          <div className="wrap">
            <p className="sub">light → ink · from (light)</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true"></div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">light → ink · to (ink)</p>
          </div>
        </section>

        {/* ink → light */}
        <section className="band ink">
          <div className="wrap">
            <p className="sub">ink → light · from (ink)</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true"></div>
        <section className="band">
          <div className="wrap">
            <p className="sub">ink → light · to (light)</p>
          </div>
        </section>
      </main>
      <ScrollFX />
    </>
  );
}
