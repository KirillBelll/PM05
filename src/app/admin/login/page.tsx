import type { Metadata } from "next";
import { LogoMark } from "@/components/logo-mark";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Вход в админку — КВАРТАЛ" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="blueprint-grid flex min-h-full flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm border border-line bg-paper p-8">
        <div className="flex items-center gap-2.5 font-mono text-[15px] uppercase tracking-[0.18em] text-ink">
          <LogoMark className="h-[18px] w-[18px] text-blue" />
          Квартал
        </div>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Админка</p>
        <h1 className="mt-4 font-display text-[24px] text-ink">Вход для сотрудников</h1>

        <div className="mt-6">
          <LoginForm from={from} />
        </div>
      </div>
    </div>
  );
}
