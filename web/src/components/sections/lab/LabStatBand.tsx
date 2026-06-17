import { LabEyebrow, LabTitle, MediaPlaceholder } from "./_kit";

/**
 * Section type 09 — Stat band / counters.
 *
 * A band of large numbers: each stat is a big mono figure (tabular, lens-tinted)
 * with a label and a small source line, followed by a wide media band. Used to
 * state benchmarks or targets measurably.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`ink` is this archetype's default). Within a version, light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title and
 * figure sizes are pinned per version so flipping surface never resizes them.
 *   • **v1 — Polish**: the original composition — head, a 3-col stat grid, then a
 *     21:9 media band. No grad-word.
 *   • **v2 — Modern Recomposition**: a tighter baseline-aligned figure row with a
 *     hairline rule between stats and a slimmer band. Lens accent on "checked".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on "Every")
 *     over oversized figures and a generous band.
 *
 * Content is the invariant — the same figures, labels and sources in every
 * version. Motion is wired purely through `data-reveal` consumed by the page's
 * single `<ScrollFX/>`.
 *
 * See [section-types#9-stat-band--counters](../../../../../wiki/architecture/section-types.md).
 */
export type LabStat = { value: string; label: string; src: string };
export type LabStatBandMedia = {
  ratio: string;
  label: string;
  hint: string;
  ariaLabel: string;
};
export type LabStatBandProps = {
  id?: string;
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  stats: LabStat[];
  /** Wide media slot under the figures (visible placeholder until a real asset). */
  media?: LabStatBandMedia;
  marker?: string;
};

function Stats({ stats }: { stats: LabStat[] }) {
  return (
    <ul className="lab-stats__grid" data-reveal="up">
      {stats.map((stat) => (
        <li key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <span className="lab-stats__src">{stat.src}</span>
        </li>
      ))}
    </ul>
  );
}

function Band({ media }: { media?: LabStatBandMedia }) {
  if (!media) return null;
  return (
    <MediaPlaceholder
      className="lab-stats__band"
      ratio={media.ratio}
      label={media.label}
      hint={media.hint}
      ariaLabel={media.ariaLabel}
      reveal="up"
    />
  );
}

export function LabStatBand({
  id,
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  stats,
  media,
  marker,
}: LabStatBandProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-stats`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: head, 3-col stat grid, 21:9 band ── */}
      <div className="lab-stats__v lab-stats__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: tighter rule-divided figure row ── */}
      <div className="lab-stats__v lab-stats__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="checked" />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized figures ── */}
      <div className="lab-stats__v lab-stats__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="Every" />
          </div>
          <Stats stats={stats} />
          <Band media={media} />
        </div>
      </div>
    </section>
  );
}
