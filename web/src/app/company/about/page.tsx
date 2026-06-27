import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About EvalLense — A better lens for human judgment",
  description:
    "EvalLense helps startup programs, funds, and competitions review applications with structured AI analysis, evidence-backed reports, and human-controlled decisions.",
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
    desc: "The first version was built during the Amazon Nova hackathon. It tested whether specialized AI judges could evaluate pitch decks from different angles.",
  },
  {
    num: "02",
    label: "Hundreds of runs",
    desc: "Adding more judges did not solve quality. Scores shifted, roles overlapped, and long reports created noise instead of clarity.",
  },
  {
    num: "03",
    label: "A controlled system",
    desc: "So we stopped designing an artificial jury. We started building a controlled evaluation system: fixed criteria, clear roles, structured outputs, evidence-linked reports, and human review.",
  },
];

/* 4. Our principles — bento (brief §4, verbatim). */
const PRINCIPLES = [
  {
    title: "AI prepares the analysis. Humans own the decision.",
    body: "EvalLense can structure evidence, surface risks, and prepare a ranking view. The final score, context, and decision stay under human control.",
    feature: true,
  },
  {
    title: "Every score needs evidence.",
    body: "Reviewers should be able to see what influenced the result, which slide or claim supported it, and what information was missing.",
  },
  {
    title: "Disagreement should be visible.",
    body: "When evaluation lenses disagree, EvalLense does not hide the conflict inside an average. It shows the split so reviewers know where to look.",
  },
  {
    title: "The same standard for every team.",
    body: "Every application is judged against the same criteria and the same scale, so results stay comparable across the whole batch — and where repeated runs differ, that is visible too.",
  },
  {
    title: "Methodology beats model choice.",
    body: "Reliable evaluation needs clear criteria, controlled roles, structured outputs, and consistent scoring logic. The model is only one part of the system.",
  },
];

/* 5. Team — creative pinned reveal (brief §5). `hobby`/`dream` are optional and
   render as labelled facts only when present (currently Yaroslav). */
type TeamMember = {
  surname: string;
  name: string;
  role: string;
  bio: string;
  hobby?: string;
  dream?: string;
};
const TEAM: TeamMember[] = [
  {
    surname: "Volovoj",
    name: "Yaroslav Volovoj",
    role: "Product & Sales",
    bio: "Yaroslav drives product and go-to-market for EvalLense, and built its predecessor — AI Jury — at a hackathon. He shapes what the product evaluates and how teams put it to work.",
    hobby: "Loves hackathons and sport games.",
    dream: "Grow a unicorn.",
  },
  {
    surname: "Starodubov",
    name: "Vladislav Starodubov",
    role: "Engineering and Architecture",
    bio: "Vladislav leads system architecture, engineering delivery, and the AI evaluation pipeline. His focus is reliability, security, and repeatable use at scale.",
  },
  {
    surname: "Arseniy",
    name: "Arseniy",
    role: "Product Experience",
    bio: "Arseniy works on product experience and interface structure. His focus is turning complex reports, workflows, and decision signals into a clear product for organizers and reviewers.",
  },
];

/* 6. Who we build for — ICP workflow cards (content mirrored from the use-cases
   page WORKFLOWS), rendered here as an INK bento. Each ICP carries the review
   MOMENT, the JOB, what EvalLense gives, and an Explore link. */
