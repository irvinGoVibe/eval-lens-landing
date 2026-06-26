import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  FullStatement,
  Gallery,
  PinnedSteps,
  EditorialSplit,
  Bento,
  StatBand,
  ChipGrid,
  CtaBand,
  Button,
} from "@/components/ds";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Find your program", href: "#segments" },
    { label: "Pitch competitions", href: "#flagship" },
    { label: "What it's worth", href: "#outcome" },
  ],
};

export const metadata: Metadata = {
  title:
    "EvalLense Use Cases — Batch Pitch Evaluation for Competitions, Accelerators & VC",
  description:
    "Where EvalLense is used: pitch competitions, accelerators, VC, angels, corporate innovation, grants, and universities — one rubric, evidence reports, a leaderboard, and the human deciding.",
};

/* ── Content (verbatim from the page-composer contract). No invented
 * numbers/claims; copy is reproduced exactly. ── */

const SEGMENTS = [
  {
    tag: "Pitch Competitions",
    title:
      "Score dozens of pitches against one rubric and rank finalists in a day, not a month. (in depth below)",
    body: "",
  },
  {
    tag: "Accelerators & Incubators",
    title:
      "Select a cohort consistently — compare founders side by side on the same basis. (in depth below)",
    body: "",
  },
  {
    tag: "VC Funds",
    title:
      "Filter early dealflow fast, and walk into the first call with a structured read. (in depth below)",
    body: "",
  },
  {
    tag: "Angel Investors",
    title:
      "Get a structured first pass before you spend an evening on diligence. e.g. 15 decks from a syndicate share.",
    body: "",
  },
  {
    tag: "Corporate Innovation",
    title:
      "Compare startups on fit, readiness, and evidence — not on who pitched loudest. e.g. 80 entries to an open-innovation call.",
    body: "",
  },
  {
    tag: "Grant Programs",
    title:
      "Review applications against fixed criteria, with a record you can defend. e.g. 120 grant applications.",
    body: "",
  },
  {
    tag: "Universities",
    title:
      "Run student and research selection on one transparent standard. e.g. a 50-team demo day.",
    body: "",
  },
  {
    tag: "Hackathons",
    title:
      "Evaluate many teams quickly, with a leaderboard and questions for the live round. e.g. a 100-team weekend hack. (Today via the pitch rubric; hackathon-specific mode on the roadmap.)",
    body: "",
  },
];

const FLAGSHIP_STEPS = [
  {
    num: "01",
    label: "Open submissions",
    desc: "Share one link; teams upload their own decks into your Entry Hub.",
  },
  {
    num: "02",
    label: "Run the whole field",
    desc: "Six judges score every deck against P1–P6, in parallel — overnight if you like, no one watching.",
  },
  {
    num: "03",
    label: "Read before you meet",
    desc: "Each contender comes with an evidence-linked report and the questions to ask on stage.",
  },
  {
    num: "04",
    label: "Rank the board",
    desc: "A leaderboard sorted by your Final Score, ready to defend to sponsors and co-judges.",
  },
  {
    num: "05",
    label: "Pick the winners",
    desc: "You decide, with the evidence in front of you.",
  },
];

const ACCEL_POINTS = [
  {
    title: "Select a cohort you can defend",
    body: "Score every application against the same bar, compare founders side by side, and back a cohort decision with evidence instead of a reviewer's gut. Reusable for every intake round. Example: a 200-application cohort scored against the same bar — reading that would run 80+ hours, done before the committee meets.",
  },
  {
    title: "Filter dealflow, then go deep",
    body: "Every inbound deck gets a structured first pass, so partners spend their hours on the few worth a call — and walk in already knowing where to press. Example: an inbound week of 40 decks, each given a structured first pass overnight; partners spend their hours on the 5 worth a call.",
  },
];

