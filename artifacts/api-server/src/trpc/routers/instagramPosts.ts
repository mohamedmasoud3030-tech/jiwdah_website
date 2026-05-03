import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { instagramPosts, INSTAGRAM_SECTION_VALUES } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const sectionEnum = z.enum(INSTAGRAM_SECTION_VALUES);

function thumb(instagramId: string) {
  return `https://picsum.photos/seed/${instagramId}/600/600`;
}

const SEED_DATA = [
  { instagramId: "DXb2TfxjVBg", section: "wedding" as const, title: "أفراح", sortOrder: 0, thumbnailUrl: thumb("DXb2TfxjVBg") },
  { instagramId: "DS103e_jI-w", section: "wedding" as const, title: "أفراح", sortOrder: 1, thumbnailUrl: thumb("DS103e_jI-w") },
  { instagramId: "DSxRofqAdzT", section: "wedding" as const, title: "أفراح", sortOrder: 2, thumbnailUrl: thumb("DSxRofqAdzT") },
  { instagramId: "DSPZ5DrDKIp", section: "wedding" as const, title: "أفراح", sortOrder: 3, thumbnailUrl: thumb("DSPZ5DrDKIp") },
  { instagramId: "DGAUJTqMZs_", section: "wedding" as const, title: "أفراح", sortOrder: 4, thumbnailUrl: thumb("DGAUJTqMZs_") },
  { instagramId: "C3O-a0nIV4b", section: "wedding" as const, title: "أفراح", sortOrder: 5, thumbnailUrl: thumb("C3O-a0nIV4b") },
  { instagramId: "DHf8mVJMkEK", section: "wedding" as const, title: "أفراح", sortOrder: 6, thumbnailUrl: thumb("DHf8mVJMkEK") },
  { instagramId: "DT7CaguDF5J", section: "conference" as const, title: "مؤتمرات", sortOrder: 0, thumbnailUrl: thumb("DT7CaguDF5J") },
  { instagramId: "DTIfRLuDLyO", section: "conference" as const, title: "مؤتمرات", sortOrder: 1, thumbnailUrl: thumb("DTIfRLuDLyO") },
  { instagramId: "DSrUrcYjJjr", section: "conference" as const, title: "مؤتمرات", sortOrder: 2, thumbnailUrl: thumb("DSrUrcYjJjr") },
  { instagramId: "DJleSjhsFot", section: "conference" as const, title: "مؤتمرات", sortOrder: 3, thumbnailUrl: thumb("DJleSjhsFot") },
  { instagramId: "DIsoLdxMyhg", section: "conference" as const, title: "مؤتمرات", sortOrder: 4, thumbnailUrl: thumb("DIsoLdxMyhg") },
  { instagramId: "DAP6RahMBRd", section: "vip" as const, title: "ضيافة VIP", sortOrder: 0, thumbnailUrl: thumb("DAP6RahMBRd") },
  { instagramId: "DUAa9diDdtZ", section: "vip" as const, title: "ضيافة VIP", sortOrder: 1, thumbnailUrl: thumb("DUAa9diDdtZ") },
  { instagramId: "DJleSjhsFot", section: "vip" as const, title: "ضيافة VIP", sortOrder: 2, thumbnailUrl: thumb("DJleSjhsFot-vip") },
  { instagramId: "DBjXBw4s8ou", section: "vip" as const, title: "ضيافة VIP", sortOrder: 3, thumbnailUrl: thumb("DBjXBw4s8ou") },
  { instagramId: "DA29EDXMAmm", section: "vip" as const, title: "ضيافة VIP", sortOrder: 4, thumbnailUrl: thumb("DA29EDXMAmm") },
  { instagramId: "DXb2TfxjVBg", section: "vip" as const, title: "ضيافة VIP", sortOrder: 5, thumbnailUrl: thumb("DXb2TfxjVBg-vip") },
  { instagramId: "DUz7ASsDZgr", section: "vip" as const, title: "ضيافة VIP", sortOrder: 6, thumbnailUrl: thumb("DUz7ASsDZgr") },
  { instagramId: "C_Lcso5MzUI", section: "private" as const, title: "فعاليات", sortOrder: 0, thumbnailUrl: thumb("C_Lcso5MzUI") },
  { instagramId: "DT7UjMBDdg5", section: "private" as const, title: "فعاليات", sortOrder: 1, thumbnailUrl: thumb("DT7UjMBDdg5") },
  { instagramId: "DXEtd21DTB7", section: "private" as const, title: "فعاليات", sortOrder: 2, thumbnailUrl: thumb("DXEtd21DTB7") },
  { instagramId: "DW-qlSLChtC", section: "private" as const, title: "فعاليات", sortOrder: 3, thumbnailUrl: thumb("DW-qlSLChtC") },
  { instagramId: "DVvWNTvDX3R", section: "corporate" as const, title: "شركات", sortOrder: 0, thumbnailUrl: thumb("DVvWNTvDX3R") },
  { instagramId: "DUVDW10jSsz", section: "corporate" as const, title: "شركات", sortOrder: 1, thumbnailUrl: thumb("DUVDW10jSsz") },
  { instagramId: "DUf0Fbhjcc9", section: "about" as const, title: "من نحن", sortOrder: 0, thumbnailUrl: thumb("DUf0Fbhjcc9") },
  { instagramId: "DUVGJpuDerL", section: "team" as const, title: "الفريق", sortOrder: 0, thumbnailUrl: thumb("DUVGJpuDerL") },
  { instagramId: "DLRfGvFMYrz", section: "team" as const, title: "الفريق", sortOrder: 1, thumbnailUrl: thumb("DLRfGvFMYrz") },
  { instagramId: "DTIe_tqDHwf", section: "team" as const, title: "الفريق", sortOrder: 2, thumbnailUrl: thumb("DTIe_tqDHwf") },
  { instagramId: "DMNZwS3s9Ep", section: "team" as const, title: "الفريق", sortOrder: 3, thumbnailUrl: thumb("DMNZwS3s9Ep") },
  { instagramId: "DSPc3xAjD-w", section: "team" as const, title: "الفريق", sortOrder: 4, thumbnailUrl: thumb("DSPc3xAjD-w") },
  { instagramId: "DAJrVt6sVhp", section: "team" as const, title: "الفريق", sortOrder: 5, thumbnailUrl: thumb("DAJrVt6sVhp") },
  { instagramId: "DFfC3gMs_Sc", section: "team" as const, title: "الفريق", sortOrder: 6, thumbnailUrl: thumb("DFfC3gMs_Sc") },
  { instagramId: "DBk8CzpsX82", section: "team" as const, title: "الفريق", sortOrder: 7, thumbnailUrl: thumb("DBk8CzpsX82") },
];

