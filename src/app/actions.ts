"use server";

import { prisma } from "@/lib/prisma";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "contact");
  const propertyIdRaw = formData.get("propertyId");
  const propertyId = propertyIdRaw ? Number(propertyIdRaw) : undefined;

  if (!name || !phone) {
    return { status: "error", message: "Укажите имя и телефон." };
  }

  await prisma.lead.create({
    data: {
      name,
      phone,
      message: message || undefined,
      source,
      propertyId,
    },
  });

  return { status: "success", message: "Заявка отправлена. Мы свяжемся в течение часа." };
}
