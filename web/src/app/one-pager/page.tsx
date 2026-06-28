import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import {
  StatementHero,
  StatBand,
  Bento,
  EditorialSplit,
  Gallery,
  CtaBand,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "EvalLense — One review standard for every application (one-pager)",
  description:
    "A practical one-page explainer: what you upload, what EvalLense does, how long it takes, what the jury gets, who sets the final score, and how to start a pilot.",
};

/*
 * ── VISUAL SYSTEM — LIGHT "CINEMATIC INK" ────────────────────────────────
 * Composed entirely from the clean DS barrel `@/components/ds`. A LIGHT
 * design-system build (container carries `ds`) with two ink cinematic peaks —
 * §5 Trust (Bento, surface="ink") and §7 Pilot CTA (CtaBand, theme="dark").
 * Surface arc: light · soft · light · soft · INK · light · INK.
 *
 * Media slots render as the DS `Media` placeholder (visible, ratio-locked) —
 * no images generated. ZoneToneFlip handles the light→ink seam before §5;
 * the §5/§6 ink→light seam is a plain surface flip back to a light Gallery.
 *
 * Invariants: the human sets the final score; AI is advisory. Motion is
 * data-* only — DS components wire data-reveal / data-pin. <ScrollFX/> is
 * mounted once, after <Footer/>.
 */

/* 1b. Practical numbers — four stats (StatBand `Stat` needs a `src` line; the
   brief gives none, so it stays empty). */
const STATS = [
  { value: "20–40", label: "applications in a first pilot", src: "" },
  { value: "4–5 min", label: "machine processing per application", src: "" },
  { value: "6", label: "scoring dimensions per deck", src: "" },
  { value: "10", label: "checks for missing deck evidence", src: "" },
] as const;

/* page-local: 4-up stat grid (DS default is 3-col) + outputs panel. No backticks inside. */
const PILOT_NUMBERS_CSS = `
  #pilot-numbers .ds-statband__grid{ grid-template-columns:repeat(4,1fr); }
  /* smaller figure so 20-40 / 4-5 min sit on ONE line — equal value height keeps
     every card's label on the same row, centred (li is already text-align:center). */
  #pilot-numbers .ds-statband__grid strong{ font-size:clamp(26px,2.8vw,40px); white-space:nowrap; }
  @media (max-width:980px){ #pilot-numbers .ds-statband__grid{ grid-template-columns:repeat(2,1fr); } }
  @media (max-width:620px){ #pilot-numbers .ds-statband__grid{ grid-template-columns:1fr; } }
  #problem .lab-bento__media--img{ border-radius:16px; box-shadow:0 24px 60px -34px rgba(30,26,70,.30); max-height:clamp(240px,28vw,380px); }
  /* DS Title accents only ONE word; accent the whole 2nd sentence "Too little structure." (title words 4-6) page-local */
  #problem .title > span:nth-child(n+4){ background:var(--lens); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent; }
  /* unified, tighter vertical rhythm between sections — one value for the whole
     page (cards keep their own inner padding). Hero keeps a larger top so it
     clears the fixed header. */
  .one-pager section.band{ padding-block:clamp(32px,4vw,60px); }
  .one-pager .op-flow{ padding-block:clamp(32px,4vw,60px); }
  .one-pager #top{ padding-top:clamp(104px,12vw,150px); }
  /* §4 output locked to solid black (independent of the page canvas / tone-flip)
     so the black-bg report image merges seamlessly into the section */
  .one-pager #output{ background:#000; }
`;
const OUTPUTS_CSS = `
  .op-outputs .wrap{ max-width:980px; margin:0 auto; text-align:center; }
  .op-outputs__lead{ font-family:var(--font-mono); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin:0 0 clamp(20px,2.2vw,30px); }
  .op-outputs__list{ list-style:none; margin:0; padding:0; display:flex; flex-wrap:wrap; justify-content:center; gap:clamp(10px,1.1vw,14px); }
  .op-outputs__list li{ position:relative; padding:11px 20px 11px 38px; border-radius:999px; background:rgba(255,255,255,.72); border:1px solid rgba(20,18,45,.10); font-size:clamp(14px,1.2vw,16px); font-weight:500; color:#1b1830; }
  .op-outputs__list li::before{ content:""; position:absolute; left:17px; top:50%; transform:translateY(-50%); width:9px; height:9px; border-radius:50%; background:var(--lens); }
`;

