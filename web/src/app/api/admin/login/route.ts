// Admin login — verifies CMS_PASSWORD server-side and sets the httpOnly
// session cookie. The password is compared on the server only and never
// returned; a wrong password yields 401 without leaking anything.

import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  expectedSessionToken,
  safeEqual,
  sha256Hex,
} from "@/lib/cms/auth";

export async function POST(request: Request): Promise<Response> {
  const expectedPassword = process.env.CMS_PASSWORD;
  if (!expectedPassword) {
    return Response.json(
      { ok: false, error: "CMS is not configured." },
      { status: 503 },
    );
  }

  let password = "";
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as {
      password?: unknown;
    };
    if (typeof body.password === "string") password = body.password;
  } else {
    const form = await request.formData().catch(() => null);
    const value = form?.get("password");
    if (typeof value === "string") password = value;
  }

  const token = await expectedSessionToken();
  if (!token) {
    return Response.json({ ok: false, error: "CMS is not configured." }, { status: 503 });
  }

  // Compare fixed-length SHA-256 digests, never the raw strings: both sides are
  // always 64 hex chars, so the constant-time compare runs on equal-length
  // inputs and the password length can't leak through the early length-guard.
  const candidate = await sha256Hex(password);
  if (!password || !safeEqual(candidate, token)) {
    return Response.json({ ok: false, error: "Invalid password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return Response.json({ ok: true });
}
