import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabNumbered } from "@/components/sections/lab/LabNumbered";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabCompareTable } from "@/components/sections/lab/LabCompareTable";
import { LabQuietCta } from "@/components/sections/lab/LabQuietCta";

export const metadata: Metadata = {
  title: "EvalLense — full landing on real components (light ⇄ dark arc)",
  description:
    "A full landing composed from the real Lab* library sections (Hero, Bento, Numbered, StatBand, CompareTable, QuietCta), arranged in a calm-build arc with directional transitions at every light↔dark surface change.",
};

/* Composed entirely from existing library components — no ad-hoc cards.
   Surfaces (soft = light base, ink = dark) carry the arc; standalone
   tr-* transition elements sit at every surface change. section-lab on
   <main> scopes the Lab styles; ScrollFX drives the data-reveal motion. */

export default function DarkLightPage() {
  return (
    <>
      <main className="section-lab">
        {/* 1 — HERO (soft) */}
        <LabStatementHero
          surface="soft"
          version={2}
          eyebrow="AI evaluation platform"
          titleLead="Know exactly how your"
          titleAccent="LLM performs"
          sub="EvalLense runs structured, reproducible evaluations across any model — so you ship with confidence, not hope."
          ctas={[
            { label: "Start free", href: "#", variant: "primary" },
            { label: "See how it works", href: "#", variant: "ghost" },
          ]}
          media={{
            ratio: "16/10",
            label: "Product preview",
            hint: "dashboard / run view",
            ariaLabel: "EvalLense dashboard preview",
          }}
        />

        {/* soft → ink : diagonal build-up */}
        <div className="tr-masked-divider tr-masked-divider--diagonal" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* 2 — FEATURES (ink — cinematic dark peak) */}
        <LabBento
          surface="ink"
          eyebrow="What you get"
          title="Every dimension, scored and ranked"
          sub="One run scores consistency, coherence, safety and latency — then ranks findings by severity, not by gut."
          items={[
            {
              tag: "Core",
              title: "88 scored dimensions",
              body: "From factual grounding to tone drift — every axis that matters, measured on the same scale.",
              feature: true,
              media: { label: "Score matrix", hint: "heatmap", ariaLabel: "Dimension score matrix" },
            },
            { tag: "Speed", title: "Parallel panels", body: "Thousands of evaluations run at once — first verdict in under two minutes." },
            { tag: "Trust", title: "Reproducible", body: "Re-run the same panel and watch variance stay flat at 0.4%." },
            { tag: "Proof", title: "Full traceability", body: "Every verdict carries its rubric, evidence and the model that produced it." },
          ]}
        />

        {/* ink → soft : settle back to light */}
        <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

        {/* 3 — HOW IT WORKS (soft) */}
        <LabNumbered
          surface="light"
          eyebrow="How EvalLense works"
          title="From prompt to production-grade insight in three steps"
          items={[
            { num: "01", title: "Connect your model", body: "Any provider or your own endpoint — one adapter, no plumbing." },
            { num: "02", title: "Run your eval suite", body: "Structured panels score every dimension, reproducibly, in parallel." },
            { num: "03", title: "Act on ranked findings", body: "Severity-ordered verdicts with the evidence behind each one." },
          ]}
        />

        {/* 4 — STATS (soft / light) */}
        <LabStatBand
          surface="light"
          eyebrow="Trusted in production"
          title="The numbers teams ship on"
          stats={[
            { value: "12,000+", label: "eval runs / week", src: "platform telemetry" },
            { value: "< 2 min", label: "to first result", src: "median, p50" },
            { value: "99.8%", label: "reproducibility", src: "10k re-run sample" },
          ]}
        />

        {/* 5 — COMPARE (soft) */}
        <LabCompareTable
          surface="light"
          eyebrow="vs. the alternatives"
          title="Why teams switch from manual review"
          sub="Rigour and speed, with a number you can defend."
          columns={["", "EvalLense", "Custom scripts", "Human review"]}
          rows={[
            ["Scalable", "Yes", "Partial", "No"],
            ["Reproducible", "Yes", "Brittle", "No"],
            ["Severity-ranked", "Yes", "No", "Manual"],
            ["Time to result", "Minutes", "Hours", "Days"],
          ]}
          recommendedIndex={1}
          recommendedNote="recommended"
        />

        {/* soft → ink : dome curtain into the close */}
        <div className="tr-masked-divider tr-masked-divider--dome" data-from="soft" data-to="ink" aria-hidden="true" />

        {/* 6 — FINAL CTA (ink) */}
        <LabQuietCta
          surface="ink"
          eyebrow="Get started free"
          title="Your evals. Your standard."
          sub="No model lock-in. No black boxes. Just answers."
          cta={{ label: "Start free trial", href: "#" }}
        />
      </main>

      <ScrollFX />
    </>
  );
}
