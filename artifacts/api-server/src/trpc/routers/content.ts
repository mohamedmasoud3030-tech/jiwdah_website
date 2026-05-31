import { z } from "zod";
import { asc, desc, eq } from "drizzle-orm";
import { contentEntries, CONTENT_STATUS_VALUES } from "@workspace/db";
import { createRouter, publicQuery, adminQuery } from "../middleware";

const contentStatusEnum = z.enum(CONTENT_STATUS_VALUES);

const contentInput = z.object({
  key: z.string().trim().min(1).max(255).regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(255),
  body: z.string().trim().min(1).max(50000),
  status: contentStatusEnum.default("draft"),
});

export const contentRouter = createRouter({
  listPublished: publicQuery.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(contentEntries)
      .where(eq(contentEntries.status, "published"))
      .orderBy(asc(contentEntries.key));
  }),

  getPublishedByKey: publicQuery
    .input(z.object({ key: z.string().trim().min(1).max(255) }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db
        .select()
        .from(contentEntries)
        .where(eq(contentEntries.key, input.key));
      const entry = rows[0];
      return entry?.status === "published" ? entry : null;
    }),

  list: adminQuery.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(contentEntries)
      .orderBy(desc(contentEntries.updatedAt));
  }),

  create: adminQuery
    .input(contentInput)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(contentEntries).values(input).returning();
      return result[0];
    }),

  update: adminQuery
    .input(contentInput.partial().extend({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input;
      const result = await ctx.db
        .update(contentEntries)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(contentEntries.id, id))
        .returning();
      return result[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(contentEntries).where(eq(contentEntries.id, input.id));
      return { success: true };
    }),
});
