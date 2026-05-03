import { getDb } from "./connection";
import { leads } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export async function getAllLeads() {
  const db = getDb();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: number) {
  const db = getDb();
  const result = await db.select().from(leads).where(eq(leads.id, id));
  return result[0] ?? null;
}

export async function createLead(data: {
  name: string;
  phone: string;
  service: string;
  eventDate?: string;
  location?: string;
  budget?: string;
  guests?: number;
  notes?: string;
}) {
  const db = getDb();
  const result = await db.insert(leads).values({
    name: data.name,
    phone: data.phone,
    service: data.service,
    eventDate: data.eventDate,
    location: data.location,
    budget: data.budget,
    guests: data.guests,
    notes: data.notes,
    status: "new",
  });
  return result;
}

export async function updateLeadStatus(id: number, status: string) {
  const db = getDb();
  return db.update(leads).set({ status: status as "new" | "contacted" | "confirmed" | "completed" | "cancelled" }).where(eq(leads.id, id));
}

export async function deleteLead(id: number) {
  const db = getDb();
  return db.delete(leads).where(eq(leads.id, id));
}
