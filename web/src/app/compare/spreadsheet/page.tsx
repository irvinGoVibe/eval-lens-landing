import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  StatBand,
  Faq,
  CtaBand,
  Eyebrow,
} from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /compare/spreadsheet
 *
 * First page of the /compare section. The comparison target is not another
 * product: it is the DIY stack almost every program actually runs, a form,
 * a spreadsheet and a ChatGPT tab. Built from notes/research/market-pain-map.md
 * §5 (DIY stack) and notes/research/category-gaps-screening.md, on the DS
 * structure of /trust/use-cases/hackathons. The comparison table, the
 * "where DIY is right" cards, the break-point blocks and the stay-on-the-sheet
 * list are page-local under a scoped `.cmp-*` style block; shared DS untouched.
 *
 * Copy invariants: brand is EvalLens, no invented clients, every external
 * number carries its source in the visible copy, AI never decides, screening
 * memo (not IC memo), and no em dashes in the English copy.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Spreadsheets and ChatGPT vs EvalLens | Compare",
  description:
    "Forms, a spreadsheet and ChatGPT carry review until about batch 200. See where the DIY stack breaks, what EvalLens changes, and when to keep the sheet.",
  alternates: { canonical: "/compare/spreadsheet" },
};

const HEADER_NAV: SectionNav = {
  section: "Compare",
  links: [
    { label: "Where it breaks", href: "#break-points" },
    { label: "Side by side", href: "#side-by-side" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* §2 — where the DIY stack is right (page-local cards) */
const DIY_RIGHT = [
  {
    icon: "🆓",
    title: "It costs nothing",
    body: "A form, a sheet and a chat tab are free or already paid for. For a first season with forty applications, that is not a compromise. It is the correct engineering decision, and we would make the same one.",
  },
  {
    icon: "🧩",
    title: "It bends to any process",
    body: "No vendor rubric, no onboarding call, no waiting for a feature. Add a column, change a formula, rewrite the prompt over lunch. While your process is still being invented, that flexibility beats any product.",
  },
  {
    icon: "🤝",
    title: "Everyone already knows it",
    body: "Zero training. Every reviewer on earth can open a spreadsheet, and by now most have a ChatGPT tab open next to it. A 2026 Affinity survey of roughly 300 dealmakers found 85% already use AI daily.",
  },
];

/* §3a — the numbers behind the breaking point (StatBand, sourced) */
const BREAK_MATH = [
  {
    value: "200",
    label:
      "applications at which Kyle Taylor of Launchpad LA looked at his spreadsheet and, as he told Zapier's blog, \"knew that was not a good system\"",
    src: "zapier.com/blog",
  },
  {
    value: "60%",
    label:
      "score variation between runs when grading vendor MarkInMinutes sent the exact same essay and rubric to ChatGPT three times",
    src: "markinminutes.com",
  },
  {
    value: "85%",
    label:
      "of dealmakers already use AI daily, per the 2026 Affinity survey of roughly 300 respondents. The question is no longer whether AI reads applications",
    src: "Affinity 2026, via developmentcorporate.com",
  },
  {
    value: "12%",
    label:
      "of institutional funds have AI screening actually running in production. That gap between daily use and production process is this whole page",
    src: "developmentcorporate.com",
  },
];

/* §3b — the three break points (page-local) */
const BREAK_POINTS = [
  {
    num: "01",
    title: "The seam between the tools is a person",
    body: "The form, the sheet and the chat window do not talk to each other. Someone exports the CSV, fixes the columns, pastes each application into the prompt and copies the answer back. An operator of a nonprofit grant program wrote in the Airtable community in June 2026 that her Zapier to Airtable connection \"does break fairly regularly\" and she has to go reconnect it. Telling detail from the same thread: nobody in it had a scoring workflow at all, only deadline tracking. The integration layer of the DIY stack is a human, and humans take weekends.",
  },
  {
    num: "02",
    title: "The sheet has a ceiling, and it is around 200 rows",
    body: "At Launchpad LA, applications were readable one by one, then suddenly they were not. \"People were putting unstructured notes next to the application. As you try to scale that, it becomes impossible,\" Kyle Taylor told Zapier's blog. The failure modes are boringly specific. ScoreJudge, a judging software vendor, keeps a whole catalog of them: two judges typing in the same cell where whoever saved last wins, formulas that silently break when a column shifts, a judge accidentally sorting the sheet, no per-judge breakdown in the export. None of these are exotic. All of them happen the week the batch doubles.",
  },
  {
    num: "03",
    title: "ChatGPT scores with confidence and leaves no trace",
    body: "MarkInMinutes, a grading tool vendor, ran a documented test: the same essay and rubric, submitted three times, came back with scores varying by up to 60%. Justifications were of the \"demonstrates good understanding\" kind, citing nothing, and some feedback referenced content that was not in the work at all. Practitioners on Hacker News made the same point in July 2026: an LLM judge hallucinates facts in both directions, inventing flaws and missing real ones. And as Development Corporate put it the same month, a ChatGPT prompt in a private Slack channel has no versioning, no calibration data and no audit trail. The output looks like a decision. Nothing behind it can be reproduced, checked or defended.",
  },
];

/* §4 — side by side, by operation (page-local table, no pricing column) */
const TABLE_ROWS = [
  {
    op: "Intake",
    diy: "The form exports a CSV. Someone pastes it into the sheet, fixes the columns by hand and chases missing attachments over email.",
    el: "Applications land as one batch with completeness checked automatically. Your existing form stays. EvalLens is a layer on top of intake, not a replacement for it.",
  },
  {
    op: "One rubric for every application",
    diy: "The rubric lives inside a prompt that gets edited, shortened and re-pasted. Application 8 and application 180 are quietly graded against different questions.",
    el: "Criteria and weights are set before the run and lock when it starts. Every application in the batch is scored against the same frozen rubric, and the weights are visible on the leaderboard.",
  },
  {
    op: "Reading every application in full",
    diy: "Reviewers are sharp for row 3 and skimming by row 150. The tail of the sheet gets a different quality of attention than the top.",
    el: "A panel of independent AI reviewers gives submission 1 and submission 200 the same full read under identical rules. Order and fatigue stop being scoring factors.",
  },
  {
    op: "Evidence behind the score",
    diy: "A 7 with \"seems strong\" in the next cell, or a ChatGPT justification that cites nothing from the actual document.",
    el: "Every score is tied to quotes pulled from the submission itself. When a claim has no evidence in the materials, the report says so instead of inventing some.",
  },
  {
    op: "Re-scoring after a rubric change",
    diy: "Re-paste everything and get new numbers with no way to tell whether the rubric changed or the model's mood did.",
    el: "Re-run the batch under the new weights. The aggregation math is deterministic, so what changed in the scores traces back to what changed in the rubric.",
  },
  {
    op: "The trail behind \"why did this score 4.2\"",
    diy: "Scroll a chat history and hope the thread was not deleted. There is no per-application record to show a founder, a board or a sponsor.",
    el: "A per-criterion record: scores, the evidence behind them, where reviewers disagreed, and the human decision logged on top. The answer takes five minutes, not an excavation.",
  },
];

/* §5 — when to stay on the spreadsheet (honest disqualification) */
const STAY_ROWS = [
  {
    b: "Your batch fits in a weekend",
    span: "Forty applications, three reviewers who each read everything. The sheet is not straining and neither are you. The 200 mark is where the operators we quoted above hit the wall, and you are nowhere near it.",
  },
  {
    b: "Nobody will ever ask you to explain a decision",
    span: "No board, no sponsor, no rejected founder asking why. If a shrug is an acceptable answer in your program, an evidence trail is overhead you do not need yet.",
  },
  {
    b: "One person reads every application anyway",
    span: "If a single trusted reviewer goes end to end, consistency comes free. The problems on this page start when the batch gets split across people, rooms and late evenings.",
  },
  {
    b: "Your process changes every week",
    span: "While criteria are still being discovered, the flexibility of a sheet and a prompt genuinely beats a locked rubric. Come back when the process stops moving.",
  },
];

/* §6 — FAQ */
const FAQ = [
  {
    q: "Is EvalLens just ChatGPT with a nicer interface?",
    a: "No, and the difference is exactly the failure modes on this page. A single chat prompt gives one pass with, per MarkInMinutes' test, up to 60% score variation between runs on the same input. EvalLens runs a panel of independent AI reviewers against a rubric that locks before the run, ties every score to quotes from the submission, records where reviewers disagreed instead of averaging it away, and aggregates with deterministic math. Same batch, same rubric, same math, and a record you can open afterwards.",
  },
  {
    q: "Our prompt works fine. Why change anything?",
    a: "It probably does produce plausible output, which is exactly the trap. As Development Corporate wrote in July 2026, a standing prompt in a private Slack channel has no versioning, no calibration data and no audit trail, but it produces the same-looking output as a governed process. The day a founder, a board member or a sponsor asks why an application scored what it scored, plausible is not the standard. Reproducible is. You are not replacing your prompt because it is bad. You are replacing it because it cannot testify.",
  },
  {
    q: "Do we have to abandon our form and our spreadsheet?",
    a: "No. EvalLens sits on top of the intake you already run. Keep your form, keep the sheet as your working view if you like. Applications come in as a batch, the panel does the first read, and results are yours to export. What goes away is the copy-paste seam and the untracked scoring, not your tools.",
  },
  {
    q: "Does the AI decide who advances?",
    a: "No, and there is no mode where it does. The panel produces a screening memo per application: scores, evidence, and flagged disagreements. It is a first gate that gets every application a full, consistent read. The advisory AI score sits next to the human score, and the shortlist is built from human decisions. AI prepares the analysis, your team decides.",
  },
  {
    q: "How do we test this without committing to anything?",
    a: "Send a batch you already reviewed on your spreadsheet and compare the panel's read against the decisions you know. The first run is free through August 31, for batches up to 10 decks. If the sheet was giving you the right answers, you will see that too, and this page told you to keep it.",
  },
];

const CMP_STYLES = `
.cmp main .cmp-narrow{max-width:720px}
.cmp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.cmp-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff)}
.cmp-card .ic{font-size:22px;line-height:1}
.cmp-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.cmp-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.cmp-breaks{display:grid;gap:18px;margin-top:clamp(28px,4vw,44px)}
.cmp-break{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:20px;padding:clamp(22px,3vw,32px);display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start}
.cmp-break .bn{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:13px;letter-spacing:.12em;padding-top:5px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.cmp-break h3{font-size:clamp(17px,2.2vw,20px);font-weight:650;margin-bottom:10px;color:var(--heading-on-dark,#fff)}
.cmp-break p{font-size:14.5px;line-height:1.6;color:var(--body-on-dark,rgba(255,255,255,.82))}
@media (max-width:560px){.cmp-break{grid-template-columns:1fr}.cmp-break .bn{padding-top:0}}
.cmp-tablewrap{overflow-x:auto;margin-top:clamp(28px,4vw,44px);border-radius:24px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2)) border-box;box-shadow:var(--shadow-soft,0 24px 60px -34px rgba(40,30,90,.5))}
.cmp-table{width:100%;min-width:680px;border-collapse:collapse;font-size:14.5px;line-height:1.55}
.cmp-table th{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:11px;letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:18px 20px;border-bottom:1px solid var(--border,rgba(20,16,45,.12));color:var(--muted,#5b5670)}
.cmp-table th.el{color:var(--iris,#6c4cf1)}
.cmp-table td{padding:18px 20px;border-bottom:1px solid var(--border,rgba(20,16,45,.08));vertical-align:top;color:var(--muted,#5b5670)}
.cmp-table tr:last-child td{border-bottom:none}
.cmp-table td.op{font-weight:650;color:var(--fg,#14102d);min-width:150px}
.cmp-table td.el{background:rgba(108,76,241,.05);color:var(--fg,#14102d)}
.cmp-stay{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:24px;background:var(--surface,#fff);padding:clamp(26px,4vw,44px);margin-top:clamp(28px,4vw,44px)}
.cmp-stay .rows{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:24px}
.cmp-stay .row b{display:block;font-size:15px;margin-bottom:6px}
.cmp-stay .row span{font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.cmp-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.cmp-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function CompareSpreadsheetPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{CMP_STYLES}</style>
      <main className="cmp section-lab ds">
        {/* §1 Hero — id must not be "hero" (globals body:has(#hero) canvas rule) */}
        <StatementHero
          id="hero-compare-spreadsheet"
          surface="ink"
          eyebrow="Compare · Forms + Sheets + ChatGPT"
          titleLead="The spreadsheet was right,"
          titleAccent="until batch 200."
          sub="A form, a spreadsheet and a ChatGPT tab is the most common application review stack in the world, and for good reasons. EvalLens exists for the season it stops working: the batch outgrows the sheet, the prompt returns a different score every run, and someone finally asks why a deck got a 4.2. AI prepares the analysis, your team decides."
          ctas={[
            { label: "Book a demo", href: "https://calendly.com/evallens/30min" },
            { label: "Send us your batch", href: "/company/contact#batch", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · sheet vs report · 16:9",
            hint: "Split view: left, a crowded spreadsheet with clashing cell notes and a chat window pasted beside it; right, one EvalLens screening report with per-criterion scores, an evidence quote and a disagreement flag. Light Apple-style dashboard.",
            ariaLabel:
              "Side by side: a crowded review spreadsheet with a chat window next to an EvalLens screening report with scores, evidence and a disagreement flag",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Where the DIY stack is right — page-local cards */}
        <section id="diy-right" className="band light" aria-labelledby="cmp-right-h2">
          <div className="wrap cmp-narrow" data-reveal="up">
            <Eyebrow>Credit where due</Eyebrow>
            <h2 id="cmp-right-h2">
              The DIY stack is not a mistake. It is{" "}
              <span className="grad-word">stage-appropriate.</span>
            </h2>
            <p className="sub">
              Most programs we talk to run exactly this: a form for intake, a sheet for
              scores, a chat tab for a second opinion. Before anyone tells you to replace
              it, here is what it gets genuinely right.
            </p>
          </div>
          <div className="wrap">
            <div className="cmp-cards">
              {DIY_RIGHT.map((c) => (
                <div key={c.title} className="cmp-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3a The numbers behind the breaking point (StatBand bakes a soft surface) */}
        <StatBand
          id="break-math"
          eyebrow="The breaking point, in numbers"
          title="Every number here comes from someone who hit the wall"
          accent="hit the wall"
          stats={BREAK_MATH}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §3b The three break points — page-local */}
        <section id="break-points" className="band ink" aria-labelledby="cmp-break-h2">
          <div className="wrap cmp-narrow" data-reveal="up">
            <Eyebrow>Where it breaks</Eyebrow>
            <h2 id="cmp-break-h2">
              Three seams, and they all tear the{" "}
              <span className="grad-word">same season.</span>
            </h2>
            <p className="sub">
              The stack does not fail loudly. It fails as a copy-paste error here, a
              re-sorted sheet there, and a score nobody can reconstruct at the exact
              moment somebody asks for it.
            </p>
          </div>
          <div className="wrap">
            <div className="cmp-breaks">
              {BREAK_POINTS.map((b) => (
                <div key={b.num} className="cmp-break" data-reveal="up">
                  <div className="bn">{b.num}</div>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §4 Side by side, by operation — page-local table, no pricing column */}
        <section id="side-by-side" className="band light" aria-labelledby="cmp-table-h2">
          <div className="wrap cmp-narrow" data-reveal="up">
            <Eyebrow>Side by side</Eyebrow>
            <h2 id="cmp-table-h2">
              Same operations, different{" "}
              <span className="grad-word">machinery.</span>
            </h2>
            <p className="sub">
              Not a feature checklist. These are the six operations every screening
              season actually consists of, and what carries each one in either setup.
            </p>
          </div>
          <div className="wrap">
            <div className="cmp-tablewrap" data-reveal="up">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th scope="col">Operation</th>
                    <th scope="col">Forms + Sheets + ChatGPT</th>
                    <th scope="col" className="el">EvalLens</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r) => (
                    <tr key={r.op}>
                      <td className="op">{r.op}</td>
                      <td>{r.diy}</td>
                      <td className="el">{r.el}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="cmp-note" data-reveal="up">
              <strong>What does not change:</strong> people make every decision. The
              panel&rsquo;s output is a screening memo per application, a first gate
              that gets each one a full and consistent read. The shortlist is built
              from human calls, with the advisory AI score logged next to them.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §5 When to stay on the spreadsheet — honest disqualification */}
        <section id="stay" className="band soft" aria-labelledby="cmp-stay-h2">
          <div className="wrap cmp-narrow" data-reveal="up">
            <Eyebrow>The honest part</Eyebrow>
            <h2 id="cmp-stay-h2">
              When the spreadsheet is still the{" "}
              <span className="grad-word">right answer.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="cmp-stay" data-reveal="up">
              <h3>Keep the sheet if all of this is true.</h3>
              <div className="rows">
                {STAY_ROWS.map((r) => (
                  <div key={r.b} className="row">
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="cmp-note" data-reveal="up">
              <strong>If that is your program, close this tab with our blessing.</strong>{" "}
              Bookmark it for the season the batch doubles, because per the operators
              quoted above, that is roughly when the sheet stops being a system.
            </p>
          </div>
        </section>

        {/* Faq (DS) bakes an ink surface, so bridge into dark. */}
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §6 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Compare", "/compare"],
            ["Spreadsheets", "/compare/spreadsheet"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What teams on the DIY stack ask us"
          titleAccent="ask us"
          items={FAQ}
        />

        {/* §7 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Test it against the sheet you already"
          titleAccent="trust."
          sub="Send a batch you already reviewed and compare the panel's read against the decisions you know. The first run is free through August 31, for batches up to 10 decks. AI prepares the analysis, your team makes the call."
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
