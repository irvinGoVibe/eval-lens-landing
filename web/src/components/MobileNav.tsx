"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { GLOBAL_NAV, type NavLink, type SectionNav } from "@/lib/site-nav";

/**
 * Mobile navigation for the internal-page header. On narrow viewports the
 * desktop switcher + anchor row are hidden (CSS) and the bar collapses to
 * `[EvalLense]            [Menu]`. Tapping Menu opens a drawer that lists the
 * global pages first, then a divider and the current page's own anchor links,
 * with the Launch App CTA pinned at the bottom.
 *
 * Opens on click. Closes on Escape (focus returns to the trigger), backdrop
 * click, route change, and any selection. The overlay is portaled to <body>
 * (the header's `transform` would otherwise trap a fixed child), so the dark
 * surface is mirrored onto it via the `mnav__overlay--dark` modifier rather
 * than inherited from `.page-header--dark`.
 */
export function MobileNav({ nav, cta }: { nav?: SectionNav; cta: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // The overlay is portaled to <body>, so it can't read the header's
  // `.page-header--dark` ancestor. Snapshot the header surface when opening and
  // mirror it onto the overlay via `--dark`.
  const [dark, setDark] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const openDrawer = () => {
    const header = document.querySelector(".page-header");
    setDark(Boolean(header?.classList.contains("page-header--dark")));
    setOpen(true);
  };

  // Portal target only exists after mount (the drawer is rendered to <body> so
  // the header's `transform` ancestor doesn't trap the fixed overlay).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const activeHref = GLOBAL_NAV.find((entry) =>
    pathname.startsWith(entry.match),
  )?.href;

  const overlay = (
    <div
      className={dark ? "mnav__overlay mnav__overlay--dark" : "mnav__overlay"}
      data-open={open}
      aria-hidden={!open}
      onClick={() => setOpen(false)}
    >
      <div
        className="mnav__panel"
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mnav__heading">Explore EvalLense</p>
        <ul className="mnav__list">
          {GLOBAL_NAV.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="mnav__page"
                aria-current={entry.href === activeHref ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
              >
                <span className="mnav__page-name">{entry.label}</span>
                <span className="mnav__page-desc">{entry.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        {nav && nav.links.length > 0 && (
          <>
            <div className="mnav__divider" role="presentation" />
            <p className="mnav__subhead">On this page</p>
            <ul className="mnav__anchors">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mnav__anchor"
                    tabIndex={open ? undefined : -1}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <Button
          variant="gradient"
          className="mnav__cta"
          href={cta.href}
          arrow
          tabIndex={open ? undefined : -1}
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mnav">
      <button
        type="button"
        ref={triggerRef}
        className="mnav__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : openDrawer())}
      >
        <span className="mnav__trigger-label">Menu</span>
        <span className="mnav__trigger-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
