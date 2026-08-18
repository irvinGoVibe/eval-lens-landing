import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatBand,
  Numbered,
  Faq,
  CtaBand,
  Eyebrow,
  Cinema,
} from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { HeroAccent, UseCaseDetailHero } from "../UseCaseDetailHero";
import { UseCaseRelated } from "../UseCaseRelated";

/* ────────────────────────────────────────────────────────────────────────
 * /trust/use-cases/tenders
 * NEW page (2026-08-15) — no ICP-page source; written fresh from segment
 * research (GAO bid-protest statistics FY2024/25, UK Procurement Act 2023
 * scoring-transparency requirements, RFP evaluation-fatigue literature).
 * Structurally closest to grants-prizes: fixed criteria, audit trail,
 * defensible award. Scoped `.seg-*` styles; shared DS untouched.
 * JTBD: before the award decision — every bid read against the published
 * criteria, with a record that survives the debrief and the challenge.
 * Honesty rule: no compliance claims with any procurement law — your
 * evaluators remain the evaluators of record; counsel owns compliance.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Tenders & RFPs — Challenge-Proof Awards",
  description:
    "Every bid read in full against your published criteria, with an award record you export instead of reconstruct. Your evaluation committee decides.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "The record", href: "#record" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — the award, honestly */
const AWARD_STATS = [
  {
    value: "1,740",
    label: "bid protests filed with the US GAO in FY 2024 alone. Losing bidders challenge awards — that's the system working as designed",
    src: "GAO Annual Report FY2024",
  },
  {
    value: "52%",
    label: "of protests end in some form of relief — corrective action or sustain. Half the time, the file didn't hold",
    src: "GAO effectiveness rate",
  },
  {
    value: "4–8 h",
    label: "of committee time one 50-page proposal consumes across a five-person panel — before the consensus meeting starts",
    src: "RFP evaluation guides",
  },
  {
    value: "10–12 wks",
    label: "a typical RFP evaluation cycle runs, with evaluator fatigue documented as scoring quality's main enemy in the later pile",
    src: "procurement timelines research",
  },
];

/* Challenge-proof chain */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "7.4", big: true, note: "on “technical approach” — your published criteria, your weights" },
  { label: "Finding", value: "Delivery methodology addresses all four statement-of-work phases; transition plan thin." },
  { label: "Quote", value: "“…phased rollout across 3 sites in 14 weeks…” · page 22" },
  { label: "Routed", value: "Transition-plan gap → clarification question for the bidder, logged." },
  { label: "Committee", value: "Scored by your evaluators; consensus decision and rationale logged, exportable for the debrief." },
];

/* How it works — six steps */
const STEPS = [
  {
    num: "01",
    title: "Your published criteria become the rulebook",
    body: "The evaluation criteria and weightings from your tender documents — configured once, locked before bids open, applied identically to every submission. What you published is what gets scored. You get: scoring that matches the criteria you announced.",
  },
  {
    num: "02",
    title: "Bids land complete",
    body: "From your e-procurement portal or your inbox — batch in, files out. Missing documents and unmet mandatory requirements are flagged against your checklist; your team handles exceptions, not the pile. You get: the compliance screen done before evaluation starts.",
  },
  {
    num: "03",
    title: "Every bid read end to end against the spec",
    body: "Technical proposal, methodology, team, delivery plan — every page, coverage logged. Independent AI reviewer lenses (not people — parallel reads that can't anchor on each other) assess each criterion, evidence before score. Bid #1 and bid #40 get the same read, at the same depth. You get: no evaluator-fatigue curve in the record.",
  },
  {
    num: "04",
    title: "Your committee scores briefs, not binders",
    body: "Each bid arrives pre-read: per-criterion findings, page-referenced quotes, gaps and clarification questions. Your evaluators score as they always have — they remain the evaluators of record; AI reads stay advisory. Disagreements between reviewer lenses surface for the consensus meeting instead of hiding in an average. You get: consensus meetings that start at the finish line.",
  },
  {
    num: "05",
    title: "The award recommendation comes from the record",
    body: "Ranking is built from your committee's scores. The award memo — every score, every rationale, every override — is generated from the live record, not reconstructed the week the challenge letter arrives. You get: an auditable trail from criteria to award.",
  },
  {
    num: "06",
    title: "Debriefs from the same file",
    body: "Every unsuccessful bidder gets a substantive debrief drafted from the record — strengths, weaknesses against the published criteria — reviewed by your team before anything is sent. The letter that answers the question before it becomes a protest. You get: fewer challenges, faster closure.",
  },
];

