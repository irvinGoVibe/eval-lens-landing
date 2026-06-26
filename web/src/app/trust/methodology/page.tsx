import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import {
  StatementHero,
  Numbered,
  PinnedSteps,
  Gallery,
  RoutingMatrix,
  EditorialSplit,
  Bento,
  Cinema,
} from "@/components/ds";
import type { RoutingJudge, BentoItem } from "@/components/ds";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Pipeline", href: "#pipeline" },
    { label: "Judges", href: "#judges" },
    { label: "Rubric", href: "#rubric" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense Methodology — How the AI Jury Scores Pitch Decks",
  description:
    "The EvalLense methodology: six independent AI judges score each deck against a fixed rubric, tie every score to evidence, and the human sets the final call. Transparent and reproducible.",
};

/* ── Content (verbatim from wiki/product/methodology_new.md §"Контент по
 * секциям"). No invented numbers/claims; internal constants/formulas omitted
 * per the brief (public-facing: qualitative labels + "reproducible"). ── */

const PRINCIPLES = [
  {
    num: "01",
    title: "AI supports the decision. It doesn't own it.",
    body: "Every AI score is advisory. You set the final score, and the ranking follows your decision.",
  },
  {
    num: "02",
    title: "Every score is explainable.",
    body: "Every score links back to evidence in the deck and the rubric used to judge it.",
  },
  {
    num: "03",
    title: "Disagreement is useful.",
    body: "When judges disagree, the report shows the spread instead of hiding it inside an average.",
  },
  {
    num: "04",
    title: "Methodology matters more than the model.",
    body: "Reliability comes from fixed criteria, defined judge roles, and a consistent scoring process - not from any single model.",
  },
];

const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Decoder",
    desc: "PDF, PPTX, or Google Slides - every deck is converted into the same structured, slide-by-slide format for the judges.",
  },
  {
    num: "02",
    label: "AI Judges",
    desc: "Six judges review the deck independently against the same criteria. They don't see one another's scores.",
  },
  {
    num: "03",
    label: "Summarizer",
    desc: "A deterministic math step aggregates the judges' scores. A separate AI step produces the summary and follow-up questions.",
  },
  {
    num: "04",
    label: "Scoring",
    desc: "Your criterion weights are applied to the Human Jury Score to produce the Final Score.",
  },
  {
    num: "05",
    label: "Report",
    desc: "An explainable report is assembled for every participant.",
  },
];

const JUDGES = [
  {
    tag: "Problem · J-P1",
    title: "Problem",
    body: ["Who has this problem, how serious is it, and what do they use today?", "Looks for a clear target user, frequent or costly pain, and an honest view of current alternatives."],
  },
  {
    tag: "Solution Logic · J-P2",
    title: "Solution Logic",
    body: ["Does the solution address the problem, and why is it better than the alternatives?", "Looks for a clear mechanism, meaningful differentiation, and a focused reason to choose it."],
  },
  {
    tag: "Business Value / Market · J-P3",
    title: "Business Value / Market",
    body: ["Is the market attractive, and can the business create and capture value?", "Looks for a reachable market, credible monetization, a clear entry point, and a defensible position."],
  },
  {
    tag: "Pitch Quality · J-P4",
    title: "Pitch Quality",
    body: ["Can a reviewer understand the idea, the evidence, and why it matters?", "Looks for a clear narrative, direct answers, useful visuals, and precise language. It judges the pitch, not the idea."],
  },
  {
    tag: "Team Readiness · J-P5",
    title: "Team Readiness",
    body: ["Does this team have the experience and ability to execute?", "Looks for relevant expertise, founder-market fit, clear ownership, and evidence the team can deliver."],
  },
  {
    tag: "Feasibility · J-P6",
    title: "Feasibility",
    body: ["Can this plan be delivered with the proposed resources and timeline?", "Looks for realistic scope, credible milestones, operational readiness, and the main execution risks."],
  },
];

/* The real Judge Routing Matrix (Pitch preset). Each judge has one primary
 * dimension (J-P3 owns two; J-P4 Pitch Quality owns none and reads everything
 * as advisory). Weights: primary 1.00 · secondary 0.50 · advisory 0.25 · none 0.
 * Source of truth: ai-jury-prod wiki/architecture/pipeline-summarizer.md +
 * src/config/dimensions.ts (PITCH_ROUTING_MATRIX). The "reads" counts on the
 * old stat band were just the per-dimension count of judges with weight > 0. */
