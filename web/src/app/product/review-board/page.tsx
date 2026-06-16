import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EvalLense Review Board — Compare, Shortlist, Decide",
  description:
    "Review Board is the EvalLense decision workspace: compare scored startups, set human Jury Scores, rank by Final Score and keep a decision trail — the human decides.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/review-board/.
 *
 * 1. hero (section 1) — 16:9
 *    A board of startup cards; one card lifts into a shortlist under a human
 *    decision.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no leaderboard theatre.
 *
 * 2. board (section 3, the dark bento feature tile) — 16:9
 *    A bento of the board: startup list with statuses, scores, comparison,
 *    leaderboard.
 *    Prompt: realistic UI tiles, hairline frames, one lens accent, ink
 *    surface, calm.
 *
 * 3. hitl (section 4, beside the pinned four steps) — 4:3
 *    A track: AI report → live Q&A → Jury Score slider → Leaderboard; nodes
 *    light up along the track, the human-approval node in AI-green.
 *    Prompt: same tokens, thin node-lines, one lit node.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-pin). No per-section useEffect, no ScrollOrchestrator
 * edits. reduced-motion is handled by the engine + the primitives' @media
 * block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief (wiki/product/review-board.md): the human
 * Jury Score is 0.0–10.0 per dimension across P1–P6; the Leaderboard ranks by
 * the human Final Score (weights applied to the Jury Score); the AI Total
 * Score is an advisory baseline and does NOT rank; five participant statuses
 * (AI Report Ready / In Review / Scored / Not Scored / Error); the audit trail
 * shows the AI score and the human score together; spread bands <1.5 /
 * 1.5–2.99 / >=3.0 signal borderline cases; one organizer per project in MVP.
 * Multi-organizer / blind voting / deliberation, WINNER / TOP-3 /
 * compare-with-#1 badges, and leaderboard unlock / public report links are
 * post-MVP and are NOT promised (see story 13 open questions).
 */

/* 3. What lives on the board — bento tiles (brief §3). */
const BOARD_TILES = [
  {
    tag: "Startup list",
    title: "Every entry, with a live status",
    body: "The batch sits in one list, each application carrying a status — AI Report Ready, In Review, Scored, Not Scored or Error — so the board state is always readable.",
    feature: true,
  },
  {
    tag: "AI Total Score",
    title: "Advisory baseline, not a verdict",
    body: "The AI Total Score sits beside each entry as a reference. It is advisory — it informs the read but never ranks the board.",
  },
  {
    tag: "Judge summaries",
    title: "What each lens found",
    body: "Per-dimension judge summaries across P1–P6 give the context behind a number, so a score is never read in isolation.",
  },
  {
    tag: "Comparison",
    title: "Startups side by side",
    body: "A comparison view places candidates next to each other across the same dimensions, so differences are visible instead of inferred.",
  },
  {
    tag: "Leaderboard",
    title: "Ranked by the human Final Score",
    body: "The leaderboard orders the batch by the human Final Score — criterion weights applied to the Jury Score — not by the AI number.",
  },
  {
    tag: "Shortlist",
    title: "The strongest, set aside",
    body: "Promising candidates are pulled into a shortlist, and the final decision state is held on the board rather than in scattered notes.",
  },
];

/* 4. Human-in-the-loop — four steps revealed through the pin engine (brief §4). */
const HITL_STEPS = [
  {
    num: "01",
    label: "AI report",
    desc: "The organizer opens a Participant Report and studies the AI analysis — judge findings across P1–P6 with the advisory AI Total Score.",
  },
  {
    num: "02",
    label: "Live Q&A",
    desc: "Questions for Participants drive a live Q&A, so the read is grounded in the team, not just the deck.",
  },
  {
    num: "03",
    label: "Jury Score",
    desc: "The organizer sets the Jury Score per dimension on a 0.0–10.0 scale, and sees the delta between the AI and human score.",
  },
  {
    num: "04",
    label: "Leaderboard",
    desc: "The Leaderboard is generated from the human Final Score — ranking the batch on the organizer's judgment, not the AI baseline.",
  },
];

