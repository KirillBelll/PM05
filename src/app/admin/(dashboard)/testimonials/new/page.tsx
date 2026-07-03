import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Новый отзыв — Админка" };

export default function NewTestimonialPage() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Отзывы</p>
      <h1 className="mt-2 font-display text-[28px] text-ink">Новый отзыв</h1>

      <div className="mt-8 max-w-2xl border border-line p-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
