import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

/** Header nav for this page — anchors to its own sections. The section name
 *  links to this hub itself (/product). */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product",
  links: [
    { label: "Map", href: "#map" },
    { label: "Workflow", href: "#flow" },
    { label: "Pages", href: "#pages" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Product: AI Pitch Deck Evaluation Workflow",
  description:
    "The Product section of EvalLense — workflow overview, Entry Hub, evidence-based reports and the Review Board. Pick a page and see how the evaluation works.",
};

/*
 * ── /product — section HUB (разводящая) ──────────────────────────────────
 * A lightweight Apple-grade wayfinding page: open it, understand the section,
 * and reach any internal page in one click. Deep workflow detail lives on
 * /product/overview — this hub does not duplicate it. Content is confirmed in
 * the brief (wiki/product/product.md) and sitemap §Product. Real facts only.
 *
 * ── IMAGE / VISUAL SLOTS (generator not wired up → visible .media-ph) ──────
 * 1. hero (section 1) — 16:9
 *    Four routes converge into one lens-section.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    hairline structure, soft violet depth, calm; no security theatre.
 * 2. flow (section 4, beside the pinned steps) — 4:3
 *    Collect → Evaluate → Decide as a horizontal track, one node lit.
 *    Prompt: same tokens, ink surface, thin node-lines, one lens-lit node.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Generic ScrollFX engine via data-attributes only (data-reveal / data-pin).
 * <ScrollFX/> is mounted once after <Footer/>. reduced-motion handled by the
 * engine + the .hub @media blocks. No per-section useEffect.
 */

/* 3. Section map — bento directory of the four internal pages (brief §3). */
const TILES = [
  {
    tag: "Overview",
    title: "Start with the whole picture",
    body: "The full EvalLense workflow in one place — the organizer path, the evaluation pipeline, the AI jury and what a run produces.",
    href: "/product/overview",
    feature: true,
  },
  {
    tag: "Entry Hub",
    title: "One entry point for the batch",
    body: "Collect applications and pitch decks in a single place — added manually or through a self-upload link.",
    href: "/product/entry-hub",
  },
  {
    tag: "Evidence-Based Reports",
    title: "Scores tied to evidence",
    body: "Reports where every score and conclusion links back to evidence in the deck — not a black-box verdict.",
    href: "/product/evidence-based-reports",
  },
  {
    tag: "Review Board",
    title: "Where a person decides",
    body: "A working board for human review, comparison and a leaderboard ranked by the human Final Score.",
    href: "/product/review-board",
  },
];

/* 4. How the modules combine — 3 steps revealed through the pin engine (§4). */
const FLOW = [
  {
    num: "01",
    label: "Collect",
    desc: "Decks and applications land in the Entry Hub — one workspace instead of scattered files and threads.",
    linkLabel: "Entry Hub",
    href: "/product/entry-hub",
  },
  {
    num: "02",
    label: "Evaluate",
    desc: "Six AI judges score every deck across P1–P6, and an evidence-based report is assembled for each one.",
    linkLabel: "Evidence-Based Reports",
    href: "/product/evidence-based-reports",
  },
  {
    num: "03",
    label: "Decide",
    desc: "On the Review Board the organizer compares, ranks and makes the final call — the human decides.",
    linkLabel: "Review Board",
    href: "/product/review-board",
  },
];

/* 5. Browse — what's inside each page (gallery, brief §3 framing). */
const PAGES = [
  {
    tag: "Overview",
    title: "Overview",
    body: "A 7-step organizer path, the Decoder→Report pipeline and the six-judge jury, end to end.",
    href: "/product/overview",
  },
  {
    tag: "Entry Hub",
    title: "Entry Hub",
    body: "Two ways to collect decks and the private workspace they land in before evaluation.",
    href: "/product/entry-hub",
  },
  {
    tag: "Reports",
    title: "Evidence-Based Reports",
    body: "The anatomy of a report — score, judge reasoning, linked evidence and the gaps it surfaces.",
    href: "/product/evidence-based-reports",
  },
  {
    tag: "Review Board",
    title: "Review Board",
    body: "The leaderboard, human-in-the-loop review and side-by-side comparison of decks.",
    href: "/product/review-board",
  },
];

export default function ProductHubPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="hub product-hub">
        {/* 1. Hero — statement-hero, light. */}
        <section className="band soft hub-hero">
          <div className="wrap hub-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Product
            </span>
            <h1
              className="hub-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Everything EvalLense does, in{" "}
              <span className="grad-word">one place</span>
            </h1>
            <p
              className="sub hub-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Collect decks, evaluate them with an AI jury, get evidence-based
              reports and review the results — four pages, one end-to-end
              workflow. Pick where to start.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph hub-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="Four routes converging into one lens-section"
            >
              <span className="media-ph__label">
                Image · routes into a lens · 16:9
              </span>
              <span className="media-ph__hint">
                Four routes converge into one lens-section — lens-gradient
                violet→cyan→aqua, calm; see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Full-bleed statement — DARK. */}
        <section className="band ink hub-statement">
          <div className="wrap">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              What this section covers
            </span>
            <p className="hub-statement__text" data-reveal="up">
              Not a one-off AI analysis — an{" "}
              <span className="grad-word">operating layer</span> that carries a
              batch of decks from intake to a human decision.
            </p>
            <p
              className="hub-statement__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              The Product section shows that path and the modules that run it.
            </p>
          </div>
        </section>

        {/* 3. Section map — bento directory of link tiles, light. */}
        <section id="map" className="band hub-map">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The section, mapped
              </span>
              <h2 className="title">Four pages, one click away</h2>
              <p className="sub">
                Start with the Overview for the whole picture, or jump straight
                to the module you need.
              </p>
            </div>
            <div className="hub-map__grid" data-reveal="up">
              {TILES.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={
                    t.feature ? "hub-tile hub-tile--feature" : "hub-tile"
                  }
                >
                  <span className="mini-tag">{t.tag}</span>
                  <h3 className="hub-tile__h">{t.title}</h3>
                  <p className="hub-tile__p">{t.body}</p>
                  <span className="hub-tile__more">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How the modules combine — pinned multi-screen, DARK. */}
        <section
          id="flow"
          className="band ink hub-flow"
          data-pin
          data-pin-steps="3"
          aria-label="How the modules combine — three steps"
        >
          <div className="hub-flow__stage" data-pin-stage>
            <div className="wrap hub-flow__grid">
              <div className="hub-flow__col">
                <div className="head hub-flow__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    How it fits together
                  </span>
                  <h2 className="title">Three modules, one workflow</h2>
                  <p className="sub">
                    The section&apos;s pages are stages of a single path. Each
                    step lights up as you scroll — follow it to its page.
                  </p>
                </div>
                <ol className="hub-flow__track">
                  {FLOW.map((s, i) => (
                    <li
                      key={s.label}
                      className="hub-fstep"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="hub-fstep__num">{s.num}</span>
                      <span className="hub-fstep__label">{s.label}</span>
                      <span className="hub-fstep__desc">{s.desc}</span>
                      <Link href={s.href} className="hub-fstep__link">
                        {s.linkLabel} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
              {/* flow visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph hub-flow__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Collect, Evaluate, Decide shown as a horizontal track with one node lit"
              >
                <span className="media-ph__label">
                  Image · workflow track · 4:3
                </span>
                <span className="media-ph__hint">
                  Collect → Evaluate → Decide, one lens-lit node on an ink
                  surface — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 5. Browse — horizontal scroll-snap gallery, light. */}
        <section id="pages" className="band soft hub-gallery">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Look inside
              </span>
              <h2 className="title">A peek into each page</h2>
              <p className="sub">
                What you&apos;ll find behind every page in the section — scroll
                across and open the one you need.
              </p>
            </div>
          </div>
          <div
            className="hub-lane"
            data-reveal="up"
            tabIndex={0}
            role="list"
            aria-label="The four Product pages — horizontally scrollable"
          >
            {PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="hub-card"
                role="listitem"
              >
                <span className="hub-card__signal" aria-hidden="true"></span>
                <span className="mini-tag">{p.tag}</span>
                <h3 className="hub-card__h">{p.title}</h3>
                <p className="hub-card__p">{p.body}</p>
                <span className="hub-card__more">
                  View <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Final CTA — quiet CTA, DARK. */}
        <section className="band ink hub-cta">
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Get started
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              See the whole workflow on your own decks
            </h2>
            <p
              className="sub hub-cta__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch intake, evaluation and human review play out
              end to end.
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
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
