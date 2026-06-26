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
  StatBand,
  EditorialSplit,
  Cinema,
} from "@/components/ds";

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
    title: "AI supports the decision — it doesn't own it.",
    body: "Every AI score is advisory. You set the final score, and the ranking is built from yours.",
  },
  {
    num: "02",
    title: "Every score is explainable.",
    body: "Each number traces back to evidence in the deck and the rubric band it lands in — not a black-box verdict.",
  },
  {
    num: "03",
    title: "Disagreement is useful.",
    body: "When judges diverge on a dimension, the report shows the spread instead of burying it in an average.",
  },
  {
    num: "04",
    title: "Methodology matters more than the model.",
    body: "Reliability comes from fixed criteria, defined judge roles, and a deterministic scoring step — not from any single model.",
  },
];

const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Decoder",
    desc: "Any format — PDF, PPTX, or Google Slides — becomes one structured, slide-level view the judges can read.",
  },
  {
    num: "02",
    label: "AI Judges",
    desc: "Six independent judges score the deck across P1–P6, in parallel, without seeing one another's scores.",
  },
  {
    num: "03",
    label: "Summarizer",
    desc: "A deterministic math step aggregates the scores; a second step writes the narrative and the questions to ask each team.",
  },
  {
    num: "04",
    label: "Scoring",
    desc: "Your criterion weights apply to the human Jury Score to form the Final Score.",
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
    body: "Who actually suffers from this pain, how often, and what do they do about it today? Looks for: a named user, pain that's frequent and costly, an honest read of today's alternatives.",
  },
  {
    tag: "Solution Logic · J-P2",
    title: "Solution Logic",
    body: 'Does this approach actually solve the problem, and why is it better than the alternatives? Looks for: a clear mechanism, a defensible "why us", a sharp wedge over a do-everything platform.',
  },
  {
    tag: "Business Value / Market · J-P3",
    title: "Business Value / Market",
    body: "Is the market real and reachable, with a credible way to make money and defend the position? Looks for: a beachhead segment, monetization that fits the buyer, real defensibility.",
  },
  {
    tag: "Pitch Quality · J-P4",
    title: "Pitch Quality",
    body: "Can a reviewer follow what this is and why it matters, without guessing? Looks for: narrative structure and clear language. (Grades the communication, not the idea.)",
  },
  {
    tag: "Team Readiness · J-P5",
    title: "Team Readiness",
    body: "Do these people have the experience and founder-market fit to execute? Looks for: evidence of shipping over titles, a complete team, gaps owned rather than hidden.",
  },
  {
    tag: "Feasibility · J-P6",
    title: "Feasibility",
    body: "Given the resources, timeline, and risks, can the team actually deliver? Looks for: a sequenced roadmap, resources matched to ambition, a sober view of risk.",
  },
];

const COVERAGE_STATS = [
  { value: "5", label: "Problem significance", src: "reads" },
  { value: "5", label: "Solution differentiation", src: "reads" },
  { value: "6", label: "Market attractiveness", src: "reads" },
  { value: "5", label: "Business model / GTM", src: "reads" },
  { value: "3", label: "Team / founder fit", src: "reads" },
  { value: "6", label: "Feasibility / readiness", src: "reads" },
];

const RUBRIC_PROCEDURE = [
  {
    title: "Cite the evidence",
    body: "Slide-grounded facts only, each tied to a specific slide. No claim without a reference.",
  },
  {
    title: "Weigh it both ways",
    body: "What raises the score, what lowers it, and what the deck never establishes.",
  },
  {
    title: "Name the band",
    body: "The judge states, in words, which rubric band the evidence lands in.",
  },
  {
    title: "Then the score",
    body: "The number must sit inside that band. On the edge, an incomplete deck rounds down, not up.",
  },
];

const SCORING_POINTS = [
  {
    title: "Per dimension",
    body: "Judge scores are combined by their routing weight and adjusted for confidence to form an AI Criterion Score.",
  },
  {
    title: "Across dimensions",
    body: "Your criterion weights roll those up into the AI Total Score, on a 0–10 scale.",
  },
  {
    title: "Confidence",
    body: "Every score carries a low, medium, or high confidence signal, and lower confidence pulls the result toward caution.",
  },
  {
    title: "Spread",
    body: "Where judges disagree on a dimension, the report flags it — consensus, split, or conflict — instead of averaging it away.",
  },
  {
    title: "Reproducible",
    body: "No model runs in this step. The same judge outputs and weights give the same score, every time.",
  },
];

