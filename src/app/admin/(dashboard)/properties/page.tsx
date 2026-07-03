import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { dealTypeLabel, formatPrice, propertyTypeLabel } from "@/lib/format";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteProperty } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Объекты — Админка" };

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    include: { agent: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Объекты</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">Все объекты ({properties.length})</h1>
        </div>
        <Link
          href="/admin/properties/new"
          className="border border-ink bg-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-paper hover:bg-blue hover:border-blue"
        >
          + Добавить объект
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[860px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line bg-paper-dim font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              <th className="px-4 py-3">Код</th>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Город</th>
              <th className="px-4 py-3">Сделка</th>
              <th className="px-4 py-3">Тип</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Агент</th>
              <th className="px-4 py-3">Витрина</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {properties.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-mono text-ink-soft">{p.code}</td>
                <td className="px-4 py-3 text-ink">
                  <Link href={`/admin/properties/${p.id}`} className="hover:text-blue">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{p.city}</td>
                <td className="px-4 py-3 text-ink-soft">{dealTypeLabel[p.dealType]}</td>
                <td className="px-4 py-3 text-ink-soft">{propertyTypeLabel[p.type]}</td>
                <td className="px-4 py-3 font-mono text-ink">{formatPrice(p.price, p.dealType)}</td>
                <td className="px-4 py-3 text-ink-soft">{p.agent.name}</td>
                <td className="px-4 py-3">{p.featured ? "Да" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/properties/${p.id}`} className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-blue">
                      Изменить
                    </Link>
                    <ConfirmForm
                      action={deleteProperty.bind(null, p.id)}
                      confirmText={`Удалить объект «${p.title}»? Это действие необратимо.`}
                    >
                      <button type="submit" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-[#a4321c]">
                        Удалить
                      </button>
                    </ConfirmForm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
