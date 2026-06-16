import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense — Security & Privacy for Pitch Deck Evaluation",
  description:
    "Private deck handling, database-level project isolation, server-only secrets and human-owned decisions — security as the trust layer of EvalLense.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/security/.
 *
 * 1. hero (section 1) — 16:9
 *    A deck entering a private "lens" perimeter; a soft lock hint without
 *    security theatre.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no shields, no padlocks
 *    shouting — a quiet contained perimeter.
 *
 * 2. access flow (section 5, beside the pinned steps) — 4:3
 *    A chain: cookies → server → RLS → isolated project data. Thin flow lines
 *    showing the session handing off to the database where policies apply.
 *    Prompt: same tokens, thin lines, ink surface, a session thread that
 *    narrows into a single project's isolated data.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief: Supabase Auth + @supabase/ssr with the
 * session in httpOnly cookies; Postgres RLS isolates projects via
 * organizer_id = auth.uid(); roles user/admin/participant; service-role and
 * AI Gateway keys are server-only (never in the client bundle), admin ops
 * gated by requireAdmin(); the public application form at /e/<slug> is only
 * reachable when is_published=true (else 404); one organizer per project in
 * MVP; the human owns the Final Score. NO claims of certifications or
 * encryption-at-rest — those are open questions in the brief, not facts.
 */

/* 2. Why privacy matters — what is sensitive (brief §2). */
const SENSITIVE_ITEMS = [
  "A deck can carry confidential strategy that should not leak.",
  "Financial data needs careful, controlled handling.",
  "Founder information has to be protected.",
  "An evaluation result shapes funding, selection and reputation.",
];

/* 4. Access control — roles, isolation, secrets, sign-in (brief §4). */
const ACCESS_CONTROLS = [
  {
    tag: "Isolation",
    title: "Database-level project isolation",
    body: "Postgres applies row-level policies on every query: an organizer sees only their own projects (organizer_id = auth.uid()). Isolation lives in the database, not just in the UI.",
    feature: true,
  },
  {
    tag: "Roles",
    title: "Role-based access",
    body: "Roles user / admin / participant decide who sees what; a person can hold several, and the organizer-vs-participant context depends on the project.",
  },
  {
    tag: "Secrets",
    title: "Server-only secrets",
    body: "Service-role and AI Gateway keys live only on the server and never reach the client bundle; admin operations run after an explicit requireAdmin() check.",
  },
  {
    tag: "Sign-in",
    title: "Hardened sign-in",
    body: "Generic login errors avoid leaking whether an email exists, an open-redirect guard sanitizes return URLs, and email verification is required.",
  },
  {
    tag: "Public form",
    title: "Published-gate on intake",
    body: "The public self-upload page /e/<slug> is reachable only when the project is published (is_published=true) — otherwise it returns 404.",
  },
];

/* 5. Under the hood — auth steps revealed through the pin engine (brief §5). */
const ACCESS_STEPS = [
  {
    layer: "01",
    label: "Supabase Auth",
    desc: "Authentication runs on Supabase Auth with @supabase/ssr — the proven layer that issues and validates the session.",
  },
  {
    layer: "02",
    label: "httpOnly cookies",
    desc: "The session lives in httpOnly cookies, so client-side scripts can't read the token directly.",
  },
  {
    layer: "03",
    label: "RLS auth.uid()",
    desc: "Cookies travel to Postgres automatically; RLS reads auth.uid() and applies row-level policies on every request.",
  },
  {
    layer: "04",
    label: "Methods & middleware",
    desc: "Email + password (verified), Google OAuth and email reset; protected routes sit behind middleware, and the service-role key is used only in admin APIs after requireAdmin().",
  },
];

