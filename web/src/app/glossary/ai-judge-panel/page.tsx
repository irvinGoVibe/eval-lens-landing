import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/ai-judge-panel
 *
 * AEO glossary page, and a consensus-correction page: the market repeats
 * the PoLL thesis that a panel of 5 to 10 models beats one judge; our
 * position is that correlated judges collapse, and independence plus
 * visible disagreement is what matters. External claim carries its arXiv
 * link. First paragraph is a self-contained definition; brand enters in
 * the "In EvalLens" section only. Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "AI Judge Panel: Independence Over Size | EvalLens Glossary",
  description:
    "An AI judge panel is a group of AI reviewers that score a submission independently. A panel only beats a single judge when its members can truly disagree.",
  alternates: { canonical: "/glossary/ai-judge-panel" },
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
    l: "role-based judges score every submission in parallel, and none of them sees another's read",
  },
  {
    v: "5",
    l: "judges on the hackathon panel, where execution and technical depth carry protected weight",
  },
  {
    v: "1,000+",
    l: "evaluation runs behind the conclusion that methodology, not headcount, moves quality",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "Score spread",
    d: "The number that makes a panel's independence observable: the gap between its extremes.",
    href: "/glossary/score-spread",
  },
  {
    k: "The proof",
    t: "Methodology",
    d: "The full panel design: judge roles, weights, deterministic aggregation, and what stays human.",
    href: "/trust/methodology",
  },
  {
    k: "The story",
    t: "From AI jury to EvalLens",
    d: "How our panel went from a jury metaphor to an architecture, and what we dropped on the way.",
    href: "/blog/from-ai-jury-to-evallense",
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

export default function AiJudgePanelPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["AI judge panel", "/glossary/ai-judge-panel"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What fixes it</Eyebrow>
            <h1>
              AI judge <span className="grad-word">panel</span>
            </h1>
            <p className="gl-def">
              An AI judge panel, also called an LLM-as-a-jury, is a group of AI
              reviewers that each score the same submission independently, so
              the final read reflects several perspectives instead of one
              model&rsquo;s habits. The value of a panel depends on one
              property: independence. Judges that share the same leanings
              produce the confidence of a crowd with the judgment of a single
              reviewer.
            </p>
            <p className="sub">
              Most of the market sells the headcount. The property that
              actually matters is whether the judges can visibly disagree.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 The consensus, corrected */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>The consensus, corrected</Eyebrow>
            <h2 id="gl-why-h2">
              More judges is not{" "}
              <span className="grad-word">more judgment.</span>
            </h2>
            <p>
              The claim you will meet across evaluation tooling comes from the
              Panel of LLM Evaluators line of work: a panel of five to ten
              smaller models outperforms a single large judge. It is repeated
              so often it reads as settled.
            </p>
            <p>
              The catch is correlation. The study{" "}
              <a href="https://arxiv.org/pdf/2605.29800">
                &ldquo;Nine Judges, Two Effective Votes: Correlated Errors
                Undermine LLM Evaluation Panels&rdquo;
              </a>{" "}
              shows what happens when panel members lean the same way: nine
              seats collapse to about two effective votes, because the judges
              make the same mistakes together. Adding a tenth copy of the same
              opinion adds cost, not judgment.
            </p>
            <p>
              The practical test is simple. If your panel never disagrees
              visibly, you are paying for N judges and receiving one opinion.
              A live panel produces{" "}
              <a href="/glossary/score-spread">score spread</a>, and a good
              process surfaces it instead of averaging it away.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              Six roles, not six <span className="grad-word">copies.</span>
            </h2>
            <p>
              Across 1,000+ evaluation runs our own conclusion matched the
              external finding: adding judges changes little unless the
              methodology forces independence. So the EvalLens panel is six
              judges with distinct reviewer roles, scoring in parallel without
              seeing each other&rsquo;s reads. Disagreement is reported as
              spread rather than averaged away, aggregation is deterministic
              math outside the model, and the panel&rsquo;s number stays
              advisory. AI prepares the analysis, people decide. This is also
              the second meaning of{" "}
              <a href="/glossary/llm-as-a-judge">LLM-as-a-judge</a>: the
              submissions here are written by people, not models.
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
              A panel is only observable through its disagreement, measured as{" "}
              <a href="/glossary/score-spread">score spread</a>. What the panel
              hands the decision maker is an{" "}
              <a href="/glossary/advisory-score">advisory score</a>, never a
              verdict.
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
