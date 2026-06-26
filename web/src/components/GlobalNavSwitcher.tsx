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
  const menuId = useId();

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

  const activeHref = GLOBAL_NAV.find((entry) =>
    pathname.startsWith(entry.match),
  )?.href;

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
        id={menuId}
        role="menu"
        data-open={open}
        aria-label="Site pages"
      >
        <p className="gnav__heading">Explore EvalLense</p>
        <ul className="gnav__list">
          {GLOBAL_NAV.map((entry) => {
            const active = entry.href === activeHref;
            return (
              <li key={entry.href} role="none">
                <Link
                  role="menuitem"
                  href={entry.href}
                  className="gnav__item"
                  aria-current={active ? "page" : undefined}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                >
                  <span className="gnav__item-indicator" aria-hidden="true" />
                  <span className="gnav__item-name">{entry.label}</span>
                  <span className="gnav__item-desc">{entry.description}</span>
                  <span className="gnav__item-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
