import { SITE_URL } from "@/lib/site-url";

/**
 * Structured-data helpers. Pages build plain schema.org objects from data they
 * already hold (FAQ consts, route position) and render them via <JsonLd/> —
 * no visual output, search/AI crawlers only.
 */

type FaqLike = { q: string; a: unknown };

/** FAQPage from a page's FAQ const. Items with non-string answers (JSX) are
 * skipped; returns null below two usable pairs so we never emit thin schema. */
export function faqJsonLd(items: readonly FaqLike[]): object | null {
  const pairs = items.filter(
    (i): i is { q: string; a: string } => typeof i.a === "string" && i.q.length > 0,
  );
  if (pairs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** BreadcrumbList from [label, path] pairs, ordered from root to leaf. */
export function breadcrumbJsonLd(trail: readonly [string, string][]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
