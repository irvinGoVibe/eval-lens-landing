import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  PinnedSteps,
  Numbered,
  Bento,
  Gallery,
  CtaBand,
} from "@/components/ds";

/** Header nav for this page — anchor links to its own sections (see the
 *  matching `id`s on the Lab* sections below). Each page declares its own. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/overview",
  links: [
    { label: "Path", href: "#path" },
    { label: "Modules", href: "#modules" },
    { label: "Outputs", href: "#outputs" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Product Overview: Batch Pitch Deck Evaluation",
  description:
    "How EvalLense works: collect decks in the Entry Hub, evaluate with 6 AI judges, get evidence-based reports and a Review Board with a leaderboard — the human decides.",
};

/*
 * ── COMPOSITION ──────────────────────────────────────────────────────────
 * Sections §1–§5 and §7 are reconstructed from the real library `Lab*`
 * Server Components (under @/components/sections/lab). §6 stays a
 * page-local editorial pull-quote on purpose, and §8 is the shared
 * `CtaBand` (dark theme + aurora + bleed) — the page's single ink peak.
 * The const data arrays below (PATH_STEPS / PIPELINE / MODULES / JUDGES /
 * OUTPUTS) hold the confirmed content and are passed straight into the
 * components.
 *
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. The Lab* components render their own
 * VISIBLE, labeled `.media-ph` placeholders (ratio-locked, on canonical
 * tokens) from the `media` props passed below — never an empty grey div.
 * When a generator is available, produce the assets and drop them into
 * web/public/assets/product/.
 *
 * 1. hero (§1) — 16:9
 *    A flow of decks converges into a lens and exits as a ranked workspace.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre.
 *
 * 2. flow (§2, beside the pinned 7 steps) — 4:3
 *    A horizontal track of 7 steps whose nodes light up in sequence.
 *    Prompt: same tokens, ink surface, thin node-lines, one lit node.
 *
 * 4. modules (§4, bento feature tile) — 16:9
 *    A bento of three modules with quiet signal-icons.
 *    Prompt: hairline tiles, one lens accent, calm.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Motion is the Lab* components' built-in data-reveal / data-pin, driven by
 * the single <ScrollFX/> mounted once after <Footer/>. No per-section
 * useEffect, no ScrollOrchestrator edits. reduced-motion is handled by the
 * engine + the primitives' @media block.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief (wiki/product/product.md): 7-step organizer
 * path, the Decoder→Judges→Summarizer→Scoring→Report pipeline, 6 independent
 * judges J-P1…J-P6 across dimensions P1–P6, 3 product modules, a 0.0–10.0
 * scale, ranking by the human Final Score. Real facts only. Hackathon / Custom
 * modes are post-MVP and are NOT promised as available (see story 10 open
 * questions).
 */

/* 2. Organizer path — 7 steps revealed through the pin engine (brief §2). */
const PATH_STEPS = [
  {
    num: "01",
    label: "Sign in",
    desc: "Email and password, or Google OAuth. You land in your own workspace.",
  },
  {
    num: "02",
    label: "Dashboard",
    desc: "Your projects and their status, with a place to start a new one.",
  },
  {
    num: "03",
    label: "Set up the project",
    desc: "A five-step wizard: details, criteria and weights, judges, how decks are collected, and a final review. Mode — Pitch Competition — is chosen before the wizard opens.",
  },
  {
    num: "04",
    label: "Collect decks",
    desc: "Add applications by hand, or share a self-upload link and let teams submit their own.",
  },
  {
    num: "05",
    label: "Start judging",
    desc: "The AI pipeline runs across every deck in the batch.",
  },
  {
    num: "06",
    label: "Jury review",
    desc: "You set the Jury Score on each dimension, guided by the AI report.",
  },
  {
    num: "07",
    label: "Leaderboard",
    desc: "Ranked by your Final Score, not by the AI score.",
  },
];

