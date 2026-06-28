import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import {
  StatementHero,
  StatBand,
  Bento,
  PinnedSteps,
  EditorialSplit,
  Gallery,
  CtaBand,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "EvalLense — One review system for every shortlist (one-pager)",
  description:
    "A practical one-page explainer: what you upload, what EvalLense does, how long it takes, what the jury gets, who sets the final score, and how to start a pilot.",
};

/*
 * ── VISUAL SYSTEM — LIGHT "CINEMATIC INK" ────────────────────────────────
 * Composed entirely from the clean DS barrel `@/components/ds`. A LIGHT
 * design-system build (container carries `ds`) with two ink cinematic peaks —
 * §5 Trust (Bento, surface="ink") and §7 Pilot CTA (CtaBand, theme="dark").
 * Surface arc: light · soft · light · soft · INK · light · INK.
 *
 * Media slots render as the DS `Media` placeholder (visible, ratio-locked) —
 * no images generated. ZoneToneFlip handles the light→ink seam before §5;
 * the §5/§6 ink→light seam is a plain surface flip back to a light Gallery.
 *
 * Invariants: the human sets the final score; AI is advisory. Motion is
 * data-* only — DS components wire data-reveal / data-pin. <ScrollFX/> is
 * mounted once, after <Footer/>.
 */

/* 1b. Practical numbers — three stats (StatBand `Stat` needs a `src` line; the
   brief gives none, so it stays empty). */
const STATS = [
  { value: "4–5 min", label: "of machine processing per application", src: "" },
  { value: "20–40", label: "applications for a first pilot", src: "" },
  { value: "1", label: "final table after evaluation", src: "" },
] as const;

/* 2. Problem — Bento: one feature tile + supporting tiles. */
const PROBLEM_TILES = [
  {
    tag: "The wall",
    title: "Good projects, blocked by unstructured review",
    body: "Materials arrive as files, links, tables, and notes — and a strong deck stalls before anyone reads it properly.",
    feature: true,
    media: {
      ratio: "4/3",
      label: "Image · the problem wall · 4:3",
      hint: "Left: a bright aqua pitch deck. Centre: a wall of glass problem blocks (Too many decks, Not enough time, Uneven criteria, Reviewer bias, Scattered evidence, Weak decision trail). Right: a muted review batch. The deck hits the wall.",
      ariaLabel: "A pitch deck blocked by a wall of review problems",
    },
  },
  {
    tag: "Volume",
    title: "Too many applications",
    body: "Materials arrive as files, links, tables, and notes.",
  },
  {
    tag: "Time",
    title: "Not enough time",
    body: "Not every team gets an equally deep review.",
  },
  {
    tag: "Criteria",
    title: "Different criteria",
    body: "One expert looks at market, another at the team, another at execution.",
  },
  {
    tag: "Trail",
    title: "Weak decision trail",
    body: "Later it is hard to explain why a team advanced or didn't.",
  },
] as const;

/* 3. Guided workflow — PinnedSteps. */
const WORKFLOW_STEPS = [
  {
    num: "01",
    label: "Collect applications",
    desc: "Participants submit decks, project descriptions, or other materials.",
  },
  {
    num: "02",
    label: "Set the criteria",
    desc: "You choose the scale, weights, and scoring format for your selection.",
  },
  {
    num: "03",
    label: "Run the machine pass",
    desc: "EvalLense prepares a structured first read for each application. One application takes 4–5 minutes of machine processing.",
  },
  {
    num: "04",
    label: "Hand the reports to the jury",
    desc: "Each participant has strengths, risks, gaps, and questions.",
  },
  {
    num: "05",
    label: "Set the final score",
    desc: "The jury verifies, compares, and decides. The human sets the final score.",
  },
] as const;

/* 4. Output — EditorialSplit points list ("After a run you get"). */
const OUTPUT_POINTS = [
  { title: "A report for every participant", body: "" },
  { title: "A final-scoring table", body: "" },
  { title: "Questions for the jury", body: "" },
  { title: "Risks and missing data", body: "" },
  { title: "Comparison on one shared scale", body: "" },
] as const;

