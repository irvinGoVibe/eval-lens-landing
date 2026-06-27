import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  EditorialSplit,
  Cinema,
  PinnedSteps,
  Eyebrow,
} from "@/components/ds";
import Image from "next/image";
import { BentoHorse } from "@/components/sections/BentoHorse";
import { Button } from "@/components/ui/Button";
import { DelayedLoopVideo } from "@/components/DelayedLoopVideo";

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

/* 5. Spread thresholds — PinnedSteps. */
const SPREAD_STEPS = [
  {
    num: "< 1.5",
    label: "Consensus",
    desc: "Judges agree. The dimension reads the same way across the jury.",
  },
  {
    num: "1.5 – 2.99",
    label: "Split",
    desc: "Judges diverge. It is worth checking where the views split.",
  },
  {
    num: "≥ 3.0",
    label: "Conflict",
    desc: "Strong disagreement. The report flags this dimension for human review.",
  },
];

/* 6. Bias controls — risk → control. Page-local `.bias-grid` markup. */
const BIAS_ROWS = [
  {
    risk: "Halo effect",
    control: "Dimensions are split across separate judges.",
  },
  {
    risk: "Generic scoring",
    control: "Dimension-specific prompts and criteria per judge.",
  },
  {
    risk: "Overweighting presentation",
    control: "Pitch Quality is visible, but it does not dominate the score.",
  },
  {
    risk: "Hidden disagreement",
    control: "Spread plus the judge contribution matrix.",
  },
  {
    risk: "AI overreach",
    control: "The AI Total Score is advisory. The human decides.",
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
    src: "Internal benchmark deck",
  },
  {
    value: "~60% lower",
    label: "Run-to-run variance after our latest calibration prompt",
    src: "vs the prior prompt",
  },
  {
    value: "~86%",
    label: "Reruns that reproduced the same dimension profile",
    src: "12 of 14",
  },
  {
    value: "<1%",
    label: "Aggregation consistency check (same inputs → same total)",
    src: "Deterministic aggregation function",
  },
];

/** One benchmark stat card — centred content, brand-gradient figure, white
 * approximation tilde. Page-local for the §7 bento. */
