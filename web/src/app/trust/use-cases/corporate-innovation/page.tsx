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
 * /trust/use-cases/corporate-innovation
 * Ported from eval-lens-crm/wiki/sales/icp-pages/_body-corporate.html.
 * Port decisions (2026-08-15): no price anchors, no sample links.
 * Scoped `.seg-*` styles; shared DS untouched.
 * JTBD: before stakeholder review — separate real partnership potential
 * from innovation theatre, with proof of process for the steering
 * committee.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Corporate Innovation — Challenge to Signed PoC",
  description:
    "Every challenge submission read end to end, evidence-linked one-pagers for your jury, and a selection memo you can defend upstairs. Your jury decides.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "The memo", href: "#memo" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — the challenge, honestly */
const CHALLENGE_STATS = [
  {
    value: "300+",
    label: "submissions a 6-week corporate challenge pulls, in the range we see across programs — screened by the innovation team on top of the day job",
    src: "the pilot measures yours",
  },
  {
    value: "6 lenses",
    label: "a jury of business-unit executives scores through six different priorities — and the averaged spreadsheet hides every disagreement",
    src: "committee math",
  },
  {
    value: "~1/3",
    label: "of an innovation specialist's week goes to manual diligence on inbound — a range we see across programs",
    src: "the pilot measures yours",
  },
  {
    value: "“What shipped?”",
    label: "the question every steering committee now opens with. Activity metrics stopped counting; defensible selections and PoCs are the scoreboard",
    src: "your last steering meeting",
  },
];

/* Memo chain */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "8.2", big: true, note: "on “use-case fit” — your criteria, your weights" },
  { label: "Finding", value: "Addresses the stated process directly; live at two enterprises in an adjacent sector." },
  { label: "Quote", value: "“…deployed at two industrial clients, 9-week integration…” · page 12" },
  { label: "Evidence strength", value: "Strong — quotes verified against the deck. No quote, no finding." },
  { label: "Next step", value: "Integration claim → verification item #1 in the PoC scoping call." },
];

/* How it works — six steps */
const STEPS = [
  {
    num: "01",
    title: "The challenge statement becomes the rulebook",
    body: "Your search field and challenge statement translate into corporate screening criteria: use-case fit for the sponsoring BU, integration effort into your stack, security and compliance posture, references in regulated industries, procurement readiness. Criteria are versioned — when the BU sponsor changes priorities mid-challenge, you re-score against v2 with one action, and both versions stay in the record. You get: one rulebook the whole jury shares, versioned.",
  },
  {
    num: "02",
    title: "Submissions land from wherever they already land",
    body: "Your branded challenge page, or a batch export from the Agorize/HYPE-class platform you run — CSV or files in, evaluations out. Applicants change nothing; multi-language submissions are read in the language they arrive in. You get: no platform migration, no retyping.",
  },
  {
    num: "03",
    title: "Every submission read against the statement",
    body: "Every page processed, coverage logged. The use-case-fit reviewer cites the exact slide where the startup addresses your challenge statement — or flags that it never does. Submission #1 and #300 get the same standard. You get: your team screening exceptions, not the pile.",
  },
  {
    num: "04",
    title: "Your jury judges one-pagers, not homework",
    body: "Independent AI reviewer roles — not people; six adversarial reads that can't anchor on each other — prepare evidence-linked briefs. Executives judge on the briefs; their scores are logged in committee mode, and their disagreements surface for the deliberation instead of vanishing into an average. You get: one exec-hour covering a briefed shortlist.",
  },
  {
    num: "05",
    title: "The selection memo comes from the live record",
    body: "Winners approved by people, ranking built from jury scores, and a memo where every pick traces to evidence — generated from the record, not reconstructed the night before the steering committee. You get: board-ready proof of process.",
  },
  {
    num: "06",
    title: "The evaluation becomes the PoC brief",
    body: "Strengths, open questions and verification steps hand straight to the business unit as the pilot's starting brief — same week, not next quarter. When evaluation is a standing process instead of a quarterly scramble, PoC approval stops being a committee-cycle problem — and the pilot measures your own before/after. You get: time-to-PoC as your KPI win.",
  },
];

