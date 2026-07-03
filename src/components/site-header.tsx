import Link from "next/link";
import { AGENCY, NAV_LINKS } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/format";
import { MobileNav } from "@/components/mobile-nav";
import { LogoMark } from "@/components/logo-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[15px] font-medium uppercase tracking-[0.18em] text-ink"
        >
          <LogoMark className="h-[18px] w-[18px] text-blue" />
          {AGENCY.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={formatPhoneHref(AGENCY.phone)}
            className="hidden font-mono text-[13px] tracking-wide text-ink sm:block"
          >
            {AGENCY.phone}
          </a>
          <Link
            href="/contacts"
            className="border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-blue hover:bg-blue hover:text-paper"
          >
            Заявка
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
