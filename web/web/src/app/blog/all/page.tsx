import type { Metadata } from "next";
import { AllNewsGrid } from "@/components/blog/AllNewsGrid";
import { MoreFromNewsroom } from "@/components/blog/MoreFromNewsroom";
import type { Category } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "All News — EvalLense Newsroom",
  description:
    "Every story from EvalLense Newsroom — press releases, product updates, research, and more.",
};

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

export default async function AllNewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeCategory = resolveCategory(await searchParams);

  const allPosts = await getAllPosts();
  const posts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  const heading = activeCategory ? CATEGORY_HEADING[activeCategory] : "All News";
  const [headFirst, ...headRest] = heading.split(" ");

  return (
    <>
      <section className="blog-section blog-section--hero">
        <div className="wrap blog-wrap">
          <header className="blog-masthead">
            <p className="t-eyebrow">EvalLense Newsroom</p>
            <h1 className="blog-masthead__title">
              {headRest.length > 0 ? (
                <>
                  {headFirst} <span className="grad">{headRest.join(" ")}</span>
                </>
              ) : (
                <span className="grad">{headFirst}</span>
              )}
            </h1>
          </header>

          <AllNewsGrid posts={posts} />
        </div>
      </section>

      <MoreFromNewsroom />
    </>
  );
}
