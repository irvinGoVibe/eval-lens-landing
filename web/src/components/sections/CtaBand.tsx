import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export type CtaLink = {
  label: string;
  href: string;
  /** Force a button variant. Defaults are theme-aware (see below). */
  variant?: "primary" | "ghost" | "glass" | "dark" | "gradient";
};

/**
 * The CSS aurora palette ids. Each maps to a `.cta-band__aurora--<id>` rule in
 * globals.css (where the real colours + speeds live). Pass one as
 * `auroraVariant`; an unknown value falls back to the first ("violet").
 */
const AURORA_VARIANTS = [
  "violet",
  "ember",
  "ocean",
  "magenta",
  "emerald",
  "gold",
] as const;

export type CtaBandProps = {
  /** Mono eyebrow above the title. */
  eyebrow?: string;
  /** Plain leading part of the headline. */
  title: string;
  /** Optional trailing part rendered in the brand gradient. */
  titleAccent?: string;
  /** Supporting paragraph under the title. */
  sub?: ReactNode;
  /** Primary CTA (filled). */
  primary: CtaLink;
  /** Optional secondary CTA (outline/glass). */
  secondary?: CtaLink;
  /**
   * `dark` (home, dark internal pages) sits on `--bg-ink`; `light` (default
   * for light internal pages) sits on `--bg-soft`.
   */
  theme?: "dark" | "light";
  /** Let the background bleed past the section and overlay the footer below. */
  bleed?: boolean;
  /** Looping background video. When omitted, the CSS aurora plays instead. */
  videoSrc?: string;
  videoPoster?: string;
  /**
   * CSS aurora palette, one of AURORA_VARIANTS. Only used when there's no
   * video. Defaults to "violet".
   */
  auroraVariant?: string;
};

/**
 * Reusable call-to-action band. A looping background video (or the animated CSS
 * aurora) lives behind the copy; with `bleed`, it spills onto the footer.
 *
 * Pure Server Component: the `<video autoPlay muted loop>` and the CSS aurora
 * run without React, so there's no hydration cost on the pages that use it.
 */
export function CtaBand({
  eyebrow,
  title,
  titleAccent,
  sub,
  primary,
  secondary,
  theme = "light",
  bleed = false,
  videoSrc,
  videoPoster,
  auroraVariant = "violet",
}: CtaBandProps) {
  const className = ["cta-band", `cta-band--${theme}`, bleed && "cta-band--bleed"]
    .filter(Boolean)
    .join(" ");

  const isDark = theme === "dark";
  const primaryVariant = primary.variant ?? (isDark ? "gradient" : "primary");
  const secondaryVariant = secondary?.variant ?? (isDark ? "glass" : "ghost");

  const showVideo = !!videoSrc;
  const auroraId = (AURORA_VARIANTS as readonly string[]).includes(auroraVariant)
    ? auroraVariant
    : "violet";
  const auroraClassName = [
    "cta-band__aurora",
    !showVideo && `cta-band__aurora--${auroraId}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className}>
      <div className={auroraClassName} aria-hidden="true">
        {showVideo ? (
          <video
            className="cta-band__video"
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <>
            <span className="cta-band__bloom cta-band__bloom--core" />
            <span className="cta-band__bloom cta-band__bloom--left" />
            <span className="cta-band__bloom cta-band__bloom--right" />
          </>
        )}
      </div>

      <div className="cta-band__inner">
        {eyebrow && (
          <span className="eyebrow cta-band__eyebrow">
            <span className="dot" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="cta-band__title">
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className="cta-band__accent">{titleAccent}</span>
            </>
          )}
        </h2>
        {sub && <p className="cta-band__sub">{sub}</p>}
        <div className="cta-band__actions">
          <Button variant={primaryVariant} href={primary.href} arrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button variant={secondaryVariant} href={secondary.href}>
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
