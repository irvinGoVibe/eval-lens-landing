import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import {
  Button,
  Cinema,
  CtaBand,
  PinnedSteps,
  StatementHero,
} from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";

const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Workflows", href: "#workflows" },
    { label: "Engine", href: "#engine" },
    { label: "Coverage", href: "#coverage" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense Use Cases - One Review System for Every Shortlist",
  description:
    "See how EvalLense supports pitch competitions, VC dealflow, accelerators, hackathons, grants, universities, and corporate innovation with evidence-linked pitch-deck review.",
};

const RISK_PAIRS = [
  {
    risk: "Too many decks to read carefully",
    control: "Structured AI-assisted first pass",
  },
  {
    risk: "Reviewers focus on different things",
    control: "Fixed criteria and judge lenses",
  },
  {
    risk: "Scores are hard to explain",
    control: "Evidence trace behind each score",
  },
  {
    risk: "Strong teams get missed",
    control: "Ranked shortlist and review board",
  },
  {
    risk: "AI should not pick winners",
    control: "Jury Score controls the final ranking",
  },
];

const WORKFLOWS = [
  {
    segment: "Pitch Competitions",
    moment: "Before finals day",
    job: "Move from open submissions to a ranked finalist board.",
    gives:
      "One rubric, evidence-linked reports, live questions, and a leaderboard your jury owns.",
    cta: "Explore pitch competitions",
  },
  {
    segment: "Hackathons",
    moment: "Before live judging",
    job: "Review many teams fast and prepare the judge panel.",
    gives:
      "A pitch-deck first pass today, with execution-specific hackathon review on the roadmap.",
    cta: "Explore hackathons",
  },
  {
    segment: "VC Funds",
    moment: "Before the pipeline meeting",
    job: "Turn inbound decks into a partner-ready first read.",
    gives:
      "Market, team, GTM, feasibility signals, missing evidence, and questions for the first call.",
    cta: "Explore VC dealflow",
  },
  {
    segment: "Accelerators",
    moment: "Before cohort selection",
    job: "Compare applicants on one standard and defend the cohort decision.",
    gives:
      "Side-by-side reports, fixed criteria, evidence gaps, risks, and selection questions.",
    cta: "Explore accelerators",
  },
  {
    segment: "Angel Investors",
    moment: "Before diligence night",
    job: "Know which decks deserve your time.",
    gives:
      "A structured first read with strengths, weaknesses, missing evidence, and founder questions.",
    cta: "Explore angel review",
  },
  {
    segment: "Corporate Innovation",
    moment: "Before stakeholder review",
    job: "Separate real partnership potential from innovation theatre.",
    gives:
      "Fit signals, readiness checks, business value, evidence gaps, and a shortlist for the committee.",
    cta: "Explore corporate innovation",
  },
  {
    segment: "Grant Programs",
    moment: "Before funding decisions",
    job: "Review applications against fixed criteria and keep the decision explainable.",
    gives:
      "Comparable scores, evidence-linked reasoning, missing points, and a review trail.",
    cta: "Explore grants",
  },
  {
    segment: "Universities",
    moment: "Before demo day or program selection",
    job: "Compare student and research teams fairly.",
    gives:
      "Transparent scoring, useful feedback, presentation questions, and a human-owned ranking.",
    cta: "Explore universities",
  },
];

const PRIMARY_WORKFLOWS = [
  {
    label: "Event hosts",
    title: "Pitch events and competitions",
    body: "For event hosts, the pressure starts before the stage. The jury needs to know which teams deserve a closer live read. EvalLense turns submissions into a ranked board, report set, and question list before finals day.",
    changes: [
      "One intake flow for teams.",
      "Every deck reviewed against the same criteria.",
      "Reports ready before live judging.",
      "Questions prepared per finalist.",
      "Final ranking owned by the jury.",
    ],
    cta: "Plan a competition workflow",
  },
  {
    label: "VC and dealflow",
    title: "VC and early dealflow",
    body: "For funds, EvalLense is not diligence and not an investment decision. It is a structured first read. It helps the team decide which decks deserve partner time and which questions to ask first.",
    changes: [
      "Every inbound deck gets a consistent read.",
      "Partners see strengths, risks, and missing evidence.",
      "Market, team, GTM, and feasibility are separated.",
      "Pipeline meetings start with better context.",
      "First calls start with better questions.",
    ],
    cta: "Plan a dealflow workflow",
  },
  {
    label: "Hackathons",
    title: "Hackathons and build sprints",
    body: "For hackathons, speed matters, but so does clarity. EvalLense helps structure the first pass and prepare live judging. Today this works through pitch-deck review. Execution-specific demo review belongs to the roadmap.",
    changes: [
      "Fast structured first pass.",
      "Shortlist-ready comparison.",
      "Questions for the live round.",
      "Clearer review before judges meet.",
      "Roadmap path to execution-specific scoring.",
    ],
    cta: "Plan a hackathon workflow",
  },
];

