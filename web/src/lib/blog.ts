// EvalLense Newsroom — blog data facade (single `@/lib/blog` import surface).
//
// Content lives in Supabase (Postgres + Storage), not in this repo. This module
// preserves the original public contract so the consumer files don't change:
//   - `getAllPosts`, `getPostBySlug`, `getRelatedPosts`, `getLoopPosts`
//     → server-only getters, re-exported from `./blog.server`
//   - `formatDate` → pure, client-safe helper, re-exported from `./format-date`
//   - domain types → re-exported from `./cms/types`
//
// IMPORTANT — client/server boundary: the Supabase query layer (`./cms/queries`
// → `@supabase/supabase-js`, `'use cache'`, `cacheTag`) is server-only and must
// never enter a client bundle. Some consumers of `@/lib/blog` are
// `"use client"` components (`InTheLoop`, `AllNewsGrid`). A `"use client"`
// module's import graph is traced into the client bundle in full — including
// static AND dynamic `import()` edges — so any reference from this barrel to
// `./cms/queries` (direct or via a getter that imports it) would pull the
// server-only graph client-side and break the build.
//
// Turbopack traces an entire barrel module into any importing client bundle
// (it does NOT per-export tree-shake across the client/server boundary), so a
// `"use client"` component must not import a RUNTIME value from this barrel —
// that would drag the re-exported server getters (and `./cms/queries`) into the
// client bundle. Therefore:
//   - the server getters live in `./blog.server` (guarded with `server-only`)
//     and are value-re-exported here for the server route pages;
//   - the only `"use client"` consumers (`InTheLoop`, and `ArticleCard` when
//     rendered inside the client `AllNewsGrid`) import the runtime helper
//     `formatDate` directly from `@/lib/format-date`, and take only TYPE
//     imports from this barrel (types are erased at build, so they never pull
//     the server graph). Server consumers import the getters from here as usual.

// Client-safe surface.
export type { Accent, Block, Category, LoopKind, LoopPost, Post } from "./cms/types";
export { formatDate } from "./format-date";

// Server-only data getters. `blog.server` imports `server-only`, so if this
// re-export is ever traced into a client bundle the build fails loudly instead
// of silently shipping the Supabase client to the browser.
export {
  getAllPosts,
  getFeaturedPosts,
  getLoopPosts,
  getPostBySlug,
  getRelatedPosts,
} from "./blog.server";
