import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import {
  StatementHero,
  FullStatement,
  PinnedSteps,
  Gallery,
  EditorialSplit,
  Bento,
  ChipGrid,
  Cinema,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "EvalLense — Evidence-Based Reports for Pitch Evaluation",
  description:
    "Explainable reports from EvalLense: scores across every dimension with reasoning, a judge matrix, findings grounded in the deck, and deck-completeness signals — not a black box.",
};

/*
 * ── VISUAL SYSTEM — LIGHT "CINEMATIC INK" ────────────────────────────────
 * Composed entirely from the clean DS barrel `@/components/ds`. The page is a
 * LIGHT design-system build (container carries `ds`) with exactly TWO ink
 * cinematic peaks — #2 "Beyond the number" (FullStatement, surface="ink") and
 * #8 Final CTA (QuietCta, surface="ink"). The surface arc is anti-stripe:
 *   light · INK · light · soft · light · soft · light · INK.
 * Replaces the prior all-dark Nebula bespoke build (preserved in git). All 8
 * sections, their order, and the exact EN copy/facts carry over verbatim.
 *
 * ── MEDIA / OPEN ITEMS ───────────────────────────────────────────────────
 * The image generator is not wired up. Visual slots render as the DS `Media`
 * placeholder (visible, ratio-locked). The anatomy sample slot stays labeled
 * "real sample needed" (#1 trust lever — drop the live founder report here).
 * The "View Sample Report" secondary CTA stays a disabled element near the
 * primary CTA. CTA primary target is preserved as `/#demo`.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Motion is data-* only — the DS components already wire data-reveal /
 * data-pin. <ScrollFX/> is mounted once, after <Footer/>. No useEffect, no
 * ScrollOrchestrator.
 *
 * ── CONTENT CONSTRAINTS (brief) ──────────────────────────────────────────
 * Product name is always "EvalLense". Human-in-the-loop: "the final call always
 * yours". Exact formulas / the 0.15 constant are INTERNAL — not rendered here;
 * score formation is described qualitatively and cross-linked to Methodology.
 * Deck completeness is a SIGNAL about a missing/thin section, never a
 * fact-check / gap-analysis / due-diligence verdict. SourceRefs (slide number ·
 * title · note) are a real, shipped feature — presented as real.
 */

/* hero outcome stat-row — illustrative, framed as a 20–30 min manual read.
   Page-local markup (NOT a barrel section); rendered under the hero. */
const HERO_STATS = [
  {
    v: "20–30 min → 0",
    k: "human reading per deck — you start at the report, not the raw slides",
  },
  {
    v: "~40 hours",
    k: "reclaimed per 100-deck batch — a full review week of reading",
  },
  {
    v: "The whole batch",
    k: "evaluated in parallel, unattended — not one deck at a time",
  },
] as const;

/* 3. Anatomy — one report, three layers (brief §3). Exactly 3 steps. */
const ANATOMY = [
  {
    num: "01",
    label: "Project Summary",
    desc: "What the project is, how strong it looks, and what to probe: an AI summary, the score overview, strengths and weaknesses, why it can pass, why it can fail, and what to confirm live.",
  },
  {
    num: "02",
    label: "AI Score Report",
    desc: "The methodology, how the score was formed, a short conclusion from each judge, the judge contribution matrix, and a per-dimension breakdown.",
  },
  {
    num: "03",
    label: "Questions for Participants",
    desc: "Ready-made questions for live Q&A, grouped critical, important, and optional, each tied to the dimension it tests.",
  },
] as const;

/* 4. Inside the AI Score Report — one carousel of cards (key blocks + what else
   is in the report). No exact formulas / the 0.15 constant — internal only;
   the full model is cross-linked from the Methodology card's tag. */
const REPORT_CARDS = [
  {
    tag: "Per-dimension breakdown",
    title: "Every dimension, in the open",
    body: "For every dimension: the score, its confidence, what supports it, what lowers it, and what would move it up or down.",
  },
  {
    tag: "Judge contribution matrix",
    title: "Who weighed in where",
    body: "Which judge contributed to each dimension, with strong disagreements flagged, not averaged away.",
  },
  {
    tag: "Score formation",
    title: "How the score adds up",
    body: "A per-dimension view: each score, its weight, and its contribution to the total.",
  },
  {
    tag: "Methodology",
    title: "How the score is built",
    body: "The rules and the scale behind every dimension — how findings turn into a comparable score, and why the same deck always lands the same way. Read the full model on the Methodology page.",
    href: "/trust/methodology",
  },
  {
    tag: "Initial criteria",
    title: "The weights you set",
    body: "Your dimension weights, applied read-only across the whole batch — so every team is scored on the same basis you defined up front, not re-tuned deck by deck.",
  },
  {
    tag: "Judge conclusions",
    title: "Where each judge landed",
    body: "A short takeaway, the main concern, and one live question from each judge — their reasoning kept in brief and on the record, never averaged into the number.",
  },
] as const;

