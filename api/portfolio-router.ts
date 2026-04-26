import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import {
  getAllPortfolio,
  getPortfolioByCategory,
  createPortfolioItem,
  deletePortfolioItem,
} from "./queries/portfolio";

export const portfolioRouter = createRouter({
  list: publicQuery.query(async () => {
    return getAllPortfolio();
  }),

  getByCategory: publicQuery
    .input(
      z.object({
        category: z.enum([
          "wedding",
          "conference",
          "private",
          "corporate",
          "coffee",
          "vip",
        ]),
      })
    )
    .query(async ({ input }) => {
      return getPortfolioByCategory(input.category);
    }),

  create: authedQuery
    .input(
      z.object({
        title: z.string().min(1),
        imageUrl: z.string().min(1),
        category: z.enum([
          "wedding",
          "conference",
          "private",
          "corporate",
          "coffee",
          "vip",
        ]),
      })
    )
    .mutation(async ({ input }) => {
      return createPortfolioItem(input);
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deletePortfolioItem(input.id);
    }),
});
