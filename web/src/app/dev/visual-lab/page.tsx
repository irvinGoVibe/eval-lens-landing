import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabCinemaScrim } from "@/components/sections/lab/LabCinemaScrim";

export const metadata: Metadata = {
  title: "EvalLense — Visual Lab",
  description:
    "Internal catalog for visual-layer primitives: ink ambient glow background, cross-surface gradient bridges, batch 1 background layers (atmospheric, geometric, media scrim), batch 2 section transitions (hard cut, gradient bridge, blur, mist, pattern dissolve, masked divider, glow crossover), batch 3 ambient motion recipes (slow ambient drift, glow expansion, pattern reveal, crossfade, static), and batch 4 dark themes (Ink Refined: floor glow, lens seam, plain glass; Nebula Deep: nebula layers, nebula blob, tinted glass, video scrim, lens-gradient heading, nebula drift).",
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

        {/* Pointer — tonal zones (separate route; its fixed through-bg is page-global) */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Layer · tonal zones
            </span>
            <h2 className="title">
              Through-background <span className="grad-word">tonal zones</span>
            </h2>
            <p className="sub">
              The zone contract (transparent DS sections over one through-running
              background, default CSS light→dark flip on <code>--pin</code>) lives on its
              own route — its <code>position:fixed</code> layers are page-global and can&apos;t
              share a page with the stacked static demos here.{" "}
              <a href="/dev/visual-lab/zones">Open the tonal-zones stand →</a>
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

        {/* Demo C — tr-tone-flip (pinned tonal-flip zone) */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Demo C · tr-tone-flip
            </span>
            <h2 className="title">Pinned tonal-flip zone</h2>
            <p className="sub">
              A reusable, de-scoped generalization of the evidence-reports light→ink
              boundary: a sticky 150vh zone whose ink layer crossfades in via ScrollFX{" "}
              <code>--pin</code>. First plain, then the <code>--bloom</code> variant that
              passes the flip through a brand mid-frame so it never goes dirty grey.{" "}
              <strong>Needs real scroll</strong> — the flip is driven by the pinned zone
              scrolling past, so it only animates on a live, scrollable page.
            </p>
          </div>
        </section>

        {/* tr-tone-flip — plain (soft → ink) */}
        <section className="band soft">
          <div className="wrap">
            <p className="sub">tr-tone-flip · from (soft)</p>
          </div>
        </section>
        <div
          className="tr-tone-flip"
          data-from="soft"
          data-to="ink"
          data-pin
          data-pin-steps="1"
          aria-hidden="true"
        >
          <div className="tr-tone-flip__stage" data-pin-stage>
            <div className="tr-tone-flip__from"></div>
            <div className="tr-tone-flip__to"></div>
            <div className="tr-tone-flip__bloom-mid"></div>
            <div className="tr-tone-flip__bloom-glow"></div>
          </div>
        </div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">tr-tone-flip · to (ink)</p>
          </div>
        </section>

        {/* tr-tone-flip --bloom (soft → ink) */}
        <section className="band soft">
          <div className="wrap">
            <p className="sub">tr-tone-flip tr-tone-flip--bloom · from (soft)</p>
          </div>
        </section>
        <div
          className="tr-tone-flip tr-tone-flip--bloom"
          data-from="soft"
          data-to="ink"
          data-pin
          data-pin-steps="1"
          aria-hidden="true"
        >
          <div className="tr-tone-flip__stage" data-pin-stage>
            <div className="tr-tone-flip__from"></div>
            <div className="tr-tone-flip__to"></div>
            <div className="tr-tone-flip__bloom-mid"></div>
            <div className="tr-tone-flip__bloom-glow"></div>
          </div>
        </div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">tr-tone-flip--bloom · to (ink)</p>
          </div>
        </section>

        {/* ============ Backgrounds (batch 1) ============ */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge · backgrounds (batch 1)
            </span>
            <h2 className="title">Background layers</h2>
            <p className="sub">
              Each background is shown on its intended surface with real copy so we can
              judge text contrast and that the decorative layer never competes with
              content. Atmospherics are static (no animation), contained, and{" "}
              <code>aria-hidden</code> + <code>pointer-events:none</code>.
            </p>
          </div>
        </section>

        {/* bg-ink-ambient-glow (ink) */}
        <section className="band ink bg-ink-ambient-glow">
          <div className="bg-ink-ambient-glow__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              atmospheric · ink
            </span>
            <h2 className="title">
              Ambient glow on the <span className="grad-word">ink surface</span>
            </h2>
            <p className="sub">
              Violet anchor top-right, cyan anchor bottom-left, over the ink gradient.
              No green — the secondary radial is capped at <code>--cyan</code>. Body copy
              stays legible across the wash.
            </p>
            <p className="caption">bg-ink-ambient-glow</p>
          </div>
        </section>

        {/* bg-violet-halo — light */}
        <section className="band bg-violet-halo">
          <div className="bg-violet-halo__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              atmospheric · light
            </span>
            <h2 className="title">Violet halo over a light section</h2>
            <p className="sub">
              A single masked violet → lavender core anchored top-center. Faint enough to
              sit behind a heading and paragraph without tinting the text band.
            </p>
            <p className="caption">bg-violet-halo</p>
          </div>
        </section>

        {/* bg-violet-halo — ink */}
        <section className="band ink bg-violet-halo">
          <div className="bg-violet-halo__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              atmospheric · ink
            </span>
            <h2 className="title">
              Violet halo on <span className="grad-word">ink</span>
            </h2>
            <p className="sub">
              The <code>.band.ink</code> context pushes the violet core a touch stronger so
              the halo reads on black. Still one core only, no shimmer beyond cyan.
            </p>
            <p className="caption">bg-violet-halo (ink)</p>
          </div>
        </section>

        {/* bg-cool-mist — soft */}
        <section className="band soft bg-cool-mist">
          <div className="bg-cool-mist__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              atmospheric · soft
            </span>
            <h2 className="title">Cool mist over the soft surface</h2>
            <p className="sub">
              Two very faint radials (cyan top-right, lavender bottom-left) anchored away
              from the center-left text column. All stops sit under a visible tint band.
            </p>
            <p className="caption">bg-cool-mist</p>
          </div>
        </section>

        {/* bg-dot-grid — light */}
        <section className="band bg-dot-grid">
          <div className="bg-dot-grid__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              geometric · light
            </span>
            <h2 className="title">Dot grid on a light section</h2>
            <p className="sub">
              A masked 22px dot field using <code>--fg</code> at 8%, dissolving toward the
              edges. Reads as faint texture behind real content.
            </p>
            <p className="caption">bg-dot-grid</p>
          </div>
        </section>

        {/* bg-dot-grid — ink */}
        <section className="band ink bg-dot-grid">
          <div className="bg-dot-grid__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              geometric · ink
            </span>
            <h2 className="title">
              Dot grid on <span className="grad-word">ink</span>
            </h2>
            <p className="sub">
              The ink variant swaps to white dots at 6% so the field is visible on black
              without overpowering body copy.
            </p>
            <p className="caption">bg-dot-grid (ink)</p>
          </div>
        </section>

        {/* bg-line-field — light */}
        <section className="band bg-line-field">
          <div className="bg-line-field__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              geometric · light
            </span>
            <h2 className="title">Line field on a light section</h2>
            <p className="sub">
              Dual 42px grid — violet verticals, cyan horizontals — dissolved with an
              ellipse mask. Mirrors the existing lab pattern grammar.
            </p>
            <p className="caption">bg-line-field</p>
          </div>
        </section>

        {/* bg-concentric-rings — soft */}
        <section className="band soft bg-concentric-rings">
          <div className="bg-concentric-rings__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              geometric · soft
            </span>
            <h2 className="title">Concentric rings over soft</h2>
            <p className="sub">
              Repeating radial rings at a 36px pitch (to avoid moiré), faded out with an
              ellipse mask. Quiet enough to live behind a heading and paragraph.
            </p>
            <p className="caption">bg-concentric-rings</p>
          </div>
        </section>

        {/* bg-media-scrim — sample media container */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              media-assisted · scrim
            </span>
            <h2 className="title">Media scrim (legibility overlay)</h2>
            <p className="sub">
              A pointer-safe overlay for media containers — not the full page. The figure
              below proves contrast: a placeholder media surface, the scrim, then a caption
              and heading sitting above both. Light variant left, ink variant right.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "28px",
              }}
            >
              {/* light scrim */}
              <figure
                style={{
                  position: "relative",
                  margin: 0,
                  aspectRatio: "16 / 9",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, var(--lavender), var(--cyan))",
                }}
              >
                <div className="bg-media-scrim" aria-hidden="true"></div>
                <figcaption
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "6px",
                    padding: "20px",
                    color: "var(--fg)",
                  }}
                >
                  <strong style={{ fontSize: "20px", letterSpacing: "-.01em" }}>
                    Readable over a light wash
                  </strong>
                  <span className="caption">bg-media-scrim</span>
                </figcaption>
              </figure>

              {/* ink scrim */}
              <figure
                style={{
                  position: "relative",
                  margin: 0,
                  aspectRatio: "16 / 9",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, var(--violet), var(--cyan))",
                }}
              >
                <div className="bg-media-scrim bg-media-scrim--ink" aria-hidden="true"></div>
                <figcaption
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "6px",
                    padding: "20px",
                    color: "var(--fg-on-dark)",
                  }}
                >
                  <strong style={{ fontSize: "20px", letterSpacing: "-.01em" }}>
                    Readable over a dark scrim
                  </strong>
                  <span className="caption" style={{ color: "var(--muted-on-dark)" }}>
                    bg-media-scrim--ink
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ Transitions (batch 2) ============ */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge · transitions (batch 2)
            </span>
            <h2 className="title">Section transitions</h2>
            <p className="sub">
              Each transition is shown as a real <code>from</code> section, the
              transition element or modifier, then a real <code>to</code> section — all
              with live text so the seam is judged against actual content. Decorative
              layers are <code>aria-hidden</code> + <code>pointer-events:none</code>,
              contained (no <code>100vw</code>, no negative margins), and any motion is
              reduced-motion gated.
            </p>
          </div>
        </section>

        {/* (2) tr-gradient-bridge — four key directions adjacent for comparison */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              transition 2 · tr-gradient-bridge (multi-stop)
            </span>
            <h2 className="title">Per-direction gradient bridges</h2>
            <p className="sub">
              The four high-contrast directions are placed back-to-back so the dark-phase
              and cool-midpoint handling can be compared without scrolling: ink→light,
              light→ink, soft→ink, ink→soft.
            </p>
          </div>
        </section>

        {/* ink → light */}
        <section className="band ink">
          <div className="wrap">
            <p className="sub">ink → light · from (ink). The bridge below holds black, dips through a cool grey, then lands on white.</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true"></div>
        <section className="band">
          <div className="wrap">
            <p className="sub">ink → light · to (light). No beige cast at the midpoint.</p>
          </div>
        </section>

        {/* light → ink */}
        <section className="band">
          <div className="wrap">
            <p className="sub">light → ink · from (light). White is held longer before the brief dark phase.</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true"></div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">light → ink · to (ink). Reads as a deliberate descent into black.</p>
          </div>
        </section>

        {/* soft → ink */}
        <section className="band soft">
          <div className="wrap">
            <p className="sub">soft → ink · from (soft). Starts from the soft surface tone, not pure white.</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true"></div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">soft → ink · to (ink).</p>
          </div>
        </section>

        {/* ink → soft */}
        <section className="band ink">
          <div className="wrap">
            <p className="sub">ink → soft · from (ink).</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true"></div>
        <section className="band soft">
          <div className="wrap">
            <p className="sub">ink → soft · to (soft). Lands on the soft surface tone, midpoint stays cool.</p>
          </div>
        </section>

        {/* low-contrast light↔soft (near-flat, short) */}
        <section className="band">
          <div className="wrap">
            <p className="sub">light → soft · from (light). Near-flat short bridge for low-contrast seams.</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true"></div>
        <section className="band soft">
          <div className="wrap">
            <p className="sub">light → soft · to (soft).</p>
          </div>
        </section>

        <section className="band soft">
          <div className="wrap">
            <p className="sub">soft → light · from (soft).</p>
          </div>
        </section>
        <div className="tr-gradient-bridge" data-from="soft" data-to="light" aria-hidden="true"></div>
        <section className="band">
          <div className="wrap">
            <p className="sub">soft → light · to (light). Completes all six surface directions.</p>
          </div>
        </section>

        {/* (5) tr-pattern-dissolve */}
        <section className="band">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              transition 5 · tr-pattern-dissolve
            </span>
            <h2 className="title">Pattern dissolve</h2>
            <p className="sub">
              A surface gradient carrying a low-opacity dot field that fades at both edges.
              Not a page-level pattern continuation — it lives only inside the seam. Below
              uses an ink→soft direction with a white-ish dot color.
            </p>
          </div>
        </section>
        <div className="tr-pattern-dissolve" data-from="light" data-to="soft" aria-hidden="true"></div>
        <section className="band soft">
          <div className="wrap">
            <p className="sub">light → soft pattern dissolve (border-hairline dots). Below: ink → soft, line variant.</p>
          </div>
        </section>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">ink → soft · from (ink).</p>
          </div>
        </section>
        <div
          className="tr-pattern-dissolve tr-pattern-dissolve--lines"
          data-from="ink"
          data-to="soft"
          aria-hidden="true"
        ></div>
        <section className="band soft">
          <div className="wrap">
            <p className="sub">ink → soft · to (soft). White-ish line grid dissolving at the edges.</p>
          </div>
        </section>

        {/* (6) tr-masked-divider — both variants */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              transition 6 · tr-masked-divider
            </span>
            <h2 className="title">Masked divider (diagonal + dome)</h2>
            <p className="sub">
              The from-surface is the base; the to-surface is revealed through a mask edge.
              No glow or drop-shadow on the edge. Diagonal variant first, dome variant
              second.
            </p>
          </div>
        </section>
        {/* diagonal: soft → ink */}
        <section className="band soft">
          <div className="wrap">
            <p className="sub">diagonal · soft → ink · from (soft).</p>
          </div>
        </section>
        <div
          className="tr-masked-divider tr-masked-divider--diagonal"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        ></div>
        <section className="band ink">
          <div className="wrap">
            <p className="sub">diagonal · soft → ink · to (ink). The ink wedge enters from the lower-right.</p>
          </div>
        </section>
        {/* dome: ink → light */}
        <section className="band ink">
          <div className="wrap">
            <p className="sub">dome · ink → light · from (ink).</p>
          </div>
        </section>
        <div
          className="tr-masked-divider tr-masked-divider--dome"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        ></div>
        <section className="band">
          <div className="wrap">
            <p className="sub">dome · ink → light · to (light). A light dome rises from the bottom edge.</p>
          </div>
        </section>

        {/* (7) tr-glow-crossover — section modifiers */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              transition 7 · tr-glow-crossover
            </span>
            <h2 className="title">Glow crossover</h2>
            <p className="sub">
              A violet/cyan bloom anchored to the bottom edge of one section, echoed faintly
              at the top of the next. The glow is contained by the section&apos;s own
              <code> overflow:hidden</code> and never fills the surface.
            </p>
          </div>
        </section>
        <section className="band ink band--glow-crossover-bottom">
          <div className="wrap">
            <p className="sub">
              from (ink) with <code>band--glow-crossover-bottom</code>. The bloom collects at
              this section&apos;s lower edge; this text stays above it on z-index 2.
            </p>
          </div>
        </section>
        <section className="band band--glow-crossover-top">
          <div className="wrap">
            <p className="sub">
              to (light) with <code>band--glow-crossover-top</code> — a faint violet echo at
              the top edge completes the crossover across the seam.
            </p>
          </div>
        </section>

        {/* (1) tr-hard-cut — section modifier */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              transition 1 · tr-hard-cut
            </span>
            <h2 className="title">Hard cut</h2>
            <p className="sub">
              The default for low-contrast light↔soft seams: zero height, no element, no
              visible line. On ink sections a 1px hairline keeps the cut intentional. Below:
              a soft→light hard cut (invisible by design), then an ink section carrying the
              hairline.
            </p>
          </div>
        </section>
        <section className="band soft band--hard-cut-after">
          <div className="wrap">
            <p className="sub">soft section with <code>band--hard-cut-after</code> — no visible line, the surfaces just meet.</p>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <p className="sub">light section directly below — the low-contrast seam reads clean without any bridge.</p>
          </div>
        </section>
        <section className="band ink band--hard-cut-after">
          <div className="wrap">
            <p className="sub">
              ink section with <code>band--hard-cut-after</code> — a 1px inset white hairline
              at the bottom edge makes the cut read as deliberate.
            </p>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <p className="sub">light section below the ink hard cut.</p>
          </div>
        </section>

        {/* ============ Motion (batch 3) ============ */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge · motion (batch 3)
            </span>
            <h2 className="title">Ambient motion recipes</h2>
            <p className="sub">
              Five reusable motion recipes wired to the existing{" "}
              <code>ScrollFX</code> runtime — no new animation engine. Recipes
              animate only <code>transform</code>/<code>opacity</code>; ambient
              loops are <code>prefers-reduced-motion</code> gated, and
              scrub/reveal recipes settle to their end state automatically
              (ScrollFX pins <code>--scrub:1</code>). Motion is applied{" "}
              <em>on top of</em> existing decorative layers, which stay{" "}
              <code>aria-hidden</code> + <code>pointer-events:none</code>.
            </p>
          </div>
        </section>

        {/* motion-slow-ambient-drift — on a violet halo (ink) */}
        <section className="band ink bg-violet-halo">
          <div
            className="bg-violet-halo__layer motion-slow-ambient-drift"
            aria-hidden="true"
          ></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              motion-slow-ambient-drift · ambient loop
            </span>
            <h2 className="title">
              The halo <span className="grad-word">drifts</span> slowly
            </h2>
            <p className="sub">
              <code>motion-slow-ambient-drift</code> is applied to the{" "}
              <code>bg-violet-halo__layer</code> element. It runs a 24s
              translate/scale loop via <code>@keyframes vl-ambient-drift</code>,
              wrapped in <code>@media (prefers-reduced-motion: no-preference)</code>
              {" "}— so the halo is perfectly static for anyone who opts out of
              motion. The body copy never moves.
            </p>
            <p className="caption">motion-slow-ambient-drift (24s loop, RM-gated)</p>
          </div>
        </section>

        {/* motion-glow-expansion — scrub-driven glow on an ink section */}
        <section
          className="band ink bg-ink-ambient-glow"
          data-scrub
        >
          <div
            className="bg-ink-ambient-glow__layer motion-glow-expansion"
            aria-hidden="true"
          ></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              motion-glow-expansion · scrub-driven
            </span>
            <h2 className="title">
              Glow <span className="grad-word">expands</span> as you scroll
            </h2>
            <p className="sub">
              The section carries <code>data-scrub</code>; ScrollFX writes{" "}
              <code>--scrub</code> 0→1 as it crosses the viewport. The glow layer
              has <code>motion-glow-expansion</code>, which maps that to a
              <code> scale(.92→1.04)</code> and <code>opacity(.45→1)</code>. The
              default <code>var(--scrub,1)</code> means it shows fully before any
              scroll and under reduced motion (ScrollFX pins{" "}
              <code>--scrub:1</code>).
            </p>
            <p className="caption">motion-glow-expansion (consumer adds data-scrub)</p>
          </div>
        </section>

        {/* motion-pattern-reveal — dot grid fades in via data-reveal */}
        <section className="band bg-dot-grid">
          <div
            className="bg-dot-grid__layer motion-pattern-reveal"
            data-reveal="fade"
            aria-hidden="true"
          ></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              motion-pattern-reveal · reveal primitive
            </span>
            <h2 className="title">Pattern fades in on enter</h2>
            <p className="sub">
              <code>motion-pattern-reveal</code> reuses the existing{" "}
              <code>[data-reveal]</code> primitive — no new keyframes. The dot
              field carries <code>data-reveal=&quot;fade&quot;</code>; ScrollFX
              adds <code>.is-in</code> when it enters the viewport, and the helper
              adds an <code>80ms</code> stagger so the texture settles a beat
              after the content. Under reduced motion it is shown immediately.
            </p>
            <p className="caption">motion-pattern-reveal (data-reveal=&quot;fade&quot;)</p>
          </div>
        </section>

        {/* motion-crossfade — two stacked layers cross-faded by scroll */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              motion-crossfade · scrub-driven
            </span>
            <h2 className="title">Two layers cross-fade on scroll</h2>
            <p className="sub">
              The boxed element below carries <code>data-scrub</code> and stacks a{" "}
              <code>__from</code> layer (violet → cyan wash) over a{" "}
              <code>__to</code> layer (a dot pattern). As <code>--scrub</code>{" "}
              runs 0→1, <code>__from</code> fades out and <code>__to</code> fades
              in. Under reduced motion ScrollFX pins <code>--scrub:1</code>, so it
              lands on the <code>__to</code> layer.
            </p>

            <div
              className="motion-crossfade"
              data-scrub
              style={{
                position: "relative",
                marginTop: "28px",
                aspectRatio: "16 / 6",
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              {/* from: color wash */}
              <div
                className="motion-crossfade__from"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(135deg, var(--violet), var(--cyan))",
                }}
              ></div>
              {/* to: dot pattern */}
              <div
                className="motion-crossfade__to bg-dot-grid"
                aria-hidden="true"
                style={{ background: "var(--bg-soft)" }}
              >
                <div className="bg-dot-grid__layer" aria-hidden="true"></div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px",
                }}
              >
                <span className="caption">
                  motion-crossfade (__from wash → __to pattern)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* motion-static — captioned note for completeness (no motion) */}
        <section className="band">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              motion-static · default
            </span>
            <h2 className="title">Static is the default</h2>
            <p className="sub">
              There is no <code>motion-static</code> class — static is simply the
              absence of any motion recipe. A decorative layer with none of the
              recipes above does not move. This note is here so the catalog covers
              the full set; the section itself intentionally has no animation.
            </p>
            <p className="caption">motion-static (no class, no rule)</p>
          </div>
        </section>

        {/* ============ Cinematic media → ink (m-cinema generalized) ============ */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge · cinematic scrim
            </span>
            <h2 className="title">
              Cinematic media → ink{" "}
              <span className="grad-word">(m-cinema generalized)</span>
            </h2>
            <p className="sub">
              <code>LabCinemaScrim</code> is the methodology page&apos;s pre-footer{" "}
              <code>.m-cinema</code> scene lifted into one prop-driven primitive on
              an un-scoped <code>.lab-cinema</code> class group. Scroll through the
              section below: the media plays full-bleed, a black scrim drops in, the
              headline letters descend and zoom from huge → 1 (the video shows{" "}
              <em>only</em> through the letters), a <code>--lens</code> fill resolves
              the letters to a solid brand gradient, then the eyebrow, sub and CTA
              reveal. Motion is 100% driven by <code>--pin</code> via the page&apos;s
              existing <code>ScrollFX</code> (<code>data-pin</code>); mobile and
              reduced-motion fall back to a static black statement.
            </p>
          </div>
        </section>

        <LabCinemaScrim
          eyebrow="Get started"
          headline="See the methodology on your own decks"
          sub="Run an AI jury over your own pitch decks and watch the evaluation play out end to end — evidence-linked scores, with the final call yours."
          cta={{ label: "Book a Demo", href: "/#demo" }}
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
        />

        {/* ============ Dark themes (batch 4) ============ */}
        <section className="band soft">
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              visual-layer-forge · dark themes (batch 4)
            </span>
            <h2 className="title">Dark-theme primitives</h2>
            <p className="sub">
              Two reusable dark surfaces: <strong>Ink Refined</strong> (a bottom
              floor glow, a lens-gradient hairline seam, and neutral plain glass)
              and <strong>Nebula Deep</strong> (a layered violet base, a
              pin-driven nebula blob, tinted glass, and a video scrim). Decorative
              layers stay <code>aria-hidden</code> +{" "}
              <code>pointer-events:none</code>, contained, and any motion is
              reduced-motion gated.
            </p>
          </div>
        </section>

        {/* Ink Refined — bg-ink-floor-glow, with a lens seam into the next ink section */}
        <section className="band ink bg-ink-floor-glow">
          <div className="bg-ink-floor-glow__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Ink Refined · bg-ink-floor-glow
            </span>
            <h2 className="title">
              A violet glow rises from the{" "}
              <span className="grad-word">floor</span>
            </h2>
            <p className="sub">
              Unlike <code>bg-ink-ambient-glow</code> (anchored top-center), this
              floor glow sits at the bottom edge. Body copy in violet-tinted ink
              (<code>--fg-secondary-dark</code>) stays comfortably readable across
              the wash.
            </p>
            <p
              className="sub"
              style={{ color: "var(--fg-secondary-dark)" }}
            >
              Refined ink body text on <code>--fg-secondary-dark</code> — a
              violet-tinted secondary foreground for the Ink Refined theme.
            </p>
            <p className="caption">bg-ink-floor-glow</p>
          </div>
        </section>

        {/* tr-lens-seam between two ink sections */}
        <div className="tr-lens-seam" aria-hidden="true"></div>

        <section className="band ink bg-ink-floor-glow">
          <div className="bg-ink-floor-glow__layer" aria-hidden="true"></div>
          <div className="wrap">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Ink Refined · tr-lens-seam + bg-glass-plain
            </span>
            <h2 className="title">A lens-gradient hairline ties sections</h2>
            <p className="sub">
              The 1px <code>tr-lens-seam</code> above carries the violet → cyan
              brand gradient as a crisp seam. Use <code>tr-lens-seam--strong</code>
              {" "}for higher-contrast joins. Below: a neutral{" "}
              <code>bg-glass-plain</code> card on the ink surface.
            </p>

            <div
              className="bg-glass-plain"
              style={{
                marginTop: "28px",
                maxWidth: "440px",
                padding: "24px",
                borderRadius: "var(--radius-card)",
                color: "var(--fg-on-dark)",
              }}
            >
              <strong style={{ fontSize: "18px", letterSpacing: "-.01em" }}>
                Plain glass card
              </strong>
              <p
                className="caption"
                style={{ marginTop: "8px", color: "var(--muted-on-dark)" }}
              >
                bg-glass-plain — neutral 6% white surface, no tint
              </p>
            </div>

            {/* strong seam sample */}
            <div
              className="tr-lens-seam tr-lens-seam--strong"
              aria-hidden="true"
              style={{ marginTop: "28px" }}
            ></div>
            <p className="caption" style={{ marginTop: "10px" }}>
              tr-lens-seam--strong
            </p>
          </div>
        </section>

        {/* Nebula Deep — bg-nebula-layers + bg-nebula-blob + heading-lens-gradient + bg-glass-tinted */}
        <section
          className="band bg-nebula-layers bg-nebula-blob"
          data-pin
        >
          <div
            className="bg-nebula-blob__layer motion-nebula-drift"
            aria-hidden="true"
          ></div>
          <div className="wrap">
            <span
              className="eyebrow"
              style={{ color: "var(--nebula-fg-muted)" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Nebula Deep · bg-nebula-layers + bg-nebula-blob
            </span>
            <h1 className="title heading-lens-gradient">
              Nebula Deep statement
            </h1>
            <p className="sub">
              The section sets <code>bg-nebula-layers</code> (dark violet base)
              and a <code>bg-nebula-blob</code> whose <code>__layer</code> drifts
              via <code>motion-nebula-drift</code> and swells with{" "}
              <code>--pin</code> from ScrollFX. The H1 uses{" "}
              <code>heading-lens-gradient</code> — reserved for hero / statement
              headlines only.
            </p>

            <div
              className="bg-glass-tinted"
              style={{
                marginTop: "28px",
                maxWidth: "440px",
                padding: "24px",
                borderRadius: "var(--radius-card)",
                color: "var(--nebula-fg)",
              }}
            >
              <strong style={{ fontSize: "18px", letterSpacing: "-.01em" }}>
                Tinted glass card
              </strong>
              <p style={{ marginTop: "8px", color: "var(--nebula-fg-2)" }}>
                bg-glass-tinted — violet-tinted glass for the nebula surface.
              </p>
              <p
                className="caption"
                style={{ marginTop: "12px", color: "var(--nebula-fg-muted)" }}
              >
                bg-glass-tinted (+ --accent for hover/active glow)
              </p>
            </div>

            {/* accent variant sample */}
            <div
              className="bg-glass-tinted bg-glass-tinted--accent"
              style={{
                marginTop: "20px",
                maxWidth: "440px",
                padding: "20px",
                borderRadius: "var(--radius-card)",
                color: "var(--nebula-fg)",
              }}
            >
              <span className="caption" style={{ color: "var(--nebula-fg-2)" }}>
                bg-glass-tinted--accent (glowing border)
              </span>
            </div>
          </div>
        </section>

        {/* Nebula Deep — bg-nebula-video-scrim over a media placeholder */}
        <section className="band bg-nebula-layers bg-nebula-layers--raised">
          <div className="wrap">
            <span
              className="eyebrow"
              style={{ color: "var(--nebula-fg-muted)" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Nebula Deep · bg-nebula-video-scrim
            </span>
            <h2 className="title" style={{ color: "var(--nebula-fg)" }}>
              Twin scrim for media
            </h2>
            <p className="sub">
              <code>bg-nebula-video-scrim</code> stacks a no-blend readability
              ramp (<code>::before</code>) and a screen-blended violet color-leak
              wash (<code>::after</code>) over media. Text sits above both at{" "}
              <code>z-index:2</code>.
            </p>

            <figure
              className="bg-nebula-video-scrim"
              style={{
                position: "relative",
                margin: "28px 0 0",
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, var(--violet), var(--cyan))",
              }}
            >
              <figcaption
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "6px",
                  padding: "20px",
                  color: "var(--nebula-fg)",
                }}
              >
                <strong style={{ fontSize: "20px", letterSpacing: "-.01em" }}>
                  Readable over media, with a violet color leak
                </strong>
                <span
                  className="caption"
                  style={{ color: "var(--nebula-fg-muted)" }}
                >
                  bg-nebula-video-scrim
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
      <ScrollFX />
    </>
  );
}
