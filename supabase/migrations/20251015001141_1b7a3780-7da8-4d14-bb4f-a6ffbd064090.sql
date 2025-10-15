-- ============================================
-- MIGRATION DE SÉCURITÉ: Isolation des données personnelles
-- ============================================

-- Étape 1 : Créer une vue publique pour les profils (données non-sensibles seulement)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Étape 2 : Permettre l'accès en lecture à tous les utilisateurs authentifiés sur la vue
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;

-- Étape 3 : Supprimer l'ancienne policy trop permissive sur profiles
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir tous les profils." ON public.profiles;

-- Étape 4 : Créer une nouvelle policy restrictive : les utilisateurs ne peuvent voir que leur propre profil complet
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Étape 5 : Créer une fonction sécurisée pour vérifier l'existence d'un username (pour l'inscription)
CREATE OR REPLACE FUNCTION public.check_username_exists(check_username text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE username = check_username
  );
$$;

-- Étape 6 : Créer une fonction sécurisée pour vérifier l'existence d'un email (pour l'inscription)
CREATE OR REPLACE FUNCTION public.check_email_exists(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE email = check_email
  );
$$;

-- Étape 7 : Créer une fonction sécurisée pour vérifier l'existence d'un phone (pour l'inscription)
CREATE OR REPLACE FUNCTION public.check_phone_exists(check_phone text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE phone = check_phone
  );
$$;

-- Étape 8 : Créer une fonction sécurisée pour obtenir l'email ou phone à partir d'un username (pour le login)
CREATE OR REPLACE FUNCTION public.get_credentials_by_username(lookup_username text)
RETURNS TABLE(email text, phone text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email, phone
  FROM public.profiles
  WHERE username = lookup_username
  LIMIT 1;
$$;

-- Étape 9 : Accorder les permissions d'exécution sur les fonctions
GRANT EXECUTE ON FUNCTION public.check_username_exists(text) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_email_exists(text) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_phone_exists(text) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_credentials_by_username(text) TO authenticated, anon;