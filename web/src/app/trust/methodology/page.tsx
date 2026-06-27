import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { CanvasFlowField } from "@/components/CanvasFlowField";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import {
  StatementHero,
  RiskControl,
  PinnedSteps,
  Gallery,
  EditorialSplit,
  RoutingMatrix,
  Bento,
  Cinema,
  Eyebrow,
  Title,
} from "@/components/ds";
import type { RiskPair, Stat, HubLink, RoutingJudge, BentoItem } from "@/components/ds";

/** Header nav for this page - anchor links to its own sections. Anchors read as
 * trust steps, not pipeline mechanics: Foundations · Matrix · Evidence · Control. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Foundations", href: "#foundations" },
    { label: "Matrix", href: "#matrix" },
    { label: "Evidence", href: "#evidence" },
    { label: "Control", href: "#control" },
  ],
};

export const metadata: Metadata = {
  title: "Evidence-Based Pitch Evaluation Methodology - EvalLense",
  description:
    "EvalLense does not ask one model for a final verdict. It turns each deck into evidence, routes it through fixed criteria and independent judge lenses, computes an advisory AI Total Score, and keeps the final ranking under human control.",
};

/* ── Content. Public-facing copy: qualitative labels + "reproducible". No
 * internal constants/formulas (numeric confidence mapping, routing weights);
 * those live in the deep-dive trust pages. Real dimensions: P1 Problem,
 * P2 Solution Logic, P3 Business Value / Market, P4 Pitch Quality,
 * P5 Team Readiness, P6 Feasibility (source of truth: ai-jury-prod). ── */

/* §2 - Why methodology was needed: the operational pain, framed as
 * risk → EvalLense response. */
const WHY_PAIRS: RiskPair[] = [
  { risk: "Reviewers focus on different signals", control: "Fixed P1-P6 dimensions" },
  { risk: "Scores are hard to defend", control: "Score trace" },
  { risk: "Strong submissions get lost in the pile", control: "Structured review queue" },
  { risk: "AI can overreach", control: "Jury Score controls the ranking" },
];

/* §3 - What 400+ runs taught us. Each stat label carries the lesson and the
 * change it drove, so the trust number doubles as the builder story. */
const RUNS_STATS: Stat[] = [
  {
    value: "400+",
    label: "Evaluation runs behind the current method",
    src: "Builder log",
  },
  {
    value: "6",
    label: "Judge lenses with defined roles",
    src: "Pitch preset",
  },
  {
    value: "P1-P6",
    label: "Fixed dimensions for every deck",
    src: "Dimension matrix",
  },
];

/* §4 - Methodological foundations. Variant A: mapped to the real P1–P6.
 * Pitch Quality (P4) is the presentation layer, called out in the sub. */
const FOUNDATIONS_TILES: BentoItem[] = [
  {
    feature: true,
    tag: "Feeds P1 · P2",
    title: "Lean Startup",
    body: "Hypothesis and problem-solution logic - feeds Problem significance and Solution differentiation.",
    media: {
      src: "/assets/methodology/foundations-lean-startup.webp",
      width: 1229,
      height: 359,
      ratio: "1229/359",
      label: "Glass methods illustration",
      hint: "Lean Startup, Hypothesis, Customer Pain, Validated",
      ariaLabel:
        "Glass illustration: a Lean Startup book beside Hypothesis and Customer Pain cards and a Validated check token",
    },
  },
  {
    tag: "Feeds P1 · P2",
    title: "Customer Development",
    body: "Customer, pain, and validation evidence - feeds Problem significance and Solution differentiation.",
  },
  {
    tag: "Feeds P3 · P5 · P6",
    title: "VC Due Diligence",
    body: "Market, business model, team, and feasibility - feeds Market, Team, and Feasibility.",
  },
];

/* §5a - Pipeline: the five fixed stages every deck runs through (ink peak,
 * paired with the Dimension Matrix). Restored per request. */
const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Decoder",
    desc: "PDF, PPTX, or Google Slides - every deck is converted into the same structured, slide-by-slide format for the judges.",
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

/* §5 - The six Pitch Competition DIMENSIONS (what we score), read as questions.
 * These are P1-P6, NOT the judge lenses (J-P1...J-P6) - the lenses live only in
 * the Routing Matrix below. The matrix is thesis-first. */
