import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import { StatementHero, FullStatement, PinnedSteps, EditorialSplit, Bento, Gallery, QuietCta } from "@/components/ds";

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
        {/* §1. Hero → StatementHero (ships soft; no surface prop). */}
        <StatementHero
          id="top"
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
          ariaLabel="The intake problem"
          eyebrow="The intake problem"
          titleLead="Decks arrive from"
          titleAccent="everywhere"
          sub="Email, Google Forms, Airtable, Notion, Telegram, shared drives. Files go missing, duplicates pile up, and the details you need sit in five different places. The work starts long before evaluation does — and it's the wrong work."
        />

        {/* §3. How it works → PinnedSteps (soft), 6 pinned steps. */}
        <PinnedSteps
          id="how"
          surface="light"
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

        {/* §4. Two ways to collect → EditorialSplit (light). The two modes
            are grounded as `points` rows beside the visual. */}
        <EditorialSplit
          id="collect-modes"
          surface="light"
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

        {/* §6. Built-in controls → Gallery (light — supports light/ink only). */}
        <Gallery
          id="controls"
          surface="light"
          eyebrow="Built-in controls"
          title="You decide who submits, and when"
          sub="The page is private until you say otherwise, and submissions close on your terms."
          laneLabel="Entry Hub controls — horizontally scrollable"
          items={CONTROLS}
        />

        {/* §7. Why it matters → EditorialSplit (light). Pull-quote folded
            into the closing line of `sub`; media slot holds the value visual. */}
        <EditorialSplit
          id="value"
          surface="light"
          eyebrow="Why it matters"
          titleLead="One clean batch"
          titleAccent="before evaluation starts"
          sub="Every deck and every detail your review needs, in one private workspace — not scattered across inboxes, forms, and drives. When you start judging, the batch is already complete and consistent. Collect once, in one place — from there, EvalLense prepares the analysis, and the final call is always yours."
          media={{
            ratio: "16/9",
            label: "Image · one clean workspace · 16:9",
            hint: "A single private workspace holding every entry, ready to judge",
            ariaLabel:
              "One private workspace holding every entry, ready to judge",
          }}
        />

        {/* §8. Final CTA → QuietCta (ink) — cinematic peak #2. */}
        <QuietCta
          id="cta"
          surface="ink"
          eyebrow="Get started"
          title="See your intake flow on your own event"
          sub="Book a demo and watch one link turn a flood of decks into a clean, ready-to-judge batch."
          cta={{ label: "Book a Demo", href: "/company/contact" }}
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
