"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BentoHorse } from "@/components/sections/BentoHorse";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://calendly.com/evallens/30min";

function isPartnerGateTrigger(element: HTMLElement) {
  if (element.dataset.partnerAccess === "true") return true;

  const label = element
    .querySelector<HTMLElement>(".btn-txt")
    ?.textContent?.replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return label === "try live demo" || label === "launch app";
}

export function PartnerAccessModal() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const keyboardTriggerRef = useRef(false);

  const closeModal = useCallback((restoreKeyboardFocus = false) => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      closeRef.current?.removeAttribute("data-silent-focus");
      if (restoreKeyboardFocus) {
        returnFocusRef.current?.focus();
      } else if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, []);

  useEffect(() => {
    const interceptPartnerGate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>("a, button");
      if (!trigger || !isPartnerGateTrigger(trigger)) return;

      event.preventDefault();
      returnFocusRef.current = trigger;
      keyboardTriggerRef.current = event.detail === 0;
      setOpen(true);
    };

    document.addEventListener("click", interceptPartnerGate, true);
    return () => document.removeEventListener("click", interceptPartnerGate, true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      const close = closeRef.current;
      if (!close) return;
      close.toggleAttribute("data-silent-focus", !keyboardTriggerRef.current);
      close.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      closeRef.current?.removeAttribute("data-silent-focus");
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal(true);
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, open]);

  return (
    <div
      className="partner-modal"
      data-open={open || undefined}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal(false);
      }}
    >
      <div
        ref={panelRef}
        className="partner-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeRef}
          className="partner-modal__close"
          type="button"
          aria-label="Close partner access dialog"
          tabIndex={open ? undefined : -1}
          onClick={(event) =>
            closeModal(event.detail === 0 || keyboardTriggerRef.current)
          }
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </button>

        <div className="partner-modal__visual" aria-hidden="true">
          {open && (
            <div className="partner-modal__unicorn horse-stage-mask">
              <BentoHorse />
            </div>
          )}
        </div>

        <div className="partner-modal__content">
          <h2 id={titleId}>
            The app is open to <span className="partner-modal__accent">partners</span>.
          </h2>
          <p id={descriptionId}>
            EvalLens is currently available through a limited partner program.
            Book a call, tell us about your evaluation workflow, and we’ll set
            up personal access for your team.
          </p>

          <div className="partner-modal__actions">
            <Button
              href={BOOKING_URL}
              variant="gradient"
              arrow
              tabIndex={open ? undefined : -1}
            >
              Book a partner call
            </Button>
            <button
              type="button"
              className="partner-modal__not-now"
              tabIndex={open ? undefined : -1}
              onClick={(event) =>
                closeModal(event.detail === 0 || keyboardTriggerRef.current)
              }
            >
              Not now
            </button>
          </div>

          <p className="partner-modal__note">
            Personal onboarding · Direct access · No public sign-up yet
          </p>
        </div>
      </div>
    </div>
  );
}
