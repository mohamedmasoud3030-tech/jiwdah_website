import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "../middleware";
import { leads } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

export const leadsRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    return ctx.db.select().from(leads).orderBy(desc(leads.createdAt));
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        service: z.string().min(1),
        eventDate: z.string().optional(),
        location: z.string().optional(),
        budget: z.string().optional(),
        guests: z.number().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(leads).values({
        name: input.name,
        phone: input.phone,
        service: input.service,
        eventDate: input.eventDate,
        location: input.location,
        budget: input.budget,
        guests: input.guests,
        notes: input.notes,
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
