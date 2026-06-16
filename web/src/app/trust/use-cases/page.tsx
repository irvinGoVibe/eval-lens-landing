import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";

export const metadata: Metadata = {
  title:
    "EvalLense Use Cases — Batch Pitch Evaluation for VC, Accelerators & More",
  description:
    "Where EvalLense fits: VC funds, accelerators, angels, corporate innovation, competitions, grants and universities — one batch review, unified criteria, evidence reports and a human in the loop.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/use-cases/.
 *
 * 1. hero (section 1) — 16:9
 *    A stream of different decks converging into one lens, then fanning out
 *    into a ranked shortlist.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre — many
 *    inputs narrow into one lens and spread into an ordered shortlist.
 *
 * 2. segments gallery cards (section 3) — 4:3 each
 *    A horizontal gallery of segment cards sharing one visual rhythm.
 *    Prompt: same tokens, light surface, hairline card frames, a single small
 *    lens accent per card; calm, consistent, no logos or fabricated metrics.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief: 8 application segments (VC, accelerators,
 * angels, corporate, competitions, grants, hackathons, universities); the
 * current mode is Pitch Competition (P1–P6); a panel of 6 independent judges
 * J-P1…J-P6 over 6 dimensions P1–P6; ranking is by the human Final Score;
 * 400+ internal runs in the product history. NO fabricated customer cases,
 * logos or adoption metrics — there are none in the docs. Hackathons /
 * competitions run through the Pitch methodology today (Hackathon/Custom mode
 * is post-MVP); they are presented honestly, with no H1–H6 / code-review claims.
 */

/* 3. Segments — horizontal scroll-snap gallery (brief §3, sitemap segments). */
const SEGMENTS = [
  {
    tag: "VC Funds",
    title: "Inbound dealflow",
    body: "Screen inbound dealflow faster and surface stronger signals before a deeper review.",
  },
  {
    tag: "Accelerators",
    title: "Cohort selection",
    body: "Evaluate applications consistently and compare founders side by side.",
  },
  {
    tag: "Angel Investors",
    title: "First-pass screening",
    body: "A structured first pass before calls and diligence, not a gut-feel filter.",
  },
  {
    tag: "Corporate Innovation",
    title: "Fit & readiness",
    body: "Compare startups on fit, readiness and evidence against the same lenses.",
  },
  {
    tag: "Competitions & Hackathons",
    title: "Many teams, fast",
    body: "Review many teams quickly with a leaderboard that supports the jury's decision.",
  },
  {
    tag: "Grants & Universities",
    title: "Unified criteria",
    body: "Unified criteria and clearer feedback for every applicant in the round.",
  },
];

/* 5. What every segment gets — bento tiles (brief §5; scope.md). */
const COMMON = [
  {
    tag: "Entry hub",
    title: "One place to collect a batch",
    body: "A single entry point with self-upload by link — every deck lands in one structured batch instead of scattered inboxes.",
    feature: true,
  },
  {
    tag: "6-judge eval",
    title: "Independent judges J-P1…J-P6",
    body: "Six specialized AI judges read each deck against the P1–P6 dimensions, instead of one all-seeing verdict.",
  },
  {
    tag: "Evidence reports",
    title: "Scores tied to the deck",
    body: "Each score is linked to evidence from the deck, with risks and gaps called out — not an opaque number.",
  },
  {
    tag: "Leaderboard",
    title: "Ranked by human Final Score",
    body: "A leaderboard orders the batch by the human Final Score, so the strongest projects rise to the top.",
  },
  {
    tag: "Live Q&A",
    title: "Questions for the room",
    body: "Generated questions give the jury a focused starting point for a live discussion with each team.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <SiteHeader light />
      <main className="usecases">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft usecases-hero">
          <div className="wrap usecases-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Use Cases
            </span>
            <h1
              className="usecases-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              One batch review system, many evaluation{" "}
              <span className="grad-word">workflows</span>
            </h1>
            <p
              className="sub usecases-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Use EvalLense wherever you need to evaluate many startups, compare
              them against the same criteria and decide faster — with evidence
              and a person in the loop.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph usecases-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A stream of different decks converging into one lens and fanning out into a ranked shortlist"
            >
              <span className="media-ph__label">
                Image · decks into a ranked shortlist · 16:9
              </span>
              <span className="media-ph__hint">
                Many different decks converge into one lens and fan out into a
                ranked shortlist — lens-gradient violet→cyan→aqua, calm; see
                prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. The common pattern — full-bleed statement, DARK. */}
        <section className="band ink usecases-pattern">
          <div className="wrap usecases-pattern__inner">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              The common pattern
            </span>
            <p className="usecases-pattern__lead" data-reveal="up">
              Many applications. Little reviewer time. In the flow it is easy to
              miss a strong project.
            </p>
            <p
              className="usecases-pattern__body"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              EvalLense processes the whole batch, brings different decks to one
              report format and lifts the strongest to the top — while it leaves
              the final decision to a person.
            </p>
          </div>
        </section>

        {/* 3. Segments — horizontal scroll-snap gallery, light. */}
        <section className="band usecases-segments">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Segments
              </span>
              <h2 className="title">Find your evaluation workflow</h2>
              <p className="sub">
                The same batch review serves very different teams. Each one runs
                the same Pitch methodology — only the context around it changes.
              </p>
            </div>
          </div>
          {/* horizontal gallery — scrolls INSIDE its own overflow container,
              never moving the page; scroll-snap like .methodology .judge-lane */}
          <ul
            className="seg-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Application segments — scroll horizontally"
          >
            {SEGMENTS.map((s) => (
              <li key={s.tag} className="seg-card">
                <span className="seg-card__signal" aria-hidden="true"></span>
                <span className="mini-tag">{s.tag}</span>
                <h3 className="seg-h">{s.title}</h3>
                <p className="seg-p">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. VC + Accelerators — editorial split, light. */}
        <section className="band soft usecases-anchors">
          <div className="wrap anchors-split">
            <div className="anchors-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Two anchor segments
              </span>
              <h2 className="title">Built for dealflow and cohort selection</h2>
              <p className="sub">
                VC funds and accelerators share the same problem from two angles:
                too many decks, too little time, and a need to choose
                transparently. EvalLense fits both without changing the process.
              </p>
            </div>
            <div className="anchors-cards" data-reveal="right">
              <div className="anchor-card">
                <span className="mini-tag">VC Funds</span>
                <h3 className="anchor-h">Screen more decks, faster</h3>
                <p className="anchor-p">
                  Screen more inbound decks faster, surface the stronger signals
                  and prepare structured notes for a deeper review — instead of
                  triaging from a gut feeling.
                </p>
              </div>
              <div className="anchor-card anchor-card--accel">
                <span className="mini-tag">Accelerators</span>
                <h3 className="anchor-h">Compare founders side by side</h3>
                <p className="anchor-p">
                  Evaluate applications consistently, compare founders next to
                  each other and back cohort decisions with evidence-based
                  reports the whole committee can read.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. What every segment gets — bento, DARK. */}
        <section className="band ink usecases-common">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What every segment gets
              </span>
              <h2 className="title">One set of building blocks for all of them</h2>
              <p className="sub">
                Whatever the segment, the product gives the same core: a place to
                collect the batch, a six-judge evaluation, evidence-linked
                reports, a leaderboard and questions for a live discussion.
              </p>
            </div>
            <ul className="common-grid" data-reveal="up">
              {COMMON.map((c) => (
                <li
                  key={c.tag}
                  className={
                    c.feature ? "common-tile common-tile--feature" : "common-tile"
                  }
                >
                  <span className="mini-tag">{c.tag}</span>
                  <h3 className="common-h">{c.title}</h3>
                  <p className="common-p">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Transparency & feedback — editorial split, light. */}
        <section className="band usecases-transparency">
          <div className="wrap transparency-split">
            <div className="transparency-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Transparency &amp; feedback
              </span>
              <h2 className="title">Decisions you can explain and compare</h2>
              <p className="sub">
                For grant programs and universities the value is transparency:
                everyone is scored against the same criteria, and one report
                format makes decisions explainable and comparable across the
                round.
              </p>
            </div>
            <div className="transparency-claim" data-reveal="right">
              <p className="transparency-claim__text">
                The same criteria for every applicant, and clearer feedback they
                can actually act on.
              </p>
              <span className="transparency-claim__tag">
                Unified criteria · participant feedback
              </span>
            </div>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink usecases-cta">
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
              Let&apos;s talk through your evaluation workflow
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo to walk through your scenario and run a pilot batch on
              your own applications.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
