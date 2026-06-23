import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabCompareTable } from "@/components/sections/lab/LabCompareTable";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabFaq } from "@/components/sections/lab/LabFaq";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabHubMap } from "@/components/sections/lab/LabHubMap";
import { LabMarkers } from "@/components/sections/lab/LabMarkers";
import { LabNumbered } from "@/components/sections/lab/LabNumbered";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabPricing } from "@/components/sections/lab/LabPricing";
import { LabQuietCta } from "@/components/sections/lab/LabQuietCta";
import { LabRiskControl } from "@/components/sections/lab/LabRiskControl";
import { LabSplitRing } from "@/components/sections/lab/LabSplitRing";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabStatement } from "@/components/sections/lab/LabStatement";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import type { LabContentSet } from "@/components/sections/lab/_kit";
import type { SectionNav } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "EvalLense — Section Lab",
  description:
    "Internal design lab for composing EvalLense inner-page sections with the shared style guide and scroll effects.",
};

const HEADER_NAV: SectionNav = {
  section: "Section Lab",
  sectionHref: "/dev/section-lab",
  links: [
    { label: "01-05", href: "#hero" },
    { label: "06-10", href: "#gallery" },
    { label: "11-15", href: "#risk-control" },
    { label: "16-20", href: "#faq" },
  ],
};

const PROCESS_STEPS = [
  {
    num: "01",
    label: "Frame",
    desc: "A page starts with one job: what the visitor must understand before the next click.",
  },
  {
    num: "02",
    label: "Sequence",
    desc: "The page alternates scale: statement, split, process, gallery, evidence, action.",
  },
  {
    num: "03",
    label: "Visualize",
    desc: "Each meaning-heavy section gets a real media slot, diagram, ring, lane, or bento.",
  },
  {
    num: "04",
    label: "Validate",
    desc: "Scroll-FX, responsive layout, reduced motion and horizontal overflow are checked before reuse.",
  },
];

const GALLERY_ITEMS = [
  {
    tag: "Statement",
    title: "Full-screen thesis",
    body: "A dark or light pause between dense sections. One idea, no grid.",
  },
  {
    tag: "Split",
    title: "Editorial pair",
    body: "Text and visual evidence side by side, alternating direction across the page.",
  },
  {
    tag: "Pinned",
    title: "Step narrative",
    body: "A multi-screen track for process, pipeline, timeline, or layered explanation.",
  },
  {
    tag: "Gallery",
    title: "Equal set",
    body: "A horizontal lane for roles, use cases, report parts, or audience segments.",
  },
  {
    tag: "Bento",
    title: "Overview map",
    body: "A varied tile field with one feature item and supporting proof points.",
  },
];

const BENTO_ITEMS = [
  {
    tag: "Pattern",
    title: "Background pattern language",
    body: "Soft lens grids, hairline structure and ambient media areas give dev pages enough context to judge sections.",
    feature: true,
    icon: { src: "/assets/icons/unicorn.webp", alt: "", corner: "br" as const },
    media: {
      label: "Image · pattern system · 16:9",
      hint: "Layered lens grid, section masks and media frames on a dark surface.",
      ariaLabel: "Background pattern system visual slot",
    },
  },
  {
    tag: "Motion",
    title: "One scroll runtime",
    body: "Sections use data attributes and the shared ScrollFX loop.",
    icon: { src: "/assets/icons/unicorn.webp", alt: "", corner: "br" as const },
  },
  {
    tag: "Media",
    title: "Visible placeholders",
    body: "Every future image or video slot is labeled and ratio-locked.",
    icon: { src: "/assets/icons/unicorn.webp", alt: "", corner: "br" as const },
  },
  {
    tag: "QA",
    title: "Reusable checks",
    body: "Each section can be inspected at mobile, tablet and desktop widths.",
  },
];

type HubLink = { tag: string; title: string; body: string; href: string; feature?: boolean };

/**
 * Reference block for the Content axis (08 · Bento link tiles). `placeholder`
 * keeps the neutral lab copy that explains the archetype; `real` shows real
 * EvalLense hub destinations — existing routes and navigation labels, product
 * descriptions grounded in the human-in-the-loop promise, no invented claims.
 */