/* 2. Problem — Bento: one feature tile + supporting tiles. */
const PROBLEM_TILES = [
  {
    tag: "The wall",
    title: "Strong projects stall in unstructured review",
    body: "Materials arrive as decks, links, tables, and notes. A strong project stalls before anyone reads it closely.",
    feature: true,
    media: {
      src: "/assets/one-pager/problem-wall-broken.webp",
      width: 1600,
      height: 900,
      label: "Image · the problem wall · 4:3",
      hint: "Left: a bright aqua pitch deck. Centre: a wall of glass problem blocks (Too many decks, Not enough time, Uneven criteria, Reviewer bias, Scattered evidence, Weak decision trail). Right: a muted review batch. The deck hits the wall.",
      ariaLabel: "A glass ‘manual review’ box breaking apart into problem blocks — too many decks, lost context, not enough time, different criteria, bias, fatigue, and hard to defend",
    },
  },
  {
    tag: "Volume",
    title: "Too many applications",
    body: "A hundred applications is rarely a hundred careful reviews.",
  },
  {
    tag: "Time",
    title: "Not enough time",
    body: "The first decks get a deep read; later ones get a skim.",
  },
  {
    tag: "Criteria",
    title: "Different criteria",
    body: "One reviewer weighs the market, another the team, another execution.",
  },
  {
    tag: "Trail",
    title: "Weak decision trail",
    body: "Months later, it's hard to explain why a team advanced or didn't.",
  },
] as const;

/* 3. Guided workflow — PinnedSteps. */
const WORKFLOW_STEPS = [
  {
    num: "01",
    label: "Collect applications",
    desc: "Participants submit decks, project descriptions, or other materials.",
  },
  {
    num: "02",
    label: "Set the criteria",
    desc: "Choose the scale, weights, and scoring format for your selection.",
  },
  {
    num: "03",
    label: "Run the machine pass",
    desc: "EvalLense prepares a structured first read of each application — about 4–5 minutes per application after upload.",
  },
  {
    num: "04",
    label: "Hand the reports to the jury",
    desc: "Every report carries strengths, risks, gaps, and questions to raise.",
  },
  {
    num: "05",
    label: "The human sets the final score",
    desc: "The jury verifies, compares, and decides. A person sets the final score.",
  },
] as const;

/* 3. Guided workflow — page-local dark inject. Own bg (not `.band.ink`, which goes
   transparent under this page's canvas). No backticks inside the literal. */
const FLOW_CSS = `
  .op-flow{ position:relative; isolation:isolate; z-index:1; overflow:hidden; padding:clamp(76px,9vw,140px) 0; color:#f5f5f7; background-color:#060510; background-image:radial-gradient(130% 90% at 82% 0%, rgba(124,92,255,.18), transparent 60%); }
  .op-flow__grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.82fr); gap:clamp(34px,6vw,96px); align-items:start; }
  .op-flow__copy{ position:sticky; top:110px; }
  .op-flow__eyebrow{ font-family:var(--font-mono); font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:#9aa0ff; margin:0 0 18px; }
  .op-flow__title{ font-size:clamp(34px,4.6vw,62px); line-height:1.05; letter-spacing:-.03em; font-weight:600; margin:0 0 22px; color:#fff; }
  .op-flow__accent{ background:linear-gradient(96deg,#a99bff,#2ec5e8 56%,#36e0c2); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .op-flow__sub{ font-size:clamp(16px,1.4vw,19px); line-height:1.5; color:rgba(255,255,255,.6); max-width:40ch; margin:0; }
  .op-flow__steps{ list-style:none; margin:clamp(26px,3vw,40px) 0 0; padding:0; }
  .op-flow__step{ display:grid; grid-template-columns:auto 1fr; gap:20px; padding:22px 0; border-top:1px solid rgba(255,255,255,.1); }
  .op-flow__step:last-child{ border-bottom:1px solid rgba(255,255,255,.1); }
  .op-flow__num{ font-family:var(--font-mono); font-size:14px; letter-spacing:.1em; color:rgba(255,255,255,.4); padding-top:2px; }
  .op-flow__step-label{ font-family:var(--font-mono); font-size:14px; letter-spacing:.08em; text-transform:uppercase; color:#fff; font-weight:500; margin:0 0 8px; }
  .op-flow__step-desc{ font-size:15px; line-height:1.5; color:rgba(255,255,255,.56); margin:0; }
  /* right column: the generated vertical flow-rail image (transparent on the dark bg) */
  .op-flow__media{ margin:0; }
  .op-flow__media img{ display:block; width:100%; height:auto; max-width:520px; margin-inline:auto; filter:drop-shadow(0 36px 80px rgba(0,0,0,.5)); }
  @media (max-width:900px){ .op-flow__grid{ grid-template-columns:1fr; gap:36px; } .op-flow__copy{ position:static; } .op-flow__media img{ max-width:420px; } }
`;

