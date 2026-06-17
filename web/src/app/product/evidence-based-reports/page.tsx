import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense — Evidence-Based Reports for Pitch Evaluation",
  description:
    "Explainable reports from EvalLense: scores across every dimension with reasoning, a judge matrix, findings grounded in the deck, and deck-completeness signals — not a black box.",
};

/*
 * ── VISUAL SYSTEM — NEBULA DEEP (dark) ───────────────────────────────────
 * The whole page is ONE dark nebula shell — no light↔ink zebra. Every section
 * sits on `.bg-nebula-layers` (sets --nebula-base bg + --nebula-fg text; .sub/p
 * auto-get --nebula-fg-2; .eyebrow/.chip already themed). The two cinematic
 * peaks (Hero + Final CTA) add `.bg-nebula-blob` whose intensity rides --pin.
 * Cards/panels use `.bg-glass-tinted`. Media slots use `.bg-nebula-video-scrim`.
 * A 1px brand-gradient `.tr-lens-seam` divider sits between dark sections.
 * Page-local layout/geometry lives under `.ev-reports` (evr-* classes) in
 * globals.css — the nebula surfaces/glass/blob/seam/gradient are reused, never
 * re-implemented.
 *
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Visual slots are VISIBLE, labeled
 * `.media-ph` placeholders (global primitive, dark variant via `.ink .media-ph`
 * — we wrap each slot in `.ink` locally) on canonical tokens. Each carries an
 * --ratio so the real asset drops in with zero layout shift.
 *
 * 1. hero (section 1) — 16:9. A score with quote-lines tracing back to deck
 *    slides. lens-gradient violet→cyan→aqua, calm.
 * 2. anatomy sample (section 3) — 4:3. ⭐ REAL SAMPLE NEEDED: a live report
 *    embed (Project Summary + supports/lowers + slide refs). This is the #1
 *    trust lever — drop the real founder sample here, not a render.
 * 3. evidence (section 5) — 4:3. A slide quote with a slide-ref next to the
 *    supports/lowers it grounds.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Motion is data-reveal / data-scrub / data-pin only (no useEffect, no
 * ScrollOrchestrator). reduced-motion is handled by the ScrollFX engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT CONSTRAINTS (brief) ──────────────────────────────────────────
 * Product name is always "EvalLense". Human-in-the-loop: "the final call always
 * yours" — never "AI judges/decides/verdict". Exact formulas and the constant
 * 0.15 are INTERNAL — NOT rendered here; score formation is described
 * qualitatively and cross-linked to Methodology. Deck completeness is a SIGNAL
 * about a missing/thin section, never a fact-check / gap-analysis / due-
 * diligence verdict. No PDF-export promise. SourceRefs (slide number · title ·
 * note) are now a REAL, shipped feature — presented as real.
 */

/* 3. Anatomy — one report, three layers (brief §3). Exactly 3 steps. */
const ANATOMY = [
  {
    num: "01",
    tag: "Project Summary",
    title: "The deck at a glance",
    body: "What the project is, how strong it looks, and what to probe: an AI summary, the score overview, strengths and weaknesses, why it can pass, why it can fail, and what to confirm live.",
  },
  {
    num: "02",
    tag: "AI Score Report",
    title: "The full reasoning",
    body: "The methodology, how the score was formed, a short conclusion from each judge, the judge contribution matrix, and a per-dimension breakdown.",
  },
  {
    num: "03",
    tag: "Questions for Participants",
    title: "Prompts for live Q&A",
    body: "Ready-made questions for live Q&A, grouped critical, important, and optional, each tied to the dimension it tests.",
  },
] as const;

/* 4. Inside the AI Score Report — 3 key cards (most differentiating).
   No exact formulas / the 0.15 constant — internal only. */
const REPORT_CARDS = [
  {
    tag: "Per-dimension breakdown",
    title: "Every dimension, in the open",
    body: "For every dimension: the score, its confidence, what supports it, what lowers it, and what would move it up or down.",
  },
  {
    tag: "Judge contribution matrix",
    title: "Who weighed in where",
    body: "Which judge contributed to each dimension, with strong disagreements flagged, not averaged away.",
  },
  {
    tag: "Score formation",
    title: "How the score adds up",
    body: "A per-dimension view: each score, its weight, and its contribution to the total — the model itself lives in Methodology.",
  },
] as const;

