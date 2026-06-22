import { RichGlass } from "./RichGlass";

/**
 * Page-local bento whose tiles use the Aurora "rich · wash + sheen
 * (scroll-bound)" glass (shared `.ds-glass` material). Same overview content as
 * the DS bento; production DS <Bento> stays untouched. Asymmetric layout: a
 * large feature tile, a stacked right column, and a wide tile below.
 */

export type RichBentoItem = { tag: string; title: string; body: string };

export function RichBento({
  eyebrow,
  title,
  titleAccent,
  sub,
  items,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub: string;
  items: RichBentoItem[];
}) {
  const [feature, topRight, midRight, bottom] = items;

  const inner = (it: RichBentoItem, big = false) => (
    <>
      <span className="lgx-rb__tag">{it.tag}</span>
      <h3 className={`lgx-rb__ctitle${big ? " lgx-rb__ctitle--big" : ""}`}>{it.title}</h3>
      <p className="lgx-rb__body">{it.body}</p>
    </>
  );

  return (
    <section className="lgx-rb" aria-label={title}>
      <div className="lgx-rb__head">
        <span className="lgx-rb__eyebrow"><span className="lgx-rb__dot" />{eyebrow}</span>
        <h2 className="lgx-rb__title">
          {title}
          {titleAccent ? <> <span className="lgx-rb__grad">{titleAccent}</span></> : null}
        </h2>
        <p className="lgx-rb__sub">{sub}</p>
      </div>

      <div className="lgx-rb__grid">
        {feature ? (
          <RichGlass className="lgx-rb__cell lgx-rb__cell--feature">{inner(feature, true)}</RichGlass>
        ) : null}
        <div className="lgx-rb__col">
          {topRight ? (
            <RichGlass className="lgx-rb__cell lgx-rb__cell--mr">{inner(topRight)}</RichGlass>
          ) : null}
          {midRight ? (
            <RichGlass className="lgx-rb__cell lgx-rb__cell--mr">{inner(midRight)}</RichGlass>
          ) : null}
        </div>
        {bottom ? (
          <RichGlass className="lgx-rb__cell lgx-rb__cell--b">{inner(bottom)}</RichGlass>
        ) : null}
      </div>
    </section>
  );
}
