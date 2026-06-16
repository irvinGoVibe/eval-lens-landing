import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense — Product Overview: Batch Pitch Deck Evaluation",
  description:
    "How EvalLense works: collect decks in the Entry Hub, evaluate with 6 AI judges, get evidence reports and a Review Board with a leaderboard — the human decides.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/product/.
 *
 * 1. hero (section 1) — 16:9
 *    A flow of decks converges into a lens and exits as a ranked workspace.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre.
 *
 * 2. flow (section 2, beside the pinned 7 steps) — 4:3
 *    A horizontal track of 7 steps whose nodes light up in sequence.
 *    Prompt: same tokens, ink surface, thin node-lines, one lit node.
 *
 * 3. pipeline (section 3, beside the scrubbed stages) — 4:3
 *    Decoder→Judges→Summarizer→Scoring→Report as a lens track, one node lit.
 *    Prompt: same tokens, minimal, a single lens accent on one node.
 *
 * 4. modules (section 4, dark bento feature tile) — 16:9
 *    A bento of three modules with quiet signal-icons.
 *    Prompt: hairline tiles, one lens accent, ink surface, calm.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief (wiki/product/product.md): 7-step organizer
 * path, the Decoder→Judges→Summarizer→Scoring→Report pipeline, 6 independent
 * judges J-P1…J-P6 across dimensions P1–P6, 3 product modules, a 0.0–10.0
 * scale, ranking by the human Final Score. Real facts only. Hackathon / Custom
 * modes are post-MVP and are NOT promised as available (see story 10 open
 * questions).
 */

/* 2. Organizer path — 7 steps revealed through the pin engine (brief §2). */
const PATH_STEPS = [
  {
    num: "01",
    label: "Login / Sign Up",
    desc: "Email and password or Google OAuth — the organizer enters their own workspace.",
  },
  {
    num: "02",
    label: "Dashboard",
    desc: "A list of projects with their statuses, and a place to start a new one.",
  },
  {
    num: "03",
    label: "Wizard",
    desc: "A 5-step setup: mode, details, criteria and weights, judges, and how applications are collected.",
  },
  {
    num: "04",
    label: "Collect",
    desc: "Project overview gathers applications — added manually or via a self-upload link.",
  },
  {
    num: "05",
    label: "Start Judging",
    desc: "The AI pipeline runs on every application in the batch.",
  },
  {
    num: "06",
    label: "Jury Review",
    desc: "Human-in-the-loop: the organizer sets the final dimension scores, guided by the AI report.",
  },
  {
    num: "07",
    label: "Leaderboard",
    desc: "Ranking is built from the human Final Score — not from the AI score.",
  },
];

/* 3. Evaluation pipeline — 5 fixed stages (brief §3, scope.md §5). */
const PIPELINE = [
  {
    num: "01",
    name: "Decoder",
    body: "Brings a deck — PDF, PPTX or Google Slides — to a structured slide-level view through Vision.",
  },
  {
    num: "02",
    name: "AI Judges",
    body: "Six independent judges evaluate the deck across P1–P6 in parallel.",
  },
  {
    num: "03",
    name: "Summarizer",
    body: "Function 1 runs deterministic math, Function 2 the narrative; together they produce the AI Total Score.",
  },
  {
    num: "04",
    name: "Scoring",
    body: "Criterion weights are applied to the human Jury Score to form the Final Score.",
  },
  {
    num: "05",
    name: "Report",
    body: "An explainable report is assembled for each participant.",
  },
];

/* 4. Three product modules — bento (brief §4). */
const MODULES = [
  {
    tag: "Entry Hub",
    title: "One entry point for the batch",
    body: "Applications and pitch decks land in a single place — collected manually or through a self-upload link, ready to evaluate.",
    feature: true,
  },
  {
    tag: "Evidence-Based Reports",
    title: "Scores tied to evidence",
    body: "Reports where scores and conclusions are linked to evidence in the deck, not to a black-box verdict.",
  },
  {
    tag: "Review Board",
    title: "A board for human review",
    body: "A working board for human review, comparison and a leaderboard ranked by the human Final Score.",
  },
];

