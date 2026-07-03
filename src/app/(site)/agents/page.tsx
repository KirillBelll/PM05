import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPhoneHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Агенты — КВАРТАЛ",
  description: "Команда агентства недвижимости «Квартал».",
};

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({
    include: { _count: { select: { properties: true } } },
    orderBy: { dealsCount: "desc" },
  });

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Команда</p>
      <h1 className="mt-2 max-w-xl font-display text-[36px] text-ink sm:text-[42px]">
        Люди, которые ведут ваш объект от заявки до ключей
      </h1>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.id} className="crop-corners flex gap-5 border border-line p-6">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-line">
              <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-blue">{agent.role}</p>
              <h2 className="mt-1 font-display text-[22px] text-ink">{agent.name}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{agent.bio}</p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                <div>
                  <dt className="inline">Сделок: </dt>
                  <dd className="inline text-ink">{agent.dealsCount}</dd>
                </div>
                <div>
                  <dt className="inline">В работе: </dt>
                  <dd className="inline text-ink">{agent._count.properties}</dd>
                </div>
              </dl>
              <a
                href={formatPhoneHref(agent.phone)}
                className="mt-3 inline-block font-mono text-[13px] text-ink hover:text-blue"
              >
                {agent.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
