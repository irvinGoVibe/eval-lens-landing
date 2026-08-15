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
 * /trust/use-cases/accelerators
 * Ported from the gated ICP review page (source of truth:
 * eval-lens-crm/wiki/sales/icp-pages/_body-accelerators.html).
 * Port decisions (2026-08-15): no price anchors (→ Book a call + /pricing),
 * no sample-report links. Page-local blocks use scoped `.seg-*` styles;
 * shared DS untouched.
 * JTBD: before cohort selection — compare applicants by one standard and
 * defend the cohort decision.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Accelerators — Every Application Fully Read",
  description:
    "Every application read in full and scored on your rubric with page-level evidence. Your committee decides. Free retro-test on your last cohort.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "Retro-test", href: "#retro-test" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — the intake, honestly */
const INTAKE_STATS = [
  {
    value: "150–2,000",
    label: "applications per cohort — from a regional program's team of two to a global intake's team of five, always in a two-to-three-week window",
    src: "the pilot measures yours",
  },
  {
    value: "2–3 min",
    label: "the read a founder's six months of work actually gets under deadline pressure",
    src: "deadline math",
  },
  {
    value: "#447 ≠ #1",
    label: "late applications get a different read than early ones — recency and fatigue, the reviewer biases every program director recognizes",
    src: "reviewer-bias literature",
  },
  {
    value: "0",
    label: "substantive feedback most rejected founders receive. They remember, and they post about it",
    src: "founder forums, passim",
  },
];

/* Retro-test steps */
const RETRO_STEPS = [
  { tag: "Day 0", body: "You share a batch from a closed intake (NDA first if you like)." },
  { tag: "48 h", body: "Reports + ranked board on your own rubric." },
  { tag: "Call 2", body: "Side-by-side: where we agreed with your committee, where we diverged — and why, with page references." },
];

/* Evidence chain */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "7.8", big: true, note: "on “team readiness”" },
  { label: "Finding", value: "Two founders shipped a comparable product at their previous company." },
  { label: "Quote", value: "“…led the payments team from prototype to 200k users…” · page 11" },
  { label: "Confidence", value: "High — and every quote is verified against the source document. No quote, no finding." },
  { label: "Interview Q", value: "“Walk us through what you shipped there” — drafted for your interviewers." },
];

/* How it works — five steps */
const STEPS = [
  {
    num: "01",
    title: "Keep your intake",
    body: "Founders keep applying through F6S, Typeform, YouNoodle or your own form — we ingest the batch: structured answers, decks, video links. Batch export (CSV + files) works today, platform connectors are scoped during setup, and committee scores live in EvalLens or sync back to your sheets. Or use our branded application page. Nothing changes for founders. You get: your stack, untouched.",
  },
  {
    num: "02",
    title: "The full read — every application, every page",
    body: "Form answers and decks are read in full, coverage logged so you can verify what was read. Application #1 and #1,400 get exactly the same rules, on the same day quality. You get: a coverage log per application.",
  },
  {
    num: "03",
    title: "Independent AI reviewer roles — not people — score on your rubric",
    body: "Six adversarial AI reads — team, market, feasibility, traction — that can't anchor on each other: each scores independently, without seeing the others' numbers. Evidence first, then the score: incomplete evidence moves scores down, never up. Where reviewers split by more than a band, the case escalates to your team as an open question. You get: committee-grade discipline on all 1,400.",
  },
  {
    num: "04",
    title: "Your committee decides — we feed it, not replace it",
    body: "EvalLens is the first-pass layer under your existing process: your 15 mentors, partners and screeners keep scoring and arguing exactly as they do — starting from evidence-linked reports instead of raw applications. Confirmations and overrides are logged; the shortlist is built from human decisions. You get: Selection Day time spent on the borderline 30.",
  },
  {
    num: "05",
    title: "Feedback for every founder. A record for every board.",
    body: "Feedback is drafted from the evidence and approved by your team before anything is sent — every rejected founder gets a real answer under your name, safely. The program keeps a selection memo and full decision log: the audit trail LP-funded and publicly funded programs are asked for. You get: reputation compounding + an audit-ready record.",
  },
];

