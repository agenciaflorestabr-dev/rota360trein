
-- Use allowlist approach for site_content public SELECT
DROP POLICY IF EXISTS "Anyone can read non-sensitive site content" ON public.site_content;
CREATE POLICY "Anyone can read public site content" ON public.site_content
  FOR SELECT TO public
  USING (section_key IN ('course_prices', 'hero_slides', 'partners', 'phone_number', 'whatsapp_number'));