/* Governance rows */
const GOV_ROWS = [
  { b: "Your evaluators of record", span: "AI reads are advisory input. Scores, consensus and the award decision belong to your named evaluators — logged, with overrides. There is no mode where the machine awards." },
  { b: "Criteria as published", span: "Scoring rules mirror the criteria and weightings in your tender documents. Transparency regimes (e.g. the UK Procurement Act 2023) expect published criteria applied consistently — that's this design's core mechanic." },
  { b: "Confidential by construction", span: "Bids are processed only for your evaluation — never used to train models, contractual. Closed perimeter, no public links, retention on your policy, DPA included." },
  { b: "Your counsel owns compliance", span: "We don't certify compliance with any procurement regime — no tool can. We give your process documented consistency and a standing record; the legal position stays with your team, and we'll walk your counsel through the architecture." },
];

/* Pilot metrics */
const METRIC_CARDS = [
  { icon: "⏱", title: "Evaluator-hours per tender", body: "Committee time from bid opening to consensus — before vs after. The number your budget holder needs." },
  { icon: "📄", title: "Coverage", body: "Share of submitted pages actually read, logged per bid — the claim a debrief can cite." },
  { icon: "⚖️", title: "Scoring consistency", body: "Same criteria, same anchors, applied to the first and the last bid — inspectable, not asserted." },
  { icon: "🧾", title: "Record completeness", body: "Can every score be answered with a quote and a page reference? Counted per bid." },
];

const FAQ = [
  {
    q: "Does the AI decide the award?",
    a: "No — by design. AI reads are advisory; scores, consensus and the award recommendation are built exclusively from your evaluation committee's decisions, with every confirmation and override logged. There is no mode where the machine awards.",
  },
  {
    q: "Can we legally use AI in a regulated procurement?",
    a: "That's your counsel's call, and we make it an easy conversation: your evaluators remain the evaluators of record, AI assistance is disclosed on your terms, processing is logged, and bids are never used for training. We provide the architecture memo and the security pack; the compliance position stays yours. We don't certify against any procurement regime — and we'd distrust any vendor who claims to.",
  },
  {
    q: "Bids are commercially confidential. Where do they go?",
    a: "A closed evaluation perimeter: server-side processing, project-level isolation, no public links, never used to train models — contractual, in the DPA. Sub-processor and model-provider list ships with the security pack before any document moves. Compare that honestly with evaluators handling bids in personal AI accounts you can't govern.",
  },
  {
    q: "Our evaluation includes price. Does EvalLens score it?",
    a: "Price and other formula-based criteria stay mechanical — your existing calculation. EvalLens works the part that consumes committee time and generates challenges: the qualitative criteria — technical approach, methodology, team, delivery plan — where scoring consistency and evidence trails matter most.",
  },
  {
    q: "What happens when the AI misreads a bid?",
    a: "Quotes are verified against the source document before a finding stands — no quote, no finding. Thin evidence moves scores down, never up, and every material gap routes to the evaluator's clarification list rather than into a silent score.",
  },
  {
    q: "Who else runs this?",
    a: "We're onboarding a founding cohort of evaluation teams — which is why the entry point is a parallel pilot on one live or recently closed tender: your committee evaluates as usual, EvalLens reads the same bids, and you compare hours, coverage and where the reads agreed before anything counts.",
  },
];

