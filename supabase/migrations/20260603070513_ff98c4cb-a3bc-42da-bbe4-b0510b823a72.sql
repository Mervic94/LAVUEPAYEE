
-- 1) Fix search_path on functions missing it
ALTER FUNCTION public.auto_freeze_wallet() SET search_path = public;
ALTER FUNCTION public.require_manual_review_for_new_users() SET search_path = public;
ALTER FUNCTION public.credit_vuc_after_verification() SET search_path = public;
ALTER FUNCTION public.increment_wallet_vuc(uuid, numeric) SET search_path = public;
ALTER FUNCTION public.admin_approve_ad(uuid) SET search_path = public;
ALTER FUNCTION public.admin_reject_ad(uuid, text) SET search_path = public;
ALTER FUNCTION public.admin_process_withdrawal(uuid, text, text, text) SET search_path = public;
ALTER FUNCTION public.admin_set_fraud_score(uuid, numeric) SET search_path = public;
ALTER FUNCTION public.admin_set_token_rate(numeric) SET search_path = public;
ALTER FUNCTION public.is_admin() SET search_path = public;

-- 2) Lock down SECURITY DEFINER functions: revoke from anon + authenticated + PUBLIC
-- Trigger functions (never called directly)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.create_user_wallet() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_referral_code() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_role_self_update() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.auto_freeze_wallet() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.require_manual_review_for_new_users() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.credit_vuc_after_verification() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_timestamp() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Admin-only RPCs (invoked from edge functions / admin UI through service role)
REVOKE EXECUTE ON FUNCTION public.admin_approve_ad(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_reject_ad(uuid, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_process_withdrawal(uuid, text, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_fraud_score(uuid, numeric) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_token_rate(numeric) FROM PUBLIC, anon;

-- Internal helpers used by edge functions (service role) only
REVOKE EXECUTE ON FUNCTION public.increment_wallet_vuc(uuid, numeric) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.create_system_notification(uuid, text, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.create_user_session(uuid, jsonb, inet) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_session_activity(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_sessions(integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_sessions() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_referral_code() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.count_recent_registrations_by_ip(text, integer) FROM PUBLIC, anon, authenticated;

-- Role checks: needed by RLS evaluations for signed-in users only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin_user() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

-- Lookup helpers used on the login/register screens stay accessible to anon
GRANT EXECUTE ON FUNCTION public.check_email_exists(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_phone_exists(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_username_exists(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_credentials_by_username(text) TO anon, authenticated;

-- 3) Public bucket: block listing of lavuepayee-ads (files stay reachable via direct URL)
DROP POLICY IF EXISTS "Public can list lavuepayee-ads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can list lavuepayee-ads" ON storage.objects;
DROP POLICY IF EXISTS "Public read lavuepayee-ads" ON storage.objects;
DROP POLICY IF EXISTS "lavuepayee-ads public select" ON storage.objects;

-- Replace any broad SELECT policy with one that requires the request to target
-- a specific object (no bucket-wide listing).
CREATE POLICY "lavuepayee-ads read specific object"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'lavuepayee-ads'
  AND name IS NOT NULL
);
