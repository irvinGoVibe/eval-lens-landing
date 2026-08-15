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
 * /trust/use-cases/angel-networks
 * Ported from eval-lens-crm/wiki/sales/icp-pages/_body-angels.html.
 * Port decisions (2026-08-15): no price anchors, no sample links.
 * Scoped `.seg-*` styles; shared DS untouched.
 * JTBD: before diligence night — understand which decks deserve members'
 * volunteer time; every judgment stays individual, member by member.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EvalLens for Angel Networks — Deals Read Before Screening",
  description:
    "A one-page, evidence-linked brief per company before screening night: findings, red flags, pitch questions. Your Dealum or Gust pipeline stays.",
};

const HEADER_NAV: SectionNav = {
  section: "Use cases",
  sectionHref: "/trust/use-cases",
  links: [
    { label: "The spiral", href: "#spiral" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
};

/* Pain stats — volunteer hours */
const VOLUNTEER_STATS = [
  {
    value: "10–40/mo",
    label: "deal applications, depending on group size — pre-screened by one staffer or the volunteer who drew the short straw",
    src: "the pilot measures yours",
  },
  {
    value: "“Beg & plead”",
    label: "the ACA's own deal-screening best-practices guide on filling the screening chair. It's not just your group",
    src: "ACA guide",
  },
  {
    value: "3–4 mo",
    label: "typical angel-group cycle from first contact to wire — while streamlined groups close in ~45 days. Founders notice",
    src: "Carta",
  },
  {
    value: "6–8 wks",
    label: "of member-volunteer due diligence per deal — the range angel-group guides themselves publish — starting every time from a blank page",
    src: "angel-group guides",
  },
];

/* The spiral loop */
const SPIRAL = [
  "Slow screening",
  "strong founders skip the group",
  "weaker deals at the monthly meeting",
  "members see mediocre dealflow",
  "renewals dip · best members drift to syndicates",
  "fewer volunteers",
  "screening gets slower",
];

/* How it works — seven steps */
const STEPS = [
  {
    num: "01",
    title: "Plug into the pipeline you already run",
    body: "Deals keep flowing through Dealum, Gust or your intake form — batch in, briefs out. No migration, no new system for members to learn. You get: zero workflow change.",
  },
  {
    num: "02",
    title: "Applications arrive complete",
    body: "Incomplete submissions are flagged with exactly what's missing — founders chase themselves instead of your staff chasing founders. You get: hand-holding hours back.",
  },
  {
    num: "03",
    title: "Every deck fully read — by AI reviewers, named honestly",
    body: "Independent AI reviewer lenses — team, market, traction, terms-readiness — read every page of every deal against your criteria. Not people: adversarial reads that can't anchor on each other, applied identically to deal #1 and deal #30, whichever volunteer would have drawn them. You get: the pre-screen done by Tuesday morning.",
  },
  {
    num: "04",
    title: "A one-page brief per company",
    body: "Findings, red flags, unverified claims and quotes with page references — plus the questions worth asking after a ten-minute pitch. One page a busy member actually reads. You get: comparable grounds for who presents.",
  },
  {
    num: "05",
    title: "The chair runs a meeting, not a reading marathon",
    body: "The screening committee picks the presenting companies from briefs. The job nobody wants shrinks to the part people actually enjoy — and the seat gets easier to fill. You get: a screening chair who says yes again.",
  },
  {
    num: "06",
    title: "Deliberation with disagreements on the table",
    body: "Where reviewer lenses split on a deal, the gap is flagged as an open question — exactly what member deliberation is best at. Nothing is silently averaged, and every investment decision stays individual, member by member, as it always was. You get: sharper meetings, gold sheets that write easier.",
  },
  {
    num: "07",
    title: "The deep dive starts from the brief",
    body: "Your deal lead opens the deep dive with red flags, unverified claims and verification steps already itemised with page references. When a deal syndicates across chapters, the same evidence record travels with it. And every founder who doesn't advance gets a decline-with-reasons note — reviewed by your deal lead before it's sent — in days, not weeks. You get: DD from week three, syndication on one standard.",
  },
];

/* The brief, unpacked — chain */
const EVIDENCE_CHAIN = [
  { label: "Quote", value: "“…$41k MRR across 11 accounts…” · page 7" },
  { label: "Finding", value: "Revenue is recurring and concentrated: top-3 customers are 68% of MRR." },
  { label: "Red flag", value: "Customer concentration not addressed anywhere in the deck." },
  { label: "DD step", value: "Request cohort revenue breakdown — pre-listed for the deep-dive agenda." },
  { label: "Score — optional context", value: "7.2", big: true, note: "your criteria, your weights, advisory only. Members judge; this never ranks a deal for them." },
];

/* Engagement cards */
const ENGAGE_CARDS = [
  { icon: "🪑", title: "Seats stay", body: "Screening committee, deal leads, DD teams — every member role survives. What changes is what the role costs in Tuesday nights." },
  { icon: "🔐", title: "The perimeter you can't see today", body: "Your members are already pasting founder decks into personal AI accounts you can't govern. This puts the reading inside a perimeter you control — no training on decks, retention on your policy." },
  { icon: "💌", title: "Founder reputation", body: "Fast, evidenced answers — including declines, approved by your team before sending — make founders recommend your group. That's next month's dealflow quality." },
];

const FAQ = [
  {
    q: "Our members join to exercise their own judgment.",
    a: "And that's what this protects. Nobody joined to spend Tuesday nights skimming thirty decks — they joined for the debate, the pitch, the deal. The AI reads; members do more judging than before, on better material. Screening, presenting and every individual investment decision stay with people.",
  },
  {
    q: "Dealum already has AI features.",
    a: "It does — extraction and pre-filling, and it's good workflow. What your platform's AI doesn't do is hand your screening committee an evidence-linked, page-referenced brief per company on your criteria, with disagreements flagged. Keep the pipeline; add the reading layer on top.",
  },
  {
    q: "What if the AI invents something about a deal?",
    a: "Quotes are verified against the deck before a finding stands — no quote, no finding. Thin evidence moves conclusions down, never up, and gaps are flagged as questions for the committee rather than papered over.",
  },
  {
    q: "Are founder decks confidential?",
    a: "Closed perimeter, processed only for your group's screening, never used for training, no public links — with retention and deletion on your policy. Compare that honestly with members running decks through personal chatbot accounts today.",
  },
  {
    q: "Every chapter screens differently.",
    a: "Criteria and weights are configured per chapter — and the network gains one comparable evidence standard underneath, which is exactly what makes multi-chapter syndication trustworthy.",
  },
  {
    q: "Who else uses this?",
    a: "We're building with a founding cohort of groups — which is why the entry point is one parallel batch on your own deals, not a logo wall. Your screening chair sees the briefs next to the volunteer pre-screen and judges for herself.",
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
.seg-card h3{font-size:17px;margin:12px 0 8px;font-weight:650}
.seg-card p{font-size:14.5px;line-height:1.55;color:var(--muted,#5b5670)}
.seg-spiral{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:clamp(26px,4vw,40px)}
.seg-spiral .st{background:var(--panel-2,rgba(255,255,255,.04));border:1px solid var(--border-on-dark,rgba(255,255,255,.14));border-radius:999px;padding:10px 16px;font-size:14px;color:var(--body-on-dark,rgba(255,255,255,.82))}
.seg-spiral .arr{color:var(--lavender,#a99bff);font-size:14px}
.seg-note{margin-top:clamp(24px,3vw,34px);font-size:15px;color:var(--muted,#5b5670);text-wrap:balance}
.seg-note strong{color:var(--fg,#14102d);font-weight:640}
`;

export default function AngelNetworksPage() {
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
          id="hero-angels"
          surface="ink"
          eyebrow="For angel networks & syndicates"
          titleLead="Every deal fully read before screening night. Every judgment still your "
          titleAccent="members'"
          titleTrail="."
          sub="EvalLens reads the whole monthly batch and hands your screening committee a one-page, evidence-linked brief per company — findings, red flags, quotes with page references, and the questions worth asking in a ten-minute pitch. Your Dealum or Gust pipeline stays exactly where it is."
          ctas={[
            { label: "Try one monthly batch", href: "https://calendly.com/evallens/30min" },
            { label: "All use cases", href: "/trust/use-cases", variant: "glass" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · one-page screening brief · 16:9",
            hint: "One-page screening brief UI: company header, findings with page-tagged quotes, red-flag chips, pitch questions — light Apple-style document",
            ariaLabel:
              "One-page screening brief: company header, findings with page-tagged quotes, red-flag chips, and pitch questions",
          }}
        />

        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* §2 Volunteer hours */}
        <StatBand
          id="volunteer-hours"
          eyebrow="The machine runs on volunteer hours"
          title="And volunteer hours are exactly what's scarce"
          accent="scarce"
          stats={VOLUNTEER_STATS}
        />

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §3 The spiral (page-local, the page's key block) */}
        <section id="spiral" className="band ink" aria-labelledby="seg-spiral-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>What&rsquo;s actually at stake</Eyebrow>
            <h2 id="seg-spiral-h2">
              This is how good groups quietly{" "}
              <span className="grad-word">hollow out.</span>
            </h2>
            <p className="sub">The spiral starts — or stops — at screening speed.</p>
          </div>
          <div className="wrap">
            <div className="seg-spiral" data-reveal="up" aria-label="The screening death spiral">
              {SPIRAL.map((step, i) => (
                <span key={step} style={{ display: "contents" } as CSSProperties}>
                  <span className="st">{step}</span>
                  {i < SPIRAL.length - 1 ? (
                    <span className="arr" aria-hidden="true">→</span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="sub seg-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              Founder guides now openly advise skipping angel groups over process length.
              Groups that answer founders in days — with evidence, not silence — keep the
              deal quality that keeps the members. The brief is how the meeting stays
              worth the dues.
            </p>
          </div>
        </section>

        {/* §4 How it works (ink → ink, no bridge) */}
        <Numbered
          id="how-it-works"
          version={1}
          eyebrow="How it works"
          title="Application Friday → screening night, in seven steps"
          titleAccent="seven steps"
          sub="The AI reads; members do more judging than before, on better material. Every investment decision stays individual."
          items={STEPS}
        />

        {/* §5 The brief, unpacked — chain (ink → ink, no bridge) */}
        <section id="brief" className="band ink" aria-labelledby="seg-brief-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The brief, unpacked</Eyebrow>
            <h2 id="seg-brief-h2">
              What your screening chair holds on{" "}
              <span className="grad-word">Tuesday.</span>
            </h2>
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

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §6 The engagement question (page-local) */}
        <section className="band light" aria-labelledby="seg-engage-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The engagement question, head-on</Eyebrow>
            <h2 id="seg-engage-h2">
              &ldquo;If the machine reads, what do my members{" "}
              <span className="grad-word">do?</span>&rdquo;
            </h2>
            <p className="sub">
              More of what they joined for. Screening and DD seats stay — the
              grunt-reading goes. Engagement shifts from skimming thirty decks to
              debating four good ones. The meeting gets better, and the meeting is the
              product members renew for.
            </p>
          </div>
          <div className="wrap">
            <div className="seg-cards">
              {ENGAGE_CARDS.map((c) => (
                <div key={c.title} className="seg-card" data-reveal="up">
                  <div className="ic" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className="seg-note" data-reveal="up">
              <strong>Priced for a volunteer-run budget.</strong> One small parallel
              batch to start — this month&rsquo;s deals, run alongside your pre-screen.
              If the briefs earn their seat at the screening meeting, they stay. Failed
              runs never billed. <a href="/pricing">See pricing</a> or{" "}
              <a href="https://calendly.com/evallens/30min">book a call</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §7 FAQ */}
        <JsonLd data={faqJsonLd(FAQ)} />
        <JsonLd
          data={breadcrumbJsonLd([
            ["Trust", "/trust"],
            ["Use cases", "/trust/use-cases"],
            ["Angel networks", "/trust/use-cases/angel-networks"],
          ])}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="What your board will ask"
          titleAccent="board"
          items={FAQ}
        />

        {/* §8 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="This month's batch, in"
          titleAccent="parallel."
          sub="30 minutes with your screening chair or executive director: we map your criteria and run one month of deals side by side with your pre-screen. Nothing about your process changes."
          primary={{ label: "Set up the batch", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
          auroraVariant="violet"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