/* 3. Evaluation pipeline — 5 fixed stages (brief §3, scope.md §5). */
const PIPELINE = [
  {
    num: "01",
    name: "Decoder",
    body: "Brings any deck — PDF, PPTX, or Google Slides — to a structured, slide-level view.",
  },
  {
    num: "02",
    name: "AI Judges",
    body: "Six independent judges score the deck across P1–P6, in parallel.",
  },
  {
    num: "03",
    name: "Summarizer",
    body: "Function 1 runs deterministic math; Function 2 writes the narrative and the questions to ask each team.",
  },
  {
    num: "04",
    name: "Scoring",
    body: "Your criterion weights apply to the human Jury Score to form the Final Score.",
  },
  {
    num: "05",
    name: "Report",
    body: "An explainable report is assembled for every participant.",
  },
];

/* 4. Three product modules — bento (brief §4). */
const MODULES = [
  {
    tag: "Entry Hub",
    title: "One entry point for the batch",
    body: "Applications and decks land in a single place — added by hand or through a self-upload link, ready to evaluate.",
    feature: true,
  },
  {
    tag: "Evidence-Based Reports",
    title: "Scores tied to evidence",
    body: "Every score and conclusion links back to evidence in the deck, not to a black-box verdict.",
  },
  {
    tag: "Review Board",
    title: "The board for the human decision",
    body: "Review, compare, and rank — with a leaderboard built from your Final Score.",
  },
];

/* 5. AI jury — 6 independent judges J-P1…J-P6 (brief §5). */
const JUDGES = [
  {
    code: "J-P1",
    title: "Problem",
    body: "The pain, the user, the urgency, and the alternatives a deck claims to beat.",
  },
  {
    code: "J-P2",
    title: "Solution Logic",
    body: "Product logic, differentiation, and how coherently the solution holds together.",
  },
  {
    code: "J-P3",
    title: "Business Value / Market",
    body: "The market, the value, and how the business intends to make money.",
  },
  {
    code: "J-P4",
    title: "Pitch Quality",
    body: "Clarity, narrative, structure, and delivery.",
  },
  {
    code: "J-P5",
    title: "Team Readiness",
    body: "Founder-market fit, skills, and the ability to execute.",
  },
  {
    code: "J-P6",
    title: "Feasibility",
    body: "Roadmap, resources, and operational realism.",
  },
];

/* 7. What you get — outputs after a run (brief §7). */
const OUTPUTS = [
  {
    tag: "Workspace",
    title: "Structured workspace",
    body: "Every application in one organized space, instead of scattered files and threads.",
    feature: true,
  },
  {
    tag: "Evaluations",
    title: "Deck-level evaluations",
    body: "Scores across P1–P6 with a confidence signal on each.",
  },
  {
    tag: "Evidence",
    title: "Judge assessments & evidence",
    body: "Each assessment tied back to evidence in the deck.",
  },
  {
    tag: "Signals",
    title: "Strengths, weaknesses, gaps",
    body: "Surfaced alongside deck-completeness signals.",
  },
  {
    tag: "Leaderboard",
    title: "Leaderboard & comparison",
    body: "Ranked by your Final Score.",
  },
];

