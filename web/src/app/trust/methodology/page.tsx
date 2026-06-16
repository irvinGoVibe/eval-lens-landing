import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Pipeline", href: "#pipeline" },
    { label: "Report", href: "#report" },
    { label: "Rubric", href: "#rubric" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense Methodology — How AI Jury Evaluates Pitch Decks",
  description:
    "Transparent EvalLense methodology: criteria-based evaluation by an AI jury, evidence-linked scores, and a human in the decision loop.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/methodology/.
 *
 * 1. hero (section 1) — 16:9
 *    Abstract "lens" focusing noise into one clear signal.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no shield icons / security
 *    theatre.
 *
 * 2. pipeline diagram (section 3, beside the pinned conveyor) — 21:9
 *    Horizontal track of nodes Decode → Judges → Summarize → Score → Report.
 *    Prompt: same tokens, nodes lit along a lens track, thin connecting lines,
 *    minimal, on the dark ink surface.
 *
 * 3. report gallery (section 5 "Anatomy of a report") — five 4:3 cards:
 *    a) score + confidence ring (mono gradient number, conic ring)
 *    b) evidence quote pulled from a deck page with a page reference
 *    c) per-criterion breakdown bars (lens-filled horizontal bars)
 *    d) "missing evidence" amber flag chip
 *    e) side-by-side deck comparison rows with gradient scores
 *    Prompt per card: Apple-neutral panel, hairline borders, one lens accent,
 *    calm, product-UI fidelity.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── DRAFT CONTENT ────────────────────────────────────────────────────────
 * Unconfirmed copy (P1–P6 roles, scoring/confidence formula, rubric levels,
 * pipeline step descriptions, hero tagline, public numbers) is kept as the
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

/* Draft — public descriptions of the criteria are pending (open question). */
const JUDGE_ROLES = [
  { id: "P1", title: "Criterion P1" },
  { id: "P2", title: "Criterion P2" },
  { id: "P3", title: "Criterion P3" },
  { id: "P4", title: "Criterion P4" },
  { id: "P5", title: "Criterion P5" },
  { id: "P6", title: "Criterion P6" },
];

/* "Anatomy of a report" gallery — each card describes one report artefact and
   carries a visible .media-ph for the visual that ships there. */
