import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense Entry Hub — One Intake Flow for Pitch Decks",
  description:
    "Entry Hub replaces scattered intake with one controlled flow: a public submission page, pitch-deck collection and a clean batch workspace before evaluation starts.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/entry-hub/.
 *
 * 1. hero (section 1) — 16:9
 *    Scattered intake channels (email, forms, chats, folders) converge into a
 *    single lens-shaped funnel.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre.
 *
 * 2. flow (section 3, beside the pinned six steps) — 4:3
 *    A horizontal track of six steps (create → configure → share → upload →
 *    workspace → start) whose nodes light up in sequence.
 *    Prompt: same tokens, ink surface, thin node-lines, one lit node.
 *
 * 3. upload (section 5, beside the two collection modes) — 4:3
 *    A realistic UI mockup of the public upload page /e/<slug> next to the
 *    applications dashboard.
 *    Prompt: same tokens, hairline frames, one lens accent, calm; no chrome
 *    noise.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief (wiki/product/entry-hub.md): two collection
 * modes (Manual · Self-upload); a public submission page /e/<slug> gated on
 * is_published=true (otherwise 404); deck formats PDF / PPT / PPTX / Google
 * Slides; a 5-step wizard before collection; evaluation starts with ≥1
 * application in the `ready` state. The 50 MB file limit is a placeholder in
 * the Application (scope.md OQ3) and is presented gently. CSV import and email
 * notifications are post-MVP and are NOT promised (see story 11 open
 * questions).
 */

/* 3. How Entry Hub works — six steps revealed through the pin engine (brief §3). */
const FLOW_STEPS = [
  {
    num: "01",
    label: "Create the project",
    desc: "Spin up a project through the wizard — mode, details, criteria, judges and how applications are collected.",
  },
  {
    num: "02",
    label: "Configure intake",
    desc: "Set what materials a submission needs, the deadline and the limit for the public submission page.",
  },
  {
    num: "03",
    label: "Share the entry link",
    desc: "Publish a private entry link — a public submission page at /e/<slug> that opens only once the project is live.",
  },
  {
    num: "04",
    label: "Participants upload",
    desc: "Teams upload their decks themselves through the link, and each application appears automatically.",
  },
  {
    num: "05",
    label: "Applications collect",
    desc: "Submissions gather in a private workspace — a list with statuses and a completeness signal per application.",
  },
  {
    num: "06",
    label: "Start from a clean batch",
    desc: "Evaluation starts from a clean batch — Start Judging unlocks once at least one application is ready.",
  },
];

/* 4. What gets collected — feature grid (brief §4). */
const COLLECTED = [
  {
    tag: "Applicant",
    title: "Startup & team",
    body: "Startup name and founder or team information land in a single structured record per application.",
    feature: true,
  },
  {
    tag: "Deck",
    title: "Pitch deck",
    body: "A pitch deck as a PDF, PPT or PPTX file, or a Google Slides URL — collected in one place per application.",
  },
  {
    tag: "Program",
    title: "Program fields",
    body: "Program-specific fields and an optional comment, shaped to what your event actually asks for.",
  },
  {
    tag: "Status",
    title: "Submission status",
    body: "Submission metadata and a review status — ready, incomplete or submitted — so the batch state is always visible.",
  },
];

