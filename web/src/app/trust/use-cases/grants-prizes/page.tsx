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
 * /trust/use-cases/grants-prizes
 * Ported from eval-lens-crm/wiki/sales/icp-pages/_body-grants.html.
 * Port decisions (2026-08-15): no price anchors, no sample links.
 * Scoped `.seg-*` styles; shared DS untouched.
 * JTBD: before funding decisions — score to fixed criteria with an
 * explainable trail that survives the audit and the appeal.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Grant Programs — Scores That Survive the Audit",
  description:
    "Every proposal read in full and scored anchor by anchor, with quotes and page references. Your reviewers remain the reviewers of record.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "AI policy", href: "#ai-policy" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — the review cycle, honestly */
const REVIEW_STATS = [
  {
    value: "ICC 0.26",
    label: "measured agreement between independent reviewers across 23,414 ratings at a national science fund. Your consistency problem is documented, not hypothetical",
    src: "PLOS One",
  },
  {
    value: "2×",
    label: "application volume growth at a major national funder since 2017 — while award rates fell from 36% to 19%",
    src: "UKRI, via LSE Impact Blog",
  },
  {
    value: "18+ mo",
    label: "end-to-end decision cycles at major schemes. Applicants call. Boards notice",
    src: "funder publications",
  },
  {
    value: "Midnight",
    label: "your confidentiality policy is only as strong as your most tired reviewer at midnight — with a free chatbot one tab away",
    src: "the reason NIH wrote the rule",
  },
];

/* NIH policy rows */
const POLICY_ROWS = [
  { b: "Never trained on", span: "Applicant documents are processed only for your evaluation — never used to train models. Contractual." },
  { b: "Disclosed to applicants", span: "We provide template disclosure language for your call documents, so applicants know exactly how AI assists the review." },
  { b: "Where merit review is closed, we stop at administration", span: "Some funders now bar AI from assessing merit at all, not just from touching confidential files. In those programs we run intake, completeness, eligibility and the audit record, and your reviewers do the scientific judgment unaided." },
  { b: "Governed, not improvised", span: "A governed alternative for the first read beats not knowing what your reviewer pool does at midnight." },
];

/* Appeal-file chain */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "7.8", big: true, note: "on “implementation readiness” · anchor band 7–8" },
  { label: "Finding", value: "Three funded pilot sites; two report continuation funding." },
  { label: "Quote", value: "“…three pilot deployments; two districts renewed…” · page 14" },
  { label: "Evidence strength", value: "Strong — quotes verified against the source document. No quote, no finding." },
  { label: "Panel action", value: "Confirmed by panel · open question logged for the applicant interview." },
];

/* How it works — seven steps */
const STEPS = [
  {
    num: "01",
    title: "Your rubric, locked before the call opens",
    body: "Criteria, anchor descriptions, weights and eligibility rules configured in one working session — then applied identically to every application that will ever arrive. Procedural fairness, by construction. You get: a documented methodology you can publish.",
  },
  {
    num: "02",
    title: "Applications flow from your existing intake",
    body: "Submittable, SurveyMonkey Apply, Fluxx, SmartSimple, OpenWater or your own forms — we ingest the batch. Applicants change nothing. You get: no migration, no applicant-facing change.",
  },
  {
    num: "03",
    title: "The administrative screen runs itself",
    body: "Completeness and eligibility checked against your rules, gaps flagged as info / warning / critical. Staff handles exceptions, not the pile. You get: staff weeks back before review even starts.",
  },
  {
    num: "04",
    title: "Independent AI reviewers — named honestly",
    body: "Not people: independent AI reviewer roles, each reading the full proposal through its own lens, composed per program — including domain-matched technical reads. Each scores blind to the others, evidence before score, and every model's read is logged — so “why is this reviewer qualified” has an answer too. Your human panel's COI and recusal workflow stays exactly where it is. You get: 3–5 reviews' worth of reading on every application.",
  },
  {
    num: "05",
    title: "Panels read briefs, not piles",
    body: "Every proposal arrives pre-read: comparable scores, laid-out evidence, ranked open questions. Your judges read 15 briefs, not 900 PDFs — expertise goes to judgment on the borderline. You get: panel meetings that start at the finish line.",
  },
  {
    num: "06",
    title: "The committee decides. The memo comes from the record.",
    body: "Finalists and awards are built from your panel's scores; AI reads stay advisory. The selection memo is generated from the live review record — not reconstructed for the board. You get: a board-ready memo with page references.",
  },
  {
    num: "07",
    title: "Feedback for every applicant — approved before it leaves",
    body: "Rubric-grounded feedback is drafted from the evidence and reviewed by your staff before anything is sent. Every applicant gets a real answer — and the decision record stands behind every word of it. You get: goodwill at zero marginal staff time.",
  },
];

