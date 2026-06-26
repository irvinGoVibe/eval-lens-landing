"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ds";
import { NavIconGlyph } from "@/components/nav-icons";
import { MOBILE_NAV, type NavLink, type SectionNav } from "@/lib/site-nav";

/**
 * Mobile navigation for the internal-page header. On narrow viewports the
 * desktop switcher + anchor row are hidden (CSS) and the bar collapses to the
 * burger trigger. Tapping it opens a FULL-HEIGHT frosted bottom-sheet overlay:
 *
 *   grabber → top (brand + bare × close glyph) → scrollable body
 *     · each global section = a SPLIT-TAP row: a Link (glossy lens-gradient ORB
 *       + name + one-line desc) that NAVIGATES to the section page, and a sibling
 *       toggle button (the remaining field + chevron) that OPENS/CLOSES an
 *       accordion of its sub-links (plain text, no markers/rail); the active
 *       section is expanded on open and its orb glows brighter
 *     · divider + "On this page" anchors for the current page
 *     · a single ghost "Launch App" CTA at the END of the scroll flow — it
 *       sits below the anchors in normal flow, NOT pinned to the bottom of the
 *       screen
 *
 * Accordion / section-access UX: split-tap keeps a clean a11y model (link
 * navigates, button toggles) as two non-nested siblings inside the row. Tapping
 * the section name/orb goes straight to the section page (entry.href); tapping
 * the rest of the row field or the chevron expands/collapses the accordion of
 * sub-links. Every section's index route is also present as a sub-link.
 *
 * Mechanics preserved from the previous drawer: createPortal to <body> (the
 * header's `transform` would otherwise trap a fixed child), focus-trap (focus
 * enters the panel, Tab cycles, focus returns to the trigger on every close),
 * body scroll-lock, Escape, route-change close, managed tabIndex, and the
 * dark-mirror snapshot (`openDrawer` reads `.page-header--dark` →
 * `mnav__overlay--dark`). Self-contained client component — NOT part of
 * ScrollOrchestrator.
 */
export function MobileNav({ nav, cta }: { nav?: SectionNav; cta: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // The overlay is portaled to <body>, so it can't read the header's
  // `.page-header--dark` ancestor. Snapshot the header surface when opening and
  // mirror it onto the overlay via `--dark`.
  const [dark, setDark] = useState(false);
  // The single expanded accordion section (by `match` key), or null when all
  // are collapsed. Single-open: opening one section closes any other.
  const [expanded, setExpanded] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Section whose `match` prefixes the current path (used for active accent and
  // default-expanded state).
  const activeMatch = useMemo(
    () =>
      MOBILE_NAV.find((entry) => pathname.startsWith(entry.match))?.match ??
      null,
    [pathname],
  );

  const openDrawer = () => {
    const header = document.querySelector(".page-header");
    setDark(Boolean(header?.classList.contains("page-header--dark")));
    // Active section starts open (single-open); none if there's no active one.
    setExpanded(activeMatch);
    setOpen(true);
  };

  // Single close path: hide the overlay and return focus to the trigger so the
  // user lands back where they opened it (× button, scrim, Escape, selection).
  const closeDrawer = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Single-open accordion: clicking the open section collapses it (null);
  // clicking a collapsed section makes it the ONLY open one.
  const toggleSection = useCallback((match: string) => {
    setExpanded((prev) => (prev === match ? null : match));
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
        className="mnav__sheet"
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="mnav__grabber" aria-hidden="true" />

        <div className="mnav__top">
          <span className="mnav__brand">
            <span className="mnav__mark" aria-hidden="true" />
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
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M17 7 7 17" />
              <path d="m7 7 10 10" />
            </svg>
          </button>
        </div>

        <div className="mnav__scroll">
          <p className="mnav__heading">Explore EvalLense</p>
          <ul className="mnav__list">
            {MOBILE_NAV.map((entry) => {
              const isActive = entry.match === activeMatch;
              const isExpanded = expanded === entry.match;
              return (
                <li
                  key={entry.href}
                  className="mnav__group"
                  data-active={isActive || undefined}
                  data-expanded={isExpanded || undefined}
                >
                  <div className="mnav__row">
                    <Link
                      href={entry.href}
                      className="mnav__row-link"
                      aria-current={
                        pathname === entry.href ? "page" : undefined
                      }
                      tabIndex={open ? undefined : -1}
                      onClick={closeDrawer}
                    >
                      <span className="mnav__orb" aria-hidden="true" />
                      <span className="mnav__row-text">
                        <span className="mnav__row-name">{entry.label}</span>
                        {entry.desc !== undefined && (
                          <span className="mnav__row-desc">{entry.desc}</span>
                        )}
                      </span>
                    </Link>
                    <button
                      type="button"
                      className="mnav__row-toggle"
                      aria-expanded={isExpanded}
                      aria-label={`Toggle ${entry.label} links`}
                      tabIndex={open ? undefined : -1}
                      onClick={() => toggleSection(entry.match)}
                    >
                      <span className="mnav__chevron" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          focusable="false"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {entry.links !== undefined && (
                    <div className="mnav__sublinks">
                      <div className="mnav__sublinks-inner">
                        <ul>
                          {entry.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="mnav__sublink"
                                aria-current={
                                  pathname === link.href ? "page" : undefined
                                }
                                tabIndex={open && isExpanded ? undefined : -1}
                                onClick={closeDrawer}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {nav && nav.links.length > 0 && (
            <>
              <div className="mnav__divider" role="presentation" />
              <p className="mnav__heading">On this page</p>
              <ul className="mnav__anchors">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="mnav__anchor"
                      tabIndex={open ? undefined : -1}
                      onClick={closeDrawer}
                    >
                      <NavIconGlyph name="anchor" className="mnav__anchor-icon" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* The single ghost CTA lives at the END of the scroll flow (not a
              pinned footer): it appears below the anchors as you scroll down. */}
          <div className="mnav__ctas">
            <Button
              variant="ghost"
              className="mnav__cta mnav__cta--primary"
              href={cta.href}
              arrow
              tabIndex={open ? undefined : -1}
              onClick={closeDrawer}
            >
              {cta.label}
            </Button>
          </div>
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
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? closeDrawer() : openDrawer())}
      >
        <svg
          className="mnav__trigger-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 9h14" />
          <path d="M5 15h14" />
        </svg>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
