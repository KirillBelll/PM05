import type { Testimonial } from "@prisma/client";
import { SelectField, SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Имя" defaultValue={testimonial?.name} required />
        <TextField name="role" label="Контекст" defaultValue={testimonial?.role} required placeholder="купил квартиру в Хамовниках" />
      </div>
      <TextAreaField name="quote" label="Текст отзыва" defaultValue={testimonial?.quote} rows={4} />
      <SelectField
        name="rating"
        label="Оценка"
        defaultValue={String(testimonial?.rating ?? 5)}
        options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n}/5` }))}
      />
      <SubmitButton>{testimonial ? "Сохранить изменения" : "Добавить отзыв"}</SubmitButton>
    </form>
  );
}
