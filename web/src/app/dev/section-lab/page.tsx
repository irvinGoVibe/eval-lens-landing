import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { LabMarkers } from "@/components/sections/lab/LabMarkers";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import { Button } from "@/components/ui/Button";
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

const HUB_LINKS = [
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
];

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

const RISK_CONTROLS = [
  ["Flat repetition", "Alternate scale: statement, split, pinned, gallery, table."],
  ["Invisible asset gaps", "Use visible `.media-ph` placeholders with target ratios."],
  ["Scroll regressions", "Use shared data attributes and reduced-motion fallbacks."],
  ["Mobile overflow", "Constrain grid children, labels and media slots with min-width rules."],
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
  [
    "Is this page production-facing?",
    "No. It is a dev route for composing, inspecting and moving finished sections into real pages.",
  ],
  [
    "Can a section use real media later?",
    "Yes. Every placeholder is ratio-locked so a generated or filmed asset can drop in without layout shift.",
  ],
  [
    "Why keep tables and legal prose here?",
    "They are section types in the system too, and they need the same spacing, typography and responsive checks.",
  ],
];

const CONTACT_CHANNELS = [
  ["Demo", "Book a walkthrough for a page or workflow."],
  ["Sales", "Discuss pricing, volume and rollout."],
  ["Careers", "Help build a better lens for human judgment."],
  ["Security", "Send security and privacy questions."],
  ["Press", "Request product notes and media material."],
];

const NEWS_ITEMS = [
  ["Design system", "Section catalog moved into a reusable dev route."],
  ["Product pages", "Internal pages now share ScrollFX patterns."],
  ["Media slots", "Visible placeholders mark the exact asset brief."],
];

const SITEMAP_GROUPS = [
  ["Product", ["Overview", "Entry Hub", "Evidence Reports", "Review Board"]],
  ["Trust", ["Methodology", "Consistency", "Prompt Safety", "Security"]],
  ["Company", ["About", "Newsroom", "Contact", "Pricing"]],
];