/* 5. Grounded — three points (left). */
const GROUNDED = [
  {
    title: "What supports, what lowers",
    body: "Each dimension lists the concrete signals that raised or reduced its score.",
  },
  {
    title: "Linked to the slide",
    body: "Every finding cites the exact slide — number, title, and note — so you can open it and check the claim against the source.",
  },
  {
    title: "Built for live Q&A",
    body: "See where a deck is thin before the team is in the room.",
  },
] as const;

/* 6. Deck completeness — 10 sections, severity info / warning / critical
   (brief §6, report.md §7). A SIGNAL about a missing/thin section — never a
   fact-check / verdict. */
const COMPLETENESS = [
  { name: "Problem", sev: "info" },
  { name: "Solution", sev: "info" },
  { name: "Market", sev: "warning" },
  { name: "Business model", sev: "info" },
  { name: "Traction", sev: "warning" },
  { name: "Team", sev: "info" },
  { name: "Roadmap", sev: "info" },
  { name: "Financials", sev: "critical" },
  { name: "Ask", sev: "warning" },
  { name: "Other", sev: "info" },
] as const;

/* completeness tiles — 3 bento items (signal, not verdict). */
const COMPLETENESS_TILES = [
  {
    tag: "Ten key sections",
    title: "Each one checked, present or thin",
    body: "Problem, Solution, Market, Business model, Traction, Team, Roadmap, Financials, Ask, and anything else — each checked for presence and depth.",
    feature: true,
  },
  {
    tag: "Severity, not noise",
    title: "A weighted signal, linked to a dimension",
    body: "Every gap is marked info, warning, or critical, and linked to the dimension it affects.",
  },
  {
    tag: "Not a fact-check",
    title: "It flags a gap, it doesn’t judge a claim",
    body: "Completeness flags a missing or thin section. It doesn’t validate the claims — that stays a human’s job in the room.",
  },
] as const;

/* 7. From shortlist to founder feedback — 5 cards (brief §7). */
const USES = [
  {
    tag: "Reviewer prep",
    title: "A briefed first read",
    body: "Walk in already knowing each deck's strengths, gaps, and what to ask.",
  },
  {
    tag: "Shortlist discussion",
    title: "A discussion you can defend",
    body: "Compare teams on the same structured basis, not gut feel.",
  },
  {
    tag: "Founder feedback",
    title: "Structured, actionable notes",
    body: "Give every team a concrete, structured read — not just a yes or a no.",
  },
  {
    tag: "Committee prep",
    title: "Material for the committee",
    body: "Bring a defensible, evidence-linked basis to the decision.",
  },
  {
    tag: "Batch archive",
    title: "A decision trail per batch",
    body: "Keep a clear record of how every team was evaluated.",
  },
] as const;

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/overview",
  links: [
    { label: "Anatomy", href: "#anatomy" },
    { label: "Score", href: "#score" },
    { label: "Grounded", href: "#grounded" },
  ],
};

