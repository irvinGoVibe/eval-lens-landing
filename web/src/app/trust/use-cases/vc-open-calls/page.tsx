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
 * /trust/use-cases/vc-open-calls
 * Ported from eval-lens-crm/wiki/sales/icp-pages/_body-vc.html.
 * Port decisions (2026-08-15): no price anchors, no sample links; the
 * "pastes into the IC memo" line softened — we are the screening gate,
 * not IC-readiness. Scoped `.seg-*` styles; shared DS untouched.
 * JTBD: before the pipeline meeting — inbound decks → partner-ready
 * first read (not diligence, not the investment decision).
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for VC Open Calls — Your Open Call, Actually Read",
  description:
    "Every submitted deck read in full against your investment dimensions — flags, founder questions, a quote behind every finding. The aide, never the arbiter.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "Aide, not arbiter", href: "#aide" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — cold inbound, honestly */
const INBOUND_STATS = [
  {
    value: "2:31",
    label: "minutes a cold deck actually gets read, vs 4:18 for a warm intro",
    src: "DocSend engagement research",
  },
  {
    value: "~60%",
    label: "of reading attention lands on the first four slides. Most of every submission is never weighed",
    src: "DocSend",
  },
  {
    value: "3,000 → 9",
    label: "decks an analyst sees per year vs deals the fund closes. The skim is a rational answer to that math",
    src: "funds' own math",
  },
  {
    value: "“Too early”",
    label: "what most founders hear back — if anything. Every ghosted founder is your program's NPS and your scout network's credibility",
    src: "founder surveys",
  },
];

/* How it works — five steps */
const STEPS = [
  {
    num: "01",
    title: "Frame the program",
    body: "Open call, scout batch, fellowship or demo day — your investment dimensions and thesis-fit criteria become the shared rubric, locked before the window opens. Your Typeform/Airtable intake stays; we ingest the batch. You get: one standard every reader shares.",
  },
  {
    num: "02",
    title: "Every deck read in full — as it lands",
    body: "Every page, coverage logged; reports ready as submissions arrive. Signal engines can't see a pre-seed founder with no web footprint. A full read can. You get: deck #1 and #400 on the same standard.",
  },
  {
    num: "03",
    title: "A brief per deck: flags, questions, quotes",
    body: "Red flags, the three questions you'd ask the founder, and a page-referenced quote behind every finding. Where reviewer roles disagree, the gap goes to your team as an open question — never averaged away. You get: screening calls that stop being first reads.",
  },
  {
    num: "04",
    title: "One ranked view. Partners decide.",
    body: "The batch becomes a single comparable board; analysts review the borderline; partners confirm or override, and their calls build the shortlist. The evidence pastes straight into your own memo. You get: an answer for every rank, meeting-ready.",
  },
  {
    num: "05",
    title: "Pass with feedback — under your control",
    body: "Substantive, evidence-based pass-feedback for every founder — reviewed and editable by your team before anything is sent, tone configured to your house style, opt-out per call. The rare funds that do this treat it as a sourcing edge; for you it's a byproduct with a safety catch. You get: founder goodwill without the letterhead risk.",
  },
];

/* The brief — evidence chain */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "7.6", big: true, note: "on “market” — advisory, your dimensions" },
  { label: "Finding", value: "Bottom-up sizing grounded in a served niche; top-down claim unsupported." },
  { label: "Quote", value: "“…112 paying teams in vertical X, 9% m/m…” · page 8" },
  { label: "Red flag", value: "Churn not disclosed anywhere in the deck." },
  { label: "Founder Q", value: "“What's logo churn for the last two quarters?” — drafted for the call." },
];

/* Brand-safe feedback rows */
const BRANDSAFE_ROWS = [
  { b: "Reviewed before sent", span: "Your team approves or edits every note — nothing leaves without a human sign-off." },
  { b: "Your tone, your template", span: "House style configured once; signed the way you choose." },
  { b: "Opt-out per call", span: "Run a silent call when you need to — feedback is a switch, not a default you fight." },
  { b: "Evidence-grounded", span: "Every point traces to the deck — the note can't claim what the record doesn't hold." },
];

