import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { Button, CtaBand, Cinema, Eyebrow, PinnedSteps } from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";
import { SampleOutputSection } from "./SampleOutputSection";

export const metadata: Metadata = {
  title: "EvalLense Use Cases - Structured First Read for Every Shortlist",
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
    desc: "EvalLense evaluates every submission against the same criteria.",
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

/* ── §5 Workflow data ────────────────────────────────────────── */
const FEATURED_ICPS = [
  {
    tag: "Pitch competitions",
    headline: "Review decks before finals day.",
    moment: "Finals are close. Decks are still scattered. Judges are reading at different depth.",
    body: "Give your judging panel a finalist board, participant reports, risks, and questions before they meet.",
    output: "Finalist board, participant reports, evidence, risks, and judge-ready questions.",
    cta: "See pitch competition workflow",
    // TODO: update href when /use-cases/pitch-competitions page is ready
    href: "/company/contact?use_case=Pitch+competitions",
    primary: true,
  },
  {
    tag: "VC / angel dealflow",
    headline: "Know which decks deserve partner time before Monday's meeting.",
    moment: "Inbound came from six sources. The meeting is soon. Nobody has time to read every deck deeply.",
    body: "Give partners, scouts, or members a cleaner first-pass view: which companies deserve attention, what evidence is missing, and what risks need a second look.",
    output: "First-pass signal, red flags, missing evidence, partner-ready notes, and risks to verify.",
    cta: "See VC workflow",
    // TODO: update href when /use-cases/vc-funds page is ready
    href: "/company/contact?use_case=VC+angel+dealflow",
    primary: false,
  },
  {
    tag: "Hackathons",
    headline: "Review applications before teams start building.",
    moment: "Applications close tonight. The team needs a shortlist before anyone starts building.",
    body: "EvalLense reviews what teams submit: project clarity, proposed solution, feasibility, evidence, execution plan, and risks.",
    scopeLine: "Live demos, code execution, and build quality can be reviewed as separate layers.",
    output: "Application summaries, feasibility signals, execution-plan risks, missing proof, and selection questions.",
    cta: "See hackathon workflow",
    // TODO: update href when /use-cases/hackathons page is ready
    href: "/company/contact?use_case=Hackathons",
    primary: false,
  },
];

const UPCOMING_ICPS = [
  {
    tag: "Accelerators",
    headline: "Select a stronger batch with less reviewer chaos.",
    moment: "Applications arrive in different formats. The committee still needs one clean comparison before the cohort decision.",
    body: "Help your selection committee compare applications with the same first-read logic before the cohort decision.",
    cta: "Book an accelerator workflow call",
    href: "/company/contact?use_case=Accelerators",
  },
  {
    tag: "Corporate innovation",
    headline: "Shortlist internal proposals before stakeholder review.",
    moment: "Internal ideas move through committees, business cases, and stakeholder opinions. The team still needs a clean evidence view.",
    body: "Give stakeholders a cleaner view of which ideas are clear, feasible, supported by evidence, and worth moving forward.",
    cta: "Book a corporate workflow call",
    href: "/company/contact?use_case=Corporate+innovation",
  },
];

const LATER_ICPS = [
  {
    tag: "Grants",
    headline: "Compare applications against fixed criteria.",
    body: "Give your review committee a clearer evidence trail before funding decisions.",
    cta: "Book a grant review call",
    href: "/company/contact?use_case=Grants",
  },
  {
    tag: "Universities",
    headline: "Prepare fairer student competition reviews.",
    body: "Help your review panel compare student teams with more consistency before awards, grants, or program selection.",
    cta: "Book a university review call",
    href: "/company/contact?use_case=Universities",
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

        {/* Tier 1: Best fit now */}
        <div className="uc2-tier-label" data-reveal="up">
          Best fit now
        </div>
        <div className="uc2-featured-grid">
          {FEATURED_ICPS.map((icp, i) => (
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
              <div className="uc2-icp-output">
                <span>Output</span>
                <p>{icp.output}</p>
              </div>
              <Button
                href={icp.href}
                variant={icp.primary ? "gradient" : "ghost"}
              >
                {icp.cta}
              </Button>
            </article>
          ))}
        </div>

        {/* Tier 2: Also relevant */}
        <div className="uc2-tier-label" data-reveal="up">
          Also relevant
        </div>
        <div className="uc2-upcoming-grid">
          {UPCOMING_ICPS.map((icp, i) => (
            <article
              key={icp.tag}
              className="uc-glass uc2-icp-card uc2-icp-card--upcoming"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <span className="mini-tag">{icp.tag}</span>
              <h3>{icp.headline}</h3>
              <p className="uc2-icp-moment">{icp.moment}</p>
              <p>{icp.body}</p>
              <a href={icp.href} className="uc2-icp-cta-link">
                {icp.cta}
              </a>
            </article>
          ))}
        </div>

        {/* Tier 3: More workflows */}
        <div className="uc2-tier-label" data-reveal="up">
          More workflows
        </div>
        <div className="uc2-later-grid">
          {LATER_ICPS.map((icp, i) => (
            <article
              key={icp.tag}
              className="uc-glass uc2-icp-card uc2-icp-card--later"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <span className="mini-tag">{icp.tag}</span>
              <h3>{icp.headline}</h3>
              <p>{icp.body}</p>
              <a href={icp.href} className="uc2-icp-cta-link">
                {icp.cta}
              </a>
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

          {/* Col 2: Best fit today */}
          <div
            className="uc-glass uc2-scope-col"
            data-reveal="up"
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
          >
            <span className="uc2-scope-col__label">Best fit now</span>
            <ul>
              {[
                "pitch competitions",
                "VC / angel deck review",
                "hackathon application screening",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="uc2-scope-upcoming">
              <span>Upcoming</span>
              <ul>
                {["accelerators", "corporate innovation"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
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
                EvalLense turns decks and application materials into evidence,
                risks, gaps, and questions your team can use before the meeting.
                AI prepares the read. Your team decides.
              </p>
              <div
                className="cta-row"
                data-reveal="up"
                style={{ "--reveal-delay": "250ms" } as CSSProperties}
              >
                <Button href="/company/contact" variant="glass">Book a workflow call</Button>
                <Button href="#sample-output" variant="glass">See sample output</Button>
              </div>
            </div>
          </div>
        </section>

        {/* §2 Sample Output Preview */}
        <SampleOutputSection />

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
          ariaLabel="How one batch moves through EvalLense"
          eyebrow="How it works"
          title={{
            line1: "How one batch moves",
            line2: "through",
            line2Accent: "EvalLense.",
          }}
          sub="EvalLense prepares the structured first read. Your team makes the final call."
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

        {/* §8 Final CTA — Cinema ink, chess video */}
        <Cinema
          id="cta"
          surface="ink"
          eyebrow="Get started"
          headline="Review your next batch."
          lines={["Review your", "next batch."]}
          mobileLines={["Review your", "next batch."]}
          sub="Bring one real batch. We will show what EvalLense would produce from it: evidence, risks, questions, and a comparison view your team can use."
          cta={{ label: "Book a workflow call", href: "/company/contact" }}
          media={{
            videoSrc: "/videos/cinema-chess.mp4",
            poster: "/videos/cinema-chess-poster.jpg",
          }}
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
