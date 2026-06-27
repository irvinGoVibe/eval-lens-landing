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
  title: "EvalLense — Pricing: Pay-per-Event Pitch Evaluation",
  description:
    "Transparent EvalLense pricing: pay per event, not per seat. Plans are packages of AI-evaluated submissions; six AI judges on every plan, the human decides.",
};

/*
 * ── NUMBERS & SOURCE OF TRUTH ────────────────────────────────────────────
 * All prices/limits/validity/top-up packs are USD from the financial model
 * v0.4 ("Тарифы" sheet) — the source of truth. Do not round or invent.
 *   Free Trial   $0           · 3 submissions   · lifetime trial   · 1 project
 *   Starter      $199         · 15 submissions  · 90 days          (matrix-only)
 *   Pilot        $500         · 40 submissions  · 90 days          (matrix-only)
 *   Standard ⭐  $1,500       · 150 submissions · 120 days · 5 projects (recommended)
 *   Pro          $3,900       · 500 submissions · 180 days · unlimited projects
 *   Enterprise   from $15,000 · 1,000+ submissions · contract term
 *   Top-up packs: Starter/Pilot +10/$150 ($15/sub); Standard +25/$300
 *   ($12/sub); Pro +50/$500 ($10/sub); Enterprise custom.
 *
 * ── CONTENT NOTE (competitor framing) ────────────────────────────────────
 * Section 4 ("Where EvalLense fits") deliberately shows NO named competitors.
 * Per user decision (2026-06-17) the former named versus-table was removed in
 * favour of an UNNAMED category framing — two half-solution categories
 * (event-workflow platforms · AI deck-analysts) plus EvalLense. Rationale:
 * competitor features are stale/unverifiable (research draft v0.2) and a named
 * table reads defensively. If a named comparison is ever needed, it belongs on
 * a separate "Why EvalLense" page with verified, dated facts — not on pricing.
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

/* 2. Headline pricing cards — 4 public plans (brief §2, financial model v0.4). */
const PLANS = [
  {
    name: "Free Trial",
    price: "$0",
    cadence: "3 submissions",
    validity: "lifetime · no credit card",
    message: "Test EvalLense with 3 real submissions.",
    bestFor: "Best for: a first look before you commit.",
    cta: "Start free",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "3 submissions (lifetime)",
      "All 6 AI judges (preview)",
      "Evidence-linked reports",
      "Human-in-the-loop scoring",
    ],
  },
  {
    name: "Standard",
    price: "$1,500",
    cadence: "150 submissions",
    validity: "120 days · 5 projects",
    message: "For a full pitch competition with up to 150 submissions.",
    bestFor: "Best for: a single full event.",
    cta: "Start Standard",
    href: "/company/contact",
    recommended: true,
    bullets: [
      "Full evaluation workflow included",
      "Leaderboard + CSV / PDF export",
      "Custom criteria weights",
      "Top-up +25 / $300 ($12 each)",
    ],
  },
  {
    name: "Pro",
    price: "$3,900",
    cadence: "500 submissions",
    validity: "180 days · unlimited projects",
    message: "Evaluate large cohorts and recurring programs.",
    bestFor: "Best for: large or recurring programs.",
    cta: "Start Pro",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Everything in Standard",
      "Limited custom AI judges",
      "BYO LLM (add-on)",
      "Top-up +50 / $500 ($10 each)",
    ],
  },
  {
    name: "Enterprise",
    price: "from $15,000",
    cadence: "1,000+ submissions",
    validity: "contract term",
    message: "Corporate, universities, and custom judging workflows.",
    bestFor: "Best for: custom, high-volume programs.",
    cta: "Talk to sales",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Everything in Pro",
      "White-label branding",
      "SLA + security review",
      "Dedicated support",
    ],
  },
];

/* 3. Full comparison — all 6 levels (brief §3, pricing-model.en.md v0.4). */
const COMPARE_COLS = [
  "Free",
  "Starter",
  "Pilot",
  "Standard",
  "Pro",
  "Enterprise",
];

