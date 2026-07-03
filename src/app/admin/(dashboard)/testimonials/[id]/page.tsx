import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteTestimonial, updateTestimonial } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Редактирование отзыва — Админка" };

export default async function EditTestimonialPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id: idParam } = await params;
  const { saved } = await searchParams;
  const id = Number(idParam);

  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Отзыв</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">{testimonial.name}</h1>
        </div>
        <ConfirmForm action={deleteTestimonial.bind(null, testimonial.id)} confirmText="Удалить этот отзыв?">
          <button
            type="submit"
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:border-[#a4321c] hover:text-[#a4321c]"
          >
            Удалить отзыв
          </button>
        </ConfirmForm>
      </div>

      {saved && (
        <p className="mt-4 border border-blue bg-blue/5 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-blue">
          Изменения сохранены
        </p>
      )}

      <div className="mt-8 max-w-2xl border border-line p-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, testimonial.id)} />
      </div>
    </div>
  );
}