const ROUTING_DIMENSIONS = [
  "Problem",
  "Solution",
  "Market",
  "GTM",
  "Team",
  "Feasibility",
];
const ROUTING_DIMENSIONS_FULL = [
  "Problem significance",
  "Solution differentiation",
  "Market attractiveness",
  "Business model / GTM",
  "Team / founder fit",
  "Feasibility / readiness",
];
const ROUTING_JUDGES: RoutingJudge[] = [
  { code: "J-P1", name: "Problem", cells: ["primary", "advisory", "advisory", "none", "none", "advisory"] },
  { code: "J-P2", name: "Solution Logic", cells: ["secondary", "primary", "advisory", "advisory", "none", "secondary"] },
  { code: "J-P3", name: "Business / Market", cells: ["advisory", "advisory", "primary", "primary", "none", "advisory"] },
  { code: "J-P4", name: "Pitch Quality", cells: ["advisory", "advisory", "advisory", "advisory", "advisory", "advisory"] },
  { code: "J-P5", name: "Team Readiness", cells: ["none", "none", "advisory", "advisory", "primary", "secondary"] },
  { code: "J-P6", name: "Feasibility", cells: ["advisory", "secondary", "secondary", "secondary", "secondary", "primary"] },
];

const RUBRIC_PROCEDURE = [
  {
    title: "Cite the evidence",
    body: "Use slide-grounded facts only. Every claim must point to a specific slide.",
  },
  {
    title: "Weigh it both ways",
    body: "State what supports the score, what lowers it, and what the deck leaves unclear or unproven.",
  },
  {
    title: "Name the band",
    body: "Explain which rubric band the evidence falls into and why.",
  },
  {
    title: "Then the score",
    body: "The score must sit inside that band. At the boundary, incomplete evidence pushes the result down, not up.",
  },
];

/* Bento tiles for the scoring model. First tile is the feature (visual centre).
 * `tag` reinforces the split the section is about: score calculation vs.
 * diagnostic signals (Calculation / Diagnostic / Guarantee). */
const SCORING_TILES: BentoItem[] = [
  {
    feature: true,
    tag: "Calculation",
    title: "Per dimension",
    body: "Judge scores are combined using their routing weights to produce a weighted average.",
    media: {
      src: "/assets/bento/scoring-model-transparent.webp",
      ratio: "3/2",
      label: "Diagram · weighted average · 3:2",
      hint: "Judge signals combine by routing weight into one AI Criterion Score",
      ariaLabel:
        "Judges, weighted by routing weight, combine into a weighted average and a confidence-adjusted AI Criterion Score; disagreement is shown separately",
    },
  },
  {
    tag: "Calculation",
    title: "Confidence adjustment",
    body: "Confidence is aggregated separately and applies a limited downward adjustment. The maximum penalty is 15%.",
    media: {
      src: "/assets/bento/scoring-confidence.webp",
      ratio: "3/2",
      label: "Diagram · confidence adjustment · 3:2",
      hint: "A 7.6 score nudged down to 7.4 by the confidence adjustment",
      ariaLabel:
        "A criterion score of 7.6 adjusted down to 7.4 by the confidence penalty",
    },
  },
  {
    tag: "Calculation",
    title: "Across dimensions",
    body: "Your criterion weights combine the AI Criterion Scores into one AI Total Score on a 0–10 scale.",
    media: {
      src: "/assets/bento/scoring-across.webp",
      ratio: "3/2",
      label: "Diagram · across dimensions · 3:2",
      hint: "Six AI Criterion Scores combine into one AI Total Score",
      ariaLabel:
        "Six AI Criterion Scores orbiting and combining into one AI Total Score",
    },
  },
  {
    tag: "Diagnostic",
    title: "Disagreement",
    body: "The report separately flags consensus, split, or conflict between primary and secondary judges. This does not change the score.",
  },
  {
    tag: "Guarantee",
    title: "Reproducible",
    body: "No model runs during this step. The same judge outputs and weights produce the same score every time.",
  },
];

