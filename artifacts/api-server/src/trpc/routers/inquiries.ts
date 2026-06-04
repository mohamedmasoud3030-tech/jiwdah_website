import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { count, desc, eq } from "drizzle-orm";
import { inquiries, INQUIRY_STATUS_VALUES } from "@workspace/db";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { sendNewInquiryNotification } from "../../lib/mailer";

const inquiryStatusEnum = z.enum(INQUIRY_STATUS_VALUES);
const INQUIRY_MINIMUM_COMPLETION_MS = 1500;

function rejectAutomatedInquiry(website: string | undefined, submittedAt: number) {
  if (website || Date.now() - submittedAt < INQUIRY_MINIMUM_COMPLETION_MS) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid inquiry." });
  }
}

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
        source: z.literal("contact").default("contact"),
        website: z.string().trim().max(255).optional(),
        submittedAt: z.number().int().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      rejectAutomatedInquiry(input.website, input.submittedAt);

      const result = await ctx.db
        .insert(inquiries)
        .values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          service: input.service,
          message: input.message,
          source: input.source,
          status: "new",
        })
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
