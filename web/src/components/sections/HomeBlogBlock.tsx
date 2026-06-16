// Home-page "Newsroom" block. A Server Component that loads the editor's
// featured selection (or newest published as fallback) and feeds it to an
// Apple-style horizontal card carousel (`NewsroomCarousel`, client). Appearance
// reveal is driven by the shared `.reveal` IntersectionObserver in
// ScrollOrchestrator — no per-section effect here.

import Link from "next/link";
import {
  type NewsroomCard,
  NewsroomCarousel,
} from "@/components/sections/NewsroomCarousel";
import { getFeaturedPosts } from "@/lib/blog";

export async function HomeBlogBlock() {
  const posts = await getFeaturedPosts(6);
  if (posts.length === 0) return null;

  const cards: NewsroomCard[] = posts.map((post) => ({
    slug: post.slug,
    category: post.category,
    accent: post.accent,
    title: post.title,
    excerpt: post.excerpt,
    cover: post.cover,
  }));

  return (
    <section className="home-blog reveal" id="home-blog">
      <div className="wrap">
        <div className="home-blog__head">
          <h2 className="home-blog__title">From the Newsroom</h2>
          <Link href="/blog" className="home-blog__seeall">
            See all <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <NewsroomCarousel cards={cards} />
    </section>
  );
}