/* 5. AI jury — 6 independent judges J-P1…J-P6 (brief §5). */
const JUDGES = [
  {
    code: "J-P1",
    title: "Problem",
    body: "Pain, user, urgency and the alternatives a deck claims to beat.",
  },
  {
    code: "J-P2",
    title: "Solution Logic",
    body: "Product logic, differentiation and how coherently the solution holds together.",
  },
  {
    code: "J-P3",
    title: "Business Value / Market",
    body: "Market, value and how the business intends to make money.",
  },
  {
    code: "J-P4",
    title: "Pitch Quality",
    body: "Clarity, narrative, structure and delivery of the pitch itself.",
  },
  {
    code: "J-P5",
    title: "Team Readiness",
    body: "Founder-market fit, skills and the ability to execute.",
  },
  {
    code: "J-P6",
    title: "Feasibility",
    body: "Roadmap, resources and operational realism.",
  },
];

/* 7. What you get — outputs after a run (brief §7). */
const OUTPUTS = [
  {
    tag: "Workspace",
    title: "Structured batch workspace",
    body: "Every application sits in one organized space instead of scattered files and threads.",
    feature: true,
  },
  {
    tag: "Evaluations",
    title: "Deck-level evaluations",
    body: "Scores across P1–P6 with a confidence signal on each dimension.",
  },
  {
    tag: "Evidence",
    title: "Judge assessments & evidence",
    body: "Each judge assessment is tied back to evidence in the deck.",
  },
  {
    tag: "Signals",
    title: "Strengths, weaknesses, gaps",
    body: "Strengths and weaknesses surfaced alongside deck completeness signals.",
  },
  {
    tag: "Leaderboard",
    title: "Leaderboard & comparison",
    body: "A comparison view ranked by the human Final Score.",
  },
];

