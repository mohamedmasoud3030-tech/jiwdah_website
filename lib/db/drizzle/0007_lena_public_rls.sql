-- LENA public API policies for Supabase roles.
DROP POLICY IF EXISTS public_projects_read_published ON public.projects;
CREATE POLICY public_projects_read_published
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS public_content_read_published ON public.content_entries;
CREATE POLICY public_content_read_published
  ON public.content_entries
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS public_inquiries_insert ON public.inquiries;
CREATE POLICY public_inquiries_insert
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.projects TO anon, authenticated;
GRANT SELECT ON TABLE public.content_entries TO anon, authenticated;
GRANT INSERT ON TABLE public.inquiries TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.inquiries_id_seq TO anon, authenticated;
