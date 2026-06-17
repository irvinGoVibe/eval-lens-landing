import type { Metadata } from "next";
import { GalleryRealContent } from "./GalleryRealContent";
import { GallerySurfaceMaster, GallerySurfaceTabs } from "./GallerySurfaceTabs";
import { GalleryVersionTabs } from "./GalleryVersionTabs";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabCompareTable } from "@/components/sections/lab/LabCompareTable";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabFaq } from "@/components/sections/lab/LabFaq";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabHubMap } from "@/components/sections/lab/LabHubMap";
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
  title: "EvalLense — Section Gallery",
  description:
    "Live gallery of every EvalLense section component, each rendered and labeled by name for at-a-glance reference.",
};

const HEADER_NAV: SectionNav = {
  section: "Section Gallery",
  sectionHref: "/dev/gallery",
  links: [
    { label: "01-05", href: "#arch-01" },
    { label: "06-10", href: "#arch-06" },
    { label: "11-16", href: "#arch-11" },
    { label: "Section Lab", href: "/dev/section-lab" },
  ],
};

// ---------------------------------------------------------------------------
// Demo constants — copied from /dev/section-lab so this gallery is self-contained.
// Each Lab* section is mounted with the same working demo props used in the lab.
// ---------------------------------------------------------------------------

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

type HubLink = { tag: string; title: string; body: string; href: string; feature?: boolean };

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

// ---------------------------------------------------------------------------
// Gallery metadata — banner labels + TOC index.
// ---------------------------------------------------------------------------

type GalleryEntry = {
  anchor: string;
  archetype: string;
  name: string;
  component: string;
  status: string;
  versions: string;
  surfaces: string;
};

