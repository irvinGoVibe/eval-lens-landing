import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

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
    "Transparent EvalLense pricing — from a free trial to Enterprise. Pay per event, not per seat; 6 AI judges evaluate every pitch on every plan.",
};

/*
 * ── NUMBERS & SOURCE OF TRUTH ────────────────────────────────────────────
 * All prices/limits/validity/add-on packs are USD from the financial model
 * v0.4 ("Тарифы" sheet) — the source of truth. Do not round or invent.
 *   Free trial   $0       · 3 pitches    · until used
 *   Starter      $199     · 15 pitches   · 90 days   (matrix-only, smaller plan)
 *   Pilot        $500     · 40 pitches   · 90 days   (matrix-only, smaller plan)
 *   Standard ⭐  $1,500   · 150 pitches  · 120 days  (recommended)
 *   Professional $3,900   · 500 pitches  · 180 days
 *   Enterprise   from $15,000 · 1,000+ pitches · by contract
 *   Add-on packs: Starter/Pilot +$150·10 ($15/pitch); Standard +$300·25
 *   ($12/pitch); Professional +$500·50 ($10/pitch); Enterprise custom.
 *
 * ── DRAFT CONTENT (verify before publish) ────────────────────────────────
 * - Competitor feature values (section 4 — YouNoodle / Evalato / PitchBob VC)
 *   are DRAFT from research v0.2 (competitor-landscape.md). Verify the factual
 *   feature claims before publication. Competitor PRICES are intentionally NOT
 *   shown (user decision — avoids stale-price risk).
 * - Per-tier feature gating beyond price/pitches/validity (custom weights,
 *   templates, export bundle, branding, SSO/SAML, data residency, API,
 *   support level) is DRAFTED from brief §3 + research §11 — needs product
 *   confirmation before publish.
 *
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. The hero slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. It carries an --ratio so the
 * real asset drops in with zero layout shift.
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
 * editorial scroll format. Movement is `data-reveal` ONLY (no pin/scrub).
 * <ScrollFX/> is mounted once after <Footer/> so reveals fire. reduced-motion
 * is handled by the engine + the primitives' @media block.
 */

/* 2. Headline pricing cards — 4 public plans (brief §2, financial model v0.4). */
const PLANS = [
  {
    name: "Free trial",
    price: "$0",
    cadence: "3 pitches",
    validity: "valid until used",
    cta: "Start Free",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "3 pitches",
      "All 6 AI judges",
      "Evidence reports",
      "Human review",
    ],
  },
  {
    name: "Standard",
    price: "$1,500",
    cadence: "/ 150 pitches",
    validity: "120-day window",
    cta: "Get Started",
    href: "/company/contact",
    recommended: true,
    bullets: [
      "Everything in evaluation",
      "Leaderboard",
      "CSV / PDF export",
      "Custom criteria weights*",
      "Add-on packs from $12/pitch",
    ],
  },
  {
    name: "Professional",
    price: "$3,900",
    cadence: "/ 500 pitches",
    validity: "180-day window",
    cta: "Get Started",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Everything in Standard",
      "Event templates",
      "Export bundle",
      "Basic branding",
      "Add-on packs from $10/pitch",
    ],
  },
  {
    name: "Enterprise",
    price: "from $15,000",
    cadence: "/ 1,000+ pitches",
    validity: "by contract",
    cta: "Talk to Sales",
    href: "/company/contact",
    recommended: false,
    bullets: [
      "Everything in Pro",
      "SSO / SAML",
      "Data residency",
      "API access",
      "Custom AI methodology",
      "Dedicated support",
    ],
  },
];

/* 3. Full comparison — all 6 levels. ✓ = green, "—" = muted, "✓ all" spans. */
const COMPARE_COLS = [
  "Free",
  "Starter",
  "Pilot",
  "Standard",
  "Professional",
  "Enterprise",
];

