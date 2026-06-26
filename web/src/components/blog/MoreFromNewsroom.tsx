import Link from "next/link";

const MORE_LINKS = [
  {
    title: "Press Releases",
    desc: "Official announcements from EvalLense.",
    href: "/blog/all?press-release",
    accent: "violet",
  },
  {
    title: "Product Updates",
    desc: "What shipped, and what it changes.",
    href: "/blog/all?product",
    accent: "aqua",
  },
  {
    title: "Research",
    desc: "How the evaluation engine actually works.",
    href: "/blog/all?research",
    accent: "orange",
  },
] as const;

/** "More from EvalLense Newsroom" — shared between the hub and All News. */
export function MoreFromNewsroom() {
  return (
    <section className="blog-section blog-section--more" id="more">
      <div className="wrap blog-wrap">
        <div className="blog-section-head">
          <h2>More from EvalLense Newsroom</h2>
        </div>
        <div className="blog-more-grid">
          {MORE_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="blog-more-tile"
              data-accent={link.accent}
            >
              <span className="blog-more-tile__title">{link.title}</span>
              <span className="blog-more-tile__desc">{link.desc}</span>
              <span className="blog-more-tile__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