const ICP_WORKFLOWS = [
  {
    segment: "Pitch Competitions",
    moment: "Before finals day",
    job: "Move from open submissions to a ranked finalist board.",
    gives: "One rubric, evidence-linked reports, live questions, and a leaderboard your jury owns.",
    cta: "Explore pitch competitions",
  },
  {
    segment: "Hackathons",
    moment: "Before live judging",
    job: "Review many teams fast and prepare the judge panel.",
    gives: "A pitch-deck first pass today, with execution-specific hackathon review on the roadmap.",
    cta: "Explore hackathons",
  },
  {
    segment: "VC Funds",
    moment: "Before the pipeline meeting",
    job: "Turn inbound decks into a partner-ready first read.",
    gives: "Market, team, GTM, feasibility signals, missing evidence, and questions for the first call.",
    cta: "Explore VC dealflow",
  },
  {
    segment: "Accelerators",
    moment: "Before cohort selection",
    job: "Compare applicants on one standard and defend the cohort decision.",
    gives: "Side-by-side reports, fixed criteria, evidence gaps, risks, and selection questions.",
    cta: "Explore accelerators",
  },
  {
    segment: "Angel Investors",
    moment: "Before diligence night",
    job: "Know which decks deserve your time.",
    gives: "A structured first read with strengths, weaknesses, missing evidence, and founder questions.",
    cta: "Explore angel review",
  },
  {
    segment: "Corporate Innovation",
    moment: "Before stakeholder review",
    job: "Separate real partnership potential from innovation theatre.",
    gives: "Fit signals, readiness checks, business value, evidence gaps, and a shortlist for the committee.",
    cta: "Explore corporate innovation",
  },
  {
    segment: "Grant Programs",
    moment: "Before funding decisions",
    job: "Review applications against fixed criteria and keep the decision explainable.",
    gives: "Comparable scores, evidence-linked reasoning, missing points, and a review trail.",
    cta: "Explore grants",
  },
  {
    segment: "Universities",
    moment: "Before demo day or program selection",
    job: "Compare student and research teams fairly.",
    gives: "Transparent scoring, useful feedback, presentation questions, and a human-owned ranking.",
    cta: "Explore universities",
  },
];

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Company",
  links: [
    { label: "Story", href: "#story" },
    { label: "Principles", href: "#principles" },
    { label: "Team", href: "#team" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="about">
        {/* 1. Hero / mission — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft ab-hero">
          {/* Hero observatory PNG tuning — page-local injection (globals untouched):
              enlarge ~10% and pull it up so the top constellation stars sit right
              under the Book a Demo button, while the larger art drops toward the
              section end. */}
          <style>{`
            .about .ab-hero__media--img{ width:min(98vw,1364px); max-width:98vw; }
            .about .ab-hero__media{ margin-top:clamp(-20px,-1vw,-6px); }
          `}</style>
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
              We built EvalLense to make startup review clearer, faster, and
              easier to <span className="grad-word">defend</span>
            </h1>
            <p
              className="sub ab-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              EvalLense turns messy startup applications into structured
              evidence, comparable scores, and questions reviewers can actually
              use. AI prepares the analysis. People keep the judgment.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
            {/* hero visual — the observatory lens: startup applications stream
                in and resolve into evidence, risk signals, score cards, and
                questions. Transparent cutout, so it sits frameless on the soft
                hero and goes large (wider than the text column, capped to the
                layout). */}
            <Image
              className="ab-hero__media ab-hero__media--img"
              src="/assets/entry-hub/evallense-observatory-hero-01.png"
              alt="A stream of startup applications passing through a glass lens and becoming structured evidence, risk signals, score cards, and reviewer questions"
              width={1536}
              height={1024}
              sizes="(max-width: 1100px) 94vw, 1240px"
              data-reveal="scale"
              priority
            />
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
              <h2 className="title">Good projects get <span className="grad-word">lost</span> when review has no system</h2>
              <p className="sub">
                Accelerators, funds, competitions, and innovation teams all face
                the same review problem: too many decks, uneven criteria, and not
                enough time to explain the call.
              </p>
            </div>
            <div className="ab-problem__claim" data-reveal="right">
              <p className="ab-problem__claim-text">
                The cost is not just slow review. It is missed signal, weak
                rationale, and decisions that are hard to defend later.
              </p>
              <span className="ab-problem__claim-tag">
                Missed signal · uneven criteria · weak rationale
              </span>
            </div>
          </div>
        </section>

        {/* 3. From AI Jury to EvalLense — pinned multi-screen, DARK. */}
        <section
          id="story"
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
                    From AI jury to human-controlled evaluation
                  </span>
                  <h2 className="title">What <span className="grad-word">hundreds of runs</span> taught us</h2>
                  <p className="sub">
                    EvalLense started as AI Jury. The early idea was simple: use
                    several specialized AI judges instead of one generic model
                    opinion. Then the runs exposed the real problem.
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
                {/* link to the long-form origin story (Newsroom: founding-story) */}
                <div
                  className="ab-story__cta"
                  data-reveal="up"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button href="/blog/founding-story" variant="gradient" arrow>
                    Read the full story
                  </Button>
                </div>
              </div>
              <div className="ab-story__side">
                {/* story visual — the full EvalLense origin journey (AI Jury →
                    hackathon → brainstorm → lens parts → Evaluation Lens →
                    EvalLense → unicorn). Tall transparent cutout, shown large to
                    fill the pinned stage. The authored pipeline list above was
                    removed in favour of this single image. */}
                <Image
                  className="ab-story__media ab-story__media--img"
                  src="/assets/methodology/eval-lens-roadmap-vertical-02.png"
                  alt="The EvalLense origin journey: from AI Jury and a hackathon, through brainstorming and lens parts, to the Evaluation Lens and EvalLense"
                  width={781}
                  height={1857}
                  sizes="(max-width: 880px) 70vw, 380px"
                  data-reveal="scale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3b. Story closing statement — full-bleed accent, DARK. */}
        <section className="band ink ab-story-claim">
          <div className="wrap ab-story-claim__inner">
            <p className="ab-story-claim__text" data-reveal="up">
              AI Jury tried to judge. EvalLense helps people see clearly before
              they decide.
            </p>
          </div>
        </section>

        {/* 4. Our principles — bento, light. Authored, verbatim. */}
        <section id="principles" className="band soft ab-principles">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Our principles
              </span>
              <h2 className="title">The <span className="grad-word">principles</span> behind every evaluation</h2>
              <p className="sub">
                These principles keep EvalLense useful: AI supports the work,
                scores link to evidence, disagreement stays visible, and
                methodology comes before the model.
              </p>
            </div>
            {/* Principles bento — page-local injection (globals untouched),
                modeled on the use-cases "Workflow Atlas" field-grid: a tall dark
                media feature card (human-in-the-loop) beside a 2×2 of light
                principle cards. */}
            <style>{`
              .ab-principles .ab-prin-bento{
                display:grid; grid-template-columns:minmax(0,0.92fr) minmax(0,1.32fr);
                gap:clamp(14px,1.6vw,22px); align-items:stretch;
              }
              .ab-principles .ab-prin-bento__feature{
                position:relative; overflow:hidden; isolation:isolate;
                border-radius:var(--radius-card); min-height:clamp(420px,42vw,560px);
                display:flex; align-items:flex-end; padding:clamp(26px,3vw,42px);
                color:var(--fg-on-dark); background:#05050a;
              }
              .ab-principles .ab-prin-bento__feature video{
                position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
                filter:saturate(1.3) contrast(1.04) brightness(.6); z-index:-2;
              }
              .ab-principles .ab-prin-bento__feature::before{
                content:""; position:absolute; inset:0; z-index:-1;
                background:linear-gradient(180deg, rgba(5,5,12,.12) 0%, rgba(5,5,12,.5) 55%, rgba(5,5,12,.86) 100%);
              }
              .ab-principles .ab-prin-bento__feature-copy{ display:grid; gap:clamp(10px,1vw,14px); max-width:34ch; }
              .ab-principles .ab-prin-bento__feature-eyebrow{
                font-family:var(--font-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--lavender);
              }
              .ab-principles .ab-prin-bento__feature-h{
                margin:0; font-size:clamp(25px,2.5vw,36px); line-height:1.08; letter-spacing:-.02em; font-weight:650; color:var(--fg-on-dark);
              }
              .ab-principles .ab-prin-bento__feature-p{
                margin:0; font-size:clamp(14px,1vw,15.5px); line-height:1.5; color:rgba(255,255,255,.78); max-width:44ch;
              }
              .ab-principles .ab-prin-bento__cards{
                display:grid; grid-template-columns:1fr 1fr; gap:clamp(14px,1.6vw,22px);
              }
              .ab-principles .ab-prin-bento__card{
                display:flex; flex-direction:column; gap:12px; min-width:0;
                background:#fff; border:1px solid var(--border); border-radius:var(--radius-card);
                padding:clamp(22px,2.4vw,30px); box-shadow:var(--shadow-soft);
              }
              .ab-principles .ab-prin-bento__card-idx{
                font-family:var(--font-mono); font-size:12px; letter-spacing:.1em;
                background:var(--lens); -webkit-background-clip:text; background-clip:text; color:transparent;
              }
              .ab-principles .ab-prin-bento__card-h{
                margin:0; font-size:clamp(18px,1.6vw,22px); line-height:1.16; letter-spacing:-.015em; font-weight:600; color:var(--fg);
              }
              .ab-principles .ab-prin-bento__card-p{
                margin:0; font-size:clamp(14px,1.1vw,15.5px); line-height:1.52; color:var(--muted);
              }
              @media (max-width:920px){
                .ab-principles .ab-prin-bento{ grid-template-columns:1fr; }
                .ab-principles .ab-prin-bento__feature{ min-height:clamp(340px,60vw,440px); }
              }
              @media (max-width:560px){
                .ab-principles .ab-prin-bento__cards{ grid-template-columns:1fr; }
              }
            `}</style>
            <div className="ab-prin-bento" data-reveal="up">
              <div className="ab-prin-bento__feature">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/assets/section2-scroll-2-poster.jpg"
                  aria-hidden="true"
                >
                  <source src="/assets/backgrounds/bg-abstract-cinematic.mp4" type="video/mp4" />
                </video>
                <div className="ab-prin-bento__feature-copy">
                  <span className="ab-prin-bento__feature-eyebrow">Human in the loop</span>
                  <h3 className="ab-prin-bento__feature-h">{PRINCIPLES[0].title}</h3>
                  <p className="ab-prin-bento__feature-p">{PRINCIPLES[0].body}</p>
                </div>
              </div>
              <div className="ab-prin-bento__cards">
                {PRINCIPLES.slice(1).map((p, i) => (
                  <div key={p.title} className="ab-prin-bento__card">
                    <span className="ab-prin-bento__card-idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="ab-prin-bento__card-h">{p.title}</h3>
                    <p className="ab-prin-bento__card-p">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Team — creative pinned reveal, DARK. Three members. */}
        <section
          id="team"
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
              <h2 className="title">Built by product, engineering, and <span className="grad-word">evaluation</span> people</h2>
            </div>
            <div className="wrap ab-team__scene">
              {TEAM.map((m, i) => (
                <article
                  key={m.name}
                  className="ab-member"
                  data-pin-step
                  style={{ ["--i" as string]: String(i) }}
                >
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
                    {m.hobby || m.dream ? (
                      <dl className="ab-member__facts">
                        {m.hobby ? (
                          <div className="ab-member__fact">
                            <dt>Hobby</dt>
                            <dd>{m.hobby}</dd>
                          </div>
                        ) : null}
                        {m.dream ? (
                          <div className="ab-member__fact">
                            <dt>Dream</dt>
                            <dd>{m.dream}</dd>
                          </div>
                        ) : null}
                      </dl>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Who we build for — ICP workflow BENTO on INK. Page-local inject
            (no shared component / globals touched): the old light scroll-gallery
            is replaced by a dark bento of the full ICP set, each card carrying
            the review MOMENT, the JOB, what EvalLense gives, and an Explore link
            into the use-cases page. */}
        <section className="band ink ab-segments ab-icp">
          <style>{`
            .ab-icp .head{ text-align:center; max-width:46rem; margin-inline:auto; }
            .ab-icp__grid{
              display:grid; grid-template-columns:repeat(auto-fit, minmax(264px,1fr));
              gap:clamp(14px,1.5vw,22px); margin-top:clamp(36px,5vw,60px); align-items:stretch;
            }
            .ab-icp__card{
              display:flex; flex-direction:column; min-width:0;
              padding:clamp(22px,2vw,30px);
              border-radius:clamp(18px,1.6vw,24px);
              background:color-mix(in oklab, var(--panel) 84%, transparent);
              border:1px solid var(--border-on-dark-2);
              box-shadow:inset 0 1px 0 rgba(255,255,255,.04);
              transition:border-color .3s var(--ease), background .3s var(--ease), transform .3s var(--ease);
            }
            .ab-icp__card:hover{
              border-color:color-mix(in oklab, var(--lavender) 38%, transparent);
              background:color-mix(in oklab, var(--panel-2) 90%, transparent);
              transform:translateY(-2px);
            }
            .ab-icp__seg{
              font-family:var(--font-display); font-size:clamp(20px,1.9vw,24px);
              font-weight:600; letter-spacing:-.015em; color:var(--fg-on-dark);
              margin:0 0 clamp(14px,1.4vw,18px);
            }
            .ab-icp__field{ margin:0 0 14px; }
            .ab-icp__klabel{
              display:block; font-family:var(--font-mono); font-size:10.5px;
              letter-spacing:.16em; text-transform:uppercase; color:var(--lavender); margin-bottom:6px;
            }
            .ab-icp__val{ margin:0; font-size:14.5px; line-height:1.5; color:var(--body-on-dark); }
            .ab-icp__field--gives{ margin-bottom:clamp(18px,1.8vw,22px); }
            .ab-icp__field--gives .ab-icp__val{ color:var(--muted-on-dark); }
            .ab-icp__cta{
              margin-top:auto; display:inline-flex; align-items:center; gap:7px;
              font-size:14px; font-weight:500; color:var(--lavender); text-decoration:none;
            }
            .ab-icp__cta svg{ width:15px; height:15px; transition:transform .25s var(--ease); }
            .ab-icp__cta:hover{ color:#c8c4f0; }
            .ab-icp__cta:hover svg{ transform:translateX(3px); }
            .ab-icp .ab-segments__claim{ color:var(--fg-on-dark); text-align:center; margin-inline:auto; max-width:26ch; }
            @media (max-width:560px){ .ab-icp__grid{ grid-template-columns:1fr; } }
          `}</style>
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Who we build for
              </span>
              <h2 className="title">Built for teams that review at <span className="grad-word">scale</span></h2>
              <p className="sub">
                They do not need AI to choose the winner. They need a faster,
                more consistent way to understand each application, compare
                participants, and focus human attention on the decisions that
                matter.
              </p>
            </div>
            <ul
              className="ab-icp__grid"
              data-reveal="up"
              aria-label="Who EvalLense is built for, by review moment"
            >
              {ICP_WORKFLOWS.map((w) => (
                <li key={w.segment} className="ab-icp__card">
                  <h3 className="ab-icp__seg">{w.segment}</h3>
                  <div className="ab-icp__field">
                    <span className="ab-icp__klabel">Moment</span>
                    <p className="ab-icp__val">{w.moment}</p>
                  </div>
                  <div className="ab-icp__field">
                    <span className="ab-icp__klabel">Job</span>
                    <p className="ab-icp__val">{w.job}</p>
                  </div>
                  <div className="ab-icp__field ab-icp__field--gives">
                    <span className="ab-icp__klabel">EvalLense gives</span>
                    <p className="ab-icp__val">{w.gives}</p>
                  </div>
                  <Link href="/trust/use-cases" className="ab-icp__cta">
                    {w.cta}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <path d="M3 8h9M9 5l3 3-3 3" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
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
              See how EvalLense works on a <span className="grad-word">real batch</span>
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo to walk through the workflow, review example reports,
              and see how EvalLense helps your team compare applications without
              giving up human control.
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
