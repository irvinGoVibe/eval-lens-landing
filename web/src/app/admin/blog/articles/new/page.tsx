import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticleAction } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <p className="admin-eyebrow">Blog · Articles</p>
      <h1 className="admin-h1">New article</h1>
      <p className="admin-sub">Create a record in articles.</p>
      <ArticleForm action={createArticleAction} />
    </div>
  );
}
