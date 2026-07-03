import type { Agent } from "@prisma/client";
import { SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";

export function AgentForm({
  agent,
  action,
}: {
  agent?: Agent;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Имя" defaultValue={agent?.name} required />
        <TextField name="role" label="Роль" defaultValue={agent?.role} required placeholder="Специалист по аренде" />
        <TextField name="slug" label="Slug" defaultValue={agent?.slug} required placeholder="ivanov" />
        <TextField name="dealsCount" label="Сделок закрыто" type="number" defaultValue={agent?.dealsCount} />
        <TextField name="phone" label="Телефон" defaultValue={agent?.phone} required placeholder="+7 (495) 000-00-00" />
        <TextField name="email" label="Почта" type="email" defaultValue={agent?.email} required />
      </div>
      <TextField name="photo" label="URL фотографии" defaultValue={agent?.photo} required placeholder="https://..." />
      <TextAreaField name="bio" label="О себе" defaultValue={agent?.bio} rows={4} />
      <SubmitButton>{agent ? "Сохранить изменения" : "Добавить агента"}</SubmitButton>
    </form>
  );
}