const HITL_POINTS = [
  {
    title: "The AI prepares",
    body: "Every AI score is advisory. You read the evidence, set your Jury Score on each dimension, and the leaderboard is built from your Final Score — never from the AI's.",
  },
  {
    title: "Six AI lenses do the reading. The final call is always yours.",
    body: "Pitch Competition · P1–P6",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds">
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
          {/* blobs: one cluster up top (§1–4) + one lower (§5–8) — a single layer's
              orbs only span ~2.5 screens from its own top, so a tall zone needs two. */}
          <ZoneBlobs />
          <ZoneBlobs top="52%" />

          {/* 1. Hero — StatementHero, soft (light tone). */}
          <StatementHero
            id="hero"
            surface="light"
            version={2}
          eyebrow="Methodology"
          titleLead="The methodology behind every score"
          titleAccent=""
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
          title={{ line1: "Every deck runs", line2: "the same five stages" }}
          sub="The path is fixed, so no two decks are read differently. Each stage lights up as you scroll."
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
          sub="Each judge owns one lens and answers a single question. They run in parallel and never compare notes — six independent reads, not one blurred opinion."
          laneLabel="The six AI judges, J-P1 through J-P6"
          items={JUDGES}
        />
        {/* ── reverse tone-flip seam (§4 → §5): dark→light through the brand
            bridge ("third colour", no grey). Fades the .ds-relight layer in
            (covering the dark again) + blooms the bridge, INSIDE the same
            continuous zone — no divider, no gap, nothing left behind. ── */}
        <ZoneToneFlipReverse />

        {/* 5. Coverage — StatBand, light. */}
          <StatBand
            surface="light"
            eyebrow="The AI jury"
            title="No score rests on one opinion"
            stats={COVERAGE_STATS}
          />

        {/* 6. Rubric — EditorialSplit (light) for the evidence-before-score
            procedure. */}
        <EditorialSplit
          id="rubric"
          surface="light"
          version={3}
          eyebrow="The rubric"
          titleLead="One scale, four bands, evidence first"
          sub="Every dimension is scored on the same 0–10 scale, split into four bands. A judge has to assemble the evidence before it can name a score — never the other way around."
          points={RUBRIC_PROCEDURE}
          media={{
            ratio: "4/3",
            label: "Diagram · rubric scale · 4:3",
            hint: "A 0–10 scale split into four bands, with the evidence → band → score procedure",
            ariaLabel:
              "A 0 to 10 rubric scale split into four bands",
          }}
        />

        {/* 7. Scoring — EditorialSplit, light. */}
        <EditorialSplit
          surface="light"
          version={1}
          eyebrow="The scoring model"
          titleLead="From six reads to one advisory score"
          sub="A deterministic math step turns the judges' scores into one number — the same inputs always produce the same result. It's an advisory reference, not the ranking."
          points={SCORING_POINTS}
          media={{
            ratio: "4/3",
            label: "Diagram · confidence ring · 4:3",
            hint: "A confidence ring with the per-dimension contribution from each judge",
            ariaLabel:
              "A confidence ring showing the per-dimension judge contributions",
          }}
        />

        {/* 8. Human-in-the-loop — EditorialSplit, light. */}
        <EditorialSplit
          surface="light"
          version={2}
          eyebrow="Where the human decides"
          titleLead="The AI prepares. You decide."
          sub="Every AI score is advisory. You read the evidence, set your Jury Score on each dimension, and the leaderboard is built from your Final Score — never from the AI's."
          points={HITL_POINTS}
          media={{
            ratio: "4/3",
            label: "Quote · the final call is yours · 4:3",
            hint: "Six AI lenses do the reading. The final call is always yours. — Pitch Competition · P1–P6",
            ariaLabel:
              "Six AI lenses do the reading. The final call is always yours.",
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
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
          maskId="methodology-final-cta"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
