"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { GLOBAL_NAV } from "@/lib/site-nav";

/**
 * Global page switcher that lives where the static section name used to sit in
 * the internal-page header. The trigger shows the current section (`label`);
 * clicking it opens a wide glass panel listing every top-level page so the user
 * can jump between them without returning home. The brand logo still links home
 * and the page's own anchor links stay on the right.
 *
 * Theme (light / dark) is inherited from the header via CSS descendant
 * selectors (`.page-header--dark .gnav__panel` …) — no JS theme prop needed.
 * `HeaderThemeSync` toggles `.page-header--dark`; the panel follows.
 *
 * Opens on click (never hover). Closes on outside click, Escape (returning
 * focus to the trigger), route change, and after a selection. Uses
 * `aria-haspopup` / `aria-expanded` / `aria-current` and keeps panel links out
 * of the tab order while closed (CSS `visibility:hidden`).
 */
export function GlobalNavSwitcher({ label }: { label: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Grow the header body by exactly the menu's height while open: measure the
  // panel and write `--gnav-grow` (panel height + 8px drop gap) onto the nearest
  // `.page-header`; CSS animates `height: calc(56px + var(--gnav-grow))`. Set to
  // 0 on close so the header collapses back. The header carries the transition,
  // so this is just a target value — no per-frame work, no ScrollOrchestrator.
  useEffect(() => {
    const header = rootRef.current?.closest<HTMLElement>(".page-header");
    if (!header) return;
    if (open) {
      const h = panelRef.current?.offsetHeight ?? 0;
      header.style.setProperty("--gnav-grow", `${h + 8}px`);
    } else {
      header.style.setProperty("--gnav-grow", "0px");
    }
  }, [open, pathname]);

  // Close whenever the route changes (covers in-panel selections too).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Outside-click + Escape while open.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="gnav" ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="gnav__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="gnav__trigger-label">{label}</span>
        <svg
          className="gnav__caret"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            d="M2 3.5 5 6.5 8 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className="gnav__panel"
        ref={panelRef}
        id={menuId}
        role="menu"
        data-open={open}
        aria-label="Site pages"
      >
        <p className="gnav__heading">Explore EvalLense</p>
        <ul className="gnav__list">
          {GLOBAL_NAV.map((entry) => {
            const sectionActive = pathname.startsWith(entry.match);
            const tab = open ? undefined : -1;

            // Newsroom-style entry: no sub-links — the whole row is ONE link.
            if (entry.description !== undefined) {
              return (
                <li key={entry.href} role="none">
                  <Link
                    role="menuitem"
                    href={entry.href}
                    className="gnav__item gnav__item--single"
                    aria-current={pathname === entry.href ? "page" : undefined}
                    tabIndex={tab}
                    onClick={() => setOpen(false)}
                  >
                    <span className="gnav__item-indicator" aria-hidden="true" />
                    <span className="gnav__item-name">{entry.label}</span>
                    <span className="gnav__item-desc">{entry.description}</span>
                  </Link>
                </li>
              );
            }

            // Sectioned entry: the ROW is a non-interactive container. Section
            // name + arrow are ONE link to the top-level route; each sub-link is
            // its own link. No nested <a>.
            return (
              <li
                key={entry.href}
                role="none"
                className="gnav__item gnav__item--group"
                data-active={sectionActive || undefined}
              >
                <span className="gnav__item-indicator" aria-hidden="true" />
                <Link
                  role="menuitem"
                  href={entry.href}
                  className="gnav__item-head"
                  aria-current={pathname === entry.href ? "page" : undefined}
                  tabIndex={tab}
                  onClick={() => setOpen(false)}
                >
                  <span className="gnav__item-name">{entry.label}</span>
                </Link>
                <span className="gnav__sublinks">
                  {entry.links.map((link, i) => (
                    <span className="gnav__sublink-wrap" key={link.href}>
                      {i > 0 && (
                        <span className="gnav__sep" aria-hidden="true">
                          ,{" "}
                        </span>
                      )}
                      <Link
                        role="menuitem"
                        href={link.href}
                        className="gnav__sublink"
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                        tabIndex={tab}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </span>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
