-- Phase 0: Schema & Validation Hardening
--
-- Changes:
--   1. Create the service enum type (vip, wedding, events)
--   2. Map all known legacy frontend service labels to enum values (explicit, no silent corruption)
--   3. Fail migration if any unmappable values remain in leads.service
--   4. Convert leads.service from varchar to the service enum (USING clause)
--   5. Add unique constraint on users.email

-- Step 1: Create the service enum type
CREATE TYPE "public"."service" AS ENUM('vip', 'wedding', 'events');--> statement-breakpoint

-- Step 2: Map known legacy frontend values to their canonical enum equivalents.
-- The old UI submitted s.title (Arabic string) instead of s.id (English slug).
-- Known legacy value mappings:
--   'ضيافة VIP'        -> 'vip'
--   'خدمات الأفراح'   -> 'wedding'
--   'ضيافة الفعاليات' -> 'events'
UPDATE "leads"
SET "service" = CASE
  WHEN "service" = 'ضيافة VIP'        THEN 'vip'
  WHEN "service" = 'خدمات الأفراح'   THEN 'wedding'
  WHEN "service" = 'ضيافة الفعاليات' THEN 'events'
  ELSE "service"
END
WHERE "service" IN ('ضيافة VIP', 'خدمات الأفراح', 'ضيافة الفعاليات');--> statement-breakpoint

-- Step 3: Guard — fail loudly if any value cannot be mapped, rather than silently corrupting data
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "leads"
    WHERE "service" NOT IN ('vip', 'wedding', 'events')
  ) THEN
    RAISE EXCEPTION
      'Migration aborted: leads.service contains values that cannot be mapped to the service enum. '
      'Run SELECT DISTINCT service FROM leads WHERE service NOT IN (''vip'',''wedding'',''events'') '
      'to identify them and perform manual cleanup before re-running this migration.';
  END IF;
END $$;--> statement-breakpoint

-- Step 4: Convert the column type; all remaining values are now valid enum members
ALTER TABLE "leads"
  ALTER COLUMN "service" TYPE "public"."service"
  USING "service"::"public"."service";--> statement-breakpoint

-- Step 5: Enforce email uniqueness to prevent duplicate user rows from OAuth re-logins
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
