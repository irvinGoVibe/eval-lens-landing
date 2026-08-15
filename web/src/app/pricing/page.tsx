import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import { StatementHero, Bento, Faq, CtaBand, Cinema } from "@/components/ds";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { PricingToolkitCard } from "@/components/PricingToolkitCard";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Pricing",
  sectionHref: "/pricing",
  links: [
    { label: "Plans", href: "#plans" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLens — Pricing: Pay-per-Event Pitch Evaluation",
  description:
    "Transparent EvalLens pricing: pay per event, not per seat. Plans are packages of AI-evaluated submissions; six AI judges on every plan, the human decides.",
};

/*
 * ── NUMBERS & SOURCE OF TRUTH ────────────────────────────────────────────
 * All prices/limits/validity/top-up are USD from pricing-model v0.7
 * (notes/research/pricing-model.md) — the source of truth. Do not round or
 * invent. Three PUBLIC role-based tiers; every package is valid 180 days.
 *   Micro              list $200   → founding $99 first event · 15 subs · 1 event
 *   Pitch Competition  list $500   → founding $400            · 40 subs · 1 event
 *   Cohort ⭐          list $1,900 → founding $1,520          · 150 subs · up to 5 projects
 *   Funds & Accelerators — "Talk to us", NO public numbers (sales-only). Covers
 *     Open Call / Annual / Enterprise; sized to pipeline on the call.
 *   Single top-up: +25 submissions / $300 (Cohort). Validity: 180 days for all;
 *   Annual & Funds volumes run for the contract term.
 *   Founding pricing: until Aug 31, 2026 founding customers get launch prices
 *   (shown against list) and keep them for 12 months; after that list applies.
 *
 * ── CONTENT NOTE (competitor framing) ────────────────────────────────────
 * Section 4 ("Where EvalLens fits") deliberately shows NO named competitors.
 * Per user decision (2026-06-17) the former named versus-table was removed in
 * favour of an UNNAMED category framing — two half-solution categories
 * (event-workflow platforms · AI deck-analysts) plus EvalLens. Rationale:
 * competitor features are stale/unverifiable (research draft v0.2) and a named
 * table reads defensively. If a named comparison is ever needed, it belongs on
 * a separate "Why EvalLens" page with verified, dated facts — not on pricing.
 *
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. StatementHero renders its own labeled
 * `.media-ph` placeholder (global primitive) on canonical tokens — never an
 * empty grey div. It carries a --ratio so the real asset drops in with zero
 * layout shift.
 *
 * 1. hero (section 1) — 16:9
 *    An event filtered through a lens into a single ranked result.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; a flow of pitches passing
 *    through a lens and emerging as a ranked leaderboard; no security theatre,
 *    no shield icons.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This is a dense conversion UTILITY page — it intentionally breaks the
 * editorial scroll format. Movement is `data-reveal` ONLY (no pin/scrub). DS
 * components carry their own reveals; page-local sections use data-reveal="up"
 * with staggered --reveal-delay. <ScrollFX/> is mounted once after <Footer/>.
 * reduced-motion is handled by the engine.
 */

/* 2. Headline pricing cards — 3 public role-based tiers (pricing-model v0.7).
 * `listPrice` renders struck-through; `price` is the founding price shown large;
 * `foundingNote` is the caption under it. Fences (do not blur across tiers):
 *   – "Powered by EvalLens" branding is removable ONLY from Pitch up (fixed on Micro).
 *   – Custom criteria & weights are a Cohort-only feature (NOT on Pitch). */
const PLANS = [
  {
    name: "Micro",
    listPrice: "$200",
    price: "$99",
    foundingNote: "Founding price · first event · until Aug 31",
    cadence: "15 submissions",
    validity: "180 days · 1 event",
    message: "Try EvalLens on a small pitch session.",
    bestFor: "Best for: a small, one-off event.",
    cta: "Start Micro",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Full 6-judge panel (P1–P6)",
      "Leaderboard + evidence feedback",
      "“Powered by EvalLens” branding",
    ],
  },
  {
    name: "Pitch Competition",
    listPrice: "$500",
    price: "$400",
    foundingNote: "Founding price · until Aug 31",
    cadence: "40 submissions",
    validity: "180 days · 1 event",
    message: "Run one full event end-to-end.",
    bestFor: "Best for: a single full event.",
    cta: "Start Pitch",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Everything in Micro",
      "Remove EvalLens branding",
      "PDF export",
      "Async setup help",
    ],
  },
  {
    name: "Cohort",
    listPrice: "$1,900",
    price: "$1,520",
    foundingNote: "Founding price · until Aug 31",
    cadence: "150 submissions",
    validity: "180 days · up to 5 projects",
    message: "For a full cohort selection or competition.",
    bestFor: "Best for: a cohort or multi-project selection.",
    cta: "Choose Cohort",
    href: "/company/contact",
    recommended: true,
    bullets: [
      "Everything in Pitch Competition",
      "Custom criteria & weights",
      "Custom AI judges (add-on)",
      "30-min setup call",
      "Top-up +25 / $300",
    ],
  },
];

