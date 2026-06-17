import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";

export const metadata: Metadata = {
  title: "Element parity — same component, light vs dark",
  description:
    "The same Lab* component rendered on light and ink surfaces back-to-back, to check that an element on dark reads as the SAME element as on light (geometry invariant, only colour tokens flip).",
};

const bento = {
  eyebrow: "What you get",
  title: "Every dimension, scored and ranked",
  sub: "One run scores consistency, coherence, safety and latency — then ranks findings by severity.",
  items: [
    {
      tag: "Core",
      title: "88 scored dimensions",
      body: "From factual grounding to tone drift — every axis that matters, on one scale.",
      feature: true as const,
      media: { label: "Score matrix", hint: "heatmap", ariaLabel: "Dimension score matrix" },
    },
    { tag: "Speed", title: "Parallel panels", body: "Thousands of evaluations at once — first verdict under two minutes." },
    { tag: "Trust", title: "Reproducible", body: "Re-run the same panel; variance stays flat at 0.4%." },
    { tag: "Proof", title: "Full traceability", body: "Every verdict carries its rubric and evidence." },
  ],
};

const stats = {
  eyebrow: "Trusted in production",
  title: "The numbers teams ship on",
  stats: [
    { value: "12,000+", label: "eval runs / week", src: "telemetry" },
    { value: "< 2 min", label: "to first result", src: "median, p50" },
    { value: "99.8%", label: "reproducibility", src: "10k re-runs" },
  ],
};

export default function ElementParityPage() {
  return (
    <>
      <main className="section-lab">
        {/* same Bento — light, then dark */}
        <LabBento surface="light" {...bento} />
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />
        <LabBento surface="ink" {...bento} />

        {/* same StatBand — light, then dark */}
        <LabStatBand surface="light" {...stats} />
        <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />
        <LabStatBand surface="ink" {...stats} />
      </main>
      <ScrollFX />
    </>
  );
}