const DIMENSIONS = [
  {
    tag: "P1",
    title: "Problem significance",
    body: ["Is the pain real, urgent, and specific?"],
  },
  {
    tag: "P2",
    title: "Solution differentiation",
    body: ["Is the solution clear and meaningfully different?"],
  },
  {
    tag: "P3",
    title: "Market attractiveness",
    body: ["Is the opportunity credible and worth pursuing?"],
  },
  {
    tag: "P4",
    title: "Business model / GTM",
    body: ["Is there a plausible path to revenue and distribution?"],
  },
  {
    tag: "P5",
    title: "Team / founder fit",
    body: ["Can this team credibly execute?"],
  },
  {
    tag: "P6",
    title: "Feasibility / readiness",
    body: ["Is the plan realistic given resources, time, and dependencies?"],
  },
];

/* §6 - The real Judge Routing Matrix (Pitch preset). Each judge has one primary
 * dimension (J-P3 owns two; J-P4 Pitch Quality reads everything as advisory).
 * Weights: primary 1.00 · secondary 0.50 · advisory 0.25 · none 0. Source of
 * truth: ai-jury-prod wiki/architecture/pipeline-summarizer.md +
 * src/config/dimensions.ts (PITCH_ROUTING_MATRIX). Kept on this page per request
 * - the concept framing lives in the section title/sub above the full table. */
const ROUTING_DIMENSIONS = [
  "Problem",
  "Solution",
  "Market",
  "GTM",
  "Team",
  "Feasibility",
];
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

/* §7 - Evidence-before-score procedure. */
const RUBRIC_PROCEDURE = [
  {
    title: "Cite the evidence",
    body: "Use slide-grounded facts only. Every claim must point to a specific slide.",
  },
  {
    title: "Weigh it both ways",
    body: "State what supports the score, what lowers it, and what the deck leaves unclear or unproven.",
  },
  {
    title: "Name the band",
    body: "Explain which rubric band the evidence falls into and why.",
  },
  {
    title: "Then the score",
    body: "The score must sit inside that band. At the boundary, incomplete evidence pushes the result down, not up.",
  },
];

/* §8 - Disagreement as a review signal, not an error. Spread explained without
 * formulas; the numeric tests live in Consistency & Reliability. */
const DISAGREEMENT: RiskPair[] = [
  { risk: "High score · low spread", control: "Strong, stable signal" },
  { risk: "High score · high spread", control: "Strong score, needs review" },
  { risk: "Market strong · feasibility weak", control: "Opportunity with execution risk" },
  { risk: "Low score · high spread", control: "Contested, not simply weak" },
];

/* §8a - The scoring model (advisory). Restored per request, kept formula-free
 * (no 15% / weighted-average / 7.6->7.4 numbers per the P0 brief). The standalone
 * Disagreement tile is dropped because §8 now owns that. */
const SCORING_TILES: BentoItem[] = [
  {
    feature: true,
    tag: "Criterion score",
    title: "Per dimension",
    // Body + key facts in one string. `.lab-bento__tile p` is white-space:pre-line,
    // so `\n` controls the breaks: the 2-line phrase, then the three facts right
    // beneath it. Kept in the body (not a slot) so they render immediately after
    // the paragraph and before the image, which we do NOT touch.
    body: (
      <>
        {"Judge scores are combined using routing weights\nto produce a weighted average.\n\n"}
        <strong>Inputs</strong>
        {"\nJudge score · routing weight · confidence\n\n"}
        <strong>Primary judges</strong>
        {"\nCarry the strongest influence\n\n"}
        <strong>Advisory judges</strong>
        {"\nAdd context without dominating the score"}
      </>
    ),
    media: {
      src: "/assets/bento/scoring-model-transparent.webp",
      ratio: "3/2",
      label: "Diagram · routed signals · 3:2",
      hint: "Judge signals combine by routing weight into one AI Criterion Score",
      ariaLabel:
        "Judges, weighted by their routing role, combine into one confidence-adjusted AI Criterion Score; disagreement is shown separately",
    },
  },
  {
    tag: "Confidence",
    title: "Confidence adjustment",
    body: "Confidence is calculated separately and can apply a limited downward adjustment. It reduces overconfidence when evidence is thin. Maximum adjustment: 15%.",
    media: {
      src: "/assets/bento/scoring-confidence.webp",
      ratio: "3/2",
      label: "Diagram · confidence adjustment · 3:2",
      hint: "Confidence reduces overconfidence when evidence is thin, without replacing the judge score",
      ariaLabel:
        "A criterion score nudged down by a limited confidence adjustment when evidence is thin",
    },
  },
  {
    tag: "Total score",
    title: "Across dimensions",
    body: "Project weights combine the AI Criterion Scores into one advisory AI Total Score on a 0-10 scale.",
    media: {
      src: "/assets/bento/scoring-across.webp",
      ratio: "3/2",
      label: "Diagram · across dimensions · 3:2",
      hint: "Six AI Criterion Scores combine into one advisory AI Total Score",
      ariaLabel:
        "Six AI Criterion Scores orbiting and combining into one advisory AI Total Score",
    },
  },
  {
    tag: "Review signal",
    title: "Disagreement",
    body: "Spread flags consensus, split, or conflict between primary and secondary judges. It does not change the score - it tells reviewers where to look closer.",
  },
  {
    tag: "Reproducible math",
    title: "Reproducible",
    body: "No model call runs during final aggregation. The same judge outputs and weights produce the same calculated score every time.",
  },
];