/* 3. Full comparison — 3 public role-based tiers (pricing-model v0.7). Lighter
 * than v0.4: no seats, no per-tier validity ladder (all 180 days), no human-
 * judges row (no such feature), no BYO/white-label/SLA (those live in the
 * Funds & Accelerators band, not the self-serve tiers). */
const COMPARE_COLS = [
  "Micro",
  "Pitch Competition",
  "Cohort",
];

const COMPARE_ROWS = [
  {
    label: "Price (list)",
    cells: ["$200", "$500", "$1,900"],
    num: true,
  },
  {
    label: "Founding price",
    cells: ["$99", "$400", "$1,520"],
    num: true,
  },
  {
    label: "Submissions included",
    cells: ["15", "40", "150"],
    num: true,
  },
  {
    label: "Projects",
    cells: ["1", "1", "5"],
    num: true,
  },
  {
    label: "Top-up package",
    cells: ["—", "+25 / $300", "+25 / $300"],
    num: true,
  },
  {
    label: "6 AI judges (P1–P6)",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "Evidence-linked rationale",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "Human-in-the-loop scoring",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "Leaderboard + feedback",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "Self-upload page",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "CSV export",
    cells: ["✓", "✓", "✓"],
  },
  {
    label: "PDF export",
    cells: ["—", "✓", "✓"],
  },
  {
    label: "Remove branding",
    cells: ["—", "✓", "✓"],
  },
  {
    label: "Custom criteria & weights",
    cells: ["—", "—", "✓"],
  },
  {
    label: "Custom AI judges",
    cells: ["—", "—", "add-on"],
  },
];

/* 4. Where EvalLens fits — UNNAMED category framing. NO competitor names. */
const FIT_BLOCKS = [
  {
    tag: "Event-workflow platforms",
    body: "Collect submissions, assign judges, publish results.",
    gap: "No AI-first pitch evaluation; judging stays manual.",
    us: false,
  },
  {
    tag: "AI deck-analysts",
    body: "Score and summarize one deck at a time.",
    gap: "No event workflow, no judge panel, no leaderboard.",
    us: false,
  },
  {
    tag: "EvalLens",
    body: "Both, plus what neither has: six independent judges (P1–P6), transparent evidence-linked rationale, a leaderboard, and human-in-the-loop final scoring.",
    gap: null,
    us: true,
  },
];

/* 4b. Where EvalLens fits — UNNAMED comparison table. NO competitor names.
 * Columns: workflow-platforms · deck-analysts · EvalLens (highlighted). */
const FIT_TABLE_COLS = [
  "Event-workflow platforms",
  "AI deck-analysts",
  "EvalLens",
];