/* 4. Output — EditorialSplit points list ("After a run you get"). */
const OUTPUT_POINTS = [
  { title: "A report for every participant", body: "" },
  { title: "A ranked scoring table", body: "" },
  { title: "Questions for the jury", body: "" },
  { title: "Risks and missing data", body: "" },
  { title: "One shared scoring scale", body: "" },
] as const;

/* 5. Trust — Bento (INK peak #1): one feature tile + five trust tiles. */
const TRUST_TILES = [
  {
    tag: "AI prepares",
    title: "AI prepares the analysis",
    body: "EvalLense lays out the evidence, the risks, and the questions — then hands them to the people who decide.",
    feature: true,
    media: {
      ratio: "4/3",
      src: "/assets/security-privacy/final-decision-human-ranking.webp",
      width: 1619,
      height: 972,
      label: "Image · AI prepares → human decides · 4:3",
      hint: "Left: report cards. Centre: evidence lines. Right: a human final-score capsule, visually separated from the AI score. Do not show AI as a judge picking the winner.",
      ariaLabel: "AI prepares the analysis; a human sets the final score",
    },
  },
  {
    tag: "Standard",
    title: "One standard",
    body: "Every application runs through the same scoring logic.",
  },
  {
    tag: "Explained",
    title: "Every score is explained",
    body: "You see the reasons, not just a number.",
  },
  {
    tag: "Risks",
    title: "Risks and gaps",
    body: "Each report flags what to verify before you decide.",
  },
  {
    tag: "Questions",
    title: "Questions for the jury",
    body: "The report frames the discussion — it doesn't replace it.",
  },
  {
    tag: "Human",
    title: "The human sets the final score",
    body: "Control stays with the organizer and the jury.",
  },
] as const;

/* 6. Use cases — Gallery cards (Goal + Looks-at combined). */
const USE_CASES = [
  {
    tag: "Pitch competition",
    title: "Pitch competition",
    body: "Pick a shortlist and prep the jury for discussion. Looks at problem, solution, market, team, feasibility.",
  },
  {
    tag: "Hackathon",
    title: "Hackathon",
    body: "Get through every submission fast after the deadline. Looks at product, technical depth, value, readiness.",
  },
  {
    tag: "Accelerator",
    title: "Accelerator",
    body: "Compare a stream of startups against program criteria. Looks at problem, market, team, traction, risks.",
  },
  {
    tag: "Grants / innovation programs",
    title: "Grants / innovation programs",
    body: "Keep the decision transparent and defensible. Looks at criteria fit, evidence, impact, gaps.",
  },
  {
    tag: "VC fund",
    title: "VC fund",
    body: "Turn inbound decks into a partner-ready first read. Looks at problem, market, team, traction, gaps.",
  },
  {
    tag: "Corporate innovation",
    title: "Corporate innovation",
    body: "Tell real partnership potential from theatre. Looks at strategic fit, market, team, feasibility.",
  },
  {
    tag: "Angel investors",
    title: "Angel investors",
    body: "See which decks are worth your time. Looks at problem, traction, team, risks.",
  },
  {
    tag: "Universities",
    title: "Universities",
    body: "Compare student and research teams fairly. Looks at problem, solution, team, feasibility.",
  },
] as const;

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Company",
  sectionHref: "/company/about",
  links: [
    { label: "Problem", href: "#problem" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pilot", href: "#pilot" },
  ],
};

