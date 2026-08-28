// Password-protected article previews (/blog/private/<slug>).
//
// Articles listed here stay `draft` in the CMS (invisible on the public blog)
// but render at /blog/private/<slug> for anyone who enters the shared
// password. We store only SHA-256 digests of the passwords, mirroring the
// admin-session scheme in `cms/auth.ts` — the raw password never lives in the
// repo or in a cookie. The digest doubles as the session-cookie value.

/** slug → hex SHA-256 digest of that article's access password. */
export const PRIVATE_POSTS: Record<string, string> = {
  // password shared with the Kaizen Finance team
  "partnering-with-kaizen-finance":
    "117868380d2a58ab3225ab0c3f5bc96c7e29343d99686a037490f38951185315",
  // password shared with the R2 Copilot team
  "partnering-with-r2-copilot":
    "7d690ef53ea05af27af2bbc7c690b366e2fcba90911ca0c434a4dc99e9be8c41",
  // preview: Akim co-founder announcement (shared with Akim)
  "akim-golubev-joins-evallens":
    "4e062b4c08dc2e81eb3ee729cb66864c0ab0851bc29e1e21dd6d7759169b429d",
};

export function privateCookieName(slug: string): string {
  return `evl_private_${slug}`;
}
