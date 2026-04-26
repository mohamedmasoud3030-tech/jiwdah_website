import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLeadStatus,
  deleteLead,
} from "./queries/leads";

export const leadsRouter = createRouter({
  list: publicQuery.query(async () => {
    return getAllLeads();
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getLeadById(input.id);
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
    .mutation(async ({ input }) => {
      return createLead(input);
    }),

  updateStatus: authedQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      return updateLeadStatus(input.id, input.status);
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteLead(input.id);
    }),
});
