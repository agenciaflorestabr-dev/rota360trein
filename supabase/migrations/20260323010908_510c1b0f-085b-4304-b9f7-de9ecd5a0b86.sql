
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_submission_id UUID REFERENCES public.form_submissions(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_whatsapp TEXT,
  course_title TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT,
  mp_payment_id TEXT,
  mp_preference_id TEXT,
  mp_status TEXT NOT NULL DEFAULT 'pending',
  mp_status_detail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can insert payments" ON public.payments FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view own payment by preference" ON public.payments FOR SELECT TO anon, authenticated USING (true);
