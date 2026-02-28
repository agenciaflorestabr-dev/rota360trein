
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS cpf text,
ADD COLUMN IF NOT EXISTS cnh_register text,
ADD COLUMN IF NOT EXISTS birth_date text,
ADD COLUMN IF NOT EXISTS street text,
ADD COLUMN IF NOT EXISTS number text,
ADD COLUMN IF NOT EXISTS neighborhood text,
ADD COLUMN IF NOT EXISTS cep text,
ADD COLUMN IF NOT EXISTS phone text;
