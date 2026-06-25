import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { CtaBand } from "@/components/sections/CtaBand";
import { FooterFrame } from "@/components/ds/FooterFrame";
import {
  StatementHero,
  Bento,
  HubMap,
  FullStatement,
  Gallery,
  PinnedSteps,
  Numbered,
  EditorialSplit,
  QuietCta,
  Button,
} from "@/components/ds";

export const metadata: Metadata = { title: "DS Sections" };

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

const BENTO_ITEMS = [
  {
    tag: "Pattern",
    title: "Background pattern language",
    body: "Soft lens grids, hairline structure and ambient media areas give pages enough context to judge sections.",
    feature: true,
  },
  {
    tag: "Motion",
    title: "One scroll runtime",
    body: "Sections use data attributes and the shared ScrollFX loop.",
  },
  {
    tag: "Media",
    title: "Visible placeholders",
    body: "Every future image or video slot is labeled and ratio-locked.",
  },
  {
    tag: "QA",
    title: "Reusable checks",
    body: "Each section can be inspected at mobile, tablet and desktop widths.",
  },
];

const HUBMAP_ITEMS = [
  {
    tag: "Start here",
    title: "How evaluation works",
    body: "The full path from a batch of decks to one defensible leaderboard — read end to end.",
    href: "#",
    feature: true,
  },
  { tag: "Entry hub", title: "Collect the decks", body: "One link gathers every submission, parsed and queued for review.", href: "#" },
  { tag: "Reports", title: "Evidence-based reports", body: "Each score links back to the slide and source behind it.", href: "#" },
  { tag: "Review board", title: "Decide together", body: "A shared leaderboard the whole table reads the same way.", href: "#" },
];

const NUMBERED_ITEMS = [
  { num: "01", title: "Evidence before opinion", body: "Every signal links back to the slide and source it came from — no unbacked claims." },
  { num: "02", title: "One deterministic rubric", body: "The same findings and weights always produce the same score, so reviews stay comparable." },
  { num: "03", title: "A human makes the call", body: "The numeric layer is advisory; the final decision always stays with a person." },
];

/**
 * /dev/ds-sections — the reference page for the prefix-free design-system API.
 *
 * Composed entirely from the clean barrel `@/components/ds` (StatementHero ·
 * Bento · FullStatement · Gallery · PinnedSteps · Button) — NOT the raw `Lab*`
 * imports. This is the page to build new site pages from / point at.
 *
 * Container carries `section-lab ds`: `.section-lab` for the base `.lab-*` rules,
 * `.ds` for the design-system light language. `<ScrollFX/>` is REQUIRED, else the
 * `data-reveal` elements stay opacity:0. DevInspector still attaches its
 * Light/Soft/Dark + version toggles to every `.lab-*` section.
 */
