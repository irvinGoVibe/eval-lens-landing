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
    label: "Create the project",
    desc: "A five-step wizard sets the details, criteria, judges, collection method, and a final review.",
  },
  {
    num: "02",
    label: "Set up the submission page",
    desc: "Choose manual or self-upload. For self-upload, set the required deck, the deadline, an optional cap, and whether the page is open or invite-only.",
  },
  {
    num: "03",
    label: "Publish and share",
    desc: "Publishing makes your page live at a public link. Copy the link, share a QR code, or preview the page as a participant first.",
  },
  {
    num: "04",
    label: "Teams submit",
    desc: "Participants sign in with Google and upload their own deck. Each entry appears in your workspace automatically.",
  },
  {
    num: "05",
    label: "The workspace fills up",
    desc: "Every entry lands in one private list with its status and completeness at a glance.",
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
    body: "PDF, PPT, PPTX, or a Google Slides link — one file per team, up to 50 MB.",
  },
  {
    tag: "Note",
    title: "Note for the jury",
    body: "An optional comment each team can add for context.",
  },
  {
    tag: "Status",
    title: "Submission status",
    body: "Every entry shows ready, incomplete, or submitted at a glance.",
  },
];

/* 6. Built-in controls — horizontal gallery of equal cards. */
const CONTROLS = [
  {
    tag: "Publish gate",
    title: "Publish gate",
    body: "Your page stays private until you publish it. Before that, the public link returns nothing.",
  },
  {
    tag: "Preview",
    title: "Preview first",
    body: "See exactly what teams will see before you go live.",
  },
  {
    tag: "Access",
    title: "Open or invite-only",
    body: "Let anyone with the link submit, or restrict it to a list of emails you seed.",
  },
  {
    tag: "Window",
    title: "Submission window",
    body: "Entries open on your start date and close at the deadline — or the moment you start judging.",
  },
  {
    tag: "Share",
    title: "Link, QR, and share",
    body: "Copy the link, share a QR code, or post it to Telegram or X in one click.",
  },
  {
    tag: "Invites",
    title: "Auto-linked invites",
    body: "Pre-add a team by email; when they sign in with the same Google account, their entry links up on its own.",
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
          titleLead="One"
          titleAccent="entry point"
          titleTrail="for every batch"
          sub="Open a private submission page, gather pitch decks and team details in one place, and start evaluation from a batch that's already complete."
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
          titleLead="Decks arrive from"
          titleAccent="everywhere"
          sub="Email, Google Forms, Airtable, Notion, Telegram, shared drives. Files go missing, duplicates pile up, and the details you need sit in five different places. The work starts long before evaluation does — and it's the wrong work."
        />

        {/* §3. How it works → PinnedSteps (soft), 6 pinned steps. */}
        <PinnedSteps
          id="how"
          surface="ink"
          version={1}
          ariaLabel="How Entry Hub works — six steps"
          eyebrow="How it works"
          title={{
            line1: "From one link",
            line2: "to one",
            line2Accent: "ready batch",
          }}
          sub="Set up the page once, publish it, and let entries collect themselves. Each step lights up as you scroll."
          steps={HOW_STEPS}
          media={{
            ratio: "4/3",
            label: "Image · entry hub flow · 4:3",
            hint: "A six-step track whose nodes light up in sequence on a light surface",
            ariaLabel:
              "A six-step track whose nodes light up in sequence",
          }}
        />

        {/* ── seam §3→§4 — dark→light (fades ds-relight in + brand bloom). ── */}
        <ZoneToneFlipReverse />

        {/* §4. Two ways to collect → EditorialSplit (light). The two modes
            are grounded as `points` rows beside the visual. */}
        <EditorialSplit
          id="collect-modes"
          surface="light"
          version={2}
          eyebrow="Two ways to collect"
          titleLead="Add teams yourself,"
          titleAccent="or let them submit"
          sub="Pick the method that fits your event — both land entries in the same workspace."
          points={[
            {
              title: "Manual",
              body: "Add each team yourself on the project page — name, project, pitch deck, and an optional note for the jury.",
            },
            {
              title: "Self-upload",
              body: "Share one public link. Teams sign in with Google and upload their own deck — no files in your inbox, no accounts to manage on your side.",
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
        <Bento
          id="collect"
          surface="light"
          version={2}
          eyebrow="What gets collected"
          title="Everything the review needs, in one record"
          sub="Each entry carries the same fields, so the batch is consistent before evaluation starts."
          items={COLLECTED.map((c) =>
            c.feature
              ? {
                  ...c,
                  media: {
                    label: "Image · entry record · 16:9",
                    hint: "One structured entry record holding team, deck, note, and status",
                    ariaLabel:
                      "One structured entry record holding team, deck, note, and status",
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
          eyebrow="Built-in controls"
          titleAccent="You decide"
          title="who submits, and when"
          sub="The page is private until you say otherwise, and submissions close on your terms."
          laneLabel="Entry Hub controls — horizontally scrollable"
          items={CONTROLS}
        />

        {/* §7. Why it matters → EditorialSplit (light). Pull-quote folded
            into the closing line of `sub`; media slot holds the value visual. */}
        <EditorialSplit
          id="value"
          surface="ink"
          version={3}
          eyebrow="Why it matters"
          titleLead="One clean batch"
          titleAccent="before evaluation starts"
          sub="Collect once, in one place — when you start judging, the batch is already complete and consistent."
          points={[
            {
              title: "One private workspace",
              body: "Every deck and every detail your review needs in one place — not scattered across inboxes, forms, and drives.",
            },
            {
              title: "Complete and consistent",
              body: "When you start judging, the batch is already whole — same fields on every entry, nothing missing.",
            },
            {
              title: "The final call is yours",
              body: "From there, EvalLense prepares the analysis, and the decision always stays with you.",
            },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · one clean workspace · 16:9",
            hint: "A single private workspace holding every entry, ready to judge",
            ariaLabel:
              "One private workspace holding every entry, ready to judge",
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
          eyebrow="Get started"
          title="See your intake flow on"
          titleAccent="your own event"
          sub="Book a demo and watch one link turn a flood of decks into a clean, ready-to-judge batch."
          primary={{ label: "Book a Demo", href: "/company/contact" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