const REPORT_CARDS = [
  {
    tag: "Score",
    title: "Score + confidence ring",
    body: "A single comparable score, paired with a confidence ring that shows how strong the evidence behind it is.",
    label: "Image · score + confidence ring · 4:3",
    hint: "Mono gradient score with a conic confidence ring — see prompt 3a in file header",
    aria: "Score with a confidence ring",
  },
  {
    tag: "Evidence",
    title: "Evidence quote",
    body: "Every claim links back to the slide it came from — a source quote with a deck-page reference.",
    label: "Image · evidence quote + page ref · 4:3",
    hint: "Quote card pulled from a deck page with a page reference — see prompt 3b",
    aria: "Evidence quote with a deck-page reference",
  },
  {
    tag: "Breakdown",
    title: "Per-criterion breakdown",
    body: "How the score is built: a breakdown across criteria, shown as bars rather than a single opaque number.",
    label: "Image · breakdown bars · 4:3",
    hint: "Lens-filled horizontal breakdown bars per criterion — see prompt 3c",
    aria: "Per-criterion breakdown bars",
  },
  {
    tag: "Flags",
    title: "Missing-evidence flags",
    body: "Where the deck is silent, we say so. Gaps are flagged in amber — never guessed or filled in.",
    label: "Image · missing-evidence flag · 4:3",
    hint: "Amber 'missing evidence' flag chip on a neutral panel — see prompt 3d",
    aria: "Missing-evidence amber flag",
  },
  {
    tag: "Compare",
    title: "Side-by-side comparison",
    body: "Because every deck runs the same rubric, reports line up side by side for a like-for-like read.",
    label: "Image · comparison rows · 4:3",
    hint: "Side-by-side deck comparison rows with gradient scores — see prompt 3e",
    aria: "Side-by-side deck comparison",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="methodology">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
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
              <Button href="/#demo">Book a Demo</Button>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph methodology-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="Abstract lens focusing noise into one clear signal"
            >
              <span className="media-ph__label">Image · hero lens · 16:9</span>
              <span className="media-ph__hint">
                Lens-gradient violet→cyan→aqua over an Apple-neutral surface,
                soft depth, calm — see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Principles — editorial numbered lines, light. */}
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

        {/* 3. The evaluation pipeline — pinned multi-screen, DARK. Tall track +
            sticky stage; 5 steps light up sequentially via the pin engine.
            A pipeline-diagram .media-ph sits beside the steps. */}
        <section
          id="pipeline"
          className="band ink methodology-pipeline"
          data-pin
          data-pin-steps="5"
          aria-label="The evaluation pipeline"
        >
          <div className="pipe-stage" data-pin-stage>
            <div className="wrap pipe-grid">
              <div className="pipe-col">
                <div className="head pipe-head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Pipeline
                  </span>
                  <h2 className="title">The evaluation pipeline</h2>
                  {/* draft from brief §3 Конвейер оценки */}
                  <p className="sub">
                    Every deck runs through a fixed pipeline. Each step is
                    deterministic and reproducible — the same deck takes the
                    same path.
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
              {/* pipeline diagram visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph pipe-diagram"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Horizontal track of pipeline nodes Decode to Report"
              >
                <span className="media-ph__label">Diagram · pipeline · 4:3</span>
                <span className="media-ph__hint">
                  Nodes Decode → Judges → Summarize → Score → Report lit along a
                  lens track, thin lines — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 4. Judge roles — horizontal scroll-snap gallery, light. Each card
            carries a signal-dot + criterion. P1–P6 are draft. */}
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
            {JUDGE_ROLES.map((role) => (
              <li key={role.id} className="judge-card">
                <span className="judge-icon" aria-hidden="true">
                  <span className="judge-signal"></span>
                </span>
                <span className="mini-tag">{role.id}</span>
                <h3 className="judge-h">{role.title}</h3>
                <p className="judge-p">
                  Draft — public description pending (see open questions).
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Anatomy of a report — horizontal gallery, DARK. Five report
            artefacts, each with a visible .media-ph for its visual. */}
        <section id="report" className="band ink methodology-report">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Anatomy of a report
              </span>
              <h2 className="title">What you get</h2>
              <p className="sub">
                A report is never a bare number. Each one carries the score, the
                evidence behind it, the breakdown, the gaps and a like-for-like
                comparison.
              </p>
            </div>
          </div>
          <ul
            className="report-lane"
            data-reveal="up"
            aria-label="Anatomy of a report — score, evidence, breakdown, flags, comparison"
            tabIndex={0}
          >
            {REPORT_CARDS.map((card) => (
              <li key={card.tag} className="report-card">
                <figure
                  className="media-ph report-card__media"
                  style={{ ["--ratio" as string]: "4/3" }}
                  role="img"
                  aria-label={card.aria}
                >
                  <span className="media-ph__label">{card.label}</span>
                  <span className="media-ph__hint">{card.hint}</span>
                </figure>
                <div className="report-card__body">
                  <span className="mini-tag">{card.tag}</span>
                  <h3 className="report-card__h">{card.title}</h3>
                  <p className="report-card__p">{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Scoring model — editorial split + scrubbed ring + breakdown bars,
            light. Ring fills with scroll via --scrub. */}
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
              {/* visual breakdown bars — canonical tokens, decorative.
                  Draft levels — no public values are shown. */}
              <ul className="score-bars" aria-hidden="true">
                <li className="score-bar" style={{ ["--w" as string]: "82%" }}>
                  <span className="score-bar__name">Criterion</span>
                  <span className="score-bar__track">
                    <span className="score-bar__fill"></span>
                  </span>
                </li>
                <li className="score-bar" style={{ ["--w" as string]: "64%" }}>
                  <span className="score-bar__name">Criterion</span>
                  <span className="score-bar__track">
                    <span className="score-bar__fill"></span>
                  </span>
                </li>
                <li className="score-bar" style={{ ["--w" as string]: "47%" }}>
                  <span className="score-bar__name">Criterion</span>
                  <span className="score-bar__track">
                    <span className="score-bar__fill"></span>
                  </span>
                </li>
              </ul>
              <p className="score-note">
                Draft — illustrative breakdown; aggregation formula and public
                values are pending (see open questions).
              </p>
            </div>
            <div className="score-visual" data-reveal="right">
              {/* confidence ring — fills as it scrolls through the viewport via
                  --scrub; reduced-motion lands it at the full state */}
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

        {/* 7. Rubric system — full-bleed statement, DARK. */}
        <section id="rubric" className="band ink methodology-rubric">
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
              One <span className="grad-word">rubric</span> — shared criteria and
              defined levels — is what makes scores comparable across decks.
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

        {/* 8. Human-in-the-loop — editorial split, light. AI-green only as the
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

        {/* 9. Final CTA — quiet CTA, DARK. */}
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
