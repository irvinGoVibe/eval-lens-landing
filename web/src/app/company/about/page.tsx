import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { IcpBento } from "@/components/sections/IcpBento";
import { TeamTilt } from "@/components/TeamTilt";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import { Cinema } from "@/components/ds";
import { BlobField } from "@/components/BlobField";

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
 * (Yaroslav Volovoj, Vladislav Starodubov), seven audience segments
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

/* 5. Team — founder dossier cards (brief §5). Not a CV: one role, one ownership
   line, one light human "Off-screen" line, ≤3 chips, a handwritten marker note
   and a Dream. Premium but human. */
type TeamMember = {
  surname: string;
  name: string;
  role: string;
  bio: string;
  /** Handwritten / marker-style note over the card. */
  marker?: string;
  /** One light, human "Off-screen: …" line. */
  offscreen?: string;
  dream?: string;
  hobby?: string;
  /** Transparent cut-out portrait (webp) + its intrinsic size, when shipped. */
  portrait?: string;
  pw?: number;
  ph?: number;
  /** ≤3 specialization chips. */
  spec?: readonly string[];
  signals?: readonly string[];
  linkedin?: string;
  telegram?: string;
};
const TEAM: TeamMember[] = [
  {
    surname: "Volovoj",
    name: "Yaroslav Volovoj",
    role: "Product & GTM",
    bio: "Turns messy startup evaluation into a product people can actually use. Owns the review flow, GTM logic, and the bridge from AI Jury to EvalLense.",
    marker: "Founder mode: on",
    offscreen: "Off-screen: sharp decks, product calls, and probably a pickleball court.",
    dream: "Grow a unicorn!",
    hobby: "Hackathons & sport",
    portrait: "/assets/about/portrait-yaroslav-2.webp",
    pw: 1254,
    ph: 1224,
    spec: ["Product Strategy", "GTM", "Review UX"],
    signals: ["Team", "P5", "Verify live"],
    linkedin: "https://www.linkedin.com/in/yaroslavvolovoj/",
  },
  {
    surname: "Starodubov",
    name: "Vladislav Starodubov",
    role: "Engineering & Reliability",
    bio: "Builds the system behind EvalLense: judge orchestration, scoring infrastructure, security, and repeatable evaluation runs.",
    marker: "Keeps it working",
    offscreen: "Off-screen: architecture maps, edge cases, and systems that refuse to break.",
    dream: "Grow a unicorn!",
    hobby: "Hard work & good company",
    portrait: "/assets/about/portrait-vladislav-2.webp",
    pw: 1080,
    ph: 1377,
    spec: ["AI Pipeline", "Reliability", "Architecture"],
    signals: ["Team", "P5", "Verify live"],
    telegram: "https://t.me/vrway",
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
        <section className="band soft ab-hero blob-host">
          <BlobField />
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
              className="ab-hero__media ab-hero__media--img ev-drift"
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
        <section className="band ab-problem blob-host">
          <BlobField variant="b" />
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
            <div className="ab-problem__media">
              <Image
                src="/assets/about/problem-wall.webp"
                alt="A glass review bench: one pitch deck scored 8.7 with linked evidence, a panel of review pain points — too many decks, not enough time, uneven criteria, reviewer bias, scattered evidence, weak decision trail — and a queue of unscored decks waiting."
                width={1500}
                height={844}
                sizes="(max-width: 980px) 90vw, 46vw"
              />
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
                <ParallaxFloat
                  className="ab-story__media ab-story__media--img"
                  src="/assets/methodology/eval-lens-roadmap-vertical-02.png"
                  alt="The EvalLense origin journey: from AI Jury and a hackathon, through brainstorming and lens parts, to the Evaluation Lens and EvalLense"
                  width={781}
                  height={1857}
                  sizes="(max-width: 880px) 70vw, 380px"
                  floatY={8}
                  tilt={5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3b. Story closing statement — now a ds-cinema (ink): the line is
            knocked out of a black scrim with the background clip showing through
            the letters. Same copy, cinematic treatment. */}
        <Cinema
          id="story-claim"
          surface="ink"
          headline="AI Jury tried to judge. EvalLense helps people see clearly before they decide."
          lines={[
            "AI Jury tried to judge.",
            "EvalLense helps people see",
            "clearly before they decide.",
          ]}
          mobileLines={[
            "AI Jury tried",
            "to judge.",
            "EvalLense helps",
            "people see clearly",
            "before they decide.",
          ]}
          media={{ videoSrc: "/assets/about/about-story-cinema.mp4" }}
        />

        {/* 4. Our principles — bento, light. Authored, verbatim. */}
        <section id="principles" className="band soft ab-principles blob-host">
          <BlobField />
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
                  poster="/assets/about/principles-feature-poster.jpg"
                  aria-hidden="true"
                >
                  <source src="/assets/about/principles-feature-bg.mp4" type="video/mp4" />
                </video>
                <div className="ab-prin-bento__feature-copy">
                  <span className="ab-prin-bento__feature-eyebrow">Human in the loop</span>
                  {/* accent the "Humans own" beat with the lens gradient */}
                  <h3 className="ab-prin-bento__feature-h">
                    AI prepares the analysis.{" "}
                    <span className="grad-word">Humans own</span> the decision.
                  </h3>
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

        {/* 5. Team — founder dossier cards (Intelligence Wall), DARK. Two glass
            cards built in code; portraits are real cut-outs, all text is HTML. */}
        <section id="team" className="band ink ab-founders-sec" aria-label="The team behind EvalLense">
          <div className="wrap">
            <div className="head ab-founders__intro" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The team
              </span>
              <h2 className="title">Built by product, engineering, and <span className="grad-word">evaluation</span> people</h2>
              {/* trust-line — early-team durability: shared context, low founder-
                  conflict risk. "16+ years" carries the lens gradient. */}
              <p className="ab-trust">
                <span className="ab-trust__lead">
                  Two founders. <span className="ab-trust__years">16+ years</span> of shared context.
                </span>
                <span className="ab-trust__sub">
                  From university friends to building a system for better judgment.
                </span>
              </p>
            </div>
            <div className="ab-founders">
              <TeamTilt />
              {TEAM.map((m, i) => (
                <article
                  key={m.name}
                  className="ab-dossier"
                  data-accent={i === 0 ? "violet" : "cyan"}
                  data-reveal="up"
                  style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                >
                  {/* moving brand-colour lamps (on hover) + always-on sheen */}
                  <span className="ab-dossier__lamps" aria-hidden="true">
                    <span className="ab-dossier__lamp ab-dossier__lamp--1" />
                    <span className="ab-dossier__lamp ab-dossier__lamp--2" />
                    <span className="ab-dossier__lamp ab-dossier__lamp--3" />
                  </span>
                  <span className="ab-dossier__sheen" aria-hidden="true" />

                  <div className="ab-dossier__portrait">
                    <span className="ab-dossier__tag">Founder</span>
                    {m.spec ? (
                      <ul className="ab-dossier__specs" aria-label="Focus areas">
                        {m.spec.map((s) => (
                          <li key={s} className="ab-spec chip-pulse">{s}</li>
                        ))}
                      </ul>
                    ) : null}
                    {m.portrait ? (
                      <Image
                        className="ab-dossier__photo"
                        src={m.portrait}
                        alt={`Portrait of ${m.name}`}
                        width={m.pw ?? 1200}
                        height={m.ph ?? 1500}
                        sizes="(max-width:880px) 90vw, 500px"
                      />
                    ) : (
                      <span className="ab-dossier__photo-ph" aria-hidden="true" />
                    )}
                    {m.marker ? (
                      <span className="ab-dossier__marker">{m.marker}</span>
                    ) : null}
                  </div>

                  <div className="ab-dossier__body">
                    <span className="ab-dossier__role">{m.role}</span>
                    <h3 className="ab-dossier__name">{m.name}</h3>
                    <p className="ab-dossier__bio">{m.bio}</p>
                    {m.offscreen ? (
                      <p className="ab-dossier__offscreen">{m.offscreen}</p>
                    ) : null}
                    <div className="ab-dossier__foot">
                      <ul className="ab-dossier__pills">
                        {m.hobby ? (
                          <li className="ab-pill">
                            <span className="ab-pill__k">Hobby:</span>
                            {m.hobby}
                          </li>
                        ) : null}
                        {m.dream ? (
                          <li className="ab-pill">
                            <span className="ab-pill__k">Dream:</span>
                            {m.dream}
                            <span className="ab-pill__logo" aria-hidden="true" />
                          </li>
                        ) : null}
                      </ul>
                      {m.telegram ? (
                        <a
                          className="ab-dossier__link"
                          href={m.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Telegram<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : m.linkedin ? (
                        <a
                          className="ab-dossier__link"
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

                {/* 6. Who we build for - ICP premium bento (encapsulated section). */}
        <IcpBento />

{/* 7. Final CTA — quiet CTA, DARK. */}
        <section className="band ink ab-cta">
          {/* full-bleed looping video background + darkening scrim (same
              treatment as the other video sections). */}
          <video
            className="ab-cta__bg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/assets/about/about-cta-bg.mp4" type="video/mp4" />
          </video>
          <div className="ab-cta__scrim" aria-hidden="true" />
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
