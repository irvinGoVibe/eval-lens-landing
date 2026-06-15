import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "EvalLense Methodology — How AI Jury Evaluates Pitch Decks",
  description:
    "Transparent EvalLense methodology: criteria-based evaluation by an AI jury, evidence-linked scores, and a human in the decision loop.",
};

/*
 * Image slots — generator is NOT wired up. These are neutral placeholders on
 * canonical tokens (--lens-soft / --hairline). When an image generator is
 * available, produce the assets below and drop them into
 * web/public/assets/methodology/.
 *
 * hero  (section 1): Abstract "lens" focusing noise into one clear signal.
 *   Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *   soft violet depth, hairline structure, calm, no shield icons / security
 *   theatre.
 *
 * pipeline (section 3): Horizontal track of nodes
 *   Decode → Judges → Summarize → Score → Report.
 *   Prompt: same tokens, nodes lit along a lens track, thin lines, minimal.
 *
 * Motion: this page opts into the generic ScrollOrchestrator engine via
 * data-attributes only (data-reveal / data-scrub / data-pin). No per-section
 * useEffect, no ScrollOrchestrator edits. reduced-motion is handled by the
 * engine + the primitives' @media block.
 *
 * Draft content: unconfirmed copy (P1–P6 roles, scoring/confidence formula,
 * rubric levels, pipeline step descriptions, hero tagline) is kept as the
 * brief's draft wording — no invented numbers (see story 04 open questions).
 */

const PIPELINE_STEPS = [
  {
    name: "Decode",
    desc: "The deck is parsed into structured signal — slides, claims and figures become addressable evidence.",
  },
  {
    name: "Judges",
    desc: "An AI jury of independent judges reads the deck, each against its own set of criteria.",
  },
  {
    name: "Summarize",
    desc: "Each judge's findings are condensed into evidence-backed notes with source references.",
  },
  {
    name: "Score",
    desc: "Per-criterion scores are aggregated; missing evidence is flagged, never guessed.",
  },
  {
    name: "Report",
    desc: "A comparable, explainable report is assembled — score, breakdown, evidence and confidence.",
  },
];