/* Pilot metrics */
const METRIC_CARDS = [
  { icon: "⏱", title: "Close → scoped PoC", body: "Calendar days from challenge close to an approved PoC scope — before vs after." },
  { icon: "👔", title: "Jury-hours per exec", body: "What one executive actually spends to judge the shortlist, briefed vs cold." },
  { icon: "📄", title: "Coverage", body: "Share of submitted pages actually read — logged, verifiable." },
  { icon: "🧾", title: "Record completeness", body: "Can every selection be answered with a quote and a page? Counted, not claimed." },
];

/* InfoSec artifacts */
const INFOSEC_ARTS = [
  "🗺️ Architecture & data-flow diagram",
  "🧩 Sub-processor & model-provider list",
  "📜 DPA template (GDPR-aligned)",
  "🚫 No training on your data — contractual",
  "🗑️ Retention & deletion terms you define",
  "🖥️ Enterprise: your models, your servers, SSO",
];

const FAQ = [
  {
    q: "Will our executives take scores from a machine?",
    a: "They don't have to — AI reads are advisory. Executives judge on evidence one-pagers, their scores build the ranking, and their disagreements surface for deliberation. What they notice is walking into jury day with every deck effectively read and the holes flagged.",
  },
  {
    q: "Our challenge platform already has AI scoring.",
    a: "Challenge platforms score signals and cluster ideas — useful workflow. They don't read a 20-page deck end to end and return per-criterion findings with quotes your jury can verify. EvalLens is that evaluation layer; keep your platform for workflow and community.",
  },
  {
    q: "What does InfoSec get?",
    a: "The security pack — architecture, data-flow, sub-processor list, DPA, contractual no-training commitment — before the pilot. Deployment follows your policy: managed perimeter today, your models and your servers on the Enterprise track.",
  },
  {
    q: "Procurement takes six months. How do we start?",
    a: "The pilot is a fixed-fee engagement sized under most single-PO thresholds, with MSA and DPA templates ready. Most teams run the pilot while procurement processes the production agreement in parallel.",
  },
  {
    q: "The BU sponsor changes criteria mid-challenge. Then what?",
    a: "Criteria are versioned. You update the rulebook, re-score the pool against v2 in one action, and both versions stay in the record — so the memo explains not just the picks, but the change.",
  },
  {
    q: "What do the startups' lawyers say about AI reading their decks?",
    a: "Submissions are processed only for your challenge's evaluation, never used for training, with retention you define — and we provide disclosure language for your challenge terms so that's transparent to every applicant upfront.",
  },
  {
    q: "Who else runs this?",
    a: "We're onboarding a founding cohort of programs; corporate references are shared under NDA where they exist. That's exactly why the engagement starts with a measured parallel pilot on your own challenge — the proof is generated on your data, not borrowed from a logo wall.",
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
.seg-kit .arts{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px 18px;margin-top:22px}
.seg-kit .arts span{font-size:14.5px;color:var(--fg,#14102d)}
.seg-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.seg-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function CorporateInnovationPage() {
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
          id="hero-corporate"
          eyebrow="For corporate open-innovation & challenge teams"
          title={<>From challenge statement to a PoC your business unit actually <HeroAccent>signs.</HeroAccent></>}
          sub="EvalLens reads every challenge submission end to end against your criteria, hands your jury evidence-linked one-pagers, and produces a selection memo you can defend upstairs — every pick traced to a quote and a page. Your jury decides; you hold proof of process."
          primary={{ label: "Scope the pilot", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "See a sample report", href: "/trust/use-cases#sample-output" }}
          mediaAlt="A stack of evidence-linked challenge review reports prepared for a corporate innovation jury"
        />

        {/* §2 The challenge, honestly */}
        <StatBand
          id="challenge"
          eyebrow="The challenge, honestly"
          title="The funnel is fine. The screening is exposure"
          accent="exposure"
          stats={CHALLENGE_STATS}
        />

        {/* §3 Armor for the steering committee — memo chain (page-local key block) */}
        <section id="memo" className="band light" aria-labelledby="seg-memo-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Armor for the steering committee</Eyebrow>
            <h2 id="seg-memo-h2">
              &ldquo;Why these five?&rdquo; The memo{" "}
              <span className="grad-word">answers.</span>
            </h2>
            <p className="sub">
              The moment the CFO asks why these startups made the shortlist — and what
              makes this year different — you open a memo where every pick has a quote
              and a page number. The &ldquo;innovation theatre&rdquo; line dies before
              it&rsquo;s spoken.
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
              Walk into the steering committee with receipts, not gut scores from six
              executives who read three decks on the flight in. Jury disagreements
              surface — nothing silently averaged. And every startup that didn&rsquo;t
              make it gets a written, defensible answer — drafted from the record,
              approved by your team before it&rsquo;s sent — including the one your
              CEO&rsquo;s contact submitted.
            </p>
          </div>
        </section>

        {/* §4 How it works — the light narrative continues. */}
        <Numbered
          id="how-it-works"
          surface="soft"
          version={1}
          eyebrow="How it works"
          title="Challenge close → scoped PoC, in six steps"
          titleAccent="six steps"
          sub="EvalLens prepares the evidence. Your jury judges; the business unit gets a PoC brief the same week."
          items={STEPS}
        />

        {/* §5 Measured, not asserted — pilot metrics (page-local) */}
        <section className="band soft" aria-labelledby="seg-metrics-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Measured, not asserted</Eyebrow>
            <h2 id="seg-metrics-h2">
              What the pilot measures on your{" "}
              <span className="grad-word">challenge.</span>
            </h2>
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
              Metrics agreed with you before the pilot starts. The readout is yours to
              take upstairs.
            </p>
          </div>
        </section>

        {/* §6 Vendor risk, pre-empted — InfoSec fast path (page-local) */}
        <section className="band light" aria-labelledby="seg-infosec-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Vendor risk, pre-empted</Eyebrow>
            <h2 id="seg-infosec-h2">
              Your InfoSec review, with a folder — not a{" "}
              <span className="grad-word">handshake.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>Security pack up front, before any document moves.</h3>
              <p className="lead">
                Startup decks are confidential submissions under your program&rsquo;s
                terms — and AI vendors are exactly what your vendor-risk process exists
                for. So the review comes first, with artifacts your team can actually
                check — the sub-processor list, DPA and security overview are already public on this site:
              </p>
              <div className="arts">
                {INFOSEC_ARTS.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
            <p className="seg-note" data-reveal="up">
              <strong>Two ways in, both procurement-friendly:</strong> a fixed-fee
              managed pilot — one live challenge, 4–6 weeks, run in parallel with your
              current screening, sized so most teams start it under a single PO — and an
              Enterprise track with SSO, SLA, your approved models, your servers and your
              retention policy. <a href="/pricing">See pricing</a> or{" "}
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
          sub="See how EvalLens fits your challenge workflow, keeps every recommendation traceable, clears the security conversation, and leaves the PoC decision with your jury."
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
          }}
          maskId="corporate-innovation-questions"
        />

        {/* §7 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Corporate innovation", "/trust/use-cases/corporate-innovation"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="Asked in every steering committee"
          titleAccent="steering committee"
          items={FAQ}
        />

        <UseCaseRelated currentHref="/trust/use-cases/corporate-innovation" />

        {/* §8 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Pilot it on your next"
          titleAccent="challenge."
          sub="30 minutes with you: we map the challenge statement to criteria, agree the pilot metrics, and hand your InfoSec the security pack the same day. The first run is free through August 31, for batches up to 10 decks."
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
