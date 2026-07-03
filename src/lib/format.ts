import type { DealType, PropertyType } from "@prisma/client";

const rub = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number, dealType: DealType) {
  return dealType === "RENT" ? `${rub.format(price)}/мес` : rub.format(price);
}

export function formatArea(area: number) {
  return `${area.toLocaleString("ru-RU")} м²`;
}

export const dealTypeLabel: Record<DealType, string> = {
  SALE: "Продажа",
  RENT: "Аренда",
};

export const propertyTypeLabel: Record<PropertyType, string> = {
  APARTMENT: "Квартира",
  STUDIO: "Студия",
  HOUSE: "Дом",
  COMMERCIAL: "Коммерция",
};

export function roomsLabel(rooms: number, type: PropertyType) {
  if (type === "STUDIO") return "Студия";
  if (type === "COMMERCIAL") return `${rooms} помещ.`;
  const word = rooms === 1 ? "комната" : rooms < 5 ? "комнаты" : "комнат";
  return `${rooms} ${word}`;
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
