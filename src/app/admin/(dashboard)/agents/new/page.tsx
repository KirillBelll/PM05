import type { Metadata } from "next";
import { AgentForm } from "@/components/admin/agent-form";
import { createAgent } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Новый агент — Админка" };

export default function NewAgentPage() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Агенты</p>
      <h1 className="mt-2 font-display text-[28px] text-ink">Новый агент</h1>

      <div className="mt-8 max-w-2xl border border-line p-6">
        <AgentForm action={createAgent} />
      </div>
    </div>
  );
}
