import type { ReactElement } from "react";
import { AuroraBackground } from "@/components/ds";
import { GlassCard } from "./GlassCard";
import { GlassButton, GlassFilter } from "@/components/ui/liquid-glass";

/**
 * Hero for /dev/aurora — aurora gradient with a pearlescent glass card and a
 * liquid-glass CTA button (the SVG feDisplacementMap material from
 * components/ui/liquid-glass). Surrounding copy is white on the dark field.
 */
export function AuroraGlassHero(): ReactElement {
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <AuroraBackground variant="dark-violet" intensity="default" />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/55">
          EvalLense · aurora backgrounds
        </p>
        <h1 className="mt-4 max-w-[14ch] text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
          Lens your next unicorn.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/70">
          Premium dark gradient backdrop — deep near-black base, soft blurred
          light pools in the top third, a near-black floor that keeps body copy
          legible. The card below is 4-layer pearlescent glass.
        </p>

        <GlassCard className="mt-9 inline-block max-w-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Pearlescent glass
          </span>
          <p className="mt-2 text-sm leading-relaxed text-white/85">
            Translucent pane, blurred backdrop, a static optical sheen and slow
            scroll-bound washes — all CSS, text stays crisp.
          </p>
        </GlassCard>

        {/* liquid-glass CTA button (SVG displacement material) */}
        <div className="mt-8">
          <GlassButton>
            <span className="text-base font-medium text-white">Start a review</span>
          </GlassButton>
        </div>
      </div>

      {/* SVG filter the GlassButton references via filter: url(#glass-distortion) */}
      <GlassFilter />
    </section>
  );
}