const FIT_TABLE_ROWS: { label: string; cells: string[] }[] = [
  {
    label: "AI deck evaluation as core",
    cells: ["✗", "✓", "✓"],
  },
  {
    label: "Six independent judges (P1–P6)",
    cells: ["✗", "partial", "✓"],
  },
  {
    label: "Transparent rationale (no black box)",
    cells: ["✗", "partial", "✓"],
  },
  {
    label: "Evidence-linked scoring",
    cells: ["✗", "partial", "✓"],
  },
  {
    label: "Whole-event evaluation (not single deck)",
    cells: ["✓", "✗", "✓"],
  },
  {
    label: "Leaderboard / ranking",
    cells: ["✓", "✗", "✓"],
  },
  {
    label: "Human-in-the-loop final decision",
    cells: ["manual", "✗", "✓"],
  },
  {
    label: "Questions for the live jury",
    cells: ["✗", "✗", "✓"],
  },
];

/* 5. Capabilities — six product areas (brief §5). Bento tiles. */
const CAPABILITIES = [
  {
    tag: "Intake",
    title: "Collect every deck",
    body: "Collect decks (PDF, PPT, PPTX, Google Slides) by hand or via a self-upload link.",
    feature: true,
    media: {
      label: "Image · VC evaluation toolkit · 16:9",
      hint: "A top-down glass table with physical evaluation tools: deck cards, six judge lenses, rubric ruler, score dial, evidence pins, red flag marker, decision stamp, and pricing token.",
      ariaLabel:
        "A top-down glass evaluation table laid out with deck cards, six judge lenses, a rubric ruler, a score dial, evidence pins, a red-flag marker, a decision stamp, and a pricing token",
      // Live visual: the static glass-toolkit PNG + drifting optical spotlights
      // (overlay is React, light is NOT baked into the PNG). See PricingToolkitCard.
      node: <PricingToolkitCard />,
    },
  },
  {
    tag: "Six-judge review",
    title: "Six independent judges",
    body: "Each deck is reviewed across P1–P6, with a score, confidence signal, and evidence behind the call.",
  },
  {
    tag: "Evidence reports",
    title: "Reports you can defend",
    body: "Each participant gets strengths, weaknesses, evidence, and sharper questions for the live review.",
  },
  {
    tag: "Human decision",
    title: "The human makes the final call",
    body: "Use the Review Board to compare teams, adjust context, and rank by your Final Score.",
  },
  {
    tag: "Trust layer",
    title: "Safety is part of the workflow",
    body: "Prompt-injection checks, privacy controls, and no-black-box rationale are built in from the start.",
  },
  {
    tag: "Plan controls",
    title: "Controls scale by plan",
    body: "Weights, templates, branding, SSO, and API access scale with the plan you choose.",
  },
];

/* 6. FAQ — static Q/A blocks (NOT a JS accordion). Brief §6, 11 items.
 *
 * `FaqItem.a` is `ReactNode`, so an answer may be plain text or JSX — the two
 * answers below carry real inline <a> links to the Trust pages. */
const FAQ = [
  {
    q: "What counts as a submission?",
    a: "One submitted pitch deck or application that receives one successfully generated AI evaluation report.",
  },
  {
    q: "Is this a subscription?",
    a: "No. You pay per event — a package of submissions with a validity window, not a monthly per-seat fee.",
  },
  {
    q: "What if I run out of submissions?",
    a: "Add a top-up: +25 submissions for $300. Or move up a plan.",
  },
  {
    q: "How long do submissions last?",
    a: "Every package is valid for 180 days. Annual and Funds volumes run for the contract term.",
  },
  {
    q: "What if a deck can't be processed?",
    a: "It doesn’t count as an evaluated submission. Disagreeing with the AI output isn’t a failed evaluation either.",
  },
  {
    q: "What if a team resubmits after the report?",
    a: "A new report counts as a new evaluation.",
  },
  {
    q: "Do you have a first-time option?",
    a: "Yes — Micro is $99 for your first event, up to 15 submissions.",
  },
  {
    q: "What is founding pricing?",
    a: "Until Aug 31, 2026 founding customers get launch pricing (shown against list) and keep it for 12 months. After that, list prices apply.",
  },
  {
    q: "I run a VC open call or accelerator cohort — which plan?",
    a: "Talk to us — we size Open Call and annual programs to your volume.",
  },
  {
    q: "Is my data safe?",
    a: (
      <>
        Yes. Safety and privacy controls are included on every plan.{" "}
        <a href="/trust/security-privacy">Security &amp; Privacy</a>.
      </>
    ),
  },
  {
    q: "Who makes the final decision?",
    a: (
      <>
        A person. AI prepares the analysis; you decide.{" "}
        <a href="/trust/methodology">Methodology</a>.
      </>
    ),
  },
];

