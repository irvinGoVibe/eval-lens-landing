import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { adminListLoopPosts } from "@/lib/cms/admin-queries";

async function RepostsTable() {
  await connection();
  const posts = await adminListLoopPosts();
  return (
    <>
      <p className="admin-sub">{posts.length} записей</p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Тип</th>
            <th>Автор</th>
            <th>Дата</th>
            <th>Статус</th>
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
    </>
  );
}

export default function RepostsListPage() {
  return (
    <div>
      <div className="admin-toolbar">
        <h1 className="admin-h1">Репосты</h1>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/reposts/new">
          + Новый репост
        </Link>
      </div>
      <Suspense fallback={<p className="admin-sub">Загрузка…</p>}>
        <RepostsTable />
      </Suspense>
    </div>
  );
}
