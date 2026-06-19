import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dark themes showcase — Ink Refined · Nebula Deep",
  description:
    "Full design composition of the two registered dark themes: eyebrow, display type, gradient headings, glass buttons, chips, glass plates, stat band and CTA — built on real EvalLense tokens and components.",
};

/* A dev-only showcase: composes the registered dark-theme primitives
   (bg-ink-floor-glow / bg-nebula-layers / bg-nebula-blob / bg-glass-* /
   tr-lens-seam / heading-lens-gradient / motion-nebula-drift) with the real
   site UI (Button, .eyebrow, .chip, .title, .sub) into two full sections. */

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 18,
  marginTop: 40,
};

const plate: React.CSSProperties = {
  padding: "26px 24px",
  borderRadius: 18,
};

const statBand: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 24,
  marginTop: 48,
  paddingTop: 36,
  borderTop: "1px solid rgba(255,255,255,.10)",
};

function Dot() {
  return <span className="dot" aria-hidden="true" />;
}

export default function DarkShowcasePage() {
  return (
    <main>
      {/* ========================= INK REFINED ========================= */}
      <section className="band ink bg-ink-floor-glow">
        <div className="wrap">
          <span className="eyebrow">
            <Dot />
            Ink Refined · base dark theme
          </span>

          <h1
            className="title"
            style={{ maxWidth: 880, lineHeight: 1.04, marginTop: 4 }}
          >
            Evaluate every model decision with{" "}
            <span className="grad-word">measurable confidence</span>
          </h1>

          <p className="sub" style={{ maxWidth: 620 }}>
            A refined dark shell on the real elevation tokens — deep ink, a violet
            floor glow, and a hairline lens seam. The working surface for dense,
            text-heavy product pages.
          </p>

          <div
            className="cta-row"
            style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}
          >
            <Button variant="gradient" arrow href="#">
              Launch the app
            </Button>
            <Button variant="glass" href="#">
              Book a walkthrough
            </Button>
          </div>

          <div
            style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}
          >
            {["No prompt leakage", "Deterministic scoring", "Audit trail", "SOC-2 ready"].map(
              (c) => (
                <span className="chip" key={c}>
                  <span className="tick" aria-hidden="true" />
                  {c}
                </span>
              ),
            )}
          </div>

          <div style={cardGrid}>
            {[
              {
                t: "Consistency",
                b: "Re-run the same panel a thousand times and watch variance collapse to a flat line.",
              },
              {
                t: "Traceability",
                b: "Every verdict carries the rubric, the evidence and the model that produced it.",
              },
              {
                t: "Control",
                b: "Promotion gates that block a regression before it ever reaches production.",
              },
            ].map((c) => (
              <div className="bg-glass-plain" style={plate} key={c.t}>
                <h3 style={{ fontSize: 19, fontWeight: 500, margin: "0 0 10px" }}>
                  {c.t}
                </h3>
                <p style={{ margin: 0, color: "var(--fg-secondary-dark)", lineHeight: 1.5 }}>
                  {c.b}
                </p>
              </div>
            ))}
          </div>

          <div style={statBand}>
            {[
              { n: "10k+", l: "evaluations / run" },
              { n: "0.4%", l: "verdict variance" },
              { n: "5×", l: "faster review cycle" },
            ].map((s) => (
              <div key={s.l}>
                <div className="grad-word" style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-.02em" }}>
                  {s.n}
                </div>
                <div style={{ color: "var(--muted-on-dark)", marginTop: 6, fontSize: 15 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* hairline lens seam between the two themes */}
      <div className="tr-lens-seam tr-lens-seam--strong" aria-hidden="true" />

      {/* ========================= NEBULA DEEP ========================= */}
      <section className="band bg-nebula-layers bg-nebula-blob">
        <div className="bg-nebula-blob__layer motion-nebula-drift" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--nebula-fg-2)" }}>
            <Dot />
            Nebula Deep · accent dark theme
          </span>

          <h1
            className="heading-lens-gradient"
            style={{
              fontSize: "clamp(44px,7vw,84px)",
              fontWeight: 600,
              letterSpacing: "-.03em",
              lineHeight: 1.02,
              maxWidth: 960,
              margin: "4px 0 0",
            }}
          >
            The intelligence is visible. So is the ambition.
          </h1>

          <p
            className="sub"
            style={{ maxWidth: 640, color: "var(--nebula-fg-2)" }}
          >
            Warm ultra-dark base, a violet–cyan nebula that swells on scroll, and
            tinted glass that glows from within. Reserved for flagship and
            immersive, video-led pages.
          </p>

          <div
            style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}
          >
            <Button variant="gradient" arrow href="#">
              See it live
            </Button>
            <Button variant="glass" href="#">
              Watch the film
            </Button>
          </div>

          <div
            style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}
          >
            {["Cinematic", "Video-first", "Immersive scroll", "Brand gradient"].map(
              (c) => (
                <span className="chip" key={c}>
                  <span className="tick" aria-hidden="true" />
                  {c}
                </span>
              ),
            )}
          </div>

          <div style={cardGrid}>
            {[
              {
                t: "Nebula field",
                b: "Dual violet–cyan radials drift behind the content and intensify as the section pins.",
              },
              {
                t: "Tinted glass",
                b: "Cards that carry the brand hue inside the blur — structure that still feels lit.",
              },
              {
                t: "Gradient headline",
                b: "The lens gradient, clipped to display type — one cinematic moment per page.",
              },
            ].map((c, i) => (
              <div
                className={i === 1 ? "bg-glass-tinted bg-glass-tinted--accent" : "bg-glass-tinted"}
                style={plate}
                key={c.t}
              >
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    margin: "0 0 10px",
                    color: "var(--nebula-fg)",
                  }}
                >
                  {c.t}
                </h3>
                <p style={{ margin: 0, color: "var(--nebula-fg-2)", lineHeight: 1.5 }}>
                  {c.b}
                </p>
              </div>
            ))}
          </div>

          {/* CTA plate */}
          <div
            className="bg-glass-tinted bg-glass-tinted--accent"
            style={{
              ...plate,
              marginTop: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                className="heading-lens-gradient"
                style={{ fontSize: 28, fontWeight: 600, margin: "0 0 6px" }}
              >
                Ready to publish your first panel?
              </h3>
              <p style={{ margin: 0, color: "var(--nebula-fg-2)" }}>
                Spin up a jury in minutes — no infra, no prompt plumbing.
              </p>
            </div>
            <Button variant="gradient" arrow href="#">
              Get started
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