/* §9 - Where the human decides. */
const HITL_POINTS = [
  {
    title: "Review the evidence",
    body: "AI suggests a score for each dimension and shows the evidence behind it - a read-only reference.",
  },
  {
    title: "Add live context",
    body: "Bring in what the deck can't show: notes from the live pitch and the Q&A.",
  },
  {
    title: "Set the Jury Score",
    body: "You set your own Jury Score per dimension. It stays a separate value from the AI Criterion Score - the AI baseline for one dimension.",
  },
  {
    title: "Submit the decision",
    body: "The leaderboard is built only from submitted Jury Scores. The AI Total Score never determines the ranking.",
  },
];

/* §10 - What the methodology does not claim. Honest boundaries, mapped to what
 * the system actually does (boundary → action) for the RiskControl pair layout. */
const LIMIT_PAIRS: RiskPair[] = [
  {
    risk: "An external truth check",
    control: "Evaluates what the deck presents and flags what is missing - it does not verify claims against the outside world.",
  },
  {
    risk: "Investment advice",
    control: "Gives decision support for reviewers, not a recommendation to fund or pass.",
  },
  {
    risk: "Automatic winner selection",
    control: "Never ranks the batch - the human Jury Score owns the leaderboard.",
  },
  {
    risk: "A prediction of success",
    control: "Describes the pitch today; it does not forecast whether the startup will succeed.",
  },
];

