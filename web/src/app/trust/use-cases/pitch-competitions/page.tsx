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
 * /use-cases/pitch-competitions
 *
 * Ported from the gated review page web/public/icp/pitch-competitions.html
 * (source of truth: eval-lens-crm/wiki/sales/icp-pages/_body-competitions.html)
 * into the site design system. DS components carry the standard sections;
 * four bespoke blocks (evidence chain, judge-math, disclosure kit, data & IP)
 * are page-local with a scoped `.pc-*` style block — shared DS untouched.
 *
 * Copy invariants: no invented clients/cases/logos, no SOC2/ISO claims
 * ("security pack on request"), AI never decides, numbers carry a source or an
 * honest "the pilot measures yours".
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Pitch Competitions — Judging With Receipts",
  description:
    "An AI panel pre-reads the written round on your rubric, screeners confirm with briefing packs, the final ranking stays human. Shadow-pilot your next round.",
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

/* §2 — the written round, honestly (StatBand, 4 sourced numbers) */
const WRITTEN_ROUND_STATS = [
  {
    value: "300+",
    label: "volunteer judges one flagship university competition publicly recruits — every single year",
    src: "rbpc.rice.edu",
  },
  {
    value: "4–6 h",
    label: "the real homework in one screening assignment: three written entries with feedback write-ups",
    src: "why good judges decline next year",
  },
  {
    value: "~5%",
    label: "share of the pool the average judge actually sees at a large event — scores barely compare",
    src: "HackMIT judging research",
  },
  {
    value: "0",
    label: "teams who see the written-round feedback at most major competitions today",
    src: "it goes to the director's drawer",
  },
];

/* §4 — applications open → awards night, in six steps (Numbered) */
const STEPS = [
  {
    num: "01",
    title: "Your rubric and tracks, locked",
    body: "Criteria, weights and tracks configured per competition — plus a methodology statement you can publish in the competition rules, where fairness claims legally live. You get: a rulebook and a public fairness statement.",
  },
  {
    num: "02",
    title: "Entries land on your page — or alongside your platform",
    body: "Link or QR, open or invite-only, with a window and live statuses. Completeness is checked automatically; staff chases exceptions only. You get: a clean pool before judging starts.",
  },
  {
    num: "03",
    title: "The AI panel does the first read of every entry",
    body: "Six reviewer roles — independent AI reads, not people — score the whole pool on your rubric, every page, coverage logged. One panel for the whole pool: no judge-assignment lottery in the written round. You get: the written round pre-read in hours.",
  },
  {
    num: "04",
    title: "Your screeners confirm — with packs, not piles",
    body: "Prelim decisions stay human. Your remote judges and alumni keep their role: screening becomes a one-hour confirm-and-comment pass instead of a six-hour reading weekend. Same touchpoint, a fraction of the ask — and they say yes again next year. You get: a judge pool that renews itself.",
  },
  {
    num: "05",
    title: "Live rounds run exactly as designed",
    body: "Semis and finals: same stage, same judges, same drama. Judges score as usual; the leaderboard is built from human scores times your weights; disagreements surface for deliberation. You get: your judges' leaderboard, better informed.",
  },
  {
    num: "06",
    title: "Awards night — and every team leaves with something",
    body: "Per-rank record for anyone who asks; structured feedback for all teams, reviewed by your staff before it's sent. For a student competition, feedback for 400 teams is a teaching outcome, not just an event. You get: teams that return and recommend.",
  },
];

/* §3 — the Monday-after evidence chain (page-local) */
const EVIDENCE_CHAIN = [
  { label: "Score", value: "7.4", big: true, note: "on “business model” — your rubric, your weights" },
  { label: "Finding", value: "Pricing validated with early customers; distribution still a hypothesis." },
  { label: "Quote", value: "“…14 pilot customers at $190/mo…” · page 9" },
  { label: "Evidence strength", value: "Strong — 3 of 3 claims verified on-page. No quote, no finding." },
  { label: "Judge scores", value: "Human panel's scores and deliberation notes, logged alongside." },
];

/* §5 — judge math cards (page-local) */
const JUDGE_MATH = [
  { icon: "🤝", title: "Keep every judge", body: "Judge count is a program KPI and a sponsor perk. Nothing here reduces it — it upgrades what the ask is." },
  { icon: "📊", title: "One standard, whole pool", body: "The written round stops being a lottery of which tired judge drew your entry on which night." },
  { icon: "🎓", title: "Feedback as pedagogy", body: "Every student team gets rubric-based feedback — the outcome deans and sponsors actually brag about." },
];

/* §6 — the disclosure kit rows (page-local) */
const KIT_ROWS = [
  { b: "The on-stage sentence", span: "“Every entry received a full read under identical rules — and humans made every ranking decision.”" },
  { b: "The rules-document paragraph", span: "A methodology statement for your competition rules: what AI assists, what humans decide, how teams can ask about their own record." },
  { b: "The team-facing disclosure", span: "A plain-language snippet for the application form, so no one discovers AI involvement after the fact." },
  { b: "The COI note", span: "Judge conflict-of-interest and recusal handling stays your policy — the record simply logs who scored what, which makes recusals verifiable." },
];