const JUDGE_ROLES = ["P1", "P2", "P3", "P4", "P5", "P6"];

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader light />
      <main className="methodology">
        {/* 1. Hero — statement-hero, light */}
        <section className="band soft methodology-hero">
          <div className="wrap methodology-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Methodology
            </span>
            {/* draft hero tagline from brief §1 Hero */}
            <h1
              className="methodology-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              A scientific methodology for evaluating{" "}
              <span className="grad-word">pitch decks</span>
            </h1>
            <p
              className="sub methodology-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense evaluates decks against explicit criteria through an AI
              jury — with transparent reasoning and a human in the loop for the
              final decision.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              {/* final target is /company/contact once that route exists; for
                  now anchor to the homepage demo section to avoid a 404 */}
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
            {/* hero image placeholder — see prompt comment at top of file */}
            <div
              className="methodology-hero__media"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: "320ms" }}
              role="img"
              aria-label="Abstract lens focusing noise into one clear signal"
            ></div>
          </div>
        </section>

        {/* 2. Принципы оценки — editorial, light (numbered lines, not a card grid) */}
        <section className="band methodology-principles">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Principles
              </span>
              <h2 className="title">Principles of evaluation</h2>
            </div>
            <ol className="prin-list">
              <li
                className="prin-item"
                data-reveal="up"
                style={{ ["--reveal-delay" as string]: "0ms" }}
              >
                <span className="prin-num" aria-hidden="true">
                  01
                </span>
                <div className="prin-body">
                  <h3 className="prin-h">Criteria-based evaluation</h3>
                  <p className="prin-p">
                    Decks are scored against pre-defined criteria, not a general
                    impression.
                  </p>
                </div>
              </li>
              <li
                className="prin-item"
                data-reveal="up"
                style={{ ["--reveal-delay" as string]: "120ms" }}
              >
                <span className="prin-num" aria-hidden="true">
                  02
                </span>
                <div className="prin-body">
                  <h3 className="prin-h">Evidence over opinion</h3>
                  <p className="prin-p">
                    We show what we found, where it came from, and what is
                    missing — no bare score without justification.
                  </p>
                </div>
              </li>
              <li
                className="prin-item"
                data-reveal="up"
                style={{ ["--reveal-delay" as string]: "240ms" }}
              >
                <span className="prin-num" aria-hidden="true">
                  03
                </span>
                <div className="prin-body">
                  <h3 className="prin-h">AI prepares, humans decide</h3>
                  <p className="prin-p">
                    The AI output is advisory; the final decision is always made
                    by a person.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* 3. Конвейер оценки — pinned-multi-screen, DARK. Tall track +
            sticky stage; 5 steps light up sequentially via the pin engine. */}
        <section
          className="band ink methodology-pipeline"
          data-pin
          data-pin-steps="5"
          aria-label="The evaluation pipeline"
        >
          <div className="pipe-stage" data-pin-stage>
            <div className="wrap">
              <div className="head pipe-head">
                <span className="eyebrow">
                  <span className="dot" aria-hidden="true"></span>
                  Pipeline
                </span>
                <h2 className="title">The evaluation pipeline</h2>
                {/* draft from brief §3 Конвейер оценки */}
                <p className="sub">
                  Every deck runs through a fixed pipeline. Each step is
                  deterministic and reproducible — the same deck takes the same
                  path.
                </p>
              </div>
              <ol className="pipe-track">
                {PIPELINE_STEPS.map((step, i) => (
                  <li
                    key={step.name}
                    className="pipe-step"
                    data-pin-step
                    style={{ ["--i" as string]: String(i) }}
                  >
                    <span className="pipe-node" aria-hidden="true">
                      <span className="pipe-dot"></span>
                    </span>
                    <span className="pipe-name">{step.name}</span>
                    <span className="pipe-desc">{step.desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. Роли судей — horizontal-gallery, light. Scroll-snap lane,
            keyboard-reachable. P1–P6 are draft (public description pending). */}
        <section className="band methodology-judges">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Judges
              </span>
              <h2 className="title">Judge roles</h2>
              {/* draft from brief §4 Роли судей */}
              <p className="sub">
                An AI jury of several judges evaluates the deck, each
                responsible for its own set of criteria (P1–P6). Several
                independent judges reduce dependence on a single viewpoint.
              </p>
            </div>
          </div>
          <ul
            className="judge-lane"
            data-reveal="up"
            aria-label="Judge roles P1 through P6"
            tabIndex={0}
          >
            {JUDGE_ROLES.map((p) => (
              <li key={p} className="judge-card">
                <span className="mini-tag">{p}</span>
                <h3 className="judge-h">Criterion {p}</h3>
                <p className="judge-p">
                  Draft — public description pending (see open questions).
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Scoring model — editorial-split + scrubbed ring, light.
            Ring fills with scroll via --scrub on the ring element. */}
        <section className="band soft methodology-scoring">
          <div className="wrap score-split">
            <div className="score-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Scoring
              </span>
              <h2 className="title">Scoring model</h2>
              {/* draft from brief §5 Scoring model */}
              <p className="sub">
                Every score is linked to evidence: a per-criterion breakdown, a
                source quote referencing the deck page, and explicit
                &ldquo;missing evidence&rdquo; flags. The score is accompanied
                by a confidence ring.
              </p>
            </div>
            <div className="score-visual" data-reveal="right">
              {/* confidence ring — fills as it scrolls through the viewport
                  via --scrub; reduced-motion lands it at the full state */}
              <div
                className="conf-ring"
                data-scrub
                role="img"
                aria-label="Confidence ring filling as evidence accumulates"
              >
                <span className="conf-ring__label">Confidence</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Rubric system — full-bleed-statement, DARK (contrast to neighbours) */}
        <section className="band ink methodology-rubric">
          <div className="wrap rubric-statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Rubric
            </span>
            {/* draft from brief §6 Rubric system */}
            <h2
              className="rubric-h"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              One <span className="grad-word">rubric</span> — shared criteria
              and defined levels — is what makes scores comparable across decks.
            </h2>
            <p
              className="sub rubric-note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Draft — every deck is measured against the same criteria, each with
              defined levels (specific descriptors not yet fixed).
            </p>
          </div>
        </section>

        {/* 7. Human-in-the-loop — editorial-split, light. AI-green only as the
            human-approval accent. */}
        <section className="band methodology-hitl">
          <div className="wrap hitl-split">
            <div className="hitl-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Human-in-the-loop
              </span>
              <h2 className="title">Human in the loop</h2>
              {/* draft from brief §7 Human-in-the-loop */}
              <p className="sub">
                The AI produces an advisory output that is handed to a named
                person; that person makes the final decision, and an audit line
                records who and when.
              </p>
            </div>
            <div className="hitl-flow" data-reveal="right">
              <div className="hitl-node hitl-node--ai">
                <span className="mini-tag">AI</span>
                <h3 className="hitl-h">Advisory output</h3>
                <p className="hitl-p">
                  The AI jury prepares an evidence-backed recommendation — it
                  does not decide.
                </p>
              </div>
              <span className="hitl-arrow" aria-hidden="true">
                →
              </span>
              <div className="hitl-node hitl-node--human">
                <span className="mini-tag">Human</span>
                <h3 className="hitl-h">Final decision</h3>
                <p className="hitl-p">
                  A person with a named role reviews the advisory output and
                  makes the call.
                </p>
              </div>
              <p className="hitl-audit">
                Audit — every final decision records who decided and when.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Final CTA — quiet-cta, DARK */}
        <section className="band ink methodology-cta">
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
              See the methodology on your own decks
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch the evaluation run end to end.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              {/* final target is /company/contact once that route exists; for
                  now anchor to the homepage demo section to avoid a 404 */}
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
