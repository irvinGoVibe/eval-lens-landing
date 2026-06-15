import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticleAction } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="admin-h1">Новая статья</h1>
      <p className="admin-sub">Создание записи в articles.</p>
      <ArticleForm action={createArticleAction} />
    </div>
  );
}
