import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import Image from "next/image";
import {
  StatementHero,
  PinnedSteps,
  Gallery,
  EditorialSplit,
  Bento,
  ChipGrid,
  RiskControl,
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
    v: "Skip the first read",
    k: "Start with the report, not the raw deck.",
  },
  {
    v: "Up to 40 hours saved",
    k: "Across 100 decks, that can save a full week of reading.",
  },
  {
    v: "Review all decks at once",
    k: "Decks are processed in parallel, not one by one.",
  },
] as const;

/* 3. Anatomy — one report, three layers (brief §3). Exactly 3 steps. */
const ANATOMY = [
  {
    num: "01",
    label: "Project Summary",
    desc: "The fast read: what the project does, how it scored, where it looks strong, and what to verify live.",
  },
  {
    num: "02",
    label: "AI Score Report",
    desc: "See what shaped the score, how each judge contributed, and how every dimension affected the result.",
  },
  {
    num: "03",
    label: "Questions for Live Q&A",
    desc: "Ready-to-use questions, ranked by priority and linked to the dimension each one tests.",
  },
] as const;

/* 4. Inside the AI Score Report — one carousel of cards (key blocks + what else
   is in the report). No exact formulas / the 0.15 constant — internal only;
   the full model is cross-linked from the Methodology card's tag. */
