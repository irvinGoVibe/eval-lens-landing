import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  StatBand,
  Numbered,
  Faq,
  CtaBand,
  Eyebrow,
} from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /resources/judge-briefing-pack
 *
 * Second page of the /resources section, on the same pattern as
 * /resources/pitch-competition-judging-rubric: a content page, text first,
 * no hero media, six sections. Everything an organizer should put in a
 * judge's hands BEFORE the event, with the research on why the timing
 * matters more than the contents.
 *
 * Facts and numbers come only from
 * notes/blog/_research/demo-day-scale-2026-05-23.md (each attributed in
 * copy) and the EvalLens product repo (Spread thresholds, scoring
 * procedure). Copy invariants: brand is EvalLens, no invented clients or
 * adoption numbers, AI never decides, no em dashes in the English copy.
 * Page-local styles are scoped under a `.res-` prefix; shared DS untouched.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Judge Briefing Pack Template for Organizers | EvalLens",
  description:
    "What to send judges before the event: an anchored rubric, an 11 minute calibration that raised agreement from 0.61 to 0.89, load math, and conflict rules.",
  alternates: { canonical: "/resources/judge-briefing-pack" },
};

const HEADER_NAV: SectionNav = {
  section: "Resources",
  sectionHref: "/resources",
  links: [
    { label: "The pack", href: "#pack" },
    { label: "Calibration", href: "#calibration" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* §2 — why the brief beats the debrief (sourced evidence) */
const EVIDENCE = [
  {
    value: "ICC 0",
    label:
      "agreement among 43 trained NIH reviewers scoring the same 25 funded grant applications in a mock study section. Expertise alone did not produce agreement",
    src: "Pier et al., PNAS, 2018",
  },
  {
    value: "p = .228",
    label:
      "the result of telling 42 reviewers how their scores differed from others after the fact, in a randomized trial at a Norwegian funder. Agreement did not move",
    src: "Hesselberg et al., Research Integrity and Peer Review, 2021",
  },
  {
    value: "0.61 to 0.89",
    label:
      "agreement (ICC) before and after an 11 minute training video in a randomized trial with 75 professors. The one intervention with a number this size attached",
    src: "Sattler et al., PLOS ONE, 2015",
  },
];

/* §3 — what goes in the pack, block by block */
const PACK_BLOCKS = [
  {
    n: "1",
    title: "The rubric, with anchors",
    body: "Not a list of criteria names. Each dimension needs an anchor description per band, so a judge can tell what a 3 looks like against a 7 before the first pitch. Our full pitch rubric with weights and anchors is published free on the rubric page, ready to drop into the pack.",
    href: "/resources/pitch-competition-judging-rubric",
    linkLabel: "Take the rubric",
  },
  {
    n: "2",
    title: "The scoring procedure",
    body: "Three sentences that do most of the work: cite the evidence behind every score, name the band before the number, and when the score sits on a boundary with evidence missing, take the lower band. Judges who follow this produce records, not impressions.",
  },
  {
    n: "3",
    title: "The disagreement rule",
    body: "Define, in the pack, what happens when scores diverge. In EvalLens the rule is Spread: highest score minus lowest per dimension, where under 1.5 is consensus, 1.5 to 2.99 is a split, and 3.0 or more is a conflict that goes to discussion instead of an average. Judges who know disagreement is expected stop softening their scores toward the middle.",
  },
  {
    n: "4",
    title: "Conflicts of interest, upfront",
    body: "A line asking each judge to declare investments, employment, mentorship or personal ties to any team, and the recusal mechanics when one exists. Collect it before scores exist, because a recusal after the leaderboard looks like damage control. A log of who scored what makes any recusal verifiable later.",
  },
  {
    n: "5",
    title: "The load and the schedule",
    body: "Tell each judge exactly how many submissions they will read, how long one takes, and when breaks land. The arithmetic below shows why this block is not a courtesy: unplanned load is where scoring quality quietly dies.",
  },
  {
    n: "6",
    title: "The calibration exercise",
    body: "An 11 minute video and one practice submission, done before event day. This is the highest ROI block in the pack, and the next section shows exactly how to build it.",
  },
];

/* §4 — the calibration, step by step */
const CALIBRATION_STEPS = [
  {
    num: "01",
    title: "Record one 11 minute video",
    body: "Walk through your scale, one band at a time, in your own words with your own anchors. In the Sattler trial this format alone moved reviewer agreement from ICC 0.61 to 0.89. It costs a volunteer judge less time than watching one extra pitch.",
  },
  {
    num: "02",
    title: "Score one sample submission on camera",
    body: "Take a real deck from a past event, walk the rubric, cite the evidence, name the band, pick the number. Judges copy what they see far better than what they read. One worked example beats three pages of instructions.",
  },
  {
    num: "03",
    title: "Show the cost of a wrong band",
    body: "Trained reviewers in the same trial picked the correct rating band 74% of the time against 35% untrained, and spent more time on the criteria. Show one concrete example of a misplaced score changing a ranking, and the scale stops being decorative.",
  },
  {
    num: "04",
    title: "Lock independent scores before any discussion",
    body: "Research on live review panels found scores shifting with the room, with the chair's interventions and even laughter measurably moving numbers. The fix is procedural: every judge submits scores before deliberation, the chair speaks last, and discussion resolves flagged conflicts instead of manufacturing agreement.",
  },
];

/* §5 — the load math (sourced numbers) */
const LOAD_MATH = [
  {
    value: "4 min",
    label:
      "what the MLH organizer guide budgets per project per judge: 2 minutes of demo, 1 for questions and scoring, 1 to walk to the next table",
    src: "MLH organizer guide",
  },
  {
    value: "13",
    label:
      "judges the MLH formula J = ceil(P x n x t / T) demands for its own worked example of a 500 attendee event with a 120 minute window, at three rounds per project. Plus 2 to 3 extra judges as a no-show buffer",
    src: "MLH organizer guide",
  },
  {
    value: "30 min",
    label:
      "Technovation's estimate for reviewing one submission properly, with judges committing to at least 5 submissions and around 3 hours including training",
    src: "technovation.org",
  },
  {
    value: "1.5 h",
    label:
      "per business plan when written feedback is part of the ask, at Project ECHO's competition. Judges take 3 plans for roughly 6 hours total. This is the price of feedback, and the reason most events stop giving it",
    src: "projectecho.org",
  },
];

/* §6 — FAQ */
const FAQ = [
  {
    q: "How long should the briefing pack be?",
    a: "Short enough to be read: two pages plus the rubric, and an 11 minute video. The evidence is specific on this. An 11 minute training video raised reviewer agreement from ICC 0.61 to 0.89 in a randomized trial, while longer, unstructured briefings have no comparable result attached. Every block that does not change how a judge scores belongs in a separate logistics email.",
  },
  {
    q: "Do we still need a live calibration meeting?",
    a: "Usually not. The measured gain came from a recorded video, which every judge can watch on their own time, and a live room adds its own risks: panel studies found scores shifting with the chair's interventions and the room's reactions. If you do meet live, keep the rule that independent scores are locked before any discussion starts.",
  },
  {
    q: "How many judges do we actually need?",
    a: "Run the MLH formula against your own numbers: projects, times rounds per project, times minutes per project, divided by the judging window. For its worked example of a 500 attendee event and a 120 minute window it lands on 13 judges, plus a 2 to 3 judge buffer. If the result is more judges than you can recruit, the honest options are fewer rounds, a longer window, or a first read that arrives before judges do. That last one is the job EvalLens does.",
  },
  {
    q: "What if judges skim the pack and score how they always have?",
    a: "Make the pack load-bearing instead of attached. Put the anchors on the scorecard itself rather than in an appendix, require an evidence line next to every score, and open the event by scoring one practice submission together. A judge can skip a PDF, but not a form field that asks which slide the score came from.",
  },
  {
    q: "Can we fix scoring after the event with feedback instead?",
    a: "The evidence says no. In a randomized trial across two review years, reviewers who were shown how their scores diverged from others did not agree more the following year, with agreement stuck around ICC 0.30 to 0.40. What did improve was agreement on well defined, checkable questions. Both findings point upstream: calibrate before scoring, and write criteria a judge can verify rather than feel.",
  },
];

const RES_STYLES = `
.res main .res-narrow{max-width:720px}
.res-chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.res-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.res-chip .cv{font-size:26px;font-weight:700;line-height:1.1;margin-bottom:8px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.res-chip .cl{font-size:14px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
.res-chip .cs{margin-top:8px;font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--lavender,#a99bff)}
.res-blocks{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.res-block{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff);display:flex;flex-direction:column}
.res-block .bn{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:12px;font-weight:650;letter-spacing:.1em;color:var(--lavender,#7c68f5)}
.res-block h3{font-size:17px;margin:10px 0 8px;font-weight:650}
.res-block p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.res-block .lnk{margin-top:auto;padding-top:12px;font-size:14px;font-weight:600}
.res-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.res-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function JudgeBriefingPackPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{RES_STYLES}</style>
      <main className="res section-lab ds">
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Resources", "/resources"],
            ["Judge briefing pack", "/resources/judge-briefing-pack"],
          ])}
        />

        {/* §1 Hero — id must not be "hero" (globals body:has(#hero) canvas rule) */}
        <StatementHero
          id="hero-briefing"
          surface="ink"
          eyebrow="Resources · Free to copy and use"
          titleLead="The scores are decided before the "
          titleAccent="first pitch"
          titleTrail=" starts."
          sub="What a judge receives before the event moves score quality more than anything you can do after it. This page is the full briefing pack template: the six blocks to include, the 11 minute calibration with the strongest published result behind it, and the arithmetic for how much judging your panel can actually absorb. Take it and use it, no signup required."
          ctas={[
            { label: "Build the pack", href: "#pack" },
            {
              label: "Grab the rubric first",
              href: "/resources/pitch-competition-judging-rubric",
              variant: "glass",
            },
          ]}
        />

        {/* §2 Why before beats after — evidence chips (still ink) */}
        <section id="why-before" className="band ink" aria-labelledby="res-why-h2">
          <div className="wrap res-narrow" data-reveal="up">
            <Eyebrow>Before beats after</Eyebrow>
            <h2 id="res-why-h2">
              Feedback after the event is the one fix that{" "}
              <span className="grad-word">measurably fails.</span>
            </h2>
            <p className="sub">
              Trained NIH reviewers scoring the same proposals agreed at
              essentially zero. Telling reviewers about their disagreement
              afterwards changed nothing. An 11 minute briefing before scoring
              nearly closed the gap. Three published results, one conclusion:
              the briefing pack is not paperwork, it is the intervention.
            </p>
          </div>
          <div className="wrap">
            <div className="res-chips">
              {EVIDENCE.map((e) => (
                <div key={e.value} className="res-chip" data-reveal="up">
                  <div className="cv">{e.value}</div>
                  <div className="cl">{e.label}</div>
                  <div className="cs">{e.src}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §3 The pack, block by block — page-local */}
        <section id="pack" className="band light" aria-labelledby="res-pack-h2">
          <div className="wrap res-narrow" data-reveal="up">
            <Eyebrow>The pack</Eyebrow>
            <h2 id="res-pack-h2">
              Six blocks, in the order a judge{" "}
              <span className="grad-word">reads them.</span>
            </h2>
            <p className="sub">
              Send it as one document, a week before the event, with the video
              linked at the top. Everything else about your event belongs in a
              separate logistics email, so the pack stays about one thing: how
              to score.
            </p>
          </div>
          <div className="wrap">
            <div className="res-blocks">
              {PACK_BLOCKS.map((b) => (
                <div key={b.n} className="res-block" data-reveal="up">
                  <div className="bn">Block {b.n}</div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                  {b.href ? (
                    <div className="lnk">
                      <a href={b.href}>{b.linkLabel}</a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §4 Calibration — Numbered (DS) bakes an ink surface */}
        <Numbered
          id="calibration"
          version={1}
          eyebrow="The calibration"
          title="Eleven minutes that moved agreement from 0.61 to"
          titleAccent="0.89"
          sub="A randomized trial with 75 professors tested exactly one intervention: an 11 minute video explaining what each scale value means and what an inaccurate score costs (Sattler et al., PLOS ONE, 2015). Here is how to build yours."
          items={CALIBRATION_STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §5 The load math — StatBand bakes a soft surface */}
        <StatBand
          id="load-math"
          eyebrow="The load math"
          title="Promise your judges a number, not an evening"
          accent="a number"
          stats={LOAD_MATH}
        />

        <section className="band soft" aria-labelledby="res-load-note" style={{ paddingTop: 0 }}>
          <div className="wrap res-narrow">
            <p id="res-load-note" className="res-note" data-reveal="up">
              <strong>When the formula asks for judges you do not have,</strong>{" "}
              the options are fewer rounds, a longer window, or a first read
              that lands before your judges start. EvalLens runs that first
              read: an AI panel scores every submission against your rubric and
              briefs each judge on what to verify, so panel hours go to
              decisions instead of triage. How the scoring holds up is
              documented on <a href="/trust/methodology">the methodology page</a>,
              and the full pitch competition setup on{" "}
              <a href="/trust/use-cases/pitch-competitions">the use case page</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §6 FAQ */}
        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What organizers ask before sending the"
          titleAccent="pack"
          items={FAQ}
        />

        {/* Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Send your judges a briefing, not a"
          titleAccent="pile."
          sub="Build the pack from this page and it works on its own. Add EvalLens and every judge opens the event with the field already read: scores with evidence behind them, conflicts flagged by the Spread rule, and questions worth their minutes. AI prepares the analysis, the judges decide."
          primary={{ label: "Book a demo", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "Send us your batch", href: "/company/contact#batch" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