/* "Also in the report" — compact list under the lane, not cards. */
const REPORT_ALSO = [
  { name: "Methodology", note: "the rules and scale" },
  { name: "Initial criteria", note: "your weights, read-only" },
  { name: "Judge conclusions", note: "a takeaway, a concern, a live question from each judge" },
] as const;

/* 5. Grounded — three points (left). */
const GROUNDED = [
  {
    tag: "Supports / lowers",
    title: "What supports, what lowers",
    body: "Each dimension lists the concrete signals that raised or reduced its score.",
  },
  {
    tag: "Linked to the slide",
    title: "Linked to the slide",
    body: "Every finding cites the exact slide — number, title, and note — so you can open it and check the claim against the source.",
  },
  {
    tag: "Live Q&A",
    title: "Built for live Q&A",
    body: "See where a deck is thin before the team is in the room.",
  },
] as const;

/* 6. Deck completeness — 10 sections, severity info / warning / critical
   (brief §6, report.md §7). A SIGNAL about a missing/thin section — never a
   fact-check / verdict. */
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

/* 7. From shortlist to founder feedback — 5 cards (brief §7). */
const USES = [
  {
    tag: "Reviewer prep",
    title: "A briefed first read",
    body: "Walk in already knowing each deck's strengths, gaps, and what to ask.",
  },
  {
    tag: "Shortlist discussion",
    title: "A discussion you can defend",
    body: "Compare teams on the same structured basis, not gut feel.",
  },
  {
    tag: "Founder feedback",
    title: "Structured, actionable notes",
    body: "Give every team a concrete, structured read — not just a yes or a no.",
  },
  {
    tag: "Committee prep",
    title: "Material for the committee",
    body: "Bring a defensible, evidence-linked basis to the decision.",
  },
  {
    tag: "Batch archive",
    title: "A decision trail per batch",
    body: "Keep a clear record of how every team was evaluated.",
  },
] as const;

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/overview",
  links: [
    { label: "Anatomy", href: "#anatomy" },
    { label: "Score", href: "#score" },
    { label: "Grounded", href: "#grounded" },
  ],
};

