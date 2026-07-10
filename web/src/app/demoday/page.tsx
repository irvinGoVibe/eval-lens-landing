import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import { TeamTilt } from "@/components/TeamTilt";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import { Bento, PinnedSteps, Cinema, Gallery, RoutingMatrix, StatementHero, Eyebrow, Numbered } from "@/components/ds";
import { DelayedLoopVideo } from "@/components/DelayedLoopVideo";
import type { RoutingJudge } from "@/components/ds";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneBlobs } from "@/components/ZoneBlobs";
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

/* Slide 7 — the six Pitch Competition dimensions (P1–P6), read as questions.
   These are the scored dimensions, NOT the judge lenses (J-P1…J-P6), which live
   only in the Routing Matrix below. Ported verbatim from trust/methodology §5. */
const DIMENSIONS = [
  { tag: "P1", title: "Problem significance", body: ["Is the pain real, urgent, and specific?"] },
  { tag: "P2", title: "Solution differentiation", body: ["Is the solution clear and meaningfully different?"] },
  { tag: "P3", title: "Market attractiveness", body: ["Is the opportunity credible and worth pursuing?"] },
  { tag: "P4", title: "Business model / GTM", body: ["Is there a plausible path to revenue and distribution?"] },
  { tag: "P5", title: "Team / founder fit", body: ["Can this team credibly execute?"] },
  { tag: "P6", title: "Feasibility / readiness", body: ["Is the plan realistic given resources, time, and dependencies?"] },
];

/* Slide 8 — the real Judge Routing Matrix (Pitch preset). Each judge has one
   primary dimension (J-P3 owns two; J-P4 Pitch Quality reads everything as
   advisory). Weights: primary 1.00 · secondary 0.50 · advisory 0.25 · none 0.
   Ported verbatim from trust/methodology §6. */
const ROUTING_DIMENSIONS = ["Problem", "Solution", "Market", "GTM", "Team", "Feasibility"];
const ROUTING_DIMENSIONS_FULL = [
  "Problem significance",
  "Solution differentiation",
  "Market attractiveness",
  "Business model / GTM",
  "Team / founder fit",
  "Feasibility / readiness",
];
const ROUTING_JUDGES: RoutingJudge[] = [
  { code: "J-P1", name: "Problem", cells: ["primary", "advisory", "advisory", "none", "none", "advisory"] },
  { code: "J-P2", name: "Solution Logic", cells: ["secondary", "primary", "advisory", "advisory", "none", "secondary"] },
  { code: "J-P3", name: "Business Value / Market", cells: ["advisory", "advisory", "primary", "primary", "none", "advisory"] },
  { code: "J-P4", name: "Pitch Quality", cells: ["advisory", "advisory", "advisory", "advisory", "advisory", "advisory"] },
  { code: "J-P5", name: "Team Readiness", cells: ["none", "none", "advisory", "advisory", "primary", "secondary"] },
  { code: "J-P6", name: "Feasibility", cells: ["advisory", "secondary", "secondary", "secondary", "secondary", "primary"] },
];

/* Slide 9 — hero outcome stat-row (illustrative, framed as a 20–30 min manual
   read). Page-local markup, ported verbatim from product/evidence-based-reports. */