export default function EvidenceBasedReportsPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="evidence-reports section-lab ds">
        {/* ── ONE continuous tonal zone (§1–§8): a single shared background that
            flips light→dark at the §6/§7 seam and holds dark through §7–8.
            Layer stack (z-index:-1, DOM order = back→front):
              1) --lobes        light BASE (always on)
              2) --lobes-dark   dark layer, faded 0→1 by <ZoneToneFlip/> (§6/§7)
            Cinema (§9, own video) + Footer stay OUTSIDE. ── */}
        <div className="ds-zone">
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes" aria-hidden="true" />
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          {/* light blobs over §1–6; clipped off the dark §7–8 tail (tune via ?blobs) */}
          <ZoneBlobs bottom="24%" />

        {/* 1. Hero — statement hero (light) + page-local illustrative stat-row. */}
        <StatementHero
          id="hero"
          surface="light"
          version={2}
          eyebrow="Evidence-Based Reports"
          titleLead="A score you can"
          titleAccent="explain,"
          titleTrail="with the evidence"
          sub="Walk into every review with a defensible read on each team — scores across each dimension, the reasoning behind them, and the questions to ask live. The final call always yours."
          ctas={[
            { label: "Book a Demo", href: "/#demo" },
            { label: "View Sample Report", href: "#" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · score linked to the deck · 16:9",
            hint: "A score with thin lines tracing back to deck slides — lens-gradient violet→cyan→aqua, calm",
            ariaLabel:
              "A score with quote-lines tracing back to slides of a pitch deck",
          }}
        />

        {/* hero outcome stat-row — page-local, illustrative (20–30 min read). */}
        <section
          className="band soft evr-statband"
          aria-label="Illustrative outcomes, based on a 20–30 minute manual read per deck"
        >
          <div className="wrap">
            <ul className="evr-stats" data-reveal="up">
              {HERO_STATS.map((s) => (
                <li key={s.v} className="evr-stat">
                  <span className="evr-stat__v">{s.v}</span>
                  <span className="evr-stat__k">{s.k}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. Beyond the number — full-bleed statement (light · v2, per inspector).
            Default DS reveal motion. */}
        <FullStatement
          surface="light"
          version={2}
          ariaLabel="Beyond the number — a score you can defend"
          eyebrow="Beyond the number"
          titleLead="A score you can’t explain is a score you can’t"
          titleAccent="defend"
          sub="A single number tells you where a deck landed, not why. Your team can’t defend a shortlist with it, founders can’t learn from it, and no one can audit it later. EvalLense hands you the reasoning, not just the result."
        />

        {/* 3. Anatomy — pinned multi-screen, exactly 3 layers. */}
        <PinnedSteps
          id="anatomy"
          surface="light"
          version={3}
          ariaLabel="Anatomy of the report — three layers from summary to questions"
          eyebrow="Anatomy of the report"
          title={{ line1: "One report,", line2: "three", line2Accent: "layers" }}
          sub="Each team’s report runs from a quick read to the full reasoning to the questions for live Q&A. Each layer opens as you scroll."
          steps={ANATOMY.map((a) => ({ num: a.num, label: a.label, desc: a.desc }))}
          media={{
            ratio: "4/3",
            label: "Sample · real report needed · 4:3",
            hint: "A live report embed — Project Summary with score, supports/lowers, and slide refs. #1 trust lever: drop the real founder sample here.",
            ariaLabel:
              "A live sample report — Project Summary with score, supports and lowers, and slide references",
          }}
        />

        {/* 4. Inside the AI Score Report — gallery (default DS reveal motion). */}
        <Gallery
          id="score"
          surface="light"
          ariaLabel="Inside the AI Score Report"
          eyebrow="Inside the AI Score Report"
          title="The reasoning, shown in the open"
          sub="The reasoning layer shows its work — nothing hidden behind a number."
          laneLabel="Inside the AI Score Report — scroll horizontally"
          items={REPORT_CARDS.map((c) => ({
            tag: c.tag,
            title: c.title,
            body: c.body,
            href: "href" in c ? c.href : undefined,
          }))}
        />

        {/* 5. Grounded — editorial split: 3 points + evidence visual.
            Default DS reveal motion. */}
        <EditorialSplit
          id="grounded"
          surface="light"
          ariaLabel="Grounded, not opaque"
          eyebrow="Grounded, not opaque"
          titleLead="Every finding links back to a"
          titleAccent="slide"
          sub="The report is built to be checked. Each score comes with what supports it and what lowers it, and every finding points to the slide it came from — so a claim reads as an observation, not an opinion."
          points={GROUNDED.map((g) => ({ title: g.title, body: g.body }))}
          media={{
            ratio: "4/3",
            label: "Image · slide ↔ finding · 4:3",
            hint: "A slide quote (number · title) next to the supports/lowers it grounds, thin connector lines, calm",
            ariaLabel:
              "A slide quote with a slide reference next to the supports and lowers it grounds",
          }}
        />
        {/* ── tone-flip seam (§6 → §7): transparent light→dark flip of the shared
            through-background — crossfades the --lobes-dark layer in as it crosses
            the viewport (canvas-bg mechanism, reusable, no flying heading). ── */}
        <ZoneToneFlip />

        {/* 6. Deck completeness — bento tiles + page-local severity grid. */}
        <Bento
          id="completeness"
          surface="ink"
          ariaLabel="Deck completeness — a signal, not a verdict"
          eyebrow="Deck completeness"
          title="See what the deck never covered"
          sub="Beyond scoring what’s there, the report flags what’s missing — the key sections a strong deck usually carries, and how serious each gap is. It’s a signal, not a verdict."
          items={COMPLETENESS_TILES.map((t) => ({
            tag: t.tag,
            title: t.title,
            body: t.body,
            feature: "feature" in t ? t.feature : undefined,
            // the ten key sections live INSIDE the "Ten key sections" feature card
            slot:
              "feature" in t && t.feature ? (
                <ChipGrid
                  bare
                  surface="ink"
                  columns={2}
                  ariaLabel="The ten key sections, with a severity signal each"
                  items={COMPLETENESS.map((c) => ({ name: c.name, sev: c.sev }))}
                  legend={[
                    { sev: "info", label: "info" },
                    { sev: "warning", label: "warning" },
                    { sev: "critical", label: "critical" },
                  ]}
                />
              ) : undefined,
          }))}
        />

        {/* 7. From shortlist to founder feedback — second gallery (ink,
            default DS reveal motion). */}
        <Gallery
          id="uses"
          surface="ink"
          ariaLabel="From shortlist to founder feedback"
          eyebrow="One report, many uses"
          title="From shortlist to founder feedback"
          sub="The same report works across the whole review, not just the score screen."
          laneLabel="Where the report is used — scroll horizontally"
          items={USES.map((u) => ({ tag: u.tag, title: u.title, body: u.body }))}
        />
        {/* ── /zone — Cinema (§9, own video) + Footer stay outside ── */}
        </div>

        {/* 8. Final CTA — DS Cinema (ink). Knockout: "AI prepares. You decide."
            Copy heading: brief §8 "See a real report on your own deck". */}
        <Cinema
          id="cta"
          surface="ink"
          eyebrow="Get started"
          headline="AI prepares. You decide."
          mobileLines={["AI prepares.", "You decide."]}
          sub="See a real report on your own deck — book a demo and walk through a full evaluation report: summary, reasoning, and the questions to ask live."
          cta={{ label: "Book a Demo", href: "/#demo" }}
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
