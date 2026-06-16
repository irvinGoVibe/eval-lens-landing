import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";

export const metadata: Metadata = {
  title: "EvalLense — Prompt Injection Safety for Pitch Evaluation",
  description:
    "Deck content is evidence, not a command: independent judges, deterministic math, advisory AI and a human in the loop keep evaluation under control.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/injection/.
 *
 * 1. hero (section 1) — 16:9
 *    A deck slide carrying a "hidden" line that passes through the lens and is
 *    tagged as evidence, not a command.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no shields, no security
 *    theatre.
 *
 * 2. holding layers (section 5, beside the pinned steps) — 4:3
 *    Vertical layers: judges → deterministic math → advisory AI → human; the
 *    injection signal fades downward as it descends through the layers.
 *    Prompt: same tokens, thin lines, ink surface, an injection thread fading
 *    toward the bottom layer.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block. <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Facts are CONFIRMED in the brief: 6 independent judges (J-P1…J-P6) that do
 * not see each other's scores; AI Total Score is advisory and does not rank;
 * Function 1 aggregation runs without an LLM and the narrative may not
 * contradict it; ranking is the human Jury Score / Final Score. Framing stays
 * at content-vs-control + human-final, with no claim of absolute protection
 * (see story 07 open questions).
 */

/* 2. What can go wrong — injection examples (brief §2). */
const INJECTION_EXAMPLES = [
  "A deck asks the model to “ignore the evaluation criteria”.",
  "A hidden instruction tells the judge to “give the maximum score”.",
  "A slide carries text written to sway the evaluator rather than inform it.",
];

/* 4. How the defence works — architecture, not a single filter (brief §4). */
const DEFENCES = [
  {
    tag: "Prompts",
    title: "Controlled evaluation prompts",
    body: "Judges run on a fixed contract with embedded dimensions — criteria don't arrive as a runtime field that deck content can overwrite.",
    feature: true,
  },
  {
    tag: "Judges",
    title: "Independent judges",
    body: "Six judges (J-P1…J-P6) evaluate in parallel and never see each other's scores, so an injection in one place can't infect the panel.",
  },
  {
    tag: "Hierarchy",
    title: "Instruction hierarchy",
    body: "Deck content enters as evidence, not as a system command — the evaluation rules outrank anything written in the document.",
  },
  {
    tag: "Signals",
    title: "Suspicious-content handling",
    body: "Hidden or manipulative text stays content and surfaces as a signal (review signals, key risks) instead of becoming an instruction.",
  },
  {
    tag: "Human",
    title: "Human review visibility",
    body: "Any suspicious case is visible to the organiser, who keeps the final call.",
  },
];

/* 5. Holding layers — steps revealed through the pin engine (brief §5). */
const HOLDING_LAYERS = [
  {
    layer: "01",
    label: "Judges",
    desc: "Independent, dimension-specific and evidence-bound — a single line of text can't steer the whole panel.",
  },
  {
    layer: "02",
    label: "Deterministic math",
    desc: "AI Total Score is computed by Function 1 with no LLM; the narrative (Function 2) may not contradict the numbers.",
  },
  {
    layer: "03",
    label: "Advisory AI",
    desc: "AI Total Score is a reference baseline only — it does not rank participants.",
  },
  {
    layer: "04",
    label: "Human",
    desc: "Ranking is built from the human Jury Score / Final Score. Swaying a deck means swaying the advisory, never the outcome.",
  },
];

export default function PromptInjectionSafetyPage() {
  return (
    <>
      <SiteHeader light />
      <main className="injection">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft injection-hero">
          <div className="wrap injection-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Prompt Injection Safety
            </span>
            <h1
              className="injection-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Your deck is <span className="grad-word">evidence</span>, not a
              command
            </h1>
            <p
              className="sub injection-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense reads the contents of a deck as material to analyse.
              Hidden instructions can't rewrite the evaluation rules or lift a
              score — the logic stays with the system and the human.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph injection-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A deck slide whose hidden line passes through the lens and is tagged as evidence, not a command"
            >
              <span className="media-ph__label">
                Image · deck through the lens · 16:9
              </span>
              <span className="media-ph__hint">
                A hidden deck line passes through the lens and is tagged as
                evidence, not a command — lens-gradient violet→cyan→aqua, calm;
                see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. What can go wrong — editorial split, light. */}
        <section className="band injection-risks">
          <div className="wrap risks-split">
            <div className="risks-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                What can go wrong
              </span>
              <h2 className="title">Decks can try to talk to the model</h2>
              <p className="sub">
                Pitch decks can carry hidden text, embedded instructions or
                adversarial content that tries to steer the AI. The simple
                cases look like this:
              </p>
            </div>
            <ul className="risks-list" data-reveal="right">
              {INJECTION_EXAMPLES.map((ex, i) => (
                <li
                  key={i}
                  className="risk-card"
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <span className="mini-tag">Injection</span>
                  <p className="risk-text">{ex}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Content / control boundary — full-bleed statement, DARK. */}
        <section className="band ink injection-boundary">
          <div className="wrap boundary-statement">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              The boundary
            </span>
            <h2
              className="boundary-h"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Deck content is <span className="grad-word">evidence</span> to
              analyse, not instruction to follow.
            </h2>
            <p
              className="sub boundary-note"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              The evaluation logic is controlled by the system, not by the
              uploaded deck. That separation is the base every other layer
              stands on.
            </p>
          </div>
        </section>

        {/* 4. How the defence works — bento / feature grid, light. */}
        <section className="band injection-defence">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                How the defence works
              </span>
              <h2 className="title">An architecture, not a single filter</h2>
              <p className="sub">
                Safety is built into the structure of the evaluation, not bolted
                on as one scanner. Each piece holds the boundary in a different
                way.
              </p>
            </div>
            <ul className="defence-grid" data-reveal="up">
              {DEFENCES.map((d) => (
                <li
                  key={d.tag}
                  className={
                    d.feature ? "defence-tile defence-tile--feature" : "defence-tile"
                  }
                >
                  <span className="mini-tag">{d.tag}</span>
                  <h3 className="defence-h">{d.title}</h3>
                  <p className="defence-p">{d.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Holding layers — pinned multi-screen, DARK. Four layers light up. */}
        <section
          className="band ink injection-layers"
          data-pin
          data-pin-steps="4"
          aria-label="How the outcome is held across layers"
        >
          <div className="layers-stage" data-pin-stage>
            <div className="wrap layers-grid">
              <div className="layers-col">
                <div className="head layers-head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Holding layers
                  </span>
                  <h2 className="title">Several layers hold the outcome</h2>
                  <p className="sub">
                    Even if a single line nudges one wording, the result is held
                    by layers — judges, deterministic math, advisory AI and a
                    person.
                  </p>
                </div>
                <ol className="layers-track">
                  {HOLDING_LAYERS.map((l, i) => (
                    <li
                      key={l.label}
                      className="layers-step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="layers-num">{l.layer}</span>
                      <span className="layers-label">{l.label}</span>
                      <span className="layers-desc">{l.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* holding layers visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph layers-visual"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Vertical layers where an injection signal fades from judges down to the human layer"
              >
                <span className="media-ph__label">
                  Image · holding layers · 4:3
                </span>
                <span className="media-ph__hint">
                  Judges → math → advisory → human; an injection thread fades
                  toward the bottom layer — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 6. Why it's fair — editorial split, light. */}
        <section className="band soft injection-fair">
          <div className="wrap fair-split">
            <div className="fair-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Why it's fair
              </span>
              <h2 className="title">No one wins by injection</h2>
              <p className="sub">
                Participants should not be able to influence their evaluation by
                embedding instructions in a deck. Separating content from
                control, and keeping the final decision human, is what makes the
                comparison fair.
              </p>
            </div>
            <div className="fair-claim" data-reveal="right">
              <p className="fair-claim__text">
                The strength of the pitch wins — not a prompt slipped to the
                model.
              </p>
              <span className="fair-claim__tag">Content vs control · human final</span>
            </div>
          </div>
        </section>

        {/* 7. Human in the loop — human-in-the-loop footer, light. */}
        <section className="band injection-hitl">
          <div className="wrap hitl-split">
            <div className="hitl-copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Human in the loop
              </span>
              <h2 className="title">AI prepares, a person finalises</h2>
              <p className="sub">
                EvalLense runs controlled evaluation and leaves the final
                decision with a person. The organiser sees the reasoning, the
                risk signals and the questions for live Q&amp;A, then sets the
                Jury Score.
              </p>
            </div>
            <div className="hitl-flow" data-reveal="right">
              <div className="hitl-node hitl-node--ai">
                <span className="mini-tag">AI</span>
                <h3 className="hitl-h">Prepares the evidence</h3>
                <p className="hitl-p">
                  The judges produce evidence-backed findings and surface any
                  suspicious content — they do not decide.
                </p>
              </div>
              <span className="hitl-arrow" aria-hidden="true">
                →
              </span>
              <div className="hitl-node hitl-node--human">
                <span className="mini-tag">Human</span>
                <h3 className="hitl-h">Sets the Jury Score</h3>
                <p className="hitl-p">
                  A person reviews the reasoning and risk signals, then sets the
                  Jury Score and Final Score that rank.
                </p>
              </div>
              <p className="hitl-audit">
                Ranking follows the human Jury Score / Final Score, never the
                advisory AI Total Score.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Final CTA — quiet CTA, DARK. */}
        <section className="band ink injection-cta">
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
              See how the evaluation stays under control on your decks
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch content stay content — evidence in, decision
              human.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <a className="btn btn-primary" href="/#demo">
                Book a Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
