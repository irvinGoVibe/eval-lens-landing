import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense — Evidence-Based Reports for Pitch Evaluation",
  description:
    "Explainable EvalLense reports: P1–P6 scores with reasoning, a judge contribution matrix, links back to the deck slides and deck-completeness signals — not a black box.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/evidence-reports/.
 *
 * 1. hero (section 1) — 16:9
 *    A score with quote-lines tracing back to deck slides.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; a score and thin lines that
 *    connect it back to slides of a pitch deck.
 *
 * 2. anatomy gallery cards (section 3) — 4:3 each
 *    A horizontal gallery of report-layer cards sharing one visual rhythm:
 *    score + confidence ring, evidence quote, breakdown bars, contribution
 *    matrix, completeness.
 *    Prompt: same tokens, light surface, hairline card frames, one small lens
 *    accent per card; realistic UI cards, no logos, no fabricated metrics.
 *
 * 3. evidence (section 5) — 4:3
 *    A slide quote with a page-ref plus the 10 completeness sections.
 *    Prompt: same tokens, thin connector lines slide↔conclusion, calm.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub). No per-section useEffect, no ScrollOrchestrator
 * edits. reduced-motion is handled by the engine + the primitives' @media
 * block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief: report layers Project Summary / AI Score
 * Report / Questions; deterministic formula A(d)=R(d)·[1−0.15·(1−C(d))];
 * AI Total Score = Σ w(d)·A(d); confidence weights 0.55 / 0.70 / 0.85; scale
 * 0.0–10.0 (0–100 is UI only); AI Total Score is advisory (rank by human Jury
 * Score); Judge Contribution Matrix roles Primary / Secondary / Advisory;
 * 10 deck-completeness sections with severity info / warning / critical.
 * SourceRefs are framed as "links back to the deck slides" — data is collected
 * but NOT yet surfaced in the UI, so it is presented as a capability, not a
 * shipped feature. Export PDF is post-MVP — reports are "shareable for internal
 * review", never "exportable". No "gap analysis / due diligence" framing;
 * completeness is a signal, NOT a Truth Check verdict.
 */

/* 3. Report anatomy — horizontal scroll-snap gallery (brief §3, report.md §4/§8). */
const ANATOMY = [
  {
    tag: "Project Summary",
    title: "The deck at a glance",
    body: "A consolidated summary with the advisory AI Total Score, a P1–P6 overview, strengths and weaknesses, and what must be confirmed live.",
  },
  {
    tag: "AI Score Report",
    title: "How the score was formed",
    body: "Methodology, initial criteria, score formation, short judge conclusions and a per-dimension P1–P6 breakdown — the reasoning behind the number.",
  },
  {
    tag: "Questions",
    title: "Prompts for live Q&A",
    body: "Generated questions tied to P1–P6, marked critical / important / optional, so the room knows what to ask each team.",
  },
  {
    tag: "Dimension scores",
    title: "Per-lens P1–P6 detail",
    body: "Each of the six dimensions carries its own score and confidence, so a strong overall result never hides a weak lens.",
  },
  {
    tag: "Judge assessments",
    title: "Six independent reads",
    body: "Short conclusions from the specialized judges sit next to the score, with a contribution matrix showing who weighed in where.",
  },
  {
    tag: "Evidence references",
    title: "Links back to the deck",
    body: "Important claims point back to the slides they came from, so a reviewer can check the source instead of taking the score on faith.",
  },
];

/* 5. Deck completeness — 10 sections, severity info / warning / critical
   (report.md §7). A signal about a gap, never a Truth Check verdict. */
const COMPLETENESS = [
  { name: "Problem", sev: "info" },
  { name: "Solution", sev: "info" },
  { name: "Market", sev: "warning" },
  { name: "Business model", sev: "info" },
  { name: "Traction", sev: "warning" },
  { name: "Team", sev: "info" },
  { name: "Roadmap", sev: "info" },
  { name: "Financials", sev: "critical" },
  { name: "Ask", sev: "warning" },
  { name: "Other", sev: "info" },
] as const;

