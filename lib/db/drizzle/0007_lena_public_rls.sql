-- Optional Supabase public API policies.
-- Plain PostgreSQL deployments continue safely when Supabase roles are absent.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon')
     AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    EXECUTE 'DROP POLICY IF EXISTS public_projects_read_published ON public.projects';
    EXECUTE 'CREATE POLICY public_projects_read_published ON public.projects FOR SELECT TO anon, authenticated USING (status = ''published'')';

    EXECUTE 'DROP POLICY IF EXISTS public_content_read_published ON public.content_entries';
    EXECUTE 'CREATE POLICY public_content_read_published ON public.content_entries FOR SELECT TO anon, authenticated USING (status = ''published'')';

    EXECUTE 'DROP POLICY IF EXISTS public_inquiries_insert ON public.inquiries';
    EXECUTE 'CREATE POLICY public_inquiries_insert ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (status = ''new'' AND source = ''contact'')';

    EXECUTE 'GRANT USAGE ON SCHEMA public TO anon, authenticated';
    EXECUTE 'GRANT SELECT ON TABLE public.projects TO anon, authenticated';
    EXECUTE 'GRANT SELECT ON TABLE public.content_entries TO anon, authenticated';
    EXECUTE 'REVOKE INSERT ON TABLE public.inquiries FROM anon, authenticated';
    EXECUTE 'GRANT INSERT (name, email, phone, service, message) ON TABLE public.inquiries TO anon, authenticated';
    EXECUTE 'GRANT USAGE, SELECT ON SEQUENCE public.inquiries_id_seq TO anon, authenticated';
  END IF;
END $$;
