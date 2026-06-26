import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { Footer } from "@/components/Footer";
import { CanvasBlobs } from "../canvas-bg/CanvasBlobs";
import {
  StatementHero,
  HubMap,
  RiskControl,
  FullStatement,
  Gallery,
  Bento,
  StatBand,
  PinnedSteps,
  Faq,
  CtaBand,
} from "@/components/ds";

export const metadata: Metadata = { title: "Dev Light — canvas anim test" };

const HUBMAP_ITEMS = [
  { tag: "Start here", title: "How evaluation works", body: "The full path from a batch of decks to one defensible leaderboard.", href: "#", feature: true },
  { tag: "Entry hub", title: "Collect the decks", body: "One link gathers every submission, parsed and queued for review.", href: "#" },
  { tag: "Reports", title: "Evidence-based reports", body: "Each score links back to the slide and source behind it.", href: "#" },
  { tag: "Review board", title: "Decide together", body: "A shared leaderboard the whole table reads the same way.", href: "#" },
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

const BENTO_ITEMS = [
  { tag: "Start here", title: "How evaluation works", body: "The full path from a batch of decks to one defensible leaderboard.", feature: true },
  { tag: "Entry hub", title: "Collect the decks", body: "One link gathers every submission, parsed and queued for review." },
  { tag: "Reports", title: "Evidence-based reports", body: "Each score links back to the slide and source behind it." },
  { tag: "Review board", title: "Decide together", body: "A shared leaderboard the whole table reads the same way." },
];

const STATS = [
  { value: "12,000+", label: "eval runs / week", src: "platform telemetry" },
  { value: "< 2 min", label: "to first result", src: "median, p50" },
  { value: "99.8%", label: "reproducibility", src: "10k re-run sample" },
];

const PINNED_STEPS = [
  { num: "01", label: "Intake", desc: "Drop in a batch of decks; each is parsed and queued for review." },
  { num: "02", label: "Read", desc: "The model reads every slide, pulling claims and the evidence behind them." },
  { num: "03", label: "Score", desc: "A fixed rubric turns findings into comparable, traceable signals." },
  { num: "04", label: "Rank", desc: "Scores roll up into one leaderboard you can defend line by line." },
  { num: "05", label: "Decide", desc: "A person signs off — the final call always stays human." },
];

const FAQ_ITEMS = [
  { q: "How are scores made comparable?", a: "A fixed rubric scores every dimension independently, so the same findings and weights always produce the same number." },
  { q: "Where does each score come from?", a: "Every score links back to the slide and source it came from; unbacked claims are flagged rather than scored." },
  { q: "Does the AI make the final call?", a: "No. The model prepares the analysis; a person signs off — the final decision always stays human." },
  { q: "Can I evaluate a whole batch at once?", a: "Yes. Drop in a batch of decks; each is parsed, queued and rolled up into one leaderboard you can defend line by line." },
];

/**
 * /dev/light-anim — the LIGHT counterpart of /dev/dark-anim. The whole page sits
 * on the shared LIGHT canvas gradient (`--lobes`, always visible + self-animated
 * drift/shimmer), every section is `surface="light"`, and the floating PNG blobs
 * (CanvasBlobs) drift down through the WHOLE page on scroll. Hero → eight light
 * sections → light footer, all reading off the single connected lobes gradient.
 */
export default function LightAnimPage() {
  return (
    <main className="light-anim-demo section-lab ds ds-canvas">
      {/* one shared light gradient for the whole group — visible by default,
          self-animated (drift + shimmer), no flip, no dark layer */}
      <div className="ds-canvas__bg ds-canvas__bg--lobes" aria-hidden="true" />
      {/* big floating blobs flying across the whole page (GSAP scroll-driven) */}
      <CanvasBlobs />

      <StatementHero
        surface="light"
        version={2}
        eyebrow="Dev light · anim test"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="Light-only scroll bench for the canvas gradient + floating blobs. Scroll and watch the lobes drift behind every section."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "See how it works", href: "#" },
        ]}
      />

      <HubMap
        surface="light"
        eyebrow="Hub map / nav"
        title="One map into the deeper pages"
        titleAccent="deeper"
        sub="A navigational bento for hub pages: one feature route plus supporting tiles, each a real link that sends the reader deeper."
        items={HUBMAP_ITEMS}
      />

      <RiskControl
        surface="light"
        eyebrow="Risk → control"
        title="Every failure mode has a guardrail"
        titleAccent="guardrail"
        sub="For each way an evaluation could go wrong, the specific system control that keeps it bounded."
        pairs={RISK_PAIRS}
      />

      <FullStatement
        surface="light"
        eyebrow="The thesis"
        titleLead="AI does the reading; the"
        titleAccent="decision"
        titleTrail="stays human"
        sub="One clear sentence between dense sections — a deliberate pause before the next block of detail."
      />

      <Gallery
        surface="light"
        eyebrow="Horizontal gallery"
        title="Equal ideas in one scrollable lane"
        sub="A horizontal lane keeps a set of equal ideas from becoming a tall wall of cards."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      <Bento
        surface="light"
        eyebrow="Bento"
        title="One map into the deeper pages"
        sub="A compact tile field: one feature idea plus a set of supporting tiles."
        items={BENTO_ITEMS}
      />

      <StatBand
        surface="light"
        eyebrow="Trusted in production"
        title="The numbers teams ship on"
        stats={STATS}
        media={{
          ratio: "21/9",
          label: "Image · benchmark band · 21:9",
          hint: "A wide band visual under the figures",
          ariaLabel: "A wide band visual under the headline figures",
        }}
      />

      <PinnedSteps
        surface="light"
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

      <Faq
        surface="light"
        eyebrow="FAQ"
        title="Questions, answered"
        titleAccent="answered"
        items={FAQ_ITEMS}
      />

      {/* light closing band — sits on --bg-soft, carries its own aurora */}
      <CtaBand
        theme="light"
        eyebrow="Ready when you are"
        title="AI prepares the analysis. "
        titleAccent="You decide."
        sub="Evidence-first scoring, then a human signs off — see the full run on your own decks."
        primary={{ label: "Book a demo", href: "#" }}
        secondary={{ label: "See how it works", href: "#" }}
      />

      {/* Footer as a section — light theme */}
      <Footer variant="light" />

      <ScrollFX />
    </main>
  );
}