/* §11 - Related trust pages. Deep-dives this hub deliberately links out to. */
const RELATED: HubLink[] = [
  {
    tag: "Human decision",
    title: "Review Board",
    body: "Where the human jury sets the final score and the ranking.",
    href: "/product/review-board",
    feature: true,
  },
  {
    tag: "Repeatability",
    title: "Consistency & Reliability",
    body: "Repeatability, spread, and when a human decision is needed.",
    href: "/trust/consistency-reliability",
  },
  {
    tag: "Safety",
    title: "Prompt Injection Safety",
    body: "How decks that try to manipulate the judges are handled.",
    href: "/trust/prompt-injection-safety",
  },
  {
    tag: "Privacy",
    title: "Security & Privacy",
    body: "How deck data is handled, stored, and protected.",
    href: "/trust/security-privacy",
  },
  {
    tag: "Story",
    title: "The builder story",
    body: "What 400+ runs taught us about scoring pitch decks.",
    href: "/blog",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds trust-methodology">
        {/* Page-local style injection (scoped by section id). Overrides only this
            page's sections — no shared DS component or globals.css touched.
            · #why: feature-gradient cards (Q1 = wrap each Risk→Response pair in a
              gradient card, matching the lab-bento feature tile).
            · #routing: widen the head/sub so the title reads in ~2 lines and the
              sub in ~3 lines (defaults are 48ch / 54ch). */}
        <style>{`
          #why .ds-risk__row{
            background: linear-gradient(118deg, color-mix(in oklab, var(--violet) 14%, transparent), color-mix(in oklab, #8b93ff 11%, transparent) 60%, color-mix(in oklab, var(--lavender) 9%, transparent));
            border-color: color-mix(in oklab, var(--violet) 28%, transparent);
          }
          #routing .head{ max-width: 60ch; }
          #routing .sub{ max-width: 70ch; }
          /* §8a Scoring · Per dimension: bold the inline sub-labels
             (Inputs / Primary judges / Advisory judges) in the body copy.
             Explicit 700 (UA "bolder" is relative and reads weak on light body). */
          .ds-scoring-bento .lab-bento__tile--feature p strong{ font-weight: 700; }
          /* §7a Scoring · Per dimension feature tile: text + key-facts stack from
             the TOP (eyebrow → 2-line body → facts right beneath it); the chalice
             image sits enlarged, flush in the BOTTOM-RIGHT corner, behind them. */

          /* HARD RULE — holds at EVERY width, not just desktop: the card is its own
             stacking context (isolation), the copy is ALWAYS the top layer (z-index 2)
             and the image is ALWAYS a positioned layer beneath it (z-index 1).
             position:relative makes z-index bite even while the image is in normal
             flow (<901px), so however the image shifts/scales on resize it can NEVER
             cover the text. */
          .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature{ position: relative; isolation: isolate; }
          .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature > .mini-tag,
          .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature > h3,
          .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature > p{ position: relative; z-index: 2; }
          .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature .lab-bento__media--img{ position: relative; z-index: 1; }

          /* Desktop art-direction only: copy sits in a left half-column, the chalice
             is pinned flush in the BOTTOM-RIGHT corner (absolute, still z-index 1 →
             below the copy). On mobile the tile just stacks (image in flow, under the
             text). The extra .lab-bento__v--polish class outranks the default
             globals.css image rule (which otherwise leaves the image in flow). */
          @media (min-width: 901px){
            .ds-scoring-bento .lab-bento__tile--feature{ justify-content: flex-start; }
            .ds-scoring-bento .lab-bento__tile--feature > p{ text-align: left; max-width: 50%; }
            .ds-scoring-bento .lab-bento__v--polish .lab-bento__tile--feature .lab-bento__media--img{
              position: absolute; right: 0; bottom: 0; top: auto; left: auto;
              margin: 0; width: auto; height: auto;
              max-height: clamp(270px, 32vw, 360px); transform: none;
              object-fit: contain; object-position: bottom right; z-index: 1;
            }
          }

          /* §4 Foundations · Lean Startup feature card: the glass "methods"
             illustration is pinned ALONG THE BOTTOM EDGE, behind the copy. Same
             hard layering as §7a — the card is its own stacking context, the copy
             is z-index 2, the image is an absolute z-index 1 layer (independent of
             the text). It bleeds a touch past the bottom and is clipped by the
             card (overflow:hidden) so the objects sit flush into the edge and fill
             the empty lower area. Absolute on desktop; on mobile it just flows
             under the text. */
          #foundations .lab-bento__v--polish .lab-bento__tile--feature{ position: relative; isolation: isolate; overflow: hidden; }
          #foundations .lab-bento__v--polish .lab-bento__tile--feature > .mini-tag,
          #foundations .lab-bento__v--polish .lab-bento__tile--feature > h3,
          #foundations .lab-bento__v--polish .lab-bento__tile--feature > p{ position: relative; z-index: 2; }
          #foundations .lab-bento__v--polish .lab-bento__tile--feature .lab-bento__media--img{ position: relative; z-index: 1; }
          @media (min-width: 901px){
            #foundations .lab-bento__v--polish .lab-bento__tile--feature .lab-bento__media--img{
              position: absolute; left: 50%; right: auto; top: auto; bottom: -16px;
              transform: translateX(-50%);
              margin: 0; width: min(92%, 760px); height: auto; max-height: none;
              object-fit: contain; object-position: bottom center; z-index: 1;
            }
          }
        `}</style>
        {/* ── ONE continuous tonal zone: a single shared background that holds
            light through the hub intro (§1 Hero → §4 Foundations), flips
            light→dark for the §5 Dimension Matrix (the one ink peak), then flips
            dark→light through the brand BRIDGE for the lower trust band
            (§6 Routing → §11 Related). The dark crossfade tracks the DOM position
            of <ZoneToneFlip/> / <ZoneToneFlipReverse/>, so it always brackets the
            Matrix regardless of how many light sections surround it. Only the
            <ZoneBlobs/> banding is fixed-% and may need a visual nudge if section
            heights change. ── */}
        <div className="ds-zone">
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes" aria-hidden="true" />
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight" aria-hidden="true" />
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />
          {/* blobs over the LIGHT bands, clipped off the dark Matrix block in the
              middle: upper cluster = §1–4 (top→~50%), lower cluster = §6–11
              (~60%→bottom). Banding stops scroll-parallax drift from carrying an
              orb onto the dark section. */}
          <ZoneBlobs bottom="50%" />
          <ZoneBlobs top="60%" />

          {/* 1. Hero - StatementHero, soft (light tone). */}
          <StatementHero
            id="hero"
            surface="light"
            version={2}
            eyebrow="Methodology"
            titleLead="A score you can"
            titleAccent="inspect, compare, and defend"
            titleTrail="."
            sub="EvalLense does not ask one model for a final verdict. It turns each deck into evidence, routes that evidence through fixed criteria and independent judge lenses, computes an advisory AI Total Score, and keeps the final ranking under human control."
            ctas={[
              { label: "See a sample score trace", href: "#evidence" },
              { label: "Book a Demo", href: "/company/contact" },
            ]}
            media={{
              ratio: "16/9",
              label: "Image · hero lens · 16:9",
              hint: "A lens focusing a noisy deck into one clear, evidence-linked score",
              ariaLabel:
                "A lens focusing a noisy deck into one clear, evidence-linked score",
            }}
          />

          {/* 2. Why methodology was needed - page-local RiskControl v2 (Modern
              Recomposition: bordered pair-cards). Injected: shared RiskControl has
              no `version` prop. Risk → system response. */}
          <section id="why" className="band soft ds-risk" aria-label="Why methodology was needed">
            <div className="ds-risk__v ds-risk__v--recomp" data-version="2">
              <div className="wrap">
                <div className="head" data-reveal="up">
                  <Eyebrow>Review at scale</Eyebrow>
                  <Title title="Human review does not scale cleanly" accent="scale" />
                  <p className="sub">At small volume, reviewers can still read carefully. At large volume, consistency starts to crack. Different reviewers anchor on different signals, and strong submissions disappear in the pile. EvalLense keeps review structured when the batch is too large for unaided human review.</p>
                </div>
                <div className="ds-risk__grid" data-reveal="up">
                  {WHY_PAIRS.map((pair, i) => (
                    <div key={i} className="ds-risk__row">
                      <div>
                        <span className="mini-tag">Risk</span>
                        <strong>{pair.risk}</strong>
                      </div>
                      <div>
                        <span className="mini-tag">System response</span>
                        <p>{pair.control}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. What 400+ runs taught us - page-local StatBand v2 (Modern
              Recomposition). Injected: the shared component has no `version` prop
              (it always renders v1), so we render its v2 container markup
              directly, no `hidden`. Shared component file untouched. */}
          <section id="runs" className="band soft ds-statband" aria-label="What 400+ runs taught us">
            <div className="ds-statband__v ds-statband__v--recomp" data-version="2">
              <div className="wrap">
                <div className="head" data-reveal="up">
                  <Eyebrow>Field tested</Eyebrow>
                  <Title title="The method earned its shape through iteration" accent="iteration" />
                </div>
                <ul className="ds-statband__grid" data-reveal="up">
                  {RUNS_STATS.map((stat) => (
                    <li key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                      <span className="ds-statband__src">{stat.src}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Methodological foundations - Bento, light. Accent bento hub: the
              feature tile carries Lean Startup, with the title lens-accenting
              "evaluation" (a clean word that the exact-match accent can land on -
              "methods," has a comma and would not match). */}
          <Bento
            id="foundations"
            surface="light"
            version={1}
            ariaLabel="Method foundations"
            eyebrow="Method foundations"
            title="Built from startup evaluation methods, not prompt tricks"
            titleAccent="evaluation"
            sub="The Pitch Competition dimension matrix combines three established startup-evaluation lenses. It is thesis-first: a polished deck should not score high if the problem is vague, the customer is unclear, and the business logic is thin. Presentation quality matters, but it is not the whole method - a polished deck should not outrank weak problem, market, team, or feasibility evidence."
            items={FOUNDATIONS_TILES}
          />
          {/* ── tone-flip seam (§4 → §5): transparent light→dark flip of the
              shared through-background, crossfading the dark layer in as it
              crosses the viewport. ── */}
          <ZoneToneFlip />

          {/* 5a. Pipeline - PinnedSteps, ink. The five fixed stages, restored as
              the first half of the ink peak (paired with the Dimension Matrix). */}
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
              src: "/assets/methodology/methodology-transition.mp4",
              frames: 0,
              ariaLabel:
                "Methodology transition - scrubbed by scroll through the stages",
            }}
          />

          {/* 5. Dimension Matrix - Gallery, ink (the one ink peak). Six
              dimensions read as questions, one rubric. */}
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
          {/* ── reverse tone-flip seam (§5 → §6): dark→light through the brand
              bridge ("third colour", no grey), fading the .ds-relight layer back
              in. ── */}
          <ZoneToneFlipReverse />

          {/* 6. Routing matrix - RoutingMatrix, light. Full judge × dimension
              table, with the "not every judge influences every score" concept
              framed in the title/sub above it. */}
          <RoutingMatrix
            id="routing"
            surface="light"
            eyebrow="Controlled influence"
            title="Not every judge influences every score"
            accentWords={["influences"]}
            sub="The matrix shows how much each judge lens (J-P1...J-P6) contributes to each dimension (P1-P6). Primary judges drive the score. Secondary judges add important support. Advisory judges provide context. None means no scoring influence."
            dimensions={ROUTING_DIMENSIONS}
            dimensionsFull={ROUTING_DIMENSIONS_FULL}
            judges={ROUTING_JUDGES}
          />

          {/* 7. Evidence before score - EditorialSplit, light. The rubric forces
              the case before the number, with a worked trace in the sub. */}
          <EditorialSplit
            id="evidence"
            surface="light"
            version={3}
            eyebrow="Score trace"
            titleLead=""
            titleAccent="Evidence"
            titleTrail=" before score"
            sub="A number is useful only when you can inspect the evidence behind it. The rubric forces evidence, strengths, weaknesses, and missing information before a score - never the other way around. Worked example, P3 Market: evidence on slides 6 and 8, strength a clear target segment, weakness an unsourced TAM, missing buyer validation, confidence medium - which lands the score in the band, not above it."
            points={RUBRIC_PROCEDURE}
            media={{
              ratio: "4/3",
              label: "Diagram · rubric scale · 4:3",
              hint: "A 0–10 scale with its defined rubric bands, and the evidence → band → score procedure",
              ariaLabel:
                "A 0 to 10 rubric scale with defined bands and an evidence to score trace",
            }}
          />

          {/* 7a. The scoring model - Bento, light. Restored: how the judges'
              outputs become one advisory AI Total Score (formula-free copy). */}
          <Bento
            className="ds-scoring-bento"
            surface="light"
            version={1}
            ariaLabel="How the advisory score is built"
            eyebrow="The scoring model"
            title="How the advisory score is built"
            titleAccent="advisory"
            sub="A fixed calculation combines judge outputs into an advisory AI Total Score. The same judge scores, routing weights, confidence values, and criterion weights produce the same result. The score informs human review but does not determine the final ranking."
            items={SCORING_TILES}
          />

          {/* 8. Disagreement is surfaced - RiskControl, light. Spread as a review
              signal, not an error. */}
          <RiskControl
            id="disagreement"
            surface="light"
            eyebrow="Review signals"
            title="Averages can hide the case that needs review"
            titleAccent="hide"
            sub="When judges disagree, EvalLense shows the spread instead of burying it in an average. Spread does not change the score. It points reviewers to the cases that need a closer look. The numeric tests live in Consistency & Reliability."
            leftTag="Signal"
            rightTag="Meaning"
            pairs={DISAGREEMENT}
          />

          {/* 9. Human-in-the-loop - local block (EditorialSplit v2 mirror layout,
              media slot is a looping video). AI prepares, the jury decides. */}
          <section id="control" className="band soft ds-split" aria-label="Where the human decides">
            <div className="wrap ds-split__grid ds-split__grid--mirror" data-version={2}>
              <figure className="ds-split__media ds-split__media--video" data-reveal="left" aria-hidden="true">
                <video autoPlay muted loop playsInline preload="metadata">
                  <source src="/assets/methodology/hitl-loop.mp4" type="video/mp4" />
                </video>
              </figure>
              <div className="ds-split__copy" data-reveal="right">
                <Eyebrow>Human control</Eyebrow>
                <h2 className="title ds-split__title">
                  AI prepares the evidence.{" "}
                  <span className="grad-word">You set the score.</span>
                </h2>
                <p className="sub">
                  The AI Total Score is an advisory baseline - it explains the AI read, but it never ranks the batch. The Jury Score is the final human scoring input, and the leaderboard is ranked only by that human score. Because no model runs at scoring time, the same judge outputs and weights reproduce the same baseline every time.
                </p>
                <ul className="ds-split__points">
                  {HITL_POINTS.map((pt, i) => (
                    <li key={i} className="ds-split__point">
                      <span className="ds-split__point-dot" aria-hidden="true" />
                      <h3 className="ds-split__point-h">{pt.title}</h3>
                      <p className="ds-split__point-p">{pt.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 10. What this methodology does not claim - page-local RiskControl v2
              (Modern Recomposition: bordered pair-cards). Injected: shared
              RiskControl has no `version` prop. Maps each boundary to what the
              system actually does. */}
          <section id="limits" className="band soft ds-risk" aria-label="What this methodology does not claim">
            <div className="ds-risk__v ds-risk__v--recomp" data-version="2">
              <div className="wrap">
                <div className="head" data-reveal="up">
                  <Eyebrow>Clear boundaries</Eyebrow>
                  <Title title="It prepares the review. It does not replace your judgment" accent="judgment" />
                  <p className="sub">EvalLense evaluates what is present in the deck, highlights missing evidence, and prepares the review. It does not prove that every claim is true.</p>
                </div>
                <div className="ds-risk__grid" data-reveal="up">
                  {LIMIT_PAIRS.map((pair, i) => (
                    <div key={i} className="ds-risk__row">
                      <div>
                        <span className="mini-tag">It is not</span>
                        <strong>{pair.risk}</strong>
                      </div>
                      <div>
                        <span className="mini-tag">What it does</span>
                        <p>{pair.control}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
        {/* ── end tonal zone (§1–10) ── */}

        {/* 11. Related trust pages - page-local RiskControl v3 (Expanded), ink.
            Rebuilt per request from the default <ds-risk surface="ink" version={3}>
            block (the shared component has no `version` prop, so we render its v3
            container directly). Each trust page is one row: tag + title on the
            left, body + an injected "Read more →" link on the right. Placed
            OUTSIDE the light zone so the dark hub flows into the ink Cinema. */}
        <section id="related" className="band ink ds-risk" aria-label="Related trust pages">
          <div className="ds-risk__v ds-risk__v--expanded" data-version="3">
            <div className="wrap">
              <div className="head" data-reveal="up">
                <Eyebrow>Trust layers</Eyebrow>
                <Title title="Related trust pages" accent="trust" />
                <p className="sub">This page is the hub. For the mechanics behind each claim, follow the matching deep-dive.</p>
              </div>
              <div className="ds-risk__grid" data-reveal="up">
                {RELATED.map((item, i) => (
                  <div key={i} className="ds-risk__row">
                    <div>
                      <span className="mini-tag">{item.tag}</span>
                      <strong>{item.title}</strong>
                    </div>
                    <div>
                      <span className="mini-tag">Deep dive</span>
                      <p>{item.body}</p>
                      <a
                        className="ds-hubmap__more"
                        href={item.href}
                        aria-label={item.title}
                        style={{ display: "inline-block", marginTop: "12px" }}
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Final CTA - Cinema, ink (cinematic close; ink peak #2). */}
        <Cinema
          surface="ink"
          headline="Follow one score from slide to final call"
          lines={["Follow one score", "from slide to final call"]}
          mobileLines={["Follow one score", "from slide to final call"]}
          sub="Open a sample evaluation and trace one score from slide evidence to rubric band, judge output, AI Total Score, and final Jury Score."
          cta={{ label: "Book a Demo", href: "/company/contact" }}
          media={{ videoSrc: "/assets/methodology/methodology-transition.mp4" }}
          maskId="methodology-final-cta"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
      {/* Blue flow-field injected into the shared dark layer (--lobes-dark) that
          fades in over the §5 Dimension Matrix ink peak via ZoneToneFlip. The
          field inherits that layer's opacity (0 over the light bands, 1 over the
          Matrix), so it only paints on the dark band. `blue` scopes the palette
          to this page. */}
      <CanvasFlowField blue />
    </>
  );
}