/* Day 0 vs award day */
const DAY_CARDS = [
  {
    tag: "Day 0 — you bring",
    title: "Your governance, as it stands",
    body: "Your rubric with anchors and weights · your COI and confidentiality policy · your existing intake system and this round's batch. No rubric written down? The setup session turns how your panel already decides into one — yours to keep either way.",
  },
  {
    tag: "Award day — you hold",
    title: "A defensible round, documented",
    body: "Every application read in full with coverage logged · evidence-linked reviews with quotes and page references · a comparable ranked pool with disagreements surfaced · awards decided by your panel, logged · approved feedback for every applicant · an exportable review record that outlives staff turnover.",
  },
];

/* Data & confidentiality */
const DATA_CARDS = [
  { icon: "🚫", title: "Never used for training", body: "Applicant documents are processed solely for your evaluation, under a GDPR-aligned DPA. Never used to train models — in writing." },
  { icon: "📄", title: "The security pack, up front", body: "Architecture and data-flow diagram, sub-processor and model-provider list, DPA template, retention terms, EU processing and data-residency options, and our EU AI Act position. Bring your questionnaire to the first call — review completes before any document moves." },
  { icon: "🏛️", title: "Deployment on your terms", body: "Closed managed perimeter today; dedicated processing, your approved models, your environment and your retention policy on the Enterprise track." },
];

const FAQ = [
  {
    q: "Does the AI pick the winners?",
    a: "No — by design. AI reads are advisory input; finalists and awards are built exclusively from your panel's scores, with every confirmation and override logged. There is no mode where the machine decides.",
  },
  {
    q: "Our donors contractually require human review.",
    a: "And they keep it. Your reviewers and panel remain the reviewers of record — they confirm, override and decide, with their COI and recusal workflow untouched. What changes is what they review: a complete, consistent pre-read with documented evidence instead of a raw pile.",
  },
  {
    q: "How does this square with NIH-style AI prohibitions?",
    a: "Those rules bar reviewers from uploading confidential applications to consumer tools — a rule we agree with. An organizer-governed closed perimeter with logged processing, no training on applicant data, and template applicant disclosure is a different legal object. We'll walk your counsel through it and leave the memo.",
  },
  {
    q: "Applications here are 40-page proposals with budget annexes — often not in English.",
    a: "The panel reads the proposal and its document annexes in full, with page references, in the language of submission — and scores against the same anchors, so proposals land on one scale whatever language they arrived in. Budget spreadsheets and structured data are configured during setup so they're read the way your reviewers read them. Nothing is skipped for format: where material is missing or unreadable, the gap is flagged, not guessed.",
  },
  {
    q: "What do applicants get told?",
    a: "Whatever your policy requires — and we make it easy: template disclosure language for the call documents, plus a plain-language description of how AI assists (and never replaces) the human panel.",
  },
  {
    q: "What about bias?",
    a: "The panel applies the same anchored rules to every application — no fatigue curve, no order effects, no Friday-afternoon reviewer. Every score's evidence is logged, disagreement is surfaced, and on request we produce score-distribution breakdowns by geography, organization size and budget band — the chart your DEI committee will ask for.",
  },
  {
    q: "Who has actually run this?",
    a: "We're onboarding a founding cohort of programs — which is why the engagement starts with a measured parallel pilot on your own round rather than someone else's logo. You see agreement, misses and record quality on your data before you commit.",
  },
];