/* 6. Where the report is used — feature grid (brief §6, report.md §1). */
const USES = [
  {
    tag: "Reviewer prep",
    title: "A briefed first read",
    body: "An internal reviewer walks in already knowing the score, the evidence and the open questions for each deck.",
    feature: true,
  },
  {
    tag: "Shortlist",
    title: "A discussion you can defend",
    body: "The same report format makes a shortlist conversation comparable across very different decks.",
  },
  {
    tag: "Founder feedback",
    title: "Structured, actionable notes",
    body: "Founders get structural feedback tied to dimensions and evidence, not a one-line verdict.",
  },
  {
    tag: "IC prep",
    title: "Material for the committee",
    body: "One readable report format gives an investment committee a shared starting point for each project.",
  },
  {
    tag: "Program selection",
    title: "Consistent across the round",
    body: "Every applicant is scored against the same criteria, so program selection stays explainable end to end.",
  },
  {
    tag: "Archive",
    title: "A decision trail per batch",
    body: "After the event the batch keeps a shareable report per participant for internal review and reference.",
  },
];

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/overview",
  links: [
    { label: "Anatomy", href: "#anatomy" },
    { label: "Score", href: "#score" },
    { label: "Evidence", href: "#evidence" },
  ],
};

export default function EvidenceBasedReportsPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="ev-reports">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft evr-hero">
          <div className="wrap evr-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Evidence-Based Reports
            </span>
            <h1
              className="evr-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Every score, explained — back to the{" "}
              <span className="grad-word">deck</span>
            </h1>
            <p
              className="sub evr-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense returns a structured report that shows how each startup
              was scored and what evidence sits behind the result — not a bare
              number you have to take on trust.
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
              className="media-ph evr-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A score with quote-lines tracing back to slides of a pitch deck"
            >
              <span className="media-ph__label">
                Image · score linked to the deck · 16:9
              </span>
              <span className="media-ph__hint">
                A score with thin lines tracing back to deck slides —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file
                header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Why a bare AI score isn't enough — full-bleed statement, DARK. */}
        <section className="band ink evr-why">
          <div className="wrap evr-why__statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Why a bare score isn&apos;t enough
            </span>
            <p className="evr-why__h" data-reveal="up">
              A score with no reasoning behind it is hard to trust.
            </p>
            <p
              className="sub evr-why__note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              The team needs to know <em>why</em> a deck landed high or low.
              Founders need structural feedback. A program owner needs a
              decision trail. A naked number gives none of that — so every
              EvalLense report carries its own reasoning.
            </p>
          </div>
        </section>

        {/* 3. Report anatomy — horizontal scroll-snap gallery, light. */}
        <section id="anatomy" className="band evr-anatomy">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Anatomy of a report
              </span>
              <h2 className="title">Several layers, one report per participant</h2>
              <p className="sub">
                A participant report is built from layers — a summary, the score
                report and live-Q&amp;A questions — with dimension scores, judge
                assessments and evidence references underneath.
              </p>
            </div>
          </div>
          {/* horizontal gallery — scrolls INSIDE its own overflow container,
              never moving the page; scroll-snap like .usecases .seg-lane */}
          <ul
            className="evr-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Report layers — scroll horizontally"
          >
            {ANATOMY.map((a) => (
              <li key={a.tag} className="evr-card">
                <span className="evr-card__signal" aria-hidden="true"></span>
                <span className="mini-tag">{a.tag}</span>
                <h3 className="evr-card__h">{a.title}</h3>
                <p className="evr-card__p">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. How the score is computed — editorial split + scrubbed ring, DARK. */}
        <section id="score" className="band ink evr-score">
          <div className="wrap evr-score__split">
            <div className="evr-score__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                How the score is computed
              </span>
              <h2 className="title">Deterministic math, advisory result</h2>
              <p className="sub">
                Per dimension, R(d) is the weighted mean of the judge scores and
                C(d) their weighted confidence. The criterion score applies a
                small confidence penalty, then the total is a weighted sum across
                P1–P6 on a 0.0–10.0 scale.
              </p>
              <div className="evr-formulas">
                <p className="evr-formula">
                  <span className="evr-formula__name">AI Criterion Score</span>
                  <code className="evr-formula__expr">
                    A(d) = R(d) · [1 − 0.15 · (1 − C(d))]
                  </code>
                </p>
                <p className="evr-formula">
                  <span className="evr-formula__name">AI Total Score</span>
                  <code className="evr-formula__expr">
                    AI Total Score = Σ<sub>d</sub> w(d) · A(d)
                  </code>
                </p>
              </div>
              <ul className="evr-weights" aria-label="Confidence weights">
                <li className="evr-weight">
                  <span className="evr-weight__k">low</span>
                  <span className="evr-weight__v">0.55</span>
                </li>
                <li className="evr-weight">
                  <span className="evr-weight__k">medium</span>
                  <span className="evr-weight__v">0.70</span>
                </li>
                <li className="evr-weight">
                  <span className="evr-weight__k">high</span>
                  <span className="evr-weight__v">0.85</span>
                </li>
              </ul>
              <p className="evr-score__note">
                The scale is 0.0–10.0 (0–100 is only a UI visualization). The AI
                Total Score is advisory — the final rank is built on the human
                Jury Score.
              </p>
            </div>
            <div className="evr-score__visual" data-reveal="right">
              {/* confidence ring — fills as it scrolls through the viewport via
                  --scrub; reduced-motion lands it at the full state */}
              <div
                className="evr-ring"
                data-scrub
                role="img"
                aria-label="Confidence ring filling as evidence accumulates"
              >
                <span className="evr-ring__label">Confidence C(d)</span>
              </div>
              <div className="evr-matrix" aria-hidden="false">
                <span className="evr-matrix__title">
                  Judge Contribution Matrix
                </span>
                <ul className="evr-matrix__roles">
                  <li className="evr-matrix__role evr-matrix__role--primary">
                    <span className="evr-matrix__k">Primary</span>
                    <span className="evr-matrix__v">leads the dimension</span>
                  </li>
                  <li className="evr-matrix__role evr-matrix__role--secondary">
                    <span className="evr-matrix__k">Secondary</span>
                    <span className="evr-matrix__v">supports the read</span>
                  </li>
                  <li className="evr-matrix__role evr-matrix__role--advisory">
                    <span className="evr-matrix__k">Advisory</span>
                    <span className="evr-matrix__v">weighs in lightly</span>
                  </li>
                </ul>
                <p className="evr-matrix__note">
                  The matrix shows each judge&apos;s role across P1–P6 and flags
                  where they strongly disagree.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Linked to evidence — editorial split, light. */}
        <section id="evidence" className="band soft evr-evidence">
          <div className="wrap evr-evidence__split">
            <div className="evr-evidence__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Linked to evidence
              </span>
              <h2 className="title">Claims you can trace to the slide</h2>
              <p className="sub">
                EvalLense links important conclusions back to the deck slides —
                slide number, slide title and a short note for what supports or
                reduces the score. It also flags deck-completeness across ten
                key sections, with a severity from info to critical.
              </p>
              <p className="evr-evidence__note">
                Completeness is a signal about a gap or a thin section — never a
                verdict on whether a claim is true. SourceRefs are collected
                today; how they surface in the UI follows a production test.
              </p>
              {/* evidence visual slot — see prompt 3 in file header */}
              <figure
                className="media-ph evr-evidence__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A slide quote with a page-ref next to the ten completeness sections"
              >
                <span className="media-ph__label">
                  Image · slide quote + completeness · 4:3
                </span>
                <span className="media-ph__hint">
                  A slide quote with a page-ref and thin connector lines to a
                  conclusion — see prompt 3 in file header
                </span>
              </figure>
            </div>
            <div className="evr-evidence__panel" data-reveal="right">
              <span className="evr-evidence__panel-title">
                Deck completeness · 10 sections
              </span>
              <ul className="evr-completeness" aria-label="Deck completeness signals">
                {COMPLETENESS.map((c) => (
                  <li
                    key={c.name}
                    className={`evr-comp evr-comp--${c.sev}`}
                  >
                    <span className="evr-comp__name">{c.name}</span>
                    <span className="evr-comp__sev">{c.sev}</span>
                  </li>
                ))}
              </ul>
              <div className="evr-evidence__legend" aria-hidden="true">
                <span className="evr-evidence__legend-item evr-evidence__legend-item--info">
                  info
                </span>
                <span className="evr-evidence__legend-item evr-evidence__legend-item--warning">
                  warning
                </span>
                <span className="evr-evidence__legend-item evr-evidence__legend-item--critical">
                  critical
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Where the report is used — feature grid, light. */}
        <section className="band evr-uses">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Where the report is used
              </span>
              <h2 className="title">One report format across the whole process</h2>
              <p className="sub">
                The same report serves reviewer prep, the shortlist discussion,
                founder feedback, committee prep, program selection and the
                batch archive — without reformatting for each step.
              </p>
            </div>
            <ul className="evr-uses__grid" data-reveal="up">
              {USES.map((u) => (
                <li
                  key={u.tag}
                  className={
                    u.feature ? "evr-use evr-use--feature" : "evr-use"
                  }
                >
                  <span className="mini-tag">{u.tag}</span>
                  <h3 className="evr-use__h">{u.title}</h3>
                  <p className="evr-use__p">{u.body}</p>
                </li>
              ))}
            </ul>
            <p className="evr-uses__note">
              Reports are shareable for internal review. A downloadable PDF
              export is on the roadmap, not shipped yet.
            </p>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink evr-cta">
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
              See a real report on your own deck
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and walk through a structured, evidence-linked report
              built from your own applications.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
              <span
                className="btn btn-ghost is-disabled"
                aria-disabled="true"
                title="A sample report is coming soon"
              >
                View Sample Report
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
