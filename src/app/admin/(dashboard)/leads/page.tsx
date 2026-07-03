import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPhoneHref } from "@/lib/format";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteLead } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Заявки — Админка" };

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    include: { property: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Заявки</p>
      <h1 className="mt-2 font-display text-[28px] text-ink">Заявки с сайта ({leads.length})</h1>

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[820px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line bg-paper-dim font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Источник</th>
              <th className="px-4 py-3">Объект</th>
              <th className="px-4 py-3">Сообщение</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-ink-soft">
                  {lead.createdAt.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-4 py-3 text-ink">{lead.name}</td>
                <td className="px-4 py-3 font-mono text-ink-soft">
                  <a href={formatPhoneHref(lead.phone)} className="hover:text-blue">{lead.phone}</a>
                </td>
                <td className="px-4 py-3 text-ink-soft">{lead.source}</td>
                <td className="px-4 py-3 text-ink-soft">
                  {lead.property ? (
                    <Link href={`/admin/properties/${lead.property.id}`} className="hover:text-blue">
                      {lead.property.code}
                    </Link>
                  ) : "—"}
                </td>
                <td className="px-4 py-3 max-w-[240px] truncate text-ink-soft">{lead.message ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <ConfirmForm action={deleteLead.bind(null, lead.id)} confirmText="Удалить эту заявку?">
                    <button type="submit" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-[#a4321c]">
                      Удалить
                    </button>
                  </ConfirmForm>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-soft">Заявок пока нет.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
