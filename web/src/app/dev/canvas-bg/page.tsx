import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { Footer } from "@/components/Footer";
import { CanvasBlobs } from "./CanvasBlobs";
import { CanvasToneFlip } from "./CanvasToneFlip";
import "./canvas-tone-flip.css";
import {
  StatementHero,
  HubMap,
  RiskControl,
  FullStatement,
  Gallery,
  PinnedSteps,
  Button,
} from "@/components/ds";

export const metadata: Metadata = { title: "Canvas BG — lobes gradient" };

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

const PINNED_STEPS = [
  { num: "01", label: "Intake", desc: "Drop in a batch of decks; each is parsed and queued for review." },
  { num: "02", label: "Read", desc: "The model reads every slide, pulling claims and the evidence behind them." },
  { num: "03", label: "Score", desc: "A fixed rubric turns findings into comparable, traceable signals." },
  { num: "04", label: "Rank", desc: "Scores roll up into one leaderboard you can defend line by line." },
  { num: "05", label: "Decide", desc: "A person signs off — the final call always stays human." },
];

/**
 * /dev/canvas-bg — TEST composition over the shared LIGHT canvas gradient
 * (`.ds-canvas__bg--lobes`). All sections sit inside one `.ds-canvas`; the
 * transparent (light-tone) ones let the single gradient run behind them.
 * Own-backdrop sections (Hero pattern, HubMap balls, ds-cinema video, footer)
 * are full-bleed accents that carry their own treatment — expected.
 */
export default function CanvasBgPage() {
  return (
    <main className="canvas-bg-demo section-lab ds ds-canvas">
      {/* one shared background for the whole group: light lobes base + its paired
          dark counterpart stacked on top (opacity 0 → the tone-flip seam crossfades
          it in, flipping the WHOLE through-background light→dark, then holds dark) */}
      <div className="ds-canvas__bg ds-canvas__bg--lobes" aria-hidden="true" />
      <div className="ds-canvas__bg ds-canvas__bg--lobes-dark" aria-hidden="true">
        <span className="ds-canvas__spark ds-canvas__spark--1" />
        <span className="ds-canvas__spark ds-canvas__spark--2" />
        <span className="ds-canvas__spark ds-canvas__spark--3" />
      </div>
      {/* big floating blobs flying across the page (GSAP scroll-driven) */}
      <CanvasBlobs />

      <StatementHero
        surface="light"
        version={2}
        eyebrow="Statement hero"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="Evidence-first scoring, then a person signs off — built to read on light and dark."
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

      {/* TONE-FLIP seam — flips the through-background light→dark; the dark
          gallery below hands its own heading up into the flip and redocks it */}
      <CanvasToneFlip items={GALLERY_ITEMS} />

      {/* cinematic transition — self-contained full-bleed video (own backdrop) */}
      <section
        className="band ink ds-cinema lab-cine"
        data-pin
        data-pin-steps="1"
        aria-label="AI prepares. You decide."
      >
        <div className="ds-cinema__stage" data-pin-stage>
          <video className="ds-cinema__vid" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/assets/methodology/cinema.mp4" type="video/mp4" />
          </video>
          <div className="ds-cinema__fill" aria-hidden="true" />
          <svg
            className="ds-cinema__knockout ds-cinema__knockout--d"
            viewBox="0 0 1280 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <mask id="ds-cinema-mask">
                <rect width="1280" height="900" fill="#fff" />
                <text x="640" y="420" textAnchor="middle" className="ds-cinema__masktext">
                  AI prepares. You decide.
                </text>
              </mask>
            </defs>
            <rect className="ds-cinema__scrimrect" width="1280" height="900" mask="url(#ds-cinema-mask)" />
          </svg>
          <svg
            className="ds-cinema__knockout ds-cinema__knockout--m"
            viewBox="0 0 440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <mask id="ds-cinema-mask-m">
                <rect width="440" height="900" fill="#fff" />
                <text x="220" y="404" textAnchor="middle" className="ds-cinema__masktext ds-cinema__masktext--m">
                  <tspan x="220">AI prepares.</tspan>
                  <tspan x="220" dy="84">You decide.</tspan>
                </text>
              </mask>
            </defs>
            <rect className="ds-cinema__scrimrect" width="440" height="900" mask="url(#ds-cinema-mask-m)" />
          </svg>
          <div className="ds-cinema__copy">
            <h2 className="ds-cinema__headline">AI prepares. You decide.</h2>
            <p className="sub ds-cinema__sub">
              Evidence-first scoring, then a human signs off — see the full run on your own decks.
            </p>
            <div className="sect-cta ds-cinema__cta">
              <Button href="#" variant="gradient">Book a demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer as a section — dark theme */}
      <Footer variant="dark" />

      <ScrollFX />
    </main>
  );
}
