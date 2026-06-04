-- Archive the former hospitality runtime and create clean platform tables.
-- Existing data is preserved under legacy_* names instead of being discarded.

DO $$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL
     AND to_regclass('public.legacy_hospitality_leads') IS NULL THEN
    ALTER TABLE "leads" RENAME TO "legacy_hospitality_leads";
  END IF;

  IF to_regclass('public.portfolio') IS NOT NULL
     AND to_regclass('public.legacy_hospitality_portfolio') IS NULL THEN
    ALTER TABLE "portfolio" RENAME TO "legacy_hospitality_portfolio";
  END IF;

  IF to_regclass('public.instagram_posts') IS NOT NULL
     AND to_regclass('public.legacy_hospitality_instagram_posts') IS NULL THEN
    ALTER TABLE "instagram_posts" RENAME TO "legacy_hospitality_instagram_posts";
  END IF;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'in_progress', 'qualified', 'closed', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."project_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "inquiries" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "email" varchar(320),
  "phone" varchar(50),
  "service" varchar(255),
  "message" text NOT NULL,
  "source" varchar(50) DEFAULT 'contact' NOT NULL,
  "status" "inquiry_status" DEFAULT 'new' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(255) NOT NULL,
  "slug" varchar(255) NOT NULL,
  "summary" text,
  "description" text,
  "image_url" text,
  "project_url" text,
  "repository_url" text,
  "status" "project_status" DEFAULT 'draft' NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "content_entries" (
  "id" serial PRIMARY KEY NOT NULL,
  "key" varchar(255) NOT NULL,
  "title" varchar(255) NOT NULL,
  "body" text NOT NULL,
  "status" "content_status" DEFAULT 'draft' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "content_entries_key_unique" UNIQUE("key")
);
