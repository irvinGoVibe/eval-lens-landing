// Home-page "Newsroom" block — DARK variant. Same Apple-style carousel as
// HomeBlogBlock, recoloured for a dark theme (see `.home-blog--dark` in
// globals.css): near-black section, dark cards, pure-black media wells for
// black-background artwork. Used on /dev/newsroom to preview the dark look.
// `cards-in` is set statically so the spring plays once on mount without the
// scroll observer (this variant carries no #home-blog id / .reveal).

import Link from "next/link";
import {
  type NewsroomCard,
  NewsroomCarousel,
} from "@/components/sections/NewsroomCarousel";
import { getFeaturedPosts } from "@/lib/blog";

export async function HomeBlogBlockDark() {
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
    <section className="home-blog home-blog--dark cards-in">
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
