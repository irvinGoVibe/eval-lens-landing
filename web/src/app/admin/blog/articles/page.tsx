import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { adminListArticles } from "@/lib/cms/admin-queries";

async function ArticlesTable() {
  await connection(); // request-time only: never run service_role at build.
  const articles = await adminListArticles();
  if (articles.length === 0) {
    return (
      <div className="admin-empty">
        <p className="admin-empty__title">No articles yet</p>
        <p>Create your first article to get started.</p>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/articles/new">
          + New article
        </Link>
      </div>
    );
  }
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((a) => (
          <tr key={a.id}>
            <td>
              <Link href={`/admin/blog/articles/${a.slug}`}>{a.title}</Link>
            </td>
            <td>{a.category}</td>
            <td>{a.date}</td>
            <td>
              <span className={`admin-badge admin-badge--${a.status}`}>
                {a.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ArticlesListPage() {
  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">Blog</p>
          <h1 className="admin-h1">Articles</h1>
        </div>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/articles/new">
          + New article
        </Link>
      </div>
      <Suspense fallback={<p className="admin-sub">Loading…</p>}>
        <ArticlesTable />
      </Suspense>
    </div>
  );
}
