// Password-protected article previews (/blog/private/<slug>).
//
// Articles listed here stay `draft` in the CMS (invisible on the public blog)
// but render at /blog/private/<slug> for anyone who enters the shared
// password. We store only SHA-256 digests of the passwords, mirroring the
// admin-session scheme in `cms/auth.ts` — the raw password never lives in the
// repo or in a cookie. The digest doubles as the session-cookie value.

/** slug → hex SHA-256 digest of that article's access password. */
export const PRIVATE_POSTS: Record<string, string> = {
  // password shared with the Crypto Executives team
  "partnering-with-crypto-executives":
    "81a1d3da303fef84af2f08e7c1c27228bc07fc96c66dbb2d950f484ea483fd49",
};

export function privateCookieName(slug: string): string {
  return `evl_private_${slug}`;
}
