import type { Metadata } from "next";
import { AllNewsGrid } from "@/components/blog/AllNewsGrid";
import { MoreFromNewsroom } from "@/components/blog/MoreFromNewsroom";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "All News — EvalLense Newsroom",
  description:
    "Every story from EvalLense Newsroom — press releases, product updates, research, and more.",
};

export default function AllNewsPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="blog-section blog-section--hero">
        <div className="wrap blog-wrap">
          <header className="blog-masthead">
            <p className="t-eyebrow">EvalLense Newsroom</p>
            <h1 className="blog-masthead__title">
              All <span className="grad">News</span>
            </h1>
          </header>

          <AllNewsGrid posts={posts} />
        </div>
      </section>

      <MoreFromNewsroom />
    </>
  );
}