/* 5. Trust — Bento (INK peak #1): one feature tile + five trust tiles. */
const TRUST_TILES = [
  {
    tag: "AI prepares",
    title: "AI prepares the analysis",
    body: "EvalLense surfaces the evidence, the risks, and the questions — then hands them to the people who decide.",
    feature: true,
    media: {
      ratio: "4/3",
      label: "Image · AI prepares → human decides · 4:3",
      hint: "Left: report cards. Centre: evidence lines. Right: a human final-score capsule, visually separated from the AI score. Do not show AI as a judge picking the winner.",
      ariaLabel: "AI prepares the analysis; a human sets the final score",
    },
  },
  {
    tag: "Standard",
    title: "One standard",
    body: "Every application runs through the same scoring logic.",
  },
  {
    tag: "Explained",
    title: "Every score is explained",
    body: "You see the reasons, not just a number.",
  },
  {
    tag: "Risks",
    title: "Risks and gaps",
    body: "It's clear what to verify before deciding.",
  },
  {
    tag: "Questions",
    title: "Questions for the jury",
    body: "The report helps run the discussion, not replace it.",
  },
  {
    tag: "Human",
    title: "The human sets the final score",
    body: "Control stays with the organizer and the jury.",
  },
] as const;

/* 6. Use cases — Gallery cards (Goal + Looks-at combined). */
const USE_CASES = [
  {
    tag: "Pitch competition",
    title: "Pitch competition",
    body: "Pick a shortlist and prepare the jury for discussion. Looks at problem, solution, market, team, feasibility.",
  },
  {
    tag: "Hackathon",
    title: "Hackathon",
    body: "Get through results fast after the deadline. Looks at product, technical depth, value, readiness.",
  },
  {
    tag: "Accelerator",
    title: "Accelerator",
    body: "Compare a stream of startups against program criteria. Looks at problem, market, team, traction, risks.",
  },
  {
    tag: "Grants / innovation programs",
    title: "Grants / innovation programs",
    body: "Make the decision transparent and defensible. Looks at criteria fit, evidence, impact, gaps.",
  },
] as const;

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Company",
  sectionHref: "/company/about",
  links: [
    { label: "Problem", href: "#problem" },
    { label: "How it works", href: "#workflow" },
    { label: "Pilot", href: "#pilot" },
  ],
};

