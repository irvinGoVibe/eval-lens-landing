import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { adminListArticles } from "@/lib/cms/admin-queries";

async function ArticlesTable() {
  await connection(); // request-time only: never run service_role at build.
  const articles = await adminListArticles();
  return (
    <>
      <p className="admin-sub">{articles.length} записей</p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Рубрика</th>
            <th>Дата</th>
            <th>Статус</th>
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
    </>
  );
}

export default function ArticlesListPage() {
  return (
    <div>
      <div className="admin-toolbar">
        <h1 className="admin-h1">Статьи</h1>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/articles/new">
          + Новая статья
        </Link>
      </div>
      <Suspense fallback={<p className="admin-sub">Загрузка…</p>}>
        <ArticlesTable />
      </Suspense>
    </div>
  );
}
