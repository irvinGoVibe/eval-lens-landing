import { LabEyebrow, LabTitle, type LabContentSet } from "./_kit";

/**
 * Section type 08 — Bento link tiles (hub map).
 *
 * A navigational bento for hub pages (`/product`, `/trust`): each tile is a real
 * link into a child route, the first one `feature`. It differs from the plain
 * bento (07) only in that every tile is an `<a>` that sends the reader deeper.
 *
 * Two independent axes, both driven by the `LabMarkers` inspector:
 *   • **version** (`data-version="1|2|3"`) — the boldness ladder below;
 *   • **content** (`data-content="placeholder|real"`) — each version renders BOTH
 *     payloads (`items.placeholder` / `items.real`) wrapped in
 *     `[data-content-variant]`; CSS shows the one matching the section's
 *     `data-content`. (No `data-reveal` on the grids — a `display:none` variant
 *     never fires its IntersectionObserver, so the head carries the reveal.)
 *
 * Within a version, light (`.band.soft`) and ink (`.band.ink`) share identical
 * geometry — only colour tokens flip (surface-invariant). Title size is pinned
 * per version in CSS so flipping surface never resizes the heading.
 *   • **v1 — Polish**: original composition. Band head + 3-col link grid, the
 *     feature tile spanning two columns. No grad-word.
 *   • **v2 — Modern Recomposition**: a denser hub index — the feature tile leads
 *     full-width as a wide entry banner, the supporting routes line up in a
 *     3-col row below. Lens accent on "deeper".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on "hub")
 *     over an airy field — the feature tile becomes a tall hero, supporting
 *     routes in a calm 3-col row.
 *
 * Functional contract: every tile keeps its `href`, label and copy across all
 * versions and both content modes (no invented destinations). Motion is wired
 * purely through `data-reveal` consumed by the page's single `<ScrollFX/>`.
 *
 * See [section-types#8-bento-link-tiles-hub-map](../../../../../wiki/architecture/section-types.md).
 */
export type LabHubLink = {
  tag: string;
  title: string;
  body: string;
  href: string;
  feature?: boolean;
};
export type LabHubMapProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  /** Tiles in both content modes; first one `feature`. */
  items: LabContentSet<LabHubLink[]>;
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

/** One link tile — mini-tag, heading, body, route affordance. Shared geometry. */
function LinkCard({ item }: { item: LabHubLink }) {
  return (
    <a
      href={item.href}
      className={
        item.feature ? "lab-link-card lab-link-card--feature" : "lab-link-card"
      }
    >
      <span className="mini-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <span className="lab-link-card__more">Open route →</span>
    </a>
  );
}

/** Both content-mode grids for one version; CSS shows the active `data-content`. */
function Grids({ items }: { items: LabContentSet<LabHubLink[]> }) {
  return (
    <>
      {(["placeholder", "real"] as const).map((mode) => (
        <div key={mode} className="lab-link-grid" data-content-variant={mode}>
          {items[mode].map((item) => (
            <LinkCard item={item} key={item.href} />
          ))}
        </div>
      ))}
    </>
  );
}

export function LabHubMap({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  items,
  marker,
}: LabHubMapProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-hubmap`}
      data-marker={marker}
      data-content="placeholder"
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: 3-col grid, feature spans 2 cols ── */}
      <div className="lab-hubmap__v lab-hubmap__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} />
            <p className="sub">{sub}</p>
          </div>
          <Grids items={items} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: feature banner + 3-col supporting row ── */}
      <div className="lab-hubmap__v lab-hubmap__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="deeper" />
            <p className="sub">{sub}</p>
          </div>
          <Grids items={items} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, tall feature hero ── */}
      <div className="lab-hubmap__v lab-hubmap__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="hub" />
            <p className="sub">{sub}</p>
          </div>
          <Grids items={items} />
        </div>
      </div>
    </section>
  );
}
