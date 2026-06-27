import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  EditorialSplit,
  Gallery,
  PinnedSteps,
  StatBand,
  QuietCta,
  Eyebrow,
} from "@/components/ds";

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
    "How EvalLense makes score stability measurable: deterministic aggregation, benchmarked judge repeatability, judge spread, and bias controls — inspectable, not just promised.",
};

/* ── Content (verbatim from the page-composer brief). No invented
 * numbers/claims — benchmark figures are the measured repeatability run; the
 * target metrics stay framed as targets in the §7 caption block. ── */

/* 3. Reliability mechanisms — Gallery lane. */
const MECHANISMS = [
  {
    tag: "Dimensions",
    title: "Fixed dimensions (P1–P6)",
    body: "Every deck is scored against the same six dimensions.",
  },
  {
    tag: "Judges",
    title: "Specialized judges",
    body: "Each judge evaluates one dimension using its own rubric.",
  },
  {
    tag: "Independence",
    title: "Independent outputs",
    body: "Judges score independently and never see one another's results.",
  },
  {
    tag: "Routing",
    title: "Routing matrix",
    body: "Defines how much each judge contributes to every dimension.",
  },
  {
    tag: "Math",
    title: "Deterministic aggregation",
    body: "The same inputs and weights always produce the same total.",
  },
  {
    tag: "Spread",
    title: "Visible disagreement",
    body: "Differences between judges are measured and shown in the report.",
  },
  {
    tag: "Human",
    title: "Human review",
    body: "Uncertain and contested cases are flagged for a person to review.",
  },
];

/* 5. Spread thresholds — PinnedSteps. */
const SPREAD_STEPS = [
  {
    num: "< 1.5",
    label: "Consensus",
    desc: "Judges agree — the dimension reads the same way across the jury.",
  },
  {
    num: "1.5 – 2.99",
    label: "Split",
    desc: "Judges diverge — worth a closer read of where the views part.",
  },
  {
    num: "≥ 3.0",
    label: "Conflict",
    desc: "Strong disagreement — the report flags this dimension for human attention.",
  },
];

/* 6. Bias controls — risk → control. Page-local `.bias-grid` markup. */
const BIAS_ROWS = [
  {
    risk: "Halo effect",
    control: "Dimensions P1–P6 split across separate judges.",
  },
  {
    risk: "Generic scoring",
    control: "Dimension-specific prompts and rubrics per judge.",
  },
  {
    risk: "Overweighting presentation",
    control: "Pitch Quality is visible but doesn't dominate the score.",
  },
  {
    risk: "Hidden disagreement",
    control: "Spread plus the judge contribution matrix.",
  },
  {
    risk: "AI overreach",
    control: "The AI Total Score is advisory only; the human decides.",
  },
  {
    risk: "Assumption-filling",
    control: "Missing evidence becomes a gap or a question, not a guess.",
  },
];

/* 7. Benchmark — measured repeatability run. */
const BENCHMARK_STATS = [
  {
    value: "0.096",
    label: "Score standard deviation across 24 reruns of the same deck",
    src: "Basalt Coin benchmark",
  },
  {
    value: "~60% lower",
    label: "Run-to-run variance after our latest anti-bias prompt",
    src: "vs the prior prompt",
  },
  {
    value: "~86%",
    label: "Reruns that reproduced the identical dimension profile",
    src: "12 of 14",
  },
  {
    value: "<1%",
    label: "Deterministic aggregation tolerance (same inputs → same total)",
    src: "Summarizer Function 1",
  },
];