export const instagramPostsRouter = createRouter({
  list: publicQuery.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(instagramPosts)
      .orderBy(asc(instagramPosts.section), asc(instagramPosts.sortOrder), asc(instagramPosts.id));
  }),

  listBySection: publicQuery
    .input(z.object({ section: sectionEnum }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(instagramPosts)
        .where(eq(instagramPosts.section, input.section))
        .orderBy(asc(instagramPosts.sortOrder), asc(instagramPosts.id));
    }),

  create: adminQuery
    .input(
      z.object({
        instagramId: z.string().min(1),
        section: sectionEnum,
        title: z.string().default(""),
        sortOrder: z.number().int().default(0),
        thumbnailUrl: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db
        .select()
        .from(instagramPosts)
        .where(eq(instagramPosts.section, input.section))
        .orderBy(asc(instagramPosts.sortOrder));

      const maxOrder = existing.length > 0 ? Math.max(...existing.map((p) => p.sortOrder)) + 1 : 0;

      const result = await ctx.db
        .insert(instagramPosts)
        .values({
          instagramId: input.instagramId,
          section: input.section,
          title: input.title,
          sortOrder: maxOrder,
          thumbnailUrl: input.thumbnailUrl ?? null,
        })
        .returning();
      return result[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        thumbnailUrl: z.string().nullable().optional(),
        title: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updates: Partial<{ thumbnailUrl: string | null; title: string }> = {};
      if (input.thumbnailUrl !== undefined) updates.thumbnailUrl = input.thumbnailUrl;
      if (input.title !== undefined) updates.title = input.title;
      const result = await ctx.db
        .update(instagramPosts)
        .set(updates)
        .where(eq(instagramPosts.id, input.id))
        .returning();
      return result[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(instagramPosts).where(eq(instagramPosts.id, input.id));
      return { success: true };
    }),

  reorder: adminQuery
    .input(
      z.object({
        items: z.array(z.object({ id: z.number(), sortOrder: z.number().int() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all(
        input.items.map(({ id, sortOrder }) =>
          ctx.db
            .update(instagramPosts)
            .set({ sortOrder })
            .where(eq(instagramPosts.id, id))
        )
      );
      return { success: true };
    }),

  seed: adminQuery.mutation(async ({ ctx }) => {
    const existing = await ctx.db.select().from(instagramPosts);
    if (existing.length > 0) {
      return { seeded: false, message: "البيانات موجودة بالفعل" };
    }
    await ctx.db.insert(instagramPosts).values(SEED_DATA);
    return { seeded: true, message: "تم تحميل البيانات الافتراضية بنجاح" };
  }),

  backfillThumbnails: adminQuery.mutation(async ({ ctx }) => {
    const existing = await ctx.db.select().from(instagramPosts);
    const missing = existing.filter((p) => !p.thumbnailUrl);
    if (missing.length === 0) {
      return { updated: 0, message: "جميع المنشورات لديها صور مصغرة بالفعل" };
    }
    await Promise.all(
      missing.map((p) =>
        ctx.db
          .update(instagramPosts)
          .set({ thumbnailUrl: thumb(p.instagramId) })
          .where(eq(instagramPosts.id, p.id))
      )
    );
    return { updated: missing.length, message: `تم تحديث ${missing.length} منشور بصور مصغرة مؤقتة` };
  }),
});
