import { createRouter, publicQuery } from "./middleware";
import { authRouter } from "./routers/auth";
import { inquiriesRouter } from "./routers/inquiries";
import { projectsRouter } from "./routers/projects";
import { contentRouter } from "./routers/content";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  inquiries: inquiriesRouter,
  projects: projectsRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
