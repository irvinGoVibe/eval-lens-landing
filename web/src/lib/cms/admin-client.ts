// Server-only Supabase admin client (service_role).
//
// SECURITY: this module uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS and
// can read/write everything. It must NEVER reach the client bundle. The
// `server-only` import makes any client-side import a build-time error.
//
// service_role writes are how the CMS mutates `articles` / `loop_posts` and the
// home featured selection; anon RLS has no write policies (by design).

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Returns a memoized service_role Supabase client. Throws loudly if the env is
 * missing so a misconfigured deploy fails instead of silently no-op-ing writes.
 */
export function getAdminSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin is not configured: set NEXT_PUBLIC_SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY (server-side only; see .env.example).",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
