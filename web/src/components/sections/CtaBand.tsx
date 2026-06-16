import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type CtaLink = {
  label: string;
  href: string;
  /** Force a button variant. Defaults are theme-aware (see below). */
  variant?: "primary" | "ghost" | "glass" | "dark" | "gradient";
};

type CtaBandProps = {
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
  /**
   * Let the animated background bleed downward past the section and overlay
   * the footer beneath it (semi-transparent). Use on the homepage where the CTA
   * is the last band before the dark footer. The section composites above the
   * footer via z-index, so footer links stay clickable (aurora is
   * pointer-blind).
   */
  bleed?: boolean;
  /**
   * Optional looping background video. When omitted, the CSS aurora plays
   * instead — drop in a generated clip later without touching callers. Served
   * with a semi-transparent overlay so text stays legible and it blends into
   * the footer on bleed.
   */
  videoSrc?: string;
  videoPoster?: string;
};

/**
 * Reusable call-to-action band. One component for the homepage closer and the
 * internal-page CTAs. The animated violet aurora (or an optional looping video)
 * lives behind the copy; with `bleed`, it spills onto the footer below.
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
}: CtaBandProps) {
  const className = [
    "cta-band",
    `cta-band--${theme}`,
    bleed && "cta-band--bleed",
  ]
    .filter(Boolean)
    .join(" ");

  const isDark = theme === "dark";
  const primaryVariant = primary.variant ?? (isDark ? "gradient" : "primary");
  const secondaryVariant =
    secondary?.variant ?? (isDark ? "glass" : "ghost");

  return (
    <section className={className}>
      <div className="cta-band__aurora" aria-hidden="true">
        {videoSrc ? (
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
