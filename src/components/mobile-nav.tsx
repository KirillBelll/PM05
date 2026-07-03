"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, AGENCY } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/format";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-ink"
      >
        <span
          className={`block h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-line bg-paper px-5 py-6">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.12em] text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={formatPhoneHref(AGENCY.phone)}
              className="pt-2 font-mono text-sm tracking-wide text-ink-soft"
            >
              {AGENCY.phone}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
