import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { adminListLoopPosts } from "@/lib/cms/admin-queries";

async function RepostsTable() {
  await connection();
  const posts = await adminListLoopPosts();
  if (posts.length === 0) {
    return (
      <div className="admin-empty">
        <p className="admin-empty__title">No reposts yet</p>
        <p>Create your first repost to get started.</p>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/reposts/new">
          + New repost
        </Link>
      </div>
    );
  }
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kind</th>
          <th>Author</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((p) => (
          <tr key={p.id}>
            <td>
              <Link href={`/admin/blog/reposts/${p.id}`}>{p.id}</Link>
            </td>
            <td>{p.kind}</td>
            <td>{p.author}</td>
            <td>{p.date}</td>
            <td>
              <span className={`admin-badge admin-badge--${p.status}`}>
                {p.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function RepostsListPage() {
  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">Blog</p>
          <h1 className="admin-h1">Reposts</h1>
        </div>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/reposts/new">
          + New repost
        </Link>
      </div>
      <Suspense fallback={<p className="admin-sub">Loading…</p>}>
        <RepostsTable />
      </Suspense>
    </div>
  );
}
