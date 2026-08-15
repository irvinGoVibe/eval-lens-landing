import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/score-spread
 *
 * AEO glossary page. The first paragraph is a self-contained, extractable
 * definition; the brand enters only in the "In EvalLens" section. Page-local
 * styles under `.gl-*`, shared DS untouched. No em dashes in the copy.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Score Spread: Judge Disagreement Metric | EvalLens Glossary",
  description:
    "Score spread is the gap between the highest and lowest scores independent judges give one submission on one criterion. A wide spread means real disagreement.",
  alternates: { canonical: "/glossary/score-spread" },
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
    v: "≥ 3.0",
    l: "the spread on a 10 point scale that flags a criterion as contested in an EvalLens report",
  },
  {
    v: "6",
    l: "independent AI judges whose highest and lowest scores define the spread",
  },
  {
    v: "1,000+",
    l: "evaluation runs behind the threshold and the flag-not-average design",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "AI judge panel",
    d: "Why independence, not headcount, is what makes a panel produce a spread worth reading.",
    href: "/glossary/ai-judge-panel",
  },
  {
    k: "The proof",
    t: "Consistency and reliability",
    d: "How spread behaves across repeat runs of the same deck, measured rather than promised.",
    href: "/trust/consistency-reliability",
  },
  {
    k: "The story",
    t: "The bias in a single AI judge",
    d: "What one judge's blind spots look like in practice, and why disagreement is the antidote.",
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

export default function ScoreSpreadPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["Score spread", "/glossary/score-spread"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What breaks</Eyebrow>
            <h1>
              Score <span className="grad-word">spread</span>
            </h1>
            <p className="gl-def">
              Score spread is the gap between the highest and the lowest score
              that independent judges give the same submission on the same
              criterion. A wide spread is not noise. It is a signal that the
              judges read the same evidence and reached different conclusions,
              and it deserves attention rather than averaging.
            </p>
            <p className="sub">
              Most scoring processes hide it. An average of 7.8 looks identical
              whether every judge said 8, or half said 10 and half said 5.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Why it matters */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="gl-why-h2">
              The average is where disagreement{" "}
              <span className="grad-word">goes to die.</span>
            </h2>
            <p>
              When a panel scores a batch of applications, the mean per
              criterion is usually the only number anyone sees. Two very
              different situations produce the same mean: quiet agreement and
              loud conflict. For an organizer, telling them apart is the whole
              job. A consensus 5 is a weak submission. A 10 versus 5 split is a
              submission the judges weighted differently, and exactly the one a
              human should look at before the shortlist locks.
            </p>
            <p>
              Spread also measures the panel itself. Judges that never diverge
              are redundant: a panel of correlated reviewers behaves like one
              reviewer with extra seats, which is the failure mode described
              under <a href="/glossary/ai-judge-panel">AI judge panel</a>. A
              healthy spread is evidence that the judges are actually
              independent.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              A named number with a{" "}
              <span className="grad-word">threshold.</span>
            </h2>
            <p>
              EvalLens computes Spread(d) for every criterion d: the distance
              between the highest and lowest of six independent AI judges. When
              Spread(d) reaches 3.0 or more on a 10 point scale, the report
              flags the criterion as contested and shows each judge&rsquo;s
              reasoning side by side instead of burying the conflict in a mean.
              The flag routes attention, it never changes scores: aggregation
              stays deterministic, and the final call belongs to the human
              jury. AI prepares the analysis, people decide.
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
              Spread exists because the judges are independent, the design
              choice explained under{" "}
              <a href="/glossary/ai-judge-panel">AI judge panel</a>. The math
              that preserves it instead of smoothing it is{" "}
              <a href="/glossary/deterministic-aggregation">
                deterministic aggregation
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
