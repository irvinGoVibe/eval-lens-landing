import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Button, CtaBand, Eyebrow, PinnedSteps } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { SampleOutputSection } from "./SampleOutputSection";

export const metadata: Metadata = {
  title: "EvalLens Use Cases — Structured First Read for Every Shortlist",
  description:
    "Turn decks and structured application materials into an explainable shortlist before the final call. Pitch competitions, VC dealflow, hackathons, and more.",
};

const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Sample output", href: "#sample-output" },
    { label: "Workflows", href: "#choose-workflow" },
    { label: "How it works", href: "#how-batch-moves" },
  ],
};

/* ── §6 Batch steps ─────────────────────────────────────────── */
const BATCH_STEPS = [
  {
    num: "01",
    label: "Bring the batch",
    desc: "Collect decks and structured application materials in one managed flow.",
  },
  {
    num: "02",
    label: "Pick the review setup",
    desc: "Choose the workflow that matches your selection moment.",
  },
  {
    num: "03",
    label: "Run the structured first read",
    desc: "EvalLens evaluates every submission against the same criteria.",
  },
  {
    num: "04",
    label: "Review the output",
    desc: "Structured evidence, visible risks, missing proof, and comparison view.",
  },
  {
    num: "05",
    label: "Prepare questions for the room",
    desc: "Walk into the decision meeting with signal, not a reading list.",
  },
  {
    num: "06",
    label: "Set the final human ranking",
    desc: "Your team keeps control of the shortlist and the final call.",
  },
];

/* ── §5 Workflow data — one segment, one live page ────────────
 * Rebuilt 2026-08-15: the Featured/Upcoming/Later shelves are gone —
 * every segment has its own page under /trust/use-cases/<slug>.
 * Hackathons and university programs are formats inside
 * pitch-competitions (student-IP governance lives there), not
 * separate segments. */
const SEGMENTS = [
  {
    tag: "Pitch competitions",
    headline: "Every entry gets a full read. Every rank carries its receipts.",
    moment: "Finals are close. Decks are still scattered. Judges are reading at different depth.",
    body: "An AI panel pre-reads the whole written round on your rubric; your screeners confirm with briefing packs; live rounds run exactly as designed.",
    scopeLine: "Hackathon and university program screening run on this same workflow.",
    cta: "See the workflow",
    href: "/trust/use-cases/pitch-competitions",
    primary: true,
  },
  {
    tag: "VC open calls",
    headline: "Your open call, actually read.",
    moment: "Inbound came from six sources. The pipeline meeting is Monday. The median deck gets 150 seconds.",
    body: "Every submitted deck read in full against your investment dimensions — flags, founder questions, a quote behind every finding. The aide, never the arbiter.",
    cta: "See the workflow",
    href: "/trust/use-cases/vc-open-calls",
    primary: false,
  },
  {
    tag: "Angel networks",
    headline: "Every deal read before screening night.",
    moment: "The monthly batch is in. The screening chair is a volunteer. The reading marathon starts tonight.",
    body: "A one-page, evidence-linked brief per company for your screening committee — findings, red flags, pitch questions. Every judgment stays your members'.",
    cta: "See the workflow",
    href: "/trust/use-cases/angel-networks",
    primary: false,
  },
  {
    tag: "Accelerators",
    headline: "Every application gets a full read. Every rejection gets a reason.",
    moment: "Hundreds applied in three weeks. The committee decides the cohort next Friday.",
    body: "Every application read in full and scored on your rubric with page-level evidence. Start with a free retro-test on your last cohort.",
    cta: "See the workflow",
    href: "/trust/use-cases/accelerators",
    primary: false,
  },
  {
    tag: "Corporate innovation",
    headline: "From challenge statement to a signed PoC.",
    moment: "The challenge closed with 300+ submissions. The steering committee asks: why these five?",
    body: "Evidence-linked one-pagers for your jury and a selection memo you can defend upstairs — every pick traced to a quote and a page.",
    cta: "See the workflow",
    href: "/trust/use-cases/corporate-innovation",
    primary: false,
  },
  {
    tag: "Grants & prizes",
    headline: "Every score survives the audit.",
    moment: "Review panels are stretched, cycles run long — and three years later someone asks “why 4.2?”",
    body: "Every proposal scored to your rubric anchor by anchor, with an appeal-ready record. Your reviewers remain the reviewers of record.",
    cta: "See the workflow",
    href: "/trust/use-cases/grants-prizes",
    primary: false,
  },
  {
    tag: "Crowdfunding platforms",
    headline: "Screen project owners in days. Keep the file.",
    moment: "Too slow, the deal lists elsewhere. Too fast, the file won't hold when the NCA asks.",
    body: "An evidence-linked screening file per project owner, analyst verification, committee decisions logged — built to ESMA's dialect.",
    cta: "See the workflow",
    href: "/trust/use-cases/crowdfunding",
    primary: false,
  },
  {
    tag: "Tenders & RFPs",
    headline: "Awards that survive the challenge.",
    moment: "The award is announced — and the losing bidder's lawyer asks for the evaluation record.",
    body: "Every bid read end to end against your published criteria, scored with quotes and page references. Your committee awards; the record is one click.",
    cta: "See the workflow",
    href: "/trust/use-cases/tenders",
    primary: false,
  },
];

