-- Phase 0: Schema & Validation Hardening
--
-- Changes:
--   1. Drop/recreate the service enum type with the correct 6 values (matching SERVICE_VALUES)
--   2. Map all known legacy values (Arabic labels & old English slugs) to enum equivalents
--   3. Fail migration if any unmappable values remain in leads.service
--   4. Convert leads.service from text to the service enum (USING clause)
--   5. Add unique constraint on users.email

-- Step 1: Drop existing enum (may exist with wrong values from drizzle-kit push)
-- and recreate with the canonical set that matches SERVICE_VALUES in @workspace/api-zod.
-- Safe because no column currently uses this type (leads.service is still text).
DROP TYPE IF EXISTS "public"."service";--> statement-breakpoint
CREATE TYPE "public"."service" AS ENUM('vip', 'wedding', 'conference', 'private', 'corporate', 'coffee');--> statement-breakpoint

-- Step 2: Map all known legacy values to their canonical enum equivalents.
-- Arabic legacy values: old UI submitted s.title (Arabic string) instead of s.id (slug).
-- English legacy values: old forms that submitted display labels or test strings.
UPDATE "leads"
SET "service" = CASE
  -- Arabic labels from old booking form
  WHEN "service" = 'ضيافة VIP'        THEN 'vip'
  WHEN "service" = 'خدمات الأفراح'   THEN 'wedding'
  WHEN "service" = 'ضيافة الفعاليات' THEN 'conference'
  WHEN "service" = 'ضيافة المؤتمرات' THEN 'conference'
  WHEN "service" = 'قهوة عربية'      THEN 'coffee'
  WHEN "service" = 'فعاليات خاصة'   THEN 'private'
  WHEN "service" = 'شركات'           THEN 'corporate'
  -- English legacy/test values
  WHEN "service" = 'catering'         THEN 'vip'
  WHEN "service" = 'Service'          THEN 'vip'
  ELSE "service"
END
WHERE "service" NOT IN ('vip', 'wedding', 'conference', 'private', 'corporate', 'coffee');--> statement-breakpoint

-- Step 3: Guard — fail loudly if any value cannot be mapped, rather than silently corrupting data
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "leads"
    WHERE "service" NOT IN ('vip', 'wedding', 'conference', 'private', 'corporate', 'coffee')
  ) THEN
    RAISE EXCEPTION
      'Migration aborted: leads.service contains values that cannot be mapped to the service enum. '
      'Run SELECT DISTINCT service FROM leads WHERE service NOT IN (''vip'',''wedding'',''conference'',''private'',''corporate'',''coffee'') '
      'to identify them and perform manual cleanup before re-running this migration.';
  END IF;
END $$;--> statement-breakpoint

-- Step 4: Convert the column type; all remaining values are now valid enum members
ALTER TABLE "leads"
  ALTER COLUMN "service" TYPE "public"."service"
  USING "service"::"public"."service";--> statement-breakpoint

-- Step 5: Enforce email uniqueness to prevent duplicate user rows from OAuth re-logins
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
