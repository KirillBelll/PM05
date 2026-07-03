import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  dealTypeLabel,
  formatArea,
  formatPhoneHref,
  formatPrice,
  propertyTypeLabel,
  roomsLabel,
} from "@/lib/format";
import { LeadForm } from "@/components/lead-form";

async function getProperty(id: number) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      agent: true,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(Number(id));
  if (!property) return { title: "Объект не найден — КВАРТАЛ" };
  return {
    title: `${property.title} — КВАРТАЛ`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getProperty(Number(id));
  if (!property) notFound();

  const specs = [
    { label: "Площадь общая", value: formatArea(property.areaTotal) },
    ...(property.areaLiving ? [{ label: "Площадь жилая", value: formatArea(property.areaLiving) }] : []),
    ...(property.areaKitchen ? [{ label: "Площадь кухни", value: formatArea(property.areaKitchen) }] : []),
    { label: "Комнаты", value: roomsLabel(property.rooms, property.type) },
    ...(property.floor
      ? [{ label: "Этаж", value: `${property.floor} из ${property.floorsTotal ?? "—"}` }]
      : []),
    ...(property.yearBuilt ? [{ label: "Год постройки", value: String(property.yearBuilt) }] : []),
    { label: "Тип объекта", value: propertyTypeLabel[property.type] },
    { label: "Код объекта", value: property.code },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
      <nav className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
        <Link href="/listings" className="hover:text-blue">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{property.code}</span>
      </nav>

      {/* gallery */}
      <div className="mt-6 grid gap-2 sm:grid-cols-4">
        <div className="crop-corners relative aspect-[16/10] overflow-hidden border border-line sm:col-span-3">
          {property.images[0] && (
            <Image
              src={property.images[0].url}
              alt={property.images[0].alt}
              fill
              priority
              sizes="(min-width: 640px) 75vw, 100vw"
              quality={90}
              className="object-cover"
            />
          )}
          <div className="absolute left-0 top-0 bg-ink/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper">
            №{property.code}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:col-span-1 sm:grid-cols-1">
          {property.images.slice(1, 5).map((img) => (
            <div key={img.id} className="relative aspect-[16/10] overflow-hidden border border-line sm:aspect-auto sm:flex-1">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 320px, 25vw"
                quality={90}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue">
                {dealTypeLabel[property.dealType]} · {property.district}, {property.city}
              </p>
              <h1 className="mt-2 max-w-xl font-display text-[32px] leading-tight text-ink sm:text-[38px]">
                {property.title}
              </h1>
              <p className="mt-2 text-[14px] text-ink-soft">{property.address}</p>
            </div>
            <p className="font-mono text-[26px] text-blue">
              {formatPrice(property.price, property.dealType)}
            </p>
          </div>

          {/* specs title-block */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border border-line p-6 sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">{s.label}</dt>
                <dd className="mt-1 font-mono text-[15px] text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue">Описание</p>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink">{property.description}</p>
          </div>
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          <div className="border border-line p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Ваш агент</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-line">
                <Image src={property.agent.photo} alt={property.agent.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-[18px] text-ink">{property.agent.name}</p>
                <p className="text-[13px] text-ink-soft">{property.agent.role}</p>
              </div>
            </div>
            <a
              href={formatPhoneHref(property.agent.phone)}
              className="mt-4 block border border-ink px-4 py-2.5 text-center font-mono text-[13px] tracking-wide text-ink hover:border-blue hover:text-blue"
            >
              {property.agent.phone}
            </a>
          </div>

          <div className="border border-line p-6">
            <LeadForm
              source="listing"
              propertyId={property.id}
              title="Записаться на показ"
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
}