const COMPARE_ROWS = [
  {
    label: "Price",
    cells: ["$0", "$199", "$500", "$1,500", "$3,900", "from $15,000"],
    num: true,
  },
  {
    label: "Pitches included",
    cells: ["3", "15", "40", "150", "500", "1,000+"],
    num: true,
  },
  {
    label: "Validity",
    cells: [
      "until used",
      "90 days",
      "90 days",
      "120 days",
      "180 days",
      "by contract",
    ],
    num: true,
  },
  {
    label: "Add-on pack",
    cells: ["—", "+$150·10", "+$150·10", "+$300·25", "+$500·50", "custom"],
    num: true,
  },
  {
    label: "Add-on price per pitch",
    cells: ["—", "$15", "$15", "$12", "$10", "custom"],
    num: true,
  },
  {
    label: "6 AI judges (P1–P6)",
    cells: ["✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Evidence-linked reports",
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
    label: "CSV / PDF export",
    cells: ["—", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    label: "Custom criteria weights",
    cells: ["—", "—", "—", "—", "✓", "✓"],
  },
  {
    label: "Event templates",
    cells: ["—", "—", "—", "—", "✓", "✓"],
  },
  {
    label: "Export bundle",
    cells: ["—", "—", "—", "—", "✓", "✓"],
  },
  {
    label: "Basic branding",
    cells: ["—", "—", "—", "—", "✓", "✓"],
  },
  {
    label: "SSO / SAML",
    cells: ["—", "—", "—", "—", "—", "✓"],
  },
  {
    label: "Data residency / DPA",
    cells: ["—", "—", "—", "—", "—", "✓"],
  },
  {
    label: "API access",
    cells: ["—", "—", "—", "—", "—", "✓"],
  },
  {
    label: "Support",
    cells: [
      "Community",
      "Email",
      "Email",
      "Priority",
      "Priority",
      "Dedicated",
    ],
    num: true,
  },
];

/* 4. EvalLense vs alternatives — feature presence, NO competitor prices.
   Values are DRAFT (research v0.2) — verify before publish. */
const VERSUS_COLS = ["YouNoodle", "Evalato", "PitchBob VC", "EvalLense"];

const VERSUS_ROWS = [
  {
    label: "AI deck evaluation as core",
    cells: ["✗", "✗", "✓", "✓"],
  },
  {
    label: "6 independent judges (P1–P6)",
    cells: ["✗", "✗", "partial", "✓"],
  },
  {
    label: "Transparent rationale (no black box)",
    cells: ["✗", "✗", "partial", "✓"],
  },
  {
    label: "Evidence-linked scoring",
    cells: ["✗", "✗", "partial", "✓"],
  },
  {
    label: "Whole-event evaluation (not single deck)",
    cells: ["✓", "✓", "✗", "✓"],
  },
  {
    label: "Leaderboard / ranking",
    cells: ["✓", "✓", "✗", "✓"],
  },
  {
    label: "Human-in-the-loop final decision",
    cells: ["manual", "manual", "✗", "✓"],
  },
  {
    label: "Questions for the live jury",
    cells: ["✗", "✗", "✗", "✓"],
  },
];

/* 5. Capabilities — horizontal scroll gallery, one card per product category. */
const CAPABILITIES = [
  {
    tag: "Intake",
    title: "Collect every deck",
    body: "Deck upload (PDF / PPTX / Slides), self-upload links and batch intake.",
  },
  {
    tag: "AI Evaluation",
    title: "Six independent judges",
    body: "Six independent judges P1–P6, each with confidence and evidence links.",
  },
  {
    tag: "Reports",
    title: "Explainable reports",
    body: "An explainable per-participant report — strengths, weaknesses and export.",
  },
  {
    tag: "Review & Decision",
    title: "A human makes the call",
    body: "Review Board, human final scoring and a leaderboard ranked by people.",
  },
  {
    tag: "Security & Trust",
    title: "Safe and transparent",
    body: "Prompt-injection safety, privacy and rationale — never a black box.",
  },
  {
    tag: "Admin",
    title: "Controls by plan",
    body: "Custom weights, event templates, branding, SSO and API by plan.",
  },
];

/* 6. FAQ — static Q/A blocks (NOT a JS accordion). */
const FAQ = [
  {
    q: "What counts as a pitch?",
    a: <>One evaluated deck or presentation.</>,
  },
  {
    q: "How long does a plan stay active?",
    a: <>90 / 120 / 180 days depending on plan; Enterprise by contract.</>,
  },
  {
    q: "What if I run out of pitches?",
    a: (
      <>
        Add-on packs (from $150 for 10; cheaper per pitch on higher tiers), or
        move up a tier.
      </>
    ),
  },
  {
    q: "Is this a subscription?",
    a: (
      <>
        No. You pay per event — a pack of pitches plus a validity window — not
        monthly.
      </>
    ),
  },
  {
    q: "Is there a paid pilot?",
    a: <>Yes: Pilot, $500 / 40 pitches. Talk to Sales.</>,
  },
  {
    q: "Are my decks secure?",
    a: (
      <>
        Yes, on every plan: prompt-injection safety and privacy.{" "}
        <a href="/trust/security-privacy">Security &amp; Privacy</a>.
      </>
    ),
  },
  {
    q: "Who makes the final decision?",
    a: (
      <>
        A human. AI prepares the analysis; final scoring stays with your jury.{" "}
        <a href="/trust">Learn how</a>.
      </>
    ),
  },
];

/** ✓ → green, "—"/"✗" → muted, anything else (numeric / "partial" / words) →
 *  rendered as a mono cell. Keeps the JSX in the tables compact. */
function cellClass(value: string) {
  if (value === "✓") return "pr-cell pr-cell--yes";
  if (value === "—" || value === "✗") return "pr-cell pr-cell--no";
  return "pr-cell pr-cell--num";
}

export default function PricingPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="pricing">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft pr-hero">
          <div className="wrap pr-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Pricing
            </span>
            <h1
              className="pr-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Pay <span className="grad-word">per event</span>, not per seat
            </h1>
            <p
              className="sub pr-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Each plan is a pack of evaluated pitches with a validity window.
              The price covers transparent AI evaluation — not just intake.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/company/contact">Start Free</Button>
              <Button variant="ghost" href="/company/contact">
                Book a Demo
              </Button>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph pr-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="An event filtered through a lens into a ranked result"
            >
              <span className="media-ph__label">
                Image · an event filtered through a lens into a ranked result ·
                16:9
              </span>
              <span className="media-ph__hint">
                Pitches pass through a lens and emerge as a ranked leaderboard —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file
                header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Plans — 4 headline pricing cards, light. Standard recommended. */}
        <section id="plans" className="band pr-plans">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Plans
              </span>
              <h2 className="title">Four ways to run an event</h2>
              <p className="sub">
                Every plan ships the full evaluation — all 6 AI judges, evidence
                reports and human review. Plans differ by volume and admin
                controls, never by trust.
              </p>
            </div>
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
              Smaller event? Starter — $199 / 15 pitches · Pilot — $500 / 40
              pitches. See the full comparison below.
            </p>
          </div>
        </section>

        {/* 3. Full comparison — all 6 levels, table scrolls inside its wrapper. */}
        <section id="compare" className="band soft pr-compare">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Compare
              </span>
              <h2 className="title">Every plan, side by side</h2>
              <p className="sub">
                All six levels — Free, Starter, Pilot, Standard, Professional and
                Enterprise. Evaluation, evidence and human review are on every
                plan; only volume and admin controls move.
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
                          col === "Standard"
                            ? "pr-th pr-th--reco"
                            : "pr-th"
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

        {/* 4. EvalLense vs alternatives — DARK statement band. No competitor
            prices. Feature values are DRAFT (verify before publish). */}
        <section className="band ink pr-versus">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Comparison
              </span>
              <h2 className="title">
                Workflow tools or AI analysts. EvalLense is both.
              </h2>
              <p className="sub">
                Each alternative covers part of the picture. EvalLense is the
                only column that does all of it.
              </p>
            </div>
          </div>
          <div className="wrap">
            <div
              className="pr-table-scroll"
              data-reveal="up"
              tabIndex={0}
              role="region"
              aria-label="EvalLense compared with alternatives — scroll horizontally on small screens"
            >
              <table className="pr-table pr-table--versus">
                <caption className="pr-table__caption">
                  EvalLense feature coverage versus alternative tools.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="pr-th pr-th--row">
                      Capability
                    </th>
                    {VERSUS_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={
                          col === "EvalLense"
                            ? "pr-th pr-th--us"
                            : "pr-th"
                        }
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VERSUS_ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="pr-td pr-td--row">
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.label}-${VERSUS_COLS[i]}`}
                          className={
                            VERSUS_COLS[i] === "EvalLense"
                              ? `${cellClass(cell)} pr-td--us`
                              : cellClass(cell)
                          }
                        >
                          {cell === "✓" ? (
                            <span aria-label="Yes">✓</span>
                          ) : cell === "✗" ? (
                            <span aria-label="No">✗</span>
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
          <div className="wrap pr-versus__statements">
            <blockquote className="pr-statement" data-reveal="up">
              They manage the competition. We help understand who should win and
              why.
            </blockquote>
            <blockquote
              className="pr-statement"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              They review decks. We run structured evaluation across an entire
              competition.
            </blockquote>
          </div>
        </section>

        {/* 5. Capabilities — horizontal scroll gallery, light. */}
        <section className="band pr-caps">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What&rsquo;s included
              </span>
              <h2 className="title">Built for structured evaluation</h2>
            </div>
          </div>
          <ul
            className="pr-caps-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Capabilities by category — horizontally scrollable"
          >
            {CAPABILITIES.map((c) => (
              <li key={c.tag} className="pr-cap">
                <span className="pr-cap__signal" aria-hidden="true"></span>
                <span className="mini-tag">{c.tag}</span>
                <h3 className="pr-cap__h">{c.title}</h3>
                <p className="pr-cap__p">{c.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. FAQ — static Q/A blocks (NOT a JS accordion), light. */}
        <section id="faq" className="band soft pr-faq">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                FAQ
              </span>
              <h2 className="title">Pricing questions</h2>
            </div>
            <dl className="pr-faq__grid" data-reveal="up">
              {FAQ.map((item) => (
                <div key={item.q} className="pr-faq__item">
                  <dt className="pr-faq__q">{item.q}</dt>
                  <dd className="pr-faq__a">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink pr-cta">
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
              Run structured evaluation on your own event
            </h2>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <Button href="/company/contact">Book a Demo</Button>
              <Button variant="ghost" href="/company/contact">
                Start Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
