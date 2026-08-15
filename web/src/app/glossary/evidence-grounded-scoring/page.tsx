import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/evidence-grounded-scoring
 *
 * AEO glossary page. Groundedness is defined for RAG answers elsewhere;
 * this page defines it for evaluation scores. First paragraph is a
 * self-contained definition; brand enters in the "In EvalLens" section.
 * Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Evidence-Grounded Scoring: Cited Scores | EvalLens Glossary",
  description:
    "Evidence-grounded scoring ties every evaluation score to quoted evidence in the submission. No citation, no score, and missing proof is logged as a finding.",
  alternates: { canonical: "/glossary/evidence-grounded-scoring" },
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
    v: "6",
    l: "independent judges, each required to cite the deck for every criterion finding",
  },
  {
    v: "1",
    l: "dedicated report section for what the deck did not show: missing evidence as a finding",
  },
  {
    v: "1,000+",
    l: "evaluation runs behind the citation discipline and its consistency",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "LLM as a judge",
    d: "The judge this discipline constrains: why a model's rationale must point at the document.",
    href: "/glossary/llm-as-a-judge",
  },
  {
    k: "The proof",
    t: "Methodology",
    d: "The evidence rules inside the full evaluation design, from citation to human decision.",
    href: "/trust/methodology",
  },
  {
    k: "The story",
    t: "The bias in a single AI judge",
    d: "What ungrounded scoring drifts toward, and how citations pin a judge to the deck.",
    href: "/blog/the-bias-in-a-single-ai-judge",
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

export default function EvidenceGroundedScoringPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["Evidence-grounded scoring", "/glossary/evidence-grounded-scoring"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What fixes it</Eyebrow>
            <h1>
              Evidence-grounded <span className="grad-word">scoring</span>
            </h1>
            <p className="gl-def">
              Evidence-grounded scoring is an evaluation method in which every
              score must be tied to specific evidence in the submission
              itself, such as a quoted line on a named slide. A claim without
              a citation does not move a score, and evidence that is missing
              is recorded as a finding in its own right rather than silently
              lowering a number.
            </p>
            <p className="sub">
              It borrows the groundedness idea from AI reliability work and
              applies it to the score instead of the answer.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Why it matters */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="gl-why-h2">
              A number you can <span className="grad-word">argue with.</span>
            </h2>
            <p>
              An ungrounded score is unanswerable. Ask why a deck got a 6 on
              traction and the honest reply is &ldquo;overall
              impression,&rdquo; which no founder, judge or auditor can test.
              A grounded score converts the dispute into an evidence check:
              here is the quote, here is the slide, and either it supports the
              score or it does not.
            </p>
            <p>
              The second effect is that absence becomes signal. A deck that
              claims traction but shows no number on any slide produces a
              recorded gap: usable as feedback to the founder, and as the
              exact thing a human judge should verify in the meeting. The
              third effect lands on the judge itself. When the judge is a
              model, forcing every finding through a citation constrains
              invented praise and invented criticism alike, which is why the
              discipline pairs naturally with{" "}
              <a href="/glossary/llm-as-a-judge">LLM-as-a-judge</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              No quote, no <span className="grad-word">score.</span>
            </h2>
            <p>
              Each of the six independent EvalLens judges must cite the
              submission for every criterion finding, and the report shows the
              quote next to the slide it came from. What the deck did not show
              is a separate section of the report, not a hidden penalty. Where
              judges disagree, the conflict is surfaced as{" "}
              <a href="/glossary/score-spread">score spread</a> with each
              judge&rsquo;s evidence side by side, so the human making the
              call can compare readings instead of adjudicating vibes. AI
              prepares the analysis, people decide.
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
              Grounding is the leash on any{" "}
              <a href="/glossary/llm-as-a-judge">LLM judge</a>, and it is what
              gives a first-pass gate like{" "}
              <a href="/glossary/deck-triage">deck triage</a> reasons it can
              put in writing.
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
