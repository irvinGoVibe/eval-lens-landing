"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import {
  BOOK_CALL_CTA,
  GLOBAL_NAV,
  type NavLink,
  type SectionNav,
} from "@/lib/site-nav";

/**
 * Mobile navigation for the internal-page header. On narrow viewports the
 * desktop switcher + anchor row are hidden (CSS) and the bar collapses to
 * `[EvalLense]            [Menu]`. Tapping Menu opens a FULL-SCREEN frosted
 * overlay covering the viewport: a top row (brand + close), the global pages
 * with their sub-links expanded, then a divider and the current page's own
 * anchor links, with two CTAs pinned at the bottom — a primary gradient
 * "Launch App" and a subordinate glass "Book a call".
 *
 * Opens on click. Closes on the × button, scrim tap, Escape, route change, and
 * any selection — focus always returns to the trigger. While open, focus is
 * trapped inside the panel and body scroll is locked. The overlay is portaled
 * to <body> (the header's `transform` would otherwise trap a fixed child), so
 * the dark surface is mirrored onto it via the `mnav__overlay--dark` modifier
 * rather than inherited from `.page-header--dark`. This is a self-contained
 * client component with local state — it is NOT part of ScrollOrchestrator.
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const openDrawer = () => {
    const header = document.querySelector(".page-header");
    setDark(Boolean(header?.classList.contains("page-header--dark")));
    setOpen(true);
  };

  // Single close path: hide the overlay and return focus to the trigger so the
  // user lands back where they opened it (× button, scrim, Escape, selection).
  const closeDrawer = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Portal target only exists after mount (the drawer is rendered to <body> so
  // the header's `transform` ancestor doesn't trap the fixed overlay).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change. (Don't refocus the trigger here — navigation moves
  // focus; refocusing would yank it back to the header.)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + scroll lock + focus trap while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== "Tab") return;
      // Cycle focus within the panel.
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the overlay on open.
    const id = window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(id);
    };
  }, [open, closeDrawer]);

  const overlay = (
    <div
      className={dark ? "mnav__overlay mnav__overlay--dark" : "mnav__overlay"}
      data-open={open}
      aria-hidden={!open}
      onClick={closeDrawer}
    >
      <div
        className="mnav__panel"
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mnav__top">
          <span className="mnav__brand" aria-hidden="true">
            EvalLense
          </span>
          <button
            type="button"
            ref={closeRef}
            className="mnav__close"
            aria-label="Close menu"
            tabIndex={open ? undefined : -1}
            onClick={closeDrawer}
          >
            <svg
              className="mnav__close-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mnav__scroll">
          <p className="mnav__heading">Explore EvalLense</p>
          <ul className="mnav__list">
            {GLOBAL_NAV.map((entry) => (
              <li key={entry.href} className="mnav__group">
                <Link
                  href={entry.href}
                  className="mnav__page"
                  aria-current={pathname === entry.href ? "page" : undefined}
                  tabIndex={open ? undefined : -1}
                  onClick={closeDrawer}
                >
                  <span className="mnav__page-name">{entry.label}</span>
                  {entry.description !== undefined && (
                    <span className="mnav__page-desc">{entry.description}</span>
                  )}
                </Link>
                {entry.links !== undefined && (
                  <ul className="mnav__sublinks">
                    {entry.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="mnav__sublink"
                          aria-current={
                            pathname === link.href ? "page" : undefined
                          }
                          tabIndex={open ? undefined : -1}
                          onClick={closeDrawer}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
                      onClick={closeDrawer}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mnav__ctas">
          <Button
            variant="gradient"
            className="mnav__cta mnav__cta--primary"
            href={cta.href}
            arrow
            tabIndex={open ? undefined : -1}
            onClick={closeDrawer}
          >
            {cta.label}
          </Button>
          <Button
            variant="glass"
            className="mnav__cta mnav__cta--secondary"
            href={BOOK_CALL_CTA.href}
            tabIndex={open ? undefined : -1}
            onClick={closeDrawer}
          >
            {BOOK_CALL_CTA.label}
          </Button>
        </div>
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
        onClick={() => (open ? closeDrawer() : openDrawer())}
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
