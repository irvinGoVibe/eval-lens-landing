// Server-side admin auth helpers (no client import).
//
// One shared password (CMS_PASSWORD). On a correct login we set an httpOnly
// session cookie whose value is a SHA-256 digest of the password — the raw
// password never travels in a cookie, and the digest is what both the login
// route and the proxy compare against. This is intentionally simple: a single
// editor, one secret, server-side only (see Story 02 Business Rules).

import { webcrypto } from "node:crypto";

export const SESSION_COOKIE = "evl_admin";
export const LOGIN_PATH = "/admin/login";

/** Hex SHA-256 of the input (Web Crypto — works in Node and the proxy runtime). */
export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await webcrypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The expected session-cookie value for the configured password, or null if
 *  CMS_PASSWORD is unset (then no login can ever succeed). */
export async function expectedSessionToken(): Promise<string | null> {
  const password = process.env.CMS_PASSWORD;
  if (!password) return null;
  return sha256Hex(password);
}

/** Constant-time-ish string compare (length-guarded char XOR). Callers must
 *  pass equal-length inputs (e.g. fixed-length SHA-256 hex digests) so the
 *  length-guard never short-circuits on a real comparison and leaks length. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