const COMPARE_ROWS = [
  {
    label: "Price",
    cells: ["$0", "$199", "$500", "$1,500", "$3,900", "from $15,000"],
    num: true,
  },
  {
    label: "Submissions included",
    cells: ["3", "15", "40", "150", "500", "custom"],
    num: true,
  },
  {
    label: "Validity",
    cells: [
      "lifetime trial",
      "90 days",
      "90 days",
      "120 days",
      "180 days",
      "contract term",
    ],
    num: true,
  },
  {
    label: "Projects",
    cells: ["1", "1", "2", "5", "unlimited", "custom"],
    num: true,
  },
  {
    label: "Top-up package",
    cells: ["—", "+10 / $150", "+10 / $150", "+25 / $300", "+50 / $500", "custom"],
    num: true,
  },
  {
    label: "Effective price per submission",
    cells: ["—", "$15", "$15", "$12", "$10", "custom"],
    num: true,
  },
  {
    label: "6 AI judges (P1–P6)",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Evidence-linked rationale",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Human-in-the-loop scoring",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Review Board + leaderboard",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Prompt-injection safety & privacy",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Self-upload page",
    cells: ["—", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "CSV export",
    cells: ["—", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "PDF export",
    cells: ["—", "—", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Remove watermark",
    cells: ["—", "—", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Custom AI judges",
    cells: ["—", "—", "—", "add-on", "limited", "✓"],
  },
  {
    label: "BYO LLM",
    cells: ["—", "—", "—", "—", "add-on", "✓"],
  },
  {
    label: "White-label branding",
    cells: ["—", "—", "—", "—", "—", "✓"],
  },
  {
    label: "SLA + security review",
    cells: ["—", "—", "—", "—", "—", "✓"],
  },
  {
    label: "Admin seats",
    cells: ["1", "1", "2", "5", "10", "custom"],
    num: true,
  },
  {
    label: "Human judges",
    cells: ["0", "2", "5", "10", "25", "custom"],
    num: true,
  },
  {
    label: "Support",
    cells: [
      "—",
      "—",
      "Async setup",
      "Setup call + priority",
      "Setup call + priority",
      "Dedicated",
    ],
    num: true,
  },
];

/* 4. Where EvalLense fits — UNNAMED category framing. NO competitor names. */
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
    tag: "EvalLense",
    body: "Both, plus what neither has: six independent judges (P1–P6), transparent evidence-linked rationale, a leaderboard, and human-in-the-loop final scoring.",
    gap: null,
    us: true,
  },
];

/* 4b. Where EvalLense fits — UNNAMED comparison table. NO competitor names.
 * Columns: workflow-platforms · deck-analysts · EvalLense (highlighted). */
const FIT_TABLE_COLS = [
  "Event-workflow platforms",
  "AI deck-analysts",
  "EvalLense",
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

/* 6. FAQ — static Q/A blocks (NOT a JS accordion). Brief §6, 9 items.
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
    a: "Add more anytime with top-up packages (from $150 for 10, cheaper on higher plans), or move up a plan.",
  },
  {
    q: "How long do submissions last?",
    a: "Starter and Pilot, 90 days; Standard, 120 days; Pro, 180 days; Enterprise, the contract term.",
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
    q: "Is there a paid pilot?",
    a: "Yes — Pilot, $500 for 40 submissions. Talk to sales.",
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



        {/* 2. Plans — 4 headline pricing cards (page-local), light. Standard recommended. */}
        <section id="plans" className="band pr-plans">
          <div className="wrap">
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
                  <p className="pr-card__price">{plan.price}</p>
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
            <p className="pr-smaller" data-reveal="up">
              For smaller events: Starter is $199 for 15 submissions. Pilot is
              $500 for 40. See the full comparison below.
            </p>
          </div>
        </section>

        {/* 3. Comparison matrix — all 6 levels (page-local), soft. Scrolls inside wrapper. */}
        <section id="compare" className="band soft pr-compare">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Full comparison
              </span>
              <h2 className="title">Compare <span className="grad-word">plans</span></h2>
              <p className="sub">
                Compare submissions, validity, projects, exports, support, and
                admin controls.
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
                          col === "Standard" ? "pr-th pr-th--reco" : "pr-th"
                        }
                      >
                        {col === "Standard" ? (
                          <>
                            Standard
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
                          className={
                            COMPARE_COLS[i] === "Standard"
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
          </div>
        </section>
        {/* light→ink flip seam: light zone (§1–§3) crossfades into INK §4. */}
        <ZoneToneFlip />

        {/* 4. Where EvalLense fits — UNNAMED category framing (page-local), INK peak. */}
        <section className="band ink pr-fit">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Where EvalLense fits
              </span>
              <h2 className="title">Event workflow and AI evaluation in <span className="grad-word">one place</span></h2>
              <p className="sub">
                Event platforms manage submissions and judges. AI deck tools
                review one deck at a time. EvalLense evaluates the full cohort —
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
              aria-label="Where EvalLense fits — capabilities compared across two half-solution categories and EvalLense; scroll horizontally on small screens"
            >
              <table className="pr-table">
                <caption className="pr-table__caption">
                  Capabilities compared across two half-solution categories and
                  EvalLense.
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
                          col === "EvalLense" ? "pr-th pr-th--us" : "pr-th"
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
                          className={
                            FIT_TABLE_COLS[i] === "EvalLense"
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
                They manage the competition. EvalLense helps compare who is
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
          media={{ videoSrc: "/assets/cta/cube-1.mp4" }}
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
        <Faq
          id="faq"
          surface="ink"
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
          sub="Start with 3 free submissions, or book a demo using your own decks."
          primary={{ label: "Book a demo", href: "/company/contact" }}
          secondary={{ label: "Start free", href: "/company/contact" }}
          videoSrc="/assets/cta/neo.mp4"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
