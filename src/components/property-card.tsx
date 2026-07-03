import Image from "next/image";
import Link from "next/link";
import type { Property, PropertyImage } from "@prisma/client";
import {
  dealTypeLabel,
  formatArea,
  formatPrice,
  roomsLabel,
} from "@/lib/format";

type Props = {
  property: Property & { images: PropertyImage[] };
};

export function PropertyCard({ property }: Props) {
  const cover = property.images[0];

  return (
    <Link
      href={`/listings/${property.id}`}
      className="crop-corners group block border border-line bg-paper transition-colors hover:border-blue"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover grayscale-[15%] contrast-[1.02] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-blue/25 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div className="absolute left-0 top-0 flex items-center gap-2 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper">
          №{property.code}
        </div>
        <div className="absolute right-0 top-0 bg-blue px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper">
          {dealTypeLabel[property.dealType]}
        </div>
      </div>

      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          {property.district}, {property.city}
        </p>
        <h3 className="mt-2 font-display text-[19px] leading-snug text-ink text-balance">
          {property.title}
        </h3>
        <p className="mt-3 font-mono text-[15px] text-blue">
          {formatPrice(property.price, property.dealType)}
        </p>
      </div>

      <div className="flex divide-x divide-line border-t border-line font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <span className="flex-1 px-4 py-2.5">{formatArea(property.areaTotal)}</span>
        <span className="flex-1 px-4 py-2.5">{roomsLabel(property.rooms, property.type)}</span>
        <span className="flex-1 px-4 py-2.5">
          {property.floor ? `${property.floor}/${property.floorsTotal ?? "—"} эт.` : "—"}
        </span>
      </div>
    </Link>
  );
}
