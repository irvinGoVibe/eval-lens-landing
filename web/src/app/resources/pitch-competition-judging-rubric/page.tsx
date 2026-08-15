import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { StatementHero, Numbered, Faq, CtaBand, Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /resources/pitch-competition-judging-rubric
 *
 * First page of the /resources section, and the pattern for it: a content
 * page, lighter than the segment pages. Text first, no hero media, six
 * sections. The full working rubric is published so an organizer can take
 * it and run an event without us. Generosity is the strategy.
 *
 * Facts and numbers come only from:
 *   - EvalLens product repo: wiki/product/judges.md (P1-P6 weights),
 *     wiki/product/dimension-rubrics.md (anchor bands, red flags),
 *     wiki/product/glossary.md (Spread thresholds).
 *   - notes/blog/_research/demo-day-scale-2026-05-23.md (ICC studies,
 *     each attributed in copy).
 *
 * Copy invariants: brand is EvalLens, no invented clients or adoption
 * numbers, AI never decides, no em dashes in the English copy.
 * Page-local styles are scoped under a `.res-` prefix; shared DS untouched.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Pitch Competition Judging Rubric Template | EvalLens",
  description:
    "A full pitch competition judging rubric: six weighted dimensions, anchors for what a 3 versus a 7 means, and a disagreement threshold. Free to copy and use.",
  alternates: { canonical: "/resources/pitch-competition-judging-rubric" },
};

