import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PropertyForm } from "@/components/admin/property-form";
import { createProperty } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Новый объект — Админка" };

export default async function NewPropertyPage() {
  const agents = await prisma.agent.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Объекты</p>
      <h1 className="mt-2 font-display text-[28px] text-ink">Новый объект</h1>

      <div className="mt-8 max-w-4xl border border-line p-6">
        <PropertyForm agents={agents} action={createProperty} />
      </div>
    </div>
  );
}
