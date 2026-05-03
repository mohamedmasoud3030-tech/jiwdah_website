import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "../middleware";
import { leads, SERVICE_VALUES } from "@workspace/db";
import { eq, desc, isNotNull } from "drizzle-orm";

const serviceEnum = z.enum(SERVICE_VALUES);

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidISODate(val: string): boolean {
  if (!ISO_DATE_RE.test(val)) return false;
  const d = new Date(val);
  return !isNaN(d.getTime()) && d.toISOString().startsWith(val);
}

const eventDateSchema = z
  .string()
  .optional()
  .refine(
    (val) => val === undefined || val === "" || isValidISODate(val),
    { message: "eventDate must be a valid date in YYYY-MM-DD format" }
  );

export const leadsRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    return ctx.db.select().from(leads).orderBy(desc(leads.createdAt));
  }),

  bookedDates: publicQuery.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({ eventDate: leads.eventDate })
      .from(leads)
      .where(isNotNull(leads.eventDate));
    return rows
      .filter((r) => r.eventDate && r.eventDate.trim() !== "")
      .map((r) => r.eventDate as string);
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        service: serviceEnum,
        eventDate: eventDateSchema,
        location: z.string().optional(),
        budget: z.string().optional(),
        guests: z.number().int().min(1).optional(),
        notes: z.string().optional(),
        source: z.enum(["home", "contact"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(leads).values({
        name: input.name,
        phone: input.phone,
        service: input.service,
        eventDate: input.eventDate || undefined,
        location: input.location,
        budget: input.budget,
        guests: input.guests,
        notes: input.notes,
        source: input.source,
        status: "new",
      }).returning();
      return result[0];
    }),

  updateStatus: authedQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(leads)
        .set({ status: input.status })
        .where(eq(leads.id, input.id))
        .returning();
      return result[0];
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(leads).where(eq(leads.id, input.id));
      return { success: true };
    }),
});
