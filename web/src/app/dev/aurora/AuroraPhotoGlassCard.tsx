import type { ReactElement } from "react";
import Image from "next/image";
import { GlassCard } from "./GlassCard";

/**
 * The `dark-violet-deep` slot: a photographic backdrop with the 4-layer
 * pearlescent glass on top. Over a photo the frost + washes + glare read
 * especially well. CSS glass (not liquid-glass-react, which is broken in this
 * stack). The photo is a decorative local asset behind the glass.
 */
export function AuroraPhotoGlassCard(): ReactElement {
  return (
    <section className="relative isolate flex min-h-[300px] items-end overflow-hidden rounded-3xl border border-white/10">
      <Image
        src="/assets/_demo-pool/photo/dark-unicorn-head-profile.jpeg"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <GlassCard className="relative z-10 m-5 max-w-[20rem]">
        <span className="font-mono text-[12px] text-white/85">photo · glass</span>
        <p className="mt-1 text-sm text-white/65">
          pearlescent glass over a photo
        </p>
        <p className="mt-3 text-base font-medium text-white">
          Text stays legible
        </p>
      </GlassCard>
    </section>
  );
}
