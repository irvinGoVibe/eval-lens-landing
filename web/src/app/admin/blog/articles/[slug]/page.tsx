import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { adminGetArticle } from "@/lib/cms/admin-queries";
import { deleteArticleAction, updateArticleAction } from "../actions";

async function EditArticle({ slug }: { slug: string }) {
  await connection();
  const article = await adminGetArticle(slug);
  if (!article) notFound();

  const update = updateArticleAction.bind(null, slug);
  const remove = deleteArticleAction.bind(null, slug);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">Blog · Articles</p>
          <h1 className="admin-h1">Edit article</h1>
          <p className="admin-sub">{article.title}</p>
        </div>
        <DeleteButton action={remove} />
      </div>
      <ArticleForm action={update} article={article} />
    </>
  );
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Suspense fallback={<p className="admin-sub">Loading…</p>}>
        <EditArticle slug={slug} />
      </Suspense>
    </div>
  );
}
