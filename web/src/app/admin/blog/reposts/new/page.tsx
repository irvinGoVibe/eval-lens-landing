import { LoopForm } from "@/components/admin/LoopForm";
import { createLoopAction } from "../actions";

export default function NewRepostPage() {
  return (
    <div>
      <p className="admin-eyebrow">Blog · Reposts</p>
      <h1 className="admin-h1">New repost</h1>
      <p className="admin-sub">Create a record in loop_posts.</p>
      <LoopForm action={createLoopAction} />
    </div>
  );
}