const ENGINE_TILES = [
  {
    tag: "Entry Hub",
    title: "Entry Hub",
    body: "One intake point, by hand or self-upload link.",
    feature: true,
  },
  {
    tag: "Six independent judges",
    title: "Six independent judges",
    body: "P1–P6, each score with a confidence signal.",
  },
  {
    tag: "Evidence-based reports",
    title: "Evidence-based reports",
    body: "Scores tied to the deck, with gaps and risks.",
  },
  {
    tag: "Leaderboard",
    title: "Leaderboard",
    body: "Ranked by your human Final Score.",
  },
  {
    tag: "Questions for live Q&A",
    title: "Questions for live Q&A",
    body: "Ready-made, per dimension.",
  },
];

const OUTCOME_STATS = [
  {
    value: "20–30 min → 0",
    label:
      "human reading per deck — you start at the report, not the raw slides",
    src: "illustrative",
  },
  {
    value: "~40 hours",
    label: "reclaimed per 100-deck batch — a full review week",
    src: "illustrative",
  },
  {
    value: "One rubric",
    label: "every entry scored the same way, so comparisons are fair",
    src: "",
  },
  {
    value: "The final call, always yours",
    label: "AI prepares the analysis; a person decides",
    src: "",
  },
];

/* Fairness items for the ChipGrid. ChipGrid carries a single label per chip
 * (`name`) — the contract's title + body are joined into one line. Tone is
 * kept neutral/consistent (`info`) across all three per the contract note. */
const FAIRNESS = [
  {
    name: "One standard — every applicant measured against the same criteria, not the reviewer's mood.",
    sev: "info" as const,
  },
  {
    name: "Feedback teams can use — a structured read, not just a yes or a no.",
    sev: "info" as const,
  },
  {
    name: "A record you can defend — an evidence-linked trail behind every ranking.",
    sev: "info" as const,
  },
];

