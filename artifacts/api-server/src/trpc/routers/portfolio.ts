import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { portfolio, CATEGORY_VALUES } from "@workspace/db";
import { eq, asc, desc } from "drizzle-orm";

const categoryEnum = z.enum(CATEGORY_VALUES);

export const portfolioRouter = createRouter({
  list: publicQuery.query(async ({ ctx }) => {
    return ctx.db.select().from(portfolio).orderBy(asc(portfolio.id));
  }),

  getByCategory: publicQuery
    .input(
      z.object({
        category: categoryEnum,
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(portfolio)
        .where(eq(portfolio.category, input.category))
        .orderBy(desc(portfolio.createdAt));
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        imageUrl: z.string().min(1),
        category: categoryEnum,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(portfolio).values({
        title: input.title,
        imageUrl: input.imageUrl,
        category: input.category,
      }).returning();
      return result[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        imageUrl: z.string().min(1).optional(),
        category: categoryEnum.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input;
      const result = await ctx.db
        .update(portfolio)
        .set(fields)
        .where(eq(portfolio.id, id))
        .returning();
      return result[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(portfolio).where(eq(portfolio.id, input.id));
      return { success: true };
    }),
});
