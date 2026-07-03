import type { Metadata } from "next";
import { AGENCY } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/format";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Контакты — КВАРТАЛ",
  description: "Свяжитесь с агентством недвижимости «Квартал»: адрес, телефон, заявка на подбор.",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Контакты</p>
      <h1 className="mt-2 max-w-lg font-display text-[36px] text-ink sm:text-[42px]">
        Заходите в офис или оставьте заявку онлайн
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-10">
          <dl className="grid grid-cols-1 gap-6 border border-line p-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Телефон</dt>
              <dd className="mt-1">
                <a href={formatPhoneHref(AGENCY.phone)} className="font-mono text-[16px] text-ink hover:text-blue">
                  {AGENCY.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Почта</dt>
              <dd className="mt-1">
                <a href={`mailto:${AGENCY.email}`} className="font-mono text-[16px] text-ink hover:text-blue">
                  {AGENCY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Адрес</dt>
              <dd className="mt-1 text-[15px] text-ink">{AGENCY.address}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Режим работы</dt>
              <dd className="mt-1 text-[15px] text-ink">{AGENCY.hours}</dd>
            </div>
          </dl>

          {/* office diagram */}
          <div className="border border-line p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Как добраться</p>
            <svg viewBox="0 0 400 220" className="mt-4 w-full">
              <g stroke="var(--color-line)" strokeWidth="1">
                <line x1="0" y1="60" x2="400" y2="60" />
                <line x1="0" y1="160" x2="400" y2="160" />
                <line x1="90" y1="0" x2="90" y2="220" />
                <line x1="300" y1="0" x2="300" y2="220" />
              </g>
              <g transform="translate(195 90)">
                <path
                  d="M-16,0 C-16,-8.84 -8.84,-16 0,-16 C8.84,-16 16,-8.84 16,0 C16,20 0,54 0,54 C0,54 -16,20 -16,0 Z"
                  fill="none"
                  stroke="var(--color-blue)"
                  strokeWidth="1.6"
                />
                <circle cx="0" cy="0" r="5" fill="var(--color-blue)" />
              </g>
              <text x="205" y="150" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-ink-soft)">
                офис «Квартал»
              </text>
              <text x="14" y="52" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-ink-soft)">
                Тверская
              </text>
              <text x="310" y="52" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-ink-soft)">
                М. Пушкинская
              </text>
            </svg>
            <p className="mt-2 text-[13px] text-ink-soft">
              5 минут пешком от станции метро «Пушкинская», вход со стороны переулка.
            </p>
          </div>
        </div>

        <div className="border border-line p-8">
          <LeadForm source="contacts" title="Оставить заявку" />
        </div>
      </div>
    </div>
  );
}
