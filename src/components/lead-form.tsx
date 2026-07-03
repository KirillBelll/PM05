"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions";

const initialState: LeadState = { status: "idle" };

type Props = {
  source?: string;
  propertyId?: number;
  title?: string;
  compact?: boolean;
};

export function LeadForm({ source = "contact", propertyId, title, compact }: Props) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-blue bg-blue/5 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Заявка принята</p>
        <p className="mt-2 font-display text-[18px] text-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {title && <h3 className="font-display text-[22px] text-ink">{title}</h3>}
      <input type="hidden" name="source" value={source} />
      {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}

      <div>
        <label htmlFor={`${source}-name`} className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          Имя
        </label>
        <input
          id={`${source}-name`}
          name="name"
          required
          className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-blue"
          placeholder="Как к вам обращаться"
        />
      </div>

      <div>
        <label htmlFor={`${source}-phone`} className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          Телефон
        </label>
        <input
          id={`${source}-phone`}
          name="phone"
          required
          type="tel"
          className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-blue"
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor={`${source}-message`} className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
            Сообщение (необязательно)
          </label>
          <textarea
            id={`${source}-message`}
            name="message"
            rows={3}
            className="mt-1.5 w-full resize-none border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-blue"
            placeholder="Что вас интересует"
          />
        </div>
      )}

      {state.status === "error" && (
        <p className="font-mono text-[12px] text-[#a4321c]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-ink bg-ink px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-blue hover:border-blue disabled:opacity-50"
      >
        {pending ? "Отправляем…" : "Оставить заявку"}
      </button>
    </form>
  );
}
