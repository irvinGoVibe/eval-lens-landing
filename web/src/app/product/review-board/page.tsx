import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { CanvasFlowField } from "@/components/CanvasFlowField";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import {
  StatementHero,
  Numbered,
  Bento,
  RiskControl,
  Gallery,
  PinnedSteps,
  EditorialSplit,
  CtaBand,
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
      <main className="review-board section-lab ds ds-canvas">
        {/* ── Primary dark bg — OUTSIDE the zone, position:fixed (viewport-sized).
            Must NOT be inside .ds-zone with --contained: that forces position:absolute
            (zone-height ≈ 5000px) so animations use zone-% instead of viewport-%.
            Flow-field blobs and orbit animation are designed for viewport dimensions;
            here the bg stays viewport-sized while scrolling, and CtaBand/Footer
            (both opaque) naturally paint over it. ds-canvas on <main> gives
            isolation:isolate so z-index:-1 scopes correctly within main. ── */}
        <div
          className="ds-canvas__bg ds-canvas__bg--lobes-dark ds-zone__bg--on"
          aria-hidden="true"
        >
          <span className="ds-canvas__spark ds-canvas__spark--1" />
          <span className="ds-canvas__spark ds-canvas__spark--2" />
          <span className="ds-canvas__spark ds-canvas__spark--3" />
        </div>

        {/* ── ONE continuous tonal zone (§1–§7): the zone wrapper controls
            the FLIP layers only — the dark base is the fixed bg above.
            Layer stack (z-index:-1, DOM order = back→front):
              1) --lobes .ds-relight      light, faded 0→1 by ZoneToneFlipReverse → §4–5
              2) .ds-flip-bridge/__glow   brand bloom at the §3/§4 reverse seam
              3) --lobes-dark .ds-redark  second dark, faded 0→1 by ZoneToneFlip → §6–7
            No light base needed — dark-start pages open on the fixed bg above.
            CtaBand (§8, own video) + Footer stay OUTSIDE the zone. ── */}
        <div className="ds-zone">
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight" aria-hidden="true" />
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark ds-redark"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          {/* blobs only over the LIGHT band §4–5, clipped off the dark §1–3 (top)
              and §6–7 (bottom) — % to live-tune via ?blobs */}
          <ZoneBlobs top="40%" bottom="34%" />

        {/* 1 — Statement hero (soft) */}
        <StatementHero
          surface="ink"
          version={2}
          eyebrow="Review Board"
          titleLead="Compare the evidence. Make the"
          titleAccent="final call."
          sub="Review every scored startup in one place. Compare the evidence, set your Jury Scores, and rank the batch. AI prepares the analysis. Your jury decides what moves forward."
          ctas={[
            { label: "Book a demo", href: "/company/contact" },
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
          surface="ink"
          version={3}
          eyebrow="After the scores"
          title="A scored batch still needs a decision"
          sub="AI can score every startup. Your jury still needs to compare the evidence, resolve disagreements, and decide what moves forward."
          items={[
            {
              num: "01",
              title: "Separate reports hide differences",
              body: "Important differences are easy to miss when every report lives in a separate tab.",
            },
            {
              num: "02",
              title: "Scores need evidence",
              body: "A number means little unless reviewers can see the findings behind it.",
            },
            {
              num: "03",
              title: "Batch progress is hard to track",
              body: "Reviewers need one place to see what's ready, in review, scored, or blocked.",
            },
            {
              num: "04",
              title: "Decisions lose their context",
              body: "Scores, notes, and reasoning need to remain visible after the shortlist is final.",
            },
          ]}
        />

        {/* 3 — Bento: one board to decide from (light) */}
        <Bento
          id="board"
          surface="ink"
          className="bg-dot-grid"
          eyebrow="One workspace"
          title="One board for the whole decision"
          titleAccent="decision"
          sub="See every startup, status, AI Total Score, Jury Score, and finding in one place. Compare the batch, open the evidence, and build the shortlist without moving between reports and spreadsheets."
          items={[
            {
              tag: "Startup list",
              title: "Every startup and its current status",
              body: "See the full batch and know which startups are ready, under review or waiting for a score.",
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
              title: "A reference, not the final score",
              body: "Use the AI score as context. Your Jury Score determines the ranking.",
            },
            {
              tag: "Judge findings",
              title: "The reasoning behind each score",
              body: "Review the findings across your evaluation criteria and see what supports each score.",
            },
            {
              tag: "Comparison",
              title: "Compare startups side by side",
              body: "Review startups against the same criteria and see the differences directly.",
            },
            {
              tag: "Leaderboard",
              title: "Ranked by your Jury Score",
              body: "Rank the batch using your Jury Scores and project weights. The AI score stays advisory.",
            },
            {
              tag: "Shortlist",
              title: "Build the shortlist without leaving the board",
              body: "Shortlist the strongest startups without moving the decision into a separate spreadsheet or document.",
            },
          ]}
        />

        {/* ── reverse tone-flip seam (§3 → §4): dark→light through the brand
            bridge — fades the .ds-relight layer in (covers the dark) + blooms the
            bridge, inside the same continuous zone. ── */}
        <ZoneToneFlipReverse />

        {/* 4 — RiskControl: AI signal → human decision (light · v1) */}
        <RiskControl
          surface="light"
          ariaLabel="AI signal to human decision — AI shows where to look, your jury decides what to do"
          eyebrow="AI SIGNAL → HUMAN DECISION"
          title="AI shows where to look. Your jury decides what to do."
          titleAccent="decides"
          sub="High scores, weak evidence, and judge disagreement are signals for review, not automatic decisions."
          leftTag="AI SIGNAL"
          rightTag="HUMAN DECISION"
          pairs={[
            {
              risk: "Judges disagree",
              control:
                "Review the split, compare the reasoning, and resolve it together.",
            },
            {
              risk: "A high score has weak evidence",
              control:
                "Open the findings and check whether the score is supported.",
            },
            {
              risk: "A lower-ranked startup fits your criteria",
              control:
                "Move it into the shortlist and keep the reason with the decision.",
            },
          ]}
        />

        {/* 5 — Gallery: read the whole batch at a glance (light) */}
        <Gallery
          id="status"
          surface="light"
          version={1}
          eyebrow="Batch status"
          title="See the whole batch at a glance"
          sub="Each startup has one clear status, so you can see what's ready, in review, scored or blocked without opening every report."
          laneLabel="Participant statuses across the board"
          items={[
            {
              tag: "Ready",
              title: "AI Report Ready",
              body: "The AI analysis is complete and ready for your review.",
            },
            {
              tag: "Active",
              title: "In Review",
              body: "The report is open and the human review is underway.",
            },
            {
              tag: "Complete",
              title: "Scored",
              body: "A Jury Score has been submitted for every dimension.",
            },
            {
              tag: "Pending",
              title: "Not Scored",
              body: "Human scoring hasn't started yet.",
            },
            {
              tag: "Action needed",
              title: "Error",
              body: "One or more judge runs failed. Rerun the entry before scoring it.",
            },
          ]}
        />

        {/* ── tone-flip seam (§5 → §6): light→dark — fades the SECOND dark layer
            (.ds-redark) in, so the shared background returns to dark for §6–7. ── */}
        <ZoneToneFlip targetSelector=".ds-redark" />

        {/* 6 — PinnedSteps: human in the loop (INK PEAK 1) */}
        <PinnedSteps
          id="hitl"
          surface="ink"
          ariaLabel="Human in the loop — AI prepares the analysis, you make the call"
          eyebrow="Human in the loop"
          title={{
            line1: "AI prepares the evidence.",
            line2: "Your jury makes",
            line2Accent: "the call",
          }}
          sub="AI reviews every deck across the same criteria. You check the evidence, ask questions, set the Jury Score and generate the final ranking."
          steps={[
            {
              num: "01",
              label: "Open the report",
              desc: "Review the startup summary, AI Total Score, and findings across your project criteria.",
            },
            {
              num: "02",
              label: "Ask and record",
              desc: "Use criterion-linked questions during the session and keep notes beside the evidence.",
            },
            {
              num: "03",
              label: "Set the Jury Score",
              desc: "Score each criterion from 0.0 to 10.0. The AI Total Score remains read-only.",
            },
            {
              num: "04",
              label: "Generate the leaderboard",
              desc: "Once every startup is scored, generate a ranking based on Jury Scores and project weights.",
            },
          ]}
          mediaNode={
            <img
              className="lab-process__shot"
              src="/assets/review-board/hitl-scores.webp"
              alt="The advisory AI Score beside the human Jury Score, with the resulting leaderboard"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          }
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
          surface="ink"
          version={3}
          eyebrow="Compare & rank"
          titleLead="Turn separate reports into one"
          titleAccent="ranked list"
          sub="Compare every startup against the same criteria, see where the judges disagree, and build a shortlist in one place."
          points={[
            {
              title: "Compare side by side",
              body: "Compare startups using the same criteria. Sort the list by total score or any individual dimension.",
            },
            {
              title: "See where judges disagree",
              body: "When AI judges differ, we show the spread instead of averaging it away. You can see consensus, a split, or a conflict — and where human review matters.",
            },
            {
              title: "Use your criteria",
              body: "Set your own rubric and weights. For custom jury processes, we adapt the evaluation setup to match how you already work.",
            },
            {
              title: "Human Jury Score sets the rank",
              body: "The leaderboard is ranked by your Jury Score, weighted by your criteria. AI scores stay visible as context, but never determine the final order.",
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

        </div>
        {/* ── end tonal zone (§1–§7) — CtaBand (own video) + Footer stay outside ── */}

        {/* ── tr-gradient-bridge (200px, ink→ink) between the dark zone end (§7
            EditorialSplit, ink) and the dark CtaBand (§9, ink video): smooths the
            seam between the two dark surfaces. 200px height; gradient direction
            bottom→top (--from is the bottom stop). ── */}
        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
          style={
            {
              height: "200px",
              background:
                "linear-gradient(in oklab to top, var(--from) 0%, var(--to) 100%)",
            } as CSSProperties
          }
        />

        {/* 9 — CtaBand: decision trail (dark, aurora) — copy moved from §8 */}
        <CtaBand
          theme="dark"
          videoSrc="/assets/cta/cube-1.mp4"
          eyebrow="Decision trail"
          title="AI advises. Your Jury Score"
          titleAccent="decides."
          sub="The AI Total Score stays visible as context. Your Jury Scores determine the ranking, so the final order reflects your jury's decision."
          primary={{ label: "Book a demo", href: "/company/contact" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
      {/* Blue flow-field over the first (top) dark layer covering §1–3 — the hero
          plays a brand-blue gradient field. `blue` scopes the palette to this
          page only via the .ds-flow--blue modifier. */}
      <CanvasFlowField blue />
    </>
  );
}
