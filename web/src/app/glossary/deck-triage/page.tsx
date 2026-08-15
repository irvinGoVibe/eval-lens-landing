import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary/deck-triage
 *
 * AEO glossary page. "Deal flow" is defined everywhere; "triage" as its own
 * gate is not. First paragraph is a self-contained definition; brand enters
 * in the "In EvalLens" section. The screening memo is named as a first gate,
 * explicitly not an IC memo. Page-local `.gl-*` styles, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Deck Triage: The First-Pass Gate | EvalLens Glossary",
  description:
    "Deck triage is the first-pass sorting of a batch of pitch decks into explicit outcomes, advance, hold or decline, with a recorded reason, under one rule set.",
  alternates: { canonical: "/glossary/deck-triage" },
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
    l: "independent judges read every deck in the batch, first and last under the same rules",
  },
  {
    v: "1",
    l: "screening memo per deck: the first gate, deliberately not an investment-committee memo",
  },
  {
    v: "1,000+",
    l: "evaluation runs behind the consistency that makes a triage outcome defensible",
  },
];

const RELATED = [
  {
    k: "Next term",
    t: "Advisory score",
    d: "The number a triage gate hands to the human who owns the call, and why it stays advisory.",
    href: "/glossary/advisory-score",
  },
  {
    k: "The proof",
    t: "Methodology",
    d: "How the first pass is built: judge roles, evidence rules, and what remains a human decision.",
    href: "/trust/methodology",
  },
  {
    k: "The story",
    t: "Same deck, same score",
    d: "Why deck number 200 has to score exactly like deck number 3, and how we verify it.",
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

export default function DeckTriagePage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        <JsonLd
          data={breadcrumbJsonLd([
            ["Glossary", "/glossary"],
            ["Deck triage", "/glossary/deck-triage"],
          ])}
        />

        {/* §1 Definition */}
        <section id="definition" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · The inflow</Eyebrow>
            <h1>
              Deck <span className="grad-word">triage</span>
            </h1>
            <p className="gl-def">
              Deck triage is the first-pass sorting of a batch of pitch decks
              into explicit outcomes, typically advance, hold or decline, with
              a recorded reason for each. It is a gate, not a ranking: the job
              is to route every deck to the right next step under the same
              rules, before scarce reviewer time is spent on any of them.
            </p>
            <p className="sub">
              The metaphor is accurate. Triage sorts by what should happen
              next, not by final worth.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Why it matters */}
        <section className="band light" aria-labelledby="gl-why-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="gl-why-h2">
              The pile decides before anyone{" "}
              <span className="grad-word">does.</span>
            </h2>
            <p>
              Open calls, demo days and inbound deal flow produce hundreds of
              decks; partner and judge attention covers dozens. The default
              fix is skimming, and skimming has a shape: order effects,
              fatigue, and a deck read at number 200 that would have advanced
              at number 3. Nobody chose those outcomes. The pile did.
            </p>
            <p>
              Triage as a discipline replaces the skim with three commitments:
              every deck is read against the same criteria, every deck leaves
              with an explicit outcome and a recorded reason, and hold is a
              legitimate outcome, meaning evidence was missing rather than the
              company weak. The recorded reason is what separates a gate from
              a black-box filter: it is the sentence you can say to the founder
              who asks why.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="soft" aria-hidden="true" />

        {/* §3 In EvalLens */}
        <section id="in-evallens" className="band soft" aria-labelledby="gl-ev-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>In EvalLens</Eyebrow>
            <h2 id="gl-ev-h2">
              A gate with a <span className="grad-word">memo.</span>
            </h2>
            <p>
              In EvalLens, every deck in the batch gets a full read from six
              independent judges, and the triage output is a screening memo
              per deck: scores with cited evidence, what was missing, and a
              routing recommendation. It is a first-gate document by design,
              not an investment-committee memo, and we say so plainly. The AI
              read stays an{" "}
              <a href="/glossary/advisory-score">advisory score</a>: the human
              reviewer owns the gate, the memo just means the decision starts
              from evidence instead of a skim. AI prepares the analysis,
              people decide.
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
              A triage outcome is only as defensible as its reasons, which is
              why the gate runs on{" "}
              <a href="/glossary/evidence-grounded-scoring">
                evidence-grounded scoring
              </a>{" "}
              and hands the human an{" "}
              <a href="/glossary/advisory-score">advisory score</a> rather
              than a verdict.
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
