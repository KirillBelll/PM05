import Link from "next/link";
import type { Metadata } from "next";
import { DealType, PropertyType, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";

export const metadata: Metadata = {
  title: "Каталог объектов — КВАРТАЛ",
  description: "Квартиры, дома и коммерческие помещения в продаже и аренде.",
};

const CITIES = ["Москва", "Санкт-Петербург"];
const DEAL_TYPES = [
  { value: "", label: "Любая сделка" },
  { value: "SALE", label: "Продажа" },
  { value: "RENT", label: "Аренда" },
];
const PROPERTY_TYPES = [
  { value: "", label: "Любой тип" },
  { value: "APARTMENT", label: "Квартира" },
  { value: "STUDIO", label: "Студия" },
  { value: "HOUSE", label: "Дом" },
  { value: "COMMERCIAL", label: "Коммерция" },
];
const ROOMS = [1, 2, 3, 4];

type SearchParams = {
  city?: string;
  dealType?: string;
  type?: string;
  rooms?: string;
  priceMax?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const where: Prisma.PropertyWhereInput = {};
  if (sp.city) where.city = sp.city;
  if (sp.dealType && sp.dealType in DealType) where.dealType = sp.dealType as DealType;
  if (sp.type && sp.type in PropertyType) where.type = sp.type as PropertyType;
  if (sp.rooms) where.rooms = Number(sp.rooms) >= 4 ? { gte: 4 } : Number(sp.rooms);
  if (sp.priceMax) where.price = { lte: Number(sp.priceMax) };

  const properties = await prisma.property.findMany({
    where,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">Каталог</p>
      <h1 className="mt-2 font-display text-[36px] text-ink sm:text-[42px]">Все объекты</h1>

      <form className="mt-10 grid grid-cols-2 divide-x divide-y divide-line border border-line sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
        <FilterSelect name="city" label="Город" value={sp.city} options={[{ value: "", label: "Все города" }, ...CITIES.map((c) => ({ value: c, label: c }))]} />
        <FilterSelect name="dealType" label="Сделка" value={sp.dealType} options={DEAL_TYPES} />
        <FilterSelect name="type" label="Тип" value={sp.type} options={PROPERTY_TYPES} />
        <FilterSelect
          name="rooms"
          label="Комнаты"
          value={sp.rooms}
          options={[{ value: "", label: "Любое" }, ...ROOMS.map((r) => ({ value: String(r), label: r === 4 ? "4+" : String(r) }))]}
        />
        <FilterSelect
          name="priceMax"
          label="Цена, до"
          value={sp.priceMax}
          options={[
            { value: "", label: "Любая" },
            { value: "10000000", label: "10 млн ₽" },
            { value: "30000000", label: "30 млн ₽" },
            { value: "60000000", label: "60 млн ₽" },
            { value: "100000", label: "100 000 ₽/мес" },
          ]}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-ink px-4 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-blue"
        >
          Применить
        </button>
      </form>

      <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft">
        Найдено объектов: {properties.length}
      </p>

      {properties.length === 0 ? (
        <div className="mt-10 border border-line p-10 text-center">
          <p className="font-display text-[20px] text-ink">По этим условиям ничего нет.</p>
          <p className="mt-2 text-[14px] text-ink-soft">Смените параметры или посмотрите весь каталог.</p>
          <Link
            href="/listings"
            className="mt-5 inline-block border border-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-ink hover:border-blue hover:text-blue"
          >
            Сбросить фильтры
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block px-4 py-3">
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="mt-1 w-full bg-transparent font-mono text-[13px] text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