const GALLERY_INDEX: GalleryEntry[] = [
  { anchor: "arch-01", archetype: "01", name: "Statement hero", component: "LabStatementHero", status: "forged", versions: "v1–v4", surfaces: "light/ink" },
  { anchor: "arch-02", archetype: "02", name: "Full-bleed statement", component: "LabStatement", status: "draft", versions: "v1–v2", surfaces: "light/ink" },
  { anchor: "arch-03", archetype: "03", name: "Pinned multi-screen", component: "LabPinnedSteps", status: "forged", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-04", archetype: "04", name: "Editorial split", component: "LabEditorialSplit", status: "forged", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-05", archetype: "05", name: "Editorial split + scrub-ring", component: "LabSplitRing", status: "forged", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-06", archetype: "06", name: "Horizontal gallery", component: "LabGallery", status: "forged", versions: "v1,v3", surfaces: "light/ink" },
  { anchor: "arch-07", archetype: "07", name: "Bento overview", component: "LabBento", status: "forged", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-08", archetype: "08", name: "Bento link tiles (hub map)", component: "LabHubMap", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-09", archetype: "09", name: "Stat band / counters", component: "LabStatBand", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-10", archetype: "10", name: "Editorial numbered list", component: "LabNumbered", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-11", archetype: "11", name: "Risk → control grid", component: "LabRiskControl", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-12", archetype: "12", name: "Quiet CTA band", component: "LabQuietCta", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-13", archetype: "13", name: "Pricing tiers", component: "LabPricing", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-14", archetype: "14", name: "Comparison table", component: "LabCompareTable", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
  { anchor: "arch-16", archetype: "16", name: "FAQ list", component: "LabFaq", status: "draft", versions: "v1–v3", surfaces: "light/ink" },
];

function GalleryBanner({ entry }: { entry: GalleryEntry }) {
  return (
    <div className="wrap gallery-banner-wrap">
      <div className="gallery-banner" id={entry.anchor}>
        <div className="gallery-banner__lead">
          <span className="gallery-banner__num">{entry.archetype}</span>
          <span className="gallery-banner__name">{entry.name}</span>
        </div>
        <div className="gallery-banner__meta">
          <code className="gallery-banner__component">{entry.component}</code>
          <span className={`gallery-banner__status gallery-banner__status--${entry.status}`}>
            {entry.status}
          </span>
          <span className="gallery-banner__chip">{entry.versions}</span>
          <span className="gallery-banner__chip">{entry.surfaces}</span>
          {/* Surface tabs (Light | Dark) are injected here client-side by
              GallerySurfaceTabs for every section. */}
          <div className="gallery-banner__sslot" data-surface-slot />
          {/* Version tabs are injected here client-side by GalleryVersionTabs
              when the section that follows this banner has ≥2 saved versions. */}
          <div className="gallery-banner__vslot" data-version-slot />
        </div>
      </div>
    </div>
  );
}

const E = Object.fromEntries(GALLERY_INDEX.map((e) => [e.anchor, e])) as Record<string, GalleryEntry>;

export default function SectionGalleryPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} cta={{ label: "Section Lab", href: "/dev/section-lab" }} />

      <style>{`
        .gallery-intro { padding: 64px 0 16px; }
        .gallery-intro__title {
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          font-weight: 600;
          margin: 0 0 12px;
        }
        .gallery-intro__sub {
          max-width: 60ch;
          font-size: 16px;
          line-height: 1.55;
          opacity: 0.72;
          margin: 0;
        }
        .gallery-toc {
          position: sticky;
          top: 64px;
          z-index: 40;
          margin: 28px 0 8px;
          padding: 12px 14px;
          border-radius: 14px;
          background: color-mix(in srgb, Canvas 78%, transparent);
          backdrop-filter: saturate(140%) blur(14px);
          -webkit-backdrop-filter: saturate(140%) blur(14px);
          border: 1px solid color-mix(in srgb, CanvasText 12%, transparent);
        }
        .gallery-toc__label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.55;
          margin: 0 0 8px;
        }
        .gallery-toc__list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .gallery-toc__link {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 12px;
          line-height: 1;
          text-decoration: none;
          color: inherit;
          border: 1px solid color-mix(in srgb, CanvasText 14%, transparent);
          background: color-mix(in srgb, CanvasText 4%, transparent);
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .gallery-toc__link:hover {
          background: color-mix(in srgb, CanvasText 10%, transparent);
          border-color: color-mix(in srgb, CanvasText 26%, transparent);
        }
        .gallery-toc__num {
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          opacity: 0.6;
        }
        .gallery-banner-wrap { padding: 40px 0 8px; }
        .gallery-banner {
          scroll-margin-top: 132px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px 20px;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid color-mix(in srgb, CanvasText 12%, transparent);
          background: color-mix(in srgb, CanvasText 3%, transparent);
        }
        .gallery-banner__lead {
          display: flex;
          align-items: baseline;
          gap: 14px;
          min-width: 0;
        }
        .gallery-banner__num {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          opacity: 0.85;
        }
        .gallery-banner__name {
          font-size: clamp(17px, 2.4vw, 22px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .gallery-banner__meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }
        .gallery-banner__component {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          padding: 4px 9px;
          border-radius: 8px;
          background: color-mix(in srgb, CanvasText 8%, transparent);
          border: 1px solid color-mix(in srgb, CanvasText 12%, transparent);
        }
        .gallery-banner__status {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          padding: 4px 9px;
          border-radius: 999px;
        }
        .gallery-banner__status--forged {
          background: color-mix(in srgb, #16a34a 18%, transparent);
          color: color-mix(in srgb, #16a34a 92%, CanvasText);
          border: 1px solid color-mix(in srgb, #16a34a 40%, transparent);
        }
        .gallery-banner__status--draft {
          background: color-mix(in srgb, #d97706 16%, transparent);
          color: color-mix(in srgb, #d97706 92%, CanvasText);
          border: 1px solid color-mix(in srgb, #d97706 38%, transparent);
        }
        .gallery-banner__chip {
          font-size: 12px;
          padding: 4px 9px;
          border-radius: 999px;
          opacity: 0.8;
          border: 1px solid color-mix(in srgb, CanvasText 14%, transparent);
        }
        @media (max-width: 640px) {
          .gallery-banner { align-items: flex-start; }
        }
        /* Version tabs — injected client-side by GalleryVersionTabs. */
        .gallery-banner__vslot:empty { display: none; }
        .gallery-vtabs {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, CanvasText 16%, transparent);
          background: color-mix(in srgb, CanvasText 5%, transparent);
        }
        .gallery-vtabs__btn {
          appearance: none;
          cursor: pointer;
          font: inherit;
          font-size: 12px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          color: inherit;
          padding: 4px 9px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          opacity: 0.7;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .gallery-vtabs__btn:hover {
          opacity: 1;
          background: color-mix(in srgb, CanvasText 8%, transparent);
        }
        .gallery-vtabs__btn[aria-pressed="true"] {
          opacity: 1;
          font-weight: 600;
          background: color-mix(in srgb, CanvasText 14%, transparent);
        }
        .gallery-vtabs__btn:focus-visible {
          outline: 2px solid color-mix(in srgb, CanvasText 50%, transparent);
          outline-offset: 1px;
        }
        /* Surface tabs (Light | Dark) — injected client-side by
           GallerySurfaceTabs; same pill look as the version tabs. */
        .gallery-banner__sslot:empty { display: none; }
        .gallery-stabs {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, CanvasText 16%, transparent);
          background: color-mix(in srgb, CanvasText 5%, transparent);
        }
        .gallery-stabs__btn {
          appearance: none;
          cursor: pointer;
          font: inherit;
          font-size: 12px;
          line-height: 1;
          color: inherit;
          padding: 4px 10px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          opacity: 0.7;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .gallery-stabs__btn:hover {
          opacity: 1;
          background: color-mix(in srgb, CanvasText 8%, transparent);
        }
        .gallery-stabs__btn.is-active,
        .gallery-stabs__btn[aria-pressed="true"] {
          opacity: 1;
          font-weight: 600;
          background: color-mix(in srgb, CanvasText 14%, transparent);
        }
        .gallery-stabs__btn:focus-visible {
          outline: 2px solid color-mix(in srgb, CanvasText 50%, transparent);
          outline-offset: 1px;
        }
        /* Master surface toggle in the top TOC panel. */
        .gallery-smaster {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .gallery-smaster__label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.55;
        }
      `}</style>

      <main className="section-gallery section-lab">
        <div className="wrap">
          <header className="gallery-intro">
            <h1 className="gallery-intro__title">Section Gallery — все наши секции</h1>
            <p className="gallery-intro__sub">
              Каждая секция = один Lab*-компонент; v1 показана по умолчанию, полный
              инспектор версий — на{" "}
              <a href="/dev/section-lab" style={{ color: "inherit", textDecoration: "underline" }}>
                /dev/section-lab
              </a>
              .
            </p>
          </header>

          <nav className="gallery-toc" aria-label="Section index">
            <p className="gallery-toc__label">Jump to section</p>
            <ul className="gallery-toc__list">
              {GALLERY_INDEX.map((e) => (
                <li key={e.anchor}>
                  <a className="gallery-toc__link" href={`#${e.anchor}`}>
                    <span className="gallery-toc__num">{e.archetype}</span>
                    <span>{e.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <GallerySurfaceMaster />
          </nav>
        </div>

        {/* 01 · Statement hero */}
        <GalleryBanner entry={E["arch-01"]} />
        <LabStatementHero
          marker="01 · Statement hero"
          eyebrow="01 · Statement hero"
          titleLead="A working canvas for Apple-grade"
          titleAccent="page sections"
          sub="This page is a reusable test surface for internal pages: section archetypes, background patterns, media slots and ScrollFX behavior live in one place before we move them into product routes."
          ctas={[
            { label: "Start with process", href: "#arch-03" },
            { label: "Compare archetypes", href: "#arch-06", variant: "ghost" },
          ]}
          media={{
            ratio: "21/9",
            label: "Image · section-pattern collage · 21:9",
            hint: "Wide collage of inner-page sections, lens grid, media frames and scroll states, violet→cyan→aqua over Apple-neutral surface.",
            ariaLabel: "Wide hero visual slot for a section-pattern collage",
          }}
        />

        {/* 02 · Full-bleed statement */}
        <GalleryBanner entry={E["arch-02"]} />
        <LabStatement
          surface="ink"
          marker="02 · Full-bleed statement"
          ariaLabel="Full-bleed statement — content-axis reference"
          versions={STATEMENT_VERSIONS}
        />

        {/* 03 · Pinned multi-screen */}
        <GalleryBanner entry={E["arch-03"]} />
        <LabPinnedSteps
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

        {/* 04 · Editorial split */}
        <GalleryBanner entry={E["arch-04"]} />
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

        {/* 05 · Editorial split + scrub-ring */}
        <GalleryBanner entry={E["arch-05"]} />
        <LabSplitRing
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

        {/* 06 · Horizontal gallery */}
        <GalleryBanner entry={E["arch-06"]} />
        <LabGallery
          surface="light"
          marker="06 · Horizontal gallery"
          ariaLabel="Section archetypes — horizontal gallery"
          eyebrow="06 · Horizontal gallery"
          title="Compare section archetypes in one lane"
          sub="Horizontal lanes keep equal ideas from becoming a tall wall of cards. Use them for roles, report parts, segments and patterns."
          laneLabel="Section archetypes — horizontally scrollable"
          items={GALLERY_ITEMS}
        />

        {/* 07 · Bento overview */}
        <GalleryBanner entry={E["arch-07"]} />
        <LabBento
          surface="ink"
          marker="07 · Bento overview"
          ariaLabel="Bento overview — section archetype 07"
          eyebrow="07 · Bento overview"
          title="A compact map of reusable ingredients"
          sub="The bento pattern is for overview, not decoration: one large idea plus supporting tiles that explain how the page system holds together."
          items={BENTO_ITEMS}
        />

        {/* 08 · Bento link tiles (hub map) */}
        <GalleryBanner entry={E["arch-08"]} />
        <LabHubMap
          surface="light"
          marker="08 · Bento link tiles"
          ariaLabel="Bento link tiles — hub map navigation"
          eyebrow="08 · Bento link tiles"
          title="A hub map sends readers deeper"
          sub="Hub pages use bento tiles as navigation, not decoration. Each tile is a real link into a child page."
          items={HUB_LINK_CONTENT}
        />

        {/* 09 · Stat band / counters */}
        <GalleryBanner entry={E["arch-09"]} />
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

        {/* 10 · Editorial numbered list */}
        <GalleryBanner entry={E["arch-10"]} />
        <LabNumbered
          surface="light"
          marker="10 · Editorial numbered list"
          ariaLabel="Editorial numbered list — page principles"
          eyebrow="10 · Editorial numbered list"
          title="Principles read better as editorial lines"
          sub="Use this when the content is a compact manifesto, method or ordered set of principles."
          items={NUMBERED_ITEMS}
        />

        {/* 11 · Risk → control grid */}
        <GalleryBanner entry={E["arch-11"]} />
        <LabRiskControl
          surface="light"
          marker="11 · Risk → control grid"
          ariaLabel="Risk to control grid — failure modes and guardrails"
          eyebrow="11 · Risk → control grid"
          title="Pair the failure mode with the guardrail"
          sub="This format works for trust pages: each row names a risk and the specific system control that keeps it bounded."
          pairs={RISK_CONTROLS}
        />

        {/* 12 · Quiet CTA band */}
        <GalleryBanner entry={E["arch-12"]} />
        <LabQuietCta
          surface="ink"
          marker="12 · Quiet CTA band"
          ariaLabel="Quiet CTA band — closing call to action"
          eyebrow="12 · Quiet CTA band"
          title="End a page with one calm next step"
          sub="No extra cards here. Just the next action and enough context to make it feel deliberate."
          cta={{ label: "Book a Demo", href: "/#demo" }}
        />

        {/* 13 · Pricing tiers */}
        <GalleryBanner entry={E["arch-13"]} />
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
          ctaHref="#arch-13"
        />

        {/* 14 · Comparison table */}
        <GalleryBanner entry={E["arch-14"]} />
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

        {/* 16 · FAQ list */}
        <GalleryBanner entry={E["arch-16"]} />
        <LabFaq
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
      <GalleryRealContent />
      <GallerySurfaceTabs />
      <GalleryVersionTabs />
    </>
  );
}
