import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { instagramPosts, INSTAGRAM_SECTION_VALUES } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const sectionEnum = z.enum(INSTAGRAM_SECTION_VALUES);

const SEED_DATA = [
  { instagramId: "DXb2TfxjVBg", section: "wedding" as const, title: "أفراح", sortOrder: 0 },
  { instagramId: "DS103e_jI-w", section: "wedding" as const, title: "أفراح", sortOrder: 1 },
  { instagramId: "DSxRofqAdzT", section: "wedding" as const, title: "أفراح", sortOrder: 2 },
  { instagramId: "DSPZ5DrDKIp", section: "wedding" as const, title: "أفراح", sortOrder: 3 },
  { instagramId: "DGAUJTqMZs_", section: "wedding" as const, title: "أفراح", sortOrder: 4 },
  { instagramId: "C3O-a0nIV4b", section: "wedding" as const, title: "أفراح", sortOrder: 5 },
  { instagramId: "DHf8mVJMkEK", section: "wedding" as const, title: "أفراح", sortOrder: 6 },
  { instagramId: "DT7CaguDF5J", section: "conference" as const, title: "مؤتمرات", sortOrder: 0 },
  { instagramId: "DTIfRLuDLyO", section: "conference" as const, title: "مؤتمرات", sortOrder: 1 },
  { instagramId: "DSrUrcYjJjr", section: "conference" as const, title: "مؤتمرات", sortOrder: 2 },
  { instagramId: "DJleSjhsFot", section: "conference" as const, title: "مؤتمرات", sortOrder: 3 },
  { instagramId: "DIsoLdxMyhg", section: "conference" as const, title: "مؤتمرات", sortOrder: 4 },
  { instagramId: "DAP6RahMBRd", section: "vip" as const, title: "ضيافة VIP", sortOrder: 0 },
  { instagramId: "DUAa9diDdtZ", section: "vip" as const, title: "ضيافة VIP", sortOrder: 1 },
  { instagramId: "DJleSjhsFot", section: "vip" as const, title: "ضيافة VIP", sortOrder: 2 },
  { instagramId: "DBjXBw4s8ou", section: "vip" as const, title: "ضيافة VIP", sortOrder: 3 },
  { instagramId: "DA29EDXMAmm", section: "vip" as const, title: "ضيافة VIP", sortOrder: 4 },
  { instagramId: "DXb2TfxjVBg", section: "vip" as const, title: "ضيافة VIP", sortOrder: 5 },
  { instagramId: "DUz7ASsDZgr", section: "vip" as const, title: "ضيافة VIP", sortOrder: 6 },
  { instagramId: "C_Lcso5MzUI", section: "private" as const, title: "فعاليات", sortOrder: 0 },
  { instagramId: "DT7UjMBDdg5", section: "private" as const, title: "فعاليات", sortOrder: 1 },
  { instagramId: "DXEtd21DTB7", section: "private" as const, title: "فعاليات", sortOrder: 2 },
  { instagramId: "DW-qlSLChtC", section: "private" as const, title: "فعاليات", sortOrder: 3 },
  { instagramId: "DVvWNTvDX3R", section: "corporate" as const, title: "شركات", sortOrder: 0 },
  { instagramId: "DUVDW10jSsz", section: "corporate" as const, title: "شركات", sortOrder: 1 },
  { instagramId: "DUf0Fbhjcc9", section: "about" as const, title: "من نحن", sortOrder: 0 },
  { instagramId: "DUVGJpuDerL", section: "team" as const, title: "الفريق", sortOrder: 0 },
  { instagramId: "DLRfGvFMYrz", section: "team" as const, title: "الفريق", sortOrder: 1 },
  { instagramId: "DTIe_tqDHwf", section: "team" as const, title: "الفريق", sortOrder: 2 },
  { instagramId: "DMNZwS3s9Ep", section: "team" as const, title: "الفريق", sortOrder: 3 },
  { instagramId: "DSPc3xAjD-w", section: "team" as const, title: "الفريق", sortOrder: 4 },
  { instagramId: "DAJrVt6sVhp", section: "team" as const, title: "الفريق", sortOrder: 5 },
  { instagramId: "DFfC3gMs_Sc", section: "team" as const, title: "الفريق", sortOrder: 6 },
  { instagramId: "DBk8CzpsX82", section: "team" as const, title: "الفريق", sortOrder: 7 },
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
        })
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
});