const REPORT_CARDS = [
  {
    tag: "Per-dimension breakdown",
    title: "What raised it. What lowered it.",
    body: "For each dimension, see the score, confidence, what supports it, what lowers it, and what would change it.",
  },
  {
    tag: "Judge contribution matrix",
    title: "How each judge contributed",
    body: "See who contributed to each dimension and where strong disagreements were flagged.",
  },
  {
    tag: "Score formation",
    title: "How the total adds up",
    body: "See each dimension score, its weight, and its contribution to the final result.",
  },
  {
    tag: "Methodology",
    title: "The rules behind the score",
    body: "The scale and scoring rules used consistently across every deck.",
    href: "/trust/methodology",
  },
  {
    tag: "Initial criteria",
    title: "Your weights, fixed across the batch",
    body: "Your criteria stay read-only and apply to every team on the same basis.",
  },
  {
    tag: "Judge conclusions",
    title: "Each judge, on the record",
    body: "A takeaway, main concern, and live question from every judge.",
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
/* Sample completeness output for one deck — turns the abstract section list into
   a concrete result: present rows read quiet, gaps carry severity + the affected
   dimension (drives the ChipGrid `status` / `dimension` pills). */
const COMPLETENESS = [
  { name: "Problem", sev: "info", status: "present" },
  { name: "Solution", sev: "info", status: "present" },
  { name: "Market", sev: "warning", status: "thin", dimension: "P3 Market" },
  { name: "Business model", sev: "info", status: "present" },
  { name: "Traction", sev: "info", status: "thin", dimension: "P4 Traction" },
  { name: "Team", sev: "info", status: "present" },
  { name: "Roadmap", sev: "info", status: "present" },
  { name: "Financials", sev: "critical", status: "missing", dimension: "P5 Viability" },
  { name: "Ask", sev: "warning", status: "thin" },
  { name: "Other", sev: "info", status: "present" },
] as const;

/* completeness tiles — 3 bento items (signal, not verdict). */
const COMPLETENESS_TILES = [
  {
    tag: "10 core sections",
    title: "Present, thin, or missing",
    body: "Problem, Solution, Market, Business Model, Traction, Team, Roadmap, Financials, Ask, and Other — each checked for presence and depth.",
    feature: true,
  },
  {
    tag: "Severity",
    title: "Every gap ranked by severity",
    body: "Each gap is marked info, warning, or critical and linked to the dimension it affects.",
  },
  {
    tag: "Not a fact-check",
    title: "Missing does not mean false",
    body: "Completeness flags missing or thin coverage. It does not validate the claim itself — that remains a human judgment.",
  },
] as const;

/* 7. Across the review — 5 use cases as RiskControl pairs. Left = a moment in the
   review process (per-row tag + the use case); right = the concrete outcome
   (per-row tag + what the report gives you). */
const USES = [
  {
    leftTag: "Before review",
    risk: "Reviewer prep",
    rightTag: "What you know",
    control:
      "A briefed first read — walk in already knowing each deck's strengths, gaps, and what to ask.",
  },
  {
    leftTag: "During shortlisting",
    risk: "Shortlist discussion",
    rightTag: "What you can defend",
    control: "Compare teams on the same structured basis, not gut feel.",
  },
  {
    leftTag: "After review",
    risk: "Founder feedback",
    rightTag: "What you can share",
    control:
      "Give every team concrete, structured feedback — not just a yes or no.",
  },
  {
    leftTag: "Before the committee",
    risk: "Committee prep",
    rightTag: "What you bring",
    control: "Bring a defensible, evidence-linked basis for the decision.",
  },
  {
    leftTag: "After the decision",
    risk: "Batch archive",
    rightTag: "What you keep",
    control: "Keep a clear record of how every team was evaluated.",
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
        {/* page-local: hero illustration pulled OUT of the editorial grid track
            (position:absolute, anchored to the centered .wrap) so it can grow
            +50% and overflow freely without reflowing the copy column. Scaled
            (--evr-hero-scale) and nudged left (--evr-hero-x, negative = left),
            with the same gentle "floating in air" drift. The float owns the
            transform (so size + offset are baked into every keyframe); the DS
            reveal still owns opacity, so the fade-in is preserved. Below the
            880px editorial breakpoint the image returns to normal in-flow size.
            Honors prefers-reduced-motion. No shared DS / globals touched.
            Tune: --evr-hero-x (horizontal, −left/+right), --evr-hero-scale. */}
        <style>{`
          .evidence-reports .ds-hero__v3 .ds-hero__editorial{ position: relative; }
          .evidence-reports .ds-hero__ed-media--img{
            --evr-hero-x: calc(clamp(-96px, -5vw, -32px) + 5px);
            --evr-hero-scale: 1.5;
            position: absolute;
            top: 50%;
            right: 0;
            width: min(560px, 46vw);
            height: auto;
            max-width: none;
            transform-origin: center right;
            z-index: 2;
            will-change: transform;
            animation: evr-hero-float 8.5s ease-in-out infinite;
          }
          @keyframes evr-hero-float{
            0%   { transform: translate(var(--evr-hero-x), -50%)            scale(var(--evr-hero-scale)) rotate(-0.4deg); }
            50%  { transform: translate(var(--evr-hero-x), calc(-50% - 9px)) scale(var(--evr-hero-scale)) rotate(0.5deg);  }
            100% { transform: translate(var(--evr-hero-x), -50%)            scale(var(--evr-hero-scale)) rotate(-0.4deg); }
          }
          @media (max-width: 880px){
            .evidence-reports .ds-hero__ed-media--img{
              position: static; top: auto; right: auto;
              width: 100%; transform: none; animation: none; z-index: auto;
            }
          }
          @media (prefers-reduced-motion: reduce){
            .evidence-reports .ds-hero__ed-media--img{
              animation: none;
              transform: translate(var(--evr-hero-x), -50%) scale(var(--evr-hero-scale)) rotate(-0.4deg);
            }
          }

          /* §3 Anatomy ("One report. Three layers.") — the evidence-map art is
             scaled +15% and given a buoyant "floating in air" drift with a gentle
             sway. Applied to the inner <img> (NOT the .lab-process__media wrapper),
             so the wrapper's scroll-pin scrub stays intact and the two transforms
             compose. The 3D look is baked into the .webp itself — we only add the
             float on top. Tune: --evr-anatomy-scale. */
          .evidence-reports .lab-process__node img{
            --evr-anatomy-scale: 1.15;
            transform-origin: center;
            will-change: transform;
            animation: evr-anatomy-float 9s ease-in-out infinite;
          }
          @keyframes evr-anatomy-float{
            0%   { transform: translate3d(0, 0, 0)      rotate(-1deg)   scale(var(--evr-anatomy-scale)); }
            25%  { transform: translate3d(7px, -11px,0) rotate(0.6deg)  scale(var(--evr-anatomy-scale)); }
            50%  { transform: translate3d(0, -17px, 0)  rotate(1.2deg)  scale(var(--evr-anatomy-scale)); }
            75%  { transform: translate3d(-7px, -9px,0) rotate(0.2deg)  scale(var(--evr-anatomy-scale)); }
            100% { transform: translate3d(0, 0, 0)      rotate(-1deg)   scale(var(--evr-anatomy-scale)); }
          }
          @media (max-width: 760px){
            .evidence-reports .lab-process__node img{ animation: none; transform: none; }
          }
          @media (prefers-reduced-motion: reduce){
            .evidence-reports .lab-process__node img{
              animation: none;
              transform: scale(var(--evr-anatomy-scale));
            }
          }
        `}</style>
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
          version={3}
          eyebrow="Evidence-Based Reports"
          titleLead="A score you can explain."
          titleAccent="Evidence"
          titleTrail="you can check."
          sub="See how each team scored, what drove the result, and what to ask next. You make the final call."
          ctas={[
            { label: "Book a Demo", href: "/#demo" },
            { label: "View Sample Report", href: "#" },
          ]}
          media={{
            ratio: "3/2",
            label: "Image · score linked to the deck · 3:2",
            hint: "A score with thin lines tracing back to deck slides — lens-gradient violet→cyan→aqua, calm",
            ariaLabel:
              "An overall score with a dimension radar, linked to deck slides — Market TAM and Traction MAU",
            src: "/assets/evidence-reports/hero-score-dashboards-01.webp",
            width: 1536,
            height: 1024,
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

        {/* 2. Beyond the number — Cinema (light): headline knocked out of a white
            scrim with a glass-cubes video showing through the letters. */}
        <Cinema
          id="beyond"
          surface="light"
          eyebrow="Beyond the number"
          headline="Explain the score. Defend the decision."
          lines={["Explain the score.", "Defend the decision."]}
          mobileLines={["Explain", "the score.", "Defend", "the decision."]}
          sub="EvalLense shows what shaped the score and links each finding back to the deck. Your team can defend the shortlist, explain the feedback, and know what to ask next."
          media={{ videoSrc: "/assets/evidence-reports/beyond-number-cinema.mp4" }}
        />

        {/* 3. Anatomy — pinned multi-screen, exactly 3 layers. */}
        <PinnedSteps
          id="anatomy"
          surface="light"
          version={1}
          ariaLabel="Anatomy of the report — three layers from summary to questions"
          eyebrow="Anatomy of the report"
          title={{ line1: "One report.", line2: "Three", line2Accent: "layers." }}
          sub="Start with the summary. See what shaped the score. Walk into the room with the right questions."
          steps={ANATOMY.map((a) => ({ num: a.num, label: a.label, desc: a.desc }))}
          mediaNode={
            <Image
              src="/assets/evidence-reports/report-evidence-map-01.webp"
              alt="EvalLense report evidence map — Project Summary, AI Score Report, and Questions for Live Q&A, with findings linked back to pitch-deck slides"
              width={1448}
              height={1086}
              sizes="(max-width: 880px) 90vw, 640px"
              style={{ width: "100%", height: "auto" }}
            />
          }
          media={{
            ratio: "4/3",
            label: "Sample · real report needed · 4:3",
            hint: "A live report embed — Project Summary with score, supports/lowers, and slide refs. #1 trust lever: drop the real founder sample here.",
            ariaLabel:
              "Three report layers — Project Summary, AI Score Report, and Questions for Live Q&A — cycling forward in turn",
          }}
        />

        {/* 4. Inside the AI Score Report — gallery, v4 grid (clean 3×2, no backdrop). */}
        <Gallery
          id="score"
          surface="light"
          version={4}
          ariaLabel="Inside the AI Score Report"
          eyebrow="Inside the AI Score Report"
          title="every score"
          titleLead="See what"
          titleAccent="shaped"
          sub="See the evidence, confidence, judge input, and weights behind every score."
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
            hint: "Slide 07 and the evidence, supports, lowers and verify-live cards it grounds, thin connector lines, calm",
            ariaLabel:
              "A pitch-deck slide (Slide 07) linked to the supporting and lowering evidence behind its score, with a verify-live cue",
            src: "/assets/evidence-reports/slide-source-map-01.webp",
            width: 1600,
            height: 1200,
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
          titleAccent="covered"
          sub="The report checks which core sections are present, thin, or missing, then shows the severity and the dimension affected. It’s a review signal, not a verdict."
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
                  ariaLabel="Sample deck completeness — each section present, thin, or missing, with severity and the affected dimension"
                  items={COMPLETENESS.map((c) => ({
                    name: c.name,
                    sev: c.sev,
                    status: c.status,
                    dimension: "dimension" in c ? c.dimension : undefined,
                  }))}
                  legend={[
                    { sev: "info", label: "info" },
                    { sev: "warning", label: "warning" },
                    { sev: "critical", label: "critical" },
                  ]}
                />
              ) : undefined,
          }))}
        />

        {/* 7. Across the review — RiskControl v1 (ink): each row is a distinct use
            case, left = the moment + use case, right = the concrete outcome. */}
        <RiskControl
          id="uses"
          surface="ink"
          ariaLabel="One report, from first read to final record"
          eyebrow="Across the review"
          title="One report, from first read to final record"
          titleAccent="final record"
          sub="The same report supports preparation, selection, feedback, committee decisions, and the final record."
          pairs={USES.map((u) => ({
            leftTag: u.leftTag,
            risk: u.risk,
            rightTag: u.rightTag,
            control: u.control,
          }))}
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