/* §7 — data & student IP cards (page-local) */
const DATA_IP = [
  { icon: "🚫", title: "Never trained on", body: "Student and team submissions are processed only for your competition's evaluation — never used to train models. Contractual." },
  { icon: "🏫", title: "The institution owns the record", body: "Reports, scores and the decision log belong to your program. Retention and deletion on your policy; student-data handling structured to support your FERPA obligations, DPA available." },
  { icon: "🧾", title: "Procurement-ready", body: "PO and invoice accepted · vendor registration forms and security questionnaires supported · public sub-processor list at /subprocessors · education discount for university programs." },
];

/* §8 — FAQ */
const FAQ = [
  {
    q: "Will our students' decks train your model? Who sees them?",
    a: "Never trained on — contractual. Submissions are processed only for your competition, in a closed perimeter with no public links; the sub-processor and model-provider list is available for your IT review, and the institution owns every report and score.",
  },
  {
    q: "Won't teams say “an AI judged us”?",
    a: "State it before they ask — that's what the disclosure kit is for. The honest framing flips the optics: every entry got a full read under identical rules, which is more than any volunteer process can claim, and humans made every ranking decision. What's genuinely hard to defend is entry #300 getting a tired judge at 11pm.",
  },
  {
    q: "Judging is how we engage sponsors and alumni.",
    a: "Keep every judge — change the ask. Nobody sponsors your event to do six hours of reading homework; they come to see finalists and be seen. Remote screeners keep their touchpoint as a one-hour confirm-and-comment pass, and the same judges return next year.",
  },
  {
    q: "We run multiple tracks with different rubrics.",
    a: "Tracks, criteria and weights are configured per competition; each track scores against its own rubric, and the leaderboard respects your weighting.",
  },
  {
    q: "Can a team appeal or see their own record?",
    a: "Two things are product defaults: a team can request its own record, and no entry is eliminated without a named human sign-off. Whether you run open appeals stays your policy — the per-entry evidence, scores and judge decisions make both a five-minute conversation instead of an archaeology dig.",
  },
  {
    q: "How do we validate this before it touches a real result?",
    a: "The shadow pilot: your screeners run one written round as usual while the AI panel reads the same pool. You compare coverage, hours and where the pre-ranking agreed with your screeners — validated against your own judges before it influences anything.",
  },
];

