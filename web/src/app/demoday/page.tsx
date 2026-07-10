import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import { TeamTilt } from "@/components/TeamTilt";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import { Bento, PinnedSteps, Cinema, Gallery } from "@/components/ds";
// DS blocks are added here as we compose the page, e.g.:
// import { StatementHero, Bento, Numbered, CtaBand } from "@/components/ds";

export const metadata: Metadata = {
  title: "Demo Day — EvalLens",
  description: "EvalLens demo day.",
};

/* ── Demo Day ──────────────────────────────────────────────────────────────
 * Public page assembled for the demo-day presentation. No site header/footer —
 * full-bleed deck surface. Built block-by-block from the deck: the user names
 * each screen, we drop in the matching block.
 *
 * The home Hero owns `id="hero"` and its full intro choreography (dual-video
 * sync, unicorn reveal, staggered copy fade) lives in ScrollOrchestrator — so
 * we mount that here, exactly as the home page does. When DS blocks land later
 * we'll reconcile with ScrollFX (Cinema / PinnedSteps depend on it).
 * -------------------------------------------------------------------------- */

/* From AI Jury to EvalLens — history steps revealed through the pin.
   Ported verbatim from company/about. */
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

/* Pipeline — the five fixed stages. Ported verbatim from trust/methodology. */
const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Decoder",
    desc: "PDF, PPTX, or Google Slides — every deck is converted into the same structured, slide-by-slide format for the judges.",
  },
  {
    num: "02",
    label: "AI Judges",
    desc: "Six judges review the deck independently against the same criteria. They don't see one another's scores.",
  },
  {
    num: "03",
    label: "Aggregate",
    desc: "The scoring layer aggregates judge scores with fixed math. A separate summary layer prepares the narrative and follow-up questions.",
  },
  {
    num: "04",
    label: "Scoring",
    desc: "Your criterion weights are applied to the Human Jury Score to produce the Final Score.",
  },
  {
    num: "05",
    label: "Report",
    desc: "An explainable report is assembled for every participant.",
  },
];

/* Team — founder dossier cards. Ported verbatim from company/about. */
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
    bio: "Turns messy startup evaluation into a product people can actually use. Owns the review flow, GTM logic, and the bridge from AI Jury to EvalLens.",
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
    bio: "Builds the system behind EvalLens: judge orchestration, scoring infrastructure, security, and repeatable evaluation runs.",
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

