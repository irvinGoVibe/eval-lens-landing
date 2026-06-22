import type { ReactElement } from "react";
import { GlassCard } from "./GlassCard";

export type LightGlassCardProps = {
  /** "light" = cool tinted white glass; "brand" = saturated CTA-gradient glass. */
  tone?: "light" | "brand";
  label: string;
  note: string;
};

/**
 * Light-surface comparison tile: a glass card on a near-white field.
 *
 * The field carries a very faint violet/cyan spot (`.ds-light-field`) so the
 * glass has something to refract. `tone="light"` → cool tinted glass with dark
 * text; `tone="brand"` → saturated translucent purple→blue glass with white
 * text (keyed to the CTA button gradient).
 */
export function LightGlassCard({
  tone = "light",
  label,
  note,
}: LightGlassCardProps): ReactElement {
  const dark = tone === "light";
  return (
    <section className="ds-light-field relative isolate flex min-h-[300px] items-end overflow-hidden rounded-3xl border border-black/5">
      <GlassCard tone={tone} className="relative z-10 m-5 max-w-[20rem]">
        <span
          className={`font-mono text-[12px] ${dark ? "text-[#17151f]/70" : "text-white/80"}`}
        >
          {label}
        </span>
        <p className={`mt-1 text-sm ${dark ? "text-[#17151f]/60" : "text-white/75"}`}>
          {note}
        </p>
        <p
          className={`mt-3 text-base font-medium ${dark ? "text-[#17151f]" : "text-white"}`}
        >
          Text stays legible
        </p>
      </GlassCard>
    </section>
  );
}