const HUB_LINK_CONTENT: LabContentSet<HubLink[]> = {
  placeholder: [
    {
      tag: "Product",
      title: "Overview",
      body: "A hub tile can point into a child route while still reading as part of the page narrative.",
      href: "/product/overview",
      feature: true,
    },
    {
      tag: "Product",
      title: "Entry Hub",
      body: "Focused route for intake, upload links and batch setup.",
      href: "/product/entry-hub",
    },
    {
      tag: "Trust",
      title: "Methodology",
      body: "Focused route for scoring principles and review process.",
      href: "/trust/methodology",
    },
    {
      tag: "Company",
      title: "Contact",
      body: "Focused route for demo, sales, press and security channels.",
      href: "/company/contact",
    },
  ],
  real: [
    {
      tag: "Product",
      title: "Overview",
      body: "How EvalLense scores a pitch deck and prepares the evidence — and where your team makes the final call.",
      href: "/product/overview",
      feature: true,
    },
    {
      tag: "Product",
      title: "Entry Hub",
      body: "Upload pitch decks and set up batch evaluation runs.",
      href: "/product/entry-hub",
    },
    {
      tag: "Trust",
      title: "Methodology",
      body: "The scoring principles and the human review process behind every report.",
      href: "/trust/methodology",
    },
    {
      tag: "Company",
      title: "Contact",
      body: "Book a demo, or reach sales, security and press.",
      href: "/company/contact",
    },
  ],
};

const NUMBERED_ITEMS = [
  {
    num: "01",
    title: "One job per section",
    body: "Each band explains one idea and lets the next band change scale or surface.",
  },
  {
    num: "02",
    title: "One visual anchor",
    body: "If the section carries meaning, it earns a diagram, media slot, lane, ring, table or bento.",
  },
  {
    num: "03",
    title: "One shared motion system",
    body: "Reveal, scrub and pin behavior comes from ScrollFX rather than local section scripts.",
  },
];

const STAT_ITEMS = [
  { value: "375", label: "mobile width", src: "QA · iPhone SE" },
  { value: "768", label: "tablet width", src: "QA · iPad portrait" },
  { value: "1280", label: "desktop width", src: "QA · laptop" },
];

const RISK_CONTROLS = [
  {
    risk: "Flat repetition",
    control: "Alternate scale: statement, split, pinned, gallery, table.",
  },
  {
    risk: "Invisible asset gaps",
    control: "Use visible `.media-ph` placeholders with target ratios.",
  },
  {
    risk: "Scroll regressions",
    control: "Use shared data attributes and reduced-motion fallbacks.",
  },
  {
    risk: "Mobile overflow",
    control: "Constrain grid children, labels and media slots with min-width rules.",
  },
];

const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    body: "Explore section patterns",
    bullets: ["Statement hero", "Editorial split", "FAQ + sitemap"],
  },
  {
    name: "Standard",
    price: "$49",
    body: "Reusable page sections",
    bullets: ["Everything in Free", "Pinned multi-screen", "Comparison tables"],
    recommended: true,
  },
  {
    name: "Professional",
    price: "$149",
    body: "Custom routes and variants",
    bullets: ["Everything in Standard", "Generated media slots", "Custom variants"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    body: "Full page system",
    bullets: ["Everything in Pro", "Bespoke archetypes", "Hands-on rollout"],
  },
];

const TABLE_ROWS = [
  ["Statement hero", "Yes", "Yes", "Yes", "Yes"],
  ["Pinned multi-screen", "No", "Yes", "Yes", "Yes"],
  ["Comparison tables", "No", "Yes", "Yes", "Yes"],
  ["Generated media slots", "No", "No", "Yes", "Yes"],
];

const FAQ_ITEMS = [
  {
    q: "Is this page production-facing?",
    a: "No. It is a dev route for composing, inspecting and moving finished sections into real pages.",
  },
  {
    q: "Can a section use real media later?",
    a: "Yes. Every placeholder is ratio-locked so a generated or filmed asset can drop in without layout shift.",
  },
  {
    q: "Why keep tables and legal prose here?",
    a: "They are section types in the system too, and they need the same spacing, typography and responsive checks.",
  },
];

const TABLE_COLUMNS = ["Section type", "Free", "Standard", "Pro", "Enterprise"];

/**
 * Reference block for the Content axis (02 · Full-bleed statement). The two saved
 * versions intentionally carry different statements (this is the demo of the
 * axis), each with a neutral `placeholder` and a `real` EvalLense payload.
 */
const STATEMENT_VERSIONS = [
  {
    placeholder: {
      eyebrow: "02 · Full-bleed statement",
      text: "Internal pages should feel sequenced, not stacked: a visitor moves through scale changes, visual evidence and quiet decisions.",
    },
    real: {
      eyebrow: "Human-controlled evaluation",
      text: "EvalLense scores every pitch deck and prepares the evidence — the final decision always stays with your team.",
    },
  },
  {
    placeholder: {
      eyebrow: "02 · Full-bleed statement",
      text: "A page is a sequence of decisions — each section earns the next scroll, or it should not be on the page.",
    },
    real: {
      eyebrow: "Consistent by design",
      text: "Every deck gets the same structured review, so your shortlist reflects the evidence — not the order the decks arrived in.",
    },
  },
];

