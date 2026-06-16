import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About EvalLense — A Better Lens for Human Judgment",
  description:
    "Who and why builds EvalLense: the path from AI Jury to a controlled evaluation system, our principles and team. AI prepares the analysis — the person decides.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. Every visual slot below is a VISIBLE,
 * labeled `.media-ph` placeholder (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/about/.
 *
 * 1. hero (section 1) — 16:9
 *    A lens focusing a stream of applications into one clear signal.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; no security theatre.
 *
 * 2. story (section 3, beside the pinned history) — 4:3
 *    AI Jury → Testing → Pipeline → EvalLense as a chain of nodes on a lens
 *    track. Prompt: ink surface, thin node-lines, one lit node, minimal.
 *
 * 3–5. team portraits (section 5) — 3:4 each
 *    Full-height cut-out portraits on a neutral background, soft violet
 *    rim-light, calm. The surname sits as a large background type behind the
 *    person. Real photos to replace these placeholders (see open questions).
 *      portrait-yaroslav · portrait-vladislav · portrait-arseniy
 *
 * 6. segments (section 6, gallery cards) — 4:3 each
 *    Quiet signal-icons for each audience segment.
 *    Prompt: same tokens, light surface, hairline card frames, one small lens
 *    accent per card; calm, consistent, no logos or fabricated metrics.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal / data-scrub / data-pin). No per-section useEffect, no
 * ScrollOrchestrator edits. reduced-motion + mobile are handled by the engine
 * and the page CSS (pins relax into vertical stacks, content stays visible —
 * the team block gates on .is-active so reduced-motion shows all three).
 * <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * Copy is AUTHORED by the user (wiki/product/about.md §Контент по секциям) and
 * used verbatim: mission, the problem, the AI Jury → EvalLense story (Amazon
 * Nova hackathon, hundreds of internal runs), four principles, three team bios
 * (Yaroslav Volovoj, Vladislav Starodubov, Arseniy), seven audience segments
 * and the closing statement. No fabricated facts, no rewritten formulations.
 */

/* 3. From AI Jury to EvalLense — history steps revealed through the pin. */
const STORY_STEPS = [
  {
    num: "01",
    label: "AI Jury",
    desc: "The first version was built as AI Jury during the Amazon Nova hackathon. The idea: several specialized AI judges instead of one generic model opinion.",
  },
  {
    num: "02",
    label: "Hundreds of runs",
    desc: "After hundreds of internal evaluation runs, more judges did not automatically produce better results — scores changed between runs, judges repeated each other, long reports created noise over clarity.",
  },
  {
    num: "03",
    label: "A controlled system",
    desc: "That changed the direction: from a collection of AI agents to a controlled evaluation system.",
  },
];

/* 3. The pipeline nodes that light up under the story (authored chain). */
const STORY_PIPE = [
  "Pitch deck",
  "structured analysis",
  "specialized evaluation lenses",
  "fixed criteria and rubrics",
  "evidence-based report",
  "human review",
  "final decision",
];

/* 4. Our principles — bento (brief §4, verbatim). */
const PRINCIPLES = [
  {
    title: "AI supports decisions. It does not own them.",
    body: "EvalLense prepares the analysis, but the final score and ranking remain under human control.",
    feature: true,
  },
  {
    title: "Every score should be explainable.",
    body: "Reviewers should understand what influenced the result, which evidence was used and what information was missing.",
  },
  {
    title: "Disagreement is useful.",
    body: "When different evaluation lenses produce different conclusions, the system highlights the conflict instead of hiding it inside an average score.",
  },
  {
    title: "Methodology matters more than the model.",
    body: "Reliable evaluation requires clear criteria, controlled roles, structured outputs and consistent scoring logic.",
  },
];

/* 5. Team — creative pinned reveal (brief §5, bios verbatim). */
const TEAM = [
  {
    surname: "Volovoj",
    name: "Yaroslav Volovoj",
    role: "Product, Strategy and Methodology",
    bio: "Yaroslav leads product vision, evaluation methodology, positioning and go-to-market. More than fourteen years of experience with startups, digital products, business development and market-entry strategy. Focus: ensuring EvalLense solves a real decision-making problem instead of simply generating AI reports.",
  },
  {
    surname: "Starodubov",
    name: "Vladislav Starodubov",
    role: "Engineering and Architecture",
    bio: "Vladislav leads system architecture, engineering delivery and the AI evaluation pipeline. Background in software engineering, fintech, payment infrastructure and complex operational systems. Focus: making EvalLense reliable, secure and ready for repeated use at scale.",
  },
  {
    surname: "Arseniy",
    name: "Arseniy",
    role: "Product Experience",
    bio: "Arseniy works on product experience and interface structure. Focus: turning complex evaluation workflows, reports and decision signals into a clear and understandable product for organizers and reviewers.",
  },
];

