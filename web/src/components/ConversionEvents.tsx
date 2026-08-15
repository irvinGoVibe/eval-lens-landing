"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Sitewide conversion-event tracking via one delegated click listener —
 * no per-CTA onClick handlers, no shared DS component changes. Fires
 * Vercel Analytics custom events for the three actions we optimize for:
 *
 *   calendly_click       — any Calendly CTA (demo / workflow call / setup)
 *   sample_report_click  — "See a sample report" hero CTAs (#sample-output)
 *   batch_form_open      — "Send your batch" links to /company/contact#batch
 *
 * The lead-form submit itself is tracked inside LeadForm (lead_submit).
 */
export function ConversionEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const path = window.location.pathname;
      if (href.includes("calendly.com")) {
        track("calendly_click", { path, label: a.textContent?.trim().slice(0, 60) ?? "" });
      } else if (href.includes("#sample-output")) {
        track("sample_report_click", { path });
      } else if (href.includes("/company/contact#batch")) {
        track("batch_form_open", { path });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