const FAQ = [
  {
    q: "“Isn't this the thing Google shelved?”",
    a: "It's the opposite side of that experiment. GV's “Machine” drifted from aide to arbiter and was shelved for it (Axios, Sep 2022 — worth the read). EvalLens is architecturally the aide: it reads and prepares evidence; ranking is built from partner decisions; there is no autonomous yes/no. The GV story isn't our risk — it's our design spec.",
  },
  {
    q: "Our real pipeline is warm intros. Why bother?",
    a: "This isn't for the warm pipeline. It's for the programs you run for coverage — open calls, scout batches, demo days — where inbound currently gets 150 seconds a deck. Either read it properly or accept the call is optics; we make reading it properly cost less than a week of associate time.",
  },
  {
    q: "We already run Harmonic / Specter / Affinity.",
    a: "Keep them — different job. Signal engines discover companies via external data; a pre-seed founder who just applied often has no signal footprint at all. Nothing in that stack reads submitted decks against your criteria. Complementary, not competitive.",
  },
  {
    q: "Our inbound isn't tidy decks. It's Notion pages, Looms and data-room links.",
    a: "Submitted decks and written answers get the full read today, in the language the founder wrote them — one rubric across the batch, so a deck in German and a deck in Portuguese land on the same scale. Looms and external links aren't read cold: they're scoped into your program during setup, and the per-company coverage log shows your team exactly what was read. No company loses points for format without a human seeing the flag.",
  },
  {
    q: "What happens when the AI misquotes a deck?",
    a: "Quotes are verified against the source document before any finding stands — no quote, no finding. Where evidence is thin, scores move down, never up, and the gap is flagged to your team rather than papered over. And nothing founder-facing leaves without your sign-off.",
  },
  {
    q: "What are founders told?",
    a: "Template disclosure for your application form: AI assists the first read; partners make every decision; decks are processed only for this program, never used for training. Transparency here is a sourcing asset, not a risk.",
  },
  {
    q: "Who else runs this?",
    a: "Founding cohort stage — which is why the first step is a parallel run on your own batch: your analysts screen as usual, EvalLens reads the same decks, and you compare agreement and catches before committing anything.",
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

export default function VcOpenCallsPage() {
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
          id="hero-vc"
          eyebrow="For funds running open calls, scout programs & demo days"
          title={<>Your open call, actually <HeroAccent>read.</HeroAccent></>}
          sub="You publicly invite founders to apply. Then the median submission gets 150 seconds and silence. EvalLens reads every submitted deck in full against your investment dimensions and hands your team a comparable, evidence-linked view of the whole batch — every deck with flags, founder questions, and a quote behind every finding."
          primary={{ label: "Book the parallel run", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "See a sample report", href: "/trust/use-cases#sample-output" }}
          mediaAlt="A stack of evidence-linked company review reports prepared for a venture fund open call"
        />

        {/* §2 Cold inbound, honestly */}
        <StatBand
          id="inbound"
          eyebrow="Cold inbound, honestly"
          title="Either read it properly — or accept the call is optics"
          accent="optics"
          stats={INBOUND_STATS}
        />

        {/* §3 Aide, not arbiter — the GV story (page-local, the page's key block) */}
        <section id="aide" className="band light" aria-labelledby="seg-aide-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Design decision, not disclaimer</Eyebrow>
            <h2 id="seg-aide-h2">
              Built as the aide. Never the{" "}
              <span className="grad-word">arbiter.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>Yes — this is the axis Google Ventures tested for you.</h3>
              <p className="lead">
                GV built &ldquo;The Machine&rdquo; to score deals, watched it drift from
                diligence aide into de facto investment committee, and shelved it in 2022
                — Axios&rsquo; epitaph: data went back to being &ldquo;aide, rather than
                arbiter.&rdquo; We built on the right side of that line on purpose: six
                AI reviewer roles — not six people; six adversarial reads that can&rsquo;t
                anchor on each other — prepare the evidence. The scores are advisory. The
                shortlist is built from your partners&rsquo; decisions, and there is no
                mode where the machine says yes or no to a deal. Conviction was never the
                part that needed automating. Reading was.
              </p>
            </div>
          </div>
        </section>

        {/* §4 How it works */}
        <Numbered
          id="how-it-works"
          surface="soft"
          version={1}
          eyebrow="How it works"
          title="Application window → pipeline meeting, in five steps"
          titleAccent="five steps"
          sub="EvalLens prepares the comparable first read. The shortlist is your partners' — always."
          items={STEPS}
        />

        {/* §5 The brief — evidence chain on the light editorial canvas. */}
        <section id="brief" className="band light" aria-labelledby="seg-brief-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The brief</Eyebrow>
            <h2 id="seg-brief-h2">
              &ldquo;Why is this deck ranked{" "}
              <span className="grad-word">#4?</span>&rdquo;
            </h2>
            <p className="sub">
              Every rank traces to findings your team can check — and challenge — before
              anything reaches the partnership.
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
              Quotes are verified against the deck before a finding stands. No quote, no
              finding.
            </p>
          </div>
        </section>

        {/* §6 Brand-safe founder feedback (page-local) */}
        <section className="band light" aria-labelledby="seg-brand-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Your letterhead, protected</Eyebrow>
            <h2 id="seg-brand-h2">
              Feedback founders remember — without the{" "}
              <span className="grad-word">screenshot risk.</span>
            </h2>
            <p className="sub">
              AI-generated feedback going out under a fund&rsquo;s name is one
              hallucinated critique away from a thread on X. That&rsquo;s why the
              feedback engine ships with a safety catch, not a fire hose.
            </p>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <div className="rows">
                {BRANDSAFE_ROWS.map((r) => (
                  <div key={r.b} className="row">
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="seg-note" data-reveal="up">
              <strong>Priced against the skim, not a fantasy.</strong> A 400-deck call
              gets roughly 17 hours of skim today — 60% of it on the first four slides.
              EvalLens reads every page of all 400, flat per program, inside a platform
              budget: no partner approval, no IC, no seat licences. Failed runs never
              billed. <a href="/pricing">See pricing</a> or{" "}
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
          sub="See how EvalLens fits your inbound pipeline, reads the whole open-call batch consistently, and leaves every investment decision with your team."
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
          }}
          maskId="vc-open-call-questions"
        />

        {/* §7 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["VC open calls", "/trust/use-cases/vc-open-calls"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What your skeptical GP will ask"
          titleAccent="skeptical GP"
          items={FAQ}
        />

        <UseCaseRelated currentHref="/trust/use-cases/vc-open-calls" />

        {/* §8 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Run it in parallel on your next"
          titleAccent="call."
          sub="Under NDA, we demo on your own decks first. Then one batch, side by side: where the ranked view agreed with your analysts — and what the skim missed. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Book the parallel run", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
