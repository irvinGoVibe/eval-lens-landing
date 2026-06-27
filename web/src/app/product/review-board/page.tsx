import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { CanvasFlowField } from "@/components/CanvasFlowField";
import { ReviewBoardMockup } from "@/components/ReviewBoardMockup";
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
          sub="Review Board turns AI-scored reports into a human-ranked batch decision. Compare every startup on the same criteria, set your Jury Scores, and build the final ranking — the call stays yours."
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
          eyebrow="After scoring"
          title="A scored batch is not a decision"
          sub="AI can score every startup, but a stack of separate scores is not a ranked outcome. The differences, the evidence, and the progress stay scattered across reports."
          items={[
            {
              num: "01",
              title: "Separate reports hide the differences",
              body: "Important differences are easy to miss when every report lives in a separate tab.",
            },
            {
              num: "02",
              title: "Scores need evidence",
              body: "A score means little unless reviewers can see what supports it.",
            },
            {
              num: "03",
              title: "Batch progress is hard to track",
              body: "Reviewers need one place to see what is ready, in review, scored, or blocked.",
            },
            {
              num: "04",
              title: "Decisions lose context",
              body: "Scores, notes, and reasoning should stay visible after the shortlist is final.",
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
          sub="One place to turn scored reports into a decision. See every startup, status, AI Total Score, Jury Scores, and key finding — compare the batch, open the evidence, and build the shortlist without jumping between reports and spreadsheets."
          items={[
            {
              tag: "Startup list",
              title: "Every startup and its current status",
              body: "See the full batch and know which startups are ready, under review, or still waiting for a score.",
              feature: true,
              media: {
                label: "Image · board bento · 16:9",
                hint: "Startup list with statuses, scores, comparison and leaderboard — hairline tiles, one lens accent",
                ariaLabel:
                  "A bento of the board: startup list with statuses, scores, comparison and leaderboard",
                node: <ReviewBoardMockup />,
              },
            },
            {
              tag: "AI Total Score",
              title: "Reference, not final score",
              body: "Use the AI score as context. Your Jury Scores determine the ranking.",
            },
            {
              tag: "Judge findings",
              title: "The reasoning behind each score",
              body: "Review findings across your criteria and see what supports each score.",
            },
            {
              tag: "Comparison",
              title: "Compare startups side by side",
              body: "Review startups against the same criteria and see the differences directly.",
            },
            {
              tag: "Leaderboard",
              title: "Ranked by Jury Scores",
              body: "Rank the batch using Jury Scores and project weights. AI scores stay advisory.",
            },
            {
              tag: "Shortlist",
              title: "Build the shortlist without leaving the board",
              body: "Shortlist the strongest startups without moving the decision into a spreadsheet or separate document.",
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
          ariaLabel="Review signals — the cases AI flags for a closer look"
          eyebrow="Review signals"
          title="AI flags where to look closer"
          titleAccent="closer"
          sub="High scores with weak evidence, judge disagreement, and a strong criteria fit are the cases worth a second look."
          leftTag="Signal"
          rightTag="What to check"
          pairs={[
            {
              risk: "Judges disagree",
              control:
                "Open the split and compare the reasoning before you score.",
            },
            {
              risk: "A high score has weak evidence",
              control:
                "Open the findings and check what actually supports it.",
            },
            {
              risk: "A lower-ranked startup fits your criteria",
              control:
                "Pull up the evidence and give it a closer read.",
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
          sub="Each startup has one clear status, so you can see what is ready, in review, scored, or blocked without opening every report."
          laneLabel="Participant statuses across the board"
          items={[
            {
              tag: "Ready",
              title: "AI report ready",
              body: "The AI analysis is complete and ready for review.",
            },
            {
              tag: "Active",
              title: "In review",
              body: "The report is open and human review is underway.",
            },
            {
              tag: "Complete",
              title: "Scored",
              body: "Jury Scores have been submitted for every dimension.",
            },
            {
              tag: "Pending",
              title: "Not scored",
              body: "Human scoring has not started yet.",
            },
            {
              tag: "Action needed",
              title: "Needs rerun",
              body: "One or more judge runs failed. Rerun the entry before scoring.",
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
            line1: "Four steps from",
            line2: "report to",
            line2Accent: "final ranking.",
          }}
          sub="Check the evidence, ask questions, set Jury Scores, and generate the final ranking — all in one board."
          steps={[
            {
              num: "01",
              label: "Open the report",
              desc: "Review the startup summary, AI Total Score, and findings across your criteria.",
            },
            {
              num: "02",
              label: "Ask and record",
              desc: "Use criterion-linked questions during the session and keep notes beside the evidence.",
            },
            {
              num: "03",
              label: "Set Jury Scores",
              desc: "Score each criterion from 0.0 to 10.0. The AI Total Score stays read-only.",
            },
            {
              num: "04",
              label: "Generate the leaderboard",
              desc: "Once every startup is scored, generate the ranking from Jury Scores and project weights.",
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
          eyebrow="Compare and rank"
          titleLead="Turn separate reports into one"
          titleAccent="ranked list"
          sub="Put every startup on the same criteria and let your Jury Scores order the batch — one human-ranked leaderboard instead of scattered reports."
          points={[
            {
              title: "Compare on the same criteria",
              body: "Line up every startup against the same criteria and sort by total score or any single dimension.",
            },
            {
              title: "From reports to one list",
              body: "Separate reports collapse into one ranked batch you can act on, not scattered tabs.",
            },
            {
              title: "Use your own criteria and weights",
              body: "Set the criteria and weights so the ranking matches how your jury already works.",
            },
            {
              title: "Jury Scores set the rank",
              body: "The leaderboard is ranked by Jury Scores, weighted by your criteria. AI scores stay context, never the final order.",
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
          title="AI advises. Your Jury Scores"
          titleAccent="decide."
          sub="Every decision keeps its trail — AI Total Score as context, Jury Scores as the verdict, and a ranking your jury can defend."
          primary={{ label: "Review one batch", href: "/#demo" }}
          secondary={{ label: "Book a demo", href: "/company/contact" }}
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