/* Day 0 vs Selection Day */
const DAY_CARDS = [
  {
    tag: "Day 0 — you bring",
    title: "Your process, as it is",
    body: "Your criteria and weights — and if the rubric lives in your committee's heads, the setup session turns how you already decide into a written rubric. It's yours to keep either way. Plus your existing intake form and this cohort's batch.",
  },
  {
    tag: "Selection Day — you hold",
    title: "Everything read, everything defensible",
    body: "Every application fully read with a coverage log · an evidence-linked report and interview questions per team · a ranked board with the borderline flagged · a shortlist built from your committee's scores · approved feedback for every founder · a selection memo and decision log for the board.",
  },
];

/* Data & trust */
const DATA_CARDS = [
  { icon: "🚫", title: "Never trained on", body: "Your applicants' documents are processed only for your evaluation — never used to train models. That's the sentence your founders and counsel are looking for." },
  { icon: "🔒", title: "Closed perimeter", body: "Server-side processing, project-level isolation, reports only in an authorised workspace — no public links. GDPR-aligned processing terms (DPA) with every program." },
  { icon: "🏛️", title: "Your rules at scale", body: "Enterprise track: dedicated processing, your approved models, retention periods you define — scoped in a security review before the pilot, not after." },
];

const FAQ = [
  {
    q: "Does the AI pick our cohort?",
    a: "No — by design. AI scores are advisory; the shortlist and ranking are built exclusively from your committee's decisions, with every confirmation and override logged. There is no mode where the machine decides.",
  },
  {
    q: "Where does our screening committee fit?",
    a: "Exactly where it is now. EvalLens is the first-pass layer underneath: your mentors, partners and screeners keep scoring, arguing and running Selection Day — starting from evidence-linked reports instead of raw applications. We feed your committee; we don't replace its workflow.",
  },
  {
    q: "Our applications aren't decks — they're forms, Looms and links.",
    a: "That's the normal case for accelerators, and it's supported: structured form answers and decks are read in full today; video responses and external links are handled on the program-scale track, configured during setup. Applications are read in the language they arrive in.",
  },
  {
    q: "What about bias — non-native English, unconventional founders?",
    a: "The panel applies the same written rules to every application, never fatigues, and logs the evidence behind every score — so bias becomes inspectable instead of invisible. Blind first-pass configurations (identity fields masked) are available. And the retro-test lets you audit outcomes against your own past decisions before you rely on it.",
  },
  {
    q: "Do you train on our data? Which models touch it?",
    a: "Never. Applicant documents are processed solely for your evaluation under a GDPR-aligned DPA, with project-level isolation. Model routing is server-side; on the enterprise track evaluation runs on your approved models — including inside your environment.",
  },
  {
    q: "How do we start without risking a live cohort?",
    a: "Two zero-risk paths: the 48-hour retro-test on a closed intake, and a parallel pilot on your next one — your team works as usual while EvalLens reads the same applications, and you compare time, coverage and shortlist agreement at the end. The managed pilot is a fixed-fee engagement, scoped on the call.",
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
.seg-kit .row .row-tag{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--violet,#6c4cf1);display:block;margin-bottom:6px}
.seg-kit .row span{font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.seg-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.seg-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function AcceleratorsPage() {
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
          id="hero-accelerators"
          surface="ink"
          eyebrow="For accelerators & startup programs"
          titleLead="Every application gets a full read. Every rejection gets a "
          titleAccent="reason"
          titleTrail="."
          sub="EvalLens gives your screening committee a first pass it can trust: every application read in full and scored against your rubric with page-level evidence. Your team reads reports instead of raw applications — and humans make every call."
          ctas={[
            { label: "Book the free retro-test", href: "https://calendly.com/evallens/30min" },
            { label: "See a sample report", href: "/trust/use-cases#sample-output", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · ranked cohort board · 16:9",
            hint: "Ranked cohort board UI: rows of teams with per-criterion scores, evidence flags, borderline band highlighted — light Apple-style dashboard",
            ariaLabel:
              "Ranked cohort board: rows of teams with per-criterion scores, evidence flags, and a highlighted borderline band",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 The zero-risk test — retro-test (page-local, the page's key block) */}
        <section id="retro-test" className="band light" aria-labelledby="seg-retro-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The zero-risk test</Eyebrow>
            <h2 id="seg-retro-h2">
              Rerun your last <span className="grad-word">intake.</span>
            </h2>
            <p className="sub">
              Don&rsquo;t take a vendor&rsquo;s word for how it would perform on your
              cohort. Test it against decisions you already made.
            </p>
          </div>
          <div className="wrap">
            <div className="seg-kit" data-reveal="up">
              <h3>Send 20–50 applications from your previous cohort. Free up to 20.</h3>
              <p className="lead">
                Within 48 hours you get the evidence-linked reports, the ranked board —
                and a side-by-side against your committee&rsquo;s actual decisions,
                including any rejected teams the panel would have flagged for interview.
                Larger batches are scoped with the managed pilot.
              </p>
              <div className="rows">
                {RETRO_STEPS.map((s) => (
                  <div key={s.tag} className="row">
                    <span className="row-tag">{s.tag}</span>
                    <span>{s.body}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="seg-note" data-reveal="up">
              Your last cohort is the ground truth you already own. The retro-test
              measures agreement and misses on it — before you commit to anything.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 The intake, honestly */}
        <StatBand
          id="intake"
          eyebrow="The intake, honestly"
          title="Hundreds apply. A handful get a real read"
          accent="real read"
          stats={INTAKE_STATS}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §4 Evidence, not vibes — chain (page-local) */}
        <section id="evidence" className="band ink" aria-labelledby="seg-evidence-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Evidence, not vibes</Eyebrow>
            <h2 id="seg-evidence-h2">
              &ldquo;Why did this team score{" "}
              <span className="grad-word">7.8?</span>&rdquo;
            </h2>
            <p className="sub">
              Every score unpacks into a chain your committee can check — and challenge
              — before it enters the result.
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
              The next time a partner asks &ldquo;why did we pass on them?&rdquo; —
              you&rsquo;ll have the page number. Independent AI reviewer roles, no score
              peeking; disagreements escalate, never average away; incomplete evidence
              moves scores down, never up.
            </p>
          </div>
        </section>

        {/* §5 How it works — Numbered (DS, bakes ink surface; no bridge needed) */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Five steps. Your committee stays in charge"
          titleAccent="in charge"
          sub="EvalLens prepares the structured first read. Your committee makes the cohort decision."
          items={STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §6 Day 0 vs Selection Day (page-local) */}
        <section className="band soft" aria-labelledby="seg-days-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>What lands on your desk</Eyebrow>
            <h2 id="seg-days-h2">
              Day 0 vs <span className="grad-word">Selection Day.</span>
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

        {/* §7 Data & trust (page-local) */}
        <section className="band light" aria-labelledby="seg-data-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>Data &amp; trust</Eyebrow>
            <h2 id="seg-data-h2">
              Founder data is a liability we take{" "}
              <span className="grad-word">seriously.</span>
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
              <strong>Priced per intake, not per seat — cheaper than the skim.</strong>{" "}
              Failed runs are never billed; education discount for university-affiliated
              programs. <a href="/pricing">See pricing</a> or{" "}
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
            ["Accelerators", "/trust/use-cases/accelerators"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="Asked by every program director"
          titleAccent="program director"
          items={FAQ}
        />

        {/* §9 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Run the retro-test on your last"
          titleAccent="cohort."
          sub="30 minutes with you: we map your rubric, pick the batch, and you see agreement-and-misses on decisions you already made. 48 hours later, you'll know. Free through August 31, up to 10 decks."
          primary={{ label: "Book the free retro-test", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
