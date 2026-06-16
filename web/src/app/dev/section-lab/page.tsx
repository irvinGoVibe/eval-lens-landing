import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
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
  ["Free", "$0", "Explore section patterns"],
  ["Standard", "$49", "Reusable page sections"],
  ["Professional", "$149", "Custom routes and variants"],
  ["Enterprise", "Custom", "Full page system"],
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
          <div className="wrap lab-statement__inner" data-reveal="up">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              02 · Full-bleed statement
            </span>
            <p className="lab-statement__text">
              Internal pages should feel sequenced, not stacked: a visitor moves
              through scale changes, visual evidence and quiet decisions.
            </p>
          </div>
        </section>

        <section
          id="process"
          className="band ink lab-process"
          data-marker="03 · Pinned multi-screen"
          data-pin
          data-pin-steps="4"
          aria-label="Section design process"
        >
          <div className="lab-process__stage" data-pin-stage>
            <div className="wrap lab-process__grid">
              <div className="lab-process__copy">
                <span className="eyebrow">
                  <span className="dot" aria-hidden="true"></span>
                  03 · Pinned multi-screen
                </span>
                <h2 className="title">A section is designed as a moment</h2>
                <p className="sub">
                  Use this archetype when the user needs to follow a sequence.
                  Each step activates through the shared pin engine.
                </p>
                <ol className="lab-process__steps">
                  {PROCESS_STEPS.map((step) => (
                    <li key={step.label} className="lab-step" data-pin-step>
                      <span className="lab-step__num">{step.num}</span>
                      <span className="lab-step__label">{step.label}</span>
                      <span className="lab-step__desc">{step.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figure
                className="media-ph lab-process__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Pinned process diagram visual slot"
              >
                <span className="media-ph__label">
                  Diagram · pinned sequence · 4:3
                </span>
                <span className="media-ph__hint">
                  Four nodes on an ink field, one active lens node, subtle
                  perspective grid and calm depth.
                </span>
              </figure>
            </div>
          </div>
        </section>

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
              </li>
              <li>
                <strong>768</strong>
                <span>tablet width</span>
              </li>
              <li>
                <strong>1280</strong>
                <span>desktop width</span>
              </li>
            </ul>
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
              {PRICING_TIERS.map(([name, price, body], index) => (
                <li
                  key={name}
                  className={
                    index === 1
                      ? "lab-pricing__card lab-pricing__card--recommended"
                      : "lab-pricing__card"
                  }
                >
                  {index === 1 ? <span className="chip">Recommended</span> : null}
                  <h3>{name}</h3>
                  <strong>{price}</strong>
                  <p>{body}</p>
                  <Button href="#pricing" variant={index === 1 ? "primary" : "ghost"}>
                    Select
                  </Button>
                </li>
              ))}
            </ul>
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
                    <th>Standard</th>
                    <th>Pro</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) =>
                        index === 0 ? <th key={cell}>{cell}</th> : <td key={cell}>{cell}</td>,
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
            <ul className="lab-news__grid" data-reveal="up">
              {NEWS_ITEMS.map(([tag, title]) => (
                <li key={title}>
                  <span className="mini-tag">{tag}</span>
                  <h3>{title}</h3>
                  <p>Short newsroom-style card using the same site typography and card density.</p>
                  <a href="/blog">Read more →</a>
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
            <div className="lab-sitemap__grid" data-reveal="up">
              {SITEMAP_GROUPS.map(([group, pages]) => (
                <div key={group as string}>
                  <h3>{group}</h3>
                  <ul>
                    {(pages as string[]).map((page) => (
                      <li key={page}>{page}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
    </>
  );
}