export default function OnePagerPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="one-pager section-lab ds">
        {/* 1. Hero — statement hero (light), editorial v3 with media beside copy. */}
        <StatementHero
          id="top"
          surface="light"
          version={1}
          eyebrow="ONE REVIEW SYSTEM"
          titleLead="Get through your application stream"
          titleAccent="faster"
          titleTrail=" — without losing the strong projects"
          sub="EvalLense prepares a structured first read for every applicant: scores, strengths, risks, missing data, and questions for the jury. One application takes 4–5 minutes of machine processing. The human sets the final score."
          ctas={[
            { label: "Start a pilot", href: "/company/contact" },
            { label: "Book a demo", href: "/#demo" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · decks → lens → reports · 16:9",
            hint: "A stack of pitch decks on the left, a glass evaluation lens in the centre, report cards (score, risk, question, evidence) on the right. The final score must not read as an AI verdict.",
            ariaLabel:
              "Pitch decks passing through an evaluation lens and becoming structured reports for the jury",
          }}
        />

        {/* 1b. Practical numbers — StatBand (soft). */}
        <StatBand
          surface="light"
          ariaLabel="Practical numbers for a first pilot"
          eyebrow="WHAT A PILOT LOOKS LIKE"
          title="Practical numbers"
          stats={STATS.map((s) => ({ value: s.value, label: s.label, src: s.src }))}
        />

        {/* 2. Problem — Bento (light): feature wall + four supporting tiles. */}
        <Bento
          id="problem"
          surface="light"
          ariaLabel="Why manual review breaks at volume"
          eyebrow="WHY MANUAL REVIEW BREAKS"
          title="When there are many applications, manual review breaks"
          sub="A hundred applications is not a hundred equally careful reviews. In practice, materials get skimmed, criteria drift, strong teams get lost in the flow, and the final decision is hard to explain later."
          items={PROBLEM_TILES.map((t) => ({
            tag: t.tag,
            title: t.title,
            body: t.body,
            feature: "feature" in t ? t.feature : undefined,
            media: "media" in t ? t.media : undefined,
          }))}
        />

        {/* 3. Guided workflow — PinnedSteps (light), 5 steps + placeholder media. */}
        <PinnedSteps
          id="workflow"
          surface="light"
          version={1}
          ariaLabel="How a single selection runs, step by step"
          eyebrow="HOW ONE SELECTION RUNS"
          title={{ line1: "How a single", line2: "selection", line2Accent: "runs" }}
          sub="You set the standard once. EvalLense applies it to every application and prepares the materials the jury needs to decide faster."
          steps={WORKFLOW_STEPS.map((s) => ({
            num: s.num,
            label: s.label,
            desc: s.desc,
          }))}
          media={{
            ratio: "4/3",
            label: "Image · one setup, same path · 4:3",
            hint: "Split: left ‘Organizer sets the standard’ (criteria, weights, jury setup, intake); right ‘Every deck follows the same path’ (deck, structured slides, AI first read, evidence report, leaderboard input); bottom-centre ‘Human review + final ranking’. Caption inside: One setup. Same path for every deck.",
            ariaLabel:
              "One setup applied to every deck along the same evaluation path",
          }}
        />

        {/* 4. Output — EditorialSplit (soft): points list + report-card placeholder. */}
        <EditorialSplit
          id="output"
          surface="light"
          ariaLabel="What the organizer gets after a run"
          eyebrow="WHAT YOU GET"
          titleLead="What the organizer gets"
          sub="By the jury meeting you already have a working picture of every participant. Every report is built the same way, so projects are easy to compare."
          points={OUTPUT_POINTS.map((p) => ({ title: p.title, body: p.body }))}
          media={{
            ratio: "4/3",
            label: "Image · per-participant report card · 4:3",
            hint: "A large report card: project name, system score, per-criterion scores, strengths, risks, missing data, jury questions, a ‘verify in discussion’ status, and a ‘final score is the jury’s’ note. The report is the hero, not the AI score.",
            ariaLabel:
              "A per-participant evaluation report card prepared for the jury",
          }}
        />

        {/* ── tone-flip seam (§4 → §5): transparent light→ink flip of the shared
            through-background, mirroring evidence-based-reports. ── */}
        <ZoneToneFlip />

        {/* 5. Trust — Bento (INK peak #1): AI prepares, the human decides. */}
        <Bento
          id="trust"
          surface="ink"
          ariaLabel="AI prepares the analysis; the human decides"
          eyebrow="AI PREPARES, THE HUMAN DECIDES"
          title="Not a black box. Not a jury replacement."
          sub="EvalLense prepares the analysis but does not make the final decision. It helps the jury see evidence, risks, and questions faster."
          items={TRUST_TILES.map((t) => ({
            tag: t.tag,
            title: t.title,
            body: t.body,
            feature: "feature" in t ? t.feature : undefined,
            media: "media" in t ? t.media : undefined,
          }))}
        />

        {/* 6. Use cases — Gallery (light), v4 grid: 4 selection formats. */}
        <Gallery
          id="use-cases"
          surface="light"
          version={4}
          ariaLabel="Selection formats EvalLense fits"
          eyebrow="FITS DIFFERENT SELECTION FORMATS"
          title="Fits different selection formats"
          sub="EvalLense works wherever you need to get through many applications fast and compare projects on one standard."
          laneLabel="Selection formats — pitch competition, hackathon, accelerator, grants"
          items={USE_CASES.map((u) => ({
            tag: u.tag,
            title: u.title,
            body: u.body,
          }))}
        />

        {/* 7. Pilot CTA — CtaBand (INK peak #2): run a pilot on a real stream.
            CtaBand takes no `id`, so the `#pilot` nav anchor lives on a wrapper. */}
        <div id="pilot">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            eyebrow="START"
            title="Run a pilot on a real application"
            titleAccent="stream"
            sub="We'll process the participants' materials, prepare reports for the jury, and show how EvalLense works on your selection. Control over the decision stays with you. One application takes 4–5 minutes of machine processing after materials are uploaded."
            primary={{ label: "Start a pilot", href: "/company/contact" }}
            secondary={{ label: "Book a demo", href: "/#demo" }}
          />
        </div>
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
