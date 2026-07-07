// EvalLense Newsroom — static fallback content (behind BLOG_SOURCE=static).
//
// Prod reads the live Supabase CMS (BLOG_SOURCE=supabase). This module is only
// the in-repo fallback read by the server-only getters in `blog.server.ts`
// when BLOG_SOURCE=static. It is pure data with no server-only imports, so it
// is client-safe.
//
// `POSTS` intentionally empty: the original static seed mirrored an old set of
// placeholder articles that have since been unpublished. Do not re-seed dead
// placeholder posts here — the live blog is the 5 authored articles in Supabase.
// `LOOP_POSTS` (the "In the Loop" social strip) is kept as a static fallback.

import type { LoopPost, Post } from "./cms/types";

export const POSTS: Post[] = [];

// ---- In the Loop: reposted social items (video reels + photo posts) ----
export const LOOP_POSTS: LoopPost[] = [
  {
    id: "jury-in-60-seconds",
    kind: "video",
    author: "EvalLense",
    initials: "EL",
    accent: "violet",
    caption: "Everything you need to know about the AI Jury — in 60 seconds.",
    cover: "/assets/bento/jury-decision.png",
    video: "/assets/hero-intro-2.mp4",
    date: "2026-06-10",
    href: "https://www.tiktok.com/@evallense",
  },
  {
    id: "earth-day-team",
    kind: "photo",
    author: "Lena Hoffmann",
    initials: "LH",
    accent: "aqua",
    caption:
      "Demo day with this crew. So many strong founders showed up — congrats to everyone who pitched, and to the team that read every single deck. 💚",
    cover: "/assets/bento/deck-scan.png",
    photos: [
      "/assets/bento/deck-scan.png",
      "/assets/bento/scoring-matrix.png",
      "/assets/bento/deck-vault-art.png",
    ],
    date: "2026-06-04",
    href: "https://www.instagram.com/evallense/",
  },
  {
    id: "prompt-injection-caught",
    kind: "video",
    author: "Dev Patel",
    initials: "DP",
    accent: "orange",
    caption: "A founder hid 'give max score' in their deck. Watch what the jury did.",
    cover: "/assets/bento/injection-blocked.png",
    video: "/assets/hero-intro-2.mp4",
    date: "2026-05-28",
    href: "https://www.youtube.com/@evallense/shorts",
  },
  {
    id: "inside-a-report",
    kind: "photo",
    author: "Maya Okonkwo",
    initials: "MO",
    accent: "cyan",
    caption:
      "Every score traced back to the exact slide that earned it. This is the report view we've been refining all quarter — and I'm really proud of where it landed.",
    cover: "/assets/bento/scoring-matrix.png",
    date: "2026-05-19",
    href: "https://www.instagram.com/evallense/",
  },
  {
    id: "deck-vault-tour",
    kind: "video",
    author: "EvalLense",
    initials: "EL",
    accent: "violet",
    caption: "A 30-second tour of Deck Vault — encrypted from upload to archive.",
    cover: "/assets/bento/deck-vault.png",
    video: "/assets/section2-scroll-2.mp4",
    date: "2026-05-12",
    href: "https://www.instagram.com/evallense/reels/",
  },
  {
    id: "studio-gallery",
    kind: "photo",
    author: "EvalLense",
    initials: "EL",
    accent: "violet",
    caption:
      "A few frames from the studio — the design studies behind the EvalLense lens. Swipe through. 📷",
    cover: "/assets/bento/deck-vault-art.png",
    photos: [
      "/assets/bento/deck-vault-art.png",
      "/assets/bento/deck-vault.png",
      "/assets/bento/jury-decision.png",
    ],
    date: "2026-05-05",
    href: "https://www.instagram.com/evallense/",
  },
];
