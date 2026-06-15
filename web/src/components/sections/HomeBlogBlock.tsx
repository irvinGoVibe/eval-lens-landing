// Home-page blog block (Story 02). A Server Component that renders the editor's
// featured article selection (or the newest published as a fallback) using the
// existing Newsroom card styles. Appearance/scroll reveal is driven by the
// shared `.reveal` IntersectionObserver in ScrollOrchestrator — no per-section
// effect here.

import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getFeaturedPosts } from "@/lib/blog";

export async function HomeBlogBlock() {
  const posts = await getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="home-blog reveal" id="home-blog">
      <div className="wrap">
        <div className="home-blog__head">
          <h2 className="home-blog__title">From the Newsroom</h2>
          <Link href="/blog" className="home-blog__seeall">
            See all <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="blog-grid home-blog__grid">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
