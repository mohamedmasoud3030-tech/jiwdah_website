# Mohamed Masoud Digital Platform

منصة شخصية ثنائية اللغة لعرض الخدمات والمشاريع الرقمية واستقبال الاستفسارات وإدارتها من لوحة تحكم.

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

Install dependencies:

```bash
pnpm install
```

## Local development

Run the API server:

```bash
pnpm --filter @workspace/api-server dev
```

Run the frontend in another terminal:

```bash
pnpm --filter @workspace/jiwdah dev
```

## Verification

```bash
pnpm run typecheck
pnpm run build
```

## Database

Apply migrations before using the contact form or dashboard CRUD screens:

```bash
pnpm --filter @workspace/db migrate
```

Migration `0004_platform_reset` keeps former hospitality tables under `legacy_hospitality_*` names and creates the new `inquiries`, `projects`, and `content_entries` tables.

## Environment variables

Copy `.env.example` to `.env` for local development and configure the same variables in the deployment environment.

Required runtime values:

```text
DATABASE_URL
PORT
APP_ID
APP_SECRET
KIMI_AUTH_URL
KIMI_OPEN_URL
OWNER_UNION_ID
```

Optional email notification values:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
NOTIFY_EMAIL
```

Frontend contact values:

```text
BASE_PATH
VITE_PRIMARY_PHONE_DISPLAY
VITE_PRIMARY_PHONE_TEL
VITE_PRIMARY_WHATSAPP
VITE_SECONDARY_PHONE_DISPLAY
VITE_SECONDARY_PHONE_TEL
```

## Vercel deployment

- Frontend output: `artifacts/jiwdah/dist/public`
- API requests under `/api/*` route to `api/[...path].ts`
- API build output: `artifacts/api-server/dist/vercel.mjs`

Before production approval:

1. Configure deployment environment variables.
2. Apply database migrations.
3. Configure the OAuth callback for the production domain at `/api/oauth/callback`.
4. Verify `/`, `/contact`, `/portfolio`, `/login`, `/dashboard`, and `/api/trpc/ping`.

Local `uploads/` storage is not suitable for durable files in serverless deployments. Use object storage before adding production file uploads.