const HITL_POINTS = [
  {
    title: "Review the evidence",
    body: "AI suggests a score for each dimension and shows the evidence behind it — a read-only reference.",
  },
  {
    title: "Add live context",
    body: "Bring in what the deck can't show: notes from the live pitch and the Q&A.",
  },
  {
    title: "Set the Jury Score",
    body: "You set your own Jury Score per dimension. It stays a separate value from the AI Criterion Score.",
  },
  {
    title: "Submit the decision",
    body: "The leaderboard is built only from submitted Jury Scores. The AI Total Score never determines the ranking.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds trust-methodology">
        {/* ── ONE continuous tonal zone (§1–8): a single shared background that
            flips light→dark at the §2/§3 seam, holds dark through §3–4, then flips
            dark→light through the brand BRIDGE at the §4/§5 seam. Layer stack
            (z-index:-1, painted in DOM order = back→front):
              1) --lobes        light BASE (always on)
              2) --lobes-dark   dark layer, faded 0→1 by <ZoneToneFlip/> (§2/§3)
              3) --lobes .ds-relight  light layer faded 0→1 by <ZoneToneFlipReverse/>
                 (§4/§5) — covers the dark again so the zone ends light
              4) .ds-flip-bridge + __glow  brand "third colour" bloom at §4/§5
            ONE zone = no gap/strip between transitions; each flip drives a DIFFERENT
            layer (dark vs relight), so they never fight over one opacity. ── */}
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
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight" aria-hidden="true" />
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />
          {/* blobs only over the LIGHT bands, clipped off the dark §3–4 block
              (~25.6%–55% of the zone). The dark block carries its own sparks, not
              blobs — so each cluster is banded: upper = §1–2 (top→25%), lower =
              §5–8 (57%→bottom). Banding also stops scroll-parallax drift from
              carrying an orb onto the dark sections. */}
          <ZoneBlobs bottom="75%" />
          <ZoneBlobs top="57%" />

          {/* 1. Hero — StatementHero, soft (light tone). */}
          <StatementHero
            id="hero"
            surface="light"
            version={2}
          eyebrow="Methodology"
          titleLead="The"
          titleAccent="methodology"
          titleTrail="behind every score"
          sub="Six independent AI judges read each deck against a fixed rubric, tie every score to evidence in the slides, and hand you a result you can defend. The final call always yours."
          ctas={[{ label: "Book a Demo", href: "/company/contact" }]}
          media={{
            ratio: "16/9",
            label: "Image · hero lens · 16:9",
            hint: "A lens focusing a noisy deck into one clear, evidence-linked score",
            ariaLabel:
              "A lens focusing a noisy deck into one clear, evidence-linked score",
          }}
        />

        {/* 2. Principles — Numbered, light. */}
        <Numbered
          surface="light"
          version={3}
          eyebrow="What we hold to"
          title="Four principles behind the method"
          sub="The reliability of an EvalLense score comes from the method, not from any single model."
          items={PRINCIPLES}
        />
        {/* ── tone-flip seam (§2 → §3): transparent light→dark flip of the shared
            through-background. Crossfades the dark layer in as it crosses the
            viewport — replaces the old masked-divider shelf. ── */}
        <ZoneToneFlip />

        {/* 3. Pipeline — PinnedSteps, ink (ink peak #1). */}
          <PinnedSteps
            id="pipeline"
            surface="ink"
            version={3}
          ariaLabel="Every deck runs the same five stages"
          eyebrow="The pipeline"
          title={{ line1: "", line1Accent: "Every deck", line2: "runs the same five stages" }}
          sub="The process stays fixed, so every deck is reviewed the same way."
          steps={PIPELINE_STEPS}
          media={{
            ratio: "4/3",
            label: "Diagram · pipeline · 4:3",
            hint: "Decoder → AI Judges → Summarizer → Scoring → Report, nodes lit along a track",
            ariaLabel:
              "Horizontal track of the five pipeline stages, Decoder to Report",
          }}
          videoScrub={{
            src: "/assets/methodology/methodology-transition.mp4",
            frames: 0,
            ariaLabel:
              "Methodology transition — scrubbed by scroll through the stages",
          }}
        />

        {/* §3 ink → §4 ink : the pipeline peak now extends through the Judges
            gallery, so the two dark bands butt flush — no bridge. */}

        {/* 4. Judges — Gallery, ink (ink peak, shared with the pipeline). */}
        <Gallery
          id="judges"
          surface="ink"
          version={4}
          eyebrow="The AI jury"
          title="Six judges, six lenses"
          accentWords={["judges", "lenses"]}
          sub="Each judge focuses on one question. They work in parallel and never see one another's scores. Six independent reads, not one blended opinion."
          laneLabel="The six AI judges, J-P1 through J-P6"
          items={JUDGES}
        />
        {/* ── reverse tone-flip seam (§4 → §5): dark→light through the brand
            bridge ("third colour", no grey). Fades the .ds-relight layer in
            (covering the dark again) + blooms the bridge, INSIDE the same
            continuous zone — no divider, no gap, nothing left behind. ── */}
        <ZoneToneFlipReverse />

        {/* 5. Coverage — RoutingMatrix, light. Who scores what, and at what weight. */}
          <RoutingMatrix
            surface="light"
            eyebrow="The routing matrix"
            title="The right judge for each dimension"
            accentWords={["right", "judge", "dimension"]}
            sub="Each dimension has a primary judge. Other judges contribute only where their perspective adds value."
            dimensions={ROUTING_DIMENSIONS}
            dimensionsFull={ROUTING_DIMENSIONS_FULL}
            judges={ROUTING_JUDGES}
          />

        {/* 6. Rubric — EditorialSplit (light) for the evidence-before-score
            procedure. */}
        <EditorialSplit
          id="rubric"
          surface="light"
          version={3}
          eyebrow="The rubric"
          titleLead=""
          titleAccent="Evidence"
          titleTrail=" before score"
          sub="Every dimension is scored on a 0–10 scale using its defined rubric bands. The judge must assemble the evidence before assigning a score — never the other way around."
          points={RUBRIC_PROCEDURE}
          media={{
            ratio: "4/3",
            label: "Diagram · rubric scale · 4:3",
            hint: "A 0–10 scale with its defined rubric bands, and the evidence → band → score procedure",
            ariaLabel:
              "A 0 to 10 rubric scale with defined bands",
          }}
        />

        {/* 7. Scoring — Bento, light. Retyped from EditorialSplit: the scoring
            model as a tile field, score calculation vs. diagnostic signals. */}
        <Bento
          className="ds-scoring-bento"
          surface="light"
          version={1}
          ariaLabel="How the advisory score is built"
          eyebrow="The scoring model"
          title="How the advisory score is built"
          titleAccent="advisory"
          sub="A deterministic calculation combines the judges' outputs into one AI Total Score. The same inputs always produce the same result. It informs the human decision but does not determine the final ranking."
          items={SCORING_TILES}
        />

        {/* 8. Human-in-the-loop — EditorialSplit, light. */}
        <EditorialSplit
          id="human-decides"
          surface="light"
          version={2}
          eyebrow="Where the human decides"
          titleLead="AI prepares the evidence."
          titleAccent="You set the score."
          sub="For every dimension, AI suggests a score and shows the evidence behind it. You review the deck, add context from the live pitch and Q&A, and set the Jury Score. AI scores inform the decision — they never determine the ranking."
          points={HITL_POINTS}
          media={{
            ratio: "4/3",
            label: "Diagram · AI layer + Human layer · 4:3",
            hint: "Two separate layers — AI Criterion Score (evidence, confidence, read-only) and the human Jury Score (live notes, submitted) — feeding the chain: AI evidence → Human review → Jury Scores → Leaderboard",
            ariaLabel:
              "An AI layer with read-only criterion scores and evidence, and a separate human layer with the editable Jury Score, feeding into the leaderboard",
          }}
        />
        </div>
        {/* ── end tonal zone (§5–8) ── */}

        {/* 9. Final CTA — Cinema, ink (cinematic close; ink peak #2). Butts
            flush against the light §8 — the cinema owns its own black scrim, so
            no divider band (a tr-masked-divider here showed as a black strip). */}
        <Cinema
          surface="ink"
          headline="See the methodology run on your own decks"
          lines={["See the methodology run", "on your own decks"]}
          mobileLines={["See the methodology", "run on your own decks"]}
          sub="Book a demo and watch one deck go from slides to an evidence-linked, explainable score."
          cta={{ label: "Book a Demo", href: "/company/contact" }}
          media={{ videoSrc: "/assets/methodology/cinema-3.mp4" }}
          maskId="methodology-final-cta"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
