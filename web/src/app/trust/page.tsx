import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

/** Header nav for this page — anchors to its own sections. The section name
 *  links to this hub itself (/trust). */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Map", href: "#map" },
    { label: "Layers", href: "#flow" },
    { label: "Where", href: "#where" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Trust: Methodology, Reliability & Security",
  description:
    "Why you can trust EvalLense results — methodology, consistency, prompt-injection safety and data security. Pick a page in the Trust section.",
};

/*
 * ── /trust — section HUB (разводящая) ────────────────────────────────────
 * A lightweight Apple-grade wayfinding page: open it, understand why the
 * results are trustworthy, and reach any Trust page in one click. It names the
 * layers of trust and routes onward — it does not duplicate each page's depth.
 * Content is confirmed in the brief (wiki/product/trust.md) and sitemap §Trust.
 * Numeric reliability guarantees stay on Consistency & Reliability — not here.
 *
 * ── IMAGE / VISUAL SLOTS (generator not wired up → visible .media-ph) ──────
 * 1. hero (section 1) — 16:9
 *    Layered lenses settling into one focus of trust.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft layered depth, hairline structure, calm; no security theatre.
 * 2. flow (section 4, beside the pinned layers) — 4:3
 *    Method → Consistency → Safety → Security as stacked lens layers, one lit.
 *    Prompt: same tokens, ink surface, thin layer-lines, one lens-lit layer.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Generic ScrollFX engine via data-attributes only (data-reveal / data-pin).
 * <ScrollFX/> is mounted once after <Footer/>. reduced-motion handled by the
 * engine + the .hub @media blocks. No per-section useEffect.
 */

/* 3. Section map — bento directory of the five Trust pages (brief §3). */
const TILES = [
  {
    tag: "Methodology",
    title: "How decks are evaluated",
    body: "Criteria-based evaluation, judge roles, the scoring model and the rubric system — the science behind the score.",
    href: "/trust/methodology",
    feature: true,
  },
  {
    tag: "Consistency & Reliability",
    title: "Stable, repeatable scores",
    body: "Multi-judge evaluation, variance analysis, repeatability and confidence checks.",
    href: "/trust/consistency-reliability",
  },
  {
    tag: "Prompt Injection Safety",
    title: "Instructions can't hijack scoring",
    body: "Hidden instructions inside a deck are treated as content, never as system commands.",
    href: "/trust/prompt-injection-safety",
  },
  {
    tag: "Security & Privacy",
    title: "Private deck handling",
    body: "Access-controlled workspace, secure report delivery and a human-controlled final decision.",
    href: "/trust/security-privacy",
  },
  {
    tag: "Use Cases",
    title: "Where EvalLense applies",
    body: "The decisions and programs the evaluation supports, from VC funds to universities.",
    href: "/trust/use-cases",
  },
];

/* 4. Layers of trust — 4 layers revealed through the pin engine (brief §4). */
const FLOW = [
  {
    num: "01",
    label: "How we evaluate",
    desc: "Criteria-based scoring with defined judge roles and a rubric — not a generic AI impression.",
    linkLabel: "Methodology",
    href: "/trust/methodology",
  },
  {
    num: "02",
    label: "How stable it is",
    desc: "Several judges, variance analysis and repeatability checks keep scores consistent.",
    linkLabel: "Consistency & Reliability",
    href: "/trust/consistency-reliability",
  },
  {
    num: "03",
    label: "How the scoring is protected",
    desc: "Hidden instructions in a deck cannot override the evaluation rules.",
    linkLabel: "Prompt Injection Safety",
    href: "/trust/prompt-injection-safety",
  },
  {
    num: "04",
    label: "How data is handled",
    desc: "Private workspace, controlled access and secure delivery — the human keeps the final call.",
    linkLabel: "Security & Privacy",
    href: "/trust/security-privacy",
  },
];

/* 5. Where it's applied — use-case segments (brief §5, sitemap §Use Cases). */
const SEGMENTS = [
  { name: "VC funds", note: "Screen inbound decks at batch scale." },
  { name: "Accelerators", note: "Rank cohorts consistently before selection." },
  { name: "Angel investors", note: "A structured read on early-stage decks." },
  { name: "Corporate innovation", note: "Evaluate internal and partner pitches." },
  { name: "Startup competitions", note: "Score entries against shared criteria." },
  { name: "Grant programs", note: "Comparable evaluation across applicants." },
  { name: "Hackathons", note: "Fast, repeatable judging of project pitches." },
  { name: "Universities", note: "Teach and assess pitch quality at scale." },
];

