
-- Fix: All policies are RESTRICTIVE (permissive=false), which blocks ALL access.
-- Drop them and recreate as PERMISSIVE policies.

-- ============ form_submissions ============
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can view submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Anyone can submit form" ON public.form_submissions;

CREATE POLICY "Admins can view submissions" ON public.form_submissions FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can update submissions" ON public.form_submissions FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete submissions" ON public.form_submissions FOR DELETE TO authenticated USING (public.is_admin());
CREATE POLICY "Anyone can submit form" ON public.form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ============ messages ============
DROP POLICY IF EXISTS "Admins can manage messages" ON public.messages;

CREATE POLICY "Admins can manage messages" ON public.messages FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ profiles ============
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ============ site_content ============
DROP POLICY IF EXISTS "Admins can delete site content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can update site content" ON public.site_content;
DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;

CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.is_admin());

-- ============ user_roles ============
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;

CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ Create missing trigger for auto-creating profile + role on signup ============
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