export default function DemoDayPage() {
  return (
    <>
      <main className="demoday about section-lab ds">
        {/* The whole deck is dark. Force an ink page background so any section
            that renders a transparent `.band` (e.g. PinnedSteps `.lab-process`,
            which on its Lab stand expects a tonal-zone background) shows black
            instead of the white document body — otherwise white heading text
            lands on white. */}
        <style>{`
          .demoday{ background: var(--bg-ink); }
          .demoday.ds::before{ display:none; }
        `}</style>
        <Hero />
        {/* Next blocks go here, in presentation order. */}

        {/* Block A — Team (ported verbatim from company/about #team). Founder
            dossier cards (Intelligence Wall), DARK. Two glass cards built in
            code; portraits are real cut-outs, all text is HTML. */}
        <section id="team" className="band ink ab-founders-sec" aria-label="The team behind EvalLens">
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
                          TG<span aria-hidden="true"> ↗</span>
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

        {/* Block B — Hundreds of runs (ported verbatim from company/about
            #story). From AI Jury to EvalLens — pinned multi-screen, DARK.
            The #story-claim Cinema block that follows it on About is a separate
            section and is intentionally NOT ported. */}
        <section
          id="story"
          className="band ink ab-story"
          data-pin
          data-pin-steps="3"
          aria-label="From AI Jury to EvalLens — the history in three steps"
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
                    EvalLens started as AI Jury. The early idea was simple: use
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
                {/* story visual — the full EvalLens origin journey (AI Jury →
                    hackathon → brainstorm → lens parts → Evaluation Lens →
                    EvalLens → unicorn). Tall transparent cutout, shown large to
                    fill the pinned stage. The authored pipeline list above was
                    removed in favour of this single image. */}
                <ParallaxFloat
                  className="ab-story__media ab-story__media--img"
                  src="/assets/methodology/eval-lens-roadmap-vertical-02.webp"
                  alt="The EvalLens origin journey: from AI Jury and a hackathon, through brainstorming and lens parts, to the Evaluation Lens and EvalLens"
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

        {/* Slide 4 — Bento overview (DS, ink). Placeholder copy; real content
            TBD. Feature tile carries the media slot (no asset yet → component
            placeholder). */}
        <Bento
          id="deck-bento"
          eyebrow="The problem"
          title="Evaluation breaks on both sides"
          titleAccent="both sides"
          sub="Organizers drown in decks. Founders get no real read. Same broken evaluation, two victims."
          items={[
            {
              tag: "Organizer",
              title: "Too many decks, too little time",
              body: "The submission flow outpaces the panel — review turns into the bottleneck, and strong startups get lost in the pile.",
              feature: true,
            },
            {
              tag: "Organizer",
              title: "The bar drifts",
              body: "As fatigue sets in, the same deck is scored differently. Standards slip from one review to the next.",
            },
            {
              tag: "Founder",
              title: "Read on the diagonal",
              body: "Your deck gets skimmed. The strongest parts never register, and the verdict is a coin flip.",
            },
            {
              tag: "Founder",
              title: "No feedback",
              body: "A rejection with no reasons — nothing to act on, nothing to improve for the next round.",
            },
          ]}
        />

        {/* Slide 4.5 — Flow statement (Cinema, DS, ink). Cinematic knockout:
            the media plays through the letters. Bridges the problem into the
            pipeline that follows. Title placeholder — refine copy later. */}
        <Cinema
          id="deck-flow"
          surface="ink"
          headline="Our flow is one straight line"
          lines={["Our flow is", "one straight line"]}
          mobileLines={["Our flow is", "one straight", "line"]}
          sub="From the first upload to the final report — one path, no detours."
          media={{
            videoSrc: "/assets/methodology/methodology-transition.mp4?v=3",
            poster: "/assets/methodology/methodology-transition-poster.webp",
          }}
          maskId="demoday-flow"
        />

        {/* Dark spacer — a plain non-pinned black band that separates the two
            pinned sections (Cinema above, PinnedSteps below). Two adjacent
            [data-pin] sticky stages fight each other's scroll math and break the
            stepper; a normal-flow band between them is the fix. */}
        <section
          aria-hidden="true"
          className="band ink"
          style={{ minHeight: "40vh", background: "var(--bg-ink)" }}
        />

        {/* Slide 5 — Pipeline (PinnedSteps, DS, ink). Copied verbatim from
            trust/methodology §5a "Every deck follows the same path". */}
        <PinnedSteps
          id="pipeline"
          surface="ink"
          version={3}
          ariaLabel="Every deck runs the same five stages"
          eyebrow="One fixed path"
          title={{ line1: "", line1Accent: "Every deck", line2: "follows the same path" }}
          sub="The process stays fixed, so every deck is reviewed the same way."
          steps={PIPELINE_STEPS}
          media={{
            ratio: "4/3",
            label: "Diagram · pipeline · 4:3",
            hint: "Decoder → AI Judges → Summarizer → Scoring → Report, nodes lit along a track",
            ariaLabel:
              "Horizontal track of the five pipeline stages, Decoder to Report",
          }}
          videoScrub={{
            src: "/assets/methodology/methodology-transition.mp4?v=3",
            poster: "/assets/methodology/methodology-transition-poster.webp",
            frames: 0,
            ariaLabel:
              "Methodology transition — scrubbed by scroll through the stages",
          }}
        />

        {/* Slide 6 — "Not a wrapper over GPT" (Gallery, DS, ink, v3 Expanded).
            Four differentiators vs a single ChatGPT prompt: panel / contract /
            calibration / advisor. */}
        <Gallery
          id="not-a-wrapper"
          surface="ink"
          version={3}
          eyebrow="Not ChatGPT-with-a-prompt"
          title="Not a wrapper over GPT"
          accentWords={["GPT"]}
          sub="Four things separate EvalLens from a single model call over a pretty deck."
          laneLabel="Four ways EvalLens differs from a single GPT prompt"
          items={[
            {
              tag: "Panel, not a prompt",
              title: "Six role-based judges",
              body: "Each judge sees only its own dimension. One call blends everything and falls for slick deck design — we remove that structurally.",
            },
            {
              tag: "Contract, not an essay",
              title: "One fixed schema per run",
              body: "Every run follows the same structured contract, where each score is tied to a specific quote from the deck.",
            },
            {
              tag: "Calibration, not vibes",
              title: "400+ runs against evidence",
              body: "Measured against score drift, judge bias, and score compression. One deck, one reproducible analysis.",
            },
            {
              tag: "Advisor, not a verdict",
              title: "The human sets the score",
              body: "EvalLens produces an advisory total. The final decision and ranking stay under human control.",
            },
          ]}
        />
      </main>
      {/* Two scroll engines coexist on this page (the only page that does).
          ScrollOrchestrator drives the home Hero intro (dual-video sync +
          unicorn reveal) and is the SOLE owner of `hero-ready`: it sets the
          class after the intro and never removes it. ScrollFX drives the
          ported DS sections' [data-reveal] / [data-scrub] / [data-pin]
          mechanics (Cinema #deck-flow, PinnedSteps #pipeline, Gallery
          #not-a-wrapper). They don't overlap selectors, and ScrollFX detects
          the home Hero (`#hero .hero-video`) and deliberately does NOT touch
          the `hero-ready` scroll-lock here — otherwise its cleanup (Strict
          Mode / async video race) would strip the class, re-lock the body
          (overflow:hidden) and break every sticky pin stage. See ScrollFX.tsx
          for the guard. */}
      <ScrollOrchestrator />
      <ScrollFX />
    </>
  );
}
