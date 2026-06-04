-- Create instagram_section enum (if not exists)
DO $$ BEGIN
  CREATE TYPE "public"."instagram_section" AS ENUM('wedding', 'conference', 'private', 'corporate', 'coffee', 'vip', 'about', 'team');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create instagram_posts table
CREATE TABLE IF NOT EXISTS "instagram_posts" (
  "id" serial PRIMARY KEY NOT NULL,
  "instagram_id" varchar(255) NOT NULL,
  "section" "instagram_section" NOT NULL,
  "title" varchar(255) DEFAULT '' NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
