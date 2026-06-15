// Next.js 16 Proxy (formerly Middleware) — gates the /admin/* area behind the
// admin session cookie. Unauthenticated requests are redirected to the login
// page. The public site (/, /blog, ...) is untouched: the matcher only runs on
// /admin paths.
//
// NOTE: per the Next 16 proxy guidance, auth is also re-verified inside every
// server action / route handler that mutates data — the proxy is an optimistic
// gate, not the sole authorization layer.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN_PATH, SESSION_COOKIE, expectedSessionToken } from "@/lib/cms/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page itself must stay reachable without a session.
  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const expected = await expectedSessionToken();

  if (!expected || !token || token !== expected) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only guard the admin area. The login API route handler does its own check.
  matcher: ["/admin/:path*"],
};
