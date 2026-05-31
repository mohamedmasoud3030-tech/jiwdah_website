import { z } from "zod";
import { count, desc, eq } from "drizzle-orm";
import { inquiries, INQUIRY_STATUS_VALUES } from "@workspace/db";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { sendNewInquiryNotification } from "../../lib/mailer";

const inquiryStatusEnum = z.enum(INQUIRY_STATUS_VALUES);

export const inquiriesRouter = createRouter({
  list: adminQuery.query(async ({ ctx }) => {
    return ctx.db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }),

  countNew: adminQuery.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ count: count() })
      .from(inquiries)
      .where(eq(inquiries.status, "new"));
    return result[0]?.count ?? 0;
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(1).max(255),
        email: z.string().trim().email().max(320).optional(),
        phone: z.string().trim().max(50).optional(),
        service: z.string().trim().max(255).optional(),
        message: z.string().trim().min(1).max(5000),
        source: z.string().trim().max(50).default("contact"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(inquiries)
        .values({ ...input, status: "new" })
        .returning();

      const inquiry = result[0];
      if (inquiry) {
        sendNewInquiryNotification(inquiry).catch((error) =>
          console.error("[inquiries] notification error:", error)
        );
      }

      return inquiry;
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number().int().positive(), status: inquiryStatusEnum }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(inquiries)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(inquiries.id, input.id))
        .returning();
      return result[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(inquiries).where(eq(inquiries.id, input.id));
      return { success: true };
    }),
});
