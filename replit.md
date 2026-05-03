# مشاريع جودة الإنطلاقة — Jiwdah Hospitality

## Overview

Luxury Arabic event management and hospitality site for Oman (سلطنة عمان). Migrated from Vercel/v0 to Replit's pnpm workspace stack.

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Language**: TypeScript 5.9
- **Frontend**: React 19 + Vite (RTL Arabic, Tailwind v4, Framer Motion)
- **Backend**: Express 5 + tRPC v11 (type-safe API)
- **Database**: PostgreSQL (Replit built-in) + Drizzle ORM
- **Auth**: Kimi OAuth (custom — env vars required, not yet configured)
- **Validation**: Zod, drizzle-zod

## Artifacts

| Artifact | Path | Port | Description |
|---|---|---|---|
| `artifacts/jiwdah` | `/` | 20063 | React/Vite frontend |
| `artifacts/api-server` | `/api` | 8080 | Express + tRPC backend |
| `artifacts/mockup-sandbox` | — | — | Component preview (dev only) |

## Key Routes

### Frontend (`/`)
- `/` — Home (hero, services, portfolio, testimonials, FAQ)
- `/services` — Services page
- `/portfolio` — Portfolio gallery with category filter
- `/about` — About us
- `/contact` — Contact/lead form
- `/login` — Kimi OAuth login
- `/dashboard` — Admin dashboard (requires auth)

### Backend (`/api`)
- `GET /api/healthz` — health check
- `GET /api/oauth/callback` — Kimi OAuth callback
- `GET/POST /api/trpc/*` — tRPC router

### tRPC Endpoints
- `ping` — server ping
- `auth.me` — current user (requires auth cookie)
- `leads.create` — public, creates a lead from contact form
- `leads.list` — admin only, list all leads
- `portfolio.list` — public, list portfolio items (from DB)
- `portfolio.create/update/delete` — admin only
- `instagramPosts.list` — public, list all instagram posts ordered by section + sortOrder
- `instagramPosts.listBySection` — public, list instagram posts for a specific section
- `instagramPosts.create` — admin only, add a post
- `instagramPosts.delete` — admin only, remove a post
- `instagramPosts.reorder` — admin only, update sort order
- `instagramPosts.seed` — admin only, seed initial posts from hardcoded defaults (only if table empty)

## Database Schema (`lib/db/src/schema/index.ts`)
- `users` — admin users (linked to Kimi OAuth)
- `leads` — contact form submissions
- `portfolio` — managed portfolio entries (image/video uploads)
- `instagram_posts` — Instagram embed posts with section (wedding/conference/private/corporate/coffee/vip/about/team), sortOrder, and instagramId

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run build` — rebuild API server
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Environment Variables Needed

The following must be set as Replit secrets for full functionality:

| Variable | Used By | Purpose |
|---|---|---|
| `DATABASE_URL` | api-server, db | PostgreSQL connection (auto-provided by Replit) |
| `APP_ID` | api-server | Kimi OAuth client ID |
| `APP_SECRET` | api-server | Kimi OAuth client secret |
| `KIMI_AUTH_URL` | api-server, frontend | Kimi OAuth base URL |
| `KIMI_OPEN_URL` | api-server | Kimi API base URL |
| `OWNER_UNION_ID` | api-server | Owner's Kimi union ID (grants admin access) |
| `VITE_KIMI_AUTH_URL` | frontend | Kimi auth URL for OAuth redirect |
| `VITE_APP_ID` | frontend | Kimi OAuth app ID for redirect URL |

## Dev Notes

- **API server dev script**: runs pre-built `dist/index.mjs` directly (avoids workflow startup timeout during build). After source changes, run `pnpm --filter @workspace/api-server run build` manually then restart the workflow.
- **Tailwind v4**: uses `@theme inline` in `index.css` for custom tokens (`--color-gold`, `--color-surface`, etc.). Uses `@reference "tailwindcss"` in `App.css` instead of `@apply` with custom tokens.
- **tRPC type bridge**: `artifacts/jiwdah/src/types/router.ts` re-exports `AppRouter` from the api-server via relative path.
- **Instagram Posts**: previously hardcoded in `const.ts` as `INSTAGRAM_PORTFOLIO_ITEMS`, `ABOUT_INSTAGRAM_POST`, `TEAM_INSTAGRAM_POSTS`. Now managed via the admin dashboard's "منشورات إنستغرام" tab. Admin can seed initial data using the "تحميل المنشورات الافتراضية" button.
- **Shared enum build**: When adding new enum values to `lib/api-zod/src/enums.ts`, run `cd lib/api-zod && npx tsc -p tsconfig.json && cd ../api-client-react && npx tsc -p tsconfig.json && cd ../db && npx tsc -p tsconfig.json` to regenerate declaration files.