export default function UseCasesPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="usecases section-lab ds">
        {/* 1. Hero — StatementHero, soft. */}
        <StatementHero
          id="usecases-hero"
          surface="light"
          eyebrow="Use Cases"
          titleLead=""
          titleAccent="One review system"
          titleTrail=", many workflows"
          sub="Use EvalLense anywhere a stack of pitch decks has to become a ranked shortlist — scored against one rubric, with the evidence in view and the final call yours."
          ctas={[{ label: "Book a Demo", href: "/company/contact" }]}
          media={{
            ratio: "16/9",
            label: "Image · decks into a ranked shortlist · 16:9",
            hint: "A stream of varied decks converging into a lens, exiting as a ranked shortlist",
            ariaLabel:
              "A stream of varied decks converging into a lens, exiting as a ranked shortlist",
          }}
        />

        {/* soft → ink : masked divider into the squeeze peak. */}
        <div
          className="tr-masked-divider"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* 2. Squeeze — FullStatement, ink. */}
        <FullStatement
          surface="ink"
          ariaLabel="Every program is squeezed between time and fairness"
          eyebrow="The shared problem"
          titleLead="Every program is squeezed between time and fairness"
          sub="A careful read of one deck takes 20–30 minutes. Across dozens or hundreds, the process stretches into weeks — or gets cut to a skim. And even with time, two honest reviewers can land three points apart on the same deck. On a big batch, speed and fairness suffer at once. EvalLense is built for exactly that batch."
        />

        {/* ink → light : gradient bridge settling out of the squeeze peak. */}
        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        />

        {/* 3. Segments — Gallery, light (id `segments`). Gallery has no
            caption/footnote slot, so the bridge line + illustrative disclaimer
            are folded into `sub` per the contract fallback. */}
        <Gallery
          id="segments"
          surface="light"
          eyebrow="Find your program"
          title="One system, your workflow"
          sub="Different programs, the same job — turn a batch into a defensible shortlist. Find yours below. We go deep on three of the most common below — every other program runs the same way. All example scenarios on this page are illustrative — hypothetical programs, not customers."
          laneLabel="Programs that run on EvalLense"
          items={SEGMENTS}
        />

        {/* 4. Flagship — PinnedSteps, light (id `flagship`). The competition
            CTA uses the component's own `cta` prop. PinnedSteps has no
            example/caption slot, so the example scenario is a page-local
            <p className="sub"> after the section (existing utility class). */}
        <PinnedSteps
          id="flagship"
          surface="light"
          ariaLabel="A hundred pitches in, a ranked shortlist out"
          eyebrow="Pitch competitions · the flagship case"
          title={{
            line1: "A hundred pitches in,",
            line2: "a ranked shortlist out",
          }}
          sub="The case EvalLense was built for first. Collect the whole field, evaluate it against one rubric, and reach the finals with a ranked, defensible board — each step lights up as you scroll."
          steps={FLAGSHIP_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · field to ranked board · 4:3",
            hint: "One link collects the field; decks score overnight; a ranked board with questions per finalist",
            ariaLabel:
              "A field collected from one link, scored overnight into a ranked board with questions",
          }}
          cta={{
            label: "Book a demo for your competition",
            href: "/company/contact",
          }}
        />
        <p className="wrap sub">
          A 60-deck regional competition. One link collects every entry; the
          field is scored overnight; the jury reaches finals day with a ranked
          board and questions per finalist — instead of ~25 hours of
          pre-reading.
        </p>

        {/* 5. Accel/VC — EditorialSplit, soft. No `cta` prop on EditorialSplit,
            so the segment CTA is a page-local Button in a cta-row after it. */}
        <EditorialSplit
          surface="light"
          eyebrow="Accelerators & investors"
          titleLead="Cohort selection and dealflow, "
          titleAccent="on one basis"
          sub="The same engine, two adjacent jobs — both about reading more, faster, without losing the thread."
          points={ACCEL_POINTS}
          media={{
            ratio: "4/3",
            label: "Image · cohort side-by-side · dealflow funnel · 4:3",
            hint: "Split visual: cohort compared side by side on the left, dealflow funnel on the right",
            ariaLabel:
              "Split visual: cohort compared side by side on the left, dealflow funnel on the right",
          }}
        />
        <div className="wrap cta-row">
          <Button href="/company/contact">
            Talk to us about your cohort or dealflow
          </Button>
        </div>

        {/* 6. Foundation — Bento, soft. First tile is the feature tile. */}
        <Bento
          surface="light"
          ariaLabel="Different programs, the same engine"
          eyebrow="Under every workflow"
          title="Different programs, the same engine"
          sub="Whatever your segment, a run leaves you the same toolkit — that's why one system covers them all."
          items={ENGINE_TILES}
        />

        {/* soft → light : masked divider into the outcome peak. */}
        <div
          className="tr-masked-divider"
          data-from="soft"
          data-to="light"
          aria-hidden="true"
        />

        {/* 7. Outcome — StatBand, light (id `outcome`) + ChipGrid (fairness,
            light) rendered tight underneath in the same region. */}
        <StatBand
          id="outcome"
          surface="light"
          eyebrow="What it's worth"
          title="Reclaim the reading, defend the decision"
          stats={OUTCOME_STATS}
          media={{
            ratio: "21/9",
            label: "Image · reclaimed-time band · 21:9",
            hint: "A wide band illustrating reclaimed reviewer time across a batch",
            ariaLabel:
              "A wide band illustrating reclaimed reviewer time across a batch",
          }}
        />
        <ChipGrid
          surface="light"
          ariaLabel="Why a run holds up: one standard, usable feedback, a defensible record"
          columns={3}
          tight
          items={FAIRNESS}
        />
        <p className="wrap sub">
          Time figures are illustrative, based on a 20–30 minute manual read per
          deck.
        </p>

        {/* light → ink : masked divider into the closing CTA peak. */}
        <div
          className="tr-masked-divider"
          data-from="light"
          data-to="ink"
          aria-hidden="true"
        />

        {/* 8. Final CTA — CtaBand, ink. */}
        <CtaBand
          theme="dark"
          eyebrow="Get started"
          title="Bring your next batch to EvalLense"
          sub="Book a demo and we'll walk your exact workflow — and a pilot batch of your own decks."
          primary={{ label: "Book a Demo", href: "/company/contact" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
