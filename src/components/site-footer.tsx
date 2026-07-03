import Link from "next/link";
import { AGENCY, NAV_LINKS } from "@/lib/constants";
import { LogoMark } from "@/components/logo-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/40 bg-navy text-paper/90">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 border-b border-paper/15 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[15px] uppercase tracking-[0.18em]">
              <LogoMark className="h-[18px] w-[18px] text-paper" />
              {AGENCY.name}
            </div>
            <p className="mt-4 max-w-xs font-display text-[17px] italic leading-relaxed text-paper/70">
              Каждый объект читаем как чертёж — с точными размерами, а не приблизительными обещаниями.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">Навигация</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-paper/80 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">Контакты</p>
            <ul className="mt-4 space-y-3 text-[14px] text-paper/80">
              <li>{AGENCY.phone}</li>
              <li>{AGENCY.email}</li>
              <li className="max-w-[220px] text-paper/60">{AGENCY.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">Режим работы</p>
            <p className="mt-4 text-[14px] text-paper/80">{AGENCY.hours}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">Соцсети</p>
            <ul className="mt-4 flex gap-4 text-[14px] text-paper/80">
              <li>Telegram</li>
              <li>VK</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {AGENCY.fullName}</span>
          <div className="flex items-center gap-6">
            <span>Лист 01 / Масштаб 1:1 / Ред. 2026</span>
            <Link href="/admin" className="text-paper/40 hover:text-paper">
              Админка
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
