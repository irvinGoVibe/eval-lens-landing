// Next.js 16 Proxy (formerly Middleware) — gates the /admin/* area behind the
// admin session cookie. Unauthenticated requests are redirected to the login
// page. Public pages otherwise pass through unchanged; the only additional
// public matcher handles the physical-Safari RSC preflight described below.
//
// NOTE: per the Next 16 proxy guidance, auth is also re-verified inside every
// server action / route handler that mutates data — the proxy is an optimistic
// gate, not the sole authorization layer.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN_PATH, SESSION_COOKIE, expectedSessionToken } from "@/lib/cms/auth";

// /icp/* — password-gated ICP landing previews shared with the founder for
// review. Same philosophy as `private-posts.ts`: the repo stores only a
// SHA-256 digest of the shared password (overridable via env), never the raw
// value. Any username is accepted; only the password is checked.
const ICP_PASSWORD_SHA256 =
  process.env.ICP_REVIEW_PASSWORD_SHA256 ??
  "e534c16afdf55c41a1885edafac7ee745515a03c4cc345cb1995e2738b295572";

async function icpBasicAuthOk(request: NextRequest): Promise<boolean> {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const password = decoded.slice(decoded.indexOf(":") + 1);
  if (!password) return false;
  const digestBytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password),
  );
  const digest = Array.from(new Uint8Array(digestBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return digest === ICP_PASSWORD_SHA256;
}

function rscCorsHeaders(request: NextRequest): Headers | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const host = request.headers.get("host");
  let allowed = false;
  if (host) {
    try {
      allowed = new URL(origin).host === host;
    } catch {
      allowed = false;
    }
  }
  if (!allowed) return null;

  return new Headers({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers":
      "Accept, Content-Type, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Router-State-Tree, Next-Url, RSC",
    "Access-Control-Allow-Private-Network": "true",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestedCorsHeaders =
    request.headers.get("access-control-request-headers")?.toLowerCase() ?? "";
  const corsHeaders = rscCorsHeaders(request);

  // iOS Safari's Local Network Access path preflights RSC fetches against a
  // LAN-hosted production build. Next's generated page route otherwise answers
  // OPTIONS with 405, so complete this narrow, read-only preflight here.
  if (
    request.method === "OPTIONS" &&
    requestedCorsHeaders.split(",").some((header) => header.trim() === "rsc") &&
    corsHeaders
  ) {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  }

  // Password-gated ICP previews (static pages under /public/icp).
  if (pathname === "/icp" || pathname.startsWith("/icp/")) {
    if (await icpBasicAuthOk(request)) {
      return NextResponse.next();
    }
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="EvalLens ICP review", charset="UTF-8"',
      },
    });
  }

  // Public requests pass through untouched; the public matcher is restricted
  // to the RSC OPTIONS preflight handled above.
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

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
  // Guard admin routes and intercept only cache-keyed RSC preflights elsewhere.
  // The login API route handler performs its own authentication check.
  matcher: [
    "/admin/:path*",
    "/icp/:path*",
    {
      source: "/:path*",
      has: [
        { type: "header", key: "access-control-request-method", value: "GET" },
        {
          type: "header",
          key: "access-control-request-headers",
          value: ".*[Rr][Ss][Cc].*",
        },
      ],
    },
  ],
};