const HERO_STATS = [
  { v: "Skip the first read", k: "Start with the report, not the raw deck." },
  { v: "Up to 40 hours saved", k: "Across 100 decks, that can save a full week of reading." },
  { v: "Review all decks at once", k: "Decks are processed in parallel, not one by one." },
] as const;

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
          /* ZoneBlobs ships six drifting PNGs; six of them animating over the
             zone's stacked gradient layers drops frames on this page. Keep the
             three that carry the composition (left/right/left) and drop the
             rest — local to the deck, the shared component is untouched. */
          .demoday .ds-blob--d,
          .demoday .ds-blob--e,
          .demoday .ds-blob--f{ display:none; }
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

        {/* Story opener — Cinema (ink). Bridges the team into the AI Jury
            history that follows: the headline is knocked out of the scrim and
            the unicorn reel plays through the letters. */}
        <Cinema
          id="origin"
          surface="ink"
          eyebrow="How we got here"
          headline="It started as a hackathon project"
          lines={["It started as", "a hackathon project"]}
          mobileLines={["It started as", "a hackathon", "project"]}
          sub="Two founders, one Amazon Nova hackathon, and a question — can a panel of specialized AI judges read a pitch deck better than one generic model?"
          media={{
            videoSrc: "/assets/cta/uniqorn-1.mp4",
            poster: "/assets/cta/uniqorn-1-poster.webp",
          }}
          maskId="demoday-origin"
        />

        {/* Dark spacer — Cinema above and #story below are BOTH [data-pin]
            sections. Two adjacent sticky pin stages fight each other's scroll
            math (it broke the pipeline stepper once already); a plain
            non-pinned black band between them is the fix. */}
        <section
          aria-hidden="true"
          className="band ink"
          style={{ minHeight: "40vh", background: "var(--bg-ink)" }}
        />

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
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
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

        {/* ── ONE continuous tonal zone (slides 7–9) ───────────────────────
            The zone must BRACKET the seam, not start after it: slide 7 is the
            dark side of the flip, slides 8–9 the light side. Layer stack
            (z-index:-1, DOM order = back→front):
              1) --lobes                 light BASE
              2) --lobes-dark + sparks   dark layer. Forced on with
                 `ds-zone__bg--on` because no forward <ZoneToneFlip/> precedes
                 it here — the deck is already dark when the zone opens.
              3) --lobes + .ds-relight   RE-LIGHT layer, opacity:0
              4) .ds-flip-bridge + __glow  the brand bloom, opacity:0
            <ZoneToneFlipReverse/> scrubs 3) in and flashes 4) across the seam —
            that's the colour-to-colour blink, no grey mid-tone. ── */}
        <div className="ds-zone">
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes"
            aria-hidden="true"
          />
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark ds-zone__bg--on"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight"
            aria-hidden="true"
          />
          {/* SECOND dark layer, opacity:0. Sits above .ds-relight so it can
              cover the light again, and is driven by the forward <ZoneToneFlip/>
              via `targetSelector` — the two flips never fight over one opacity. */}
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark ds-redark"
            aria-hidden="true"
          />
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />

          {/* Blobs belong to the light tail only — clipped off the dark head
              (slide 7). Tune the % if section heights change. */}
          <ZoneBlobs top="30%" />

          {/* Slide 7 — Dimension Matrix (Gallery, DS, ink). The six scored
              dimensions read as questions. Ported verbatim from methodology §5.
              This is the DARK side of the flip. */}
          <Gallery
            id="matrix"
            surface="ink"
            version={4}
            eyebrow="Dimension matrix"
            title="Six questions, one rubric"
            accentWords={["questions", "rubric"]}
            sub="Each deck is scored across six Pitch Competition dimensions. The dimensions are fixed, so every startup is compared against the same core questions."
            laneLabel="The six Pitch Competition dimensions, P1 through P6"
            items={DIMENSIONS}
          />

          {/* Reverse tone-flip seam (slide 7 → 8): dark→light through the brand
              bridge, no grey. */}
          <ZoneToneFlipReverse />

          {/* Slide 8 — Routing matrix (RoutingMatrix, DS, light). Full judge ×
              dimension table. Ported verbatim from methodology §6. */}
          <RoutingMatrix
            id="routing"
            eyebrow="Controlled influence"
            title="Not every judge influences every score"
            accentWords={["influences"]}
            sub="The matrix shows how much each judge lens (J-P1...J-P6) contributes to each dimension (P1-P6). Primary judges drive the score. Secondary judges add important support. Advisory judges provide context. None means no scoring influence."
            dimensions={ROUTING_DIMENSIONS}
            dimensionsFull={ROUTING_DIMENSIONS_FULL}
            judges={ROUTING_JUDGES}
          />

          {/* Slide 9 — "A score you can explain", lifted whole from
              product/evidence-based-reports §1: the StatementHero plus its
              page-local stat-row. Both need the `.evidence-reports` scope (it
              owns `.evr-*` and the v3 hero-image rule), so the class rides a
              local wrapper — putting it on <main> would drag that page's
              Cinema/Bento overrides onto our other slides.

              `id` is NOT "hero": the home Hero owns that, and a second #hero
              re-arms the global scroll-lock. `headingLevel="h2"` keeps one h1. */}
          <div className="evidence-reports">
            <StatementHero
              id="score"
              surface="light"
              version={3}
              headingLevel="h2"
              eyebrow="Evidence-Based Reports"
              titleLead="A score you can explain."
              titleAccent="Evidence"
              titleTrail="you can check."
              sub="See how each team scored, what drove the result, and what to ask next. You make the final call."
              ctas={[
                { label: "Book a Demo", href: "https://calendly.com/evallens/30min" },
                { label: "View Sample Report", href: "#" },
              ]}
              media={{
                ratio: "3/2",
                label: "Image · score linked to the deck · 3:2",
                hint: "A score with thin lines tracing back to deck slides — lens-gradient violet→cyan→aqua, calm",
                ariaLabel:
                  "An overall score with a dimension radar, linked to deck slides — Market TAM and Traction MAU",
                src: "/assets/evidence-reports/hero-score-dashboards-01.webp",
                width: 1536,
                height: 1024,
              }}
            />

            <section
              className="band soft evr-statband"
              aria-label="Illustrative outcomes, based on a 20–30 minute manual read per deck"
            >
              <div className="wrap">
                <ul className="evr-stats" data-reveal="up">
                  {HERO_STATS.map((s) => (
                    <li key={s.v} className="evr-stat">
                      <span className="evr-stat__v">{s.v}</span>
                      <span className="evr-stat__k">{s.k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Forward tone-flip seam (slide 9 → 10): light→dark back through the
              same brand bloom, so the seam is a colour transition, not a cut.
              It drives `.ds-redark` — the SECOND dark layer — leaving the first
              one (which held the dark head of the zone) alone. */}
          <ZoneToneFlip targetSelector=".ds-redark" />

          {/* Slide 10 — After the scores (Numbered, DS, v3). Ported verbatim from
              product/review-board §2. Its surface is baked to `ink` in the
              component, but INSIDE the zone `.band` goes transparent (ds.css
              scopes that under `.ds-zone`), so the zone's dark layer shows
              through and the flip stays visible. The `\n` in `sub` is
              intentional: the component turns it into a <br/>. */}
          <Numbered
          id="decision"
          version={3}
          eyebrow="After the scores"
          title="A scored batch still needs a decision"
          titleAccent="decision"
          sub="AI can score every startup. Your jury still needs to compare the \n  evidence, resolve disagreements, and decide what moves forward."
          items={[
            {
              num: "01",
              title: "Separate reports hide the differences",
              body: "Important differences are easy to miss when every report lives in a separate tab.",
            },
            {
              num: "02",
              title: "Scores need evidence",
              body: "A score means little unless reviewers can see what supports it.",
            },
            {
              num: "03",
              title: "Batch progress is hard to track",
              body: "Reviewers need one place to see what is ready, in review, scored, or blocked.",
            },
            {
              num: "04",
              title: "Decisions lose context",
              body: "Scores, notes, and reasoning should stay visible after the shortlist is final.",
            },
            ]}
          />
        </div>

        {/* Slide 11 — HITL / "what we do not claim" (ink). Lifted whole from
            trust/consistency-reliability §8: a page-local replica of the
            StatementHero v3 editorial layout, reusing the global `ds-hero`
            classes, with a delayed-loop video in the media slot. Its `<style>`
            is scoped by the section's own `.consistency-honest-edge` class, so
            nothing leaks onto the rest of the deck. Copy is placeholder — the
            user will rewrite it. It sits OUTSIDE the light zone above (ink). */}
        <section className="band ink ds-hero consistency-honest-edge">
          <style>{`
            .consistency-honest-edge{ overflow:hidden; }
            .consistency-honest-edge .cr-honest-media{
              position:relative; width:100%; aspect-ratio:16/9; overflow:hidden;
              border-radius:clamp(22px,2.2vw,30px);
            }
            /* media ~1.5x, anchored at its LEFT edge so it grows into the empty
               right gutter (bleeds off the edge, clipped by the section) and
               never reaches the copy or heading. Desktop only; 1x when stacked. */
            @media (min-width:621px){
              .consistency-honest-edge .cr-honest-media{
                transform:scale(1.5); transform-origin:left center;
              }
            }
            .consistency-honest-edge .cr-honest-media video{
              position:absolute; inset:0; width:100%; height:100%;
              object-fit:cover; transform:scale(1.08); transform-origin:center;
              -webkit-mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              -webkit-mask-composite:source-in;
              mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              mask-composite:intersect;
            }
            .consistency-honest-edge .cr-honest-media::after{
              content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
              background:radial-gradient(122% 100% at 50% 50%, transparent 50%, rgba(5,4,12,.55) 82%, rgba(5,4,12,.92) 100%);
            }
          `}</style>
          <div className="ds-hero__v ds-hero__v3" data-version="3">
            <div className="wrap ds-hero__editorial">
              <div className="ds-hero__ed-copy">
                <Eyebrow>What we do not claim</Eyebrow>
                {/* h2: the page's one h1 lives in the home Hero */}
                <h2 className="ds-hero__title ds-hero__title--left">
                  <span className="grad-word">Reliability</span> has an honest edge
                </h2>
                <p className="sub ds-hero__sub ds-hero__sub--left">
                  EvalLens does not promise to predict startup success. It raises
                  the quality of evaluation by making it structured,
                  evidence-linked, and checkable. It points you to the decisions
                  that need human attention most — and because absolute calibration
                  across every deck type is still being proven, the human makes the
                  final call.
                </p>
              </div>
              <div className="ds-hero__ed-media cr-honest-media" aria-hidden="true">
                {/* plays once, holds the last frame, then replays after a 7s gap */}
                <DelayedLoopVideo
                  src="/assets/consistency/honest-edge-bg.mp4"
                  poster="/assets/consistency/honest-edge-bg-poster.webp"
                  gap={7}
                />
              </div>
            </div>
          </div>
        </section>

        {/* page-local: fade the closer's video in from black at its top so it
            blends into the ink HITL section above instead of a hard seam. The
            fade sits at z-index 0 inside .ds-hero__v--media — above the video
            (-2) and the scrim (-1), below the text overlay (1). Shared component
            untouched. Ported from trust/consistency-reliability §9. */}
        <style>{`
          #live-demo .ds-hero__v--media::before{
            content:""; position:absolute; left:0; right:0; top:0; z-index:0;
            height:clamp(140px,20vh,260px); pointer-events:none;
            background:linear-gradient(180deg, #05050a 0%, rgba(5,5,10,.55) 44%, transparent 100%);
          }
        `}</style>

        {/* Slide 12 — the closer. StatementHero (ink, v1) with a full-bleed
            video background, lifted from trust/consistency-reliability
            §get-started. It owns its own background, so it stays OUTSIDE the
            tonal zone above. Copy is rewritten for the demo day: the deck ends
            here and we switch to the live product.
            `headingLevel="h2"` keeps the page at one h1 (the home Hero). */}
        <StatementHero
          id="live-demo"
          surface="ink"
          version={1}
          headingLevel="h2"
          background="video"
          backgroundSrc="/assets/consistency/consistency-cta-bg-2.mp4"
          backgroundPoster="/assets/consistency/consistency-cta-bg-2-poster.webp"
          eyebrow="Live demo"
          titleLead="From here, we show it"
          titleAccent="live"
          sub="The slides end here. We'll run a real batch of decks on stage — evidence, scores, and the final report, end to end."
          ctas={[{ label: "Book a Demo", href: "https://calendly.com/evallens/30min" }]}
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
