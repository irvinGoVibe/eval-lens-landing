import type { Accent, Category } from "@/lib/blog";

export function CategoryTag({
  category,
  accent,
}: {
  category: Category;
  accent: Accent;
}) {
  return (
    <span className="blog-tag" data-accent={accent}>
      {category}
    </span>
  );
}
