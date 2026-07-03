import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteAgent } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Агенты — Админка" };

export default async function AdminAgentsPage() {
  const agents = await prisma.agent.findMany({
    include: { _count: { select: { properties: true } } },
    orderBy: { dealsCount: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Агенты</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">Команда ({agents.length})</h1>
        </div>
        <Link
          href="/admin/agents/new"
          className="border border-ink bg-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-paper hover:bg-blue hover:border-blue"
        >
          + Добавить агента
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[700px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line bg-paper-dim font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Роль</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Объектов</th>
              <th className="px-4 py-3">Сделок</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {agents.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 text-ink">
                  <Link href={`/admin/agents/${a.id}`} className="hover:text-blue">{a.name}</Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{a.role}</td>
                <td className="px-4 py-3 font-mono text-ink-soft">{a.phone}</td>
                <td className="px-4 py-3 text-ink-soft">{a._count.properties}</td>
                <td className="px-4 py-3 text-ink-soft">{a.dealsCount}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/agents/${a.id}`} className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-blue">
                      Изменить
                    </Link>
                    <ConfirmForm
                      action={deleteAgent.bind(null, a.id)}
                      confirmText={`Удалить агента «${a.name}»?`}
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
