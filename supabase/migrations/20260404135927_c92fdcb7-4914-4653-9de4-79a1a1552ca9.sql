CREATE POLICY "Admins can read all site content"
ON public.site_content
FOR SELECT
TO authenticated
USING (is_admin());