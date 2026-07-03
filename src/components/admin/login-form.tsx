"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { status: "idle" };

export function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="from" value={from ?? ""} />

      <div>
        <label htmlFor="login-email" className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          Почта
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoFocus
          className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-blue"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          Пароль
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-blue"
        />
      </div>

      {state.status === "error" && (
        <p className="font-mono text-[12px] text-[#a4321c]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-ink bg-ink px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-blue hover:border-blue disabled:opacity-50"
      >
        {pending ? "Проверяем…" : "Войти"}
      </button>
    </form>
  );
}
