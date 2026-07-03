import type { Agent, Property } from "@prisma/client";
import { SelectField, SubmitButton, TextAreaField, TextField, CheckboxField } from "@/components/admin/fields";

const DEAL_TYPES = [
  { value: "SALE", label: "Продажа" },
  { value: "RENT", label: "Аренда" },
];

const PROPERTY_TYPES = [
  { value: "APARTMENT", label: "Квартира" },
  { value: "STUDIO", label: "Студия" },
  { value: "HOUSE", label: "Дом" },
  { value: "COMMERCIAL", label: "Коммерция" },
];

const STATUSES = [
  { value: "ACTIVE", label: "Активен" },
  { value: "RESERVED", label: "Забронирован" },
  { value: "SOLD", label: "Продан / сдан" },
];

export function PropertyForm({
  property,
  agents,
  action,
}: {
  property?: Property;
  agents: Agent[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <TextField name="code" label="Код объекта" defaultValue={property?.code} required placeholder="KV-099" />
        <div className="sm:col-span-2">
          <TextField name="title" label="Название" defaultValue={property?.title} required />
        </div>

        <SelectField name="dealType" label="Сделка" defaultValue={property?.dealType ?? "SALE"} options={DEAL_TYPES} />
        <SelectField name="type" label="Тип объекта" defaultValue={property?.type ?? "APARTMENT"} options={PROPERTY_TYPES} />
        <SelectField name="status" label="Статус" defaultValue={property?.status ?? "ACTIVE"} options={STATUSES} />

        <TextField name="city" label="Город" defaultValue={property?.city} required />
        <TextField name="district" label="Район" defaultValue={property?.district} required />
        <TextField name="address" label="Адрес" defaultValue={property?.address} required />

        <TextField name="price" label="Цена, ₽" type="number" defaultValue={property?.price} required />
        <TextField name="areaTotal" label="Площадь общая, м²" type="number" step="0.1" defaultValue={property?.areaTotal} required />
        <TextField name="areaLiving" label="Площадь жилая, м²" type="number" step="0.1" defaultValue={property?.areaLiving} />
        <TextField name="areaKitchen" label="Площадь кухни, м²" type="number" step="0.1" defaultValue={property?.areaKitchen} />
        <TextField name="rooms" label="Комнаты" type="number" defaultValue={property?.rooms} required />

        <TextField name="floor" label="Этаж" type="number" defaultValue={property?.floor} />
        <TextField name="floorsTotal" label="Этажей в доме" type="number" defaultValue={property?.floorsTotal} />
        <TextField name="yearBuilt" label="Год постройки" type="number" defaultValue={property?.yearBuilt} />

        <SelectField
          name="agentId"
          label="Агент"
          defaultValue={String(property?.agentId ?? agents[0]?.id ?? "")}
          options={agents.map((a) => ({ value: String(a.id), label: a.name }))}
        />
      </div>

      <TextAreaField name="description" label="Описание" defaultValue={property?.description} rows={5} />

      <CheckboxField name="featured" label="Показывать в избранном на главной" defaultChecked={property?.featured} />

      <SubmitButton>{property ? "Сохранить изменения" : "Создать объект"}</SubmitButton>
    </form>
  );
}
