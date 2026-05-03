-- Add source column to leads table to track which form submitted the lead
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "source" varchar(50);
