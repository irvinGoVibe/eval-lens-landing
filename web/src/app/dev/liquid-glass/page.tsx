import type { Metadata } from "next";

import { ScrollFX } from "@/components/ScrollFX";
import { FooterFrame } from "@/components/ds/FooterFrame";
import {
  StatementHero,
  Gallery,
  EditorialSplit,
  PinnedSteps,
  QuietCta,
} from "@/components/ds";

import "./liquid-glass.css";
import { LiquidSectionWrapper } from "./LiquidSectionWrapper";
import { ApertureReveal, GlassOcclusion, DepthPush, HeroPointer } from "./_motion";
import { RichBento } from "./RichBento";

export const metadata: Metadata = {
  title: "Liquid Glass",
  description:
    "Liquid Glass — a composition of existing DS-sections recomposed with atmospheric gradients, glass treatment and cinematic transitions. No section markup is changed.",
};

/* Content is the canonical DS-sections content (mirrors /dev/ds-sections). The
   sections are prop-driven; nothing is rewritten, reordered, or restructured —
   only the page-level composition, colours, gradients, glass and transitions. */

const BENTO_ITEMS = [
  {
    tag: "Pattern",
    title: "Background pattern language",
    body: "Soft lens grids, hairline structure and ambient media areas give pages enough context to judge sections.",
    feature: true,
    media: {
      label: "Image · pattern system · 16:9",
      hint: "Layered lens grid, section masks and media frames on a dark surface.",
      ariaLabel: "Background pattern system visual slot",
    },
  },
  { tag: "Motion", title: "One scroll runtime", body: "Sections use data attributes and the shared ScrollFX loop." },
  { tag: "Media", title: "Visible placeholders", body: "Every future image or video slot is labeled and ratio-locked." },
  { tag: "QA", title: "Reusable checks", body: "Each section can be inspected at mobile, tablet and desktop widths." },
];

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

const PINNED_STEPS = [
  { num: "01", label: "Intake", desc: "Drop in a batch of decks; each is parsed and queued for review." },
  { num: "02", label: "Read", desc: "The model reads every slide, pulling claims and the evidence behind them." },
  { num: "03", label: "Score", desc: "A fixed rubric turns findings into comparable, traceable signals." },
  { num: "04", label: "Rank", desc: "Scores roll up into one leaderboard you can defend line by line." },
  { num: "05", label: "Decide", desc: "A person signs off — the final call always stays human." },
];

