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
  onClick,
  ...props
}: LanSafeLinkProps) {
  return (
    <NextLink
      {...props}
      prefetch={isLanQaOrigin() ? false : prefetch}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isLanQaOrigin()) return;
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.currentTarget.target === "_blank" ||
          event.currentTarget.hasAttribute("download")
        ) {
          return;
        }

        const destination = new URL(event.currentTarget.href, window.location.href);
        if (destination.origin !== window.location.origin) return;

        // Activated RSC navigation can still lose its connection in physical
        // Safari after a valid Local Network Access preflight. A full document
        // request does not take that fetch path and is deterministic on the
        // isolated LAN QA origin. This branch is never active in production.
        event.preventDefault();
        window.location.assign(destination.href);
      }}
    />
  );
}
