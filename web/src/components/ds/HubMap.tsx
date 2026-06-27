import { Eyebrow, Title } from "@/components/ds";
import { HubMapGlassSpot } from "./HubMapGlassSpot";

/**
 * HubMap — clean DS extraction of archetype 08 (bento link tiles / hub map).
 *
 * A faithful token port of the deprecated `LabHubMap`, on the clean `.ds-*`
 * namespace (no `.lab-*`, no `.section-lab` dependency). Styles live in
 * `ds.css`. A NAVIGATIONAL bento for hub pages (`/product`, `/trust`): every
 * tile is a real `<a>` into a child route, the first one `feature`. It differs
 * from the plain `Bento` (07) only in that every tile sends the reader deeper.
 *
 * Content (eyebrow, title, sub, link tiles) is the invariant — only layout
 * differs across the three saved versions, each surface-adaptive (`soft` light
 * is the default; `ink` flips colour only, geometry stays put):
 *   • v1 — Polish: the original composition — a flat 3-col grid with the
 *     feature tile spanning two columns.
 *   • v2 — Modern Recomposition: the feature leads full-width as a wide entry
 *     banner over an even 3-col row of supporting routes.
 *   • v3 — Expanded Expressive: a large display head, mirrored — supporting
 *     routes stacked on the left, a tall feature hero on the right.
 *
 * Robust layout: the feature tile and a `__rest` container of supporting tiles
 * are arranged per version (no fixed `grid-row` spans like `LabHubMap`'s v3,
 * which assumed exactly three tiles) — `__rest` stacks/wraps for ANY count.
 *
 * Functional contract: every tile keeps its `href`, label and copy across all
 * versions (no invented destinations). Motion is `data-reveal` only, consumed
 * by the page's single `<ScrollFX/>`.
 */
export type HubLink = {
  tag: string;
  title: string;
  body: string;
  href: string;
  ctaLabel?: string;
  feature?: boolean;
};
export type HubMapProps = {
  id?: string;
  /** `.band` surface — `light` (default → `soft`) or `ink`. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  /** Optional lens-accented word inside the title (first case-insensitive match). */
  titleAccent?: string;
  sub: string;
  note?: string;
  /** Link tiles; the first one `feature`. */
  items: HubLink[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

/** One link tile — mini-tag, heading, body, route affordance. Shared geometry. */
function LinkCard({ item }: { item: HubLink }) {
  return (
    <a
      href={item.href}
      className={
        item.feature ? "ds-hubmap__card ds-hubmap__card--feature" : "ds-hubmap__card"
      }
    >
      <span className="mini-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <span className="ds-hubmap__more">{item.ctaLabel ?? "Open route"} →</span>
    </a>
  );
}

/**
 * Layout = the feature tile + a container of the supporting tiles. Splitting the
 * two lets each version arrange them very differently (hero+list, banner+row,
 * mirrored) while staying robust for ANY number of supporting routes — the
 * `__rest` container stacks or wraps internally, no fixed row/col spans.
 */
function Layout({ items }: { items: HubLink[] }) {
  const featureIdx = items.findIndex((i) => i.feature);
  const feature = featureIdx >= 0 ? items[featureIdx] : items[0];
  const rest = items.filter((item) => item !== feature);
  return (
    <div className="ds-hubmap__grid">
      {feature ? <LinkCard item={feature} /> : null}
      <div className="ds-hubmap__rest">
        {rest.map((item, i) => (
          <LinkCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
}

function Note({ note }: { note?: string }) {
  if (!note) return null;
  return <p className="ds-hubmap__note">{note}</p>;
}

export function HubMap({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  titleAccent,
  sub,
  note,
  items,
  marker,
}: HubMapProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} ds-hubmap`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish (original): flat 3-col grid, feature spans 2 cols ── */}
      <div className="ds-hubmap__v ds-hubmap__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Layout items={items} />
          <Note note={note} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: full-width feature banner + even 3-col row ── */}
      <div className="ds-hubmap__v ds-hubmap__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Layout items={items} />
          <Note note={note} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: mirrored — routes left, tall feature hero right ── */}
      <div className="ds-hubmap__v ds-hubmap__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Layout items={items} />
          <Note note={note} />
        </div>
      </div>

      {/* ink-only glass enhancer — injects the .ds-glass sheen layers + the
          travelling spot into the cards/grids (matches the RichBento look). */}
      {surface === "ink" ? <HubMapGlassSpot /> : null}
    </section>
  );
}
