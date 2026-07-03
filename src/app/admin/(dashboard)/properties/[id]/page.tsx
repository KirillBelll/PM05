import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyForm } from "@/components/admin/property-form";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { TextField, SubmitButton } from "@/components/admin/fields";
import {
  addPropertyImage,
  deleteProperty,
  deletePropertyImage,
  updateProperty,
} from "@/app/admin/actions";

export const metadata: Metadata = { title: "Редактирование объекта — Админка" };

export default async function EditPropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id: idParam } = await params;
  const { saved } = await searchParams;
  const id = Number(idParam);

  const [property, agents] = await Promise.all([
    prisma.property.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!property) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue">
            Объект №{property.code}
          </p>
          <h1 className="mt-2 font-display text-[28px] text-ink">{property.title}</h1>
        </div>
        <ConfirmForm
          action={deleteProperty.bind(null, property.id)}
          confirmText={`Удалить объект «${property.title}»? Это действие необратимо.`}
        >
          <button
            type="submit"
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:border-[#a4321c] hover:text-[#a4321c]"
          >
            Удалить объект
          </button>
        </ConfirmForm>
      </div>

      {saved && (
        <p className="mt-4 border border-blue bg-blue/5 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-blue">
          Изменения сохранены
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="border border-line p-6">
          <PropertyForm property={property} agents={agents} action={updateProperty.bind(null, property.id)} />
        </div>

        <div className="space-y-6">
          <div className="border border-line p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Фотографии</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {property.images.map((img) => (
                <div key={img.id} className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden border border-line">
                    <Image src={img.url} alt={img.alt} fill sizes="200px" className="object-cover" />
                  </div>
                  <ConfirmForm
                    action={deletePropertyImage.bind(null, img.id, property.id)}
                    confirmText="Удалить это фото?"
                    className="mt-1.5"
                  >
                    <button
                      type="submit"
                      className="w-full border border-line py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft hover:border-[#a4321c] hover:text-[#a4321c]"
                    >
                      Удалить
                    </button>
                  </ConfirmForm>
                </div>
              ))}
              {property.images.length === 0 && (
                <p className="col-span-2 text-[13px] text-ink-soft">Фотографий пока нет.</p>
              )}
            </div>

            <form action={addPropertyImage.bind(null, property.id)} className="mt-6 space-y-3 border-t border-line pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">Добавить фото по ссылке</p>
              <TextField name="url" label="URL изображения" placeholder="https://..." required />
              <TextField name="alt" label="Подпись (alt)" placeholder={property.title} />
              <SubmitButton>Добавить фото</SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