const SEG_STYLES = `
.seg main .seg-narrow{max-width:720px}
.seg-chain{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.seg-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.seg-chip .cl{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff);margin-bottom:8px}
.seg-chip .cv{font-size:14.5px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
.seg-chip .big{font-size:30px;font-weight:700;line-height:1;margin-bottom:6px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.seg-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.seg-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff)}
.seg-card .ic{font-size:22px;line-height:1}
.seg-card .tag{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--violet,#6c4cf1)}
.seg-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.seg-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.seg-kit{border-radius:24px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2)) border-box;box-shadow:var(--shadow-soft,0 24px 60px -34px rgba(40,30,90,.5));padding:clamp(26px,4vw,44px);margin-top:clamp(28px,4vw,44px)}
.seg-kit h3{font-size:clamp(20px,2.6vw,26px);font-weight:680}
.seg-kit .lead{color:var(--muted,#5b5670);margin-top:12px;font-size:15.5px;max-width:68ch}
.seg-kit .rows{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:24px}
.seg-kit .row b{display:block;font-size:15px;margin-bottom:6px}
.seg-kit .row span{font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.seg-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.seg-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function GrantsPrizesPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{SEG_STYLES}</style>
      <main className="seg section-lab ds">
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
          id="hero-grants"
          surface="ink"
          eyebrow="For grant programs & prize competitions"
          titleLead="Every application scored to your rubric. Every score survives the "
          titleAccent="audit"
          titleTrail="."
          sub="EvalLens is a structured first-read layer for your existing review process: it reads every proposal in full, scores it against your rubric anchor by anchor — a quote and a page reference behind every score — and hands your panel a pre-read brief. Never a decision."
          ctas={[
            { label: "Scope the pilot", href: "https://calendly.com/evallens/30min" },
            { label: "See a sample report", href: "/trust/use-cases#sample-output", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · review record · 16:9",
            hint: "Review-record UI: a proposal's per-criterion scores with anchor bands, quote citations with page numbers, and a panel-decision log — light Apple-style dashboard",
            ariaLabel:
              "Review record: per-criterion scores with anchor bands, quote citations with page numbers, and a panel-decision log",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §2 The review cycle, honestly */}
        <StatBand
          id="review-cycle"
          eyebrow="The review cycle, honestly"
          title="Your reviewer pool is heroic. The math isn't"
          accent="math"
          stats={REVIEW_STATS}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="light" aria-hidden="true" />

        {/* §3 The elephant, named — NIH policy (page-local, the page's key block) */}
        <section id="ai-policy" className="band light" aria-labelledby="seg-policy-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The elephant, named</Eyebrow>
            <h2 id="seg-policy-h2">
              &ldquo;Doesn&rsquo;t NIH prohibit{" "}
              <span className="grad-word">this?</span>&rdquo;
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>
                Two different rules, and we answer both plainly.
              </h3>
              <p className="lead">
                NIH{" "}
                <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html">
                  NOT-OD-23-149
                </a>{" "}
                bars reviewers from uploading confidential proposals to consumer AI
                tools. So do we: that rule exists because individual reviewers paste
                applications into public chatbots, unlogged and retained by whoever runs
                the tool. An organizer-governed perimeter is a different object, and we
                will walk your counsel through the distinction.
              </p>
              <p className="lead">
                The{" "}
                <a href="https://erc.europa.eu/news-events/news/erc-clarifies-limits-ai-use-grant-evaluation">
                  ERC guidance of March 2026
                </a>{" "}
                goes further: reviewers may not delegate the assessment of scientific
                merit to AI at all. That is a boundary no perimeter fixes, so we do not
                argue with it. In programs under rules like these, EvalLens runs the
                administrative half of the round, intake, completeness, eligibility,
                comparability checks and the record, while merit stays entirely with
                your reviewers. Prize programs, foundation calls and competitions that
                set their own rules can use the scored first read as well. If you are
                not sure which side your call sits on, that is the first question we
                ask, before any document moves.
              </p>
              <div className="rows">
                {POLICY_ROWS.map((r) => (
                  <div key={r.b} className="row">
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §4 The appeal file — chain (page-local) */}
        <section id="appeal-file" className="band ink" aria-labelledby="seg-appeal-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The appeal file</Eyebrow>
            <h2 id="seg-appeal-h2">
              Three years later, someone asks &ldquo;why{" "}
              <span className="grad-word">4.2?</span>&rdquo;
            </h2>
            <p className="sub">
              Today the answer lives in scanned scoresheets and a departed
              reviewer&rsquo;s inbox. With EvalLens, staff opens the record for that
              application in one click: the AI read and the panel score both preserved
              side by side, each finding tied to the quote and page it came from, and
              the human sign-off attached. Field-level change history and rubric
              versioning are on the roadmap, and we will tell you plainly where that
              line sits before you buy.
            </p>
          </div>
          <div className="wrap">
            <div className="seg-chain">
              {EVIDENCE_CHAIN.map((c) => (
                <div key={c.label} className="seg-chip" data-reveal="up">
                  <div className="cl">{c.label}</div>
                  {c.big ? <div className="big">{c.value}</div> : null}
                  <div className="cv">{c.big ? c.note : c.value}</div>
                </div>
              ))}
            </div>
            <p className="sub seg-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              When an appeal lands, you open the record. You don&rsquo;t reconstruct it.
              Independent reads — reviewers never see each other&rsquo;s scores;
              disagreement surfaces to the panel, never averaged away; bias made
              inspectable with score distributions by geography &amp; org size, on
              request.
            </p>
          </div>
        </section>

        {/* §5 How it works (ink → ink, no bridge) */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Your process, pre-read. Seven steps"
          titleAccent="pre-read"
          sub="Your reviewers remain the reviewers of record. EvalLens prepares the consistent first read underneath."
          items={STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §6 Day 0 vs award day (page-local) */}
        <section className="band soft" aria-labelledby="seg-days-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>What lands on your desk</Eyebrow>
            <h2 id="seg-days-h2">
              Day 0 vs <span className="grad-word">award day.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-cards">
              {DAY_CARDS.map((c) => (
                <div key={c.tag} className="seg-card" data-reveal="up">
                  <span className="tag">{c.tag}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="light" aria-hidden="true" />

        {/* §7 Data & confidentiality (page-local) */}
        <section className="band light" aria-labelledby="seg-data-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Data &amp; confidentiality</Eyebrow>
            <h2 id="seg-data-h2">
              The block your counsel reads{" "}
              <span className="grad-word">first.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-cards">
              {DATA_CARDS.map((c) => (
                <div key={c.title} className="seg-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className="seg-note" data-reveal="up">
              <strong>One round, in parallel. Then decide.</strong> Your reviewers work
              one round as usual; EvalLens reads the same applications. You compare
              reading coverage, panel-hours, shortlist overlap against a documented human
              baseline, and the completeness of the decision record. Fixed-fee parallel
              pilot, 4–6 weeks, security review first; then a program licence sized on
              the pilot&rsquo;s own numbers. <a href="/pricing">See pricing</a> or{" "}
              <a href="https://calendly.com/evallens/30min">book a call</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §8 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Grants and prizes", "/trust/use-cases/grants-prizes"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="Asked by every program officer"
          titleAccent="program officer"
          items={FAQ}
        />

        {/* §9 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Pick one round. Measure us against your"
          titleAccent="panel."
          sub="30 minutes with you: we map the rubric, agree the pilot metrics, and schedule your security review first. Bring the questionnaire. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Scope the pilot", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