export default function TrustHubPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="hub trust-hub">
        {/* 1. Hero — statement-hero, light. */}
        <section className="band soft hub-hero">
          <div className="wrap hub-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Trust
            </span>
            <h1
              className="hub-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Why you can trust the{" "}
              <span className="grad-word">results</span>
            </h1>
            <p
              className="sub hub-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Methodology, score stability, protection from prompt injection and
              data security — each layer of trust is its own page. Start
              wherever your question is.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph hub-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="Layered lenses settling into one focus of trust"
            >
              <span className="media-ph__label">
                Image · layers of trust · 16:9
              </span>
              <span className="media-ph__hint">
                Layered lenses settle into one focus — lens-gradient
                violet→cyan→aqua, calm; see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Full-bleed statement — DARK. */}
        <section className="band ink hub-statement">
          <div className="wrap">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              What the trust layer is
            </span>
            <p className="hub-statement__text" data-reveal="up">
              EvalLense scores by{" "}
              <span className="grad-word">structured rules</span> — judge roles,
              rubrics and weights — not by an AI&apos;s general impression.
            </p>
            <p
              className="hub-statement__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              The evaluation stays controllable and explainable, and the final
              decision always rests with a person.
            </p>
          </div>
        </section>

        {/* 3. Section map — bento directory of link tiles, light. */}
        <section id="map" className="band hub-map">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The section, mapped
              </span>
              <h2 className="title">Five pages, <span className="grad-word">one click away</span></h2>
              <p className="sub">
                Each layer of trust is its own page. Open the one that answers
                your question.
              </p>
            </div>
            <div className="hub-map__grid" data-reveal="up">
              {TILES.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={
                    t.feature ? "hub-tile hub-tile--feature" : "hub-tile"
                  }
                >
                  <span className="mini-tag">{t.tag}</span>
                  <h3 className="hub-tile__h">{t.title}</h3>
                  <p className="hub-tile__p">{t.body}</p>
                  <span className="hub-tile__more">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Layers of trust — pinned multi-screen, DARK. */}
        <section
          id="flow"
          className="band ink hub-flow"
          data-pin
          data-pin-steps="4"
          aria-label="Layers of trust — four layers"
        >
          <div className="hub-flow__stage" data-pin-stage>
            <div className="wrap hub-flow__grid">
              <div className="hub-flow__col">
                <div className="head hub-flow__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    Layers of trust
                  </span>
                  <h2 className="title">Trust, <span className="grad-word">one layer at a time</span></h2>
                  <p className="sub">
                    Confidence in a score builds across four layers. Each lights
                    up as you scroll — follow it to its page.
                  </p>
                </div>
                <ol className="hub-flow__track">
                  {FLOW.map((s, i) => (
                    <li
                      key={s.label}
                      className="hub-fstep"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="hub-fstep__num">{s.num}</span>
                      <span className="hub-fstep__label">{s.label}</span>
                      <span className="hub-fstep__desc">{s.desc}</span>
                      <Link href={s.href} className="hub-fstep__link">
                        {s.linkLabel} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
              {/* flow visual slot — see prompt 2 in file header */}
              <figure
                className="media-ph hub-flow__media"
                style={{ ["--ratio" as string]: "4/3" }}
                role="img"
                aria-label="Method, Consistency, Safety and Security as stacked lens layers with one lit"
              >
                <span className="media-ph__label">
                  Image · trust layers · 4:3
                </span>
                <span className="media-ph__hint">
                  Method → Consistency → Safety → Security as stacked lens
                  layers, one lit — see prompt 2 in file header
                </span>
              </figure>
            </div>
          </div>
        </section>

        {/* 5. Where it's applied — horizontal scroll-snap gallery, light. */}
        <section id="where" className="band soft hub-gallery">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Where it&apos;s applied
              </span>
              <h2 className="title">Built for <span className="grad-word">high-stakes</span> evaluation</h2>
              <p className="sub">
                The same trust layer supports decisions across very different
                programs — scroll through, then see the full picture.
              </p>
            </div>
          </div>
          <div
            className="hub-lane"
            data-reveal="up"
            tabIndex={0}
            role="list"
            aria-label="Use-case segments — horizontally scrollable"
          >
            {SEGMENTS.map((s) => (
              <div key={s.name} className="hub-card" role="listitem">
                <span className="hub-card__signal" aria-hidden="true"></span>
                <span className="mini-tag">Use case</span>
                <h3 className="hub-card__h">{s.name}</h3>
                <p className="hub-card__p">{s.note}</p>
              </div>
            ))}
          </div>
          <div className="wrap hub-gallery__cta">
            <Button href="/trust/use-cases" variant="ghost" arrow>
              See all use cases
            </Button>
          </div>
        </section>

        {/* 6. Final CTA — quiet CTA, DARK. */}
        <section className="band ink hub-cta">
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Get started
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              See how the evaluation holds up on{" "}
              <span className="grad-word">your own decks</span>
            </h2>
            <p
              className="sub hub-cta__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and walk through the methodology, the reliability
              checks and the safeguards end to end.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
