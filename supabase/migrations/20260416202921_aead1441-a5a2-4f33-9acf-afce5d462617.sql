CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  session_id text NOT NULL,
  referrer text,
  user_agent text,
  device text,
  country text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view page views"
  ON public.page_views FOR SELECT
  TO authenticated
  USING (is_admin());