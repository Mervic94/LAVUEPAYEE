-- ============================================
-- CORRECTION DES AVERTISSEMENTS DE SÉCURITÉ
-- ============================================

-- 1. Corriger le warning "Security Definer View" pour public_profiles
-- Recréer la vue avec security_invoker=on pour respecter les RLS policies
DROP VIEW IF EXISTS public.public_profiles;

CREATE VIEW public.public_profiles
WITH (security_invoker=on)
AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Réappliquer les permissions
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;

-- 2. Vérifier et corriger les anciennes fonctions sans SET search_path
-- Note: Les nouvelles fonctions (check_username_exists, check_email_exists, etc.) 
-- ont déjà SET search_path = public donc elles sont OK

-- Vérifier generate_referral_code (déjà corrigé dans migration précédente)
-- Vérifier set_referral_code (déjà corrigé dans migration précédente)
-- Vérifier is_admin_user (déjà corrigé)
-- Vérifier create_system_notification (déjà corrigé)
-- Vérifier create_user_session (déjà corrigé)
-- Vérifier update_session_activity (déjà corrigé)
-- Vérifier cleanup_expired_sessions (déjà corrigé)
-- Vérifier handle_new_user (déjà corrigé)

-- Vérifier et corriger cleanup_old_sessions si nécessaire
CREATE OR REPLACE FUNCTION public.cleanup_old_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    DELETE FROM user_sessions 
    WHERE last_activity < now() - INTERVAL '30 days';
END;
$$;

-- Vérifier et corriger create_user_wallet si nécessaire
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Vérifier et corriger update_timestamp si nécessaire
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Vérifier et corriger update_updated_at_column si nécessaire
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;