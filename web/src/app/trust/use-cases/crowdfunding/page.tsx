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
 * /trust/use-cases/crowdfunding
 * Ported from eval-lens-crm/wiki/sales/icp-pages/_body-crowdfunding.html.
 * Port decisions (2026-08-15): slug `crowdfunding` (ECSPR stays in copy,
 * not the URL); no price anchors, no sample links. Scoped `.seg-*` styles;
 * shared DS untouched.
 * JTBD: screen every project owner in days AND keep the file the NCA will
 * ask for — speed without losing the record.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Crowdfunding Platforms — ECSPR-Ready Screening",
  description:
    "Screen every project owner in days and keep the file your NCA will ask for. Analyst verification, committee decisions logged, built to ESMA's dialect.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "The file", href: "#file" },
    { label: "AI governance", href: "#governance" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — the double bind */
const BIND_STATS = [
  {
    value: "25% → 1%",
    label: "the funnel shape serious platforms publish: a quarter of applicants get full analyst review; about one percent lists. The gap is burned analyst weeks",
    src: "platform disclosures",
  },
  {
    value: "2–5 wks",
    label: "typical onboarding to a listing decision — while project owners shop competing platforms mid-process",
    src: "the pilot measures yours",
  },
  {
    value: "Art. 12",
    label: "your authorisation file describes documented screening procedures — and NCAs check you against your own filed procedures, analyst by analyst",
    src: "ECSPR",
  },
  {
    value: "5 yrs",
    label: "of Art. 26 record-keeping. Today, for a project owner rejected two years ago, the record is often one departed analyst's inbox",
    src: "ECSPR",
  },
];

/* Supervisory-request chain */
const EVIDENCE_CHAIN = [
  { label: "Quote", value: "“…€310k in signed LOIs for FY26…” · page 18" },
  { label: "Finding", value: "Revenue projections rest on LOIs, not signed contracts — exactly the claim-inflation a screening file must catch." },
  { label: "Routed", value: "Margin assumptions unverified → item #1 on the analyst's verification checklist." },
  { label: "Committee", value: "Approved with conditions — decision and reasons logged, exportable as the minute annex." },
  { label: "Retained", value: "Full file kept on your Art. 26-aligned retention policy — listed or rejected alike." },
];

/* How it works — seven steps */
const STEPS = [
  {
    num: "01",
    title: "Your screening checklist becomes the standard",
    body: "Team, market, business model, financial-narrative readiness, campaign readiness — your criteria, configured once, versioned, and applied identically to every application from then on. You get: your filed procedures, actually followed.",
  },
  {
    num: "02",
    title: "Applications land complete",
    body: "From your page or your existing flow — batch in, files out. Missing documents are flagged; project owners chase themselves. You get: intake without the hand-holding.",
  },
  {
    num: "03",
    title: "Every application read end to end",
    body: "Deck, plan, financial narrative — every page, coverage logged. Independent AI reviewer lenses (not people — parallel reads that can't anchor on each other) assess against your criteria, evidence before conclusion. You get: application #1 and #100 on one standard.",
  },
  {
    num: "04",
    title: "The 75% you'd reject anyway — filtered, with the rationale documented",
    body: "Weak applications surface immediately with evidence. Your analyst confirms each rejection; the full rationale is documented internally, and what you communicate to the project owner is your template and your call. You get: analyst weeks back from the non-listers.",
  },
  {
    num: "05",
    title: "Deep diligence starts from a prepared file",
    body: "Red flags and unverified claims itemised with page references, verification checklist pre-drafted. Your KYB, AML, legal review and Art. 5 checks stay exactly as they are — they just start at week three. You get: shorter weeks, same depth.",
  },
  {
    num: "06",
    title: "The Funding Committee compares like with like",
    body: "Every candidate in the same format: evidence-linked brief, open questions, comparable grounds. Decisions, overrides and reasons logged in committee mode — exportable for the minutes. You get: faster committees, documented decisions.",
  },
  {
    num: "07",
    title: "KIIS completeness, checked systematically",
    body: "A logged, section-by-section completeness check against Annex I that slots into your Art. 23(11) procedures. Correctness and clarity remain your review — now starting from a flagged draft instead of a blank page. You get: one limb of Art. 23(11) systematised, honestly scoped.",
  },
];

/* ESMA governance rows */
const GOV_ROWS = [
  { b: "Where data lives", span: "EU processing options; deployment up to your own environment on the Enterprise track; retention and deletion aligned to your Art. 26 policy." },
  { b: "Never trained on", span: "Project-owner documents are processed only for your screening — never used to train models. Contractual, in the DPA." },
  { b: "Sub-processors disclosed", span: "Model-provider and sub-processor list, architecture and data-flow diagram — the security pack ships before the pilot." },
  { b: "EU AI Act position", span: "Our classification assessment and the human-oversight design that goes with it — documented, shared with your counsel, updated as guidance evolves." },
];

/* Pilot metrics */
const METRIC_CARDS = [
  { icon: "⏱", title: "Analyst-hours / 100 apps", body: "Before vs after — the number your CFO turns into the business case." },
  { icon: "📬", title: "First-decision SLA", body: "Days from application to a documented first screening decision." },
  { icon: "🚩", title: "Claims caught", body: "Unverified or inflated claims flagged vs the analyst baseline on the same files." },
  { icon: "🧾", title: "File completeness", body: "Can every decision be answered from the standing record? Counted per application." },
];

const FAQ = [
  {
    q: "Can a regulated CSP use AI in screening at all?",
    a: "Yes — under governance. ESMA's guidance on AI in investment services expects human oversight, testing, and the firm retaining full responsibility. In this design your analysts confirm every rejection, your committee makes every listing decision, and the whole process is logged. It's easier to defend than undocumented analyst-by-analyst variance.",
  },
  {
    q: "Does this satisfy our Art. 5 / Art. 23(11) duties?",
    a: "No tool can — and we won't claim to. Art. 5 checks and your verification stack stay yours; on the KIIS we systematise the completeness limb of Art. 23(11) against Annex I, while correctness and clarity remain your review. What you gain is documented consistency and a standing file.",
  },
  {
    q: "What happens when the AI misreads a document?",
    a: "Quotes are verified against the source before a finding stands — no quote, no finding. Thin evidence moves conclusions down, never up, and everything material routes to the analyst's verification checklist rather than into a silent score.",
  },
  {
    q: "Which model providers see project-owner documents?",
    a: "Disclosed in the sub-processor list in your security pack, with a contractual no-training commitment and EU processing options. On the Enterprise track, screening runs on your approved models — including inside your environment.",
  },
  {
    q: "How does it integrate with our application flow?",
    a: "Batch-based to start — export from your current intake, files and evaluations back — with API integration scoped on the Platform tier. No project-owner-facing change is required on day one.",
  },
  {
    q: "Who else runs this?",
    a: "We're onboarding a founding cohort of platforms, which is why the entry point is a measured parallel pilot on your own inbound — with metrics your Compliance Officer signs off before anything starts.",
  },
];

const SEG_STYLES = `
.seg main .seg-narrow{max-width:720px}
.seg-chain{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.seg-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.seg-chip .cl{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff);margin-bottom:8px}
.seg-chip .cv{font-size:14.5px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
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

export default function CrowdfundingPage() {
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
          id="hero-crowdfunding"
          surface="ink"
          eyebrow="For crowdfunding service providers under ECSPR"
          titleLead="Screen every project owner in days. Keep the file your NCA will "
          titleAccent="ask for"
          titleTrail="."
          sub="EvalLens reads every campaign application end to end — deck, business plan, financial narrative — and produces an evidence-linked screening file per project owner. Your analysts verify, your Funding Committee decides, and the record exists from day one instead of being reconstructed later."
          ctas={[
            { label: "Scope the pilot", href: "https://calendly.com/evallens/30min" },
            { label: "See a sample report", href: "/trust/use-cases#sample-output", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · screening file · 16:9",
            hint: "Screening-file UI: project-owner dossier with per-criterion findings, page-tagged quotes, verification checklist and committee-decision log — light Apple-style dashboard",
            ariaLabel:
              "Screening file: project-owner dossier with per-criterion findings, page-tagged quotes, a verification checklist and a committee-decision log",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §2 The double bind */}
        <StatBand
          id="double-bind"
          eyebrow="The double bind"
          title="Too slow, the deal lists elsewhere. Too fast, the file won't hold"
          accent="hold"
          stats={BIND_STATS}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §3 The supervisory request — chain (page-local key block) */}
        <section id="file" className="band ink" aria-labelledby="seg-file-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The supervisory request</Eyebrow>
            <h2 id="seg-file-h2">
              &ldquo;Please provide the screening record for…&rdquo; — and you export,
              not <span className="grad-word">excavate.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-chain">
              {EVIDENCE_CHAIN.map((c) => (
                <div key={c.label} className="seg-chip" data-reveal="up">
                  <div className="cl">{c.label}</div>
                  <div className="cv">{c.value}</div>
                </div>
              ))}
            </div>
            <p className="sub seg-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              The next information request stops being an archaeology project. The file
              exists from day one. Quotes verified against source documents — no quote,
              no finding. Analysts confirm every rejection; the committee makes every
              listing decision.
            </p>
          </div>
        </section>

        {/* §4 How it works (ink → ink, no bridge) */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Campaign application → listing decision, in seven steps"
          titleAccent="seven steps"
          sub="EvalLens prepares the screening file. Your analysts verify; your Funding Committee decides."
          items={STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §5 AI governance — ESMA (page-local) */}
        <section id="governance" className="band light" aria-labelledby="seg-gov-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>AI governance</Eyebrow>
            <h2 id="seg-gov-h2">
              The paragraph your Compliance Officer reads{" "}
              <span className="grad-word">first.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>Built to ESMA&rsquo;s dialect: human oversight, testing, firm accountability.</h3>
              <p className="lead">
                ESMA&rsquo;s guidance on AI in investment services doesn&rsquo;t ban AI —
                it demands governance: board-level understanding, human oversight, and
                the firm taking full responsibility for systems it deploys. That&rsquo;s
                this architecture, literally. And the consistency claim — &ldquo;the same
                standard for every application&rdquo; — is falsifiable, not marketed:
                versioned criteria, versioned models, logged reads, and
                quote-verification against source text.
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

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §6 Measured, not asserted — pilot metrics (page-local) */}
        <section className="band soft" aria-labelledby="seg-metrics-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Measured, not asserted</Eyebrow>
            <h2 id="seg-metrics-h2">
              What the parallel pilot measures on your{" "}
              <span className="grad-word">inbound.</span>
            </h2>
            <p className="sub">
              Thirty recent applications, run side by side with your analysts — under a
              signed DPA, EU processing, success metrics agreed before we start.
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
              <strong>Fixed-fee pilot, then continuous screening priced to your monthly
              inbound, in EUR, invoiced.</strong> Applications are read in the language
              they arrive in, Nordic and Southern-European included, with scores
              comparable across languages. <a href="/pricing">See pricing</a> or{" "}
              <a href="https://calendly.com/evallens/30min">book a call</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §7 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Crowdfunding", "/trust/use-cases/crowdfunding"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What compliance will ask"
          titleAccent="compliance"
          items={FAQ}
        />

        {/* §8 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Thirty applications. Side by"
          titleAccent="side."
          sub="30 minutes with whoever owns screening: we agree the metrics, sign the DPA, and run one month of inbound in parallel. Answer project owners in days — and hold a file you'd hand over the same afternoon. The first run is free through August 31, for batches up to 10 decks."
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