export default function ProductOverviewPage() {
  return (
    <>
      <SiteHeader light />
      <main className="product-overview">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft po-hero">
          <div className="wrap po-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Product Overview
            </span>
            <h1
              className="po-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              The operating layer for structured pitch{" "}
              <span className="grad-word">evaluation</span>
            </h1>
            <p
              className="sub po-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Collect decks, evaluate them consistently, get evidence-based
              reports and compare the results in one review process — the
              decision stays with a person.
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
              className="media-ph po-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A flow of decks converging into a lens and exiting as a ranked workspace"
            >
              <span className="media-ph__label">
                Image · decks into a lens · 16:9
              </span>
              <span className="media-ph__hint">
                Decks converge into a lens and exit as a ranked workspace —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file
                header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Organizer path — pinned multi-screen, DARK. Seven steps light up. */}
        <section
          className="band ink po-path"
          data-pin
          data-pin-steps="7"
          aria-label="The organizer path — seven steps"
        >
          <div className="po-path__stage" data-pin-stage>
            <div className="wrap po-path__grid">
              <div className="po-path__col">
                <div className="head po-path__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    How it works
                  </span>
                  <h2 className="title">The organizer path, in seven steps</h2>
                  <p className="sub">
                    EvalLense walks an organizer from sign-in to a ranked
                    leaderboard. The path is fixed; each step lights up as you
                    scroll through it.
                  </p>
                </div>
                <ol className="po-path__track">
                  {PATH_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="po-step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="po-step__num">{s.num}</span>
                      <span className="po-step__label">{s.label}</span>
                      <span className="po-step__desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* flow visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph po-path__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A horizontal track of seven steps whose nodes light up in sequence"
              >
                <span className="media-ph__label">
                  Image · organizer flow · 4:3
                </span>
                <span className="media-ph__hint">
                  A 7-step track, nodes lighting in sequence on an ink surface —
                  see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 3. Evaluation pipeline — editorial split + scrubbed ring, light. */}
        <section className="band po-pipeline">
          <div className="wrap po-pipeline__split">
            <div className="po-pipeline__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Evaluation pipeline
              </span>
              <h2 className="title">Every deck runs the same five stages</h2>
              <p className="sub">
                Each application passes a fixed pipeline. The numeric layer is
                deterministic — the same judge findings and weights produce the
                same AI Total Score on a 0.0–10.0 scale.
              </p>
              <ol className="po-pipeline__track">
                {PIPELINE.map((p) => (
                  <li key={p.name} className="po-pipe">
                    <span className="po-pipe__num">{p.num}</span>
                    <span className="po-pipe__name">{p.name}</span>
                    <span className="po-pipe__body">{p.body}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="po-pipeline__visual" data-reveal="right">
              {/* pipeline ring — fills as it scrolls through the viewport via
                  --scrub; reduced-motion lands it at the full state */}
              <div
                className="po-ring"
                data-scrub
                role="img"
                aria-label="A ring filling as a deck moves through the pipeline stages"
              >
                <span className="po-ring__label">Decoder → Report</span>
              </div>
              {/* pipeline visual slot — see prompt 3 in file header */}
              <figure
                className="media-ph po-pipeline__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Decoder to Report shown as a lens track with one node lit"
              >
                <span className="media-ph__label">
                  Image · pipeline track · 4:3
                </span>
                <span className="media-ph__hint">
                  Decoder→Judges→Summarizer→Scoring→Report, one lens-lit node —
                  see prompt 3 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 4. Three modules — bento, DARK. */}
        <section className="band ink po-modules">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Three modules
              </span>
              <h2 className="title">One product, three connected modules</h2>
              <p className="sub">
                EvalLense is an Entry Hub for intake, Evidence-Based Reports for
                the analysis and a Review Board where a person makes the call.
              </p>
            </div>
            <ul className="po-modules__grid" data-reveal="up">
              {MODULES.map((m) => (
                <li
                  key={m.tag}
                  className={
                    m.feature
                      ? "po-module po-module--feature"
                      : "po-module"
                  }
                >
                  <span className="mini-tag">{m.tag}</span>
                  <h3 className="po-module__h">{m.title}</h3>
                  <p className="po-module__p">{m.body}</p>
                  {m.feature ? (
                    /* modules visual slot — see prompt 4 in file header */
                    <figure
                      className="media-ph po-module__media"
                      style={{ ["--ratio" as string]: "16/9" }}
                      role="img"
                      aria-label="A bento of three modules with quiet signal icons"
                    >
                      <span className="media-ph__label">
                        Image · modules bento · 16:9
                      </span>
                      <span className="media-ph__hint">
                        Three module tiles with quiet signal icons, one lens
                        accent — see prompt 4 in file header
                      </span>
                    </figure>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. AI jury — horizontal scroll-snap gallery, light. Six judges. */}
        <section className="band po-jury">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                AI jury
              </span>
              <h2 className="title">Six independent judges, six lenses</h2>
              <p className="sub">
                Evaluation runs through a jury of six AI judges, each with its
                own lens across P1–P6. The judges work independently and never
                see one another's scores.
              </p>
            </div>
          </div>
          <ol
            className="po-judges-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="The six AI judges — horizontally scrollable"
          >
            {JUDGES.map((j) => (
              <li key={j.code} className="po-judge">
                <span className="po-judge__signal" aria-hidden="true"></span>
                <span className="mini-tag">{j.code}</span>
                <h3 className="po-judge__h">{j.title}</h3>
                <p className="po-judge__p">{j.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. Why it matters — editorial split, light. */}
        <section className="band soft po-why">
          <div className="wrap po-why__split">
            <div className="po-why__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Why it matters
              </span>
              <h2 className="title">Less manual review, a clearer trail</h2>
              <p className="sub">
                EvalLense cuts the load of manual review, raises the consistency
                of evaluation and gives a team a clearer decision trail — without
                turning the choice into a black box.
              </p>
            </div>
            <div className="po-why__claim" data-reveal="right">
              <p className="po-why__claim-text">
                The goal is higher evaluation quality — structured,
                evidence-linked and inspectable — not a verdict on the future.
              </p>
              <span className="po-why__claim-tag">
                Pitch Competition mode · P1–P6
              </span>
            </div>
          </div>
        </section>

        {/* 7. What you get — stat / bento, DARK. */}
        <section className="band ink po-outputs">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What you get
              </span>
              <h2 className="title">Everything a run leaves behind</h2>
              <p className="sub">
                After a batch runs, the organizer is left with a structured set
                of outputs — workspace, evaluations, evidence and a leaderboard.
              </p>
            </div>
            <ul className="po-outputs__grid" data-reveal="up">
              {OUTPUTS.map((o) => (
                <li
                  key={o.tag}
                  className={
                    o.feature
                      ? "po-output po-output--feature"
                      : "po-output"
                  }
                >
                  <span className="mini-tag">{o.tag}</span>
                  <h3 className="po-output__h">{o.title}</h3>
                  <p className="po-output__p">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. Final CTA — quiet CTA, DARK. */}
        <section className="band ink po-cta">
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
              className="sub"
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
