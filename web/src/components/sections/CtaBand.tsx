"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type CtaLink = {
  label: string;
  href: string;
  /** Force a button variant. Defaults are theme-aware (see below). */
  variant?: "primary" | "ghost" | "glass" | "dark" | "gradient";
};

/**
 * The CSS aurora palettes. `id` is what you pass as `auroraVariant` in
 * production. Colours + speeds are mirrored here only so the test console log is
 * readable — the real values live in globals.css (`.cta-band__aurora--<id>`).
 */
const AURORA_VARIATIONS = [
  {
    id: "violet",
    label: "Violet · cyan · lavender",
    colors: ["violet", "cyan", "lavender"],
    speeds: ["9s", "8s", "11s"],
  },
  {
    id: "ember",
    label: "Ember (orange / fiery)",
    colors: ["orange-hot", "orange-core", "orange-soft"],
    speeds: ["7s", "6s", "9s"],
  },
  {
    id: "ocean",
    label: "Ocean (blue · teal / calm)",
    colors: ["#3b82f6", "#06b6d4", "#7dd3fc"],
    speeds: ["13s", "15s", "17s"],
  },
  {
    id: "magenta",
    label: "Magenta · pink",
    colors: ["#d946ef", "#ec4899", "#c084fc"],
    speeds: ["8s", "10s", "12s"],
  },
  {
    id: "emerald",
    label: "Emerald (green)",
    colors: ["#10b981", "#34d399", "#5eead4"],
    speeds: ["10s", "9s", "13s"],
  },
  {
    id: "gold",
    label: "Gold · violet (lively)",
    colors: ["#f59e0b", "#fbbf24", "#a78bfa"],
    speeds: ["6s", "7s", "8s"],
  },
] as const;

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
  /** Let the background bleed past the section and overlay the footer below. */
  bleed?: boolean;
  /**
   * The chosen background video (production "параметр"). When omitted, the CSS
   * aurora plays instead.
   */
  videoSrc?: string;
  videoPoster?: string;
  /**
   * The chosen CSS aurora palette (production "параметр"), one of
   * AURORA_VARIATIONS ids. Only used when there's no video. Defaults to
   * "violet".
   */
  auroraVariant?: string;
  /**
   * TEST MODE — candidate clips to compare. With `cycleOnPrimary`, the primary
   * button switches to video and cycles this list (console-logged).
   */
  videos?: string[];
  /** Enable the video test cycler on the primary button. */
  cycleOnPrimary?: boolean;
  /**
   * TEST MODE — enable the aurora cycler on the SECONDARY button: it switches
   * the background to the CSS aurora and cycles all palettes, logging the
   * active one to the console so you can pick an `auroraVariant`.
   */
  cycleAuroraOnSecondary?: boolean;
};

/**
 * Reusable call-to-action band. A looping background video (or the animated CSS
 * aurora) lives behind the copy; with `bleed`, it spills onto the footer.
 *
 * Client component so it can host the test cyclers — in normal use it just
 * renders the chosen `videoSrc` / `auroraVariant` and behaves like a static
 * section.
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
  videos,
  cycleOnPrimary = false,
  cycleAuroraOnSecondary = false,
}: CtaBandProps) {
  const testVideo = cycleOnPrimary && !!videos && videos.length > 0;
  const testAurora = cycleAuroraOnSecondary;
  const clips = testVideo ? videos! : videoSrc ? [videoSrc] : [];

  const initialAuroraIndex = Math.max(
    0,
    AURORA_VARIATIONS.findIndex((v) => v.id === auroraVariant),
  );

  // "video" shows a clip; "aurora" shows the CSS animation.
  const [mode, setMode] = useState<"video" | "aurora">(
    clips.length ? "video" : "aurora",
  );
  const [videoIndex, setVideoIndex] = useState(0);
  const [auroraIndex, setAuroraIndex] = useState(initialAuroraIndex);

  const logVideo = (i: number) =>
    // eslint-disable-next-line no-console
    console.log("%c[CtaBand] background → VIDEO", "color:#7b5cf6;font-weight:600", {
      mode: "video",
      index: `${i + 1}/${clips.length}`,
      src: clips[i],
    });

  const logAurora = (i: number) => {
    const v = AURORA_VARIATIONS[i];
    // eslint-disable-next-line no-console
    console.log("%c[CtaBand] background → AURORA", "color:#7b5cf6;font-weight:600", {
      mode: "aurora",
      auroraVariant: v.id,
      index: `${i + 1}/${AURORA_VARIATIONS.length}`,
      label: v.label,
      colors: v.colors,
      speeds: v.speeds,
    });
  };

  // Primary (Book a demo): switch to video, then cycle the clips.
  const onPrimary = () => {
    if (mode === "video") {
      const next = (videoIndex + 1) % clips.length;
      setVideoIndex(next);
      logVideo(next);
    } else {
      setMode("video");
      logVideo(videoIndex);
    }
  };

  // Secondary (Try live demo): switch to CSS aurora, then cycle the palettes.
  const onSecondary = () => {
    if (mode === "aurora") {
      const next = (auroraIndex + 1) % AURORA_VARIATIONS.length;
      setAuroraIndex(next);
      logAurora(next);
    } else {
      setMode("aurora");
      logAurora(auroraIndex);
    }
  };

  const className = ["cta-band", `cta-band--${theme}`, bleed && "cta-band--bleed"]
    .filter(Boolean)
    .join(" ");

  const isDark = theme === "dark";
  const primaryVariant = primary.variant ?? (isDark ? "gradient" : "primary");
  const secondaryVariant = secondary?.variant ?? (isDark ? "glass" : "ghost");

  const showVideo = mode === "video" && !!clips[videoIndex];
  const activeVideo = clips[videoIndex];
  const auroraId = AURORA_VARIATIONS[auroraIndex].id;
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
            // keyed by src so swapping the clip remounts and autoplays the new one
            key={activeVideo}
            className="cta-band__video"
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
          >
            <source src={activeVideo} type="video/mp4" />
          </video>
        ) : (
          <>
            <span className="cta-band__bloom cta-band__bloom--core" />
            <span className="cta-band__bloom cta-band__bloom--left" />
            <span className="cta-band__bloom cta-band__bloom--right" />
          </>
        )}
      </div>

      {(testVideo || testAurora) && (
        <div className="cta-band__test-hud" aria-hidden="true">
          {showVideo
            ? `video ${videoIndex + 1}/${clips.length} · ${activeVideo?.split("/").pop()}`
            : `aurora ${auroraIndex + 1}/${AURORA_VARIATIONS.length} · ${auroraId}`}
        </div>
      )}

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
          {testVideo ? (
            <Button variant={primaryVariant} onClick={onPrimary} arrow>
              {primary.label}
            </Button>
          ) : (
            <Button variant={primaryVariant} href={primary.href} arrow>
              {primary.label}
            </Button>
          )}
          {secondary &&
            (testAurora ? (
              <Button variant={secondaryVariant} onClick={onSecondary}>
                {secondary.label}
              </Button>
            ) : (
              <Button variant={secondaryVariant} href={secondary.href}>
                {secondary.label}
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
}