export default function SecurityPrivacyPage() {
  return (
    <>
      <SiteHeader light />
      <main className="security">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft security-hero">
          <div className="wrap security-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Security &amp; Privacy
            </span>
            <h1
              className="security-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Private by design, decided by{" "}
              <span className="grad-word">humans</span>
            </h1>
            <p
              className="sub security-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Private pitch-deck handling, controlled access to the workspace and
              deliberate report delivery — at every step. The decision stays with
              a person.
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
              className="media-ph security-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A deck entering a private lens perimeter with a soft lock hint"
            >
              <span className="media-ph__label">
                Image · deck in a private perimeter · 16:9
              </span>
              <span className="media-ph__hint">
                A deck enters a contained lens perimeter, soft lock hint, no
                security theatre — lens-gradient violet→cyan→aqua, calm; see
                prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Why privacy matters — editorial split, light. */}
        <section className="band security-why">
          <div className="wrap why-split">
            <div className="why-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Why privacy matters
              </span>
              <h2 className="title">Decks and results are sensitive</h2>
              <p className="sub">
                Pitch decks and evaluation results carry information that should
                not move freely. Handling them carelessly puts founders, funds
                and outcomes at risk.
              </p>
            </div>
            <ul className="why-list" data-reveal="right">
              {SENSITIVE_ITEMS.map((item, i) => (
                <li
                  key={i}
                  className="why-card"
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <span className="mini-tag">Sensitive</span>
                  <p className="why-text">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Private workspace — bento, DARK. */}
        <section className="band ink security-workspace">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Private workspace
              </span>
              <h2 className="title">Every batch lives in a controlled space</h2>
              <p className="sub">
                Evaluation doesn't happen in the open. Each batch runs inside a
                controlled workspace where access is scoped to the people who
                belong there.
              </p>
            </div>
            <ul className="workspace-grid" data-reveal="up">
              <li className="workspace-tile workspace-tile--feature">
                <span className="mini-tag">Controlled workspace</span>
                <h3 className="workspace-h">
                  A batch is not a public document
                </h3>
                <p className="workspace-p">
                  Decks, applications, scores and reports stay inside an
                  authorized workspace. Nothing about a batch is exposed by
                  default — access is granted, not assumed.
                </p>
              </li>
              <li className="workspace-tile">
                <span className="mini-tag">One organizer</span>
                <h3 className="workspace-h">One organizer per project</h3>
                <p className="workspace-p">
                  In the MVP a project belongs to a single organizer, who owns
                  its decks, evaluations and reports.
                </p>
              </li>
              <li className="workspace-tile">
                <span className="mini-tag">Published-gate</span>
                <h3 className="workspace-h">Intake opens on purpose</h3>
                <p className="workspace-p">
                  Participants submit through the public page /e/&lt;slug&gt;,
                  which is reachable only when the project is published —
                  otherwise it returns 404.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Access control — feature grid, light. */}
        <section className="band security-access">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Access control
              </span>
              <h2 className="title">Who sees what is enforced, not trusted</h2>
              <p className="sub">
                Access is decided by roles and data isolation, with secrets kept
                off the client and sign-in hardened against common leaks.
              </p>
            </div>
            <ul className="access-grid" data-reveal="up">
              {ACCESS_CONTROLS.map((a) => (
                <li
                  key={a.tag}
                  className={
                    a.feature
                      ? "access-tile access-tile--feature"
                      : "access-tile"
                  }
                >
                  <span className="mini-tag">{a.tag}</span>
                  <h3 className="access-h">{a.title}</h3>
                  <p className="access-p">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Under the hood — pinned multi-screen, DARK. Four steps light up. */}
        <section
          className="band ink security-flow"
          data-pin
          data-pin-steps="4"
          aria-label="How access is protected under the hood"
        >
          <div className="flow-stage" data-pin-stage>
            <div className="wrap flow-grid">
              <div className="flow-col">
                <div className="head flow-head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Under the hood
                  </span>
                  <h2 className="title">How access is protected</h2>
                  <p className="sub">
                    The authentication layer is stable: a session in httpOnly
                    cookies hands off to Postgres, where row-level policies
                    decide what each request can see.
                  </p>
                </div>
                <ol className="flow-track">
                  {ACCESS_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="flow-step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="flow-num">{s.layer}</span>
                      <span className="flow-label">{s.label}</span>
                      <span className="flow-desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* access flow visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph flow-visual"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A chain from cookies through the server to RLS and isolated project data"
              >
                <span className="media-ph__label">
                  Image · access flow · 4:3
                </span>
                <span className="media-ph__hint">
                  cookies → server → RLS → isolated project data; a session
                  thread narrows into one project — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 6. Report delivery — editorial split, light. */}
        <section className="band soft security-reports">
          <div className="wrap reports-split">
            <div className="reports-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Report delivery
              </span>
              <h2 className="title">Reports are shared deliberately</h2>
              <p className="sub">
                Reports should be shared on purpose, not leak by accident. Access
                runs through the organizer's authorized workspace rather than an
                open link.
              </p>
            </div>
            <div className="reports-claim" data-reveal="right">
              <p className="reports-claim__text">
                A report reaches someone because the organizer chose to share it
                — not because it slipped out.
              </p>
              <span className="reports-claim__tag">
                Participant-facing share · post-MVP
              </span>
            </div>
          </div>
        </section>

        {/* 7. Decisions stay human — human-in-the-loop footer, light. */}
        <section className="band security-hitl">
          <div className="wrap hitl-split">
            <div className="hitl-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Human in the loop
              </span>
              <h2 className="title">Decisions stay with a person</h2>
              <p className="sub">
                EvalLense prepares the analysis, but the final decision and how a
                report is used stay with a human. AI doesn't become an invisible
                final judge.
              </p>
            </div>
            <div className="hitl-flow" data-reveal="right">
              <div className="hitl-node hitl-node--ai">
                <span className="mini-tag">AI</span>
                <h3 className="hitl-h">Advisory analysis</h3>
                <p className="hitl-p">
                  AI Total Score is advisory and does not rank participants — it
                  is a reference, not a verdict.
                </p>
              </div>
              <span className="hitl-arrow" aria-hidden="true">
                →
              </span>
              <div className="hitl-node hitl-node--human">
                <span className="mini-tag">Human</span>
                <h3 className="hitl-h">Owns the Final Score</h3>
                <p className="hitl-p">
                  Ranking is built from the human Final Score; the organizer
                  decides how the report is used.
                </p>
              </div>
              <p className="hitl-audit">
                AI prepares, a person decides — the outcome is human-owned, not
                automated.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Final CTA — quiet CTA, DARK. */}
        <section className="band ink security-cta">
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
              Run a private pilot on your own data
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and see private handling, controlled access and
              human-owned decisions end to end.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
              <Button variant="ghost" href="/#demo">
                Contact Us
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
