import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Админка — КВАРТАЛ" };

export default async function AdminDashboard() {
  const [propertiesCount, agentsCount, testimonialsCount, leadsCount, recentLeads] =
    await Promise.all([
      prisma.property.count(),
      prisma.agent.count(),
      prisma.testimonial.count(),
      prisma.lead.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { property: true },
      }),
    ]);

  const stats = [
    { label: "Объектов", value: propertiesCount, href: "/admin/properties" },
    { label: "Агентов", value: agentsCount, href: "/admin/agents" },
    { label: "Отзывов", value: testimonialsCount, href: "/admin/testimonials" },
    { label: "Заявок", value: leadsCount, href: "/admin/leads" },
  ];

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Админка</p>
      <h1 className="mt-2 font-display text-[30px] text-ink">Управление сайтом</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="border border-line p-5 hover:border-blue">
            <p className="font-mono text-[26px] text-blue">{s.value}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] text-ink">Последние заявки</h2>
          <Link href="/admin/leads" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:text-blue">
            Все заявки →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="mt-4 text-[14px] text-ink-soft">Заявок пока нет.</p>
        ) : (
          <div className="mt-4 divide-y divide-line border border-line">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                <div>
                  <p className="text-[14px] text-ink">{lead.name} · {lead.phone}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                    {lead.source}
                    {lead.property ? ` · ${lead.property.title} (${formatPrice(lead.property.price, lead.property.dealType)})` : ""}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-ink-soft">
                  {lead.createdAt.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
