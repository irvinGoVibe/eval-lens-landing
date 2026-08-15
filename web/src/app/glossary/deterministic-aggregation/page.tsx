import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/deterministic-aggregation
 *
 * AEO glossary page. The idea circulates in vendor blogs but has no stable
 * definition; this page supplies one. First paragraph is a self-contained
 * definition; the brand enters in the "In EvalLens" section (Function 1).
 * Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Deterministic Aggregation: Scoring Math | EvalLens Glossary",
  description:
    "Deterministic aggregation combines individual judge scores into a final result with fixed math outside the language model. Same inputs, same output, every time.",
  alternates: { canonical: "/glossary/deterministic-aggregation" },
};

const HEADER_NAV: SectionNav = {
  section: "Glossary",
  sectionHref: "/glossary",
  links: [
    { label: "Definition", href: "#definition" },
    { label: "In EvalLens", href: "#in-evallens" },
    { label: "Related", href: "#related" },
  ],
};

const FACTS = [
  {
    v: "0",
    l: "LLM calls in the aggregation step. The math runs outside the model, every time",
  },
  {
    v: "6",
    l: "independent judge score sets go in; one AI Total Score and per-criterion spreads come out",
  },
  {
    v: "1,000+",
    l: "evaluation runs verifying that identical inputs produce identical aggregates",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "Score spread",
    d: "The disagreement signal that deterministic math preserves instead of blending away.",
    href: "/glossary/score-spread",
  },
  {
    k: "The proof",
    t: "Consistency and reliability",
    d: "Repeat-run behavior of the whole pipeline, measured: where variance lives and where it cannot.",
    href: "/trust/consistency-reliability",
  },
  {
    k: "The story",
    t: "Same deck, same score",
    d: "What it took to make a re-run of the same deck land on the same number.",
    href: "/blog/same-deck-same-score",
  },
];

const GL_STYLES = `
.gl .gl-narrow{max-width:800px}
.gl section.band h1{font-size:clamp(36px,5.6vw,64px);line-height:1.04;letter-spacing:-.03em;font-weight:700;margin:0}
.gl section.band h2{font-size:clamp(26px,3.6vw,40px);line-height:1.1;letter-spacing:-.02em;font-weight:650;margin:0 0 18px}
.gl-def{margin-top:24px;font-size:clamp(17px,2.2vw,21px);line-height:1.55;color:var(--fg-on-dark,#fff);max-width:62ch}
.gl-hero .sub{max-width:62ch}
.gl-prose p{font-size:15.5px;line-height:1.62;color:var(--muted,#5b5670);max-width:66ch}
.gl-prose p+p{margin-top:14px}
.ink .gl-prose p{color:var(--muted-on-dark,rgba(255,255,255,.74))}
.gl-prose a{color:inherit;text-decoration:underline;text-underline-offset:3px}
.gl-list{margin:14px 0 0;padding-left:20px}
.gl-list li{font-size:15.5px;line-height:1.62;color:var(--muted,#5b5670);max-width:64ch}
.gl-list li+li{margin-top:10px}
.gl-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:30px}
.gl-fact{background:var(--surface,#fff);border:1px solid var(--border,rgba(20,16,45,.12));border-radius:16px;padding:18px}
.gl-fact .fv{font-size:28px;font-weight:700;line-height:1;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.gl-fact .fl{margin-top:8px;font-size:13.5px;line-height:1.5;color:var(--muted,#5b5670)}
.gl-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:30px}
.gl-link{display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:20px;text-decoration:none;transition:border-color .2s ease,transform .2s ease}
.gl-link:hover{border-color:rgba(255,255,255,.34);transform:translateY(-2px)}
.gl-link .lk{display:block;font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff)}
.gl-link .lt{display:block;margin-top:8px;font-size:16px;font-weight:650;color:var(--fg-on-dark,#fff)}
.gl-link .ld{display:block;margin-top:6px;font-size:13.5px;line-height:1.5;color:var(--muted-on-dark,rgba(255,255,255,.72))}
`;

export default function DeterministicAggregationPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["Deterministic aggregation", "/glossary/deterministic-aggregation"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What fixes it</Eyebrow>
            <h1>
              Deterministic <span className="grad-word">aggregation</span>
            </h1>
            <p className="gl-def">
              Deterministic aggregation is the practice of combining individual
              judge scores into a final result using fixed mathematics outside
              the language model, rather than asking a model to summarize or
              average them. Given the same scores and the same weights, it
              returns the same result every time, and every step of the
              calculation can be audited.
            </p>
            <p className="sub">
              The alternative, asking an LLM to combine its own reads, injects
              a second layer of model variance exactly where reproducibility
              matters most.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Why it matters */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="gl-why-h2">
              Where scoring pipelines quietly lose{" "}
              <span className="grad-word">reproducibility.</span>
            </h2>
            <p>
              An AI scoring pipeline has two places where variance can enter:
              the individual judge reads, and the step that turns those reads
              into one number. Many tools run both inside the model. When
              aggregation is a prompt, the same six scores can produce
              different finals on different days, the rubric weights become
              suggestions the model may or may not honor, and nobody can
              reconstruct why the number is what it is.
            </p>
            <p>
              Move the aggregation into plain arithmetic and that layer
              contributes exactly zero variance. Whatever disagreement exists
              between judges is preserved and visible as{" "}
              <a href="/glossary/score-spread">score spread</a>, instead of
              being blended into a smooth number by a model&rsquo;s mood. It is
              the difference between a calculation and an impression of one.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              Function 1: math the model cannot{" "}
              <span className="grad-word">touch.</span>
            </h2>
            <p>
              In EvalLens the aggregation layer is a pure function, known
              internally as Function 1. It takes the criterion scores of six
              independent judges and the rubric weights, and computes the AI
              Total Score and the per-criterion spread with plain arithmetic.
              No LLM participates in that step, so a re-run over the same
              judge scores cannot drift. The resulting number stays an{" "}
              <a href="/glossary/advisory-score">advisory score</a>: it orders
              the reading and carries the evidence, while the human jury owns
              the decision.
            </p>
            <div className="gl-facts">
              {FACTS.map((f) => (
                <div key={f.v} className="gl-fact" data-reveal="up">
                  <div className="fv">{f.v}</div>
                  <div className="fl">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* §4 Related */}
        <section id="related" className="band ink" aria-labelledby="gl-rel-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Related</Eyebrow>
            <h2 id="gl-rel-h2">
              Where this term <span className="grad-word">connects.</span>
            </h2>
            <p>
              Deterministic math is what keeps{" "}
              <a href="/glossary/score-spread">score spread</a> honest, and
              what makes an <a href="/glossary/advisory-score">advisory
              score</a> explainable after the fact.
            </p>
            <div className="gl-links">
              {RELATED.map((r) => (
                <a key={r.href} className="gl-link" href={r.href} data-reveal="up">
                  <span className="lk">{r.k}</span>
                  <span className="lt">{r.t}</span>
                  <span className="ld">{r.d}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