export default function ProductOverviewPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="product-overview section-lab ds">
        {/* §1. Hero → LabStatementHero (soft / light, version 1). */}
        <StatementHero
          surface="ink"
          version={2}
          eyebrow="Product Overview"
          titleLead="The operating layer for structured pitch "
          titleAccent="evaluation"
          sub="Collect every deck in one place, evaluate it against one rubric, and compare evidence-based reports in a single review. The final call always yours."
          ctas={[{ label: "Book a Demo", href: "/#demo" }]}
          media={{
            ratio: "16/9",
            label: "Image · decks into a lens · 16:9",
            hint: "Decks converge into a lens and exit as a ranked workspace — lens-gradient violet→cyan→aqua, calm",
            ariaLabel:
              "A flow of decks converging into a lens and exiting as a ranked workspace",
          }}
        />

        {/* §2. Organizer path → LabPinnedSteps (soft / light, 7 pinned steps). */}
        <PinnedSteps
          id="path"
          surface="ink"
          version={3}
          ariaLabel="The organizer path — seven steps"
          eyebrow="How it works"
          title={{ line1: "The organizer path,", line2: "in seven steps" }}
          sub="EvalLense walks you from sign-in to a ranked leaderboard. The path is fixed, and each step lights up as you scroll."
          steps={PATH_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · organizer flow · 4:3",
            hint: "A 7-step track, nodes lighting in sequence on an ink surface",
            ariaLabel:
              "A horizontal track of seven steps whose nodes light up in sequence",
          }}
        />

        {/* §3. Evaluation pipeline → LabNumbered (light → .band.soft). PIPELINE.name → title. */}
        <Numbered
          surface="ink"
          version={1}
          eyebrow="Evaluation pipeline"
          title="Every deck runs the same five stages"
          sub="Each application passes a fixed pipeline. The numeric layer is deterministic — the same findings and weights produce the same AI Total Score, an advisory reference. Ranking is built from your score, not this one."
          items={PIPELINE.map((p) => ({
            num: p.num,
            title: p.name,
            body: p.body,
          }))}
        />

        {/* §4. Three modules → LabBento (light). Media on the feature tile only.
            Note: LabBentoMedia has no `ratio` field — the component hardcodes
            16/9 internally — so the feature media omits `ratio`. */}
        <Bento
          id="modules"
          surface="light"
          version={1}
          eyebrow="Three modules"
          title="One product, three connected modules"
          sub="An Entry Hub for intake, Evidence-Based Reports for the analysis, and a Review Board where a person makes the call."
          items={MODULES.map((m) =>
            m.feature
              ? {
                  ...m,
                  media: {
                    label: "Image · modules bento · 16:9",
                    hint: "Three module tiles with quiet signal icons, one lens accent",
                    ariaLabel:
                      "A bento of three modules with quiet signal icons",
                  },
                }
              : m,
          )}
        />

        {/* §5. AI jury → LabGallery (ink — ink peak №1). JUDGES.code → tag. */}
        <Gallery
          surface="light"
          version={4}
          eyebrow="AI jury"
          title="Six independent judges, six lenses"
          sub="Evaluation runs through a jury of six AI judges, each with its own lens across P1–P6. They work independently and never see one another's scores — and where they disagree, the report shows it."
          laneLabel="The six AI judges — horizontally scrollable"
          items={JUDGES.map((j) => ({
            tag: j.code,
            title: j.title,
            body: j.body,
          }))}
        />

        {/* §6. Why it matters — KEPT page-local on purpose (editorial pull-quote,
            not a Lab component). Do not convert this to a Lab* block.
            True-light surface (no .ink) — text falls back to dark --fg/--muted. */}
        <section className="band po-why">
          <div className="wrap po-why__split">
            <div className="po-why__copy">
              <span className="eyebrow" data-reveal="down">
                <span className="dot" aria-hidden="true"></span>
                Why it matters
              </span>
              <h2 className="title" data-reveal="down" style={{ "--reveal-delay": "70ms" } as CSSProperties}>Less manual review, a clearer trail</h2>
              <p className="sub" data-reveal="down" style={{ "--reveal-delay": "140ms" } as CSSProperties}>
                EvalLense cuts the hours spent reading decks by hand, holds every
                evaluation to one standard, and leaves your team a decision trail
                it can defend.
              </p>
            </div>
            <div className="po-why__claim" data-reveal="right">
              <p className="po-why__claim-text">
                Six AI lenses do the reading. You make the decision — with the
                evidence in front of you.
              </p>
              <span className="po-why__claim-tag">
                Pitch Competition · P1–P6
              </span>
            </div>
          </div>
        </section>

        {/* §7. What you get → LabBento (light). No media (brief has no §7 image);
            the feature tile renders without a media slot. */}
        <Bento
          id="outputs"
          surface="ink"
          version={1}
          eyebrow="What you get"
          title="Everything a run leaves behind"
          sub="After a batch runs, you're left with a structured set of outputs — not a folder of scattered files and threads."
          items={OUTPUTS}
        />

        {/* §8 — Final CTA. Cinematic closer: CtaBand on the dark (ink) theme with
            a looping background video (`neo`) and `bleed` so it spills onto the
            footer — the single ink peak of the page. `auroraVariant` stays as the
            CSS fallback when the video can't play. */}
        <CtaBand
          theme="dark"
          bleed
          videoSrc="/assets/cta/neo.mp4"
          auroraVariant="violet"
          eyebrow="Get started"
          title="See the whole workflow on"
          titleAccent="your own decks"
          sub="Book a demo and watch intake, evaluation, and human review play out end to end."
          primary={{ label: "Book a Demo", href: "/#demo" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
