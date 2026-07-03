import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteTestimonial } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Отзывы — Админка" };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Отзывы</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">Отзывы клиентов ({testimonials.length})</h1>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="border border-ink bg-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-paper hover:bg-blue hover:border-blue"
        >
          + Добавить отзыв
        </Link>
      </div>

      <div className="mt-8 divide-y divide-line border border-line">
        {testimonials.map((t) => (
          <div key={t.id} className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                {t.name} — {t.role} · {t.rating}/5
              </p>
              <p className="mt-1.5 text-[14px] text-ink">«{t.quote}»</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={`/admin/testimonials/${t.id}`} className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-blue">
                Изменить
              </Link>
              <ConfirmForm action={deleteTestimonial.bind(null, t.id)} confirmText="Удалить этот отзыв?">
                <button type="submit" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-[#a4321c]">
                  Удалить
                </button>
              </ConfirmForm>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="px-5 py-6 text-[14px] text-ink-soft">Отзывов пока нет.</p>
        )}
      </div>
    </div>
  );
}