const ENGINE_ITEMS = [
  {
    num: "01",
    label: "Entry Hub",
    desc: "Collect decks in one managed flow.",
  },
  {
    num: "02",
    label: "Evidence-based Reports",
    desc: "Turn each deck into structured findings, scores, gaps, and questions.",
  },
  {
    num: "03",
    label: "Judge Lenses",
    desc: "Review the deck through role-specific AI perspectives.",
  },
  {
    num: "04",
    label: "Review Board",
    desc: "Compare the batch side by side and build the shortlist.",
  },
  {
    num: "05",
    label: "Human Jury Score",
    desc: "Keep the final ranking under human control.",
  },
  {
    num: "06",
    label: "Decision Trail",
    desc: "Keep the evidence and reasoning visible after the shortlist is built.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Compare fairly",
    body: "Every submission is evaluated against the same criteria.",
  },
  {
    num: "02",
    title: "Keep evidence visible",
    body: "Scores stay connected to the deck, not just a final number.",
  },
  {
    num: "03",
    title: "Shortlist faster",
    body: "The team starts from structured reports, not raw slides.",
  },
  {
    num: "04",
    title: "Ask better questions",
    body: "Live review starts with what needs to be clarified.",
  },
  {
    num: "05",
    title: "Keep the final call human",
    body: "AI prepares the analysis. The team decides.",
  },
];

const ROOM_OUTPUTS = [
  {
    label: "Entry Hub",
    title: "One intake flow",
    body: "Teams submit into a managed flow instead of scattering decks across inboxes and folders.",
  },
  {
    label: "Reports",
    title: "Structured first read",
    body: "Each deck comes back with findings, gaps, scores, and questions connected to the evidence.",
  },
  {
    label: "Review Board",
    title: "A batch view",
    body: "The team sees the field side by side before the live decision, not one deck at a time.",
  },
  {
    label: "Jury Score",
    title: "Human-owned ranking",
    body: "AI prepares the analysis. The jury keeps control of the final shortlist.",
  },
];

const PACKET_ITEMS = [
  {
    label: "What changed",
    title: "Less raw pre-reading",
    body: "The team starts from structured findings instead of opening every deck cold.",
  },
  {
    label: "What stays visible",
    title: "Evidence behind scores",
    body: "Scores stay connected to the deck, missing evidence, risks, and useful follow-up questions.",
  },
  {
    label: "What the meeting gets",
    title: "A sharper first conversation",
    body: "Pipeline meetings, cohort reviews, and live judging start with better context.",
  },
];

const COVERAGE = [
  {
    value: "Now",
    label: "Available coverage",
    src: "Pitch-deck based review with P1-P6 criteria, evidence reports, review questions, and human-owned ranking.",
  },
  {
    value: "Next",
    label: "Segment depth",
    src: "Dedicated pages for pitch competitions, VC dealflow, accelerators, hackathons, universities, grants, and corporate innovation.",
  },
  {
    value: "Roadmap",
    label: "Workflow expansion",
    src: "Hackathon execution review, custom rubrics, truth check, and workflow-specific scoring.",
  },
];

function workflowHref(label: string) {
  return `/company/contact?use_case=${encodeURIComponent(label)}`;
}

