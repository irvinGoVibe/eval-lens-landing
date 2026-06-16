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
    { label: "Mechanisms", href: "#mechanisms" },
    { label: "Spread", href: "#spread" },
    { label: "Benchmark", href: "#benchmark" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Consistency & Reliability of Pitch Evaluation",
  description:
    "How EvalLense makes evaluation stability visible: deterministic math, judge spread, bias controls and validation on a controlled benchmark set.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/consistency/.
 *
 * 1. hero (section 1) — 16:9
 *    Two "lenses" with the same average but a different scatter density of
 *    judge points.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre.
 *
 * 2. spread scale (section 5, beside the pinned thresholds) — 4:3
 *    A Consensus → Split → Conflict axis where judge points converge / diverge.
 *    Prompt: same tokens, thin lines, three zones lit by their thresholds.
 *
 * 3. benchmark band (section 7) — 21:9
 *    A stat band: 10 variants × repeated runs, stable bars.
 *    Prompt: ink surface, bars with a single lens accent, minimal.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief (A(d) formula, Spread thresholds,
 * confidence weights 0.55 / 0.70 / 0.85, benchmark target metrics). Real
 * numbers are used; benchmark thresholds are framed as "targets on a
 * controlled set", not guarantees (see story 06 open questions).
 */

/* 3. Reliability mechanisms — bento tiles (reliability-framework.md). */
const MECHANISMS = [
  {
    tag: "Dimensions",
    title: "Fixed Pitch dimensions",
    body: "P1–P6 keep the criteria from drifting between runs — every deck is read against the same lenses.",
    feature: true,
  },
  {
    tag: "Judges",
    title: "Specialized AI judges",
    body: "J-P1…J-P6 split the evaluation into separate lenses instead of one all-seeing verdict.",
  },
  {
    tag: "Independence",
    title: "Independent judge outputs",
    body: "Judges don't see each other's scores, which reduces group influence.",
  },
  {
    tag: "Routing",
    title: "Routing Matrix",
    body: "Controls how much each judge contributes per dimension.",
  },
  {
    tag: "Math",
    title: "Deterministic math",
    body: "Aggregation is reproducible and auditable — the same inputs give the same score.",
  },
  {
    tag: "Spread",
    title: "Spread",
    body: "Surfaces judge disagreement instead of hiding it behind an average.",
  },
  {
    tag: "Human",
    title: "Human review",
    body: "Keeps the final decision accountable to a named person.",
  },
];

/* 5. Spread thresholds — steps revealed through the pin engine. */
const SPREAD_STEPS = [
  {
    range: "< 1.5",
    label: "Consensus",
    desc: "Judges agree — the dimension reads the same way across the jury.",
  },
  {
    range: "1.5 – 2.99",
    label: "Split",
    desc: "Judges diverge — worth a closer read of where the views part.",
  },
  {
    range: "≥ 3.0",
    label: "Conflict",
    desc: "Strong disagreement — the report flags this dimension for human attention.",
  },
];

/* 6. Bias controls — risk → control (reliability-framework.md). */
const BIAS_ROWS = [
  {
    risk: "Halo effect",
    control: "P1–P6 dimensions split across separate judges.",
  },
  {
    risk: "Generic scoring",
    control: "Dimension-specific judge prompts and rubrics.",
  },
  {
    risk: "Overweighting presentation",
    control: "Pitch Quality is visible but never allowed to dominate.",
  },
  {
    risk: "Hidden disagreement",
    control: "Spread(d) plus a judge contribution matrix.",
  },
  {
    risk: "AI overreach",
    control: "AI Total Score stays advisory only.",
  },
  {
    risk: "Assumption filling",
    control: "Missing evidence becomes a gap or a question, never a guess.",
  },
];

/* 7. Benchmark evidence — confirmed target metrics (benchmarking-methodology.md,
   "Good" column). Framed as targets on a controlled set. */
const BENCHMARK_STATS = [
  {
    value: "≤ 3",
    label: "Final score stddev across runs",
    source: "benchmarking-methodology.md",
  },
  {
    value: "≥ 90%",
    label: "Score band consistency",
    source: "benchmarking-methodology.md",
  },
  {
    value: "≥ 85%",
    label: "Recommendation consistency",
    source: "benchmarking-methodology.md",
  },
  {
    value: "≥ 90%",
    label: "Critical risk recall",
    source: "benchmarking-methodology.md",
  },
  {
    value: "≥ 99%",
    label: "Schema-valid outputs",
    source: "benchmarking-methodology.md",
  },
  {
    value: "≥ 95%",
    label: "Regression pass rate after changes",
    source: "benchmarking-methodology.md",
  },
];

export default function ConsistencyReliabilityPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="consistency">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft consistency-hero">
          <div className="wrap consistency-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Consistency &amp; Reliability
            </span>
            <h1
              className="consistency-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Reliability you can{" "}
              <span className="grad-word">inspect</span>, not just trust
            </h1>
            <p
              className="sub consistency-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense shows where evaluations are stable, where judges diverge
              and where the decision is better left to a person — stability is
              made visible, not promised.
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
              className="media-ph consistency-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="Two lenses with the same average but different scatter of judge points"
            >
              <span className="media-ph__label">Image · twin lenses · 16:9</span>
              <span className="media-ph__hint">
                Two lenses, same average, different scatter density —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file
                header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Why averaging is dangerous — editorial split, light. */}
        <section className="band consistency-average">
          <div className="wrap avg-split">
            <div className="avg-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Why averaging hides risk
              </span>
              <h2 className="title">Two decks, one average</h2>
              <p className="sub">
                Averages hide conflict. Two decks can carry the same mean score,
                yet one has broad agreement across judges and the other a serious
                disagreement. A decision team needs to know where to focus.
              </p>
              <ul className="avg-points">
                <li className="avg-point">
                  Some decks are clear leaders or clear outliers.
                </li>
                <li className="avg-point">
                  Some decks split the judges and need a second look.
                </li>
                <li className="avg-point">
                  A score can look precise while hiding real uncertainty.
                </li>
              </ul>
            </div>
            <div className="avg-decks" data-reveal="right">
              <div className="avg-deck avg-deck--consensus">
                <span className="mini-tag">Deck A · agreement</span>
                <span className="avg-deck__score">7.4</span>
                <ul className="avg-dots" aria-hidden="true">
                  <li style={{ ["--y" as string]: "0%" }}></li>
                  <li style={{ ["--y" as string]: "-4%" }}></li>
                  <li style={{ ["--y" as string]: "3%" }}></li>
                  <li style={{ ["--y" as string]: "-2%" }}></li>
                </ul>
                <p className="avg-deck__note">Judges cluster — low spread.</p>
              </div>
              <div className="avg-deck avg-deck--conflict">
                <span className="mini-tag">Deck B · conflict</span>
                <span className="avg-deck__score">7.4</span>
                <ul className="avg-dots" aria-hidden="true">
                  <li style={{ ["--y" as string]: "-34%" }}></li>
                  <li style={{ ["--y" as string]: "28%" }}></li>
                  <li style={{ ["--y" as string]: "-18%" }}></li>
                  <li style={{ ["--y" as string]: "30%" }}></li>
                </ul>
                <p className="avg-deck__note">
                  Same mean — judges disagree, high spread.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Reliability mechanisms — bento / feature grid, DARK. */}
        <section id="mechanisms" className="band ink consistency-mechanisms">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Mechanisms
              </span>
              <h2 className="title">What makes the evaluation reliable</h2>
              <p className="sub">
                Reliability is a structured process, not an identical proposal on
                every run. The numeric layer is deterministic once the judges'
                findings are ready.
              </p>
            </div>
            <ul className="mech-grid" data-reveal="up">
              {MECHANISMS.map((m) => (
                <li
                  key={m.tag}
                  className={
                    m.feature ? "mech-tile mech-tile--feature" : "mech-tile"
                  }
                >
                  <span className="mini-tag">{m.tag}</span>
                  <h3 className="mech-h">{m.title}</h3>
                  <p className="mech-p">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Deterministic math — editorial split + scrubbed ring, light. */}
        <section className="band soft consistency-math">
          <div className="wrap math-split">
            <div className="math-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Deterministic math
              </span>
              <h2 className="title">Same inputs, same score</h2>
              <p className="sub">
                Aggregation is a Function 1 Summarizer with no LLM. The same set
                of judge outputs and the same criterion weights produce the same
                AI Total Score — numeric tolerance under 1%.
              </p>
              <div className="math-formulas">
                <p className="math-formula">
                  <span className="math-formula__name">
                    AI Criterion Score
                  </span>
                  <code className="math-formula__expr">
                    A(d) = R(d) · [1 − 0.15 · (1 − C(d))]
                  </code>
                </p>
                <p className="math-formula">
                  <span className="math-formula__name">AI Total Score</span>
                  <code className="math-formula__expr">
                    AI Total Score = Σ<sub>d</sub> w(d) · A(d)
                  </code>
                </p>
              </div>
              <ul className="math-weights" aria-label="Confidence weights">
                <li className="math-weight">
                  <span className="math-weight__k">low</span>
                  <span className="math-weight__v">0.55</span>
                </li>
                <li className="math-weight">
                  <span className="math-weight__k">medium</span>
                  <span className="math-weight__v">0.70</span>
                </li>
                <li className="math-weight">
                  <span className="math-weight__k">high</span>
                  <span className="math-weight__v">0.85</span>
                </li>
              </ul>
              <p className="math-note">
                R(d) is the weighted mean of judge scores, C(d) the weighted
                confidence. Narrative (Function 2) explains the result and may
                not contradict the math.
              </p>
            </div>
            <div className="math-visual" data-reveal="right">
              {/* confidence ring — fills as it scrolls through the viewport via
                  --scrub; reduced-motion lands it at the full state */}
              <div
                className="conf-ring"
                data-scrub
                role="img"
                aria-label="Confidence ring filling as evidence accumulates"
              >
                <span className="conf-ring__label">Confidence C(d)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Spread — pinned multi-screen, DARK. Three thresholds light up. */}
        <section
          id="spread"
          className="band ink consistency-spread"
          data-pin
          data-pin-steps="3"
          aria-label="Spread — judge disagreement thresholds"
        >
          <div className="spread-stage" data-pin-stage>
            <div className="wrap spread-grid">
              <div className="spread-col">
                <div className="head spread-head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Spread
                  </span>
                  <h2 className="title">Spread — how far judges diverge</h2>
                  <p className="sub">
                    EvalLense tracks Spread(d) between judges and turns it into a
                    readable label. High spread does not lower the score — it
                    routes attention to where the report deserves a closer read.
                  </p>
                </div>
                <ol className="spread-track">
                  {SPREAD_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="spread-step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="spread-range">{s.range}</span>
                      <span className="spread-label">{s.label}</span>
                      <span className="spread-desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* spread scale visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph spread-scale"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Consensus to Conflict axis where judge points converge and diverge"
              >
                <span className="media-ph__label">
                  Image · spread scale · 4:3
                </span>
                <span className="media-ph__hint">
                  Consensus → Split → Conflict axis, judge points converge then
                  diverge, three zones lit — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 6. Bias controls — feature grid, light. risk → control. */}
        <section className="band consistency-bias">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Bias controls
              </span>
              <h2 className="title">A control for every typical risk</h2>
              <p className="sub">
                Each common evaluation risk maps to a built-in control, so the
                process leans on structure rather than goodwill.
              </p>
            </div>
            <ul className="bias-grid" data-reveal="up">
              {BIAS_ROWS.map((row) => (
                <li key={row.risk} className="bias-row">
                  <span className="bias-risk">
                    <span className="mini-tag">Risk</span>
                    {row.risk}
                  </span>
                  <span className="bias-arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="bias-control">
                    <span className="mini-tag">Control</span>
                    {row.control}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Benchmark evidence — stat band, DARK. */}
        <section id="benchmark" className="band ink consistency-benchmark">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Benchmark evidence
              </span>
              <h2 className="title">Checked on a controlled set, not on faith</h2>
              <p className="sub">
                Benchmark v1 runs 10 pitch variants (strong / average / weak /
                false-claim / incomplete / noisy) with 3 repeated runs each,
                every run compared against a fixed ground truth. Targets below
                are goals on a controlled set, not guarantees on any data.
              </p>
            </div>
            <ul className="bench-grid" data-reveal="up">
              {BENCHMARK_STATS.map((s, i) => (
                <li
                  key={s.label}
                  className="bench-stat"
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <span className="bench-value">{s.value}</span>
                  <span className="bench-label">{s.label}</span>
                  <span className="bench-source">{s.source}</span>
                </li>
              ))}
            </ul>
            {/* benchmark band visual slot — see prompt 3 in file header */}
            <figure
              className="media-ph bench-band"
              style={{ ["--ratio" as string]: "21/9" }}
              data-reveal="up"
              role="img"
              aria-label="Stat band of 10 variants by repeated runs with stable bars"
            >
              <span className="media-ph__label">
                Image · benchmark band · 21:9
              </span>
              <span className="media-ph__hint">
                10 variants × 3 repeated runs, stable bars, single lens accent on
                ink — see prompt 3 in file header
              </span>
            </figure>
            <p className="bench-story">
              The path from an Amazon Nova hackathon prototype and AI Jury to
              EvalLense ran through 400+ internal runs and consistency checks.
            </p>
          </div>
        </section>

        {/* 8. Reliability boundary + escalation — editorial split, light. */}
        <section className="band soft consistency-boundary">
          <div className="wrap boundary-split">
            <div className="boundary-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The boundary
              </span>
              <h2 className="title">What reliability does not promise</h2>
              <p className="sub">
                EvalLense does not claim to predict a startup's success. The goal
                is higher evaluation quality — a structured, evidence-linked and
                inspectable process, not a verdict on the future.
              </p>
            </div>
            <div className="boundary-flow" data-reveal="right">
              <div className="boundary-node">
                <span className="mini-tag">Signals</span>
                <h3 className="boundary-h">Reliability signals</h3>
                <p className="boundary-p">
                  Low confidence, high spread and found gaps surface where a
                  result is least settled.
                </p>
              </div>
              <span className="boundary-arrow" aria-hidden="true">
                →
              </span>
              <div className="boundary-node boundary-node--human">
                <span className="mini-tag">Human</span>
                <h3 className="boundary-h">Focused human review</h3>
                <p className="boundary-p">
                  Those signals guide a person to borderline, unstable and
                  high-impact decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Final CTA — quiet CTA, DARK. */}
        <section className="band ink consistency-cta">
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
              See what evaluation stability looks like on your decks
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch consensus, spread and escalation play out end
              to end.
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
