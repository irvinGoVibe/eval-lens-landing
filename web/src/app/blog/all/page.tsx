import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AllNewsGrid } from "@/components/blog/AllNewsGrid";
import { MoreFromNewsroom } from "@/components/blog/MoreFromNewsroom";
import type { Category } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog";

/**
 * URL slug → category. The All News page filters by the blog tag passed in the
 * query string as a bare key, e.g. `/blog/all?product` or `/blog/all?research`.
 * For robustness we also accept it as a value on `?tag=` / `?category=` /
 * `?blogteg=`. No match → the page shows every post.
 */
const CATEGORY_BY_SLUG: Record<string, Category> = {
  "press-release": "Press Release",
  product: "Product",
  research: "Research",
};

/** Heading shown when a category is active (matches the Newsroom tile labels). */
const CATEGORY_HEADING: Record<Category, string> = {
  "Press Release": "Press Releases",
  Product: "Product Updates",
  Research: "Research",
};

type SearchParams = { [key: string]: string | string[] | undefined };

/** Resolve the active category from the query string (bare key or value). */
function resolveCategory(params: SearchParams): Category | null {
  const candidates = [
    ...Object.keys(params),
    params.tag,
    params.category,
    params.blogteg,
  ]
    .flat()
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.toLowerCase());

  for (const slug of candidates) {
    if (CATEGORY_BY_SLUG[slug]) return CATEGORY_BY_SLUG[slug];
  }
  return null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const activeCategory = resolveCategory(await searchParams);
  const label = activeCategory ? CATEGORY_HEADING[activeCategory] : "All News";
  return {
    title: `${label} — EvalLense Newsroom`,
    description:
      "Every story from EvalLense Newsroom — press releases, product updates, research, and more.",
  };
}

/**
 * Masthead: title (trailing word(s) keep the gradient). On a filtered (single-
 * tag) view it also shows a "← All News" pill to clear the filter; the
 * unfiltered page shows no such control.
 */
function Masthead({ activeCategory }: { activeCategory: Category | null }) {
  const heading = activeCategory ? CATEGORY_HEADING[activeCategory] : "All News";
  const [first, ...rest] = heading.split(" ");
  return (
    <header className="blog-masthead">
      {activeCategory ? (
        <Link href="/blog/all" className="blog-backlink">
          <span className="blog-backlink__chevron" aria-hidden="true">
            ←
          </span>
          All News
        </Link>
      ) : (
        <p className="t-eyebrow">EvalLense Newsroom</p>
      )}
      <h1 className="blog-masthead__title">
        {rest.length > 0 ? (
          <>
            {first} <span className="grad">{rest.join(" ")}</span>
          </>
        ) : (
          <span className="grad">{first}</span>
        )}
      </h1>
    </header>
  );
}

/**
 * Dynamic feed: reads `searchParams` (a runtime API) and filters the posts.
 * Cache Components (Next 16) requires runtime APIs to be consumed inside a
 * `<Suspense>` boundary — otherwise the static shell renders with empty params
 * and the filter never applies.
 */
async function NewsroomFeed({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeCategory = resolveCategory(await searchParams);
  const allPosts = await getAllPosts();
  const posts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  return (
    <>
      <Masthead activeCategory={activeCategory} />
      <AllNewsGrid posts={posts} />
    </>
  );
}

export default function AllNewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <section className="blog-section blog-section--hero">
        <div className="wrap blog-wrap">
          <Suspense fallback={<Masthead activeCategory={null} />}>
            <NewsroomFeed searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <MoreFromNewsroom />
    </>
  );
}
