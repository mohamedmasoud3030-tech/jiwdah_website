# LENA Digital House

منصة رقمية ثنائية اللغة لعرض الحلول الإبداعية والتجارب والمشاريع واستقبال استفسارات العملاء وإدارتها من لوحة تحكم.

## Project structure

```text
api/[...path].ts                 Vercel API entry
artifacts/jiwdah/                React + Vite frontend
artifacts/api-server/            Express + tRPC API
lib/db/                          Drizzle schema and migrations
lib/api-zod/                     Shared validation types
vercel.json                      Vercel routing configuration
```

## Requirements

- Node.js 24+
- pnpm
- PostgreSQL

## Local development

```bash
pnpm install
pnpm --filter @workspace/api-server dev
pnpm --filter @workspace/jiwdah dev
```

## Verification

```bash
pnpm run typecheck
pnpm run build
```

## Database

Apply migrations before using the inquiry form or dashboard CRUD screens:

```bash
pnpm --filter @workspace/db migrate
```

## Environment variables

Copy `.env.example` to `.env` and configure the same values in Vercel. The contact channels used by the public experience are `VITE_PRIMARY_WHATSAPP` and `VITE_CONTACT_EMAIL`. Set `NOTIFY_EMAIL` to receive inquiry-form notifications.

## Vercel deployment

- Frontend output: `artifacts/jiwdah/dist/public`
- API requests under `/api/*` route to `api/[...path].ts`
- Before production approval, verify `/`, `/services`, `/portfolio`, `/contact`, `/login`, `/dashboard`, and `/api/trpc/ping`.