/* ── §3 Where Review Breaks ──────────────────────────────────── */
const VIGNETTES = [
  {
    segment: "Pitch competition",
    lines: [
      "230 submissions.",
      "3 judges.",
      "18 days before finals day.",
      "Everyone is reading different things.",
      "No clean way to explain why team 47 made it and team 89 did not.",
    ],
  },
  {
    segment: "VC",
    lines: [
      "Inbound decks came from six sources this week.",
      "The partner meeting is Monday.",
      "Nobody has time to read the full stack.",
      "But missing one strong company still hurts.",
    ],
  },
  {
    segment: "Accelerator",
    lines: [
      "Applications are in different formats.",
      "Some have decks. Some have forms. Some have traction claims without proof.",
      "The committee still needs one clean comparison.",
    ],
  },
  {
    segment: "Hackathon",
    lines: [
      "Applications close tonight.",
      "The team needs a shortlist before anyone starts building.",
      "Some ideas look strong. Some just look loud.",
    ],
  },
];

function WhereReviewBreaks() {
  return (
    <section
      className="band ink uc2-breaks"
      aria-labelledby="uc2-breaks-h2"
    >
      <div className="wrap">
        <h2 id="uc2-breaks-h2" data-reveal="up">
          Where review{" "}
          <span className="grad-word">breaks.</span>
        </h2>
        <div className="uc2-vignette-grid">
          {VIGNETTES.map((v, i) => (
            <article
              key={v.segment}
              className="uc-glass uc2-vignette"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <span className="mini-tag">{v.segment}</span>
              {v.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          ))}
        </div>
        <div className="uc2-habit-strip" aria-label="Current habits" data-reveal="up">
          <span>Sheets.</span>
          <span>Folders.</span>
          <span>Email threads.</span>
          <span>Last-minute calls.</span>
        </div>
        <p className="uc2-closing-line" data-reveal="up">
          Manual review does not fail loudly. It fails through uneven depth,
          scattered notes, and scores that are hard to defend.
        </p>
      </div>
    </section>
  );
}

/* ── §4 Built for Controlled Review ─────────────────────────── */
const TRUST_CARDS = [
  {
    label: "Human control",
    statement:
      "AI prepares the read. Your team makes the final decision.",
  },
  {
    label: "Controlled review logic",
    statement:
      "Uploaded materials cannot override the review rules. The rules sit above the content.",
  },
  {
    label: "Sensitive materials",
    statement:
      "Decks and application materials are treated as sensitive by default.",
  },
];

function BuiltForControlledReview() {
  return (
    <section
      className="band light uc2-trust"
      aria-labelledby="uc2-trust-h2"
    >
      <div className="wrap">
        <h2 id="uc2-trust-h2" data-reveal="up">
          Built for <span className="grad-word">controlled review.</span>
        </h2>
        <div className="uc2-trust-cards">
          {TRUST_CARDS.map((card, i) => (
            <article
              key={card.label}
              className="uc-glass uc2-trust-card"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <span className="mini-tag">{card.label}</span>
              <p>{card.statement}</p>
            </article>
          ))}
        </div>
        <div className="uc2-trust-links" data-reveal="up">
          <a href="/trust/methodology" className="uc2-trust-link">
            Read methodology
          </a>
          <a
            href="/product/evidence-based-reports"
            className="uc2-trust-link"
          >
            See evidence-based reports
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── §5 Choose Your Workflow ─────────────────────────────────── */
function ChooseYourWorkflow() {
  return (
    <section
      id="choose-workflow"
      className="band soft uc2-workflow"
      aria-labelledby="uc2-workflow-h2"
    >
      <div className="wrap">
        <div className="uc2-workflow__head" data-reveal="up">
          <h2 id="uc2-workflow-h2">
            Same review logic.{" "}
            <span className="grad-word">Different decision moments.</span>
          </h2>
          <p>
            The decision context changes: a finalist board, a partner-ready
            shortlist, a stronger cohort, or application screening before teams
            start building.
          </p>
          <p>
            The core stays the same: structured evidence before the room meets,
            and a human final call.
          </p>
        </div>

        {/* One flat grid — every segment is live, every card leads to its page. */}
        <div className="uc2-featured-grid">
          {SEGMENTS.map((icp, i) => (
            <article
              key={icp.tag}
              className="uc-glass uc2-icp-card uc2-icp-card--featured"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <span className="mini-tag">{icp.tag}</span>
              <h3>{icp.headline}</h3>
              <p className="uc2-icp-moment">{icp.moment}</p>
              <p>{icp.body}</p>
              {"scopeLine" in icp && icp.scopeLine && (
                <p className="uc2-scope-line">{icp.scopeLine}</p>
              )}
              <Button
                href={icp.href}
                variant={icp.primary ? "gradient" : "ghost"}
              >
                {icp.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §7 Honest Scope ─────────────────────────────────────────── */
function HonestScope() {
  return (
    <section
      className="band light uc2-scope"
      aria-labelledby="uc2-scope-h2"
    >
      <div className="wrap">
        <h2 id="uc2-scope-h2" data-reveal="up">
          Sharp where decks and application materials are the{" "}
          <span className="grad-word">input.</span>
        </h2>
        <div className="uc2-scope-grid">
          {/* Col 1: Available now */}
          <div
            className="uc-glass uc2-scope-col"
            data-reveal="up"
            style={{ "--reveal-delay": "0ms" } as CSSProperties}
          >
            <span className="uc2-scope-col__label">Available now</span>
            <ul>
              {[
                "structured first read",
                "evidence-backed review output",
                "criteria-level evaluation",
                "comparison view",
                "questions for the decision meeting",
                "human final ranking",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Col 2: Built for */}
          <div
            className="uc-glass uc2-scope-col"
            data-reveal="up"
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
          >
            <span className="uc2-scope-col__label">Built for</span>
            <ul>
              {[
                "pitch competitions & hackathons",
                "VC open calls",
                "angel networks",
                "accelerators",
                "corporate innovation",
                "grants & prizes",
                "crowdfunding platforms",
                "tenders & RFPs",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Col 3: Roadmap */}
          <div
            className="uc-glass uc2-scope-col"
            data-reveal="up"
            style={{ "--reveal-delay": "180ms" } as CSSProperties}
          >
            <span className="uc2-scope-col__label">Roadmap</span>
            <ul>
              {[
                "custom rubrics",
                "execution review",
                "live demo judging",
                "deeper workflow-specific automation",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function UseCasesPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} theme="dark" />
      <main className="usecases section-lab ds">
        {/* §1 Hero */}
        <section id="hero-usecases" className="band ink ds-hero">
          <div className="ds-hero__v" data-version="1">
            <div className="ds-pattern" aria-hidden="true" />
            <div className="wrap ds-hero__inner">
              <Eyebrow reveal="up" delay={0}>
                From raw decks to a review-ready shortlist.
              </Eyebrow>
              <h1
                className="ds-hero__title"
                data-reveal="up"
                style={{ "--reveal-delay": "90ms" } as CSSProperties}
              >
                Make every shortlist{" "}
                <span className="grad-word">easier to explain.</span>
              </h1>

              {/* video between title and sub */}
              <div
                className="uc2-hero-vid-wrap"
                data-reveal="up"
                style={{ "--reveal-delay": "135ms" } as CSSProperties}
              >
                <video
                  className="uc2-hero-vid"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/assets/use-cases/hero-demo-poster.webp"
                  aria-hidden="true"
                >
                  <source src="/assets/use-cases/hero-demo.mp4" type="video/mp4" />
                </video>
                <div className="uc2-hero-vid-scrim" aria-hidden="true" />
              </div>

              <p
                className="sub ds-hero__sub"
                data-reveal="up"
                style={{ "--reveal-delay": "190ms" } as CSSProperties}
              >
                EvalLens turns decks and application materials into evidence,
                risks, gaps, and questions your team can use before the meeting.
                AI prepares the read. Your team decides.
              </p>
              <div
                className="cta-row"
                data-reveal="up"
                style={{ "--reveal-delay": "250ms" } as CSSProperties}
              >
                <Button href="https://calendly.com/evallens/30min" variant="glass">Book a workflow call</Button>
                <Button href="#sample-output" variant="glass">See sample output</Button>
              </div>
            </div>
          </div>
        </section>

        {/* §2 Sample Output Preview */}
        <SampleOutputSection />

        {/* §2b CTA — tied to the sample report above (cube video) */}
        <CtaBand
          theme="dark"
          title="Want this for"
          titleAccent="your batch?"
          sub="You just saw a real report. Send us one batch and we will produce the same from your own decks."
          primary={{ label: "Book a workflow call", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "See it live", href: "https://calendly.com/evallens/30min" }}
          videoSrc="/assets/cta/cube-1.mp4"
          videoPoster="/assets/cta/cube-1-poster.webp"
          auroraVariant="violet"
        />

        {/* §3 Where Review Breaks */}
        <WhereReviewBreaks />

        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        />

        {/* §4 Built for Controlled Review */}
        <BuiltForControlledReview />

        <div
          className="tr-gradient-bridge"
          data-from="light"
          data-to="soft"
          aria-hidden="true"
        />

        {/* §5 Choose Your Workflow */}
        <ChooseYourWorkflow />

        <div
          className="tr-masked-divider"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* §6 How One Batch Moves */}
        <PinnedSteps
          id="how-batch-moves"
          surface="ink"
          version={1}
          ariaLabel="How one batch moves through EvalLens"
          eyebrow="How it works"
          title={{
            line1: "How one batch moves",
            line2: "through",
            line2Accent: "EvalLens.",
          }}
          sub="EvalLens prepares the structured first read. Your team makes the final call."
          steps={BATCH_STEPS}
          media={{
            ratio: "16/9",
            label: "Batch workflow",
            hint: "",
            ariaLabel: "Six steps from batch intake to human final ranking",
          }}
        />

        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        />

        {/* §7 Honest Scope */}
        <HonestScope />

        {/* §7b Trust pack — added 2026-08-15 (panel-review fix: the public
            trust-pack the segment pages promise lives one click away). */}
        <section
          className="band light"
          aria-labelledby="uc2-trustpack-h2"
        >
          <div className="wrap">
            <h2 id="uc2-trustpack-h2" data-reveal="up">
              The claims above are{" "}
              <span className="grad-word">inspectable.</span>
            </h2>
            <p className="sub" data-reveal="up" style={{ maxWidth: "64ch" } as CSSProperties}>
              Every workflow on this page leans on the same public methodology — how
              scores are built, how disagreement is surfaced, and how submissions are
              protected. Read it before the call, not after.
            </p>
            <div
              data-reveal="up"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginTop: "28px",
              } as CSSProperties}
            >
              {[
                { label: "Methodology", desc: "How judges, evidence and scores work", href: "/trust/methodology" },
                { label: "Consistency & reliability", desc: "Spread, repeat runs, what stays stable", href: "/trust/consistency-reliability" },
                { label: "Security & privacy", desc: "Perimeter, DPA, never trained on", href: "/trust/security-privacy" },
                { label: "Prompt-injection safety", desc: "Why a deck can't talk its way up", href: "/trust/prompt-injection-safety" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="uc-glass uc2-icp-card"
                  style={{ textDecoration: "none", display: "block" } as CSSProperties}
                >
                  <h3>{l.label}</h3>
                  <p>{l.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* §8 Final CTA — original distinct close (program → pilot) */}
        <CtaBand
          theme="dark"
          bleed
          eyebrow="Get started"
          title="Bring your next batch to"
          titleAccent="EvalLens"
          sub="Tell us what kind of program you run. We will map your workflow, show how the review would work, and walk through a pilot batch."
          primary={{ label: "Book a Demo", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "Choose your use case", href: "#choose-workflow" }}
          auroraVariant="ocean"
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
