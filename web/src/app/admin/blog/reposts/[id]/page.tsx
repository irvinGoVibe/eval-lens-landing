import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { LoopForm } from "@/components/admin/LoopForm";
import { adminGetLoopPost } from "@/lib/cms/admin-queries";
import { deleteLoopAction, updateLoopAction } from "../actions";

async function EditRepost({ id }: { id: string }) {
  await connection();
  const post = await adminGetLoopPost(id);
  if (!post) notFound();

  const update = updateLoopAction.bind(null, id);
  const remove = deleteLoopAction.bind(null, id);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">Blog · Reposts</p>
          <h1 className="admin-h1">Edit repost</h1>
          <p className="admin-sub">{post.id}</p>
        </div>
      </div>
      <LoopForm action={update} post={post} deleteAction={remove} />
    </>
  );
}

export default async function EditRepostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<p className="admin-sub">Loading…</p>}>
        <EditRepost id={id} />
      </Suspense>
    </div>
  );
}