export default function ConsistencyReliabilityPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds">
        {/* 1. Hero — StatementHero, soft. */}
        <StatementHero
          id="hero"
          surface="light"
          eyebrow="Consistency & Reliability"
          titleLead="Reliability you can "
          titleAccent="inspect"
          titleTrail=", not just trust"
          sub="EvalLense shows which scores stay stable, where judges disagree, and when a human decision is needed. It also tracks how results change across repeated runs."
          ctas={[{ label: "Book a Demo", href: "/company/contact" }]}
          media={{
            ratio: "16/9",
            label: "Image · twin lenses · 16:9",
            hint: "Two lenses, same average, different scatter density — lens-gradient violet→cyan→aqua, calm",
            ariaLabel:
              "Two lenses with the same average but a different scatter of judge points",
          }}
        />

        {/* 2. The problem with one number — local EditorialSplit v1 layout with a
            real image in the media slot (page-local; shared component untouched). */}
        <section id="one-number" className="band soft ds-split" aria-label="The problem with one number">
          <div className="wrap ds-split__grid" data-version={1}>
            <div className="ds-split__copy" data-reveal="left">
              <Eyebrow>The problem with one number</Eyebrow>
              <h2 className="title ds-split__title">
                An average can hide <span className="grad-word">disagreement</span>
              </h2>
              <p className="sub">
                Two decks can have the same average score. One may have broad agreement. The other may split the judges. The average alone won&apos;t show the difference.
              </p>
              <ul className="ds-split__points">
                {[
                  { title: "Clear cases", body: "The judges broadly agree on the result." },
                  { title: "Contested cases", body: "The same average can hide very different opinions." },
                  { title: "False precision", body: "A precise score can still carry real uncertainty." },
                ].map((pt, i) => (
                  <li key={i} className="ds-split__point">
                    <span className="ds-split__point-dot" aria-hidden="true" />
                    <h3 className="ds-split__point-h">{pt.title}</h3>
                    <p className="ds-split__point-p">{pt.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Two split dials (transparent, no white card): consensus | conflict,
                spread with a gap, each label centred above its dial. */}
            <figure
              className="ds-split__media"
              aria-label="Two judge panels at the same AI Score of 7.7 — one in consensus, one in conflict"
              style={{
                margin: 0,
                display: "flex",
                gap: "clamp(20px,4vw,56px)",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {(
                [
                  { kicker: "CONSENSUS", sub: "Judges agree", src: "/assets/consistency/consensus-dial.webp", w: 680, h: 680 },
                  { kicker: "CONFLICT", sub: "Judges are split", src: "/assets/consistency/conflict-dial.webp", w: 680, h: 681 },
                ] as const
              ).map((d) => (
                <div key={d.kicker} style={{ flex: "1 1 0", minWidth: 0, textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "clamp(13px,1.5vw,17px)",
                      letterSpacing: ".1em",
                      background: "var(--lens)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {d.kicker}
                  </div>
                  <div style={{ fontSize: "clamp(12px,1.3vw,15px)", color: "var(--muted)", marginTop: "2px" }}>
                    {d.sub}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.src}
                    alt=""
                    width={d.w}
                    height={d.h}
                    style={{ display: "block", width: "100%", height: "auto", marginTop: "clamp(10px,1.6vw,20px)" }}
                  />
                </div>
              ))}
            </figure>
          </div>
        </section>

        {/* 3. Reliability mechanisms — Gallery, light. */}
        <Gallery
          id="mechanisms"
          surface="light"
          eyebrow="How reliability is built"
          title="Reliable scoring is built, not assumed"
          accentWords={["built"]}
          sub="Fixed criteria, independent judges, deterministic aggregation, and visible disagreement make every result easier to inspect."
          laneLabel="The seven reliability mechanisms"
          items={MECHANISMS}
        />

        {/* 4. Two layers — EditorialSplit, soft. */}
        <EditorialSplit
          surface="light"
          eyebrow="Two layers"
          titleLead="One layer is guaranteed, the other is measured"
          sub="EvalLense separates the math from the judgment — and holds each to its own standard."
          points={[
            {
              title: "Aggregation — deterministic.",
              body: "Once the judges' outputs exist, the score is pure math (Summarizer Function 1, no LLM). The same judge outputs and the same weights produce the same AI Total Score every time — within 1%.",
            },
            {
              title: "Judges — measured for repeatability.",
              body: "The AI judge layer runs on a language model, so it isn't bit-for-bit identical. We benchmark it: in repeated runs of the same deck, our latest anti-bias prompt cut run-to-run variance by about 60%, and the deck reproduced the same dimension profile in roughly 86% of runs (internal single-deck repeatability test — see Benchmark evidence).",
            },
          ]}
          media={{
            ratio: "4/3",
            label: "Diagram · confidence ring · 4:3",
            hint: "A confidence ring filling as evidence accumulates",
            ariaLabel: "Confidence ring filling as evidence accumulates",
          }}
        />

        {/* 5. Spread — PinnedSteps, light. */}
        <PinnedSteps
          id="spread"
          surface="light"
          ariaLabel="Spread — judge disagreement thresholds"
          eyebrow="Disagreement, in the open"
          title={{ line1: "When judges split,", line2: "the report says so" }}
          sub="EvalLense tracks the spread between judges on each dimension and turns it into a plain label. A high spread doesn't lower the score automatically — it routes your attention to the decks worth a closer look. It's a signal, not a penalty."
          steps={SPREAD_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · spread scale · 4:3",
            hint: "Consensus → Split → Conflict axis, judge points converge then diverge, three zones lit",
            ariaLabel:
              "Consensus to Conflict axis where judge points converge and diverge",
          }}
        />

        {/* 6. Bias controls — page-local `.bias-grid` (CSS already in
            globals.css), light. risk → control. */}
        <section className="consistency band consistency-bias">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Bias controls
              </span>
              <h2 className="title">Every common bias has a built-in check</h2>
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

        {/* 7. Benchmark evidence — StatBand, ink (measured run). Direct cut into
            the ink peak — no gradient transition (per project preference). */}
        <StatBand
          id="benchmark"
          surface="ink"
          eyebrow="Measured, not asserted"
          title="We benchmark the scoring — and publish what we find"
          stats={BENCHMARK_STATS}
          media={{
            ratio: "21/9",
            label: "Image · benchmark band · 21:9",
            hint: "Stat band of measured SD / variance / reproducibility, bars with one lens accent on ink",
            ariaLabel: "Stat band of measured repeatability metrics",
          }}
        />

        {/* 7b. Benchmark caption — page-local, on the SAME ink surface so it
            reads as one unit with the StatBand. StatBand has no `sub` prop, so
            its intro line opens this block; then scope, targets, product
            story, in order. Visually quiet. */}
        <section className="consistency band ink consistency-benchmark">
          <div className="wrap">
            <p className="sub">
              We rerun controlled decks and measure whether the scores hold.
              Here&apos;s the latest repeatability run.
            </p>
            <p className="bench-scope">
              Internal repeatability benchmark — J-P5 Team Readiness, single
              deck (Basalt Coin), 24 runs, June 2026. Multi-deck regression
              across the full panel is in progress.
            </p>
            <p className="bench-targets">
              Targets on a controlled set: final-score stddev ≤ 3 · score-band
              consistency ≥ 90% · critical-risk recall ≥ 90% · schema-valid
              outputs ≥ 99% · regression pass ≥ 95%.
            </p>
            <p className="bench-story">
              The path from an Amazon Nova hackathon prototype and AI Jury to
              EvalLense ran through 400+ internal evaluation runs.
            </p>
          </div>
        </section>

        {/* 8. What we don't claim — EditorialSplit, soft. Direct cut. */}
        <EditorialSplit
          surface="light"
          eyebrow="What we don't claim"
          titleLead="Reliability has an honest edge"
          sub="EvalLense doesn't promise to predict a startup's success. It raises the quality of the evaluation — structured, evidence-linked, and checkable — and points you to the decisions that need you most."
          points={[
            {
              title: "Reliability signals",
              body: "Low confidence, high spread, and surfaced gaps help a person focus on the borderline, unstable, and high-stakes calls.",
            },
            {
              title: "The human decides",
              body: "Absolute calibration across every deck type is still being proven; that's why the human makes the final call.",
            },
          ]}
          media={{
            ratio: "4/3",
            label: "Diagram · signals → human · 4:3",
            hint: "Reliability signals routing a person to the borderline calls",
            ariaLabel:
              "Reliability signals guiding a person to the decisions that need them most",
          }}
        />

        {/* 9. Final CTA — QuietCta, ink. Direct cut. */}
        <QuietCta
          surface="ink"
          eyebrow="Get started"
          title="See how stable the scores are on your own decks"
          sub="Book a demo and watch consensus, spread, and reproducibility play out on a real batch."
          cta={{ label: "Book a Demo", href: "/company/contact" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
