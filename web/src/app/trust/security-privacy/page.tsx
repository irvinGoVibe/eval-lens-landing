import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { CanvasFlowField } from "@/components/CanvasFlowField";
import {
  StatementHero,
  EditorialSplit,
  Bento,
  RiskControl,
  CtaBand,
} from "@/components/ds";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Workspace", href: "#workspace" },
    { label: "Access", href: "#flow" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Security & Privacy for Pitch Deck Evaluation",
  description:
    "Private deck handling, database-level project isolation, server-only secrets and human-owned decisions — security as the trust layer of EvalLense.",
};

export default function SecurityPrivacyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds">
        {/* ── Single tonal zone §1–7: light bg always visible; dark bg starts at
            opacity:0 and is crossfaded in by <ZoneToneFlip/> at the §4→§5 seam. ── */}
        <div className="ds-zone">
          <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes" aria-hidden />
          <div className="ds-canvas__bg ds-canvas__bg--lobes-dark" data-anim="2" aria-hidden>
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          {/* Floating PNG orbs drifting behind the whole tonal zone (§1–7), above
              the lobes gradient, behind content. One ZoneBlobs layer only spans
              ~the top of a zone, so a second cluster is placed lower (top:55%) to
              carry orbs across the dark §5–7 too. */}
          <ZoneBlobs />
        {/* 1. Statement hero — soft (page-top). */}
        <StatementHero
          id="top"
          surface="light"
          version={1}
          eyebrow="Security & Privacy"
          titleLead="Private pitch-deck handling."
          titleAccent="Human decisions."
          sub="EvalLense keeps pitch decks, workspace access, and report delivery controlled. AI prepares the review. A person decides what happens next."
          ctas={[{ label: "Book a demo", href: "/#demo" }]}
          media={{
            ratio: "16/9",
            label: "Visual: deck in a private perimeter",
            hint: "Show a deck entering a contained, private perimeter with a soft lock hint.",
            ariaLabel:
              "A deck entering a private lens perimeter with a soft lock hint",
          }}
        />



        {/* 2. Why privacy matters — editorial split, light. */}
        <EditorialSplit
          surface="light"
          version={3}
          ariaLabel="Why this needs control"
          eyebrow="Why this needs control"
          titleLead="Decks and results carry"
          titleAccent="sensitive information"
          sub="Pitch decks often include strategy, financials, founder details, and selection outcomes. That information should not move freely or leak through open links."
          media={{
            ratio: "4/3",
            label: "Visual: what's sensitive in a deck",
            hint: "Show the sensitive information a pitch deck carries, held calmly in view.",
            ariaLabel:
              "A calm depiction of the sensitive information carried inside a pitch deck",
          }}
          points={[
            {
              title: "Strategy",
              body: "A deck can include plans, positioning, and market strategy.",
            },
            {
              title: "Financials",
              body: "Revenue, pricing, burn, or fundraising details need controlled access.",
            },
            {
              title: "Founder details",
              body: "Team backgrounds and founder details should stay inside the review flow.",
            },
            {
              title: "Review outcome",
              body: "Scores, notes, and shortlist decisions can affect funding, selection, and reputation.",
            },
          ]}
        />

        {/* 3. Private workspace — bento, light. */}
        <Bento
          id="workspace"
          surface="light"
          version={2}
          eyebrow="Controlled workspace"
          title="Each batch stays inside a controlled workspace"
          sub="Evaluation runs inside a workspace owned by the organizer. Access is scoped to the people and roles that belong to that project."
          items={[
            {
              tag: "Controlled workspace",
              title: "A batch is not a public document",
              body: "Decks, applications, scores and reports stay inside an authorized workspace. Nothing about a batch is exposed by default — access is granted, not assumed.",
              feature: true,
              media: {
                src: "/assets/security-privacy/controlled-workspace.webp",
                width: 1672,
                height: 941,
                ratio: "1672/941",
                label: "Visual: controlled workspace",
                hint: "Show decks, scores, and reports inside one scoped glass workspace. Access is granted deliberately, not assumed.",
                ariaLabel:
                  "A controlled, private workspace where a batch's decks, scores and reports stay scoped to authorized people",
              },
            },
            {
              tag: "Organizer-owned project",
              title: "One organizer owns each project in MVP",
              body: "In the MVP, each project belongs to one organizer. That organizer owns the decks, evaluations, and reports.",
            },
            {
              tag: "Publish gate",
              title: "Intake opens only after publishing",
              body: "Participants submit through /e/<slug>. The page is public only after the organizer publishes the project. Before that, it returns 404.",
            },
          ]}
        />

        {/* ── Tone-flip seam §3→§4: ZoneToneFlip crossfades the dark bg 0→1
            (workspace is the last light section; access proof onward is ink). ── */}
        <ZoneToneFlip />
        {/* Flow-field: scrub-driven coloured blobs inside the dark bg layer. */}
        <CanvasFlowField />

        {/* 4. Access proof — risk/guardrail block (ds-risk), ink. The single
            access-control section: short intro + four guardrail rows
            (boundary → how it's enforced). Replaced the old Numbered §4. */}
        <RiskControl
          id="flow"
          surface="ink"
          ariaLabel="How access works"
          eyebrow="Access control"
          title="Access is enforced below the UI."
          sub="Access is not handled only by the interface. Sessions, roles, database policies, and server-only keys decide what each request can see."
          leftTag="Guardrail"
          rightTag="How it works"
          pairs={[
            {
              risk: "Session boundary",
              control:
                "Sessions live in httpOnly cookies. Client-side scripts cannot read the token directly.",
            },
            {
              risk: "Database rules",
              control:
                "Postgres applies row-level security. Organizers can read and write only the projects tied to their account.",
            },
            {
              risk: "Server-only keys",
              control:
                "Service-role and AI Gateway keys stay on the server. Admin operations run only after an explicit admin check.",
            },
            {
              risk: "Public gate",
              control:
                "The public /e/<slug> page opens only after the organizer publishes the project. Before that, it returns 404.",
            },
          ]}
        />

        {/* 5. Report delivery — editorial split, ink. */}
        <EditorialSplit
          surface="ink"
          version={2}
          ariaLabel="Report delivery"
          eyebrow="Report delivery"
          titleLead="Reports are shared on purpose"
          sub="Reports should move through the organizer's workspace, not through accidental public access. Participant-facing report sharing is post-MVP."
          media={{
            src: "/assets/security-privacy/report-delivery.webp",
            width: 1280,
            height: 512,
            ratio: "1280/512",
            label: "Visual: report delivery",
            hint: "Show a report moving through the organizer's authorized workspace, not through an open public link.",
            ariaLabel:
              "Glass illustration: a pitch deck flows through the organizer's authorized workspace into a locked private report",
          }}
          points={[
            {
              title: "Shared deliberately, not leaked",
              body: "A report reaches someone only when the organizer chooses to share it. Participant-facing sharing comes after MVP.",
            },
          ]}
        />

        {/* 6. Human in the loop — editorial split, ink. */}
        <EditorialSplit
          surface="ink"
          version={1}
          ariaLabel="Human in the loop"
          eyebrow="Human in the loop"
          titleLead="The final decision stays"
          titleAccent="human"
          sub="EvalLense prepares the analysis. The organizer reviews it, sets the final scores, and decides how the report is used. AI does not become the final judge."
          media={{
            ratio: "4/3",
            label: "Visual: AI-to-human handoff",
            hint: "Show AI analysis handed to a human reviewer. The visual should make it clear: analysis is automated, the verdict is not.",
            ariaLabel:
              "An AI-to-human handoff where AI prepares the analysis and a person owns the decision",
            src: "/assets/security-privacy/final-decision-human-ranking.webp",
            width: 1619,
            height: 972,
          }}
          points={[
            {
              title: "AI analysis is advisory",
              body: "AI Total Score is a reference. It does not rank participants by itself.",
            },
            {
              title: "Human owns the final score",
              body: "Ranking is built from the organizer's final scores. The organizer decides how the report is used.",
            },
          ]}
        />

          {/* Fade the dark zone to pure black over 200px before the CTA closer. */}
          <div className="tr-fade-ink" aria-hidden />
        </div>
        {/* ── End unified tonal zone ── */}

        {/* 7. Final CTA — CtaBand on the dark (ink) theme with a looping
            background video and `bleed` so it spills onto the black footer:
            the page's single cinematic ink closer. `auroraVariant` is the CSS
            fallback when the video can't play. */}
        <CtaBand
          theme="dark"
          bleed
          videoSrc="/assets/cta/neo.mp4"
          auroraVariant="violet"
          eyebrow="Get started"
          title="Run a controlled pilot on"
          titleAccent="your own decks"
          sub="Book a demo and see how EvalLense handles decks, access, reports, and final decisions in one controlled flow."
          primary={{ label: "Book a demo", href: "/#demo" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
