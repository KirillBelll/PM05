"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { DealType, PropertyType, PropertyStatus } from "@prisma/client";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

function num(fd: FormData, key: string): number | undefined {
  const v = str(fd, key);
  return v === "" ? undefined : Number(v);
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

// ---------- Properties ----------

function propertyData(fd: FormData) {
  return {
    code: str(fd, "code"),
    title: str(fd, "title"),
    dealType: str(fd, "dealType") as DealType,
    type: str(fd, "type") as PropertyType,
    status: str(fd, "status") as PropertyStatus,
    city: str(fd, "city"),
    district: str(fd, "district"),
    address: str(fd, "address"),
    price: num(fd, "price") ?? 0,
    areaTotal: num(fd, "areaTotal") ?? 0,
    areaLiving: num(fd, "areaLiving") ?? null,
    areaKitchen: num(fd, "areaKitchen") ?? null,
    rooms: num(fd, "rooms") ?? 0,
    floor: num(fd, "floor") ?? null,
    floorsTotal: num(fd, "floorsTotal") ?? null,
    yearBuilt: num(fd, "yearBuilt") ?? null,
    description: str(fd, "description"),
    featured: fd.get("featured") === "on",
    agentId: num(fd, "agentId") ?? 0,
  };
}

export async function createProperty(formData: FormData) {
  const property = await prisma.property.create({ data: propertyData(formData) });
  revalidateSite();
  redirect(`/admin/properties/${property.id}`);
}

export async function updateProperty(id: number, formData: FormData) {
  await prisma.property.update({ where: { id }, data: propertyData(formData) });
  revalidateSite();
  redirect(`/admin/properties/${id}?saved=1`);
}

export async function deleteProperty(id: number) {
  await prisma.property.delete({ where: { id } });
  revalidateSite();
  redirect("/admin/properties");
}

export async function addPropertyImage(propertyId: number, formData: FormData) {
  const url = str(formData, "url");
  const alt = str(formData, "alt");
  if (!url) redirect(`/admin/properties/${propertyId}`);
  const count = await prisma.propertyImage.count({ where: { propertyId } });
  await prisma.propertyImage.create({
    data: { propertyId, url, alt: alt || "Фото объекта", order: count },
  });
  revalidateSite();
  redirect(`/admin/properties/${propertyId}`);
}

export async function deletePropertyImage(imageId: number, propertyId: number) {
  await prisma.propertyImage.delete({ where: { id: imageId } });
  revalidateSite();
  redirect(`/admin/properties/${propertyId}`);
}

// ---------- Agents ----------

function agentData(fd: FormData) {
  return {
    slug: str(fd, "slug"),
    name: str(fd, "name"),
    role: str(fd, "role"),
    phone: str(fd, "phone"),
    email: str(fd, "email"),
    photo: str(fd, "photo"),
    bio: str(fd, "bio"),
    dealsCount: num(fd, "dealsCount") ?? 0,
  };
}

export async function createAgent(formData: FormData) {
  const agent = await prisma.agent.create({ data: agentData(formData) });
  revalidateSite();
  redirect(`/admin/agents/${agent.id}`);
}

export async function updateAgent(id: number, formData: FormData) {
  await prisma.agent.update({ where: { id }, data: agentData(formData) });
  revalidateSite();
  redirect(`/admin/agents/${id}?saved=1`);
}

export async function deleteAgent(id: number) {
  const propertiesCount = await prisma.property.count({ where: { agentId: id } });
  if (propertiesCount > 0) {
    redirect(`/admin/agents/${id}?error=has-properties`);
  }
  await prisma.agent.delete({ where: { id } });
  revalidateSite();
  redirect("/admin/agents");
}

// ---------- Testimonials ----------

function testimonialData(fd: FormData) {
  return {
    name: str(fd, "name"),
    role: str(fd, "role"),
    quote: str(fd, "quote"),
    rating: num(fd, "rating") ?? 5,
  };
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({ data: testimonialData(formData) });
  revalidateSite();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: number, formData: FormData) {
  await prisma.testimonial.update({ where: { id }, data: testimonialData(formData) });
  revalidateSite();
  redirect(`/admin/testimonials/${id}?saved=1`);
}

export async function deleteTestimonial(id: number) {
  await prisma.testimonial.delete({ where: { id } });
  revalidateSite();
  redirect("/admin/testimonials");
}

// ---------- Leads ----------

export async function deleteLead(id: number) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

// ---------- Auth ----------

export type LoginState = { status: "idle" | "error"; message?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const from = str(formData, "from");

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !valid) {
    return { status: "error", message: "Неверная почта или пароль." };
  }

  const token = await createSessionToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect(from && from.startsWith("/admin") ? from : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
