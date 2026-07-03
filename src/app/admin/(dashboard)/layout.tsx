import Link from "next/link";
import { cookies } from "next/headers";
import { LogoMark } from "@/components/logo-mark";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/properties", label: "Объекты" },
  { href: "/admin/agents", label: "Агенты" },
  { href: "/admin/testimonials", label: "Отзывы" },
  { href: "/admin/leads", label: "Заявки" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const uid = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  const user = uid ? await prisma.user.findUnique({ where: { id: uid } }) : null;

  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-line bg-navy text-paper lg:w-[220px] lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2.5 border-b border-paper/15 px-6 py-5 font-mono text-[13px] uppercase tracking-[0.16em]">
          <LogoMark className="h-[16px] w-[16px]" />
          Админка
        </div>
        <nav className="flex flex-1 flex-row flex-wrap gap-1 p-3 lg:flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-paper/70 hover:bg-paper/10 hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-paper/15 px-6 py-4">
          {user && (
            <p className="truncate font-mono text-[11px] text-paper/50">{user.email}</p>
          )}
          <Link
            href="/"
            className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-paper/50 hover:text-paper"
          >
            ← На сайт
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/50 hover:text-paper"
            >
              Выйти →
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1 bg-paper px-5 py-8 sm:px-8 lg:py-10">{children}</div>
    </div>
  );
}
