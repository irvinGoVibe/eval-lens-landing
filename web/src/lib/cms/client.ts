// Server-only Supabase client for reading published blog content.
//
// NOTE: there is no `server-only` package installed (and we don't add new
// deps here), so this module is server-only by convention: it is imported
// only by the server-side facade in `lib/blog.ts` and the route handler.
// Do NOT import this from a Client Component — it would leak the (public)
// anon key reference into the client bundle and is not needed there.
//
// Only the anon key is used. RLS on `articles` / `loop_posts` restricts anon
// reads to `status = 'published'`. No `service_role` is used in this story.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Returns a memoized Supabase client.
 *
 * Throws a clear error if the required env vars are missing, so a
 * misconfigured environment fails loudly instead of silently rendering an
 * empty blog (see story Edge Cases).
 */
export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example). The blog reads " +
        "content from Supabase and will not fall back to an empty list.",
    );
  }

  cached = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
