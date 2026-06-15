import { Suspense } from "react";
import { connection } from "next/server";
import {
  FeaturedPicker,
  type FeaturedOption,
} from "@/components/admin/FeaturedPicker";
import { adminListArticles } from "@/lib/cms/admin-queries";

async function FeaturedPickerLoader() {
  await connection();
  const articles = await adminListArticles();
  const options: FeaturedOption[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    status: a.status,
    selected: a.home_featured,
    position: a.home_position,
  }));
  return <FeaturedPicker options={options} />;
}

export default function HomeFeaturedPage() {
  return (
    <div>
      <h1 className="admin-h1">Главная → Блок «Блог»</h1>
      <p className="admin-sub">
        Выберите статьи и задайте порядок показа в блоке блога на главной.
        Только опубликованные статьи попадают в блок; при пустом выборе —
        свежие по дате.
      </p>
      <Suspense fallback={<p className="admin-sub">Загрузка…</p>}>
        <FeaturedPickerLoader />
      </Suspense>
    </div>
  );
}