function BenchCard({ s }: { s: { value: string; label: string; src: string } }) {
  const tilde = s.value.startsWith("~");
  const num = tilde ? s.value.slice(1) : s.value;
  return (
    <div className="cr-bench-card" data-reveal="up">
      <strong className="cr-bench-value">
        {tilde ? <span className="cr-bench-approx">~</span> : null}
        {num}
      </strong>
      <span className="cr-bench-label">{s.label}</span>
      <span className="cr-bench-src">{s.src}</span>
    </div>
  );
}

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
          sub="EvalLense shows which scores stay stable, where judges disagree, and when human review is needed. It also tracks how results change across repeated runs."
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
                Two decks can have the same average score. One may have broad agreement. The other may split the judges. The average alone does not show the difference.
              </p>
              <ul className="ds-split__points">
                {[
                  { title: "Clear cases", body: "Judges broadly agree on the result." },
                  { title: "Contested cases", body: "The same average can hide very different judge opinions." },
                  { title: "False precision", body: "A precise score can still carry uncertainty." },
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

        {/* 3. How reliability is built — Cinema (ink), cinematic statement. */}
        <Cinema
          id="mechanisms"
          surface="ink"
          eyebrow="How reliability is built"
          headline="Reliable scoring is built, not assumed"
          lines={["Reliable scoring is", "built, not assumed"]}
          mobileLines={["Reliable scoring", "is built,", "not assumed"]}
          sub="Fixed criteria, independent judges, deterministic aggregation, and visible disagreement make every result easier to inspect — reliability is engineered into the pipeline, not taken on faith."
          media={{ videoSrc: "/assets/consistency/consistency-cta-bg.mp4" }}
        />

        {/* 4. Two layers — EditorialSplit, soft. */}
        <EditorialSplit
          surface="light"
          eyebrow="Two layers"
          titleLead="One layer is deterministic. The other is measured."
          sub="EvalLense separates the math from the judgment and holds each to its own standard."
          points={[
            {
              title: "Aggregation is deterministic.",
              body: "Once judge outputs exist, the score is calculated by a deterministic aggregation function, not another LLM call. The same judge outputs and weights produce the same AI Total Score every time, with only rounding-level tolerance.",
            },
            {
              title: "Judges are measured for repeatability.",
              body: "The AI judge layer runs on a language model, so repeated runs are not always identical. We benchmark that repeatability: in repeated runs of the same deck, our latest calibration prompt reduced run-to-run variance by about 60%, and the same deck reproduced the same dimension profile in roughly 86% of runs (internal single-deck repeatability test; see benchmark evidence below).",
            },
          ]}
          media={{
            ratio: "4/3",
            src: "/assets/consistency/ai-total-score-machine-4.webp",
            width: 1448,
            height: 1086,
            label: "Diagram · confidence ring · 4:3",
            hint: "A confidence ring filling as evidence accumulates",
            ariaLabel:
              "A glass aggregation machine combining judge scores into a single AI Total Score of 7.7",
          }}
        />

        {/* 5. Spread — PinnedSteps, light. Page-local: accent the threshold
            numbers with the lens gradient (scoped to #spread). */}
        <style>{`
          /* §5 Spread — page-local: lens-gradient threshold numbers; a FIXED
             number column so every label and description lines up; and all three
             rows fully lit (the component otherwise dims them 0.42→1 in sequence
             on scroll, which left SPLIT and CONFLICT greyed out). */
          #spread .lab-step__num{
            background: var(--lens);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            white-space: nowrap;
          }
          #spread .lab-step{
            opacity: 1 !important;
            grid-template-columns: clamp(108px, 11.5vw, 175px) 1fr;
          }

          /* §5 Spread — the three-target art is CUT into three separate lenses
             (assets spread-target-consensus|split|conflict, sliced from -04),
             each enlarged ~30% and floated OPPOSITE its threshold block:
             Consensus upper + right, Split centred, Conflict lower + right.
             Tune per lens via --w-* (size) and the top/left values below. */
          #spread .lab-process__node{ position: relative; z-index: 0; overflow: visible; }
          #spread .lab-process__copy{ position: relative; z-index: 2; }
          .cr-spread-scene{ position: relative; width: 100%; min-height: clamp(440px, 48vw, 600px); }
          .cr-spread-scene .cr-lens{
            position: absolute; height: auto; display: block;
            filter: drop-shadow(0 18px 42px rgba(60,40,160,.4));
          }
          .cr-lens--consensus{ width: var(--w-con, clamp(150px,16vw,200px)); top: 1%;  left: 30%; z-index: 1; }
          .cr-lens--split{     width: var(--w-spl, clamp(168px,18vw,224px)); top: 33%; left: 50%; transform: translateX(-50%); z-index: 3; }
          .cr-lens--conflict{  width: var(--w-cnf, clamp(166px,18vw,222px)); top: 63%; left: 42%; z-index: 2; }
          @media (max-width: 880px){
            .cr-spread-scene{ min-height: 0; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
            .cr-spread-scene .cr-lens{ position: static; transform: none; width: min(30%, 150px); }
          }
        `}</style>
        <PinnedSteps
          id="spread"
          surface="ink"
          ariaLabel="Spread — judge disagreement thresholds"
          eyebrow="Disagreement in the open"
          title={{ line1: "When judges", line1Accent: "split,", line2: "the report says so" }}
          sub="EvalLense tracks the spread between judges on each dimension and turns it into a clear label. A high spread does not lower the score automatically. It routes your attention to the decks worth a closer look. It is a signal, not a penalty."
          steps={SPREAD_STEPS}
          mediaNode={
            <div className="cr-spread-scene" aria-hidden="true">
              <Image
                className="cr-lens cr-lens--consensus"
                src="/assets/consistency/spread-target-consensus.webp"
                alt=""
                width={474}
                height={638}
                sizes="(max-width:880px) 30vw, 200px"
              />
              <Image
                className="cr-lens cr-lens--split"
                src="/assets/consistency/spread-target-split.webp"
                alt=""
                width={543}
                height={650}
                sizes="(max-width:880px) 30vw, 224px"
              />
              <Image
                className="cr-lens cr-lens--conflict"
                src="/assets/consistency/spread-target-conflict.webp"
                alt=""
                width={540}
                height={645}
                sizes="(max-width:880px) 30vw, 222px"
              />
            </div>
          }
          media={{
            ratio: "1692/930",
            label: "Image · disagreement targets · wide",
            hint: "Consensus, Split, and Conflict shown as three glass targets with clustered or scattered judge darts",
            ariaLabel:
              "Three glass targets labeled Consensus, Split, and Conflict, showing judge darts clustered in the center, partly split, or scattered",
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
              <h2 className="title">
                Common evaluation risks have{" "}
                <span className="grad-word">built-in checks</span>
              </h2>
              <p className="sub">
                Each common evaluation risk maps to a built-in control, so the
                process relies on structure rather than goodwill.
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

        {/* 7. Benchmark evidence — page-local bento, ink. Symmetric: two stat
            cards each side flanking the animated unicorn head (ported from the
            homepage bento, <BentoHorse/>) in the centre. Brand-gradient figures,
            white approximation tilde, centred content. Scoped <style> only — no
            shared DS component or globals.css touched. */}
        <section
          id="benchmark"
          className="consistency band ink consistency-benchmark-bento"
          aria-label="Benchmark evidence"
        >
          <style>{`
            .consistency-benchmark-bento{ position:relative; z-index:0; }
            /* All content sits above the backdrop video. The video lives INSIDE
               .wrap (in the grid) so the orb's mix-blend-screen still composites
               over it, while every card/text layer paints clearly in front. */
            .consistency-benchmark-bento .wrap{ position:relative; z-index:1; }
            .consistency-benchmark-bento .head{ text-align:center; }
            .consistency-benchmark-bento .cr-bench-grid{
              position:relative;
              display:grid;
              grid-template-columns:1fr minmax(300px,0.95fr) 1fr;
              gap:clamp(16px,2vw,28px);
              align-items:stretch;
              margin-top:clamp(36px,5vw,60px);
            }
            /* Looping benchmark backdrop — sits behind the cards + unicorn as a
               rounded rectangle whose edges feather + darken into the black band.
               z-index:-1 keeps it under the in-flow cards/orb; the section is a
               stacking context so the orb's mix-blend-screen composites over it.
               Page-local injection; shared components/globals untouched. */
            .consistency-benchmark-bento .cr-bench-video{
              position:absolute;
              inset:clamp(-56px,-5.5vw,-24px) clamp(-44px,-4.5vw,-18px);
              z-index:-1; border-radius:clamp(26px,3vw,40px); overflow:hidden;
              pointer-events:none;
              -webkit-mask-image:
                linear-gradient(to right, transparent, #000 11%, #000 89%, transparent),
                linear-gradient(to bottom, transparent, #000 13%, #000 87%, transparent);
              -webkit-mask-composite:source-in;
              mask-image:
                linear-gradient(to right, transparent, #000 11%, #000 89%, transparent),
                linear-gradient(to bottom, transparent, #000 13%, #000 87%, transparent);
              mask-composite:intersect;
            }
            .consistency-benchmark-bento .cr-bench-video video{
              width:100%; height:100%; object-fit:cover; display:block; opacity:.6;
            }
            .consistency-benchmark-bento .cr-bench-video::after{
              content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
              background:radial-gradient(125% 96% at 50% 46%, transparent 46%, rgba(5,4,12,.5) 80%, rgba(5,4,12,.92) 100%);
            }
            @media (prefers-reduced-motion: reduce){
              .consistency-benchmark-bento .cr-bench-video video{ opacity:.42; }
            }
            .consistency-benchmark-bento .cr-bench-col{
              position:relative; z-index:1;
              display:grid; gap:clamp(16px,2vw,28px); align-content:stretch;
            }
            .consistency-benchmark-bento .cr-bench-card{
              position:relative; z-index:1;
              display:flex; flex-direction:column; align-items:center; justify-content:center;
              text-align:center; gap:12px; padding:clamp(22px,2.6vw,34px);
              border-radius:20px; border:1px solid var(--border-on-dark);
              background:rgba(8,6,18,.58);
              -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);
            }
            /* The data-reveal scroll animation can leave these cards stuck at
               opacity:0 in this section; force them visible. They already sit
               above the backdrop video (the orb composites over it the same way). */
            .consistency-benchmark-bento .cr-bench-card[data-reveal]{ opacity:1 !important; transform:none !important; }
            .consistency-benchmark-bento .cr-bench-value{
              font-family:var(--font-display); font-weight:700; line-height:1;
              font-size:clamp(42px,5.2vw,66px);
              background:var(--lens); -webkit-background-clip:text; background-clip:text; color:transparent;
            }
            .consistency-benchmark-bento .cr-bench-approx{ -webkit-text-fill-color:#fff; color:#fff; }
            .consistency-benchmark-bento .cr-bench-label{
              font-family:var(--font-mono); font-size:12px; letter-spacing:.08em; text-transform:uppercase;
              color:var(--muted-on-dark); max-width:28ch;
            }
            .consistency-benchmark-bento .cr-bench-src{
              font-family:var(--font-mono); font-size:11px; color:rgba(255,255,255,.42);
            }
            .consistency-benchmark-bento .cr-bench-orb{
              position:relative; min-height:clamp(320px,34vw,420px);
            }
            @media (max-width:900px){
              .consistency-benchmark-bento .cr-bench-grid{ grid-template-columns:1fr 1fr; }
              .consistency-benchmark-bento .cr-bench-orb{ display:none; }
            }
            .consistency-benchmark{ text-align:center; }
            .consistency-benchmark .sub{ margin-left:auto; margin-right:auto; max-width:60ch; }
            .bench-cta{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:clamp(22px,3vw,34px); }
            .bench-details{ margin-top:clamp(18px,2.6vw,28px); }
            .bench-details > summary{ list-style:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:11.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted-on-dark); padding:7px 14px; border:1px solid var(--border-on-dark); border-radius:980px; background:rgba(255,255,255,.04); transition:color .2s ease, background .2s ease; }
            .bench-details > summary::-webkit-details-marker{ display:none; }
            .bench-details > summary::after{ content:"+"; font-size:14px; line-height:1; opacity:.7; }
            .bench-details[open] > summary::after{ content:"\\2212"; }
            .bench-details > summary:hover{ color:var(--fg-on-dark); background:rgba(255,255,255,.07); }
            /* glassmorphic violet card (matches the dsx-card--feature "isolation"
               card on the atoms board) — wraps the expanded scope/targets/story. */
            .bench-details__body{
              margin:clamp(16px,2.2vw,24px) auto 0; max-width:680px; text-align:left;
              display:grid; gap:clamp(14px,2vw,18px); padding:clamp(24px,3vw,36px);
              border-radius:22px;
              background:linear-gradient(135deg, color-mix(in oklab,var(--violet) 30%, transparent), color-mix(in oklab,var(--violet) 7%, transparent) 72%);
              border:1px solid color-mix(in oklab,var(--lavender) 34%, transparent);
              box-shadow:0 30px 80px -48px color-mix(in oklab,var(--violet) 60%, transparent);
              -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);
            }
            .bench-details__body .bench-scope,
            .bench-details__body .bench-targets,
            .bench-details__body .bench-story{ margin:0; color:rgba(255,255,255,.82); }
          `}</style>
          <div className="wrap">
            <div className="head" data-reveal="up">
              <Eyebrow>Measured, not asserted</Eyebrow>
              <h2 className="title">
                We <span className="grad-word">benchmark</span> the scoring and publish what we find
              </h2>
            </div>
            <div className="cr-bench-grid">
              <div className="cr-bench-video" aria-hidden="true">
                <video autoPlay muted loop playsInline preload="auto">
                  <source src="/assets/consistency/benchmark-bg.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="cr-bench-col">
                <BenchCard s={BENCHMARK_STATS[0]} />
                <BenchCard s={BENCHMARK_STATS[1]} />
              </div>
              <div className="cr-bench-orb" aria-hidden="true">
                <div className="horse-stage-mask absolute inset-0 mix-blend-screen">
                  <BentoHorse />
                </div>
              </div>
              <div className="cr-bench-col">
                <BenchCard s={BENCHMARK_STATS[2]} />
                <BenchCard s={BENCHMARK_STATS[3]} />
              </div>
            </div>
            {/* Benchmark caption — MERGED into the §7 ink section so the bento and
                the caption are one continuous dark block (kills the white seam
                that appeared between the two separate ink bands). */}
            <div
              className="consistency-benchmark"
              style={{ marginTop: "clamp(40px,6vw,72px)" }}
            >
              <p className="sub">
                We rerun controlled decks and measure whether scores hold. Here is
                the latest repeatability run.
              </p>
              <div className="bench-cta">
                <Button href="/try-live-demo" variant="primary">
                  View live report
                </Button>
                <Button href="/company/contact" variant="glass">
                  Book a Demo
                </Button>
              </div>
              <details className="bench-details">
                <summary>Benchmark scope &amp; targets</summary>
                <div className="bench-details__body">
                  <p className="bench-scope">
                    Internal repeatability benchmark: J-P5 Team Readiness, one deck,
                    24 runs, June 2026. A multi-deck regression across the full panel
                    is in progress.
                  </p>
                  <p className="bench-targets">
                    Targets for the controlled set: final-score standard deviation ≤ 3
                    · score-band consistency ≥ 90% · critical-risk recall ≥ 90% ·
                    schema-valid outputs ≥ 99% · regression pass ≥ 95%.
                  </p>
                  <p className="bench-story">
                    EvalLense comes from 400+ internal evaluation runs, starting with
                    an Amazon Nova hackathon prototype and the earlier AI Jury system.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* 8. What we do not claim — page-local replica of StatementHero (ds-hero)
            v3 ink, so the media slot holds a looping video (slightly enlarged,
            rounded rectangle with feathered + darkened edges). Reuses the global
            ds-hero classes; shared DS components / globals untouched. */}
        <section className="band ink ds-hero consistency-honest-edge">
          <style>{`
            .consistency-honest-edge{ overflow:hidden; }
            .consistency-honest-edge .cr-honest-media{
              position:relative; width:100%; aspect-ratio:16/9; overflow:hidden;
              border-radius:clamp(22px,2.2vw,30px);
            }
            /* media ~1.5x, anchored at its LEFT edge so it grows into the empty
               right gutter (bleeds off the edge, clipped by the section) and
               never reaches the copy or heading. Desktop only; 1x when stacked. */
            @media (min-width:621px){
              .consistency-honest-edge .cr-honest-media{
                transform:scale(1.5); transform-origin:left center;
              }
            }
            .consistency-honest-edge .cr-honest-media video{
              position:absolute; inset:0; width:100%; height:100%;
              object-fit:cover; transform:scale(1.08); transform-origin:center;
              -webkit-mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              -webkit-mask-composite:source-in;
              mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              mask-composite:intersect;
            }
            .consistency-honest-edge .cr-honest-media::after{
              content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
              background:radial-gradient(122% 100% at 50% 50%, transparent 50%, rgba(5,4,12,.55) 82%, rgba(5,4,12,.92) 100%);
            }
          `}</style>
          <div className="ds-hero__v ds-hero__v3" data-version="3">
            <div className="wrap ds-hero__editorial">
              <div className="ds-hero__ed-copy">
                <Eyebrow>What we do not claim</Eyebrow>
                <h1 className="ds-hero__title ds-hero__title--left">
                  <span className="grad-word">Reliability</span> has an honest edge
                </h1>
                <p className="sub ds-hero__sub ds-hero__sub--left">
                  EvalLense does not promise to predict startup success. It raises
                  the quality of evaluation by making it structured,
                  evidence-linked, and checkable. It points you to the decisions
                  that need human attention most — and because absolute calibration
                  across every deck type is still being proven, the human makes the
                  final call.
                </p>
              </div>
              <div className="ds-hero__ed-media cr-honest-media" aria-hidden="true">
                {/* plays once, holds the last frame, then replays after a 7s gap
                    (not a continuous native loop) — see DelayedLoopVideo. */}
                <DelayedLoopVideo
                  src="/assets/consistency/honest-edge-bg.mp4"
                  gap={7}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Final CTA — StatementHero v1 with a full-bleed muted video
            background (auto scrim + light text + glass CTA). Distinct id so it
            doesn't collide with the page-top hero's id="hero". */}
        <StatementHero
          id="get-started"
          surface="light"
          version={1}
          background="video"
          backgroundSrc="/assets/consistency/consistency-cta-bg-2.mp4"
          eyebrow="Get started"
          titleLead="See how stable the scores are on"
          titleAccent="your own decks"
          sub="Book a demo and see consensus, spread, and reproducibility on a real batch."
          ctas={[{ label: "Book a Demo", href: "/company/contact" }]}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
