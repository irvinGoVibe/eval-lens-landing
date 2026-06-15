import Link from "next/link";

export default function AdminHome() {
  return (
    <div>
      <h1 className="admin-h1">CMS</h1>
      <p className="admin-sub">
        Управление контентом блога и блоком блога на главной.
      </p>
      <div className="admin-featured">
        <Link className="admin-featured__item" href="/admin/blog/articles">
          <span className="admin-featured__title">Блог → Статьи</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link className="admin-featured__item" href="/admin/blog/reposts">
          <span className="admin-featured__title">Блог → Репосты</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link className="admin-featured__item" href="/admin/home/featured">
          <span className="admin-featured__title">Главная → Блок «Блог»</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