export default function ReviewBoardPage() {
  return (
    <>
      <SiteHeader light />
      <main className="review-board">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft rb-hero">
          <div className="wrap rb-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Review Board
            </span>
            <h1
              className="rb-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Where AI analysis becomes a human{" "}
              <span className="grad-word">decision</span>
            </h1>
            <p
              className="sub rb-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Compare scored startups, study the evidence and build a shortlist
              — and keep the final decision with a person. AI prepares the
              analysis; the team owns the outcome.
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
              className="media-ph rb-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A board of startup cards with one card lifting into a shortlist under a human decision"
            >
              <span className="media-ph__label">
                Image · board into a decision · 16:9
              </span>
              <span className="media-ph__hint">
                A board of startup cards, one lifting into a shortlist under a
                human decision — lens-gradient violet→cyan→aqua, calm; see
                prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Why a team needs the board — editorial split, light. */}
        <section className="band rb-why">
          <div className="wrap rb-why__split">
            <div className="rb-why__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Why a team needs the board
              </span>
              <h2 className="title">Scores are generated. Now what?</h2>
              <p className="sub">
                Once the batch is scored, the work shifts from reading single
                reports to making a batch-level call — and that is where the
                operational pain shows up.
              </p>
            </div>
            <ul className="rb-why__list" data-reveal="right">
              <li
                className="rb-why__card"
                style={{ ["--reveal-delay" as string]: "0ms" }}
              >
                <span className="mini-tag">Compare</span>
                <p className="rb-why__text">
                  Many reports are hard to compare by hand — the differences get
                  lost across tabs and threads.
                </p>
              </li>
              <li
                className="rb-why__card"
                style={{ ["--reveal-delay" as string]: "70ms" }}
              >
                <span className="mini-tag">Context</span>
                <p className="rb-why__text">
                  Scores need context — a number means little without the
                  evidence and judge findings behind it.
                </p>
              </li>
              <li
                className="rb-why__card"
                style={{ ["--reveal-delay" as string]: "140ms" }}
              >
                <span className="mini-tag">One view</span>
                <p className="rb-why__text">
                  Reviewers need one shared view of the batch instead of
                  reconstructing it from separate files.
                </p>
              </li>
              <li
                className="rb-why__card"
                style={{ ["--reveal-delay" as string]: "210ms" }}
              >
                <span className="mini-tag">Trail</span>
                <p className="rb-why__text">
                  Final decisions have to be recorded and explainable later —
                  not lost the moment they are made.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. What lives on the board — bento, DARK. Visual slot via .media-ph. */}
        <section className="band ink rb-board">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What lives on the board
              </span>
              <h2 className="title">One view of the whole batch</h2>
              <p className="sub">
                Review Board brings every participant into a single workspace —
                statuses, scores, summaries, comparison and a leaderboard — so
                the batch reads as one decision surface, not a pile of reports.
              </p>
            </div>
            <ul className="rb-board__grid" data-reveal="up">
              {BOARD_TILES.map((t) => (
                <li
                  key={t.tag}
                  className={
                    t.feature ? "rb-tile rb-tile--feature" : "rb-tile"
                  }
                >
                  <span className="mini-tag">{t.tag}</span>
                  <h3 className="rb-tile__h">{t.title}</h3>
                  <p className="rb-tile__p">{t.body}</p>
                  {t.feature ? (
                    /* board visual slot — see prompt 2 in file header */
                    <figure
                      className="media-ph rb-tile__media"
                      style={{ ["--ratio" as string]: "16/9" }}
                      role="img"
                      aria-label="A bento of the board: startup list with statuses, scores, comparison and leaderboard"
                    >
                      <span className="media-ph__label">
                        Image · board bento · 16:9
                      </span>
                      <span className="media-ph__hint">
                        Startup list with statuses, scores, comparison and
                        leaderboard — hairline tiles, one lens accent; see
                        prompt 2 in file header
                      </span>
                    </figure>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Human-in-the-loop — pinned multi-screen, light. Four steps light up. */}
        <section
          className="band rb-hitl"
          data-pin
          data-pin-steps="4"
          aria-label="Human in the loop — four steps from AI report to leaderboard"
        >
          <div className="rb-hitl__stage" data-pin-stage>
            <div className="wrap rb-hitl__grid">
              <div className="rb-hitl__col">
                <div className="head rb-hitl__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Human in the loop
                  </span>
                  <h2 className="title">AI prepares — the human finalizes</h2>
                  <p className="sub">
                    EvalLense does not finalize a result automatically. The
                    organizer moves from the AI report to a human Jury Score and
                    a leaderboard — each step lights up as you scroll through it.
                  </p>
                </div>
                <ol className="rb-hitl__track">
                  {HITL_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="rb-hstep"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="rb-hstep__num">{s.num}</span>
                      <span className="rb-hstep__label">{s.label}</span>
                      <span className="rb-hstep__desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* hitl visual slot — see prompt 3 in file header */}
              <figure
                className="media-ph rb-hitl__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="A track from AI report through live Q&A and Jury Score to the leaderboard"
              >
                <span className="media-ph__label">
                  Image · human-in-the-loop track · 4:3
                </span>
                <span className="media-ph__hint">
                  AI report → live Q&amp;A → Jury Score slider → Leaderboard,
                  nodes lighting in sequence; see prompt 3 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 5. Compare and leaderboard — editorial split, DARK. */}
        <section className="band ink rb-compare">
          <div className="wrap rb-compare__split">
            <div className="rb-compare__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Compare &amp; leaderboard
              </span>
              <h2 className="title">From separate reports to one decision</h2>
              <p className="sub">
                The board turns a batch of reports into a comparison: candidates
                side by side, sorted on a score or a dimension, with the
                strongest pulled into a shortlist.
              </p>
              <ul className="rb-compare__list">
                <li className="rb-compare__item">
                  <span className="mini-tag">Side by side</span>
                  <p className="rb-compare__p">
                    Compare startups across the same dimensions and sort by
                    score or by a single measure.
                  </p>
                </li>
                <li className="rb-compare__item">
                  <span className="mini-tag">Borderline</span>
                  <p className="rb-compare__p">
                    Spot unstable cases through the spread between judges —
                    bands of under 1.5, 1.5 to 2.99 and 3.0 or more flag where a
                    closer human read is needed.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rb-compare__claim" data-reveal="right">
              <p className="rb-compare__claim-text">
                The leaderboard ranks by the human Final Score — weights applied
                to the Jury Score. The AI Total Score stays beside it as a
                reference, never as the ranking.
              </p>
              <span className="rb-compare__claim-tag">
                Final Score ranks · AI Total Score advisory
              </span>
            </div>
          </div>
        </section>

        {/* 6. Decision trail — full-bleed statement, light. */}
        <section className="band soft rb-trail">
          <div className="wrap rb-trail__statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Decision trail
            </span>
            <h2
              className="rb-trail__h"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              The AI score and the human score stay visible{" "}
              <span className="grad-word">together</span>.
            </h2>
            <p
              className="sub rb-trail__note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              They don't overwrite each other: the AI Total Score remains an
              advisory baseline, the Jury Score becomes the final one. That
              keeps the reasoning intact and makes a choice explainable later.
            </p>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink rb-cta">
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
              See the board carry you from analysis to a decision
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch a scored batch become a shortlist, a
              leaderboard and a decision a person owns.
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