export default function EntryHubPage() {
  return (
    <>
      <SiteHeader light />
      <main className="entry-hub">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft eh-hero">
          <div className="wrap eh-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Entry Hub
            </span>
            <h1
              className="eh-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              One entry point for every evaluation{" "}
              <span className="grad-word">batch</span>
            </h1>
            <p
              className="sub eh-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Run a private intake flow for pitch decks and gather everything the
              review team needs in one place — instead of chasing files across
              inboxes, forms and chats.
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
              className="media-ph eh-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="Scattered intake channels converging into a single lens-shaped funnel"
            >
              <span className="media-ph__label">
                Image · channels into a lens · 16:9
              </span>
              <span className="media-ph__hint">
                Scattered intake channels converge into one lens-shaped funnel —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. The intake problem — full-bleed statement, DARK. */}
        <section className="band ink eh-problem">
          <div className="wrap eh-problem__statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              The intake problem
            </span>
            <h2
              className="eh-problem__h"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Decks arrive through email, Forms, Airtable, Notion, Telegram and
              manual uploads — and the batch turns into{" "}
              <span className="grad-word">chaos</span>.
            </h2>
            <p
              className="sub eh-problem__note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Scattered channels mean lost files, duplicates and slow prep. The
              team spends its time sorting submissions instead of evaluating
              them.
            </p>
          </div>
        </section>

        {/* 3. How Entry Hub works — pinned multi-screen, light. Six steps light up. */}
        <section
          className="band eh-flow"
          data-pin
          data-pin-steps="6"
          aria-label="How Entry Hub works — six steps"
        >
          <div className="eh-flow__stage" data-pin-stage>
            <div className="wrap eh-flow__grid">
              <div className="eh-flow__col">
                <div className="head eh-flow__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    How it works
                  </span>
                  <h2 className="title">From a fresh project to a clean batch</h2>
                  <p className="sub">
                    Entry Hub takes an organizer from creating a project to a
                    batch that is ready to evaluate. Each step lights up as you
                    scroll through it.
                  </p>
                </div>
                <ol className="eh-flow__track">
                  {FLOW_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="eh-step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="eh-step__num">{s.num}</span>
                      <span className="eh-step__label">{s.label}</span>
                      <span className="eh-step__desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* flow visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph eh-flow__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A horizontal track of six steps whose nodes light up in sequence"
              >
                <span className="media-ph__label">
                  Image · entry flow · 4:3
                </span>
                <span className="media-ph__hint">
                  A six-step track — create → configure → share → upload →
                  workspace → start — nodes lighting in sequence; see prompt 2 in
                  file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 4. What gets collected — feature grid, light. */}
        <section className="band eh-collect">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What gets collected
              </span>
              <h2 className="title">Everything a review needs, in one record</h2>
              <p className="sub">
                Each submission lands as a structured record — the applicant, the
                deck, the program fields and a status — so nothing is scattered by
                the time evaluation starts.
              </p>
            </div>
            <ul className="eh-collect__grid" data-reveal="up">
              {COLLECTED.map((c) => (
                <li
                  key={c.tag}
                  className={
                    c.feature ? "eh-tile eh-tile--feature" : "eh-tile"
                  }
                >
                  <span className="mini-tag">{c.tag}</span>
                  <h3 className="eh-tile__h">{c.title}</h3>
                  <p className="eh-tile__p">{c.body}</p>
                </li>
              ))}
            </ul>
            <p className="eh-collect__note" data-reveal="up">
              Pitch deck formats: PDF · PPT · PPTX · Google Slides — uploads stay
              within a generous per-file size limit.
            </p>
          </div>
        </section>

        {/* 5. Two ways to collect — editorial split, DARK. Visual slot via .media-ph. */}
        <section className="band ink eh-modes">
          <div className="wrap eh-modes__split">
            <div className="eh-modes__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Two ways to collect
              </span>
              <h2 className="title">Add them yourself, or let them upload</h2>
              <p className="sub">
                EvalLense supports two intake modes, so the flow fits how your
                event actually runs.
              </p>
              <ul className="eh-modes__list">
                <li className="eh-mode">
                  <span className="mini-tag">Manual</span>
                  <h3 className="eh-mode__h">Organizer adds participants</h3>
                  <p className="eh-mode__p">
                    The organizer adds participants on the project overview —
                    name, project, deck and any optional materials.
                  </p>
                </li>
                <li className="eh-mode">
                  <span className="mini-tag">Self-upload</span>
                  <h3 className="eh-mode__h">Public page at /e/&lt;slug&gt;</h3>
                  <p className="eh-mode__p">
                    A public submission page lets participants upload themselves.
                    It opens only once the project is published — otherwise the
                    link returns a 404 — and closes to late submissions after
                    evaluation begins.
                  </p>
                </li>
              </ul>
            </div>
            {/* upload visual slot — see prompt 3 in file header */}
            <figure
              className="media-ph eh-modes__media"
              style={{ ["--ratio" as string]: "4/3" }}
              data-reveal="right"
              role="img"
              aria-label="The public upload page /e/<slug> beside the applications dashboard"
            >
              <span className="media-ph__label">
                Image · upload page · 4:3
              </span>
              <span className="media-ph__hint">
                The public /e/&lt;slug&gt; upload page beside the applications
                dashboard — hairline frames, one lens accent; see prompt 3 in
                file header
              </span>
            </figure>
          </div>
        </section>

        {/* 6. The value — editorial split, light. */}
        <section className="band soft eh-value">
          <div className="wrap eh-value__split">
            <div className="eh-value__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The value
              </span>
              <h2 className="title">One source of truth before scoring starts</h2>
              <p className="sub">
                Entry Hub gives the team a single source of truth before
                evaluation begins — no chasing decks across inboxes, forms,
                folders and chats. Everything sits in one clean hub, ready for
                batch evaluation.
              </p>
            </div>
            <div className="eh-value__claim" data-reveal="right">
              <p className="eh-value__claim-text">
                The batch is clean before a single deck is scored — collected in
                one place, not reconstructed from scattered threads.
              </p>
              <span className="eh-value__claim-tag">
                Manual · Self-upload · clean batch
              </span>
            </div>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink eh-cta">
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
              See your entry flow come together on your own event
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch intake land in one clean batch — collected,
              structured and ready to evaluate.
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