const PC_STYLES = `
.pc main .pc-narrow{max-width:720px}
.pc-chain{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:clamp(28px,4vw,44px)}
.pc-chip{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:16px;padding:18px}
.pc-chip .cl{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff);margin-bottom:8px}
.pc-chip .cv{font-size:14.5px;line-height:1.5;color:var(--body-on-dark,rgba(255,255,255,.82))}
.pc-chip .big{font-size:30px;font-weight:700;line-height:1;margin-bottom:6px;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.pc-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:clamp(24px,3vw,36px)}
.pc-card{border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;background:var(--surface,#fff)}
.pc-card .ic{font-size:22px;line-height:1}
.pc-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.pc-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.pc-kit{border-radius:24px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2)) border-box;box-shadow:var(--shadow-soft,0 24px 60px -34px rgba(40,30,90,.5));padding:clamp(26px,4vw,44px);margin-top:clamp(28px,4vw,44px)}
.pc-kit h3{font-size:clamp(20px,2.6vw,26px);font-weight:680}
.pc-kit .lead{color:var(--muted,#5b5670);margin-top:12px;font-size:15.5px;max-width:68ch}
.pc-kit .rows{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:24px}
.pc-kit .row b{display:block;font-size:15px;margin-bottom:6px}
.pc-kit .row span{font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.pc-price{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.pc-price strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function PitchCompetitionsPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{PC_STYLES}</style>
      <main className="pc section-lab ds">
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
        {/* §1 Hero */}
        {/* id must NOT be "hero": globals.css `body:has(#hero)` is the homepage
            canvas rule that forces the whole body to ink, which turns bare
            `.band.light` sections black. Mirror use-cases' `hero-usecases`. */}
        <StatementHero
          id="hero-pitch"
          surface="ink"
          eyebrow="AI prepares the analysis · People decide"
          titleLead="Every entry gets a full read. Every rank carries its "
          titleAccent="receipts"
          titleTrail="."
          sub="EvalLens is the judging layer under your existing competition: an AI panel pre-reads the whole written round on your rubric, your screening committee confirms with briefing packs instead of blank PDF stacks, and your live judges walk into semis briefed. The final call stays exactly where it belongs."
          ctas={[
            { label: "Run a shadow pilot", href: "https://calendly.com/evallens/30min" },
            { label: "See a sample report", href: "/trust/use-cases#sample-output", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · judge briefing pack · 16:9",
            hint: "Judge briefing pack UI: team card with rubric scores, evidence quotes with page tags, and ranked Q&A for the live round — light Apple-style dashboard",
            ariaLabel:
              "Judge briefing pack: a team card with rubric scores, evidence quotes with page tags, and ranked questions for the live round",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §2 The written round, honestly (StatBand bakes a soft surface) */}
        <StatBand
          id="written-round"
          eyebrow="The written round, honestly"
          title="Three battles every director fights"
          accent="director fights"
          stats={WRITTEN_ROUND_STATS}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §3 The Monday-after email — page-local evidence chain */}
        <section id="record" className="band ink" aria-labelledby="pc-record-h2">
          <div className="wrap pc-narrow" data-reveal="up">
            <Eyebrow>The Monday-after email</Eyebrow>
            <h2 id="pc-record-h2">
              &ldquo;Judging process concerns&rdquo; — cc: sponsor,{" "}
              <span className="grad-word">cc: dean.</span>
            </h2>
            <p className="sub">
              A faculty advisor&rsquo;s team lost. Today you answer with a shrug and an
              apology draft, because the written round genuinely is a lottery of tired
              volunteers. With a record, the thread dies in one reply.
            </p>
          </div>
          <div className="wrap">
            <div className="pc-chain">
              {EVIDENCE_CHAIN.map((c) => (
                <div key={c.label} className="pc-chip" data-reveal="up">
                  <div className="cl">{c.label}</div>
                  {c.big ? <div className="big">{c.value}</div> : null}
                  <div className="cv">{c.big ? c.note : c.value}</div>
                </div>
              ))}
            </div>
            <p className="sub pc-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              The first and the last entry are evaluated under exactly the same rules —
              something no volunteer process can honestly claim. Judge disagreement
              surfaces for deliberation — never averaged away.
            </p>
          </div>
        </section>

        {/* §3 record (ink) → §4 Numbered (ink): both dark, no bridge needed. */}

        {/* §4 How it works — Numbered (DS) bakes an ink surface */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Applications open → awards night, in six steps"
          titleAccent="six steps"
          sub="Prelim decisions stay human. The AI panel does the first read; your judges keep the room and the final ranking."
          items={STEPS}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §5 Judge math — page-local */}
        <section className="band soft" aria-labelledby="pc-math-h2">
          <div className="wrap pc-narrow" data-reveal="up">
            <Eyebrow>Judge math</Eyebrow>
            <h2 id="pc-math-h2">
              1,800 hours, returned to the parts judges{" "}
              <span className="grad-word">love.</span>
            </h2>
            <p className="sub">
              400 entries × 3 reads × 1.5 hours = 1,800 judge-hours your current written
              round consumes. The AI panel returns those hours to semis, finals and
              mentoring — and every entry still gets every page read.
            </p>
          </div>
          <div className="wrap">
            <div className="pc-cards">
              {JUDGE_MATH.map((c) => (
                <div key={c.title} className="pc-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="light" aria-hidden="true" />

        {/* §6 Disclosure kit — page-local */}
        <section className="band light" aria-labelledby="pc-kit-h2">
          <div className="wrap pc-narrow" data-reveal="up">
            <Eyebrow>When the student paper calls</Eyebrow>
            <h2 id="pc-kit-h2">
              You get the script, not just the{" "}
              <span className="grad-word">software.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="pc-kit" data-reveal="up">
              <h3>The &ldquo;what we tell everyone&rdquo; kit, included.</h3>
              <p className="lead">
                The real fear isn&rsquo;t the tool failing — it&rsquo;s defending the tool
                with no script. So the setup includes ready-to-use language for every
                audience:
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

        {/* §7 Data & student IP — page-local */}
        <section className="band soft" aria-labelledby="pc-data-h2">
          <div className="wrap pc-narrow" data-reveal="up">
            <Eyebrow>Data &amp; student IP</Eyebrow>
            <h2 id="pc-data-h2">
              The block your IT office reads{" "}
              <span className="grad-word">first.</span>
            </h2>
          </div>
          <div className="wrap">
            <div className="pc-cards">
              {DATA_IP.map((c) => (
                <div key={c.title} className="pc-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className="pc-price" data-reveal="up">
              <strong>Priced per event, not per seat</strong> — one event, a full
              season, or a small pitch night. PO and invoice accepted; education
              discount for university programs.{" "}
              <a href="/pricing">See pricing</a> or{" "}
              <a href="https://calendly.com/evallens/30min">book a call</a>.
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
            ["Pitch competitions", "/trust/use-cases/pitch-competitions"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What your stakeholders will ask"
          titleAccent="will ask"
          items={FAQ}
        />

        {/* §9 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="Shadow-pilot your next screening"
          titleAccent="round."
          sub="Applications flow as usual; the AI panel pre-reads in parallel with your screeners; you compare before anything counts. One event, fixed price, PO and invoice welcome. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Set up the shadow pilot", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
