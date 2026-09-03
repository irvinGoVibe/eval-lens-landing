import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { Button, Cinema, Eyebrow } from "@/components/ds";

export const metadata: Metadata = {
  title: "Visual Lab — EvalLens",
  description: "Internal catalog of current EvalLens backgrounds, surfaces and transitions.",
};

const surfaces = [
  { name: "Light", className: "light", note: "Editorial base for reading and comparison." },
  { name: "Soft", className: "soft", note: "Quiet separation without changing the reading mode." },
  { name: "Ink", className: "ink", note: "A deliberate cinematic or decision chapter." },
];

export default function VisualLabPage() {
  return (
    <main className="section-lab ds">
      <section className="band light">
        <div className="wrap" style={styles.hero}>
          <Eyebrow>Visual layer library</Eyebrow>
          <h1 style={styles.h1}>Visual Lab</h1>
          <p className="sub" style={styles.lead}>
            A compact stand for inspecting the current surface, transition and atmospheric
            primitives before they are used on production pages.
          </p>
          <nav style={styles.nav} aria-label="Design-system showcases">
            <Button href="/dev/ds-sections" variant="gradient">DS Sections</Button>
            <Button href="/dev/ds-atoms" variant="ghost">DS Atoms</Button>
            <Button href="/dev/ds-theme" variant="ghost">DS Theme</Button>
            <Button href="/dev/brandbook" variant="ghost">Brandbook</Button>
          </nav>
        </div>
      </section>

      <section className="band soft">
        <div className="wrap">
          <Eyebrow>Surface system</Eyebrow>
          <h2 className="title">Three tones, one visual language</h2>
          <div style={styles.grid}>
            {surfaces.map((surface) => (
              <article key={surface.name} className={surface.className} style={styles.card}>
                <code style={styles.code}>.band.{surface.className}</code>
                <h3 style={styles.cardTitle}>{surface.name}</h3>
                <p style={styles.cardBody}>{surface.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

      <section className="band ink bg-ink-ambient-glow">
        <div className="bg-ink-ambient-glow__layer" aria-hidden="true" />
        <div className="wrap" style={styles.demo}>
          <Eyebrow>Background primitive</Eyebrow>
          <h2 className="title">Ink ambient glow</h2>
          <p className="sub" style={styles.lead}>
            The atmosphere stays behind the content, preserves contrast and never becomes
            the primary message.
          </p>
          <code style={styles.code}>bg-ink-ambient-glow</code>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

      <section className="band light">
        <div className="wrap" style={styles.demo}>
          <Eyebrow>Transition primitive</Eyebrow>
          <h2 className="title">Cross-surface bridge</h2>
          <p className="sub" style={styles.lead}>
            Use transitions sparingly. A use-case detail page normally needs one decisive
            change into its cinematic close, not alternating dark and light stripes.
          </p>
          <div style={styles.transitionList}>
            <code style={styles.code}>light → ink</code>
            <code style={styles.code}>ink → light</code>
            <code style={styles.code}>soft → ink</code>
          </div>
        </div>
      </section>

      <Cinema
        surface="ink"
        eyebrow="Cinematic primitive"
        headline="Media becomes the message."
        mobileLines={["Media becomes", "the message."]}
        sub="The shared Cinema component is the canonical full-bleed transition for production pages."
        cta={{ label: "View the complete theme", href: "/dev/ds-theme" }}
        media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
      />

      <section className="band light">
        <div className="wrap" style={styles.demo}>
          <Eyebrow>Tonal zones</Eyebrow>
          <h2 className="title">Continuous backgrounds belong to a zone</h2>
          <p className="sub" style={styles.lead}>
            Inspect the live zone implementation separately so its fixed background layers
            do not compete with this stacked catalog.
          </p>
          <Button href="/dev/canvas-bg" variant="gradient" arrow>
            Open canvas backgrounds
          </Button>
        </div>
      </section>

      <ScrollFX />
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  hero: { paddingTop: "clamp(48px, 8vw, 112px)", paddingBottom: "clamp(48px, 8vw, 112px)" },
  h1: { margin: "18px 0 14px", fontSize: "clamp(52px, 9vw, 116px)", lineHeight: 0.92, letterSpacing: "-.07em" },
  lead: { maxWidth: "720px" },
  nav: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "16px", marginTop: "32px" },
  card: { minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px", border: "1px solid var(--border)", borderRadius: "24px", background: "var(--bg)", color: "var(--fg)" },
  cardTitle: { margin: "auto 0 10px", fontSize: "32px", letterSpacing: "-.04em" },
  cardBody: { margin: 0, maxWidth: "32ch", color: "var(--muted)", lineHeight: 1.55 },
  code: { width: "fit-content", padding: "6px 9px", border: "1px solid currentColor", borderRadius: "999px", fontSize: "11px", opacity: 0.72 },
  demo: { position: "relative", paddingTop: "clamp(72px, 10vw, 144px)", paddingBottom: "clamp(72px, 10vw, 144px)" },
  transitionList: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" },
};
