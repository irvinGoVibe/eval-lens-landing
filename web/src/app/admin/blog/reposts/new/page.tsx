import { LoopForm } from "@/components/admin/LoopForm";
import { createLoopAction } from "../actions";

export default function NewRepostPage() {
  return (
    <div>
      <h1 className="admin-h1">Новый репост</h1>
      <p className="admin-sub">Создание записи в loop_posts.</p>
      <LoopForm action={createLoopAction} />
    </div>
  );
}
