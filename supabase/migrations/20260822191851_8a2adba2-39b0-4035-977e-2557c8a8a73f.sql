-- 1) Withdrawals: no direct client inserts (must go through process-withdrawal edge function)
DROP POLICY IF EXISTS "Users can create their own withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS withdrawals_insert_own ON public.withdrawals;
REVOKE INSERT, UPDATE, DELETE ON public.withdrawals FROM authenticated, anon;
GRANT SELECT ON public.withdrawals TO authenticated;
GRANT ALL ON public.withdrawals TO service_role;

-- 2) users: block self privilege escalation and balance tampering
DROP POLICY IF EXISTS users_insert_trigger ON public.users;
CREATE POLICY users_insert_own ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS users_update_own ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY users_update_own ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.prevent_sensitive_self_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RETURN NEW;
  END IF;
  NEW.role         := OLD.role;
  NEW.fraud_score  := OLD.fraud_score;
  NEW.points       := OLD.points;
  NEW.total_earned := OLD.total_earned;
  NEW.status       := OLD.status;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_users_role_change ON public.users;
CREATE TRIGGER prevent_users_sensitive_change
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.prevent_sensitive_self_update();

-- 3) user_roles: explicit admin-only write policies (no self assignment)
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) fraud_alerts: users can read their own alerts
DROP POLICY IF EXISTS fraud_alerts_select_own ON public.fraud_alerts;
CREATE POLICY fraud_alerts_select_own ON public.fraud_alerts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 5) Storage: public reads scoped to campaign-owned ad folders only
DROP POLICY IF EXISTS "lavuepayee-ads read specific object" ON storage.objects;
CREATE POLICY "lavuepayee-ads read campaign assets" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'lavuepayee-ads'
    AND EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id::text = (storage.foldername(name))[1]
    )
  );

-- 6) Fix mutable search_path on remaining functions
ALTER FUNCTION public.check_driver_milestone() SET search_path = public;
ALTER FUNCTION public.check_driver_milestones() SET search_path = public;
ALTER FUNCTION public.deduct_drive_to_buy() SET search_path = public;
ALTER FUNCTION public.process_drive_to_buy() SET search_path = public;
ALTER FUNCTION public.update_driver_stats_after_ride() SET search_path = public;
ALTER FUNCTION public.estimate_ride_price(numeric, text) SET search_path = public;

-- 7) Revoke EXECUTE on internal trigger/definer functions from API roles
REVOKE ALL ON FUNCTION public.check_driver_milestone() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.check_driver_milestones() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.deduct_drive_to_buy() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.process_drive_to_buy() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_driver_stats_after_ride() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_sensitive_self_update() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_credentials_by_username(text) FROM PUBLIC, authenticated;
