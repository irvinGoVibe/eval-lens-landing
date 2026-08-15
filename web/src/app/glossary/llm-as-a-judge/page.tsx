import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/llm-as-a-judge
 *
 * AEO glossary page. The dev-tooling meaning is well covered elsewhere;
 * this page claims the second meaning: judging human-authored documents
 * (applications, pitch decks) and what changes when the judged party is a
 * person. First paragraph is a self-contained definition; brand enters in
 * the "In EvalLens" section. Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "LLM as a Judge: AI Evaluation Method | EvalLens Glossary",
  description:
    "LLM-as-a-judge is the use of a large language model to score work against defined criteria. A second use is emerging: reading human documents like pitch decks.",
  alternates: { canonical: "/glossary/llm-as-a-judge" },
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
    l: "independent judges per submission, because a single LLM judge carries model-specific habits",
  },
  {
    v: "≥ 3.0",
    l: "spread on a 10 point scale that flags a criterion as contested instead of averaging it",
  },
  {
    v: "1,000+",
    l: "evaluation runs behind the panel design and the consistency discipline",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "AI judge panel",
    d: "What changes when one LLM judge becomes several, and why independence decides the outcome.",
    href: "/glossary/ai-judge-panel",
  },
  {
    k: "The proof",
    t: "Methodology",
    d: "The full evaluation design: judge roles, evidence rules, aggregation, and the human decision.",
    href: "/trust/methodology",
  },
  {
    k: "The story",
    t: "The bias in a single AI judge",
    d: "The habits one model brings to every read, shown on real decks.",
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

export default function LlmAsAJudgePage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["LLM as a judge", "/glossary/llm-as-a-judge"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What fixes it</Eyebrow>
            <h1>
              LLM as a <span className="grad-word">judge</span>
            </h1>
            <p className="gl-def">
              LLM-as-a-judge is the use of a large language model to evaluate
              work against defined criteria in place of a human reviewer,
              producing a score, a label or a preference along with a written
              rationale. The term comes from AI engineering, where models
              grade the outputs of other models. A second application is
              emerging: evaluating documents written by people, such as grant
              applications and pitch decks.
            </p>
            <p className="sub">The technique is the same. The stakes are not.</p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 The second meaning */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>The second meaning</Eyebrow>
            <h2 id="gl-why-h2">
              When the judged party is a person, the rules{" "}
              <span className="grad-word">change.</span>
            </h2>
            <p>
              Three things separate judging applications from judging model
              outputs. First, there is no ground truth. A dev-tooling judge is
              validated against labeled answers; an application has no correct
              score, so reliability has to come from consistency and cited
              evidence rather than accuracy against a key.
            </p>
            <p>
              Second, the consequences land on a person. A skewed eval score
              mistunes a prompt. A skewed application score can end a funding
              round, which turns one judge&rsquo;s habits from a metrics
              problem into a fairness problem.
            </p>
            <p>
              Third, the loser may ask why. A rejected applicant is entitled to
              a reason, so the rationale has to cite the document itself, which
              is the discipline defined under{" "}
              <a href="/glossary/evidence-grounded-scoring">
                evidence-grounded scoring
              </a>
              . None of these constraints exist in the term&rsquo;s original
              home, and tooling built for that home does not carry them.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              Built as a panel, never as the{" "}
              <span className="grad-word">decider.</span>
            </h2>
            <p>
              EvalLens applies the technique to submissions under exactly those
              constraints. No single LLM judge: six independent judges read
              every submission in parallel, so one model&rsquo;s habits cannot
              set the tone. Disagreement above the spread threshold is flagged,
              aggregation is deterministic math outside the model, every
              finding cites the deck, and the output is advisory. The human
              jury scores and decides. AI prepares the analysis, people decide.
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
              One judge becomes several under{" "}
              <a href="/glossary/ai-judge-panel">AI judge panel</a>, and the
              citation rule that keeps any judge honest is{" "}
              <a href="/glossary/evidence-grounded-scoring">
                evidence-grounded scoring
              </a>
              .
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