/** ✓ → green, "✗" / "—" → muted, anything else (numeric / words) → mono cell. */
function cellClass(value: string) {
  if (value === "✓") return "pr-cell pr-cell--yes";
  if (value === "✗" || value === "—") return "pr-cell pr-cell--no";
  return "pr-cell pr-cell--num";
}

export default function PricingPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="pricing section-lab ds">
          {/* Zone §2–§3: Plans + Compare — light (--lobes + ZoneBlobs) */}
          <div className="ds-zone">
          <div className="ds-canvas__bg ds-canvas__bg--lobes ds-zone__bg--contained" aria-hidden />
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark" aria-hidden="true">
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <ZoneBlobs top="40%" bottom="28%" />
        {/* 1. Hero — StatementHero (DS), soft. Lens accent on "event". */}
        <StatementHero
          id="top"
          surface="light"
          version={1}
          eyebrow="Pricing"
          titleLead="Pay for the"
          titleAccent="event,"
          titleTrail="not every seat"
          sub="Each plan gives you a fixed number of evaluated submissions for one event window. No seats, tokens, or usage surprises."
          media={{
            ratio: "16/9",
            label: "Image · an event filtered through a lens into a ranked result · 16:9",
            hint: "Pitches pass through a lens and emerge as a ranked leaderboard — lens-gradient violet→cyan→aqua over an Apple-neutral surface, calm; no security theatre, no shield icons.",
            ariaLabel:
              "An event filtered through a lens into a single ranked result",
          }}
        />



        {/* 2. Plans — 3 headline role-based tiers (page-local), light. Cohort recommended. */}
        <section id="plans" className="band pr-plans">
          <div className="wrap">
            <p
              className="pr-founding-banner"
              data-reveal="up"
              style={{
                margin: "0 auto 22px",
                maxWidth: "620px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.95rem",
                lineHeight: 1.5,
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid color-mix(in oklab, var(--grad-mid, #7c5cff) 45%, transparent)",
                background: "color-mix(in oklab, var(--grad-mid, #7c5cff) 10%, transparent)",
              }}
            >
              Founding customer pricing — until Aug 31, 2026. Prices lock for 12 months.
            </p>
            <ul className="pr-cards" data-reveal="up">
              {PLANS.map((plan) => (
                <li
                  key={plan.name}
                  className={
                    plan.recommended
                      ? "pr-card pr-card--recommended"
                      : "pr-card"
                  }
                >
                  {plan.recommended ? (
                    <span className="chip pr-card__badge">
                      <span className="tick" aria-hidden="true"></span>
                      Recommended
                    </span>
                  ) : null}
                  <h3 className="pr-card__name">{plan.name}</h3>
                  <p className="pr-card__price">
                    <s
                      style={{
                        marginRight: "10px",
                        fontSize: "0.55em",
                        fontWeight: 500,
                        opacity: 0.5,
                        textDecorationThickness: "1px",
                      }}
                    >
                      {plan.listPrice}
                    </s>
                    {plan.price}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--grad-mid, #7c5cff)",
                    }}
                  >
                    {plan.foundingNote}
                  </p>
                  <p className="pr-card__cadence">
                    <span className="pr-card__pitches">{plan.cadence}</span>
                    <span className="pr-card__validity">{plan.validity}</span>
                  </p>
                  <p className="pr-card__msg">{plan.message}</p>
                  <p className="pr-card__msg" style={{ marginTop: "6px", fontWeight: 600 }}>
                    {plan.bestFor}
                  </p>
                  <ul className="pr-card__bullets">
                    {plan.bullets.map((b) => (
                      <li key={b} className="pr-card__bullet">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="pr-card__cta">
                    <Button
                      variant={plan.recommended ? "primary" : "ghost"}
                      href={plan.href}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Funds-band — a separate, wider sales tier (NOT a 4th self-serve
              * card). Public copy carries NO numbers: Open Call / Annual /
              * Enterprise figures are sales-only, sized on the call. */}
            <div
              className="pr-funds-band"
              data-reveal="up"
              style={{
                marginTop: "34px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                padding: "26px 30px",
                borderRadius: "20px",
                border: "1px solid color-mix(in oklab, var(--grad-mid, #7c5cff) 30%, transparent)",
                background: "color-mix(in oklab, var(--grad-mid, #7c5cff) 6%, transparent)",
              }}
            >
              <div style={{ flex: "1 1 420px", minWidth: "min(100%, 420px)" }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Funds &amp; Accelerators — custom programs
                </h3>
                <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.55 }}>
                  VC open calls, accelerator cohorts, and recurring annual
                  programs. Custom volume, custom judge panels, white-label, SSO,
                  SLA, and BYO-LLM — sized to your pipeline. Covers Open Call,
                  Annual, and Enterprise.
                </p>
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <Button variant="primary" href="https://calendly.com/evallens/30min">
                  Talk to sales
                </Button>
              </div>
            </div>
            <p className="pr-smaller" data-reveal="up">
              Larger open calls and recurring programs are priced per volume —
              talk to us.
            </p>
          </div>
        </section>

        {/* 3. Comparison matrix — 3 public tiers (page-local), soft. Scrolls inside wrapper. */}
        <section id="compare" className="band soft pr-compare">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Full comparison
              </span>
              <h2 className="title">Compare <span className="grad-word">plans</span></h2>
              <p className="sub">
                Compare submissions, projects, top-ups, exports, and the
                features that change by tier.
              </p>
            </div>
          </div>
          <div className="wrap">
            <div
              className="pr-table-scroll"
              data-reveal="up"
              tabIndex={0}
              role="region"
              aria-label="Full plan comparison — scroll horizontally on small screens"
            >
              <table className="pr-table">
                <caption className="pr-table__caption">
                  Plans compared across price, limits and features.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="pr-th pr-th--row">
                      Plan
                    </th>
                    {COMPARE_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={
                          col === "Cohort" ? "pr-th pr-th--reco" : "pr-th"
                        }
                      >
                        {col === "Cohort" ? (
                          <>
                            Cohort
                            <span className="pr-th__note">recommended</span>
                          </>
                        ) : (
                          col
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="pr-td pr-td--row">
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.label}-${COMPARE_COLS[i]}`}
                          data-label={COMPARE_COLS[i]}
                          className={
                            COMPARE_COLS[i] === "Cohort"
                              ? `${row.num ? "pr-cell pr-cell--num" : cellClass(cell)} pr-td--reco`
                              : row.num
                                ? "pr-cell pr-cell--num"
                                : cellClass(cell)
                          }
                        >
                          {cell === "✓" ? (
                            <span aria-label="Included">✓</span>
                          ) : cell === "—" ? (
                            <span aria-label="Not included">—</span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pr-smaller" data-reveal="up">
              All packages are valid 180 days. Funds &amp; Accelerators — custom
              volume, seats, and white-label; talk to us.
            </p>
          </div>
        </section>
        {/* light→ink flip seam: light zone (§1–§3) crossfades into INK §4. */}
        <ZoneToneFlip />

        {/* 4. Where EvalLens fits — UNNAMED category framing (page-local), INK peak. */}
        <section className="band ink pr-fit">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Where EvalLens fits
              </span>
              <h2 className="title">Event workflow and AI evaluation in <span className="grad-word">one place</span></h2>
              <p className="sub">
                Event platforms manage submissions and judges. AI deck tools
                review one deck at a time. EvalLens evaluates the full cohort —
                six independent judges, evidence-linked rationale, a leaderboard,
                and a human-owned final decision.
              </p>
            </div>
          </div>
          <div className="wrap">
            <div
              className="pr-table-scroll"
              data-reveal="up"
              tabIndex={0}
              role="region"
              aria-label="Where EvalLens fits — capabilities compared across two half-solution categories and EvalLens; scroll horizontally on small screens"
            >
              <table className="pr-table">
                <caption className="pr-table__caption">
                  Capabilities compared across two half-solution categories and
                  EvalLens.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="pr-th pr-th--row">
                      Capability
                    </th>
                    {FIT_TABLE_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={
                          col === "EvalLens" ? "pr-th pr-th--us" : "pr-th"
                        }
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FIT_TABLE_ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="pr-td pr-td--row">
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.label}-${FIT_TABLE_COLS[i]}`}
                          data-label={FIT_TABLE_COLS[i]}
                          className={
                            FIT_TABLE_COLS[i] === "EvalLens"
                              ? `${cellClass(cell)} pr-td--us`
                              : cellClass(cell)
                          }
                        >
                          {cell === "✓" ? (
                            <span aria-label="Included">✓</span>
                          ) : cell === "✗" ? (
                            <span aria-label="Not included">✗</span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pr-fit__statements">
              <p className="pr-statement" data-reveal="up">
                They manage the competition. EvalLens helps compare who is
                strongest and why.
              </p>
              <p
                className="pr-statement"
                data-reveal="up"
                style={{ ["--reveal-delay" as string]: "120ms" }}
              >
                They review decks. We run structured evaluation across an entire
                competition.
              </p>
            </div>
          </div>
        </section>
        </div>{/* /ds-zone §1–§4 */}

        {/* 4b. Cinema — How it works (DS), ink. Cinematic knockout over video. */}
        <Cinema
          surface="ink"
          eyebrow="How it works"
          headline="From submission to shortlist"
          sub="Each submission is reviewed by six AI judges, linked to evidence, and placed in a leaderboard for human review."
          media={{
            videoSrc: "/assets/cta/cube-1.mp4",
            poster: "/assets/cta/cube-1-poster.webp",
          }}
        />

        {/* ink → ink after Cinema (§5 Bento is ink — no tonal flip). */}
        <div
          className="tr-masked-divider"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
        />

        {/* 5. Capabilities — Bento (DS), ink. Six product areas. */}
        <Bento
          surface="ink"
          version={2}
          eyebrow="Core toolkit included"
          title="The full evaluation toolkit is included"
          titleAccent="toolkit"
          sub="Every plan includes the same evaluation core: judges, evidence, reports, review, and safety. Plans only change limits, volume, and admin control."
          items={CAPABILITIES}
        />

        {/* 6. FAQ — Faq (DS), light. Static Q/A, NOT a JS accordion. */}
        <JsonLd data={faqJsonLd(FAQ)} />

        <Faq
          id="faq"
          eyebrow="Pricing FAQ"
          title="Pricing questions"
          titleAccent="questions"
          items={FAQ}
        />

        {/* 7. Final CTA — CtaBand (DS), dark. CSS aurora (no video).
            FAQ→CtaBand seam is a 200px ink→transparent overlay on .cta-band::before
            (see globals.css), so the sections sit flush with no gap in the flow. */}
        <CtaBand
          theme="dark"
          eyebrow="Get started"
          title="Ready to evaluate your next"
          titleAccent="cohort?"
          sub="Book a demo with your own decks, or get started with your first event."
          primary={{ label: "Book a demo", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "Get started", href: "/company/contact" }}
          videoSrc="/assets/cta/neo.mp4"
          videoPoster="/assets/cta/neo-poster.webp"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
