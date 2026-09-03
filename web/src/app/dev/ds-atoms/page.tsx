import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Button, Eyebrow, Media, Title } from "@/components/ds";

export const metadata: Metadata = {
  title: "DS Atoms — EvalLens",
  description: "Current EvalLens design-system atoms on light and ink surfaces.",
};

function Atom({
  name,
  api,
  children,
}: {
  name: string;
  api: string;
  children: ReactNode;
}) {
  return (
    <section style={styles.atom}>
      <header style={styles.atomHead}>
        <code style={styles.name}>{name}</code>
        <code style={styles.api}>{api}</code>
      </header>
      <div style={styles.surfaces}>
        <div className="light" style={styles.cell}>
          <span style={styles.label}>LIGHT</span>
          <div style={styles.stage}>{children}</div>
        </div>
        <div className="ink" style={{ ...styles.cell, ...styles.inkCell }}>
          <span style={styles.label}>INK</span>
          <div style={styles.stage}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function DsAtomsPage() {
  return (
    <main className="section-lab ds" style={styles.page}>
      <header style={styles.intro}>
        <Eyebrow>Design system · current public API</Eyebrow>
        <h1 style={styles.h1}>Atoms</h1>
        <p style={styles.lead}>
          The smallest reusable EvalLens elements, shown on both supported surfaces.
          Import them from <code>@/components/ds</code>.
        </p>
        <nav style={styles.nav} aria-label="Design-system showcases">
          <Button href="/dev/ds-sections" variant="gradient">Sections</Button>
          <Button href="/dev/ds-theme" variant="ghost">Theme page</Button>
          <Button href="/dev/visual-lab" variant="ghost">Visual lab</Button>
          <Button href="/dev/brandbook" variant="ghost">Brandbook</Button>
        </nav>
      </header>

      <div style={styles.list}>
        <Atom name="Eyebrow" api="{ children, reveal?, delay? }">
          <Eyebrow>Evidence before opinion</Eyebrow>
        </Atom>

        <Atom name="Title" api="{ title, accent?, reveal?, delay? }">
          <Title title="One system, every review room" accent="every review" />
        </Atom>

        <Atom name="Button" api="{ href?, variant, size?, arrow? }">
          <div style={styles.row}>
            <Button href="#" variant="gradient">Gradient</Button>
            <Button href="#" variant="ghost">Ghost</Button>
            <Button href="#" variant="glass">Glass</Button>
          </div>
        </Atom>

        <Atom name="Media" api="{ ratio, label, hint, ariaLabel }">
          <div style={styles.mediaWrap}>
            <Media
              ratio="16/9"
              label="Image · report evidence · 16:9"
              hint="A score linked to the slide and source behind it"
              ariaLabel="Design-system media placeholder"
            />
          </div>
        </Atom>

        <Atom name="Typography" api=".title · .sub · .caption · code">
          <div style={styles.typeStack}>
            <h3 style={styles.sampleTitle}>A defensible first read</h3>
            <p className="sub" style={styles.sampleBody}>
              Evidence-linked analysis that keeps the final decision human.
            </p>
            <span className="caption">REPORT · 07</span>
          </div>
        </Atom>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", padding: "clamp(32px, 5vw, 72px) var(--gutter) 96px" },
  intro: { width: "min(1120px, 100%)", margin: "0 auto 48px" },
  h1: { margin: "18px 0 12px", fontSize: "clamp(48px, 8vw, 104px)", lineHeight: 0.94, letterSpacing: "-.065em" },
  lead: { maxWidth: "680px", margin: 0, color: "var(--muted)", fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.5 },
  nav: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" },
  list: { width: "min(1120px, 100%)", margin: "0 auto", display: "grid", gap: "20px" },
  atom: { overflow: "hidden", border: "1px solid var(--border)", borderRadius: "24px", background: "var(--surface)" },
  atomHead: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", padding: "16px 20px", borderBottom: "1px solid var(--border)" },
  name: { color: "var(--violet)", fontWeight: 700 },
  api: { color: "var(--muted)", fontSize: "12px" },
  surfaces: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" },
  cell: { minWidth: 0, minHeight: "250px", padding: "20px", background: "var(--bg)", color: "var(--fg)" },
  inkCell: { background: "var(--bg-ink)", color: "var(--fg-ink)" },
  label: { fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: ".14em", opacity: 0.58 },
  stage: { minHeight: "190px", display: "grid", placeItems: "center", padding: "28px 8px" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" },
  mediaWrap: { width: "min(100%, 440px)" },
  typeStack: { width: "min(100%, 440px)" },
  sampleTitle: { margin: "0 0 12px", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1, letterSpacing: "-.045em" },
  sampleBody: { margin: "0 0 18px" },
};
