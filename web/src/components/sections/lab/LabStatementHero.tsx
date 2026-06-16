import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { LabEyebrow, MediaPlaceholder } from "./_kit";

/**
 * Section type 01 — Statement hero.
 *
 * The opening section of every inner page: light `.band.soft`, lots of air,
 * centered mono eyebrow → quiet `clamp(44–96px)` title with one lens-accented
 * phrase → short sub → CTA row → a wide ratio-locked media slot.
 *
 * Scroll-FX: `data-reveal="up"` staggered by `--reveal-delay`, `scale` on media.
 * See [section-types#1-statement-hero](../../../../../wiki/architecture/section-types.md).
 */
export type LabStatementHeroProps = {
  id?: string;
  /** Eyebrow text after the dot, e.g. `01 · Statement hero`. */
  eyebrow: string;
  /** Plain text before the lens-accented phrase. */
  titleLead: string;
  /** The lens-gradient (`.grad-word`) phrase inside the title. */
  titleAccent: string;
  /** Optional plain text after the accent. */
  titleTrail?: string;
  sub: string;
  ctas: { label: string; href: string; variant?: "primary" | "ghost" | "glass" }[];
  media: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Show the ambient lens-grid pattern behind the hero. */
  pattern?: boolean;
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

export function LabStatementHero({
  id = "hero",
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  ctas,
  media,
  pattern = true,
  marker,
}: LabStatementHeroProps) {
  return (
    <section id={id} className="band soft lab-hero" data-marker={marker}>
      {pattern ? <div className="lab-pattern" aria-hidden="true" /> : null}
      <div className="wrap lab-hero__inner">
        <LabEyebrow reveal="up" delay={0}>
          {eyebrow}
        </LabEyebrow>
        <h1
          className="lab-hero__title"
          data-reveal="up"
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          {titleLead} <span className="grad-word">{titleAccent}</span>
          {titleTrail ? ` ${titleTrail}` : null}
        </h1>
        <p
          className="sub lab-hero__sub"
          data-reveal="up"
          style={{ "--reveal-delay": "180ms" } as CSSProperties}
        >
          {sub}
        </p>
        <div
          className="cta-row"
          data-reveal="up"
          style={{ "--reveal-delay": "270ms" } as CSSProperties}
        >
          {ctas.map((cta) => (
            <Button key={cta.label} href={cta.href} variant={cta.variant}>
              {cta.label}
            </Button>
          ))}
        </div>
        <MediaPlaceholder
          className="lab-hero__media"
          reveal="scale"
          ratio={media.ratio}
          label={media.label}
          hint={media.hint}
          ariaLabel={media.ariaLabel}
        />
      </div>
    </section>
  );
}