/** Demo "not built yet" markers — drive the `soon` badge in the tree. */
const SITEMAP_SOON = new Set(["Prompt Safety", "Newsroom"]);

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

        <section className="band ink lab-statement" data-marker="02 · Full-bleed statement">
          <div className="wrap lab-statement__inner" data-version="1" data-reveal="up">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              02 · Full-bleed statement
            </span>
            <p className="lab-statement__text">
              Internal pages should feel sequenced, not stacked: a visitor moves
              through scale changes, visual evidence and quiet decisions.
            </p>
          </div>
          <div className="wrap lab-statement__inner" data-version="2" data-reveal="up" hidden>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              02 · Full-bleed statement
            </span>
            <p className="lab-statement__text">
              A page is a sequence of decisions — each section earns the next
              scroll, or it should not be on the page.
            </p>
          </div>
        </section>

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
          videoScrub={{
            src: "/assets/section2-scroll-2.mp4",
            frames: 120,
            poster: "/assets/section2-scroll-2-poster.jpg",
            ariaLabel: "Scroll-scrubbed pitch-deck flow sequence",
          }}
        />

        <section className="band soft lab-split" data-marker="04 · Editorial split">
          <div className="wrap lab-split__grid">
            <div className="lab-split__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                04 · Editorial split
              </span>
              <h2 className="title">The basic content section: copy plus visual proof</h2>
              <p className="sub">
                This is the most common inner-page unit. It keeps text compact,
                gives the idea a visual slot, and alternates direction with the
                next split section.
              </p>
            </div>
            <figure
              className="media-ph lab-split__media"
              style={{ ["--ratio" as string]: "4/3" }}
              data-reveal="right"
              role="img"
              aria-label="Editorial split visual placeholder"
            >
              <span className="media-ph__label">
                Image · editorial proof · 4:3
              </span>
              <span className="media-ph__hint">
                A calm product panel with one lens accent and visible evidence
                rows.
              </span>
            </figure>
          </div>
        </section>

        <section className="band soft lab-scrub" data-marker="05 · Editorial split + scrub-ring">
          <div className="wrap lab-scrub__split">
            <div className="lab-scrub__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                05 · Editorial split + scrub-ring
              </span>
              <h2 className="title">Show a calculation, not another paragraph</h2>
              <p className="sub">
                For scoring, confidence, completeness, or progress, pair
                editorial copy with a visual that responds to scroll.
              </p>
            </div>
            <div className="lab-scrub__visual" data-reveal="right">
              <div
                className="lab-ring"
                data-scrub
                role="img"
                aria-label="Scroll-filled confidence ring"
              >
                <span className="lab-ring__label">Confidence</span>
              </div>
              <figure
                className="media-ph lab-scrub__media"
                style={{ ["--ratio" as string]: "16/10" }}
                role="img"
                aria-label="Evidence panel visual slot"
              >
                <span className="media-ph__label">
                  Image · evidence panel · 16:10
                </span>
                <span className="media-ph__hint">
                  A report surface with highlighted evidence rows and one
                  lens-lit confidence indicator.
                </span>
              </figure>
            </div>
          </div>
        </section>

        <section id="gallery" className="band lab-gallery" data-marker="06 · Horizontal gallery">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                06 · Horizontal gallery
              </span>
              <h2 className="title">Compare section archetypes in one lane</h2>
              <p className="sub">
                Horizontal lanes keep equal ideas from becoming a tall wall of
                cards. Use them for roles, report parts, segments and patterns.
              </p>
            </div>
          </div>
          <ol
            className="lab-gallery__lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Section archetypes — horizontally scrollable"
          >
            {GALLERY_ITEMS.map((item) => (
              <li key={item.tag} className="lab-gallery__card">
                <span className="lab-signal" aria-hidden="true"></span>
                <span className="mini-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="bento" className="band ink lab-bento" data-marker="07 · Bento overview">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                07 · Bento overview
              </span>
              <h2 className="title">A compact map of reusable ingredients</h2>
              <p className="sub">
                The bento pattern is for overview, not decoration: one large
                idea plus supporting tiles that explain how the page system
                holds together.
              </p>
            </div>
            <ul className="lab-bento__grid" data-reveal="up">
              {BENTO_ITEMS.map((item) => (
                <li
                  key={item.tag}
                  className={
                    item.feature
                      ? "lab-bento__tile lab-bento__tile--feature"
                      : "lab-bento__tile"
                  }
                >
                  <span className="mini-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.feature ? (
                    <figure
                      className="media-ph lab-bento__media"
                      style={{ ["--ratio" as string]: "16/9" }}
                      role="img"
                      aria-label="Background pattern system visual slot"
                    >
                      <span className="media-ph__label">
                        Image · pattern system · 16:9
                      </span>
                      <span className="media-ph__hint">
                        Layered lens grid, section masks and media frames on a
                        dark surface.
                      </span>
                    </figure>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band soft lab-hubmap" data-marker="08 · Bento link tiles">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                08 · Bento link tiles
              </span>
              <h2 className="title">A hub map sends readers deeper</h2>
              <p className="sub">
                Hub pages use bento tiles as navigation, not decoration. Each
                tile is a real link into a child page.
              </p>
            </div>
            <div className="lab-link-grid" data-reveal="up">
              {HUB_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    item.feature
                      ? "lab-link-card lab-link-card--feature"
                      : "lab-link-card"
                  }
                >
                  <span className="mini-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="lab-link-card__more">Open route →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="band ink lab-stats" data-marker="09 · Stat band / counters">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                09 · Stat band / counters
              </span>
              <h2 className="title">Every candidate section gets checked</h2>
            </div>
            <ul className="lab-stats__grid" data-reveal="up">
              <li>
                <strong>375</strong>
                <span>mobile width</span>
                <span className="lab-stats__src">QA · iPhone SE</span>
              </li>
              <li>
                <strong>768</strong>
                <span>tablet width</span>
                <span className="lab-stats__src">QA · iPad portrait</span>
              </li>
              <li>
                <strong>1280</strong>
                <span>desktop width</span>
                <span className="lab-stats__src">QA · laptop</span>
              </li>
            </ul>
            <figure
              className="media-ph lab-stats__band"
              style={{ ["--ratio" as string]: "21/9" }}
              data-reveal="up"
              role="img"
              aria-label="Benchmark band visual slot"
            >
              <span className="media-ph__label">Image · benchmark band · 21:9</span>
              <span className="media-ph__hint">
                Wide stat band — repeated runs as stable bars on a dark surface.
              </span>
            </figure>
          </div>
        </section>

        <section className="band soft lab-numbered" data-marker="10 · Editorial numbered list">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                10 · Editorial numbered list
              </span>
              <h2 className="title">Principles read better as editorial lines</h2>
              <p className="sub">
                Use this when the content is a compact manifesto, method or
                ordered set of principles.
              </p>
            </div>
            <ol className="lab-numbered__list">
              {NUMBERED_ITEMS.map((item, index) => (
                <li
                  key={item.num}
                  data-reveal="up"
                  style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
                >
                  <span>{item.num}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="risk-control" className="band soft lab-risk" data-marker="11 · Risk → control grid">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                11 · Risk → control grid
              </span>
              <h2 className="title">Pair the failure mode with the guardrail</h2>
              <p className="sub">
                This format works for trust pages: each row names a risk and
                the specific system control that keeps it bounded.
              </p>
            </div>
            <div className="lab-risk__grid" data-reveal="up">
              {RISK_CONTROLS.map(([risk, control]) => (
                <div key={risk} className="lab-risk__row">
                  <div>
                    <span className="mini-tag">Risk</span>
                    <strong>{risk}</strong>
                  </div>
                  <div>
                    <span className="mini-tag">Control</span>
                    <p>{control}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band ink lab-quiet-cta" data-marker="12 · Quiet CTA band">
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              12 · Quiet CTA band
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              End a page with one calm next step
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              No extra cards here. Just the next action and enough context to
              make it feel deliberate.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
          </div>
        </section>

        <section className="band soft lab-pricing" data-marker="13 · Pricing tiers">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                13 · Pricing tiers
              </span>
              <h2 className="title">Pricing cards need clear hierarchy</h2>
              <p className="sub">
                One recommended card can carry the lens surface. The rest stay
                quiet and comparable.
              </p>
            </div>
            <ul className="lab-pricing__grid" data-reveal="up">
              {PRICING_TIERS.map((tier) => (
                <li
                  key={tier.name}
                  className={
                    tier.recommended
                      ? "lab-pricing__card lab-pricing__card--recommended"
                      : "lab-pricing__card"
                  }
                >
                  {tier.recommended ? <span className="chip">Recommended</span> : null}
                  <h3>{tier.name}</h3>
                  <strong>{tier.price}</strong>
                  <p>{tier.body}</p>
                  <ul className="lab-pricing__bullets">
                    {tier.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Button href="#pricing" variant={tier.recommended ? "primary" : "ghost"}>
                    Select
                  </Button>
                </li>
              ))}
            </ul>
            <p className="lab-pricing__note" data-reveal="up">
              Smaller one-off and education plans are available on request.
            </p>
          </div>
        </section>

        <section className="band soft lab-table" data-marker="14 · Comparison table">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                14 · Comparison table
              </span>
              <h2 className="title">Dense comparison stays tabular</h2>
              <p className="sub">
                Feature matrices should scroll inside their own container on
                narrow screens.
              </p>
            </div>
            <div className="lab-table__scroll" data-reveal="up" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th>Section type</th>
                    <th>Free</th>
                    <th className="lab-table__reco">
                      Standard
                      <span className="lab-table__note">recommended</span>
                    </th>
                    <th>Pro</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) =>
                        index === 0 ? (
                          <th key={`${row[0]}-${index}`}>{cell}</th>
                        ) : (
                          <td
                            key={`${row[0]}-${index}`}
                            className={index === 2 ? "lab-table__reco" : undefined}
                          >
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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

        <section id="faq" className="band soft lab-faq" data-marker="16 · FAQ list">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                16 · FAQ list
              </span>
              <h2 className="title">Questions stay calm and scannable</h2>
            </div>
            <dl className="lab-faq__grid" data-reveal="up">
              {FAQ_ITEMS.map(([q, a]) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="band soft lab-contact" data-marker="17 · Contact channels grid">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                17 · Contact channels grid
              </span>
              <h2 className="title">Contact cards are operational tiles</h2>
            </div>
            <ul className="lab-contact__grid" data-reveal="up">
              {CONTACT_CHANNELS.map(([title, body], index) => (
                <li
                  key={title}
                  className={index === 0 ? "lab-contact__card lab-contact__card--feature" : "lab-contact__card"}
                >
                  <span className="mini-tag">{title}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a href="/company/contact">contact@evallense.com</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band soft lab-news" data-marker="18 · News / article grid">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                18 · News / article grid
              </span>
              <h2 className="title">Article grids pull newsroom context in</h2>
            </div>
            {/* Stand-in for the real `ArticleCard` (variant="grid") used on live
                pages — mirrors its slot set: cover → category → title → meta. */}
            <ul className="lab-news__grid" data-reveal="up">
              {NEWS_ITEMS.map(([tag, title]) => (
                <li key={title}>
                  <figure
                    className="media-ph lab-news__thumb"
                    style={{ ["--ratio" as string]: "16/9" }}
                    role="img"
                    aria-label="Article cover slot"
                  >
                    <span className="media-ph__label">Image · cover · 16:9</span>
                  </figure>
                  <span className="mini-tag">{tag}</span>
                  <h3>{title}</h3>
                  <span className="lab-news__meta">June 4, 2026 · 4 min read</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band soft lab-legal" data-marker="19 · Legal prose / TOC">
          <div className="wrap lab-legal__grid" data-reveal="up">
            <aside className="lab-legal__toc" aria-label="Legal table of contents">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                19 · Legal prose / TOC
              </span>
              <a href="#legal-scope">01 Scope</a>
              <a href="#legal-data">02 Data</a>
              <a href="#legal-contact">03 Contact</a>
            </aside>
            <article className="lab-legal__article">
              <h2 className="title">Document pages need a stable reading system</h2>
              <p className="lab-legal__meta">Last updated: June 16, 2026</p>
              <aside className="lab-legal__disclaimer" role="note">
                <strong>Draft for review.</strong> This is a working draft for
                transparency — not reviewed by legal counsel and not legal advice.
                Bracketed placeholders such as <code>[Legal entity name]</code> must
                be completed before it is relied upon.
              </aside>
              <section id="legal-scope">
                <h3>01 Scope</h3>
                <p>
                  Legal and security pages use a prose layout rather than
                  marketing composition.
                </p>
              </section>
              <section id="legal-data">
                <h3>02 Data</h3>
                <p>
                  The table of contents stays visible on desktop and collapses
                  naturally above the article on small screens.
                </p>
              </section>
              <section id="legal-contact">
                <h3>03 Contact</h3>
                <p>
                  Each numbered section keeps the text scannable without
                  decorative cards.
                </p>
              </section>
            </article>
          </div>
        </section>

        <section className="band soft lab-sitemap" data-marker="20 · Sitemap index">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                20 · Sitemap index
              </span>
              <h2 className="title">The site map is a compact tree</h2>
            </div>
            <div className="lab-sitemap__legend" aria-hidden="true">
              <span className="lab-sitemap__leg">
                <span className="dot dot--ready"></span>Live page
              </span>
              <span className="lab-sitemap__leg">
                <span className="dot dot--soon"></span>Not built yet
              </span>
            </div>
            <div className="lab-sitemap__tree" data-reveal="up" role="tree" aria-label="Site map">
              {SITEMAP_GROUPS.flatMap(([group, pages], gi) => {
                const lastGroup = gi === SITEMAP_GROUPS.length - 1;
                const list = pages as string[];
                const rows = [
                  <div className="lab-sm__row lab-sm__row--header" key={group as string}>
                    <span className="lab-sm__guide">{lastGroup ? "└─ " : "├─ "}</span>
                    <span className="lab-sm__node">{group as string}</span>
                  </div>,
                ];
                list.forEach((page, pi) => {
                  const lastPage = pi === list.length - 1;
                  const guide = (lastGroup ? "   " : "│  ") + (lastPage ? "└─ " : "├─ ");
                  rows.push(
                    <div className="lab-sm__row" key={`${group as string}-${page}`}>
                      <span className="lab-sm__guide">{guide}</span>
                      <span className="lab-sm__node">{page}</span>
                      {SITEMAP_SOON.has(page) ? (
                        <span className="lab-sitemap__badge">soon</span>
                      ) : null}
                    </div>,
                  );
                });
                return rows;
              })}
            </div>
          </div>
        </section>

        <section className="band soft lab-cta" data-marker="Outro · Quiet CTA">
          <div className="wrap head">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Catalog complete
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Pick one section and we will refine it into production shape
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              This lab is intentionally modular: we can replace copy, change the
              visual slot, generate assets and then move the finished section to
              the target page.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="#hero">Back to top</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
      <LabMarkers />
    </>
  );
}