export default function SectionLabPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} cta={{ label: "App", href: "/#demo" }} />
      <main className="section-lab">
        <LabStatementHero
          id="hero"
          marker="01 · Statement hero"
          eyebrow="01 · Statement hero"
          titleLead="A working canvas for Apple-grade"
          titleAccent="page sections"
          sub="This page is a reusable test surface for internal pages: section archetypes, background patterns, media slots and ScrollFX behavior live in one place before we move them into product routes."
          ctas={[
            { label: "Start with process", href: "#process" },
            { label: "Compare archetypes", href: "#gallery", variant: "ghost" },
          ]}
          media={{
            ratio: "21/9",
            label: "Image · section-pattern collage · 21:9",
            hint: "Wide collage of inner-page sections, lens grid, media frames and scroll states, violet→cyan→aqua over Apple-neutral surface.",
            ariaLabel: "Wide hero visual slot for a section-pattern collage",
          }}
        />

        <LabStatement
          surface="ink"
          marker="02 · Full-bleed statement"
          ariaLabel="Full-bleed statement — content-axis reference"
          versions={STATEMENT_VERSIONS}
        />

        <LabPinnedSteps
          id="process"
          marker="03 · Pinned multi-screen"
          ariaLabel="Section design process"
          eyebrow="03 · Pinned multi-screen"
          title={{
            line1: "A section is designed",
            line2: "as a",
            line2Accent: "moment",
          }}
          sub="Use this archetype when the user needs to follow a sequence. Each step activates through the shared pin engine."
          steps={PROCESS_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · pinned scene · 4:3",
            hint: "A lens-lit product scene that advances with the steps — pitch-deck flow, pipeline stages or timeline.",
            ariaLabel: "Pinned scene visual slot",
          }}
          videoScrub={{
            src: "/assets/section2-scroll-2.mp4",
            frames: 120,
            poster: "/assets/section2-scroll-2-poster.jpg",
            ariaLabel: "Scroll-scrubbed pitch-deck flow sequence",
          }}
        />

        <LabEditorialSplit
          surface="light"
          marker="04 · Editorial split"
          ariaLabel="Editorial split — copy plus visual proof"
          eyebrow="04 · Editorial split"
          titleLead="The basic content section: copy plus"
          titleAccent="visual proof"
          sub="This is the most common inner-page unit. It keeps text compact, gives the idea a visual slot, and alternates direction with the next split section."
          media={{
            ratio: "4/3",
            label: "Image · editorial proof · 4:3",
            hint: "A calm product panel with one lens accent and visible evidence rows.",
            ariaLabel: "Editorial split visual placeholder",
          }}
        />

        <LabSplitRing
          id="split-ring"
          surface="ink"
          marker="05 · Editorial split + scrub-ring"
          ariaLabel="Editorial split with a scroll-driven confidence ring"
          eyebrow="05 · Editorial split + scrub-ring"
          titleLead="Show a"
          titleAccent="calculation"
          titleTrail=", not another paragraph"
          sub="For scoring, confidence, completeness, or progress, pair editorial copy with a visual that responds to scroll."
          ring={{
            label: "Confidence",
            value: 92,
            caption: "Scroll-driven demo — arc and readout fill toward the target",
          }}
          breakdown={[
            { label: "Team", value: 94 },
            { label: "Market", value: 88 },
            { label: "Traction", value: 90 },
            { label: "Evidence", value: 96 },
          ]}
          breakdownCaption="Demo · weighted inputs roll up to confidence"
          media={{
            ratio: "16/10",
            label: "Image · evidence panel · 16:10",
            hint: "A report surface with highlighted evidence rows and one lens-lit confidence indicator.",
            ariaLabel: "Evidence panel visual slot",
          }}
        />

        <LabGallery
          id="gallery"
          surface="light"
          marker="06 · Horizontal gallery"
          ariaLabel="Section archetypes — horizontal gallery"
          eyebrow="06 · Horizontal gallery"
          title="Compare section archetypes in one lane"
          sub="Horizontal lanes keep equal ideas from becoming a tall wall of cards. Use them for roles, report parts, segments and patterns."
          laneLabel="Section archetypes — horizontally scrollable"
          items={GALLERY_ITEMS}
        />

        <LabBento
          id="bento"
          surface="ink"
          marker="07 · Bento overview"
          ariaLabel="Bento overview — section archetype 07"
          eyebrow="07 · Bento overview"
          title="A compact map of reusable ingredients"
          sub="The bento pattern is for overview, not decoration: one large idea plus supporting tiles that explain how the page system holds together."
          items={BENTO_ITEMS}
        />

        <LabHubMap
          surface="light"
          marker="08 · Bento link tiles"
          ariaLabel="Bento link tiles — hub map navigation"
          eyebrow="08 · Bento link tiles"
          title="A hub map sends readers deeper"
          sub="Hub pages use bento tiles as navigation, not decoration. Each tile is a real link into a child page."
          items={HUB_LINK_CONTENT}
        />

        <LabStatBand
          surface="ink"
          marker="09 · Stat band / counters"
          ariaLabel="Stat band — QA viewport benchmarks"
          eyebrow="09 · Stat band / counters"
          title="Every candidate section gets checked"
          stats={STAT_ITEMS}
          media={{
            ratio: "21/9",
            label: "Image · benchmark band · 21:9",
            hint: "Wide stat band — repeated runs as stable bars on a dark surface.",
            ariaLabel: "Benchmark band visual slot",
          }}
        />

        <LabNumbered
          surface="light"
          marker="10 · Editorial numbered list"
          ariaLabel="Editorial numbered list — page principles"
          eyebrow="10 · Editorial numbered list"
          title="Principles read better as editorial lines"
          sub="Use this when the content is a compact manifesto, method or ordered set of principles."
          items={NUMBERED_ITEMS}
        />

        <LabRiskControl
          id="risk-control"
          surface="light"
          marker="11 · Risk → control grid"
          ariaLabel="Risk to control grid — failure modes and guardrails"
          eyebrow="11 · Risk → control grid"
          title="Pair the failure mode with the guardrail"
          sub="This format works for trust pages: each row names a risk and the specific system control that keeps it bounded."
          pairs={RISK_CONTROLS}
        />

        <LabQuietCta
          surface="ink"
          marker="12 · Quiet CTA band"
          ariaLabel="Quiet CTA band — closing call to action"
          eyebrow="12 · Quiet CTA band"
          title="End a page with one calm next step"
          sub="No extra cards here. Just the next action and enough context to make it feel deliberate."
          cta={{ label: "Book a Demo", href: "/#demo" }}
        />

        <LabPricing
          surface="light"
          marker="13 · Pricing tiers"
          ariaLabel="Pricing tiers — plan cards"
          eyebrow="13 · Pricing tiers"
          title="Pricing cards need clear hierarchy"
          sub="One recommended card can carry the lens surface. The rest stay quiet and comparable."
          tiers={PRICING_TIERS}
          note="Smaller one-off and education plans are available on request."
          ctaLabel="Select"
          ctaHref="#pricing"
        />

        <LabCompareTable
          surface="light"
          marker="14 · Comparison table"
          ariaLabel="Comparison table — features by plan"
          eyebrow="14 · Comparison table"
          title="Dense comparison stays tabular"
          sub="Feature matrices should scroll inside their own container on narrow screens."
          columns={TABLE_COLUMNS}
          rows={TABLE_ROWS}
          recommendedIndex={2}
          recommendedNote="recommended"
        />

        <section className="band ink lab-versus" data-marker="15 · Versus table">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                15 · Versus table
              </span>
              <h2 className="title">Positioning comparisons need contrast</h2>
              <p className="sub">
                Versus sections work best on a dark band with short, decisive
                rows instead of a full feature matrix.
              </p>
            </div>
            <div className="lab-versus__grid" data-reveal="up">
              <div>
                <span className="mini-tag">Flat page</span>
                <p>Same card grid, same spacing, same density.</p>
              </div>
              <div>
                <span className="mini-tag">EvalLense pattern</span>
                <p>Statement, pinned story, visual proof, gallery and decision.</p>
              </div>
              <div>
                <span className="mini-tag">Asset gap</span>
                <p>Empty gray rectangles with no production brief.</p>
              </div>
              <div>
                <span className="mini-tag">EvalLense pattern</span>
                <p>Visible media placeholders with label, ratio and generation hint.</p>
              </div>
            </div>
          </div>
        </section>

        <LabFaq
          id="faq"
          surface="light"
          marker="16 · FAQ list"
          ariaLabel="FAQ list"
          eyebrow="16 · FAQ list"
          title="Questions stay calm and scannable"
          items={FAQ_ITEMS}
        />

      </main>
      <Footer />
      <ScrollFX />
      <LabMarkers />
    </>
  );
}
