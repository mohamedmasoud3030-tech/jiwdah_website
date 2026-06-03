-- Extend project records with structured case-study content while preserving existing rows.
ALTER TABLE "projects"
  ADD COLUMN IF NOT EXISTS "content_blocks" jsonb DEFAULT '{}'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS "gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS "related_services" jsonb DEFAULT '[]'::jsonb NOT NULL;
