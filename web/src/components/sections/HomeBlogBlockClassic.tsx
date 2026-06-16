// Home-page "Newsroom" block — CLASSIC version (the 3-up card grid that lived
// here before the Apple-style carousel). Kept so the two designs can be
// compared side by side on the /dev/newsroom page. Reuses the existing
// `.home-blog*` / `.blog-grid` / `ArticleCard` styles (no `id`/`.reveal`, so it
// renders immediately and doesn't collide with the live carousel block).

import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getFeaturedPosts } from "@/lib/blog";

export async function HomeBlogBlockClassic() {
  const posts = await getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="home-blog" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="home-blog__head">
          <h2 className="home-blog__title">From the Newsroom</h2>
          <Link href="/blog" className="home-blog__seeall">
            See all <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
