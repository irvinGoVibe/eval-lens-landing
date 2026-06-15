// Admin shell. The session check + two-folder navigation read cookies (a
// request-time API), so they live in a Suspense-wrapped async subtree; the
// static shell around them still prerenders cleanly under `cacheComponents`.
// The proxy already gates access; the login page renders without the nav.

import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE } from "@/lib/cms/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import "./admin.css";

export const metadata: Metadata = {
  title: "EvalLense CMS",
  robots: { index: false, follow: false },
};

async function AdminChrome({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const hasSession = Boolean(store.get(SESSION_COOKIE)?.value);

  // The login page renders standalone (no session, no nav chrome).
  if (!hasSession) {
    return <div className="admin-root admin-root--bare">{children}</div>;
  }

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link href="/admin">EvalLense CMS</Link>
        </div>
        <AdminNav />
        <div className="admin-sidebar__foot">
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AdminChrome>{children}</AdminChrome>
    </Suspense>
  );
}