const HEADER_NAV: SectionNav = {
  section: "Resources",
  sectionHref: "/resources",
  links: [
    { label: "The rubric", href: "#rubric" },
    { label: "Anchoring", href: "#anchoring" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* §2 — why the rubric decides more than the judges (sourced evidence) */
const EVIDENCE = [
  {
    value: "0.21 to 0.45",
    label:
      "agreement (ICC) of expert Olympic judges scoring breaking at Paris 2024, where criteria like Technique and Musicality are left loosely defined",
    src: "Sato, Frontiers in Psychology, 2024",
  },
  {
    value: "0.94 to 0.98",
    label:
      "agreement (ICC) reported for artistic gymnastics, where the rubric enumerates observable elements. Same caliber of judge, different rubric",
    src: "prior research cited in the same study",
  },
  {
    value: "1.3 to 4",
    label:
      "the part of a 1 to 5 scale reviewers actually used in an AIBS grant review case study. Without anchors, a 10 point scale collapses into a 3 point one",
    src: "Gallo et al., Research Integrity and Peer Review, 2023",
  },
];

/* §3 — the rubric itself: P1-P6, default weights, 3 vs 7 anchors, red flags.
 * Source: wiki/product/judges.md + dimension-rubrics.md (product repo). */
const DIMENSIONS = [
  {
    code: "P1",
    name: "Problem significance",
    weight: "0.15",
    three:
      "No real problem articulated, or the pain is vague and unsubstantiated.",
    seven:
      "A specific, frequent, costly pain with a clearly identified user and a credible reason it matters now.",
    flag: "“Huge market therefore big problem” hand-waving; a solution in search of a problem.",
  },
  {
    code: "P2",
    name: "Solution differentiation",
    weight: "0.15",
    three:
      "Solution is unclear, disconnected from the problem, or a thin wrapper over an existing tool with no real advantage.",
    seven:
      "A coherent solution with a clear mechanism and a genuine, defensible difference from alternatives.",
    flag: "Feature soup with no clear core; differentiation that is purely branding.",
  },
  {
    code: "P3",
    name: "Market attractiveness",
    weight: "0.20",
    three:
      "No real market reasoning, no segment defined, or an obviously implausible market claim.",
    seven:
      "A well sized, reachable market with a clear segment, a credible entry motion, and a believable path to first customers.",
    flag: "Top-down “huge TAM therefore success” with no entry segment.",
  },
  {
    code: "P4",
    name: "Business model / GTM",
    weight: "0.15",
    three: "No monetization logic, or pricing that ignores the buyer.",
    seven:
      "Clear monetization, sensible pricing for the buyer, and a credible go-to-market motion with a beachhead.",
    flag: "“We will figure out pricing later” as the entire monetization story.",
  },
  {
    code: "P5",
    name: "Team / founder fit",
    weight: "0.20",
    three:
      "No meaningful information about the team, or an obvious mismatch between the team and what the venture requires.",
    seven:
      "A capable, reasonably complete team with clear relevant experience and good fit to the problem.",
    flag: "Credentials substituting for evidence of execution; critical roles missing with no plan.",
  },
  {
    code: "P6",
    name: "Feasibility / readiness",
    weight: "0.15",
    three: "The plan is implausible, internally inconsistent, or absent.",
    seven:
      "A credible, well sequenced plan with resources that broadly match the ambition and risks acknowledged.",
    flag: "A roadmap that assumes no setbacks; ignored dependencies that gate the plan.",
  },
];

/* §4 — how to anchor scores (product scoring procedure + Spread rule) */
const ANCHOR_STEPS = [
  {
    num: "01",
    title: "Evidence before numbers",
    body: "Every claim a judge relies on gets a slide reference. No slide, no claim. This one habit converts “I liked it” into a record another judge can check, and it is the difference between a score and an opinion.",
  },
  {
    num: "02",
    title: "Collect both directions, then the gaps",
    body: "Before scoring, write down what supports a higher band, what pulls toward a lower band, and what the deck simply does not establish. Missing evidence is recorded as missing, never invented and never silently forgiven.",
  },
  {
    num: "03",
    title: "Name the band before the number",
    body: "The judge states which band the evidence lands in, in the form “this falls in the 7 to 8 band because…”, and only then picks a score inside that band. The decision is the band. The number just lives in it.",
  },
  {
    num: "04",
    title: "On the boundary, take the lower band",
    body: "When the score sits between two bands and material evidence is missing, the rule is the lower band. Conservative by design: incomplete decks stay comparable instead of drifting up on benefit of the doubt.",
  },
  {
    num: "05",
    title: "Check the spread, do not average it away",
    body: "Per dimension, Spread is the highest score minus the lowest across the reads that cover it. Below 1.5 is consensus, 1.5 to 2.99 is a split, and 3.0 or more is a conflict that goes to manual review. Averaging a conflict hides exactly the case a jury exists to discuss. The full aggregation math is published on our methodology page.",
  },
];

/* §5 — variants of the same core */
const VARIANTS = [
  {
    icon: "🖨️",
    title: "Printable scorecard",
    body: "One page per submission: six rows for P1 to P6, the weight next to each, one score field and one evidence line per row, and a spread check at the bottom of the stack. If a judge cannot cite where a score came from, the blank line makes that visible in the room, not after the results email.",
  },
  {
    icon: "🎓",
    title: "Demo day",
    body: "Keep the same six dimensions. A cohort that just finished a program has had equal coaching on story, so many organizers shift weight toward Team / founder fit (P5) and Feasibility (P6) and away from pitch polish. Decide the weights before scoring starts and lock them, so the field is ranked on one standard end to end.",
  },
  {
    icon: "🛠️",
    title: "Hackathon (H1 to H6)",
    body: "Hackathons are execution-first, so the rubric changes shape: Execution and Demo carries 0.30 and Technical Depth 0.20, both protected, with Problem Impact and Innovation Divergence at 0.15 and UX Clarity and Delivery Readiness at 0.10. The full version lives on our hackathons page.",
    href: "/trust/use-cases/hackathons",
    linkLabel: "See the hackathon rubric",
  },
];

/* §6 — FAQ */
const FAQ = [
  {
    q: "Can I use this rubric without EvalLens?",
    a: "Yes, and that is the point of publishing it. The dimensions, weights, anchors and the Spread rule work on paper, in a spreadsheet, or in any scoring tool. EvalLens becomes useful when the field is bigger than your judges' hours: an AI panel runs the first read on this same rubric and your judges decide with the evidence in front of them.",
  },
  {
    q: "Why these weights, and can I change them?",
    a: "The weights are the defaults of the EvalLens pitch panel: Market attractiveness and Team carry 0.20 each, the other four dimensions 0.15 each, reflecting what early stage juries most often argue about. They are meant to be edited before scoring starts. The one rule worth keeping is the lock: once scoring begins, weights freeze, so every submission is ranked on the same standard.",
  },
  {
    q: "What does the Spread threshold actually do?",
    a: "Spread per dimension is the highest score minus the lowest across the judges who cover it. Below 1.5 reads as consensus, 1.5 to 2.99 as a split, and 3.0 or more as a conflict. A conflict does not change anyone's score. It routes that dimension to a human conversation instead of letting an average bury the disagreement.",
  },
  {
    q: "How is this different from the university scorecard PDFs?",
    a: "Most published scorecards list criteria names and a 1 to 10 column, which is exactly the setup that produced 0.21 to 0.45 agreement among Olympic breaking judges. This rubric adds the three things that move that number: an anchor description for each band, an evidence line per score, and a disagreement threshold with a defined action.",
  },
  {
    q: "Does an AI panel score with this rubric too?",
    a: "In EvalLens, yes. The same anchors and red flags drive a panel of AI reviewers that reads every submission before your judges do, and the same Spread rule flags where those reads conflict. It has carried 1,000+ evaluation runs. The output is advisory: AI prepares the analysis, the judges decide.",
  },
];

const RES_STYLES = `
.res main .res-narrow{max-width:720px}
.res-chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.res-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.res-chip .cv{font-size:26px;font-weight:700;line-height:1.1;margin-bottom:8px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.res-chip .cl{font-size:14px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
.res-chip .cs{margin-top:8px;font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--lavender,#a99bff)}
.res-tablewrap{overflow-x:auto;margin-top:clamp(28px,4vw,44px);border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;background:var(--surface,#fff)}
.res-table{width:100%;min-width:820px;border-collapse:collapse;font-size:14.5px;line-height:1.5}
.res-table th{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;text-align:left;color:var(--muted,#5b5670);padding:14px 18px;border-bottom:1px solid var(--border,rgba(20,16,45,.12))}
.res-table td{padding:16px 18px;border-bottom:1px solid var(--border,rgba(20,16,45,.08));vertical-align:top;color:var(--muted,#5b5670)}
.res-table tr:last-child td{border-bottom:none}
.res-table .dim b{display:block;color:var(--fg,#14102d);font-weight:650}
.res-table .dim .code{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:11px;color:var(--lavender,#7c68f5)}
.res-table .dim .rf{display:block;margin-top:8px;font-size:12.5px;color:var(--muted,#5b5670);opacity:.85}
.res-table .dim .rf b{display:inline;font-size:12.5px;font-weight:640}
.res-table .w{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-weight:650;color:var(--fg,#14102d);white-space:nowrap}
.res-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.res-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff);display:flex;flex-direction:column}
.res-card .ic{font-size:22px;line-height:1}
.res-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.res-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.res-card .lnk{margin-top:auto;padding-top:12px;font-size:14px;font-weight:600}
.res-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.res-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function PitchCompetitionJudgingRubricPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{RES_STYLES}</style>
      <main className="res section-lab ds">
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Resources", "/resources"],
            [
              "Pitch competition judging rubric",
              "/resources/pitch-competition-judging-rubric",
            ],
          ])}
        />

        {/* §1 Hero — id must not be "hero" (globals body:has(#hero) canvas rule) */}
        <StatementHero
          id="hero-rubric"
          surface="ink"
          eyebrow="Resources · Free to copy and use"
          titleLead="The rubric decides more than the "
          titleAccent="judges"
          titleTrail=" do."
          sub="This is the complete pitch competition judging rubric that ships as the default in EvalLens: six weighted dimensions, an anchor description for every band, and a disagreement threshold with a defined action. Take it and run your event with it, no signup and no tool required. The research below explains why the rubric, not the composition of your jury, is the variable that moves score agreement."
          ctas={[
            { label: "Jump to the rubric", href: "#rubric" },
            {
              label: "See it in the product",
              href: "/trust/use-cases/pitch-competitions",
              variant: "glass",
            },
          ]}
        />

        {/* §2 Why the rubric is the variable — evidence chips (still ink) */}
        <section id="why-rubric" className="band ink" aria-labelledby="res-why-h2">
          <div className="wrap res-narrow" data-reveal="up">
            <Eyebrow>Same judges, different rubric</Eyebrow>
            <h2 id="res-why-h2">
              Breaking and gymnastics have the same caliber of judge. Only one has{" "}
              <span className="grad-word">reliable scores.</span>
            </h2>
            <p className="sub">
              A study of Olympic breaking at the Paris 2024 games found judge
              agreement between 0.21 and 0.45 on loosely defined criteria, while
              artistic gymnastics, which enumerates every observable element,
              reaches 0.94 to 0.98. The judges are world class in both sports.
              The rubric is the difference. A pitch jury scoring
              &ldquo;Team&rdquo; and &ldquo;Market&rdquo; on a bare 1 to 10
              column sits on the breaking side of that gap.
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

        {/* §3 The rubric — full table, page-local */}
        <section id="rubric" className="band light" aria-labelledby="res-rubric-h2">
          <div className="wrap res-narrow" data-reveal="up">
            <Eyebrow>The rubric</Eyebrow>
            <h2 id="res-rubric-h2">
              Six dimensions, weighted, with anchors for{" "}
              <span className="grad-word">3 versus 7.</span>
            </h2>
            <p className="sub">
              These are the default dimensions and weights of the EvalLens pitch
              panel. The anchor columns describe the two bands juries argue about
              most: what a middling 3 looks like against a strong 7. Weights are
              yours to edit before scoring starts. Once scoring begins they lock,
              so every submission is ranked on the same standard.
            </p>
          </div>
          <div className="wrap">
            <div className="res-tablewrap" data-reveal="up">
              <table className="res-table">
                <thead>
                  <tr>
                    <th scope="col">Dimension</th>
                    <th scope="col">Weight</th>
                    <th scope="col">A 3 looks like</th>
                    <th scope="col">A 7 looks like</th>
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((d) => (
                    <tr key={d.code}>
                      <td className="dim">
                        <span className="code">{d.code}</span>
                        <b>{d.name}</b>
                        <span className="rf">
                          <b>Red flag:</b> {d.flag}
                        </span>
                      </td>
                      <td className="w">{d.weight}</td>
                      <td>{d.three}</td>
                      <td>{d.seven}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="res-note" data-reveal="up">
              <strong>The full version has four bands per dimension.</strong> In
              the product, each dimension carries anchors for 0 to 3, 4 to 6, 7
              to 8 and 9 to 10, plus the red flags above, and the top band is
              reserved for what is demonstrated, not merely asserted. The two
              columns here are the working core: if your judges can tell a 3
              from a 7 the same way, most of the disagreement problem is already
              gone.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §4 How to anchor scores — Numbered (DS) bakes an ink surface */}
        <Numbered
          id="anchoring"
          version={1}
          eyebrow="How to anchor scores"
          title="Five rules that turn a scale into a"
          titleAccent="measurement"
          sub="The rubric table is half the tool. The other half is the procedure judges follow to land on a number. These five rules are the scoring procedure EvalLens hard-codes for its own AI panel, and they work just as well for a human one."
          items={ANCHOR_STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §5 Variants — page-local cards */}
        <section id="variants" className="band soft" aria-labelledby="res-var-h2">
          <div className="wrap res-narrow" data-reveal="up">
            <Eyebrow>Variants</Eyebrow>
            <h2 id="res-var-h2">
              One core, three <span className="grad-word">formats.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="res-cards">
              {VARIANTS.map((v) => (
                <div key={v.title} className="res-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">
                    {v.icon}
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                  {v.href ? (
                    <div className="lnk">
                      <a href={v.href}>{v.linkLabel}</a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="res-note" data-reveal="up">
              <strong>Running a pitch competition end to end?</strong> The{" "}
              <a href="/trust/use-cases/pitch-competitions">
                pitch competitions page
              </a>{" "}
              shows how this rubric drives a full first read of the field, and{" "}
              <a href="/trust/methodology">the methodology page</a> publishes the
              aggregation and Spread math behind it.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §6 FAQ */}
        <Faq
          id="faq"
          eyebrow="FAQ"
          title="Before you copy it into your"
          titleAccent="scoring sheet"
          items={FAQ}
        />

        {/* Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Want the rubric to run"
          titleAccent="itself?"
          sub="Use the rubric freely. When the field outgrows your judges' hours, EvalLens runs the first read on it: an AI panel scores every submission against these anchors, flags every Spread conflict, and hands your jury the evidence. AI prepares the analysis, the judges decide."
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
