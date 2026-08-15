import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/advisory-score
 *
 * AEO glossary page for a term the current search results leave undefined.
 * First paragraph is a self-contained definition; the brand enters in the
 * "In EvalLens" section. Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Advisory Score: AI Reference, Human Call | EvalLens Glossary",
  description:
    "An advisory score is an AI-generated evaluation number that informs a human decision but never makes it. It sits beside the human score, outside the ranking.",
  alternates: { canonical: "/glossary/advisory-score" },
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
    v: "2",
    l: "numbers per submission: AI Total Score as the advisory reference, Jury Score as the decision",
  },
  {
    v: "6",
    l: "independent AI judges behind the advisory number, aggregated deterministically",
  },
  {
    v: "0",
    l: "paths from the AI Total Score into the leaderboard. Rankings are built from human scores only",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "Deterministic aggregation",
    d: "How the advisory number is computed: fixed math outside the model, auditable end to end.",
    href: "/glossary/deterministic-aggregation",
  },
  {
    k: "The proof",
    t: "Methodology",
    d: "The architecture that separates the AI reference from the human decision, in full.",
    href: "/trust/methodology",
  },
  {
    k: "The story",
    t: "From AI jury to EvalLens",
    d: "Why we stopped letting the metaphor of a jury imply that the AI votes.",
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

export default function AdvisoryScorePage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["Advisory score", "/glossary/advisory-score"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What fixes it</Eyebrow>
            <h1>
              Advisory <span className="grad-word">score</span>
            </h1>
            <p className="gl-def">
              An advisory score is an AI-generated evaluation number that
              informs a human decision but never makes it. It sits next to the
              human score as a reference point: it can order a pile for
              reading, flag outliers and explain its own reasoning, but it has
              no path into the leaderboard, the shortlist or the award.
            </p>
            <p className="sub">
              The distinction is architectural, not a disclaimer. A score is
              advisory when the system gives it no way to become the result.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Why it matters */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="gl-why-h2">
              A disclaimer is a promise. Architecture is a{" "}
              <span className="grad-word">guarantee.</span>
            </h2>
            <p>
              Most AI screening tools say &ldquo;human in the loop&rdquo; and
              mean that a person may override the machine&rsquo;s number. That
              leaves the machine&rsquo;s number as the default, and defaults
              win: by submission two hundred, tired reviewers confirm rather
              than judge. An advisory score inverts the default. The AI number
              is never the result by construction, the human enters their own
              score, and the ranking is built from the human number alone.
            </p>
            <p>
              The same distinction is turning regulatory. Rules such as the{" "}
              <a href="/glossary/erc-ai-guidelines">ERC AI guidelines</a>{" "}
              prohibit delegating the assessment of merit to an AI system.
              Advisory by architecture, rather than advisory by promise, is
              what that boundary looks like in a working product.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              Two numbers, one <span className="grad-word">decision.</span>
            </h2>
            <p>
              Every submission in EvalLens carries two numbers. The AI Total
              Score is the deterministic aggregate of six independent judges:
              it exists to order the reading, surface disagreement and carry
              the evidence. The Jury Score is entered by your human judges, and
              it alone builds the leaderboard. There is no mode in which the AI
              Total Score ranks anyone, which is the product-level meaning of
              our line: AI prepares the analysis, people decide.
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
              The advisory number is produced by{" "}
              <a href="/glossary/deterministic-aggregation">
                deterministic aggregation
              </a>{" "}
              over a panel&rsquo;s reads, and it is the score a first-pass gate
              like <a href="/glossary/deck-triage">deck triage</a> hands to the
              human who owns the call.
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
