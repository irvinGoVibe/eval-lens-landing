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
      <p className="admin-eyebrow">Home</p>
      <h1 className="admin-h1">Blog block</h1>
      <p className="admin-sub">
        Pick the articles and their order in the home blog block. Only published
        articles appear in the block; when the selection is empty it falls back
        to the latest by date.
      </p>
      <Suspense fallback={<p className="admin-sub">Loading…</p>}>
        <FeaturedPickerLoader />
      </Suspense>
    </div>
  );
}
