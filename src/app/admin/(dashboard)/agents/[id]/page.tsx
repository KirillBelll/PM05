import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AgentForm } from "@/components/admin/agent-form";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deleteAgent, updateAgent } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Редактирование агента — Админка" };

export default async function EditAgentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id: idParam } = await params;
  const { saved, error } = await searchParams;
  const id = Number(idParam);

  const agent = await prisma.agent.findUnique({
    where: { id },
    include: { _count: { select: { properties: true } } },
  });
  if (!agent) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Агент</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">{agent.name}</h1>
        </div>
        <ConfirmForm
          action={deleteAgent.bind(null, agent.id)}
          confirmText={`Удалить агента «${agent.name}»?`}
        >
          <button
            type="submit"
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:border-[#a4321c] hover:text-[#a4321c]"
          >
            Удалить агента
          </button>
        </ConfirmForm>
      </div>

      {saved && (
        <p className="mt-4 border border-blue bg-blue/5 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-blue">
          Изменения сохранены
        </p>
      )}
      {error === "has-properties" && (
        <p className="mt-4 border border-[#a4321c] bg-[#a4321c]/5 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-[#a4321c]">
          Нельзя удалить: за агентом закреплено {agent._count.properties} объект(ов). Сначала переназначьте их другому агенту.
        </p>
      )}

      <div className="mt-8 max-w-2xl border border-line p-6">
        <AgentForm agent={agent} action={updateAgent.bind(null, agent.id)} />
      </div>
    </div>
  );
}
