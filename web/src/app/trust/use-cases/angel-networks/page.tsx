import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import {
  StatBand,
  PinnedSteps,
  Numbered,
  Faq,
  CtaBand,
  Eyebrow,
  Cinema,
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
const SPIRAL_STEPS = [
  { num: "01", label: "Slow screening", desc: "" },
  { num: "02", label: "Strong founders skip the group", desc: "" },
  { num: "03", label: "Weaker deals at the monthly meeting", desc: "" },
  { num: "04", label: "Members see mediocre dealflow", desc: "" },
  { num: "05", label: "Renewals dip · best members drift to syndicates", desc: "" },
  { num: "06", label: "Fewer volunteers", desc: "" },
  { num: "07", label: "Screening gets slower", desc: "" },
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

/* What one screening brief gives the committee */
const BRIEF_DELIVERABLES = [
  {
    label: "Evidence",
    title: "The exact claim, linked to its source.",
    example: "“…$41k MRR across 11 accounts…” · page 7",
  },
  {
    label: "Finding",
    title: "What the evidence means against your criteria.",
    example: "Revenue is recurring and concentrated: top-3 customers are 68% of MRR.",
  },
  {
    label: "Risk",
    title: "What the deck does not prove.",
    example: "Customer concentration is not addressed anywhere in the deck.",
  },
  {
    label: "Next step",
    title: "What the committee should ask or request.",
    example: "Request a cohort revenue breakdown for the deep-dive agenda.",
  },
  {
    label: "Optional score",
    title: "Context using your criteria and weights.",
    example: "Advisory only. Members judge; the score never ranks a deal for them.",
  },
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
.page-header--angels-wide .page-header__inner{width:min(100vw,1920px);max-width:none;padding-inline:clamp(28px,1.9vw,36px)}
.seg .seg-narrow{max-width:760px}
.seg .seg-title{font-size:clamp(33px,5vw,56px);line-height:1.06;letter-spacing:-.025em;text-wrap:balance}
.seg .seg-title .grad-word{background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent}

.seg-hero-exact{position:relative;height:clamp(760px,52vw,1000px);padding:0;background:#f7f7f5;overflow:hidden}
.seg-hero-exact__stage{position:relative;width:min(100vw,1920px);height:100%;margin:0 auto}
.seg-hero-exact__copy{position:absolute;z-index:2;top:14.5%;left:5.73%;width:58%}
.seg-hero-exact__copy .eyebrow{margin-bottom:clamp(28px,2.3vw,44px)}
.seg-hero-exact__title{max-width:none;margin:0;font-size:clamp(52px,4.17vw,80px);font-weight:600;line-height:1.08;letter-spacing:-.042em;white-space:pre-line}
.seg-hero-exact__title .grad-word{background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent}
.seg-hero-exact__sub{width:66%;margin:clamp(26px,2vw,38px) 0 0;font-size:clamp(15px,1.1vw,21px);line-height:1.55;color:var(--muted)}
.seg-hero-exact__actions{display:flex;align-items:center;gap:18px;margin-top:clamp(28px,2.8vw,42px)}
.seg-hero-exact__actions .btn{min-height:56px;padding:17px 34px;justify-content:center;text-align:center;font-size:17px;line-height:1.1;font-weight:500;letter-spacing:-.02em}
.seg-hero-exact__media{position:absolute;z-index:1;top:27%;right:min(-5vw,calc((1920px - 100vw)/2 - 5vw));width:clamp(1050px,72vw,2300px);height:auto;max-width:none}

.seg .ds-statband__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.seg .ds-statband__grid li{text-align:left;padding:clamp(22px,3vw,30px);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 18px 42px -30px rgba(60,40,160,.24)}
.seg .ds-statband__grid strong{font-size:clamp(38px,5vw,60px)}
.seg .ds-statband__grid span{font-family:var(--font-ui);font-size:14px;line-height:1.5;letter-spacing:0;text-transform:none}
.seg .ds-statband__grid .ds-statband__src{font-family:var(--font-mono);font-size:10px;line-height:1.35;letter-spacing:.06em;text-transform:uppercase;margin-top:auto;padding-top:8px}

.seg #spiral .lab-pv__grid{grid-template-columns:minmax(0,.98fr) minmax(520px,1.02fr)}
.seg #spiral.lab-process{min-height:0;padding-top:clamp(72px,8vw,112px);padding-bottom:clamp(38px,4vw,59px)}
.seg #spiral .lab-process__stage{position:relative;top:auto;min-height:0;overflow:visible}
.seg #spiral .lab-pv{min-height:50svh;padding-bottom:clamp(20px,3vh,40px)}
.seg #spiral .lab-process__copy{text-align:left}
.seg #spiral .lab-process__title{font-size:clamp(44px,4.8vw,68px);line-height:1.02}
.seg #spiral .lab-process__title .lab-process__line > span{transform:none}
.seg #spiral .lab-process__copy .sub{max-width:54ch;margin-inline:0;font-size:clamp(15px,1.25vw,18px);line-height:1.62}
.seg #spiral .lab-window{max-width:620px;border-radius:24px;box-shadow:0 28px 74px rgba(35,25,92,.12)}
.seg #spiral .lab-window__title{font-size:0}
.seg #spiral .lab-window__title::after{content:'Angel network · screening loop';font-size:11px}
.seg #spiral .lab-window__row{grid-template-columns:54px minmax(0,1fr);min-height:64px;padding-inline:16px}
.seg #spiral .lab-window__status{display:none}
.seg #spiral .lab-window__rlabel{text-transform:none;letter-spacing:0;font-family:var(--font-ui);font-size:clamp(14px,1.3vw,17px);line-height:1.35}
.seg #how-it-works{padding-top:clamp(42px,5.5vw,75px)}
.seg #how-it-works .ds-numbered__head .title{max-width:24ch;white-space:pre-line}

.seg-brief-head{max-width:1120px}
.seg-brief-head .seg-title{max-width:none;font-size:clamp(48px,5.6vw,78px);line-height:.98;letter-spacing:-.05em}
.seg-brief-title-line{display:block;white-space:nowrap}
.seg-brief-head .sub{max-width:62ch;margin:clamp(24px,3vw,34px) 0 0;font-size:clamp(17px,1.55vw,21px);line-height:1.5}
.seg-brief-list{list-style:none;margin:clamp(48px,7vw,84px) 0 0;padding:0;border-top:1px solid var(--border)}
.seg-brief-row{display:grid;grid-template-columns:64px minmax(120px,.42fr) minmax(240px,.9fr) minmax(280px,1.1fr);gap:clamp(20px,3vw,48px);align-items:start;padding:clamp(26px,3.6vw,42px) 0;border-bottom:1px solid var(--border)}
.seg-brief-row__num,.seg-brief-row__label{font-family:var(--font-mono);font-size:10px;line-height:1.45;letter-spacing:.12em;text-transform:uppercase;color:var(--violet)}
.seg-brief-row h3{max-width:25ch;margin:0;font-size:clamp(20px,2vw,27px);font-weight:580;line-height:1.16;letter-spacing:-.03em;text-wrap:pretty}
.seg-brief-row p{max-width:46ch;margin:0;font-size:clamp(15px,1.35vw,18px);line-height:1.55;color:var(--muted);text-wrap:pretty}
.seg-brief-rule{display:grid;grid-template-columns:64px minmax(120px,.42fr) minmax(0,2fr);gap:clamp(20px,3vw,48px);align-items:start;padding:clamp(26px,3.6vw,42px) 0 0}
.seg-brief-rule__mark{font-family:var(--font-mono);font-size:22px;line-height:1;color:var(--violet)}
.seg-brief-rule strong{font-size:clamp(18px,1.7vw,23px);line-height:1.25;letter-spacing:-.02em}
.seg-brief-rule p{max-width:62ch;margin:0;font-size:15px;line-height:1.6;color:var(--muted)}

.seg-engage{list-style:none;margin:clamp(38px,5vw,62px) 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.seg-engage li{display:flex;min-width:0;min-height:278px;flex-direction:column;padding:clamp(26px,3.2vw,40px)}
.seg-engage li+li{border-left:1px solid var(--border)}
.seg-engage .num{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--violet)}
.seg-engage h3{margin:clamp(44px,6vw,72px) 0 18px;max-width:14ch;font-size:clamp(22px,2.35vw,30px);line-height:1.08;letter-spacing:-.035em}
.seg-engage p{margin:auto 0 0;max-width:38ch;font-size:14px;line-height:1.6;color:var(--muted)}
.seg-engagement__head{margin-left:auto;margin-right:auto}
.seg-engagement__head .seg-title{max-width:16ch}
.seg-engagement__head .sub{max-width:66ch}
.seg-note{position:relative;max-width:none;margin-top:clamp(28px,4vw,42px);padding:clamp(24px,3vw,32px) clamp(26px,3.4vw,40px);border:1px solid color-mix(in oklab,var(--violet) 14%,var(--border));border-left:4px solid var(--violet);border-radius:0 18px 18px 0;background:color-mix(in oklab,var(--violet) 5%,#fff);font-size:clamp(16px,1.45vw,19px);line-height:1.55;color:var(--fg)}
.seg-note strong{display:block;margin-bottom:8px;font-size:clamp(19px,1.8vw,24px);line-height:1.2;letter-spacing:-.025em;color:var(--fg);font-weight:650}
.seg-note a{color:var(--violet);text-decoration-color:color-mix(in oklab,var(--violet) 36%,transparent);text-underline-offset:3px}
.seg-hard-divider{height:1px;background:var(--border)}
.seg #brief,.seg .seg-engagement{padding-top:clamp(72px,8vw,112px);padding-bottom:clamp(76px,8vw,118px)}

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
  .seg #volunteer-hours{padding-bottom:clamp(36px,4.5vw,60px)}
  .seg #spiral.lab-process{padding-top:clamp(36px,4vw,56px)}
  .seg #spiral .lab-pv{padding-top:clamp(20px,3vh,40px)}
  .seg-hero-exact{height:auto;padding:clamp(92px,14vw,126px) 0 24px}
  .seg-hero-exact__stage{width:min(calc(100% - 40px),760px)}
  .seg-hero-exact__copy{position:relative;top:auto;left:auto;width:100%}
  .seg-hero-exact__copy .eyebrow{margin-bottom:24px}
  .seg-hero-exact__title{max-width:13ch;font-size:clamp(42px,7.25vw,58px);white-space:normal;text-wrap:balance}
  .seg-hero-exact__sub{width:min(100%,48ch);font-size:16px}
  .seg-hero-exact__media{position:relative;top:auto;right:auto;width:138%;margin:-2% -19% -8%}
  .seg #spiral .lab-pv__grid{grid-template-columns:1fr}
  .seg-brief-title-line{white-space:normal}
  .seg-brief-row{grid-template-columns:48px minmax(110px,.38fr) minmax(0,1fr)}
  .seg-brief-row p{grid-column:3}
  .seg-brief-rule{grid-template-columns:48px minmax(110px,.38fr) minmax(0,1fr)}
  .seg-related__grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:880px){
  .seg #questions-cinema .ds-cinema__copy{top:66%}
}
@media (max-width:720px){
  .seg #how-it-works .ds-numbered__head .title{white-space:normal}
  .seg-brief-row{grid-template-columns:42px 1fr;gap:12px 18px}
  .seg-brief-row h3,.seg-brief-row p{grid-column:2}
  .seg-brief-rule{grid-template-columns:42px 1fr;gap:12px 18px}
  .seg-brief-rule p{grid-column:2}
  .seg-engage{grid-template-columns:1fr}
  .seg-engage li{min-height:0;padding:28px 0}
  .seg-engage li+li{border-top:1px solid var(--border);border-left:0}
  .seg-engage h3{margin:26px 0 14px;max-width:none}
  .seg-engage p{margin:0}
}
@media (max-width:620px){
  .seg-hero-exact{padding-top:86px}
  .seg-hero-exact__stage{width:min(calc(100% - 32px),560px)}
  .seg-hero-exact__title{max-width:11ch;font-size:clamp(36px,11.2vw,50px);line-height:1.02}
  .seg-hero-exact__sub{margin-top:22px;font-size:15px}
  .seg-hero-exact__actions{width:100%;flex-direction:column;align-items:stretch;gap:10px}
  .seg-hero-exact__actions .btn{width:100%;min-height:48px;padding:13px 20px;flex:none;font-size:15px;line-height:1;font-weight:400;letter-spacing:0}
  .seg-hero-exact__media{width:126%;margin:8px -13% -3%}
  .seg .ds-statband__grid{grid-template-columns:1fr}
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
      <PageHeader nav={HEADER_NAV} theme="light" className="page-header--angels-wide" />
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
                <Button href="/#demo" variant="gradient" data-partner-access="true">
                  Try one monthly batch
                </Button>
                <Button href="/trust/use-cases#sample-output" variant="ghost">
                  See a sample report
                </Button>
              </div>
            </div>
            <Image
              className="seg-hero-exact__media"
              src="/assets/use-cases/angel-networks/evidence-brief-stack-v2.webp"
              alt="A stack of evidence-linked screening briefs prepared for an angel network"
              width={3072}
              height={2048}
              sizes="(max-width: 900px) 120vw, 72vw"
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

        {/* §3 The spiral — PinnedSteps v2 keeps the complete context on the left
            while the sequential screening-loop rows occupy the right-hand window. */}
        <PinnedSteps
          id="spiral"
          surface="light"
          version={2}
          ariaLabel="The angel-group screening spiral"
          eyebrow="What’s actually at stake"
          title={{
            line1: "This is how good groups",
            line2: "quietly",
            line2Accent: "hollow out.",
          }}
          sub="The spiral starts — or stops — at screening speed. Founder guides now openly advise skipping angel groups over process length. Groups that answer founders in days — with evidence, not silence — keep the deal quality that keeps the members. The brief is how the meeting stays worth the dues."
          steps={SPIRAL_STEPS}
          media={{
            ratio: "4/3",
            label: "Screening loop",
            hint: "Seven connected stages in the angel-group screening spiral",
            ariaLabel: "Seven connected stages in the angel-group screening spiral",
          }}
        />
        {/* §4 How it works (ink → ink, no bridge) */}
        <Numbered
          id="how-it-works"
          surface="soft"
          version={1}
          eyebrow="How it works"
          title={"Seven steps from application\nto investment screening"}
          titleAccent="Seven steps"
          sub="Every application becomes a screening-ready, evidence-linked brief. Every decision stays with your members."
          items={STEPS}
        />

        {/* §5 The brief, unpacked */}
        <section id="brief" className="band light" aria-labelledby="seg-brief-h2">
          <div className="wrap">
            <header className="seg-brief-head" data-reveal="up">
              <div>
                <Eyebrow>The screening brief</Eyebrow>
                <h2 id="seg-brief-h2" className="title seg-title">
                  <span className="seg-brief-title-line">What your committee gets</span>
                  <span className="seg-brief-title-line grad-word">before screening night.</span>
                </h2>
              </div>
              <p className="sub">
                One page per company: the evidence, what it means, what is missing,
                and what your committee should ask next.
              </p>
            </header>

            <ol className="seg-brief-list" aria-label="Contents of a screening brief">
              {BRIEF_DELIVERABLES.map((item, index) => (
                <li className="seg-brief-row" key={item.label} data-reveal="up">
                  <span className="seg-brief-row__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="seg-brief-row__label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.example}</p>
                </li>
              ))}
            </ol>

            <aside className="seg-brief-rule" data-reveal="up">
              <span className="seg-brief-rule__mark" aria-hidden="true">↳</span>
              <strong>No quote, no finding.</strong>
              <p>
                Every conclusion must trace back to the deck. If the evidence is thin,
                the brief turns the gap into a question for the committee — never a stronger claim.
              </p>
            </aside>
          </div>
        </section>

        {/* §6 The engagement question (page-local) */}
        <section className="band soft seg-engagement" aria-labelledby="seg-engage-h2">
          <div className="wrap seg-engagement__head" data-reveal="up">
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

        <div className="seg-hard-divider" aria-hidden="true" />

        <Cinema
          id="questions-cinema"
          surface="ink"
          headline="Want more? Ask the harder questions."
          lines={["Want more?", "Ask the harder questions."]}
          mobileLines={["Want more?", "Ask the harder", "questions."]}
          sub="See how EvalLens fits your existing pipeline, keeps every finding traceable to the deck, protects founder data, and leaves every investment decision with your members."
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
          }}
          maskId="angel-network-questions"
        />

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
          bleed
          videoSrc="/assets/cta/cube-1.mp4"
          videoPoster="/assets/cta/cube-1-poster.webp"
          eyebrow="Next step"
          title="This month's batch, in"
          titleAccent="parallel."
          sub="30 minutes with your screening chair or executive director: we map your criteria and run one month of deals side by side with your pre-screen. Nothing about your process changes. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Set up the batch", href: "/#demo", partnerAccess: true }}
          secondary={{ label: "hello@evallens.io", href: "mailto:hello@evallens.io" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
