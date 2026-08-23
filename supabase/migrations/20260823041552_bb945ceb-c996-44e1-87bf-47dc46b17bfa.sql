-- 1) Storage ownership fixes
DROP POLICY IF EXISTS "kyc_upload_own" ON storage.objects;
CREATE POLICY "kyc_upload_own" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'zempro-kyc'
    AND (auth.uid())::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "proofs_upload_own" ON storage.objects;
CREATE POLICY "proofs_upload_own" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'socialpay-proofs'
    AND (auth.uid())::text = (storage.foldername(name))[1]
  );

-- 2) Admin accreditations
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_accreditation') THEN
    CREATE TYPE public.admin_accreditation AS ENUM ('general', 'proofs', 'finance', 'moderation', 'support');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.admin_accreditations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  accreditation public.admin_accreditation NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, accreditation)
);

GRANT SELECT ON public.admin_accreditations TO authenticated;
GRANT ALL ON public.admin_accreditations TO service_role;

ALTER TABLE public.admin_accreditations ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_accreditation(_user_id uuid, _acc public.admin_accreditation)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_accreditations
    WHERE user_id = _user_id
      AND (accreditation = _acc OR accreditation = 'general')
  );
$$;

REVOKE EXECUTE ON FUNCTION public.has_accreditation(uuid, public.admin_accreditation) FROM anon;

DROP POLICY IF EXISTS "acc_select_own_or_general" ON public.admin_accreditations;
CREATE POLICY "acc_select_own_or_general" ON public.admin_accreditations
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_accreditation(auth.uid(), 'general'));

DROP POLICY IF EXISTS "acc_manage_general" ON public.admin_accreditations;
CREATE POLICY "acc_manage_general" ON public.admin_accreditations
  FOR ALL TO authenticated
  USING (public.has_accreditation(auth.uid(), 'general'))
  WITH CHECK (public.has_accreditation(auth.uid(), 'general'));

-- 3) Seed existing accounts
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role FROM auth.users u
WHERE LOWER(u.email) IN ('melvicsotch@gmail.com','cmsprojetceeb@gmail.com','victorsotch@gmail.com','nettos.sotch@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.admin_accreditations (user_id, accreditation)
SELECT u.id, a.acc
FROM auth.users u
JOIN (
  VALUES
    ('melvicsotch@gmail.com','general'::public.admin_accreditation),
    ('cmsprojetceeb@gmail.com','proofs'),
    ('victorsotch@gmail.com','finance'),
    ('nettos.sotch@gmail.com','moderation'),
    ('nettos.sotch@gmail.com','support')
) AS a(mail, acc) ON LOWER(u.email) = a.mail
ON CONFLICT (user_id, accreditation) DO NOTHING;

-- 4) Auto-assign on signup
CREATE OR REPLACE FUNCTION public.assign_admin_accreditation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF LOWER(NEW.email) IN ('melvicsotch@gmail.com','cmsprojetceeb@gmail.com','victorsotch@gmail.com','nettos.sotch@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;

    INSERT INTO public.admin_accreditations (user_id, accreditation)
    SELECT NEW.id, a.acc FROM (
      VALUES
        ('melvicsotch@gmail.com','general'::public.admin_accreditation),
        ('cmsprojetceeb@gmail.com','proofs'),
        ('victorsotch@gmail.com','finance'),
        ('nettos.sotch@gmail.com','moderation'),
        ('nettos.sotch@gmail.com','support')
    ) AS a(mail, acc)
    WHERE a.mail = LOWER(NEW.email)
    ON CONFLICT (user_id, accreditation) DO NOTHING;
  END IF;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'assign_admin_accreditation error for %: %', NEW.email, SQLERRM;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.assign_admin_accreditation() FROM anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_admin_accreditation ON auth.users;
CREATE TRIGGER on_auth_user_admin_accreditation
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_admin_accreditation();