/* 6. Who we build for — horizontal scroll-snap gallery (brief §6, verbatim). */
const SEGMENTS = [
  { tag: "Accelerators", body: "Cohorts of applications, reviewed against the same lenses." },
  { tag: "VC funds", body: "Inbound dealflow, screened faster and more consistently." },
  { tag: "Startup competitions", body: "Many teams to compare without losing the strongest." },
  { tag: "Hackathons", body: "Fast rounds where structure keeps the review fair." },
  { tag: "Grant programs", body: "Unified criteria and clearer feedback for every applicant." },
  { tag: "Corporate innovation teams", body: "Startups compared on fit, readiness and evidence." },
  { tag: "Universities", body: "Transparent, comparable evaluation across a round." },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader light />
      <main className="about">
        {/* 1. Hero / mission — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft ab-hero">
          <div className="wrap ab-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              About EvalLense
            </span>
            <h1
              className="ab-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              We built EvalLense to help people make better{" "}
              <span className="grad-word">decisions</span>
            </h1>
            <p
              className="sub ab-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense was created to make startup evaluation more structured,
              consistent and transparent. AI analyzes the applications, surfaces
              evidence and highlights risks. People make the final decision.
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
              className="media-ph ab-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A lens focusing a stream of applications into one clear signal"
            >
              <span className="media-ph__label">
                Image · applications into a lens · 16:9
              </span>
              <span className="media-ph__hint">
                A flow of applications focused into one clear signal —
                lens-gradient violet→cyan→aqua, calm; see prompt 1 in file
                header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. The problem — editorial split, light. Authored copy. */}
        <section className="band ab-problem">
          <div className="wrap ab-problem__split">
            <div className="ab-problem__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The problem
              </span>
              <h2 className="title">Too many applications, too little time</h2>
              <p className="sub">
                Every accelerator, fund, competition and innovation program faces
                the same problem: too many applications and too little time to
                review them properly.
              </p>
            </div>
            <div className="ab-problem__claim" data-reveal="right">
              <p className="ab-problem__claim-text">
                Strong projects get lost in the queue. Reviewers use different
                criteria. Scores are difficult to explain. Important signals are
                missed.
              </p>
              <span className="ab-problem__claim-tag">
                Lost signals · uneven review
              </span>
            </div>
          </div>
        </section>

        {/* 3. From AI Jury to EvalLense — pinned multi-screen, DARK. */}
        <section
          className="band ink ab-story"
          data-pin
          data-pin-steps="3"
          aria-label="From AI Jury to EvalLense — the history in three steps"
        >
          <div className="ab-story__stage" data-pin-stage>
            <div className="wrap ab-story__grid">
              <div className="ab-story__col">
                <div className="head ab-story__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    From AI Jury to EvalLense
                  </span>
                  <h2 className="title">How a hackathon idea became a system</h2>
                  <p className="sub">
                    EvalLense did not start as a finished product. It grew out of
                    AI Jury — and changed direction as the runs taught us what
                    actually helps a decision.
                  </p>
                </div>
                <ol className="ab-story__track">
                  {STORY_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="ab-story__step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="ab-story__num">{s.num}</span>
                      <span className="ab-story__label">{s.label}</span>
                      <span className="ab-story__desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="ab-story__side">
                {/* authored pipeline — nodes light up cumulatively with the pin */}
                <ol className="ab-story__pipe" aria-label="The controlled evaluation pipeline">
                  {STORY_PIPE.map((node, i) => (
                    <li
                      key={node}
                      className="ab-story__pipe-node"
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="ab-story__pipe-dot" aria-hidden="true"></span>
                      <span className="ab-story__pipe-name">{node}</span>
                    </li>
                  ))}
                </ol>
                {/* story visual slot — see prompt 2 in file header */}
                <figure
                  className="media-ph ab-story__media"
                  style={{ ["--ratio" as string]: "4/3" }}
                  role="img"
                  aria-label="AI Jury to EvalLense shown as a chain of nodes on a lens track"
                >
                  <span className="media-ph__label">
                    Image · AI Jury → EvalLense · 4:3
                  </span>
                  <span className="media-ph__hint">
                    A chain AI Jury → Testing → Pipeline → EvalLense, one lit node
                    on an ink surface — see prompt 2 in file header
                  </span>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 3b. Story closing statement — full-bleed accent, DARK. */}
        <section className="band ink ab-story-claim">
          <div className="wrap ab-story-claim__inner">
            <p className="ab-story-claim__text" data-reveal="up">
              AI Jury was designed to judge. EvalLense is designed to help people
              see more clearly.
            </p>
          </div>
        </section>

        {/* 4. Our principles — bento, light. Authored, verbatim. */}
        <section className="band soft ab-principles">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Our principles
              </span>
              <h2 className="title">What we hold to, run after run</h2>
              <p className="sub">
                Four principles keep the product honest: AI supports the work,
                every score is explainable, disagreement is surfaced, and
                methodology comes before the model.
              </p>
            </div>
            <ul className="ab-prin-grid" data-reveal="up">
              {PRINCIPLES.map((p) => (
                <li
                  key={p.title}
                  className={
                    p.feature ? "ab-prin-tile ab-prin-tile--feature" : "ab-prin-tile"
                  }
                >
                  <h3 className="ab-prin-h">{p.title}</h3>
                  <p className="ab-prin-p">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Team — creative pinned reveal, DARK. Three members. */}
        <section
          className="band ink ab-team"
          data-pin
          data-pin-steps="3"
          aria-label="The team behind EvalLense"
        >
          <div className="ab-team__stage" data-pin-stage>
            <div className="wrap ab-team__intro">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The team
              </span>
              <h2 className="title">The people behind EvalLense</h2>
            </div>
            <div className="wrap ab-team__scene">
              {TEAM.map((m, i) => (
                <article
                  key={m.name}
                  className="ab-member"
                  data-pin-step
                  style={{ ["--i" as string]: String(i) }}
                >
                  <span className="ab-member__surname" aria-hidden="true">
                    {m.surname}
                  </span>
                  {/* portrait slot — see prompts 3–5 in file header */}
                  <figure
                    className="media-ph ab-member__media"
                    style={{ ["--ratio" as string]: "3/4" }}
                    role="img"
                    aria-label={`Full-height portrait of ${m.name}`}
                  >
                    <svg
                      className="ab-member__avatar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8.5" r="4" />
                      <path d="M4.5 21c0-4.4 3.4-7.5 7.5-7.5s7.5 3.1 7.5 7.5" />
                    </svg>
                    <span className="media-ph__label">
                      Portrait · {m.name} · 3:4
                    </span>
                    <span className="media-ph__hint">
                      Full-height cut-out, soft violet rim-light, calm — see
                      prompts 3–5 in file header
                    </span>
                  </figure>
                  <div className="ab-member__copy">
                    <span className="mini-tag">{m.role}</span>
                    <h3 className="ab-member__name">{m.name}</h3>
                    <p className="ab-member__bio">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Who we build for — horizontal scroll-snap gallery, light. */}
        <section className="band ab-segments">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Who we build for
              </span>
              <h2 className="title">The teams that review at scale</h2>
              <p className="sub">
                They do not need AI to choose the winner. They need a faster and
                more consistent way to understand each application, compare
                participants and focus human attention on the decisions that
                matter.
              </p>
            </div>
          </div>
          {/* horizontal gallery — scrolls INSIDE its own overflow container,
              never moving the page; scroll-snap like .usecases .seg-lane */}
          <ul
            className="seg-lane"
            data-reveal="up"
            tabIndex={0}
            aria-label="Audience segments — scroll horizontally"
          >
            {SEGMENTS.map((s) => (
              <li key={s.tag} className="seg-card">
                <span className="seg-card__signal" aria-hidden="true"></span>
                <span className="mini-tag">{s.tag}</span>
                <p className="seg-p">{s.body}</p>
              </li>
            ))}
          </ul>
          <div className="wrap">
            <p className="ab-segments__claim" data-reveal="up">
              We are not building an artificial jury. We are building a better
              lens for human judgment.
            </p>
          </div>
        </section>

        {/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink ab-cta">
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Get to know us
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              See the product and the team up close
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo to walk through EvalLense, meet the people behind it and
              run a pilot batch on your own applications.
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
