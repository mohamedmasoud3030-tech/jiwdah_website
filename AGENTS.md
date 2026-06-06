# LENA Digital House Agent Instructions

## Read before editing

1. `README.md`
2. `docs/ai/README.md`
3. `docs/ai/product-scope.md`
4. `docs/ai/engineering-policy.md`
5. `docs/ai/security-policy.md`
6. `docs/ai/release-policy.md`
7. `docs/decisions/README.md`
8. `.ai/workflows/README.md`

Inspect the repository root with `rg --files` and `rg` before changing code. Use active code and versioned database files as the source of truth.

## Product boundary

LENA Digital House is a bilingual public-facing digital platform with a protected dashboard for managing content and customer inquiries.

The repository contains:

- `artifacts/jiwdah/`: React and Vite frontend
- `artifacts/api-server/`: Express, Hono, and tRPC API layer
- `lib/db/`: Drizzle schema and migrations
- `lib/api-zod/`: shared validation contracts
- `api/`: Vercel API entrypoints
- `vercel.json`: production routing and build configuration

## Working rules

- Keep public pages, dashboard pages, API routes, validation contracts, database schema, and Vercel routing aligned.
- Preserve Arabic and English behavior on public pages.
- Treat authentication, inquiry submission, file upload, SMTP notifications, environment variables, and database migrations as sensitive.
- Never commit secrets or production credentials.
- Keep changes narrow and reviewable.
- Run the relevant verification commands before handoff.
