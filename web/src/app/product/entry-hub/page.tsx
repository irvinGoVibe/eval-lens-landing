import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import { ZoneBlobs } from "@/components/ZoneBlobs";
import { StatementHero, FullStatement, PinnedSteps, EditorialSplit, Bento, Gallery, CtaBand } from "@/components/ds";
import { CanvasFlowField } from "@/components/CanvasFlowField";
import { DelayedLoopVideo } from "@/components/DelayedLoopVideo";

/** Header nav for this page — anchor links to its own sections (see the
 *  matching `id`s on the DS sections below). Each page declares its own. */
const HEADER_NAV: SectionNav = {
  section: "Product",
  sectionHref: "/product/entry-hub",
  links: [
    { label: "How it works", href: "#how" },
    { label: "Collected", href: "#collect" },
    { label: "Controls", href: "#controls" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense Entry Hub — One Intake Flow for Pitch Decks",
  description:
    "Entry Hub replaces scattered intake with one controlled flow: a private submission page, deck collection by link or by hand, and a clean batch-workspace before evaluation starts.",
};

/*
 * ── COMPOSITION ──────────────────────────────────────────────────────────
 * All eight sections are composed from the clean design-system barrel
 * (@/components/ds). The const data arrays below (HOW_STEPS / COLLECTED /
 * CONTROLS) hold the confirmed content and are passed straight in. §2 is now
 * FullStatement. Approved "Calm Editorial" surface arc — light-dominant, only
 * the two cinematic peaks (§2, §8) are ink:
 *   soft · ink · soft · light · light · light · soft · ink.
 *
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. The DS sections render their own
 * VISIBLE, labeled placeholders (ratio-locked, on canonical tokens) from the
 * `media` props passed below — never an empty grey div. When a generator is
 * available, produce the assets and drop them into
 * web/public/assets/entry-hub/.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * Motion is the components' built-in data-reveal / data-pin, driven by the
 * single <ScrollFX/> mounted once after <Footer/>. No per-section useEffect,
 * no ScrollOrchestrator edits. reduced-motion is handled by the engine + the
 * primitives' @media block.
 */

/* 3. How it works — six steps revealed through the pin engine. */
const HOW_STEPS = [
  {
    num: "01",
    label: "Set up the project",
    desc: "Add the event details, criteria, and judges.",
  },
  {
    num: "02",
    label: "Choose how teams enter",
    desc: "Add teams yourself or let them submit through a public page.",
  },
  {
    num: "03",
    label: "Add or share",
    desc: "Add teams manually, or publish and share the submission link.",
  },
  {
    num: "04",
    label: "Collect the entries",
    desc: "Every deck and team detail lands in the same project workspace.",
  },
  {
    num: "05",
    label: "Check readiness",
    desc: "See what's ready, what's incomplete, and what still needs attention.",
  },
  {
    num: "06",
    label: "Start judging",
    desc: "Launch evaluation once at least one entry is ready.",
  },
];

/* 5. What gets collected — bento (first tile is the feature). */
const COLLECTED = [
  {
    tag: "Team",
    title: "Team and project",
    body: "Startup name, the founder or team, and a short description in each team's own words.",
    feature: true,
  },
  {
    tag: "Deck",
    title: "Pitch deck",
    body: "PDF, PPT, PPTX, or Google Slides link. One deck per team, up to 50 MB.",
  },
  {
    tag: "Note",
    title: "Note for judges",
    body: "An optional note teams can add for context.",
  },
  {
    tag: "Status",
    title: "Entry status",
    body: "See whether each entry is ready, incomplete, or submitted.",
  },
];

/* 6. Built-in controls — horizontal gallery of equal cards. */
const CONTROLS = [
  {
    tag: "Publish",
    title: "Publish when ready",
    body: "Keep the submission page private until you are ready to publish.",
  },
  {
    tag: "Preview",
    title: "Preview before publishing",
    body: "Check exactly what teams will see before the page goes live.",
  },
  {
    tag: "Access",
    title: "Open or restricted access",
    body: "Accept submissions from anyone with the link or only from approved email addresses.",
  },
  {
    tag: "Window",
    title: "Set the submission window",
    body: "Choose when submissions open and close. You can also close them when judging begins.",
  },
  {
    tag: "Share",
    title: "Share by link or QR code",
    body: "Share the submission page by link, QR code, Telegram, or X.",
  },
  {
    tag: "Invites",
    title: "Automatically link invites",
    body: "Add a team by email. When they sign in with the same Google account, their submission connects automatically.",
  },
];

export default function EntryHubPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="entry-hub section-lab ds">
        {/* ── ONE continuous tonal zone (§1–§7): dark→light→dark on the shared
            through-background. Layer stack (z-index:-1, DOM order = back→front):
              1) --lobes-dark + --on     dark BASE (always on) — §1–§3
              2) --lobes ds-relight      light layer, faded 0→1 by <ZoneToneFlipReverse/>
                 at §3→§4 → covers the dark, so §4–§5 read light
              3) --lobes-dark .ds-redark second dark layer, faded 0→1 by
                 <ZoneToneFlip targetSelector=".ds-redark"/> at §5→§6 → dark §6–§7
              4) ds-flip-bridge + __glow brand bloom at the §3→§4 reverse seam
            ZoneBlobs banded to §4–§5 light island (top + bottom on single component).
            CtaBand + Footer own their own backdrops → OUTSIDE the zone. ── */}
        <div className="ds-zone">
          <div
            className="ds-zone__bg ds-canvas__bg--lobes-dark ds-zone__bg--on"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <div
            className="ds-zone__bg ds-canvas__bg--lobes ds-relight"
            aria-hidden="true"
          />
          <div
            className="ds-zone__bg ds-canvas__bg--lobes-dark ds-redark"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />
          {/* PNG blobs banded to light island §4–§5 only.
              top="38%" clips blobs off §1–§3 dark; bottom="28%" clips off §6–§7 dark.
              Fine-tune via ?blobs inspector. */}
          <ZoneBlobs top="38%" bottom="28%" />
          <CanvasFlowField blue />

        {/* §1. Hero → StatementHero (ships soft; no surface prop). */}
        <StatementHero
          id="top"
          surface="ink"
          version={2}
          eyebrow="Entry Hub"
          titleLead="One place for"
          titleAccent="every pitch deck"
          sub="Add teams yourself or share a submission link. Every deck and detail lands in one batch, ready for review."
          ctas={[{ label: "Book a Demo", href: "/company/contact" }]}
          media={{
            ratio: "16/9",
            label: "Image · intake channels into one lens · 16:9",
            hint: "Scattered intake channels converging into one clean submission list",
            ariaLabel:
              "Scattered intake channels converging into one clean submission list",
          }}
        />

        {/* §2. The intake problem → FullStatement (ink) — cinematic peak #1. */}
        <FullStatement
          id="problem"
          surface="ink"
          version={2}
          ariaLabel="The intake problem"
          eyebrow="The intake problem"
          titleLead="Before judging starts, you're already"
          titleAccent="chasing files"
          sub="Decks come through email, Forms, Airtable, Notion, Telegram, and shared drives. Some go missing. Others arrive twice. The details you need are split across all of them."
        />

        {/* §3. How it works → PinnedSteps (soft), 6 pinned steps. */}
        <PinnedSteps
          id="how"
          surface="ink"
          version={3}
          ariaLabel="How Entry Hub works — six steps"
          eyebrow="How it works"
          title={{
            line1: "From setup",
            line2: "to judging in",
            line2Accent: "six steps",
          }}
          sub="Choose how teams enter. Add them yourself or open submissions. Every entry lands in the same workspace."
          steps={HOW_STEPS}
          mediaNode={
            <>
              {/* Delayed loop: play once, hold last frame, replay after 7s.
                  Reuses the v3 square frame classes so all global styling +
                  mobile pinned-strip behaviour is inherited; only the video
                  swaps to DelayedLoopVideo. Page-local; shared component
                  untouched. The node-height rule keeps the square sized on the
                  mobile strip (the extra .lab-rv__node wrapper has no height). */}
              <style>{`.entry-hub .lab-rv__node{height:100%;display:grid;place-items:center;}`}</style>
              <div
                className="lab-rv__square lab-rv__square--video"
                role="img"
                aria-label="The EvalLense Entry Hub interface, from project setup to start judging"
              >
                <DelayedLoopVideo
                  className="lab-rv__slide"
                  src="/assets/entry-hub/entry-hub-flow-v2.mp4"
                  gap={7}
                  ariaHidden
                />
              </div>
            </>
          }
          media={{
            ratio: "4/3",
            label: "EvalLense · workflow",
            hint: "The EvalLense Entry Hub interface, from project setup to start judging",
            ariaLabel:
              "The EvalLense Entry Hub interface, from project setup to start judging",
          }}
        />

        {/* ── seam §3→§4 — dark→light (fades ds-relight in + brand bloom). ── */}
        <ZoneToneFlipReverse />

        {/* §4. Two ways to collect → EditorialSplit (light). The two modes
            are grounded as `points` rows beside the visual. */}
        <EditorialSplit
          id="collect-modes"
          surface="light"
          version={3}
          eyebrow="Two ways to add teams"
          titleLead="Add teams yourself or"
          titleAccent="collect submissions"
          sub="Use manual entry or share a public submission link. Everything stays in one workspace."
          points={[
            {
              title: "Add manually",
              body: "Add each team from the project page: name, project, pitch deck, and an optional note for the jury.",
            },
            {
              title: "Team submission",
              body: "Share one public link. Teams sign in with Google and upload their own decks. No email attachments or accounts to manage.",
            },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · public upload page · 16:9",
            hint: "Public upload page (Google sign-in + deck upload) beside the entries dashboard",
            ariaLabel:
              "Public upload page beside the organizer's entries dashboard",
          }}
        />

        {/* §5. What gets collected → Bento (light). Media on the feature tile. */}
        {/* page-local: nudge the feature image +10% (scoped to #collect). */}
        <style>{`
          #collect .lab-bento__media--img{ transform: scale(1.1); transform-origin: center; }
        `}</style>
        <Bento
          id="collect"
          surface="light"
          version={2}
          eyebrow="One complete entry"
          title="Everything judges need, in one record"
          titleAccent="record"
          sub="Every entry follows the same structure, so judging starts with clean, consistent data."
          items={COLLECTED.map((c) =>
            c.feature
              ? {
                  ...c,
                  media: {
                    src: "/assets/entry-hub/entry-record-v2.webp",
                    width: 1536,
                    height: 1024,
                    label: "Image · entry record · 16:9",
                    hint: "One structured record for the team, deck, note, and status",
                    ariaLabel:
                      "One structured record for the team, deck, note, and status",
                  },
                }
              : c,
          )}
        />

        {/* ── seam §5→§6 — light→dark (fades .ds-redark in). ── */}
        <ZoneToneFlip targetSelector=".ds-redark" />

        {/* §6. Built-in controls → Gallery (light — supports light/ink only). */}
        <Gallery
          id="controls"
          surface="ink"
          version={4}
          eyebrow="Submission controls"
          titleAccent="Control"
          title="who can submit and when"
          sub="Keep the page private, choose who gets access, and close submissions on your schedule."
          laneLabel="Entry Hub controls — horizontally scrollable"
          items={CONTROLS}
        />

        {/* §7. Why it matters → EditorialSplit (light). Pull-quote folded
            into the closing line of `sub`; media slot holds the value visual. */}
        <EditorialSplit
          id="value"
          surface="ink"
          version={1}
          eyebrow="Ready for review"
          titleLead="Start judging with"
          titleAccent="everything in place"
          sub="No missing files, scattered notes, or inconsistent submission formats."
          points={[
            {
              title: "One shared workspace",
              body: "Keep every deck, note, and team detail in one place instead of across inboxes, forms, and drives.",
            },
            {
              title: "Complete by default",
              body: "Every submission follows the same structure, making missing information easy to spot before judging starts.",
            },
            {
              title: "Ready to evaluate",
              body: "Start evaluation with a complete, consistent set of submissions.",
            },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · high-contrast hyperreal liquid-glass workspace · 16:9",
            hint:
              "High-contrast EvalLense workspace with crisp liquid-glass screens, a front-facing holographic unicorn head, world clocks, and a black RGB keyboard",
            ariaLabel:
              "High-contrast hyperrealistic EvalLense liquid-glass workspace with leaderboard, startup report, dimension matrix, world clocks, black keyboard, deck controls, and a front-facing holographic unicorn head",
            src: "/assets/entry-hub/evallense-brandkit-workspace-unicorn-08.webp",
            width: 1672,
            height: 941,
          }}
        />

        {/* seam §7→§8 — gradient bridge into CtaBand: transparent (top) → ink (bottom). */}
        <div
          className="tr-gradient-bridge"
          data-to="ink"
          style={{ ["--from" as string]: "transparent", height: "200px" } as React.CSSProperties}
          aria-hidden="true"
        />
        </div>{/* /ds-zone §1–§7 */}

        {/* §8. Final CTA → CtaBand (ink/dark) — cinematic peak #2. Looping
            background video (`neo`) with `bleed` so it spills onto the footer;
            `auroraVariant` is the CSS fallback when the video can't play. */}
        <CtaBand
          theme="dark"
          bleed
          videoSrc="/assets/cta/neo.mp4"
          auroraVariant="violet"
          eyebrow="See it in action"
          title="See your submission flow"
          titleAccent="in action"
          sub="Book a demo and walk through the full journey from public link to structured review workspace."
          primary={{ label: "Book a demo", href: "/company/contact" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
