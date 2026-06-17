import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabCinemaScrim } from "@/components/sections/lab/LabCinemaScrim";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabPricing } from "@/components/sections/lab/LabPricing";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";

/**
 * dev/vivid-demo-2 — FAKE, dev-only "Northwind" demo page, restyled to adopt
 * the "Transitions Catalog (light-dominant)" treatment. Same copy/stats as
 * before; page-scoped under `.vivid-demo-2` in globals.css so it can be
 * restyled without touching production. All copy and stats are invented —
 * NOT EvalLense facts.
 *
 * Surface arc (DOM order): soft · light · INK · light · soft · light · light ·
 * INK — light-dominant with TWO well-separated ink peaks (S3 LabPinnedSteps,
 * S8 LabCinemaScrim) and NO black↔white zebra. Each band rides up over the
 * previous (rise-over); the light section after each ink peak lifts cleanly
 * away from the dark. Built ONLY on our tokens (`--violet` / `--violet-2` /
 * `--lavender` / `--cyan` / `--ink-grad` / `--fg-on-dark` / `--bg` /
 * `--bg-soft`). Motion is the native `data-reveal` / `data-pin` / `data-scrub`
 * on the Lab sections, driven by the single page-level `<ScrollFX/>`.
 */
export const metadata: Metadata = {
  title: "Northwind — Vivid demo 2 (dev)",
  description:
    "Dev-only copy of the Vivid demo for a fictional product. Not a production page.",
  robots: { index: false, follow: false },
};

export default function VividDemo2Page() {
  return (
    <>
      <main className="vivid-demo-2 section-lab">
        {/* ── S1 · Hero — surface soft, clean (grad-word accent only) ── */}
        <LabStatementHero
          id="hero"
          eyebrow="Sales intelligence"
          titleLead="Your reps talk."
          titleAccent="Northwind"
          titleTrail="listens and writes the CRM."
          sub="Every call becomes a clean, timestamped CRM record in under 60 seconds — no manual note-taking, no missed fields."
          ctas={[
            { label: "Start free trial", href: "#pricing" },
            { label: "See how it works", href: "#process" },
          ]}
          media={{
            ratio: "16/9",
            label: "Image · Northwind hero · 16:9",
            hint: "Product hero — call timeline resolving into a CRM record.",
            ariaLabel: "Northwind turning a sales call into a CRM record",
          }}
        />

        {/* ── S2 · Stat band — surface light ── */}
        <LabStatBand
          id="stats"
          surface="light"
          ariaLabel="Northwind customer results"
          eyebrow="Real customer data"
          title="Numbers from the field"
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

        {/* ── S3 · Pinned steps — surface INK (ink peak #1, native sticky-stack
            via data-pin). The LIFT-AWAY out of this dark block is the S4 light
            section riding up over it. ── */}
        <LabPinnedSteps
          id="process"
          surface="ink"
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

        {/* ── S4 · Editorial split — surface light (directional reveal). This
            is the LIFT-AWAY: it rides up over the S3 ink peak. ── */}
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

        {/* ── S5 · Bento — surface light (card ride-in stagger, native reveals).
            LabBento has no `soft` prop; `light` emits the same `.band.soft`
            class, and tint-step (nth-of-type) gives this odd section --bg. ── */}
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

        {/* ── S6 · Gallery — surface light (parallax-media via the gallery's
            native data-scrub backdrop) ── */}
        <LabGallery
          id="teams"
          surface="light"
          ariaLabel="Northwind for every revenue team"
          eyebrow="Built for every revenue team"
          title="Built for every revenue team"
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

        {/* ── S7 · Pricing — surface light, kept maximally readable (reveal) ── */}
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

        {/* ── S8 · Cinema scrim — surface INK (ink peak #2): cinematic knockout
            close. Maps the former Quiet-CTA copy onto the scrim. ── */}
        <LabCinemaScrim
          id="cta"
          surface="ink"
          eyebrow="Get started"
          headline="Your next call writes itself."
          sub="Connect a calendar and Northwind starts writing records on your very next call."
          cta={{ label: "Start free — no credit card", href: "#pricing" }}
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
          maskId="northwind2-close"
          pinSteps={1}
        />
      </main>
      <ScrollFX />
    </>
  );
}
