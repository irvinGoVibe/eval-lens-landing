import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { InTheLoop } from "@/components/blog/InTheLoop";
import { getAllPosts, getLoopPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "EvalLense Newsroom — Latest News",
  description:
    "Product updates, research, and stories from the team building EvalLense — structured pitch-deck evaluation with explainable, human-controlled decisions.",
};

const MORE_LINKS = [
  {
    title: "Press Releases",
    desc: "Official announcements from EvalLense.",
    href: "/blog",
    accent: "violet",
  },
  {
    title: "Product Updates",
    desc: "What shipped, and what it changes.",
    href: "/blog",
    accent: "aqua",
  },
  {
    title: "Research",
    desc: "How the evaluation engine actually works.",
    href: "/blog",
    accent: "orange",
  },
  {
    title: "Photos & Brand",
    desc: "Imagery and assets for the press.",
    href: "/blog",
    accent: "cyan",
  },
] as const;

export default function BlogHubPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const rail = rest.slice(0, 3);
  const grid = rest.slice(3);
  const loopPosts = getLoopPosts();

  return (
    <>
      {/* ---- Latest News: featured hero + side rail ---- */}
      <section className="blog-section blog-section--hero" id="latest">
        <div className="wrap blog-wrap">
          <header className="blog-masthead">
            <p className="t-eyebrow">EvalLense Newsroom</p>
            <h1 className="blog-masthead__title">
              Latest <span className="grad">News</span>
            </h1>
          </header>

          <div className="blog-hero-grid">
            <ArticleCard post={featured} variant="feature" priority />
            <div className="blog-rail">
              {rail.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Latest News grid ---- */}
      {grid.length > 0 && (
        <section className="blog-section">
          <div className="wrap blog-wrap">
            <div className="blog-section-head">
              <h2>Latest News</h2>
              <Link href="/blog" className="blog-seeall">
                See all <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="blog-grid">
              {grid.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- In the Loop: paged rail of reposted social items (popup) ---- */}
      {loopPosts.length > 0 && <InTheLoop posts={loopPosts} />}

      {/* ---- More from the Newsroom: section link tiles ---- */}
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
    </>
  );
}
