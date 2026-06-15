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
 * canonical tokens. When an image generator is available, produce the assets
 * below and drop them into web/public/assets/methodology/.
 *
 * hero  (section 1): Abstract "lens" focusing noise into one clear signal.
 *   Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *   soft violet depth, hairline structure, calm, no shield icons / security
 *   theatre.
 *
 * pipeline (section 3): Horizontal track of nodes
 *   Decode → Judges → Summarize → Score → Report.
 *   Prompt: same tokens, nodes lit along a lens track, thin lines, minimal.
 */

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader light />
      <main className="methodology">
        {/* 1. Hero */}
        <section className="band soft methodology-hero">
          <div className="wrap methodology-hero__inner">
            <div className="methodology-hero__copy">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Methodology
              </span>
              <h1 className="title">
                A scientific methodology for evaluating{" "}
                <span className="grad-word">pitch decks</span>
              </h1>
              {/* draft subhead from brief §1 Hero */}
              <p className="sub">
                EvalLense evaluates decks against explicit criteria through an
                AI jury — with transparent reasoning and a human in the loop for
                the final decision.
              </p>
              <div className="cta-row">
                {/* final target is /company/contact once that route exists; for now anchor to the homepage demo section to avoid a 404 */}
                <a className="btn btn-primary" href="/#demo">
                  Book a Demo
                </a>
              </div>
            </div>
            {/* hero image placeholder — see prompt comment at top of file */}
            <div
              className="methodology-hero__media"
              role="img"
              aria-label="Abstract lens focusing noise into one clear signal"
            ></div>
          </div>
        </section>

        {/* 2. Принципы оценки */}
        <section className="band">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Principles
              </span>
              <h2 className="title">Principles of evaluation</h2>
              <p className="sub">
                Three principles keep the result reproducible and trustworthy.
              </p>
            </div>
            <div className="trust-grid">
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Criteria-based
                </span>
                <h3>Criteria-based evaluation</h3>
                <p>
                  Decks are scored against pre-defined criteria, not a general
                  impression.
                </p>
              </article>
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Evidence
                </span>
                <h3>Evidence over opinion</h3>
                <p>
                  We show what we found, where it came from, and what is
                  missing — no bare score without justification.
                </p>
              </article>
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Human-decided
                </span>
                <h3>AI prepares, humans decide</h3>
                <p>
                  The AI output is advisory; the final decision is always made
                  by a person.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Конвейер оценки — own .methodology markup (not #workflow scoped CSS) */}
        <section className="band soft">
          <div className="wrap">
            <div className="head">
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
            <ol className="pipe" aria-label="Evaluation pipeline">
              <li className="pipe-node is-lit">
                <span className="pipe-dot" aria-hidden="true"></span>
                <span className="pipe-name">Decode</span>
              </li>
              <li className="pipe-node is-lit">
                <span className="pipe-dot" aria-hidden="true"></span>
                <span className="pipe-name">Judges</span>
              </li>
              <li className="pipe-node is-lit">
                <span className="pipe-dot" aria-hidden="true"></span>
                <span className="pipe-name">Summarize</span>
              </li>
              <li className="pipe-node is-lit">
                <span className="pipe-dot" aria-hidden="true"></span>
                <span className="pipe-name">Score</span>
              </li>
              <li className="pipe-node is-lit">
                <span className="pipe-dot" aria-hidden="true"></span>
                <span className="pipe-name">Report</span>
              </li>
            </ol>
            {/* pipeline image placeholder — see prompt comment at top of file */}
            <div
              className="pipe-media"
              role="img"
              aria-label="Horizontal track of evaluation nodes lit along a lens track"
            ></div>
          </div>
        </section>

        {/* 4. Роли судей */}
        <section className="band">
          <div className="wrap">
            <div className="head">
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
            <div className="trust-grid">
              <article className="tcard">
                <span className="mini-tag">P1</span>
                <h3>Criterion P1</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
              <article className="tcard">
                <span className="mini-tag">P2</span>
                <h3>Criterion P2</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
              <article className="tcard">
                <span className="mini-tag">P3</span>
                <h3>Criterion P3</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
              <article className="tcard">
                <span className="mini-tag">P4</span>
                <h3>Criterion P4</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
              <article className="tcard">
                <span className="mini-tag">P5</span>
                <h3>Criterion P5</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
              <article className="tcard">
                <span className="mini-tag">P6</span>
                <h3>Criterion P6</h3>
                <p>Draft — public description pending (see open questions).</p>
              </article>
            </div>
          </div>
        </section>

        {/* 5. Scoring model — own .methodology markup (score + confidence ring) */}
        <section className="band soft">
          <div className="wrap">
            <div className="head">
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
            <div className="score">
              <div className="score-card">
                <span className="mini-tag">Evidence-linked</span>
                <h3 className="score-title">Score breakdown</h3>
                <p>
                  Each criterion contributes to the aggregate, with the source
                  quote and page reference attached. Where evidence is absent,
                  the deck is flagged rather than guessed.
                </p>
              </div>
              <div className="score-confidence">
                {/* confidence ring filled via conic-gradient — static, full
                    state so reduced-motion is satisfied trivially */}
                <div
                  className="ring"
                  role="img"
                  aria-label="Confidence ring"
                >
                  <span className="ring-label">Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Rubric system */}
        <section className="band">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Rubric
              </span>
              <h2 className="title">Rubric system</h2>
              {/* draft from brief §6 Rubric system */}
              <p className="sub">
                A single rubric defines the criteria and levels judges score
                against — that is what makes results comparable across decks.
              </p>
            </div>
            <div className="trust-grid">
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Criteria
                </span>
                <h3>Shared criteria</h3>
                <p>
                  Draft — every deck is measured against the same set of
                  criteria (exact descriptors pending).
                </p>
              </article>
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Levels
                </span>
                <h3>Defined levels</h3>
                <p>
                  Draft — each criterion has defined levels (specific
                  descriptors not yet fixed).
                </p>
              </article>
              <article className="tcard">
                <span className="chip">
                  <span className="tick" aria-hidden="true"></span>
                  Comparable
                </span>
                <h3>Comparable results</h3>
                <p>
                  The shared rubric is what makes scores comparable between
                  decks.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 7. Human-in-the-loop — own .methodology markup */}
        <section className="band soft">
          <div className="wrap">
            <div className="head">
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
            <div className="hitl">
              <div className="hitl-step">
                <span className="mini-tag">AI</span>
                <h3>Advisory output</h3>
                <p>
                  The AI jury prepares an evidence-backed recommendation — it
                  does not decide.
                </p>
              </div>
              <span className="hitl-arrow" aria-hidden="true">
                →
              </span>
              <div className="hitl-step hitl-step--human">
                <span className="mini-tag">Human</span>
                <h3>Final decision</h3>
                <p>
                  A person with a named role reviews the advisory output and
                  makes the call.
                </p>
              </div>
            </div>
            <p className="hitl-audit">
              Audit — every final decision records who decided and when.
            </p>
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className="band ink">
          <div className="wrap head">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Get started
            </span>
            <h2 className="title">See the methodology on your own decks</h2>
            <p className="sub">
              Book a demo and watch the evaluation run end to end.
            </p>
            <div className="sect-cta">
              {/* final target is /company/contact once that route exists; for now anchor to the homepage demo section to avoid a 404 */}
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