export default function DsSectionsPage() {
  return (
    <main className="ds-sections section-lab ds">
      <StatementHero
        marker="01 · Statement hero"
        surface="soft"
        version={1}
        eyebrow="Statement hero"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="Evidence-first scoring, then a person signs off — built to read on light and dark."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "See how it works", href: "#" },
        ]}
        media={{
          ratio: "16/9",
          label: "Hero · lens",
          hint: "Lens-gradient violet→cyan→aqua over Apple-neutral, calm depth",
          ariaLabel: "Hero lens illustration",
        }}
      />

      <Bento
        id="bento"
        surface="ink"
        marker="07 · Bento overview"
        ariaLabel="Bento overview"
        eyebrow="Bento overview"
        title="A compact map of reusable ingredients"
        sub="The bento pattern is for overview, not decoration: one large idea plus supporting tiles that explain how the system holds together."
        items={BENTO_ITEMS}
      />

      <HubMap
        id="hubmap"
        surface="ink"
        marker="08 · Hub map / nav"
        ariaLabel="Hub map — navigational bento"
        eyebrow="Hub map / nav"
        title="One map into the deeper pages"
        titleAccent="deeper"
        sub="A navigational bento for hub pages: one feature route plus supporting tiles, each a real link that sends the reader deeper."
        items={HUBMAP_ITEMS}
      />

      <FullStatement
        marker="02 · Full-bleed statement"
        surface="ink"
        ariaLabel="Full-bleed statement"
        eyebrow="The thesis"
        titleLead="AI does the reading; the"
        titleAccent="decision"
        titleTrail="stays human"
        sub="One clear sentence between dense sections — a deliberate pause that says what the product stands for before the next block of detail."
      />

      <Gallery
        id="gallery"
        surface="light"
        marker="06 · Horizontal gallery"
        ariaLabel="Horizontal gallery"
        eyebrow="Horizontal gallery"
        title="Equal ideas in one scrollable lane"
        sub="A horizontal lane keeps a set of equal ideas from becoming a tall wall of cards — for stages, report parts, segments and use cases."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      <PinnedSteps
        id="pinned"
        surface="ink"
        marker="03 · Pinned multi-screen"
        ariaLabel="Pinned multi-screen — the five-step path"
        eyebrow="Pinned multi-screen"
        title={{ line1: "One fixed path,", line2: "five steps", line2Accent: "in sequence" }}
        sub="A tall pinned stage holds while the numbered steps light up one by one as you scroll — for any fixed, ordered process."
        steps={PINNED_STEPS}
        media={{
          ratio: "4/3",
          label: "Image · pinned flow · 4:3",
          hint: "A five-step track whose nodes light up in sequence on an ink surface",
          ariaLabel: "A track of five steps whose nodes light up in sequence",
        }}
        videoScrub={{
          src: "/assets/methodology/methodology-transition.mp4",
          frames: 0,
          ariaLabel: "Methodology transition — scrubbed by scroll through the stages",
        }}
        photos={[
          "/assets/_demo-pool/photo/deck-vault.png",
          "/assets/_demo-pool/photo/deck-scan.png",
          "/assets/_demo-pool/photo/scoring-matrix.png",
          "/assets/_demo-pool/photo/dark-unicorn-head-front.jpeg",
          "/assets/_demo-pool/photo/jury-decision.png",
        ]}
      />

      <Numbered
        id="numbered"
        surface="light"
        marker="10 · Editorial numbered list"
        ariaLabel="Editorial numbered list — operating principles"
        eyebrow="Operating principles"
        title="Three principles the editorial layer holds"
        sub="A vertical numbered list for a manifesto or set of principles — large numerals beside a heading and paragraph, not a card grid."
        items={NUMBERED_ITEMS}
      />

      <EditorialSplit
        id="editorial"
        surface="light"
        marker="04 · Editorial split"
        ariaLabel="Editorial split"
        eyebrow="Grounded, not opaque"
        titleLead="Every finding links back to a"
        titleAccent="slide"
        sub="The report is built to be checked — each score comes with what supports it and what lowers it."
        points={[
          { title: "What supports, what lowers", body: "Each dimension lists the concrete signals that raised or reduced its score." },
          { title: "Linked to the slide", body: "Every finding cites the exact slide — number, title, and note." },
          { title: "Built for live Q&A", body: "See where a deck is thin before the team is in the room." },
        ]}
        media={{
          ratio: "4/3",
          label: "Image · slide ↔ finding · 4:3",
          hint: "A slide quote beside the supports/lowers it grounds",
          ariaLabel: "A slide quote next to the finding it grounds",
        }}
      />

      <QuietCta
        id="quietcta"
        surface="ink"
        marker="12 · Quiet CTA band"
        ariaLabel="Quiet CTA"
        eyebrow="Get started"
        title="See a real report on your own deck"
        sub="Book a demo and walk through a full evaluation report — summary, reasoning, and the questions to ask live."
        cta={{ label: "Book a Demo", href: "#" }}
      />

      {/* cinematic transition — last section. Self-contained .ds-cinema: full-screen
          video → knockout heading descends & zooms ×7→1 (video crisp through the
          letters, no dimming) → lens fill restores letters to solid → copy.
          Theme is a single Light/Dark toggle via DevInspector (lab-cine hook):
          default = Dark (.ink), toggle removes .ink → Light (white scrim).
          100% --pin-driven by <ScrollFX/>; mobile/reduced-motion = static. */}
      <section
        className="band ink ds-cinema lab-cine"
        data-pin
        data-pin-steps="1"
        aria-label="AI prepares. You decide."
      >
        <div className="ds-cinema__stage" data-pin-stage>
          <video
            className="ds-cinema__vid"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/assets/methodology/cinema.mp4" type="video/mp4" />
          </video>
          <div className="ds-cinema__fill" aria-hidden="true" />
          {/* desktop knockout — landscape viewBox, single line */}
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
            <rect
              className="ds-cinema__scrimrect"
              width="1280"
              height="900"
              mask="url(#ds-cinema-mask)"
            />
          </svg>
          {/* mobile knockout — portrait viewBox, headline wrapped to two lines so
              the slice doesn't crop it; same --pin animation, portrait origin */}
          <svg
            className="ds-cinema__knockout ds-cinema__knockout--m"
            viewBox="0 0 440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <mask id="ds-cinema-mask-m">
                <rect width="440" height="900" fill="#fff" />
                <text
                  x="220"
                  y="404"
                  textAnchor="middle"
                  className="ds-cinema__masktext ds-cinema__masktext--m"
                >
                  <tspan x="220">AI prepares.</tspan>
                  <tspan x="220" dy="84">You decide.</tspan>
                </text>
              </mask>
            </defs>
            <rect
              className="ds-cinema__scrimrect"
              width="440"
              height="900"
              mask="url(#ds-cinema-mask-m)"
            />
          </svg>
          <div className="ds-cinema__copy">
            <h2 className="ds-cinema__headline">AI prepares. You decide.</h2>
            <p className="sub ds-cinema__sub">
              Evidence-first scoring, then a human signs off — see the full run on your
              own decks.
            </p>
            <div className="sect-cta ds-cinema__cta">
              <Button href="#" variant="gradient">Book a demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band — looping background video (production component) */}
      <CtaBand
        theme="dark"
        videoSrc="/assets/cta/cube-1.mp4"
        auroraVariant="violet"
        eyebrow="Call to action"
        title="See your next cohort"
        titleAccent="ranked in a day"
        sub="Batch-review every pitch deck, surface the strongest startups, and hand each team an evidence-based report — with the final call always yours."
        primary={{ label: "Book a demo", href: "#" }}
        secondary={{ label: "Try live demo", href: "#" }}
      />

      {/* Footer as a section — Light/Dark (black/white) toggle */}
      <FooterFrame />

      <ScrollFX />
    </main>
  );
}