const SEG_STYLES = `
.seg main .seg-narrow{max-width:720px}
.seg-chain{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.seg-chip{background:rgba(255,255,255,.72);border:1px solid color-mix(in oklab,var(--violet,#6c4cf1) 14%,var(--border,rgba(20,16,45,.12)));border-radius:16px;padding:18px;box-shadow:0 24px 58px -46px rgba(52,37,126,.42)}
.seg-chip .cl{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--violet,#6c4cf1);margin-bottom:8px}
.seg-chip .cv{font-size:14.5px;line-height:1.5;color:var(--muted,#5b5670)}
.seg-chip .big{font-size:30px;font-weight:700;line-height:1;margin-bottom:6px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.seg-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.seg-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff)}
.seg-card .ic{font-size:22px;line-height:1}
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

export default function TendersPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="light" className="page-header--use-cases-wide" />
      <style>{SEG_STYLES}</style>
      <main className="seg section-lab ds use-case-detail">
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
        <UseCaseDetailHero
          id="hero-tenders"
          eyebrow="For tender & RFP evaluation teams"
          title={<>Every bid read against the spec. Every award that survives the <HeroAccent>challenge.</HeroAccent></>}
          sub="EvalLens reads every bid end to end against the criteria you published — technical approach, methodology, team, delivery — and hands your evaluation committee per-criterion findings with quotes and page references. Your evaluators score and award; the record exists from day one."
          primary={{ label: "Scope the parallel pilot", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "See a sample report", href: "/trust/use-cases#sample-output" }}
          mediaAlt="A stack of evidence-linked bid evaluation reports prepared for a tender committee"
        />

        {/* §2 The award, honestly */}
        <StatBand
          id="award"
          eyebrow="The award, honestly"
          title="The file gets tested the day you announce the winner"
          accent="tested"
          stats={AWARD_STATS}
        />

        {/* §3 The challenge letter — chain (page-local key block) */}
        <section id="record" className="band light" aria-labelledby="seg-record-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The challenge letter</Eyebrow>
            <h2 id="seg-record-h2">
              &ldquo;Please provide the evaluation record for our bid&rdquo; — and you
              export, not <span className="grad-word">reconstruct.</span>
            </h2>
            <p className="sub">
              Today that answer lives in five evaluators&rsquo; annotated PDFs and a
              consensus meeting nobody minuted properly. With EvalLens, the record for
              every bid — scores, evidence, clarifications, who signed off — is one
              click, from day one.
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
              Quotes are verified against the bid before a finding stands — no quote, no
              finding. The first and the last bid are evaluated under exactly the same
              rules, at the same depth — the claim a fatigue-curve committee can never
              honestly make.
            </p>
          </div>
        </section>

        {/* §4 How it works — the light narrative continues. */}
        <Numbered
          id="how-it-works"
          surface="soft"
          version={1}
          eyebrow="How it works"
          title="Bid opening → award decision, in six steps"
          titleAccent="six steps"
          sub="EvalLens prepares the consistent first read. Your evaluation committee scores, reaches consensus, and awards."
          items={STEPS}
        />

        {/* §5 Governance (page-local) */}
        <section id="governance" className="band light" aria-labelledby="seg-gov-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Governance</Eyebrow>
            <h2 id="seg-gov-h2">
              Built for processes that get{" "}
              <span className="grad-word">audited.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>Published criteria, applied consistently, with a trail.</h3>
              <p className="lead">
                Modern procurement regimes converge on the same three demands: announce
                the criteria, apply them the same way to every bidder, and be able to
                show your work. That is — literally — the product mechanic: versioned
                criteria, logged reads, quote-verification against source text, and
                human decisions on the record.
              </p>
              <div className="rows">
                {GOV_ROWS.map((r) => (
                  <div key={r.b} className="row">
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* §6 Measured, not asserted — pilot metrics (page-local) */}
        <section className="band soft" aria-labelledby="seg-metrics-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Measured, not asserted</Eyebrow>
            <h2 id="seg-metrics-h2">
              What the parallel pilot measures on your{" "}
              <span className="grad-word">tender.</span>
            </h2>
            <p className="sub">
              One live or recently closed tender, run side by side with your committee —
              success metrics agreed before we start, security review first.
            </p>
          </div>
          <div className="wrap">
            <div className="seg-cards">
              {METRIC_CARDS.map((c) => (
                <div key={c.title} className="seg-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className="seg-note" data-reveal="up">
              <strong>Fixed-fee pilot, procurement-friendly.</strong> PO and invoice
              accepted; MSA and DPA templates ready for your process.{" "}
              <a href="/pricing">See pricing</a> or{" "}
              <a href="https://calendly.com/evallens/30min">book a call</a>.
            </p>
          </div>
        </section>

        <Cinema
          id="questions-cinema"
          surface="ink"
          headline="Want more? Ask the harder questions."
          lines={["Want more?", "Ask the harder questions."]}
          mobileLines={["Want more?", "Ask the harder", "questions."]}
          sub="See how EvalLens reads bids against the published specification, keeps every finding traceable, and prepares an evaluation record that can survive challenge."
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
          }}
          maskId="tender-questions"
        />

        {/* §7 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Tenders", "/trust/use-cases/tenders"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What your procurement lead will ask"
          titleAccent="procurement lead"
          items={FAQ}
        />

        <UseCaseRelated currentHref="/trust/use-cases/tenders" />

        {/* §8 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="One tender, evaluated in"
          titleAccent="parallel."
          sub="30 minutes with whoever owns the evaluation: we map your criteria, agree the metrics, and run one tender side by side with your committee — before anything counts. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Scope the parallel pilot", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
