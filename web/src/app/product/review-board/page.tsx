import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  Numbered,
  Bento,
  StatBand,
  Gallery,
  PinnedSteps,
  EditorialSplit,
  FullStatement,
  QuietCta,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "EvalLense Review Board — Compare, Shortlist, Decide",
  description:
    "Review Board is the EvalLense decision workspace: compare scored startups, set human Jury Scores, rank by your decision and keep an audit trail — the final call always yours.",
};

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/overview",
  links: [
    { label: "Board", href: "#board" },
    { label: "Human Loop", href: "#hitl" },
    { label: "Compare", href: "#compare" },
  ],
};

export default function ReviewBoardPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="review-board section-lab ds">
        {/* 1 — Statement hero (soft) */}
        <StatementHero
          surface="soft"
          eyebrow="Review Board"
          titleLead="Where AI analysis becomes a human"
          titleAccent="decision"
          sub="Bring every scored startup into one board, compare the evidence side by side, and rank your cohort in a day instead of weeks. AI prepares the analysis; the final call is yours."
          ctas={[
            { label: "Book a Demo", href: "/company/contact" },
            { label: "Try live demo", href: "/#demo", variant: "ghost" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · board into a decision · 16:9",
            hint: "A board of startup cards, one lifting into a shortlist under a human decision — lens-gradient violet→cyan→aqua, calm",
            ariaLabel:
              "A board of startup cards with one card lifting into a shortlist under a human decision",
          }}
        />

        {/* 2 — Numbered: after the scores (light) */}
        <Numbered
          surface="light"
          eyebrow="After the scores"
          title="A scored batch isn't a decision yet"
          sub="Once the AI analysis is ready, the work shifts from reading single reports to making one call across the whole batch — and that's where the friction starts."
          items={[
            {
              num: "01",
              title: "Hard to compare",
              body: "Dozens of reports in separate tabs make differences easy to miss and slow to weigh.",
            },
            {
              num: "02",
              title: "Numbers need context",
              body: "A score means little without the evidence and the judge findings behind it.",
            },
            {
              num: "03",
              title: "One shared view",
              body: "Reviewers need the batch in a single place, not rebuilt from scattered files.",
            },
            {
              num: "04",
              title: "A defensible trail",
              body: "Final decisions have to be recorded and explainable later — not lost the moment they're made.",
            },
          ]}
        />

        {/* 3 — Bento: one board to decide from (light) */}
        <Bento
          id="board"
          surface="light"
          className="bg-dot-grid"
          eyebrow="One workspace"
          title="One board to decide from"
          sub="Review Board pulls every participant into a single view — statuses, scores, summaries, comparison and the leaderboard — so the batch reads as one decision surface. Each entry opens its full evidence-based report."
          items={[
            {
              tag: "Startup list",
              title: "Every entry, with a live status",
              body: "Every entry in one list, each carrying a live status, so the state of the batch is always readable.",
              feature: true,
              media: {
                label: "Image · board bento · 16:9",
                hint: "Startup list with statuses, scores, comparison and leaderboard — hairline tiles, one lens accent",
                ariaLabel:
                  "A bento of the board: startup list with statuses, scores, comparison and leaderboard",
              },
            },
            {
              tag: "AI Total Score",
              title: "Advisory baseline, not a verdict",
              body: "An advisory baseline beside each entry. It informs your read and never sets the ranking.",
            },
            {
              tag: "Judge summaries",
              title: "What each lens found",
              body: "Short per-dimension findings across P1–P6 give the context behind a number, so a score is never read alone.",
            },
            {
              tag: "Comparison",
              title: "Startups side by side",
              body: "Candidates placed next to each other on the same criteria, so differences are visible instead of inferred.",
            },
            {
              tag: "Leaderboard",
              title: "Ranked by your Jury Score",
              body: "The batch ordered by your Jury Score, weighted by the project criteria — your decision, not the AI baseline.",
            },
            {
              tag: "Shortlist",
              title: "The strongest, set aside",
              body: "Pull the strongest aside and keep the decision state on the board, not in side notes.",
            },
          ]}
        />

        {/* 4 — StatBand: a human scale (light) */}
        <StatBand
          surface="light"
          eyebrow="By the numbers"
          title="A board built on a human scale"
          stats={[
            {
              value: "0.0–10.0",
              label: "Jury Score per dimension",
              src: "Human scale",
            },
            {
              value: "6",
              label: "Evaluation dimensions, P1–P6",
              src: "Applied to every deck",
            },
            {
              value: "1,000+",
              label: "Evaluation runs",
              src: "Behind the methodology",
            },
            {
              value: "1",
              label: "Organizer owns the call",
              src: "Single Mode (MVP)",
            },
          ]}
        />

        {/* 5 — Gallery: read the whole batch at a glance (light) */}
        <Gallery
          surface="light"
          eyebrow="Always legible"
          title="Read the whole batch at a glance"
          sub="Every entry carries one status, so you can see what's ready, what's mid-review and what needs your attention — without opening a thing."
          laneLabel="Participant statuses across the board"
          items={[
            {
              tag: "Ready",
              title: "AI Report Ready",
              body: "The judges have finished; the AI analysis is ready for a human read. No live score yet.",
            },
            {
              tag: "Active",
              title: "In Review",
              body: "The report is open and human evaluation is under way.",
            },
            {
              tag: "Ready",
              title: "Scored",
              body: "A human Jury Score has been submitted across the dimensions.",
            },
            {
              tag: "Absent",
              title: "Not Scored",
              body: "No live score yet — awaiting a human read.",
            },
            {
              tag: "Attention",
              title: "Error",
              body: "A judge run failed; the entry needs a rerun before it can be scored.",
            },
          ]}
        />

        {/* 6 — PinnedSteps: human in the loop (INK PEAK 1) */}
        <PinnedSteps
          id="hitl"
          surface="ink"
          ariaLabel="Human in the loop — AI prepares the analysis, you make the call"
          eyebrow="Human in the loop"
          title={{
            line1: "AI prepares the analysis.",
            line2: "You make",
            line2Accent: "the call",
          }}
          sub="AI does the slow reading — every deck, every dimension — so your time goes to the decision, not the grind. You move from the AI report to a human Jury Score and a leaderboard, each step lighting up as you scroll."
          steps={[
            {
              num: "01",
              label: "Open the report",
              desc: "You open a Participant Report and read the Project Summary and the AI Score Report — the advisory AI Total Score with judge findings across P1–P6.",
            },
            {
              num: "02",
              label: "Ask in live Q&A",
              desc: "Questions for Participants, each linked to a P1–P6 criterion, guide the live session; answer notes are optional context, never a blocker.",
            },
            {
              num: "03",
              label: "Set the Jury Score",
              desc: "You score each dimension on a 0.0–10.0 scale. The AI Total Score stays read-only beside it, and you see the delta between the two.",
            },
            {
              num: "04",
              label: "Generate the leaderboard",
              desc: "When the review is done, you generate the project leaderboard — ranked on your Jury Score, on your judgment.",
            },
          ]}
          media={{
            ratio: "4/3",
            label: "Image · human-in-the-loop track · 4:3",
            hint: "AI report → live Q&A → Jury Score slider → Leaderboard, nodes lighting in sequence",
            ariaLabel:
              "A track from AI report through live Q&A and Jury Score to the leaderboard",
          }}
        />

        {/* 7 — EditorialSplit: compare & rank (light) */}
        <EditorialSplit
          id="compare"
          surface="light"
          eyebrow="Compare & rank"
          titleLead="From separate reports to one"
          titleAccent="ranked"
          titleTrail=" list"
          sub="The board turns a batch into a ranked decision in a day, not weeks — candidates side by side on the same criteria, the strongest pulled into a shortlist."
          points={[
            {
              title: "Side by side",
              body: "Compare startups across the same dimensions and sort by score or by a single measure. Every deck is read against the same scoring methodology.",
            },
            {
              title: "Disagreement, surfaced",
              body: "When the AI judges diverge on a dimension, the report shows the spread instead of hiding it in an average — consensus, split or conflict — so you know where a closer human read is needed.",
            },
            {
              title: "Your criteria",
              body: "Set the rubric and weights for your project. When your jury process needs more, we tailor the evaluation pipeline to it — a managed service that fits how you already judge, not a template you bend to.",
            },
            {
              title: "Human Jury Score ranks · AI stays advisory",
              body: "The leaderboard ranks on your decision — your Jury Score, weighted by the project criteria. The AI context sits beside the rank as a reference, never as the ranking.",
            },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · compare & leaderboard · 16:9",
            hint: "Candidates side by side on the same criteria, the strongest pulled into a shortlist — hairline UI, one lens accent",
            ariaLabel:
              "A comparison view of startups side by side with a leaderboard",
          }}
        />

        {/* 8 — FullStatement: decision trail (INK PEAK 2) */}
        <FullStatement
          surface="ink"
          eyebrow="Decision trail"
          titleLead="The AI score and your score stay"
          titleAccent="side by side"
          titleTrail="."
          sub="Neither overwrites the other: the AI Total Score stays an advisory baseline, your Jury Score becomes the final input. That keeps the reasoning intact and makes every decision explainable later."
        />

        {/* 9 — QuietCta: get started (light) */}
        <QuietCta
          surface="light"
          eyebrow="Get started"
          title="See your next cohort ranked in a day"
          sub="Book a demo and watch a scored batch turn into a shortlist, a leaderboard and a decision a person owns — with the final call always yours."
          cta={{ label: "Book a Demo", href: "/company/contact" }}
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
