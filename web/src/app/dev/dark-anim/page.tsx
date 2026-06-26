import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { Footer } from "@/components/Footer";
import { CanvasBgAnimSwitch } from "../canvas-bg/CanvasBgAnimSwitch";
import {
  StatementHero,
  Bento,
  RiskControl,
  FullStatement,
  Gallery,
  PinnedSteps,
  CtaBand,
} from "@/components/ds";

export const metadata: Metadata = { title: "Dev Dark — canvas anim test" };

const BENTO_ITEMS = [
  { tag: "Start here", title: "How evaluation works", body: "The full path from a batch of decks to one defensible leaderboard.", feature: true },
  { tag: "Entry hub", title: "Collect the decks", body: "One link gathers every submission, parsed and queued for review." },
  { tag: "Reports", title: "Evidence-based reports", body: "Each score links back to the slide and source behind it." },
  { tag: "Review board", title: "Decide together", body: "A shared leaderboard the whole table reads the same way." },
];

const RISK_PAIRS = [
  { risk: "A judge over-weights one strong slide", control: "A fixed rubric scores every dimension independently, so one slide can't swing the verdict." },
  { risk: "Scores drift between reviewers", control: "The same findings and weights always produce the same number — reviews stay comparable." },
  { risk: "A claim has no evidence behind it", control: "Every score links back to the slide and source it came from; unbacked claims are flagged." },
];

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

const PINNED_STEPS = [
  { num: "01", label: "Intake", desc: "Drop in a batch of decks; each is parsed and queued for review." },
  { num: "02", label: "Read", desc: "The model reads every slide, pulling claims and the evidence behind them." },
  { num: "03", label: "Score", desc: "A fixed rubric turns findings into comparable, traceable signals." },
  { num: "04", label: "Rank", desc: "Scores roll up into one leaderboard you can defend line by line." },
  { num: "05", label: "Decide", desc: "A person signs off — the final call always stays human." },
];

/**
 * /dev/dark-anim — a BLACK-only test page for the dark canvas background motion.
 * The whole page sits on the shared `--lobes-dark` layer (forced visible with
 * `ds-zone__bg--on`, no tone-flip), every section is `surface="ink"`, and the
 * CanvasBgAnimSwitch toggles anim 1 (orbit) vs anim 2 (scroll-bound flow). Seven
 * stacked ink sections give enough scroll length to feel the flow.
 */
export default function DarkAnimPage() {
  return (
    <main className="dark-anim-demo section-lab ds ds-canvas">
      {/* the dark canvas background, always on (no light layer, no flip) */}
      <div
        className="ds-canvas__bg ds-canvas__bg--lobes-dark ds-zone__bg--on"
        data-anim="1"
        aria-hidden="true"
      />
      {/* dev switch: dark-bg motion — 1 orbit (CSS) · 2 scroll-bound flow */}
      <CanvasBgAnimSwitch />

      <StatementHero
        surface="ink"
        version={2}
        eyebrow="Dev dark · anim test"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="Black-only scroll bench for the canvas background motion. Toggle anim 1 / 2 bottom-left and scroll."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "See how it works", href: "#" },
        ]}
      />

      <Bento
        surface="ink"
        eyebrow="Bento"
        title="One map into the deeper pages"
        sub="A compact tile field: one feature idea plus a set of supporting tiles."
        items={BENTO_ITEMS}
      />

      <RiskControl
        surface="ink"
        eyebrow="Risk → control"
        title="Every failure mode has a guardrail"
        titleAccent="guardrail"
        sub="For each way an evaluation could go wrong, the specific system control that keeps it bounded."
        pairs={RISK_PAIRS}
      />

      <Gallery
        surface="ink"
        eyebrow="Horizontal gallery"
        title="Equal ideas in one scrollable lane"
        sub="A horizontal lane keeps a set of equal ideas from becoming a tall wall of cards."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      <FullStatement
        surface="ink"
        eyebrow="The thesis"
        titleLead="AI does the reading; the"
        titleAccent="decision"
        titleTrail="stays human"
        sub="One clear sentence between dense sections — a deliberate pause before the next block of detail."
      />

      <PinnedSteps
        surface="ink"
        ariaLabel="Pinned multi-screen process"
        eyebrow="Pinned multi-screen"
        title={{ line1: "One fixed path,", line2: "five steps", line2Accent: "in sequence" }}
        sub="A tall pinned stage holds while the numbered steps light up one by one as you scroll."
        steps={PINNED_STEPS}
        media={{
          ratio: "4/3",
          label: "Image · pinned flow · 4:3",
          hint: "A five-step track whose nodes light up in sequence",
          ariaLabel: "A track of five steps whose nodes light up in sequence",
        }}
      />

      {/* shelf into the black CTA: transparent (dark canvas above) → ink ledge */}
      <div
        className="tr-gradient-bridge"
        data-to="ink"
        style={{ "--from": "transparent", height: "200px" } as CSSProperties}
        aria-hidden="true"
      />

      <CtaBand
        theme="dark"
        bleed
        eyebrow="Ready when you are"
        title="AI prepares the analysis. "
        titleAccent="You decide."
        sub="Evidence-first scoring, then a human signs off — see the full run on your own decks."
        primary={{ label: "Book a demo", href: "#" }}
        secondary={{ label: "See how it works", href: "#" }}
        videoSrc="/assets/_demo-pool/video/bg-stones.mp4"
      />

      {/* Footer as a section — dark theme */}
      <Footer variant="dark" />

      <ScrollFX />
    </main>
  );
}
