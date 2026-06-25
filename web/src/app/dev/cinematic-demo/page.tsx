import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import type { SectionNav } from "@/lib/site-nav";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabCinemaScrim } from "@/components/sections/lab/LabCinemaScrim";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabPricing } from "@/components/sections/lab/LabPricing";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";

/**
 * dev/cinematic-demo — FAKE, dev-only "Cinematic Ink" marketing page for a
 * fictional product, "Northwind" (turns sales-call recordings into clean CRM
 * records). Same content as dev/vivid-demo, a DIFFERENT treatment.
 *
 * Style brief: light-DOMINANT, balanced and harmonious — NO black↔white zebra.
 * Brand colour (violet / lavender / cyan / `--lens`) is woven softly across the
 * WHOLE page (low-opacity radial washes, a faint ambient glow, soft-tinted
 * cards, `.grad-word` text-clip on one word per heading). There is EXACTLY ONE
 * dark cinematic moment — the closing `LabCinemaScrim` (S8) — and the page
 * flows gently into it via a soft→ink bridge. Every other section is light/soft.
 *
 * All copy + stats are invented for the demo — NOT EvalLense facts. The
 * treatment is page-scoped under `.cinematic-demo` in globals.css and built
 * ONLY on our tokens (`--violet` / `--violet-2` / `--lavender` / `--cyan` /
 * `--lens` / `--lens-soft` / `--ink-grad`). This page touches no production
 * surface (section-lab / pricing / vivid-demo / production are all untouched).
 */
export const metadata: Metadata = {
  title: "Northwind — Cinematic demo (dev)",
  description:
    "Dev-only Cinematic Ink demo for a fictional product. Not a production page.",
  robots: { index: false, follow: false },
};

const HEADER_NAV: SectionNav = {
  section: "Northwind",
  sectionHref: "/dev/cinematic-demo",
  links: [
    { label: "How it works", href: "#process" },
    { label: "Platform", href: "#platform" },
    { label: "Pricing", href: "#pricing" },
  ],
};