export default function LiquidGlassPage() {
  return (
    <main className="liquid-glass-page section-lab ds">
      {/* ── 01 · Hero — StatementHero (dark) + external WebGL lens ─────────── */}
      <HeroPointer>
        <LiquidSectionWrapper gradient="hero-dynamic" theme="dark" className="lgx-wrap--hero" id="hero-lg">
          <StatementHero
            surface="ink"
            version={1}
            eyebrow="Batch pitch-deck evaluation"
            titleLead="AI prepares the analysis — a human"
            titleAccent="decides"
            sub="Batch-review pitch decks, rank the strongest startups, and give every team a clear, evidence-based report."
            ctas={[
              { label: "Book a demo", href: "#cta-lg" },
              { label: "See how it works", href: "#steps-lg" },
            ]}
            media={{
              ratio: "16/9",
              label: "Hero · lens",
              hint: "Lens-gradient violet→cyan→aqua over Apple-neutral, calm depth",
              ariaLabel: "Hero lens illustration",
            }}
          />
        </LiquidSectionWrapper>
      </HeroPointer>

      {/* ── 02 · Bento overview (dark) ───────────────────────────────────── */}
      <LiquidSectionWrapper gradient="dark-cyan" theme="dark">
        <RichBento
          eyebrow="Bento overview"
          title="A compact map of"
          titleAccent="reusable ingredients"
          sub="The bento pattern is for overview, not decoration: one large idea plus supporting tiles that explain how the system holds together."
          items={BENTO_ITEMS}
        />
      </LiquidSectionWrapper>

      {/* ── 03 · Horizontal gallery (light) — dark→light aperture reveal ──── */}
      <LiquidSectionWrapper gradient="light-atmospheric" theme="light" id="gallery-wrap-lg">
        <ApertureReveal>
          <Gallery
            id="gallery-lg"
            surface="light"
            ariaLabel="Horizontal gallery"
            eyebrow="Horizontal gallery"
            title="Equal ideas in one scrollable lane"
            sub="A horizontal lane keeps a set of equal ideas from becoming a tall wall of cards — for stages, report parts, segments and use cases."
            laneLabel="Investment stages — horizontally scrollable"
            items={GALLERY_ITEMS}
          />
        </ApertureReveal>
      </LiquidSectionWrapper>

      {/* ── 04 · Editorial split / report (light) — same-surface depth push ─ */}
      <LiquidSectionWrapper gradient="light-mesh" theme="light">
        <DepthPush>
          <EditorialSplit
            id="report-lg"
            surface="light"
            ariaLabel="Editorial split"
            eyebrow="Grounded, not opaque"
            titleLead="Every finding links back to a"
            titleAccent="slide"
            sub="The report is built to be checked — each score comes with what supports it and what lowers it."
            points={[
              { title: "What supports, what lowers", body: "Each dimension lists the concrete signals that raised or reduced its score." },
              { title: "Linked to the slide", body: "Every finding cites the exact slide — number, title, and note." },
              { title: "Built for live Q&A", body: "See where a deck is thin before the team is in the room." },
            ]}
            media={{
              ratio: "4/3",
              label: "Image · slide ↔ finding · 4:3",
              hint: "A slide quote beside the supports/lowers it grounds",
              ariaLabel: "A slide quote next to the finding it grounds",
            }}
          />
        </DepthPush>
      </LiquidSectionWrapper>

      {/* ── white → black bridge : dark glass occlusion panel ─────────────── */}
      <GlassOcclusion />

      {/* ── 05 · Pinned multi-screen / dark feature (dark) ───────────────── */}
      <LiquidSectionWrapper gradient="dark-edge-glow" theme="dark">
        <PinnedSteps
          id="steps-lg"
          surface="ink"
          ariaLabel="Pinned multi-screen — the five-step path"
          eyebrow="Pinned multi-screen"
          title={{ line1: "One fixed path,", line2: "five steps", line2Accent: "in sequence" }}
          sub="A tall pinned stage holds while the numbered steps light up one by one as you scroll — for any fixed, ordered process."
          steps={PINNED_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · pinned flow · 4:3",
            hint: "A five-step track whose nodes light up in sequence on an ink surface",
            ariaLabel: "A track of five steps whose nodes light up in sequence",
          }}
          videoScrub={{
            src: "/assets/methodology/methodology-transition.mp4",
            frames: 0,
            ariaLabel: "Methodology transition — scrubbed by scroll through the stages",
          }}
          photos={[
            "/assets/_demo-pool/photo/deck-vault.png",
            "/assets/_demo-pool/photo/deck-scan.png",
            "/assets/_demo-pool/photo/scoring-matrix.png",
            "/assets/_demo-pool/photo/dark-unicorn-head-front.jpeg",
            "/assets/_demo-pool/photo/jury-decision.png",
          ]}
        />
      </LiquidSectionWrapper>

      {/* ── 06 · Quiet CTA (dark) ────────────────────────────────────────── */}
      <LiquidSectionWrapper gradient="cta-focus" theme="dark" id="cta-lg">
        <QuietCta
          surface="ink"
          ariaLabel="Quiet CTA"
          eyebrow="Get started"
          title="See a real report on your own deck"
          sub="Book a demo and walk through a full evaluation report — summary, reasoning, and the questions to ask live."
          cta={{ label: "Book a Demo", href: "#" }}
        />
      </LiquidSectionWrapper>

      <FooterFrame />

      <ScrollFX />
    </main>
  );
}
