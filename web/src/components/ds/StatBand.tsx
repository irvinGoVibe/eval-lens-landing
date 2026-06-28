import { Eyebrow, Title, Media } from "@/components/ds";

/**
 * StatBand — clean DS extraction of archetype 09 (stat band / counters).
 *
 * A faithful 1:1 token port of the deprecated `LabStatBand`: same markup
 * semantics, same three saved versions, on the clean `.ds-*` namespace (no
 * `.lab-*`, no `.section-lab` dependency). Styles live in `ds.css`.
 *
 * A band of large numbers: each stat is a big mono figure (tabular, lens-tinted)
 * with a label and a small source line, followed by a wide media band. Used to
 * state benchmarks or targets measurably. All three versions are surface-adaptive
 * (`ink` is this archetype's default). Within a version, light and ink share
 * identical geometry — only colour tokens flip; the title and figure sizes are
 * pinned per version so flipping surface never resizes them.
 *   • v1 Polish — head, a 3-col stat grid, then a 21:9 media band. No grad-word.
 *   • v2 Modern Recomposition — tighter baseline-aligned figure row; lens accent
 *     on "checked".
 *   • v3 Expanded Expressive — large display head (lens accent on "Every") over
 *     oversized figures and a generous band.
 *
 * Content is the invariant. Motion is wired through `data-reveal`, consumed by
 * the page's single `<ScrollFX/>`.
 */
export type Stat = { value: string; label: string; src: string };
export type StatBandMedia = {
  ratio: string;
  label: string;
  hint: string;
  ariaLabel: string;
};
export type StatBandProps = {
  id?: string;
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  /** Optional gradient accent word/run forwarded to the v1 heading (additive —
      omit to keep the plain title, as every existing consumer does). */
  accent?: string;
  stats: Stat[];
  /** Wide media slot under the figures (visible placeholder until a real asset). */
  media?: StatBandMedia;
  marker?: string;
};

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <ul className="ds-statband__grid" data-reveal="up">
      {stats.map((stat) => (
        <li key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <span className="ds-statband__src">{stat.src}</span>
        </li>
      ))}
    </ul>
  );
}

function Band({ media }: { media?: StatBandMedia }) {
  if (!media) return null;
  return (
    <Media
      className="ds-statband__band"
      ratio={media.ratio}
      label={media.label}
      hint={media.hint}
      ariaLabel={media.ariaLabel}
      reveal="up"
    />
  );
}

export function StatBand({
  id,
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  accent,
  stats,
  media,
  marker,
}: StatBandProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} ds-statband`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: head, 3-col stat grid, 21:9 band ── */}
      <div className="ds-statband__v ds-statband__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={accent} />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: tighter rule-divided figure row ── */}
      <div className="ds-statband__v ds-statband__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent="checked" />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized figures ── */}
      <div className="ds-statband__v ds-statband__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent="Every" />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>
    </section>
  );
}
