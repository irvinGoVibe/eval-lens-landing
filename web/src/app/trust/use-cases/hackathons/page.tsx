import type { CSSProperties } from "react";
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
 * /trust/use-cases/hackathons
 *
 * Built from wiki/product/use-cases-hackathons.md, on the structure of
 * /trust/use-cases/pitch-competitions and /trust/use-cases/grants-prizes.
 * DS components carry the standard sections; the record chain, the panel
 * cards, the disclosure kit and the data block are page-local under a
 * scoped `.hk-*` style block — shared DS untouched.
 *
 * Copy invariants: brand is EvalLens, no invented clients/logos/adoption
 * numbers, AI never decides, code and live-demo review is named as roadmap,
 * and no em dashes in the English copy.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Hackathon Judging Software | EvalLens",
  description:
    "An AI panel reads every hackathon submission on your rubric and briefs your judges before the expo opens. Evidence-linked scores, and your judges decide.",
  alternates: { canonical: "/trust/use-cases/hackathons" },
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "How it works", href: "#how-it-works" },
    { label: "The record", href: "#record" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* §2 — the judging table, honestly (StatBand, 4 sourced numbers) */
const JUDGING_MATH = [
  {
    value: "4 min",
    label:
      "all the time the MLH organizer guide budgets per project per judge: 2 minutes of demo, 1 for questions and scoring, 1 to walk to the next table",
    src: "guide.mlh.com",
  },
  {
    value: "18",
    label:
      "judges the MLH formula demands for 175 projects in a two hour expo, at three rounds each: J = ceil(P x n x t / T)",
    src: "MLH organizer guide",
  },
  {
    value: "5%",
    label:
      "share of the projects the average judge actually saw at HackMIT, where 100 judges covered more than 200 projects",
    src: "anishathalye.com",
  },
  {
    value: "70%",
    label:
      "share of a standard Devpost rubric riding on technical execution and innovation, assessed from a 3 minute demo video nobody is required to watch to the end",
    src: "info.devpost.com",
  },
];

/* §3 — the record chain (page-local) */
const EVIDENCE_CHAIN = [
  {
    label: "Score",
    value: "8.1",
    big: true,
    note: "on Execution and Demo, the heaviest dimension in the default rubric at 0.30",
  },
  {
    label: "Finding",
    value: "Two of three feature claims are demonstrated. The third is described, not shown.",
  },
  {
    label: "Quote",
    value: "“…deployed on a public endpoint, 40 test users…” · slide 6",
  },
  {
    label: "Disagreement",
    value:
      "AI reviewers split on Technical Depth. The report flags the spread instead of averaging it away.",
  },
  {
    label: "Human score",
    value:
      "Your organizer's Jury Score, logged next to the AI read. The leaderboard is built from the human number.",
  },
];

/* §4 — submissions close → leaderboard, in six steps (Numbered) */
const STEPS = [
  {
    num: "01",
    title: "Your rubric and tracks, locked",
    body: "Criteria, weights and tracks configured per event, plus a methodology line you can publish in the rules where fairness claims belong. You get: a rulebook your judges and sponsors can read before the doors open.",
  },
  {
    num: "02",
    title: "Submissions land on your event page",
    body: "A public link or QR with a deadline and live statuses, or a manual batch you upload yourself. Completeness is checked automatically, so staff chases exceptions instead of the pile. You get: a clean field the minute the deadline hits.",
  },
  {
    num: "03",
    title: "The hackathon panel does the first read",
    body: "Five reviewer roles, independent AI reads rather than people, score every submission on execution, technical depth, problem impact, innovation, UX clarity and delivery readiness. Execution and technical depth carry the heaviest default weights, and every score is pinned to quotes from the submission itself, so judges walk in knowing which claims still need proof at the table. You get: the whole field pre-read in hours.",
  },
  {
    num: "04",
    title: "Every judge walks in with a briefing",
    body: "Per team: scores with the evidence behind them, quotes tagged to the slide they came from, what to verify at the table, and the questions worth the visit. You get: table visits that test the build instead of the pitch.",
  },
  {
    num: "05",
    title: "The expo runs exactly as designed",
    body: "Same tables, same judges, same closing ceremony. Judges score as usual, and where AI reviewers disagreed the report says so, so deliberation starts at the real argument. You get: your judges' leaderboard, better informed.",
  },
  {
    num: "06",
    title: "Leaderboard, then feedback for every team",
    body: "The ranking is built from human Jury Scores and your criteria weights. Structured feedback is drafted from the evidence and approved by your staff before it goes out. You get: teams that come back next year and tell people why.",
  },
];

/* §5 — what the panel reads (page-local) */
const PANEL_CARDS = [
  {
    icon: "🧪",
    title: "Five reviewers, execution weighted",
    body: "Five independent AI reads per submission, each from a different reviewer angle, scored across six dimensions: execution, technical depth, problem impact, innovation, UX clarity and delivery readiness. Execution and Demo carries 0.30 of the default weight and Technical Depth 0.20. Weights are yours to set before the run and lock when it starts.",
  },
  {
    icon: "📥",
    title: "Today it reads the submission you already collect",
    body: "The deck, the project description and the team's own notes, in the same intake you already run. Nothing changes for participants, and no judge loses a role.",
  },
  {
    icon: "🛠️",
    title: "Repository and live URL are next, and we say so",
    body: "Reading a repo and a running demo end to end is the next build on the roadmap, not a claim we make today. When it ships you will hear it from us before you read it on a slide.",
  },
  {
    icon: "⏱️",
    title: "The gap the rubric never admits",
    body: "A standard hackathon rubric puts most of the weight on technical execution and innovation, then asks a judge to grade both from a 3 minute video and a table visit. The first pass narrows that gap with a full read of the written record, and tells your judges exactly what still needs verifying live.",
  },
];

/* §6 — the disclosure kit rows (page-local) */
const KIT_ROWS = [
  {
    b: "The opening ceremony sentence",
    span: "“An AI panel gives every submission a full read under identical rules, and humans decide every placement.”",
  },
  {
    b: "The rules page paragraph",
    span: "A methodology statement for your event rules: what the AI panel assists with, what the judges decide, and how a team can ask about its own record.",
  },
  {
    b: "The submission form line",
    span: "Plain language on the form itself, so nobody discovers AI involvement after the results are announced.",
  },
  {
    b: "The conflict of interest note",
    span: "Judge conflicts and recusals stay your policy. The record simply logs who scored what, which is what makes a recusal verifiable later.",
  },
];

/* §7 — data & team IP (page-local) */
const DATA_IP = [
  {
    icon: "🚫",
    title: "Never trained on",
    body: "Team submissions are processed only for your event's evaluation and never used to train models. Contractual.",
  },
  {
    icon: "🏫",
    title: "The event owns the record",
    body: "Reports, scores and the decision log belong to your program. Retention and deletion follow your policy; student-data handling structured to support your FERPA obligations, DPA available.",
  },
  {
    icon: "🧾",
    title: "Procurement-ready",
    body: "PO and invoice accepted, vendor registration forms and security questionnaires supported, public sub-processor list at /subprocessors, education discount for university programs.",
  },
];

/* §8 — FAQ */
const FAQ = [
  {
    q: "Does the AI pick the winners?",
    a: "No, and there is no mode where it does. The AI panel produces an advisory read per submission. Your organizer sets the Jury Score per dimension, and the leaderboard is built from those human scores and your criteria weights. The AI number sits next to the human one for reference, and it never ranks anyone.",
  },
  {
    q: "Does it review our teams' code and live demos?",
    a: "Not yet, and we will not pretend otherwise. Today the panel reads the submission materials you already collect: the deck, the project description and the team's notes. Repository and live URL review is the next build on the roadmap. What you get today is a complete, consistent first pass across the whole field and a briefing that tells each judge exactly what to verify at the table.",
  },
  {
    q: "Our judges are sponsors and alumni. We are not cutting them.",
    a: "Nothing here cuts a judge. Judge count is a sponsor perk and a program KPI, so what changes is the ask, not the headcount. Sponsors came to meet builders and be seen, not to speed read 175 submissions on a Sunday. They keep the floor and arrive briefed.",
  },
  {
    q: "We run five tracks with different criteria.",
    a: "Tracks, criteria and weights are configured per event, and each track scores against its own rubric. Weights can be edited right up until the run starts, then they lock so the field is scored on one standard end to end.",
  },
  {
    q: "Will our teams' projects train your model, and who sees them?",
    a: "Never trained on, contractually. Submissions are processed only for your event, inside a closed perimeter with no public links. The sub-processor and model provider list is available for your IT review, and every report and score belongs to the event.",
  },
  {
    q: "Can a team ask why it placed where it placed?",
    a: "Yes. Every submission has a record: scores per dimension, the evidence and quotes behind them, where the AI reviewers disagreed, and the human score that decided the placement. Whether you run open appeals stays your policy. The record turns that conversation into five minutes instead of an archaeology dig.",
  },
];

const HK_STYLES = `
.hk main .hk-narrow{max-width:720px}
.hk-chain{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.hk-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.hk-chip .cl{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff);margin-bottom:8px}
.hk-chip .cv{font-size:14.5px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
.hk-chip .big{font-size:30px;font-weight:700;line-height:1;margin-bottom:6px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.hk-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.hk-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff)}
.hk-card .ic{font-size:22px;line-height:1}
.hk-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.hk-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.hk-kit{border-radius:24px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2)) border-box;box-shadow:var(--shadow-soft,0 24px 60px -34px rgba(40,30,90,.5));padding:clamp(26px,4vw,44px);margin-top:clamp(28px,4vw,44px)}
.hk-kit h3{font-size:clamp(20px,2.6vw,26px);font-weight:680}
.hk-kit .lead{color:var(--muted,#5b5670);margin-top:12px;font-size:15.5px;max-width:68ch}
.hk-kit .rows{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:24px}
.hk-kit .row b{display:block;font-size:15px;margin-bottom:6px}
.hk-kit .row span{font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.hk-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.hk-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function HackathonsPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{HK_STYLES}</style>
      <main className="hk section-lab ds">
      {/* FAQPage JSON-LD — built from this page's FAQ data (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
        {/* §1 Hero — id must not be "hero" (globals body:has(#hero) canvas rule) */}
        <StatementHero
          id="hero-hackathons"
          surface="ink"
          eyebrow="AI prepares the analysis · People decide"
          titleLead="Every project gets a full read before the "
          titleAccent="expo floor"
          titleTrail=" opens."
          sub="EvalLens is hackathon judging software that runs the first pass. An AI panel reads every submission against your rubric, scores the whole field with evidence quotes before anyone walks the tables, and hands each judge a briefing instead of a blank scorecard. Your judges still pick the winner."
          ctas={[
            { label: "See a sample report", href: "/trust/use-cases#sample-output" },
            { label: "Send us your batch", href: "/company/contact#batch", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · judge briefing pack · 16:9",
            hint: "Hackathon briefing pack UI: a team card with per-dimension scores, an evidence quote tagged to a slide, a reviewer disagreement flag, and questions for the table visit. Light Apple-style dashboard.",
            ariaLabel:
              "Hackathon briefing pack: team card with execution and technical depth scores, evidence quotes, and questions for the table visit",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §2 Judging math (StatBand bakes a soft surface) */}
        <StatBand
          id="judging-math"
          eyebrow="The judging table, honestly"
          title="Your judges cannot read what your judges never see"
          accent="never see"
          stats={JUDGING_MATH}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §3 The record — page-local evidence chain */}
        <section id="record" className="band ink" aria-labelledby="hk-record-h2">
          <div className="wrap hk-narrow" data-reveal="up">
            <Eyebrow>Monday, in the Discord</Eyebrow>
            <h2 id="hk-record-h2">
              &ldquo;How did that project win?&rdquo;{" "}
              <span className="grad-word">cc: the sponsor.</span>
            </h2>
            <p className="sub">
              A team that shipped a working build lost to a team that demoed well. Today
              you answer with a shrug, because four minutes at a table is genuinely not a
              review. With a record, the thread ends in one reply.
            </p>
          </div>
          <div className="wrap">
            <div className="hk-chain">
              {EVIDENCE_CHAIN.map((c) => (
                <div key={c.label} className="hk-chip" data-reveal="up">
                  <div className="cl">{c.label}</div>
                  {c.big ? <div className="big">{c.value}</div> : null}
                  <div className="cv">{c.big ? c.note : c.value}</div>
                </div>
              ))}
            </div>
            <p className="sub hk-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              The first submission and the last submission are read under exactly the same
              rules, which is more than any four minute table visit can claim. The AI score
              is advisory. The ranking comes from your judges.
            </p>
          </div>
        </section>

        {/* §3 record (ink) → §4 Numbered (ink): both dark, no bridge needed. */}

        {/* §4 How it works — Numbered (DS) bakes an ink surface */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Submissions close, judging starts already read"
          titleAccent="already read"
          sub="The AI panel does the first pass. Your judges keep the floor, the questions and the final call."
          items={STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §5 What the panel reads — page-local */}
        <section className="band soft" aria-labelledby="hk-panel-h2">
          <div className="wrap hk-narrow" data-reveal="up">
            <Eyebrow>Under the hood</Eyebrow>
            <h2 id="hk-panel-h2">
              A first pass built for what teams{" "}
              <span className="grad-word">actually submit.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="hk-cards">
              {PANEL_CARDS.map((c) => (
                <div key={c.title} className="hk-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="light" aria-hidden="true" />

        {/* §6 What we tell the hackers — page-local disclosure kit */}
        <section className="band light" aria-labelledby="hk-kit-h2">
          <div className="wrap hk-narrow" data-reveal="up">
            <Eyebrow>When the Discord asks</Eyebrow>
            <h2 id="hk-kit-h2">
              You get the script, not just the{" "}
              <span className="grad-word">software.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="hk-kit" data-reveal="up">
              <h3>The &ldquo;what we tell everyone&rdquo; kit, included.</h3>
              <p className="lead">
                Hackers notice everything and post about all of it. The risk is never the
                tool. The risk is defending the tool with no script. So the setup ships
                with ready language for every audience.
              </p>
              <div className="rows">
                {KIT_ROWS.map((r) => (
                  <div key={r.b} className="row">
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §7 Data & team IP — page-local */}
        <section className="band soft" aria-labelledby="hk-data-h2">
          <div className="wrap hk-narrow" data-reveal="up">
            <Eyebrow>Data &amp; team IP</Eyebrow>
            <h2 id="hk-data-h2">
              The block your legal team reads{" "}
              <span className="grad-word">first.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="hk-cards">
              {DATA_IP.map((c) => (
                <div key={c.title} className="hk-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className="hk-note" data-reveal="up">
              <strong>Try it on last year&rsquo;s field first.</strong> Send us a batch you
              already judged and compare the AI read against the placements you know. The
              first retro-test run is free through August 31, for batches up to 10 decks.{" "}
              <a href="/company/contact#batch">Send us your batch</a> or{" "}
              <a href="/pricing">see pricing</a>.
            </p>
          </div>
        </section>

        {/* Faq (DS) bakes an ink surface, so bridge into dark, not light. */}
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §8 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Hackathons", "/trust/use-cases/hackathons"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What your judges and your Discord will ask"
          titleAccent="will ask"
          items={FAQ}
        />

        {/* §9 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Run the first pass on a field you already"
          titleAccent="judged."
          sub="Send last year's submissions, or this year's batch before the expo. The panel reads every one on your rubric while your judges do what they always do. The first run is free through August 31, for batches up to 10 decks. AI prepares the analysis, your judges make the call."
          primary={{ label: "Send us your batch", href: "/company/contact#batch" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
