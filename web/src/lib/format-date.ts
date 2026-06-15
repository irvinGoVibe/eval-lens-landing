// Pure, synchronous, client-safe date formatter for the Newsroom.
//
// Kept in its own module (with no server-only / Supabase imports) so that
// client components can import it via `@/lib/blog` without dragging the
// server-only data layer (`cms/queries.ts` → `@supabase/supabase-js`,
// `'use cache'`, `cacheTag`) into the client bundle.

/** "June 10, 2026" — matches the Newsroom stamp style. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
