"use client";

import { useEffect } from "react";

/**
 * Dev affordance for the Section Lab stand: turns every `[data-marker]`
 * section into a clickable corner chip that names the catalog archetype and
 * copies that name to the clipboard on click.
 *
 * Imperative, ScrollFX-style: it injects one `<button class="lab-marker">` per
 * section instead of threading a chip through 20 different section bodies. The
 * `data-marker` attribute on each section is the single source of truth; this
 * component only enhances it on the client. Renders nothing itself.
 */
export function LabMarkers() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-lab section.band[data-marker]",
      ),
    );

    const cleanups: Array<() => void> = [];

    for (const section of sections) {
      const name = section.getAttribute("data-marker");
      if (!name) continue;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lab-marker";
      btn.tabIndex = -1; // keep the 20+ chips out of the section tab order
      btn.textContent = name;
      btn.title = `Click to copy: ${name}`;
      btn.setAttribute("aria-label", `Copy section type: ${name}`);

      let resetTimer: number | undefined;

      const onClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        copyText(name);
        btn.classList.add("is-copied");
        btn.textContent = "Copied ✓";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.textContent = name;
        }, 1200);
      };

      btn.addEventListener("click", onClick);
      section.appendChild(btn);

      cleanups.push(() => {
        window.clearTimeout(resetTimer);
        btn.removeEventListener("click", onClick);
        btn.remove();
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}

/** Clipboard write with a legacy fallback for non-secure contexts. */
function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    return;
  }
  legacyCopy(text);
}

function legacyCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } catch {
    /* best effort — dev-only affordance */
  }
  area.remove();
}
