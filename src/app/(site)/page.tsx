import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import { BlueprintHouse } from "@/components/blueprint-house";
import { LeadForm } from "@/components/lead-form";

const STATS = [
  { value: "340+", label: "Объектов в базе" },
  { value: "1200+", label: "Сделок закрыто" },
  { value: "18 дней", label: "Средний срок сделки" },
  { value: "Москва / СПб", label: "География" },
];

const STEPS = [
  {
    n: "01",
    title: "Заявка",
    text: "Рассказываете, что ищете, или какой объект хотите продать. Фиксируем параметры и бюджет.",
  },
  {
    n: "02",
    title: "Подбор",
    text: "За 48 часов присылаем 5–8 подходящих вариантов с чертежом и полной историей объекта.",
  },
  {
    n: "03",
    title: "Показ",
    text: "Сопровождаем на каждом просмотре, проверяем документы, коммуникации и состояние на месте.",
  },
  {
    n: "04",
    title: "Сделка",
    text: "Оформляем договор, сопровождаем расчёт и передачу ключей. Юрист на связи до последней подписи.",
  },
];

export default async function Home() {
  const [featured, testimonials] = await Promise.all([
    prisma.property.findMany({
      where: { featured: true },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "asc" }, take: 3 }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="blueprint-grid relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-blue">
              Объект № 001 / Москва · Санкт-Петербург
            </p>
            <h1 className="mt-5 max-w-xl font-display text-[40px] leading-[1.12] text-ink text-balance sm:text-[52px] lg:text-[58px]">
              Дом читается как чертёж — с&nbsp;точными размерами, а&nbsp;не догадками.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
              Мы подбираем и проверяем каждую квартиру, дом и офис так, будто сами
              собираемся в них жить или вести дело. Ни одного пункта на глаз.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/listings"
                className="border border-ink bg-ink px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-blue hover:border-blue"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/contacts"
                className="border border-ink px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Оставить заявку
              </Link>
            </div>
          </div>

          <BlueprintHouse className="mx-auto w-full max-w-[520px]" />
        </div>

        {/* stats title-block */}
        <div className="border-t border-line bg-paper-dim">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 py-6 sm:px-8">
                <p className="font-mono text-[22px] text-blue">{s.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Подборка</p>
            <h2 className="mt-2 font-display text-[32px] text-ink sm:text-[38px]">Избранные объекты</h2>
          </div>
          <Link
            href="/listings"
            className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft hover:text-blue"
          >
            Весь каталог →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Порядок работы</p>
          <h2 className="mt-2 max-w-lg font-display text-[32px] text-ink sm:text-[38px]">
            Как мы работаем
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="border-t-2 border-blue pt-5">
                <span className="font-mono text-[13px] text-blue">{step.n}</span>
                <h3 className="mt-3 font-display text-[20px] text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Отзывы</p>
          <h2 className="mt-2 font-display text-[32px] text-ink sm:text-[38px]">Что говорят клиенты</h2>

          <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:divide-x md:divide-line">
            {testimonials.map((t) => (
              <figure key={t.id} className="md:pl-10 md:first:pl-0">
                <blockquote className="font-display text-[19px] italic leading-relaxed text-ink text-balance">
                  «{t.quote}»
                </blockquote>
                <figcaption className="mt-4 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line bg-navy text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
              Заявка на подбор
            </p>
            <h2 className="mt-3 max-w-md font-display text-[32px] leading-tight text-balance sm:text-[38px]">
              Найдём объект, который впишется в ваш чертёж жизни.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/70">
              Оставьте телефон — перезвоним в течение часа и пришлём первые варианты
              на следующий день.
            </p>
          </div>
          <div className="border border-paper/20 bg-navy-deep p-7">
            <LeadForm source="home-cta" compact />
          </div>
        </div>
      </section>
    </>
  );
}
