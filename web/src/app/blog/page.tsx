import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { InTheLoop } from "@/components/blog/InTheLoop";
import { MoreFromNewsroom } from "@/components/blog/MoreFromNewsroom";
import { getAllPosts, getLoopPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "EvalLense Newsroom — Latest News",
  description:
    "Product updates, research, and stories from the team building EvalLense — structured pitch-deck evaluation with explainable, human-controlled decisions.",
};

export default function BlogHubPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const rail = rest.slice(0, 3);
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

          <div className="blog-seeall-row">
            <Link href="/blog/all" className="blog-seeall">
              See all <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- In the Loop: paged rail of reposted social items (popup) ---- */}
      {loopPosts.length > 0 && <InTheLoop posts={loopPosts} />}

      {/* ---- More from the Newsroom ---- */}
      <MoreFromNewsroom />
    </>
  );
}
