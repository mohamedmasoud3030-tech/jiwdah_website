-- LENA V2 clean PostgreSQL baseline.
-- Safe for a new database: additive, idempotent, and aligned with the current Drizzle schema.
-- Historical pre-LENA migrations remain in this directory for audit only and are excluded from the active journal.

DO $$ BEGIN
  CREATE TYPE public.role AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.inquiry_status AS ENUM ('new', 'in_progress', 'qualified', 'closed', 'archived');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.project_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.users (
  id serial PRIMARY KEY,
  union_id varchar(255) NOT NULL UNIQUE,
  name varchar(255),
  email varchar(320) UNIQUE,
  avatar text,
  role public.role DEFAULT 'user' NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  last_sign_in_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(320),
  phone varchar(50),
  service varchar(255),
  message text NOT NULL,
  source varchar(50) DEFAULT 'contact' NOT NULL,
  status public.inquiry_status DEFAULT 'new' NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.projects (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  summary text,
  description text,
  image_url text,
  project_url text,
  repository_url text,
  content_blocks jsonb DEFAULT '{}'::jsonb NOT NULL,
  gallery jsonb DEFAULT '[]'::jsonb NOT NULL,
  related_services jsonb DEFAULT '[]'::jsonb NOT NULL,
  status public.project_status DEFAULT 'draft' NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content_entries (
  id serial PRIMARY KEY,
  key varchar(255) NOT NULL UNIQUE,
  title varchar(255) NOT NULL,
  body text NOT NULL,
  status public.content_status DEFAULT 'draft' NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS inquiries_status_created_at_idx ON public.inquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS projects_status_sort_order_idx ON public.projects (status, sort_order, created_at DESC);
CREATE INDEX IF NOT EXISTS content_entries_status_updated_at_idx ON public.content_entries (status, updated_at DESC);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_entries ENABLE ROW LEVEL SECURITY;