export default function EvidenceBasedReportsPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="ev-reports">
        {/* 1. Hero — statement hero. Cinematic peak: nebula blob rides --pin. */}
        <section className="band bg-nebula-layers bg-nebula-blob evr-hero">
          <div
            className="bg-nebula-blob__layer motion-nebula-drift"
            aria-hidden="true"
          />
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
              A score you can{" "}
              <span className="heading-lens-gradient">explain</span>, with the
              evidence
            </h1>
            <p
              className="sub evr-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Walk into every review with a defensible read on each team — scores
              across each dimension, the reasoning behind them, and the questions
              to ask live. The final call always yours.
            </p>
            <div
              className="cta-row"
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
            {/* outcome stat-row — illustrative, framed as a 20–30 min manual read */}
            <ul
              className="evr-stats"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "360ms" }}
              aria-label="Illustrative outcomes, based on a 20–30 minute manual read per deck"
            >
              <li className="evr-stat bg-glass-tinted">
                <span className="evr-stat__v">20–30 min → 0</span>
                <span className="evr-stat__k">
                  human reading per deck — you start at the report, not the raw
                  slides
                </span>
              </li>
              <li className="evr-stat bg-glass-tinted">
                <span className="evr-stat__v">~40 hours</span>
                <span className="evr-stat__k">
                  reclaimed per 100-deck batch — a full review week of reading
                </span>
              </li>
              <li className="evr-stat bg-glass-tinted">
                <span className="evr-stat__v">The whole batch</span>
                <span className="evr-stat__k">
                  evaluated in parallel, unattended — not one deck at a time
                </span>
              </li>
            </ul>
            <p className="evr-stats__note" data-reveal="up">
              Illustrative, based on a 20–30 minute manual read per deck.
            </p>
            {/* hero visual slot — see prompt 1 in file header */}
            <div className="ink evr-hero__mediawrap">
              <figure
                className="media-ph bg-nebula-video-scrim evr-hero__media"
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
          </div>
        </section>

        <div className="tr-lens-seam tr-lens-seam--strong" aria-hidden="true" />

        {/* 2. Beyond the number — full-bleed dark statement. */}
        <section className="band bg-nebula-layers evr-why">
          <div className="wrap evr-why__statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Beyond the number
            </span>
            <p className="evr-why__h" data-reveal="up">
              A score you can&apos;t explain is a score you can&apos;t defend
            </p>
            <p
              className="sub evr-why__note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              A single number tells you where a deck landed, not why. Your team
              can&apos;t defend a shortlist with it, founders can&apos;t learn
              from it, and no one can audit it later. EvalLense hands you the
              reasoning, not just the result.
            </p>
          </div>
        </section>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* 3. Anatomy — pinned multi-screen, exactly 3 layers light up. */}
        <section
          id="anatomy"
          className="band bg-nebula-layers bg-nebula-layers--raised evr-anatomy"
          data-pin
          data-pin-steps="3"
          aria-label="Anatomy of the report — three layers from summary to questions"
        >
          <div className="evr-anatomy__stage" data-pin-stage>
            <div className="wrap evr-anatomy__grid">
              <div className="evr-anatomy__col">
                <div className="head evr-anatomy__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Anatomy of the report
                  </span>
                  <h2 className="title">One report, three layers</h2>
                  <p className="sub">
                    Each team&apos;s report runs from a quick read to the full
                    reasoning to the questions for live Q&amp;A. Each layer opens
                    as you scroll.
                  </p>
                </div>
                <ol className="evr-anatomy__track">
                  {ANATOMY.map((a, i) => (
                    <li
                      key={a.tag}
                      className="evr-astep"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="evr-astep__num">{a.num}</span>
                      <span className="evr-astep__label">{a.tag}</span>
                      <span className="evr-astep__title">{a.title}</span>
                      <span className="evr-astep__desc">{a.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* ⭐ anatomy sample slot — REAL SAMPLE NEEDED (see prompt 2) */}
              <div className="ink evr-anatomy__mediawrap">
                <figure
                  className="media-ph bg-nebula-video-scrim evr-anatomy__media"
                  style={{ ["--ratio" as string]: "4/3" }}
                  role="img"
                  aria-label="A live sample report — Project Summary with score, supports and lowers, and slide references"
                >
                  <span className="media-ph__label">
                    Sample · real report needed · 4:3
                  </span>
                  <span className="media-ph__hint">
                    A live report embed — Project Summary with score,
                    supports/lowers, and slide refs. #1 trust lever: drop the
                    real founder sample here.
                  </span>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* 4. Inside the AI Score Report — horizontal gallery, 3 cards + list. */}
        <section
          id="score"
          className="band bg-nebula-layers evr-report"
        >
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Inside the AI Score Report
              </span>
              <h2 className="title">The reasoning, shown in the open</h2>
              <p className="sub">
                The reasoning layer shows its work — nothing hidden behind a
                number.
              </p>
            </div>
          </div>
          {/* horizontal gallery — scrolls INSIDE its own overflow container */}
          <ul
            className="evr-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Inside the AI Score Report — scroll horizontally"
          >
            {REPORT_CARDS.map((c) => (
              <li key={c.tag} className="evr-card bg-glass-tinted">
                <span className="mini-tag">{c.tag}</span>
                <h3 className="evr-card__h">{c.title}</h3>
                <p className="evr-card__p">{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="wrap">
            <div className="evr-also" data-reveal="up">
              <span className="evr-also__title">Also in the report</span>
              <ul className="evr-also__list">
                {REPORT_ALSO.map((a) => (
                  <li key={a.name} className="evr-also__item">
                    <span className="evr-also__name">{a.name}</span>
                    <span className="evr-also__note">{a.note}</span>
                  </li>
                ))}
              </ul>
              <p className="evr-also__cross">
                The full scoring model lives in{" "}
                <a className="evr-link" href="/trust/methodology">
                  Methodology
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* 5. Grounded — editorial split: 3 points + evidence visual. */}
        <section
          id="grounded"
          className="band bg-nebula-layers bg-nebula-layers--raised evr-grounded"
        >
          <div className="wrap evr-grounded__split">
            <div className="evr-grounded__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Grounded, not opaque
              </span>
              <h2 className="title">Every finding links back to a slide</h2>
              <p className="sub">
                The report is built to be checked. Each score comes with what
                supports it and what lowers it, and every finding points to the
                slide it came from — so a claim reads as an observation, not an
                opinion.
              </p>
              <ul className="evr-points" aria-label="How findings stay grounded">
                {GROUNDED.map((g) => (
                  <li key={g.tag} className="evr-point">
                    <span className="evr-point__dot" aria-hidden="true"></span>
                    <span className="evr-point__h">{g.title}</span>
                    <span className="evr-point__p">{g.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* evidence visual slot — see prompt 3 in file header */}
            <div className="ink evr-grounded__mediawrap" data-reveal="right">
              <figure
                className="media-ph bg-nebula-video-scrim evr-grounded__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A slide quote with a slide reference next to the supports and lowers it grounds"
              >
                <span className="media-ph__label">
                  Image · slide ↔ finding · 4:3
                </span>
                <span className="media-ph__hint">
                  A slide quote (number · title) next to the supports/lowers it
                  grounds, thin connector lines, calm — see prompt 3 in file
                  header
                </span>
              </figure>
            </div>
          </div>
        </section>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* 6. Deck completeness — bento. A signal, not a verdict. */}
        <section className="band bg-nebula-layers evr-completeness">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Deck completeness
              </span>
              <h2 className="title">See what the deck never covered</h2>
              <p className="sub">
                Beyond scoring what&apos;s there, the report flags what&apos;s
                missing — the key sections a strong deck usually carries, and how
                serious each gap is. It&apos;s a signal, not a verdict.
              </p>
            </div>
            <div className="evr-bento" data-reveal="up">
              {/* feature tile — ten key sections */}
              <article className="evr-bento__tile evr-bento__tile--feature bg-glass-tinted">
                <span className="mini-tag">Ten key sections</span>
                <h3 className="evr-bento__h">Each one checked, present or thin</h3>
                <p className="evr-bento__p">
                  Problem, Solution, Market, Business model, Traction, Team,
                  Roadmap, Financials, Ask, and anything else — each checked for
                  presence and depth.
                </p>
                <ul className="evr-secgrid" aria-label="The ten key sections, with a severity signal each">
                  {COMPLETENESS.map((c) => (
                    <li key={c.name} className={`evr-sec evr-sec--${c.sev}`}>
                      <span className="evr-sec__dot" aria-hidden="true"></span>
                      <span className="evr-sec__name">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
              {/* severity tile */}
              <article className="evr-bento__tile bg-glass-tinted">
                <span className="mini-tag">Severity, not noise</span>
                <h3 className="evr-bento__h">A weighted signal, linked to a dimension</h3>
                <p className="evr-bento__p">
                  Every gap is marked info, warning, or critical, and linked to
                  the dimension it affects.
                </p>
                <ul className="evr-sevlegend" aria-hidden="true">
                  <li className="evr-sevlegend__item evr-sec--info">
                    <span className="evr-sec__dot"></span>info
                  </li>
                  <li className="evr-sevlegend__item evr-sec--warning">
                    <span className="evr-sec__dot"></span>warning
                  </li>
                  <li className="evr-sevlegend__item evr-sec--critical">
                    <span className="evr-sec__dot"></span>critical
                  </li>
                </ul>
              </article>
              {/* not a fact-check tile */}
              <article className="evr-bento__tile bg-glass-tinted">
                <span className="mini-tag">Not a fact-check</span>
                <h3 className="evr-bento__h">It flags a gap, it doesn&apos;t judge a claim</h3>
                <p className="evr-bento__p">
                  Completeness flags a missing or thin section. It doesn&apos;t
                  validate the claims — that stays a human&apos;s job in the room.
                </p>
              </article>
            </div>
          </div>
        </section>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* 7. From shortlist to founder feedback — horizontal gallery, 5 cards. */}
        <section className="band bg-nebula-layers bg-nebula-layers--raised evr-uses">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                One report, many uses
              </span>
              <h2 className="title">From shortlist to founder feedback</h2>
              <p className="sub">
                The same report works across the whole review, not just the score
                screen.
              </p>
            </div>
          </div>
          <ul
            className="evr-lane evr-uses__lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Where the report is used — scroll horizontally"
          >
            {USES.map((u) => (
              <li key={u.tag} className="evr-card bg-glass-tinted">
                <span className="mini-tag">{u.tag}</span>
                <h3 className="evr-card__h">{u.title}</h3>
                <p className="evr-card__p">{u.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="tr-lens-seam tr-lens-seam--strong" aria-hidden="true" />

        {/* 8. Final CTA — quiet CTA, cinematic peak (nebula blob). */}
        <section className="band bg-nebula-layers bg-nebula-blob evr-cta">
          <div
            className="bg-nebula-blob__layer motion-nebula-drift"
            aria-hidden="true"
          />
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
              Book a demo and walk through a full evaluation report — summary,
              reasoning, and the questions to ask live.
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
