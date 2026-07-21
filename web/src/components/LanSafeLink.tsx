"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

type LanSafeLinkProps = ComponentProps<typeof NextLink>;

function isLanQaOrigin() {
  if (typeof window === "undefined" || window.location.port !== "3405") {
    return false;
  }

  const hostname = window.location.hostname.replace(/\.$/, "").toLowerCase();
  return (
    hostname === "localhost" ||
    hostname.startsWith("127.") ||
    hostname.endsWith(".local") ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(?:1[6-9]|2\d|3[01])\./.test(hostname)
  );
}

/**
 * Next's automatic Link prefetch can fan out many concurrent RSC requests.
 * Physical Safari applies Local Network Access checks to each of those on the
 * isolated QA server, which can race even after a valid preflight. Keep normal
 * production prefetching, but let LAN QA navigation fetch only when activated.
 */
export default function LanSafeLink({
  prefetch,
  ...props
}: LanSafeLinkProps) {
  return (
    <NextLink
      {...props}
      prefetch={isLanQaOrigin() ? false : prefetch}
    />
  );
}