export default function OnePagerPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="one-pager section-lab ds">
        {/* 1. Hero — statement hero (light), editorial v3 with media beside copy. */}
        <StatementHero
          id="top"
          surface="light"
          version={1}
          eyebrow="ONE REVIEW STANDARD"
          titleLead="Get through your application stream"
          titleAccent="faster"
          titleTrail=" — without losing the strong projects"
          sub="EvalLense prepares a structured first read of every application — scores, strengths, risks, missing data, and questions for the jury. One application takes 4–5 minutes of machine processing. The human sets the final score."
          ctas={[
            { label: "Start a pilot", href: "/company/contact" },
            { label: "Book a demo", href: "/#demo" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · decks → lens → reports · 16:9",
            hint: "A stack of pitch decks on the left, a glass evaluation lens in the centre, report cards (score, risk, question, evidence) on the right. The final score must not read as an AI verdict.",
            ariaLabel:
              "Pitch decks passing through an evaluation lens and becoming structured reports for the jury",
          }}
        />

        {/* 1b. Practical numbers — StatBand (soft). */}
        <StatBand
          id="pilot-numbers"
          surface="light"
          ariaLabel="What a first pilot looks like, in numbers"
          eyebrow="BY THE NUMBERS"
          title="What a first pilot looks like"
          accent="pilot"
          stats={STATS.map((s) => ({ value: s.value, label: s.label, src: s.src }))}
        />
        <style>{PILOT_NUMBERS_CSS}</style>

        {/* 1c. Outputs — what each run produces (page-local; not metrics). */}
        <section className="band soft op-outputs" aria-label="What each run produces">
          <div className="wrap">
            <p className="op-outputs__lead" data-reveal="up">After a run, you get</p>
            <ul className="op-outputs__list" data-reveal="up">
              <li>A report for every participant</li>
              <li>A ranked scoring table</li>
              <li>Risks and missing data</li>
              <li>Questions for the jury</li>
              <li>One shared scoring scale</li>
            </ul>
          </div>
          <style>{OUTPUTS_CSS}</style>
        </section>

        {/* 2. Problem — Bento (light): feature wall + four supporting tiles. */}
        <Bento
          id="problem"
          surface="light"
          version={2}
          ariaLabel="Why manual review breaks at volume"
          eyebrow="WHY MANUAL REVIEW BREAKS"
          title="Too many applications. Too little structure."
          titleAccent="Too little structure"
          sub="At volume, strong teams get skimmed. Criteria drift between reviewers, notes scatter, and the final call gets harder to defend."
          items={PROBLEM_TILES.map((t) => ({
            tag: t.tag,
            title: t.title,
            body: t.body,
            feature: "feature" in t ? t.feature : undefined,
            media: "media" in t ? t.media : undefined,
          }))}
        />

        {/* 3. Guided workflow — page-local dark inject (own bg; DS .band.ink went transparent here). Naming/copy WIP. */}
        <section
          id="how-it-works"
          className="op-flow"
          aria-label="How a single selection runs, step by step"
        >
          <div className="wrap">
            <div className="op-flow__grid">
              <div className="op-flow__copy">
                <p className="op-flow__eyebrow">THE WHOLE LOOP, END TO END</p>
                <h2 className="op-flow__title">
                  How a single<br />selection{" "}
                  <span className="op-flow__accent">runs</span>
                </h2>
                <p className="op-flow__sub">
                  Set the standard once. EvalLense applies it to every
                  application and prepares what the jury needs to decide faster.
                </p>
                <ol className="op-flow__steps">
                  {WORKFLOW_STEPS.map((s) => (
                    <li key={s.num} className="op-flow__step">
                      <span className="op-flow__num">{s.num}</span>
                      <div className="op-flow__step-body">
                        <h3 className="op-flow__step-label">{s.label}</h3>
                        <p className="op-flow__step-desc">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <figure className="op-flow__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/one-pager/guided-selection-roadmap.webp"
                  alt="The whole selection as one rail: collect applications, set the criteria, run the first read through the lens, hand the jury the reports, and a human sets the final score."
                  width={1040}
                  height={2080}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
          <style>{FLOW_CSS}</style>
        </section>

        {/* 4. Output — EditorialSplit (soft): points list + report-card placeholder. */}
        <EditorialSplit
          id="output"
          surface="ink"
          version={2}
          ariaLabel="What the organizer gets after a run"
          eyebrow="WHAT YOU GET"
          titleLead="What the"
          titleAccent="organizer"
          titleTrail=" gets"
          sub="By the jury meeting, you have a working picture of every participant. Each report is built the same way, so projects compare side by side."
          points={OUTPUT_POINTS.map((p) => ({ title: p.title, body: p.body }))}
          media={{
            ratio: "4/3",
            src: "/assets/one-pager/organizer-report.webp",
            width: 1400,
            height: 1050,
            label: "Image · per-participant report card · 4:3",
            hint: "A large report card: project name, system score, per-criterion scores, strengths, risks, missing data, jury questions, a ‘verify in discussion’ status, and a ‘final score is the jury’s’ note. The report is the hero, not the AI score.",
            ariaLabel:
              "The organizer review kit: a per-participant report card (project, system score, per-criterion scores, strengths, risks, missing data, jury questions, final score), plus a final scoring table and a shared 1–10 scale.",
          }}
        />

        {/* ── tone-flip seam (§4 → §5): transparent light→ink flip of the shared
            through-background, mirroring evidence-based-reports. ── */}
        <ZoneToneFlip />

        {/* 5. Trust — Bento (INK peak #1): AI prepares, the human decides. */}
        <Bento
          id="trust"
          surface="ink"
          version={1}
          ariaLabel="AI prepares the analysis; the human decides"
          eyebrow="AI PREPARES, THE HUMAN DECIDES"
          title="Not a black box. Not a jury replacement."
          titleAccent="jury"
          sub="EvalLense prepares the analysis; it never makes the final call. It helps the jury see evidence, risks, and questions faster."
          items={TRUST_TILES.map((t) => ({
            tag: t.tag,
            title: t.title,
            body: t.body,
            feature: "feature" in t ? t.feature : undefined,
            media: "media" in t ? t.media : undefined,
          }))}
        />

        {/* 6. Use cases — Gallery (light), v4 grid: 4 selection formats. */}
        <Gallery
          id="use-cases"
          surface="light"
          version={4}
          ariaLabel="Selection formats EvalLense fits"
          eyebrow="WHERE IT FITS"
          title="Fits different selection formats"
          accentWords={["formats"]}
          sub="EvalLense fits wherever you review many applications fast and compare projects on one standard."
          laneLabel="Selection formats — pitch competition, hackathon, accelerator, grants"
          items={USE_CASES.map((u) => ({
            tag: u.tag,
            title: u.title,
            body: u.body,
          }))}
        />

        {/* 7. Pilot CTA — CtaBand (INK peak #2): run a pilot on a real stream.
            CtaBand takes no `id`, so the `#pilot` nav anchor lives on a wrapper. */}
        <div id="pilot">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            eyebrow="START"
            title="Run a pilot on a real application"
            titleAccent="stream"
            sub="We process the participants' materials, prepare reports for the jury, and show how EvalLense works on your selection — while control over the decision stays with you. One application takes 4–5 minutes of machine processing after upload."
            primary={{ label: "Start a pilot", href: "/company/contact" }}
            secondary={{ label: "Book a demo", href: "/#demo" }}
          />
        </div>
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
