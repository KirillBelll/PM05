import Link from "next/link";
import type { Metadata } from "next";
import { BlueprintHouse } from "@/components/blueprint-house";

export const metadata: Metadata = {
  title: "О нас — КВАРТАЛ",
  description: "Агентство недвижимости «Квартал»: история, принципы работы, команда.",
};

const PRINCIPLES = [
  {
    tag: "Точность",
    text: "Мы измеряем, а не оцениваем на глаз. В карточке объекта — реальные цифры БТИ, а не округления в свою пользу.",
  },
  {
    tag: "Прозрачность",
    text: "Юридическая проверка объекта проходит до того, как вы внесли аванс, а не после.",
  },
  {
    tag: "Сопровождение",
    text: "Один агент ведёт сделку от заявки до передачи ключей — мы не перекладываем клиента между отделами.",
  },
  {
    tag: "Локальность",
    text: "Работаем только в Москве и Санкт-Петербурге. Знаем район, а не всю страну поверхностно.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">О нас</p>
            <h1 className="mt-3 max-w-lg font-display text-[36px] leading-tight text-ink text-balance sm:text-[44px]">
              Мы измеряем то, что другие оценивают на глаз
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft">
              Агентство «Квартал» работает в Москве и Санкт-Петербурге с 2014 года.
              Мы выросли из небольшого бюро технического аудита квартир перед покупкой —
              и до сих пор проверяем каждый объект так, будто от этого зависит наша
              репутация, а не только ваш выбор.
            </p>
          </div>
          <BlueprintHouse className="mx-auto w-full max-w-[420px]" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Принципы</p>
        <h2 className="mt-2 max-w-md font-display text-[32px] text-ink sm:text-[38px]">
          На чём держится каждая сделка
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.tag} className="border-t-2 border-blue pt-5">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-blue">{p.tag}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-navy text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-16 sm:px-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">Команда</p>
            <h2 className="mt-2 max-w-md font-display text-[28px] leading-tight">
              Познакомьтесь с агентами, которые ведут сделки
            </h2>
          </div>
          <Link
            href="/agents"
            className="shrink-0 border border-paper/40 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper hover:border-paper hover:bg-paper hover:text-navy"
          >
            Смотреть агентов
          </Link>
        </div>
      </section>
    </div>
  );
}
