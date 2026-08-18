import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import {
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
  { title: "Seats stay", body: "Screening committee, deal leads, DD teams — every member role survives. What changes is what the role costs in Tuesday nights." },
  { title: "The perimeter you can't see today", body: "Your members are already pasting founder decks into personal AI accounts you can't govern. This puts the reading inside a perimeter you control — no training on decks, retention on your policy." },
  { title: "Founder reputation", body: "Fast, evidenced answers — including declines, approved by your team before sending — make founders recommend your group. That's next month's dealflow quality." },
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

const OTHER_USE_CASES = [
  {
    tag: "Pitch competitions",
    headline: "Every entry gets a full read. Every rank carries its receipts.",
    href: "/trust/use-cases/pitch-competitions",
  },
  {
    tag: "Hackathons",
    headline: "Every project gets a full read before the expo floor opens.",
    href: "/trust/use-cases/hackathons",
  },
  {
    tag: "VC open calls",
    headline: "Your open call, actually read.",
    href: "/trust/use-cases/vc-open-calls",
  },
  {
    tag: "Accelerators",
    headline: "Every application gets a full read. Every rejection gets a reason.",
    href: "/trust/use-cases/accelerators",
  },
  {
    tag: "Corporate innovation",
    headline: "From challenge statement to a signed PoC.",
    href: "/trust/use-cases/corporate-innovation",
  },
  {
    tag: "Grants & prizes",
    headline: "Every score survives the audit.",
    href: "/trust/use-cases/grants-prizes",
  },
  {
    tag: "Crowdfunding platforms",
    headline: "Screen project owners in days. Keep the file.",
    href: "/trust/use-cases/crowdfunding",
  },
  {
    tag: "Tenders & RFPs",
    headline: "Awards that survive the challenge.",
    href: "/trust/use-cases/tenders",
  },
];

const SEG_STYLES = `
.seg .seg-narrow{max-width:760px}
.seg .seg-title{font-size:clamp(33px,5vw,56px);line-height:1.06;letter-spacing:-.025em;text-wrap:balance}
.seg .seg-title .grad-word{background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent}

.seg-hero-exact{position:relative;height:clamp(760px,56vw,1075px);padding:0;background:#f7f7f5;overflow:hidden}
.seg-hero-exact__stage{position:relative;width:min(100vw,1920px);height:100%;margin:0 auto}
.seg-hero-exact__copy{position:absolute;z-index:2;top:14.5%;left:5.73%;width:58%}
.seg-hero-exact__copy .eyebrow{margin-bottom:clamp(28px,2.3vw,44px)}
.seg-hero-exact__title{max-width:none;margin:0;font-size:clamp(52px,4.17vw,80px);font-weight:600;line-height:1.08;letter-spacing:-.042em;white-space:pre-line}
.seg-hero-exact__title .grad-word{background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent}
.seg-hero-exact__sub{width:66%;margin:clamp(26px,2vw,38px) 0 0;font-size:clamp(15px,1.1vw,21px);line-height:1.55;color:var(--muted)}
.seg-hero-exact__actions{display:flex;align-items:center;gap:18px;margin-top:clamp(28px,2.8vw,42px)}
.seg-hero-exact__media{position:absolute;z-index:1;top:29.5%;right:-4%;width:78%;height:auto;max-width:none}

.seg .ds-statband__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.seg .ds-statband__grid li{text-align:left;padding:clamp(22px,3vw,30px);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 18px 42px -30px rgba(60,40,160,.24)}
.seg .ds-statband__grid strong{font-size:clamp(38px,5vw,60px)}
.seg .ds-statband__grid span{font-family:var(--font-ui);font-size:14px;line-height:1.5;letter-spacing:0;text-transform:none}
.seg .ds-statband__grid .ds-statband__src{font-family:var(--font-mono);font-size:10px;line-height:1.35;letter-spacing:.06em;text-transform:uppercase;margin-top:auto;padding-top:8px}

.seg-spiral-layout{display:grid;grid-template-columns:minmax(0,.82fr) minmax(480px,1.18fr);gap:clamp(48px,8vw,110px);align-items:start}
.seg-spiral-copy{padding-top:10px}
.seg-spiral-note{margin-top:clamp(26px,4vw,42px)!important;max-width:52ch}
.seg-spiral-flow{list-style:none;margin:0;padding:18px 26px 18px 18px;border:1px solid var(--border);border-radius:24px;background:rgba(255,255,255,.78);box-shadow:0 22px 70px rgba(24,20,44,.07);overflow:hidden}
.seg-spiral-flow li{position:relative;display:grid;grid-template-columns:54px minmax(0,1fr);align-items:center;width:calc(100% - 54px);min-height:66px;padding:13px 18px;border-bottom:1px solid var(--border);color:var(--fg);font-size:clamp(15px,1.15vw,17px);line-height:1.35}
.seg-spiral-flow li:nth-child(2),.seg-spiral-flow li:nth-child(6){transform:translateX(18px)}
.seg-spiral-flow li:nth-child(3),.seg-spiral-flow li:nth-child(5){transform:translateX(36px)}
.seg-spiral-flow li:nth-child(4){transform:translateX(54px)}
.seg-spiral-flow li:last-child{border-bottom:0}
.seg-spiral-flow li::before{content:attr(data-step);font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--violet)}
.seg-spiral-flow li:not(:last-child)::after{content:'↓';position:absolute;left:28px;bottom:-11px;z-index:1;display:grid;width:18px;height:18px;place-items:center;border-radius:50%;background:#fff;color:var(--lavender);font-size:11px}
.seg-spiral-flow li:last-child::after{content:'↺';position:absolute;right:12px;color:var(--violet);font-size:22px}

.seg-brief-sheet{margin-top:clamp(34px,5vw,58px);border:1px solid var(--border);border-radius:26px;background:#fff;box-shadow:0 24px 76px rgba(24,20,44,.08);overflow:hidden}
.seg-brief-top{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(250px,.55fr)}
.seg-brief-main{padding:clamp(28px,4vw,48px)}
.seg-brief-field+.seg-brief-field{margin-top:clamp(30px,4vw,48px);padding-top:clamp(26px,3vw,36px);border-top:1px solid var(--border)}
.seg-brief-label{display:block;margin-bottom:14px;font-family:var(--font-mono);font-size:11px;line-height:1.4;letter-spacing:.12em;text-transform:uppercase;color:var(--violet)}
.seg-brief-quote{font-size:clamp(18px,2vw,24px);line-height:1.45;color:var(--fg)}
.seg-brief-finding{max-width:26ch;font-size:clamp(24px,3vw,38px);line-height:1.12;letter-spacing:-.035em;color:var(--fg)}
.seg-brief-score{display:flex;flex-direction:column;justify-content:space-between;padding:clamp(28px,4vw,48px);border-left:1px solid var(--border);background:color-mix(in oklab,var(--violet) 5%,#fff)}
.seg-brief-score strong{display:block;margin:18px 0 22px;font-family:var(--font-mono);font-size:clamp(58px,7vw,86px);font-weight:500;line-height:.9;letter-spacing:-.08em;color:var(--violet)}
.seg-brief-score p{margin:0;font-size:13px;line-height:1.55;color:var(--muted)}
.seg-brief-bottom{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border)}
.seg-brief-action{padding:clamp(24px,3.5vw,38px) clamp(28px,4vw,48px);font-size:clamp(16px,1.5vw,19px);line-height:1.5;color:var(--fg)}
.seg-brief-action+.seg-brief-action{border-left:1px solid var(--border)}
.seg-brief-action--risk{background:color-mix(in oklab,var(--amber) 5%,#fff)}
.seg-brief-action--risk .seg-brief-label{color:var(--amber-ink)}
.seg-brief-action--step{background:color-mix(in oklab,var(--aqua) 4%,#fff)}

.seg-engage{list-style:none;margin:clamp(38px,5vw,62px) 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.seg-engage li{display:flex;min-width:0;min-height:278px;flex-direction:column;padding:clamp(26px,3.2vw,40px)}
.seg-engage li+li{border-left:1px solid var(--border)}
.seg-engage .num{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--violet)}
.seg-engage h3{margin:clamp(44px,6vw,72px) 0 18px;max-width:14ch;font-size:clamp(22px,2.35vw,30px);line-height:1.08;letter-spacing:-.035em}
.seg-engage p{margin:auto 0 0;max-width:38ch;font-size:14px;line-height:1.6;color:var(--muted)}
.seg-note{margin-top:clamp(28px,4vw,42px);font-size:15px;line-height:1.6;color:var(--muted);max-width:78ch}
.seg-note strong{color:var(--fg);font-weight:650}
.seg #spiral,.seg #brief,.seg .seg-engagement{padding-top:clamp(72px,8vw,112px);padding-bottom:clamp(76px,8vw,118px)}

.seg-related{padding-top:clamp(76px,9vw,124px);padding-bottom:clamp(80px,10vw,140px)}
.seg-related__head{max-width:760px;margin-bottom:clamp(34px,5vw,60px)}
.seg-related__head .title{font-size:clamp(34px,4.6vw,54px);line-height:1.06;letter-spacing:-.025em}
.seg-related .grad-word{background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent}
.seg-related__grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.seg-related__card{position:relative;display:flex;min-height:190px;flex-direction:column;padding:22px;border:1px solid var(--border-on-dark-2);border-radius:18px;background:var(--panel-2);transition:transform .3s var(--ease),border-color .3s var(--ease),background .3s var(--ease)}
.seg-related__card:hover{transform:translateY(-3px);border-color:var(--border-on-dark);background:color-mix(in oklab,var(--panel-2) 90%,var(--violet))}
.seg-related__card:focus-visible{outline:2px solid var(--lavender);outline-offset:3px}
.seg-related__tag{font-family:var(--font-mono);font-size:10px;line-height:1.4;letter-spacing:.12em;text-transform:uppercase;color:var(--lavender)}
.seg-related__headline{margin-top:18px;font-size:clamp(17px,1.65vw,20px);line-height:1.25;letter-spacing:-.012em;color:var(--fg-on-dark);text-wrap:pretty}
.seg-related__arrow{margin-top:auto;padding-top:24px;color:var(--muted-on-dark);transition:transform .3s var(--ease),color .3s var(--ease)}
.seg-related__card:hover .seg-related__arrow{transform:translateX(4px);color:var(--fg-on-dark)}

@media (max-width:900px){
  .seg-hero-exact{height:auto;padding:clamp(92px,14vw,126px) 0 24px}
  .seg-hero-exact__stage{width:min(calc(100% - 40px),760px)}
  .seg-hero-exact__copy{position:relative;top:auto;left:auto;width:100%}
  .seg-hero-exact__copy .eyebrow{margin-bottom:24px}
  .seg-hero-exact__title{max-width:13ch;font-size:clamp(46px,8.5vw,68px);white-space:normal;text-wrap:balance}
  .seg-hero-exact__sub{width:min(100%,48ch);font-size:16px}
  .seg-hero-exact__media{position:relative;top:auto;right:auto;width:138%;margin:-2% -19% -8%}
  .seg-spiral-layout{grid-template-columns:1fr;gap:42px}
  .seg-spiral-copy{max-width:700px;padding-top:0}
  .seg-related__grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:720px){
  .seg-brief-top{grid-template-columns:1fr}
  .seg-brief-score{border-top:1px solid var(--border);border-left:0}
  .seg-brief-score strong{margin-bottom:16px}
  .seg-brief-bottom{grid-template-columns:1fr}
  .seg-brief-action+.seg-brief-action{border-top:1px solid var(--border);border-left:0}
  .seg-engage{grid-template-columns:1fr}
  .seg-engage li{min-height:0;padding:28px 0}
  .seg-engage li+li{border-top:1px solid var(--border);border-left:0}
  .seg-engage h3{margin:26px 0 14px;max-width:none}
  .seg-engage p{margin:0}
}
@media (max-width:620px){
  .seg-hero-exact{padding-top:86px}
  .seg-hero-exact__stage{width:min(calc(100% - 32px),560px)}
  .seg-hero-exact__title{max-width:11ch;font-size:clamp(42px,13vw,58px);line-height:1.02}
  .seg-hero-exact__sub{margin-top:22px;font-size:15px}
  .seg-hero-exact__actions{width:100%;flex-direction:column;align-items:stretch;gap:10px}
  .seg-hero-exact__actions .btn{width:100%;min-height:44px;flex:none}
  .seg-hero-exact__media{width:126%;margin:8px -13% -3%}
  .seg .ds-statband__grid{grid-template-columns:1fr}
  .seg-spiral-flow{padding:10px 14px}
  .seg-spiral-flow li,.seg-spiral-flow li:nth-child(n){width:100%;min-height:62px;padding:12px 8px;transform:none}
  .seg-spiral-flow li:last-child::after{right:4px}
  .seg-related__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .seg-related__card{min-height:176px;padding:16px}
  .seg-related__tag{font-size:9px;letter-spacing:.09em}
  .seg-related__headline{font-size:15px;line-height:1.28;margin-top:14px}
  .seg-related__arrow{font-size:12px;padding-top:18px}
}
`;

export default function AngelNetworksPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="light" />
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
        {/* §1 Hero — page-local composition measured from the approved 1536×860 reference. */}
        <section id="hero-angels" className="seg-hero-exact light" aria-labelledby="hero-angels-title">
          <div className="seg-hero-exact__stage">
            <div className="seg-hero-exact__copy">
              <Eyebrow>For angel networks & syndicates</Eyebrow>
              <h1 id="hero-angels-title" className="seg-hero-exact__title">
                {"Every deal fully read before\nscreening night. Every judgment\nstill your "}
                <span className="grad-word">members</span>.
              </h1>
              <p className="seg-hero-exact__sub">
                EvalLens reads the whole monthly batch and hands your screening committee a
                one-page, evidence-linked brief per company — findings, red flags, quotes with
                page references, and the questions worth asking in a ten-minute pitch. Your
                Dealum or Gust pipeline stays exactly where it is.
              </p>
              <div className="seg-hero-exact__actions">
                <Button href="https://calendly.com/evallens/30min" variant="gradient">
                  Try one monthly batch
                </Button>
                <Button href="/trust/use-cases#sample-output" variant="ghost">
                  See a sample report
                </Button>
              </div>
            </div>
            <Image
              className="seg-hero-exact__media"
              src="/assets/use-cases/angel-networks/evidence-brief-stack.png"
              alt="A stack of evidence-linked screening briefs prepared for an angel network"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 120vw, 78vw"
              priority
            />
          </div>
        </section>

        {/* §2 Volunteer hours */}
        <StatBand
          id="volunteer-hours"
          eyebrow="The machine runs on volunteer hours"
          title="And volunteer hours are exactly what's scarce"
          accent="scarce"
          stats={VOLUNTEER_STATS}
        />

        {/* §3 The spiral (page-local, the page's key block) */}
        <section id="spiral" className="band light" aria-labelledby="seg-spiral-h2">
          <div className="wrap seg-spiral-layout">
            <div className="seg-spiral-copy" data-reveal="up">
              <Eyebrow>What&rsquo;s actually at stake</Eyebrow>
              <h2 id="seg-spiral-h2" className="title seg-title">
                This is how good groups quietly <span className="grad-word">hollow out.</span>
              </h2>
              <p className="sub">The spiral starts — or stops — at screening speed.</p>
              <p className="sub seg-spiral-note">
                Founder guides now openly advise skipping angel groups over process length.
                Groups that answer founders in days — with evidence, not silence — keep the
                deal quality that keeps the members. The brief is how the meeting stays
                worth the dues.
              </p>
            </div>
            <ol className="seg-spiral-flow" data-reveal="up" aria-label="The screening death spiral">
              {SPIRAL.map((step, i) => (
                <li key={step} data-step={String(i + 1).padStart(2, "0")}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* §4 How it works (ink → ink, no bridge) */}
        <Numbered
          id="how-it-works"
          surface="soft"
          version={1}
          eyebrow="How it works"
          title="Seven steps from application to investment screening"
          titleAccent="Seven steps"
          sub="Every application becomes a screening-ready, evidence-linked brief. Every decision stays with your members."
          items={STEPS}
        />

        {/* §5 The brief, unpacked */}
        <section id="brief" className="band light" aria-labelledby="seg-brief-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The brief, unpacked</Eyebrow>
            <h2 id="seg-brief-h2" className="title seg-title">
              What your screening chair holds on <span className="grad-word">Tuesday.</span>
            </h2>
          </div>
          <div className="wrap">
            <article className="seg-brief-sheet" data-reveal="up" aria-label="Example one-page screening brief">
              <div className="seg-brief-top">
                <div className="seg-brief-main">
                  <div className="seg-brief-field">
                    <span className="seg-brief-label">{EVIDENCE_CHAIN[0].label}</span>
                    <div className="seg-brief-quote">{EVIDENCE_CHAIN[0].value}</div>
                  </div>
                  <div className="seg-brief-field">
                    <span className="seg-brief-label">{EVIDENCE_CHAIN[1].label}</span>
                    <div className="seg-brief-finding">{EVIDENCE_CHAIN[1].value}</div>
                  </div>
                </div>
                <aside className="seg-brief-score">
                  <div>
                    <span className="seg-brief-label">{EVIDENCE_CHAIN[4].label}</span>
                    <strong>{EVIDENCE_CHAIN[4].value}</strong>
                  </div>
                  <p>{EVIDENCE_CHAIN[4].note}</p>
                </aside>
              </div>
              <div className="seg-brief-bottom">
                <div className="seg-brief-action seg-brief-action--risk">
                  <span className="seg-brief-label">{EVIDENCE_CHAIN[2].label}</span>
                  {EVIDENCE_CHAIN[2].value}
                </div>
                <div className="seg-brief-action seg-brief-action--step">
                  <span className="seg-brief-label">{EVIDENCE_CHAIN[3].label}</span>
                  {EVIDENCE_CHAIN[3].value}
                </div>
              </div>
            </article>
            <p className="sub seg-narrow" style={{ marginTop: "28px" } as CSSProperties}>
              Quotes are verified against the deck before a finding stands. No quote, no
              finding.
            </p>
          </div>
        </section>

        {/* §6 The engagement question (page-local) */}
        <section className="band soft seg-engagement" aria-labelledby="seg-engage-h2">
          <div className="wrap seg-narrow" data-reveal="up">
            <Eyebrow>The engagement question, head-on</Eyebrow>
            <h2 id="seg-engage-h2" className="title seg-title">
              &ldquo;If the machine reads, what do my members <span className="grad-word">do?</span>&rdquo;
            </h2>
            <p className="sub">
              More of what they joined for. Screening and DD seats stay — the
              grunt-reading goes. Engagement shifts from skimming thirty decks to
              debating four good ones. The meeting gets better, and the meeting is the
              product members renew for.
            </p>
          </div>
          <div className="wrap">
            <ol className="seg-engage">
              {ENGAGE_CARDS.map((c, index) => (
                <li key={c.title} data-reveal="up">
                  <span className="num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </li>
              ))}
            </ol>
            <p className="seg-note" data-reveal="up">
              <strong>Priced for a volunteer-run budget.</strong> One small parallel
              batch to start — this month&rsquo;s deals, run alongside your pre-screen.
              If the briefs earn their seat at the screening meeting, they stay. Failed
              runs never billed. <a href="/pricing">See pricing</a> or{" "}
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

        {/* §8 Open rail to the other segment pages. All links are visible in
            the desktop grid; mobile keeps the same cards in a two-row rail. */}
        <section className="band ink seg-related" aria-labelledby="seg-related-h2">
          <div className="wrap">
            <div className="seg-related__head" data-reveal="up">
              <Eyebrow>More use cases</Eyebrow>
              <h2 id="seg-related-h2" className="title">
                The same evidence standard, in <span className="grad-word">every review room.</span>
              </h2>
            </div>
            <nav className="seg-related__grid" aria-label="Other EvalLens use cases">
              {OTHER_USE_CASES.map((item) => (
                <a key={item.href} className="seg-related__card" href={item.href} data-reveal="up">
                  <span className="seg-related__tag">{item.tag}</span>
                  <span className="seg-related__headline">{item.headline}</span>
                  <span className="seg-related__arrow" aria-hidden="true">View use case →</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* §9 Final CTA */}
        <CtaBand
          theme="dark"
          eyebrow="Next step"
          title="This month's batch, in"
          titleAccent="parallel."
          sub="30 minutes with your screening chair or executive director: we map your criteria and run one month of deals side by side with your pre-screen. Nothing about your process changes. The first run is free through August 31, for batches up to 10 decks."
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
