"use client";

import { useTransition } from "react";

/**
 * Confirm-then-submit delete. The bound server action is passed in from the
 * server page (it already re-checks the session).
 */
export function DeleteButton({
  action,
  label = "Delete",
}: {
  action: () => void | Promise<void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this record? This cannot be undone.")) return;
        startTransition(() => {
          void action();
        });
      }}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
