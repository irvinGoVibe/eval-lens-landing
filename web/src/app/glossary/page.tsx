import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Eyebrow } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";

/* ────────────────────────────────────────────────────────────────────────
 * /glossary — hub
 *
 * The AEO glossary hub: a map of the evaluation vocabulary organized by the
 * organizer's stage of work (clusters from notes/research/
 * category-gaps-glossary.md), not by alphabet. Eight terms at launch; each
 * card links to a term page whose first paragraph is a self-contained
 * definition. Page-local `.gl-*` styles, shared DS untouched, no em dashes.
 * ──────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "AI Evaluation Glossary | EvalLens",
  description:
    "Plain definitions for AI-assisted application review: score spread, AI judge panels, advisory scores, deterministic aggregation and the ERC AI guidelines.",
  alternates: { canonical: "/glossary" },
};

const HEADER_NAV: SectionNav = {
  section: "Glossary",
  sectionHref: "/glossary",
  links: [
    { label: "Terms", href: "#terms" },
    { label: "What the rules allow", href: "#rules" },
  ],
};

type TermCard = { t: string; d: string; href: string };
type Cluster = { id: string; label: string; title: string; terms: TermCard[] };

const CLUSTERS: Cluster[] = [
  {
    id: "inflow",
    label: "Cluster 1",
    title: "What comes in, and how to sort it",
    terms: [
      {
        t: "Deck triage",
        d: "The first-pass gate that routes every deck to advance, hold or decline, with a recorded reason for each.",
        href: "/glossary/deck-triage",
      },
    ],
  },
  {
    id: "breaks",
    label: "Cluster 2",
    title: "What breaks in panel scoring",
    terms: [
      {
        t: "Score spread",
        d: "The gap between the highest and lowest judge on one criterion, and why it should be surfaced, not averaged.",
        href: "/glossary/score-spread",
      },
    ],
  },
  {
    id: "fixes",
    label: "Cluster 3",
    title: "What fixes it",
    terms: [
      {
        t: "LLM as a judge",
        d: "A language model scoring work against criteria, and what changes when the work is a person's application.",
        href: "/glossary/llm-as-a-judge",
      },
      {
        t: "AI judge panel",
        d: "Several AI reviewers scoring independently. Worth more than one judge only if they can actually disagree.",
        href: "/glossary/ai-judge-panel",
      },
      {
        t: "Evidence-grounded scoring",
        d: "Every score tied to a quote on a named slide. No citation, no score, and missing proof logged as a finding.",
        href: "/glossary/evidence-grounded-scoring",
      },
      {
        t: "Deterministic aggregation",
        d: "Judge scores combined with fixed math outside the model, so the same inputs always give the same result.",
        href: "/glossary/deterministic-aggregation",
      },
      {
        t: "Advisory score",
        d: "An AI number that informs the decision but has no path into the leaderboard, by architecture.",
        href: "/glossary/advisory-score",
      },
    ],
  },
  {
    id: "rules",
    label: "Cluster 4",
    title: "What the rules allow",
    terms: [
      {
        t: "ERC AI guidelines",
        d: "The ERC's 2026 rules: no delegated merit assessment, no uploading proposals, and what that leaves open.",
        href: "/glossary/erc-ai-guidelines",
      },
    ],
  },
];

const NEXT_STOPS = [
  {
    k: "The proof",
    t: "Methodology",
    d: "The glossary defines the vocabulary. The methodology page shows the system built from it.",
    href: "/trust/methodology",
  },
  {
    k: "The measurements",
    t: "Consistency and reliability",
    d: "Repeat-run behavior of the pipeline, with the spread and reproducibility numbers measured.",
    href: "/trust/consistency-reliability",
  },
  {
    k: "The stories",
    t: "Newsroom",
    d: "What these concepts look like when they meet real batches of decks.",
    href: "/blog",
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
.gl-cluster{margin-top:clamp(40px,5vw,64px)}
.gl-cluster:first-of-type{margin-top:clamp(28px,4vw,44px)}
.gl-cluster .cl-label{font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--violet,#6c4cf1)}
.gl-cluster h3{font-size:clamp(19px,2.4vw,24px);font-weight:650;margin:8px 0 0;color:var(--fg,#14102d)}
.gl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:20px}
.gl-card{display:block;background:var(--surface,#fff);border:1px solid var(--border,rgba(20,16,45,.12));border-radius:18px;padding:22px;text-decoration:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease}
.gl-card:hover{border-color:var(--violet,#6c4cf1);transform:translateY(-2px);box-shadow:0 18px 44px -30px rgba(40,30,90,.45)}
.gl-card .ct{display:block;font-size:17px;font-weight:650;color:var(--fg,#14102d)}
.gl-card .cd{display:block;margin-top:8px;font-size:14px;line-height:1.55;color:var(--muted,#5b5670)}
.gl-card .ca{display:inline-block;margin-top:12px;font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:11px;letter-spacing:.12em;text-transform:uppercase;background:var(--lens,linear-gradient(118deg,#6c4cf1,#a99bff,#2ec5e8,#36e0c2));-webkit-background-clip:text;background-clip:text;color:transparent}
.gl-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:30px}
.gl-link{display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:20px;text-decoration:none;transition:border-color .2s ease,transform .2s ease}
.gl-link:hover{border-color:rgba(255,255,255,.34);transform:translateY(-2px)}
.gl-link .lk{display:block;font-family:var(--font-mono,ui-monospace,Menlo,monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--lavender,#a99bff)}
.gl-link .lt{display:block;margin-top:8px;font-size:16px;font-weight:650;color:var(--fg-on-dark,#fff)}
.gl-link .ld{display:block;margin-top:6px;font-size:13.5px;line-height:1.5;color:var(--muted-on-dark,rgba(255,255,255,.72))}
`;

export default function GlossaryHubPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <style>{GL_STYLES}</style>
      <main className="gl section-lab ds">
        {/* §1 Hero — id must not be "hero" (globals body:has(#hero) canvas rule) */}
        <section id="glossary-hero" className="band ink gl-hero">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>Glossary · AI prepares, people decide</Eyebrow>
            <h1>
              The words behind a defensible{" "}
              <span className="grad-word">evaluation.</span>
            </h1>
            <p className="gl-def">
              Plain definitions for the terms organizers, program leads and
              investors meet when AI enters application review. Each page opens
              with a self-contained definition, then shows how the concept
              behaves on a real batch, with our own numbers where we have
              them: six independent judges, a spread threshold of 3.0, and
              1,000+ evaluation runs.
            </p>
            <p className="sub">
              The map follows the work, not the alphabet: what comes in, what
              breaks, what fixes it, and what the rules allow.
            </p>
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

        {/* §2 Term map by cluster */}
        <section id="terms" className="band light" aria-labelledby="gl-terms-h2">
          <div className="wrap gl-narrow" data-reveal="up">
            <Eyebrow>The map</Eyebrow>
            <h2 id="gl-terms-h2">
              Eight terms, four <span className="grad-word">stages.</span>
            </h2>
          </div>
          <div className="wrap">
            {CLUSTERS.map((c) => (
              <div key={c.id} id={c.id} className="gl-cluster" data-reveal="up">
                <span className="cl-label">{c.label}</span>
                <h3>{c.title}</h3>
                <div className="gl-grid">
                  {c.terms.map((term) => (
                    <a key={term.href} className="gl-card" href={term.href}>
                      <span className="ct">{term.t}</span>
                      <span className="cd">{term.d}</span>
                      <span className="ca">Read the definition</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

        {/* §3 Where the definitions lead */}
        <section className="band ink" aria-labelledby="gl-next-h2">
          <div className="wrap gl-narrow gl-prose" data-reveal="up">
            <Eyebrow>After the definitions</Eyebrow>
            <h2 id="gl-next-h2">
              The glossary defines. The trust pages{" "}
              <span className="grad-word">prove.</span>
            </h2>
            <p>
              A definition tells you what a concept is. Whether a product
              actually behaves that way is a measurement question, and that is
              what the trust section is for.
            </p>
            <div className="gl-links">
              {NEXT_STOPS.map((r) => (
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