export default function CinematicDemoPage() {
  return (
    <>
      {/* `section-lab` is REQUIRED: `.lab-*` styles are scoped under it; without
          it lab headings collapse to base 17px. `cinematic-demo` carries the
          page-scoped Cinematic Ink treatment. */}
      <PageHeader nav={HEADER_NAV} />
      <main className="cinematic-demo section-lab">
        {/* ── S1 · Hero — surface soft (light), colourful but calm.
            Soft --lens-soft wash + ambient glow behind it; grad-word accent. ── */}
        <LabStatementHero
          id="hero"
          eyebrow="Sales intelligence"
          titleLead="Your reps talk."
          titleAccent="Northwind"
          titleTrail="writes the CRM."
          sub="Every call becomes a clean, timestamped CRM record in under 60 seconds — no manual note-taking, no missed fields."
          ctas={[
            { label: "Start free trial", href: "#pricing" },
            { label: "See how it works", href: "#process" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · Northwind hero · 16:9",
            hint: "Product hero — a call timeline resolving into a CRM record.",
            ariaLabel: "Northwind turning a sales call into a CRM record",
          }}
        />

        {/* ── S2 · Stat band — surface soft (light). Lens-tinted numbers,
            soft brand radial behind the media. ── */}
        <LabStatBand
          id="stats"
          surface="light"
          ariaLabel="Northwind customer results"
          eyebrow="Real customer data"
          title="Numbers that move pipeline"
          stats={[
            { value: "94%", label: "field accuracy", src: "Beta cohort, Q1 2026" },
            { value: "3.2h", label: "saved / rep / week", src: "Survey, n=140" },
            { value: "41%", label: "faster deal cycle", src: "6-mo cohort" },
          ]}
          media={{
            ratio: "21/9",
            label: "Image · results dashboard · 21:9",
            hint: "Aggregate accuracy and time-saved across the beta cohort.",
            ariaLabel: "Northwind results dashboard",
          }}
        />

        {/* ── S3 · Pinned steps — surface SOFT (light, never ink — keeps the
            page from dropping into a dark block). line2Accent = grad-word. ── */}
        <LabPinnedSteps
          id="process"
          surface="light"
          ariaLabel="How Northwind works"
          eyebrow="How it works"
          title={{ line1: "A call ends.", line2: "A record", line2Accent: "appears." }}
          sub="Northwind sits on every call and hands your CRM a finished record before the next meeting starts."
          steps={[
            { num: "01", label: "Capture", desc: "Joins Zoom, Teams or Gong — no bot babysitting." },
            { num: "02", label: "Transcribe", desc: "Speaker-separated transcript in under 30 seconds." },
            { num: "03", label: "Structure", desc: "Maps the conversation onto your CRM schema." },
            { num: "04", label: "Sync", desc: "Writes to Salesforce, HubSpot or Pipedrive." },
          ]}
          media={{
            ratio: "4/3",
            label: "Image · pipeline · 4:3",
            hint: "Capture → transcribe → structure → sync, step by step.",
            ariaLabel: "Northwind processing pipeline",
          }}
        />

        {/* ── S4 · Editorial split — surface light. titleAccent "reads" =
            grad-word. ── */}
        <LabEditorialSplit
          id="intelligence"
          surface="light"
          ariaLabel="Northwind field intelligence"
          eyebrow="Field intelligence"
          titleLead="Northwind"
          titleAccent="reads"
          titleTrail=" the deal, not just the words."
          sub="Beyond the transcript, Northwind infers MEDDIC qualification, surfaces the agreed next steps, and scores close-probability from the language buyers actually use."
          media={{
            ratio: "4/3",
            label: "Image · deal read-out · 4:3",
            hint: "MEDDIC fields and next-step inference pulled from a call.",
            ariaLabel: "Northwind deal intelligence read-out",
          }}
        />

        {/* ── S5 · Bento — surface SOFT (light, NOT ink). The feature tile
            carries a soft brand-gradient tint (page-scoped, restrained). ── */}
        <LabBento
          id="platform"
          surface="light"
          ariaLabel="Northwind platform overview"
          eyebrow="Platform at a glance"
          title="One platform, four guarantees"
          sub="Everything a revenue team needs to trust the record — accurate, connected, and private by default."
          items={[
            {
              tag: "Feature",
              title: "Deal intelligence",
              body: "Reads qualification, next steps and risk from the call and writes them straight to the opportunity.",
              feature: true,
              media: {
                label: "Image · deal intelligence · 16:9",
                hint: "Live opportunity enriched from the latest call.",
                ariaLabel: "Northwind deal intelligence tile",
              },
            },
            {
              tag: "Integrations",
              title: "14 platforms",
              body: "One-click connections to the tools your team already runs.",
            },
            {
              tag: "Accuracy",
              title: "94%, reviewable",
              body: "Every field is human-reviewable with a link back to the moment in the call.",
            },
            {
              tag: "Privacy",
              title: "SOC 2 Type II",
              body: "We never train models on your call data.",
            },
          ]}
        />

        {/* ── S6 · Gallery — surface light. Gallery lens-accents its first
            heading word on its own. ── */}
        <LabGallery
          id="teams"
          surface="light"
          ariaLabel="Northwind for every revenue team"
          eyebrow="Built for every revenue team"
          title="Every role. One record."
          sub="One record, read differently by everyone who needs it."
          laneLabel="Revenue roles Northwind serves"
          items={[
            { tag: "AE", title: "Account Executive", body: "Walk into every call already briefed on the last one." },
            { tag: "SDR", title: "Sales Development", body: "Hand off discovery notes that the AE actually trusts." },
            { tag: "RevOps", title: "Revenue Operations", body: "Clean pipeline data without chasing reps for updates." },
            { tag: "Enablement", title: "Enablement", body: "Spot coaching moments straight from real call patterns." },
            { tag: "Leadership", title: "Leadership", body: "Forecast on what was said, not what was typed in." },
          ]}
        />

        {/* ── S7 · Pricing — surface soft. Recommended tier gets the soft
            --lens-soft tint via the page-scoped rule. ── */}
        <LabPricing
          id="pricing"
          surface="light"
          ariaLabel="Northwind pricing"
          eyebrow="Pricing"
          title="Pricing that scales with your team"
          sub="Start free. Upgrade when the record pays for itself."
          ctaLabel="Choose plan"
          ctaHref="#"
          tiers={[
            {
              name: "Starter",
              price: "$0",
              body: "For solo reps trying Northwind on a few calls a week.",
              bullets: ["20 calls / month", "Transcripts + records", "1 CRM connection"],
            },
            {
              name: "Growth",
              price: "$49",
              body: "For working AEs who live on calls.",
              bullets: ["Unlimited calls", "Deal intelligence", "All CRM connections", "MEDDIC scoring"],
              recommended: true,
            },
            {
              name: "Team",
              price: "$99",
              body: "For teams that share one pipeline.",
              bullets: ["Everything in Growth", "Shared workspaces", "Coaching insights", "Admin controls"],
            },
            {
              name: "Enterprise",
              price: "Custom",
              body: "For orgs with security and scale needs.",
              bullets: ["SSO + SCIM", "Custom retention", "SOC 2 reports", "Dedicated success"],
            },
          ]}
          note="All plans include SOC 2 Type II controls. We never train on your call data."
        />

        {/* seam: gentle soft → ink, the only descent into dark on the page */}
        <div
          className="tr-gradient-bridge"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── S8 · Cinema scrim — THE ONE ink cinematic close. Full-bleed
            media → knockout headline → lens resolve → flows to footer. Glass
            CTA via the shared liquid-glass group. ── */}
        <LabCinemaScrim
          id="cta"
          surface="ink"
          eyebrow="Get started"
          headline="Your next call writes itself."
          sub="Connect a calendar and Northwind starts writing records on your very next call."
          cta={{ label: "Start free — no credit card", href: "#pricing" }}
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
          maskId="northwind-close"
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
