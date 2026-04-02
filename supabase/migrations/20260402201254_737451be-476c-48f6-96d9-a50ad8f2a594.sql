
-- 1. site_content: restrict public SELECT to non-sensitive keys
DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;
CREATE POLICY "Anyone can read non-sensitive site content" ON public.site_content
  FOR SELECT TO public
  USING (section_key NOT IN ('mercadopago_access_token', 'mercadopago_public_key'));

-- 2. form_submissions: remove overly permissive anon SELECT
DROP POLICY IF EXISTS "Submitters can read own insert" ON public.form_submissions;

-- 3. payments: remove anon/public SELECT and INSERT (edge functions use service role)
DROP POLICY IF EXISTS "Anyone can view own payment by preference" ON public.payments;
DROP POLICY IF EXISTS "Anyone can insert payments" ON public.payments;
