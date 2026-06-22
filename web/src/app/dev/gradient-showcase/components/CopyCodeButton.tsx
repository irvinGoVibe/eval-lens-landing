"use client";

import { useClipboard } from "../hooks";

/** Copies the exact CSS of the preset on screen (selector `.gradient-showcase`). */
export function CopyCodeButton({ code }: { code: string }) {
  const { copied, copy } = useClipboard();
  return (
    <button
      type="button"
      className="gsc-btn gsc-btn-primary"
      onClick={() => void copy(code)}
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy CSS"}
    </button>
  );
}
