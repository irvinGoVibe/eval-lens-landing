import type { ReactElement } from "react";
import { AuroraBackground, type AuroraVariant } from "@/components/ds";
import { GlassCard } from "./GlassCard";

export type AuroraGlassCardProps = {
  variant: AuroraVariant;
  note: string;
  /** Pass to GlassCard: rich (wash + sheen, scroll-bound) vs plain clean glass. */
  rich?: boolean;
};

/**
 * One aurora tile with a frosted glass panel floating over it.
 *
 * Layer order: tile = positioned context → `AuroraBackground` paints the
 * gradient behind → `GlassCard` frosts it (backdrop-filter). The gradient is NOT
 * inside the glass. Content text is light — the clear glass reads dark over the
 * aurora, so white copy keeps strong contrast.
 */
export function AuroraGlassCard({
  variant,
  note,
  rich = true,
}: AuroraGlassCardProps): ReactElement {
  return (
    <section className="relative isolate flex min-h-[300px] items-end overflow-hidden rounded-3xl border border-white/10">
      <AuroraBackground variant={variant} intensity="default" />
      <GlassCard className="relative z-10 m-5 max-w-[20rem]" rich={rich}>
        <span className="font-mono text-[12px] text-white/85">{variant}</span>
        <p className="mt-1 text-sm text-white/65">{note}</p>
        <p className="mt-3 text-base font-medium text-white">
          Text stays legible
        </p>
      </GlassCard>
    </section>
  );
}
