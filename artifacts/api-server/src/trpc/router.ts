import { createRouter, publicQuery } from "./middleware";
import { authRouter } from "./routers/auth";
import { leadsRouter } from "./routers/leads";
import { portfolioRouter } from "./routers/portfolio";
import { instagramPostsRouter } from "./routers/instagramPosts";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  leads: leadsRouter,
  portfolio: portfolioRouter,
  instagramPosts: instagramPostsRouter,
});

export type AppRouter = typeof appRouter;
