import { z } from "zod";
import { asc, desc, eq } from "drizzle-orm";
import { projects, PROJECT_STATUS_VALUES } from "@workspace/db";
import { createRouter, publicQuery, adminQuery } from "../middleware";

const projectStatusEnum = z.enum(PROJECT_STATUS_VALUES);

const projectInput = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().max(1000).optional(),
  description: z.string().trim().max(10000).optional(),
  imageUrl: z.string().trim().url().optional(),
  projectUrl: z.string().trim().url().optional(),
  repositoryUrl: z.string().trim().url().optional(),
  status: projectStatusEnum.default("draft"),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectsRouter = createRouter({
  listPublished: publicQuery.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }),

  list: adminQuery.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(projects)
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }),

  create: adminQuery
    .input(projectInput)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(projects).values(input).returning();
      return result[0];
    }),

  update: adminQuery
    .input(
      projectInput.partial().extend({
        id: z.number().int().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input;
      const result = await ctx.db
        .update(projects)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(projects.id, id))
        .returning();
      return result[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});
