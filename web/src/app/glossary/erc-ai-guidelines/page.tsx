import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/erc-ai-guidelines
 *
 * AEO glossary page for the regulatory cluster. Retells the rule (24 March
 * 2026: no delegated merit assessment, no uploading proposal content), then
 * answers the question nobody else does: what can still be automated. The
 * boundary is administration vs evaluation. Sources link to erc.europa.eu.
 * First paragraph is a self-contained definition; brand enters in the
 * "In EvalLens" section. Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "ERC AI Guidelines: What Stays Allowed | EvalLens Glossary",
  description:
    "ERC AI guidelines (24 March 2026) bar reviewers from delegating merit assessment to AI and from uploading proposals to external tools. Admin work stays open.",
  alternates: { canonical: "/glossary/erc-ai-guidelines" },
};

const HEADER_NAV: SectionNav = {
  section: "Glossary",
  sectionHref: "/glossary",
  links: [
    { label: "Definition", href: "#definition" },
    { label: "The boundary", href: "#boundary" },
    { label: "Related", href: "#related" },
  ],
};

const RELATED = [
  {
    k: "Next term",
    t: "Advisory score",
    d: "The architectural form of the same boundary: an AI number with no path into the decision.",
    href: "/glossary/advisory-score",
  },
  {
    k: "The proof",
    t: "Grants and prizes",
    d: "How an AI-assisted grant and prize workflow is structured to keep merit assessment human.",
    href: "/trust/use-cases/grants-prizes",
  },
  {
    k: "The story",
    t: "From AI jury to EvalLens",
    d: "Why we built the human decision into the architecture before any regulator asked for it.",
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
.gl-prose h3{font-size:17px;font-weight:650;margin:22px 0 0;color:var(--fg,#14102d)}
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

export default function ErcAiGuidelinesPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["ERC AI guidelines", "/glossary/erc-ai-guidelines"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · What the rules allow</Eyebrow>
            <h1>
              ERC AI <span className="grad-word">guidelines</span>
            </h1>
            <p className="gl-def">
              The ERC AI guidelines are the European Research Council&rsquo;s
              rules, issued on 24 March 2026, on the use of AI in the
              evaluation of ERC grant proposals. They draw two red lines for
              reviewers: the assessment of merit may not be delegated to an AI
              system, and the content of applications may not be uploaded to
              external AI tools. The guidelines restrict evaluation. They do
              not prohibit administration.
            </p>
            <p className="sub">
              Most coverage repeats the two prohibitions. The useful question
              is the one almost nobody answers: what does that leave?
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 The boundary */}
        <section id="boundary" className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>The boundary</Eyebrow>
            <h2 id="gl-why-h2">
              Administration is allowed. Evaluation is{" "}
              <span className="grad-word">not.</span>
            </h2>
            <p>
              Read as a boundary rather than a ban, the guidelines split the
              work of a review process into two categories.
            </p>
            <h3>Off limits under the guidelines</h3>
            <ul className="gl-list">
              <li>
                Letting an AI system produce or determine the merit judgment:
                the score, the ranking, the funding recommendation.
              </li>
              <li>
                Placing applicants&rsquo; proposal content into external AI
                tools outside the controlled evaluation environment,
                confidentiality being the stated reason.
              </li>
            </ul>
            <h3>Still open: the administration side</h3>
            <ul className="gl-list">
              <li>Eligibility and completeness checks before review starts.</li>
              <li>Deadline, document and panel logistics.</li>
              <li>Structuring and preparing the material reviewers read.</li>
              <li>
                Consistency checks on the process itself: was every proposal
                handled under the same procedure.
              </li>
            </ul>
            <p>
              The operative sentence: a system that prepares the material and
              the process, while humans perform the assessment of merit,
              operates on the administration side of the line. The rule
              applies to ERC evaluations; other funders increasingly cite it,
              and your own program&rsquo;s counsel has the final word. The
              primary source is the ERC itself at{" "}
              <a href="https://erc.europa.eu/">erc.europa.eu</a>.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              Built on the administration side of the{" "}
              <span className="grad-word">line.</span>
            </h2>
            <p>
              EvalLens was architected on this boundary before the guidelines
              named it. The AI Total Score produced by six independent judges
              is advisory and has no path into a ranking: leaderboards are
              built from human Jury Scores only, so merit assessment is never
              delegated. Reports prepare the material with cited evidence, and
              submissions are processed inside a closed perimeter, never used
              to train models. We do not certify anyone&rsquo;s ERC
              compliance, your counsel does; what we offer is an architecture
              where the human side of the line is structural. AI prepares the
              analysis, people decide.
            </p>
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
              The product-side form of the same rule is the{" "}
              <a href="/glossary/advisory-score">advisory score</a>, and the
              discipline that keeps prepared material trustworthy is{" "}
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
