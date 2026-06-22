import type { Metadata } from "next";
import {
  AuroraBackground,
  type AuroraIntensity,
  type AuroraVariant,
} from "@/components/ds";
import { AuroraGlassHero } from "./AuroraGlassHero";
import { AuroraGlassCard } from "./AuroraGlassCard";
import { AuroraPhotoGlassCard } from "./AuroraPhotoGlassCard";
import { LightGlassCard } from "./LightGlassCard";

export const metadata: Metadata = {
  title: "Aurora backgrounds — EvalLense",
  robots: { index: false, follow: false },
};

const VARIANTS: { id: AuroraVariant; note: string }[] = [
  { id: "dark-violet", note: "violet / lavender — the reference" },
  { id: "dark-violet-deep", note: "violet, darker — deeper into black" },
  { id: "dark-cyan", note: "violet + cool cyan glow" },
  { id: "dark-blue", note: "royal blue dominant, violet anchor" },
  { id: "dark-indigo", note: "deep indigo, very dark" },
  { id: "dark-pink", note: "violet + rose / pink" },
  { id: "dark-magenta", note: "violet → orchid → pink" },
  { id: "dark-mixed", note: "violet, lavender, cyan + aqua touch" },
  { id: "dark-nebula", note: "violet + blue + pink edge" },
  { id: "dark-midnight", note: "darkest — mostly black, one pool" },
  { id: "dark-rose", note: "rose/pink rising into rose-black" },
  { id: "dark-fuchsia", note: "bold fuchsia + violet" },
  { id: "dark-void", note: "near-pure black, one intense violet point" },
  { id: "dark-plum", note: "deep plum into black" },
  { id: "dark-twilight", note: "blue → violet → pink band" },
  { id: "dark-ember-rose", note: "strong pink corner into deep black" },
];

const INTENSITIES: AuroraIntensity[] = ["subtle", "default", "vivid"];

export default function Page() {
  return (
    <main className="min-h-dvh bg-[#050608] text-white">
      {/* Hero — aurora + a frosted-glass card */}
      <AuroraGlassHero />

      {/* A/B — rich glass (wash + sheen) vs plain clean glass */}
      <section className="mx-auto max-w-7xl px-6 pt-20 sm:px-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
          Compare — dark rich · dark clean · light tinted · brand gradient
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AuroraGlassCard
            variant="dark-violet"
            note="rich · wash + sheen (scroll-bound)"
            rich
          />
          <AuroraGlassCard
            variant="dark-violet"
            note="plain · clean glass only"
            rich={false}
          />
          <LightGlassCard
            tone="light"
            label="light · tinted glass"
            note="blue-violet glow (multiply), dark edge"
          />
          <LightGlassCard
            tone="brand"
            label="brand · gradient glass"
            note="saturated purple→blue, transparent + blurred"
          />
        </div>
      </section>

      {/* The ten ingredients — default intensity */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
          {VARIANTS.length} background ingredients
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map((v) =>
            v.id === "dark-violet-deep" ? (
              <AuroraPhotoGlassCard key={v.id} />
            ) : (
              <AuroraGlassCard key={v.id} variant={v.id} note={v.note} />
            ),
          )}
        </div>

        {/* Intensity scale on the reference variant */}
        <h2 className="mt-20 text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
          Intensity — dark-violet
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {INTENSITIES.map((i) => (
            <section
              key={i}
              className="relative isolate flex min-h-[280px] items-end overflow-hidden rounded-3xl border border-white/10"
            >
              <AuroraBackground variant="dark-violet" intensity={i} />
              <div className="relative z-10 w-full p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/55">
                  {i}
                </span>
                <p className="mt-2 text-xl font-medium leading-snug text-white">
                  Headline
                </p>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-white/40">
          Static (no drift) — same field with{" "}
          <code className="text-white/60">animated={"{false}"}</code>:
        </p>
        <section className="relative isolate mt-5 flex min-h-[280px] items-center overflow-hidden rounded-3xl border border-white/10">
          <AuroraBackground variant="dark-nebula" intensity="default" animated={false} />
          <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
            <p className="text-2xl font-medium text-white">Frozen final frame</p>
          </div>
        </section>
      </section>
    </main>
  );
}