function WorkflowLensScene() {
  const paths = [
    "Competitions",
    "VC",
    "Hackathons",
    "Accelerators",
    "Universities",
    "Grants",
    "Corporate",
  ];

  return (
    <section className="band soft usecases-lens" aria-label="Workflow lens visual">
      <div className="wrap usecases-lens__stage" data-reveal="up">
        <div className="usecases-lens__deckfield" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={index}
              className="usecases-lens__deck"
              style={{ "--i": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="usecases-lens__core">
          <span className="usecases-lens__ring" aria-hidden="true" />
          <strong>EvalLense</strong>
          <span>one review engine</span>
        </div>
        <div className="usecases-lens__paths" aria-label="Supported workflows">
          {paths.map((path) => (
            <span key={path}>{path}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrativeControlGrid() {
  return (
    <section
      id="shared-pressure"
      className="band ink usecases-control"
      aria-label="Shared selection pressure"
    >
      <div className="wrap usecases-control-grid">
        <div className="usecases-control__copy" data-reveal="up">
          <p className="usecases-kicker">Shared pressure</p>
          <h2>
            The best teams are not always the easiest ones to notice
          </h2>
          <p>
            Every selection program hits the same bottleneck. A careful review
            takes time. A large batch takes more time than most teams have.
            When the pile grows, reviewers skim, focus on different signals,
            and lose the thread across submissions.
          </p>
          <p>
            EvalLense gives the team a structured first read before the live
            decision. It prepares reports, evidence gaps, comparison context,
            and questions while keeping the final ranking under human control.
          </p>
        </div>
        <div className="usecases-control__pairs" aria-label="Pressure and control pairs">
          {RISK_PAIRS.map((pair, index) => (
            <article
              key={pair.risk}
              className="uc-glass usecases-control__pair"
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <div>
                <span>Pressure</span>
                <p>{pair.risk}</p>
              </div>
              <div>
                <span>EvalLense response</span>
                <p>{pair.control}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectionRoomScene() {
  return (
    <section
      className="band light usecases-room"
      aria-label="What the review room receives"
    >
      <div className="wrap usecases-room__grid">
        <div className="usecases-room__statement" data-reveal="up">
          <p className="usecases-kicker">Before the meeting</p>
          <h2>Turn a pile of decks into a room the jury can read</h2>
          <p>
            EvalLense is strongest when the team needs to move from raw
            submissions to a shared review surface: intake, evidence, comparison,
            questions, and a human final call.
          </p>
        </div>
        <div className="usecases-room__stage uc-glass" data-reveal="up">
          <video autoPlay muted loop playsInline aria-hidden="true">
            <source src="/assets/section2-scroll-2.mp4" type="video/mp4" />
          </video>
          <div className="usecases-room__lens" aria-hidden="true">
            <span>Intake</span>
            <strong>EvalLense</strong>
            <span>Board</span>
          </div>
          <div className="usecases-room__outputs">
            {ROOM_OUTPUTS.map((item, index) => (
              <article
                key={item.label}
                className="usecases-room__output"
                style={{ "--i": index } as CSSProperties}
              >
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldedUseCaseCards() {
  return (
    <section
      id="workflows"
      className="band light usecases-fielded"
      aria-label="Use cases by workflow"
    >
      <div className="wrap">
        <div className="usecases-sectionhead" data-reveal="up">
          <h2>Pick the workflow that looks like yours</h2>
          <p>
            Different teams use EvalLense for different selection jobs. The
            common pattern is the same: many submissions, limited review
            capacity, and a decision that needs to be explained.
          </p>
        </div>
        <div className="usecases-field-grid">
          <div className="usecases-field-media uc-glass" data-reveal="up">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/section2-scroll-2-poster.jpg"
              aria-hidden="true"
            >
              <source src="/assets/backgrounds/bg-abstract-cinematic.mp4" type="video/mp4" />
            </video>
            <div className="usecases-field-media__copy">
              <span>Workflow atlas</span>
              <p>
                One review engine, refracted into the selection moment each
                team actually runs.
              </p>
            </div>
          </div>
          {WORKFLOWS.map((workflow, index) => (
            <a
              key={workflow.segment}
              className="uc-glass usecases-field-card"
              href={workflowHref(workflow.segment)}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}
            >
              <span className="usecases-field-card__segment">{workflow.segment}</span>
              <dl>
                <div>
                  <dt>Moment</dt>
                  <dd>{workflow.moment}</dd>
                </div>
                <div>
                  <dt>Job</dt>
                  <dd>{workflow.job}</dd>
                </div>
                <div>
                  <dt>EvalLense gives</dt>
                  <dd>{workflow.gives}</dd>
                </div>
              </dl>
              <span className="usecases-field-card__cta">{workflow.cta}</span>
            </a>
          ))}
        </div>
        <p className="usecases-note" data-reveal="up">
          Example scenarios are illustrative. They describe typical program
          workflows, not customer case studies.
        </p>
      </div>
    </section>
  );
}

function ReviewPacketScene() {
  return (
    <section className="band ink usecases-packet" aria-label="Review packet">
      <div className="wrap usecases-packet__grid">
        <div className="usecases-packet__media uc-glass" data-reveal="up">
          <Image
            src="/assets/bento/scoring-matrix.png"
            alt=""
            fill
            sizes="(max-width: 1020px) 100vw, 48vw"
            aria-hidden="true"
          />
          <div className="usecases-packet__caption">
            <span>Review packet</span>
            <strong>Scores, risks, gaps, and questions in one surface</strong>
          </div>
        </div>
        <div className="usecases-packet__copy" data-reveal="up">
          <h2>Not another list of use cases. A repeatable review packet.</h2>
          <p>
            The segment changes, but the useful output is consistent. The team
            gets a structured first read, a comparison board, and the questions
            that should shape the live conversation.
          </p>
          <div className="usecases-packet__items">
            {PACKET_ITEMS.map((item, index) => (
              <article
                key={item.label}
                className="uc-glass usecases-packet__item"
                data-reveal="up"
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowDossierTrio() {
  return (
    <section className="band soft usecases-dossier" aria-label="Primary workflows">
      <div className="wrap">
        <div className="usecases-sectionhead" data-reveal="up">
          <h2>Start with the workflows we see most</h2>
          <p>
            EvalLense can support many selection programs. These three are the
            clearest starting points today.
          </p>
        </div>
        <div className="usecases-dossier__grid">
          <div className="usecases-dossier__motion uc-glass" data-reveal="up">
            <video autoPlay muted loop playsInline aria-hidden="true">
              <source src="/assets/backgrounds/bg-wires-cinematic.mp4" type="video/mp4" />
            </video>
            <div>
              <span>From batch pressure</span>
              <strong>to a board the team can read together</strong>
            </div>
          </div>
          {PRIMARY_WORKFLOWS.map((workflow, index) => (
            <article
              key={workflow.label}
              className="uc-glass usecases-dossier__panel"
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <div className="usecases-dossier__intro">
                <span className="mini-tag">{workflow.label}</span>
                <h3>{workflow.title}</h3>
                <p>{workflow.body}</p>
              </div>
              <div className="usecases-dossier__changes">
                <span>What changes</span>
                <ul>
                  {workflow.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
              <Button
                href={workflowHref(workflow.label)}
                variant={index === 0 ? "gradient" : "ghost"}
              >
                {workflow.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignalYieldScene() {
  return (
    <section
      id="workflow-value"
      className="band light usecases-yield"
      aria-label="What every workflow gets"
    >
      <div className="wrap usecases-yield__grid">
        <div className="usecases-yield__copy" data-reveal="up">
          <p className="usecases-kicker">What you get</p>
          <h2>More signal before the final call</h2>
          <p>
            Regardless of the segment, EvalLense gives the team the same
            operating advantage: less raw pre-reading, more structured
            comparison, and a clearer decision trail.
          </p>
        </div>
        <div className="usecases-yield__stack" aria-label="Workflow value">
          {VALUES.map((item, index) => (
            <article
              key={item.title}
              className="uc-glass usecases-yield__card"
              data-reveal="up"
              style={{ "--i": index, "--reveal-delay": `${index * 70}ms` } as CSSProperties}
            >
              <span>{item.num}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeRoadmapLedger() {
  return (
    <section
      id="coverage"
      className="band light usecases-ledger-section"
      aria-label="Current coverage and roadmap"
    >
      <div className="wrap usecases-ledger-layout">
        <div className="usecases-ledger__copy" data-reveal="up">
          <p className="usecases-kicker">Current coverage</p>
          <h2>Built around pitch-deck evaluation first</h2>
          <p>
            EvalLense is strongest today where the source material is a pitch
            deck and the job is a structured first read. More segment-specific
            pages and workflow modes should stay clearly separated from what is
            already available.
          </p>
        </div>
        <div className="usecases-ledger">
          {COVERAGE.map((item, index) => (
            <article
              key={item.value}
              className="uc-glass usecases-ledger__item"
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <span>{item.value}</span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.src}</p>
              </div>
            </article>
          ))}
          <aside className="uc-glass usecases-note-band" data-reveal="up">
            <span>Scope note</span>
            <p>
              Hackathon execution review, custom rubrics, truth check, and
              workflow-specific scoring are roadmap areas. This page should not
              present them as available product coverage.
            </p>
            <div aria-label="Coverage boundaries">
              <span>Pitch Competition first</span>
              <span>Human final call</span>
              <span>No fake case studies</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function UseCasesPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="usecases section-lab ds">
        <StatementHero
          id="usecases-hero"
          surface="light"
          eyebrow="Use Cases"
          titleLead="One review system for every"
          titleAccent="high-stakes"
          titleTrail="shortlist"
          sub="Use EvalLense anywhere a batch of pitch decks has to become a shortlist your team can explain - competitions, funds, accelerators, hackathons, universities, grants, and corporate programs."
          ctas={[
            { label: "Find your workflow", href: "#workflows" },
            { label: "Book a Demo", href: "/company/contact" },
          ]}
          background="video"
          backgroundSrc="/assets/hero-intro-2.mp4"
          backgroundPoster="/assets/hero-intro-2-poster.jpg"
          version={1}
          className="usecases-hero"
        />

        <WorkflowLensScene />

        <div
          className="tr-masked-divider"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        <NarrativeControlGrid />

        <SelectionRoomScene />

        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        />

        <FieldedUseCaseCards />

        <ReviewPacketScene />

        <WorkflowDossierTrio />

        <Cinema
          id="workflow-cinema"
          surface="ink"
          eyebrow="One signal"
          headline="One engine, many workflows"
          lines={["One engine,", "many workflows"]}
          mobileLines={["One", "engine", "many", "workflows"]}
          sub="The segment changes. The operating model stays the same: intake, evidence, comparison, and a human final call."
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
          pinSteps={1}
          maskId="usecases-workflow-engine"
        />

        <div
          className="tr-masked-divider"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
        />

        <PinnedSteps
          id="engine"
          surface="ink"
          version={3}
          ariaLabel="Same EvalLense system underneath every supported workflow"
          eyebrow="Same engine"
          title={{
            line1: "Same system.",
            line2: "Different selection",
            line2Accent: "moments.",
          }}
          sub="Each workflow has its own decision context, but the core system stays the same: collect decks, structure the evidence, compare the batch, and keep the final call human."
          steps={ENGINE_ITEMS}
          videoScrub={{
            src: "/assets/methodology/methodology-transition.mp4",
            frames: 96,
            ariaLabel:
              "A cinematic workflow transition from intake to reports and comparison",
          }}
          media={{
            ratio: "16/9",
            label: "Workflow engine",
            hint: "Entry Hub to reports, review board, Jury Score, leaderboard and decision trail",
            ariaLabel:
              "A structured EvalLense workflow from Entry Hub through reports, review board, Jury Score, leaderboard and decision trail",
          }}
        />

        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="light"
          aria-hidden="true"
        />

        <SignalYieldScene />

        <ScopeRoadmapLedger />

        <CtaBand
          theme="dark"
          bleed
          eyebrow="Get started"
          title="Bring your next batch to"
          titleAccent="EvalLense"
          sub="Tell us what kind of program you run. We will map your workflow, show how the review would work, and walk through a pilot batch."
          primary={{ label: "Book a Demo", href: "/company/contact" }}
          secondary={{ label: "Choose your use case", href: "#workflows" }}
          auroraVariant="ocean"
          videoSrc="/assets/cta/neo.mp4"
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
