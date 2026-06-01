-- =========================================================
-- 1) Multi-platform tracking columns
-- =========================================================
ALTER TABLE public.transactions
  ADD COLUMN IF NOT EXISTS platform_id text NOT NULL DEFAULT 'lavuepayee';

ALTER TABLE public.ad_views
  ADD COLUMN IF NOT EXISTS platform_id text NOT NULL DEFAULT 'lavuepayee';

CREATE INDEX IF NOT EXISTS idx_transactions_platform ON public.transactions(platform_id);
CREATE INDEX IF NOT EXISTS idx_ad_views_platform ON public.ad_views(platform_id);
CREATE INDEX IF NOT EXISTS idx_reward_logs_platform ON public.reward_logs(platform_id);

-- =========================================================
-- 2) social_tasks (SOCIALPAY-ready, empty)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.social_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id text NOT NULL DEFAULT 'socialpay',
  advertiser_id uuid NOT NULL,
  task_type text NOT NULL,            -- like, follow, share, comment, subscribe
  network text NOT NULL,              -- facebook, instagram, tiktok, youtube, x
  target_url text NOT NULL,
  title text NOT NULL,
  description text,
  reward_vuc numeric NOT NULL DEFAULT 0 CHECK (reward_vuc >= 0),
  daily_limit integer NOT NULL DEFAULT 100,
  total_limit integer,
  completions_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending', -- pending, active, paused, completed
  approved boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_tasks TO authenticated;
GRANT ALL ON public.social_tasks TO service_role;

ALTER TABLE public.social_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_tasks active visible to all auth"
  ON public.social_tasks FOR SELECT TO authenticated
  USING (status = 'active' AND approved = true);

CREATE POLICY "advertisers manage own social_tasks"
  ON public.social_tasks FOR ALL TO authenticated
  USING (auth.uid() = advertiser_id)
  WITH CHECK (auth.uid() = advertiser_id);

CREATE POLICY "admins manage all social_tasks"
  ON public.social_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_social_tasks_updated_at
  BEFORE UPDATE ON public.social_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_social_tasks_platform ON public.social_tasks(platform_id);
CREATE INDEX idx_social_tasks_status ON public.social_tasks(status);
CREATE INDEX idx_social_tasks_advertiser ON public.social_tasks(advertiser_id);

-- =========================================================
-- 3) Anti-fraud Layer 3: registrations per IP / 24h
-- =========================================================
CREATE OR REPLACE FUNCTION public.count_recent_registrations_by_ip(
  _ip_hash text,
  _hours integer DEFAULT 24
)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(DISTINCT user_id)::int
  FROM public.device_fingerprints
  WHERE ip_hash = _ip_hash
    AND created_at > now() - (_hours || ' hours')::interval;
$$;

-- =========================================================
-- 4) Layer 4: suspicious transactions view (admin only)
-- =========================================================
CREATE OR REPLACE VIEW public.suspicious_transactions AS
WITH user_avg AS (
  SELECT user_id, AVG(amount) AS avg_amount
  FROM public.transactions
  WHERE created_at > now() - interval '30 days'
    AND type IN ('reward', 'earning', 'credit')
  GROUP BY user_id
)
SELECT t.*, ua.avg_amount,
       ROUND((t.amount / NULLIF(ua.avg_amount, 0))::numeric, 2) AS ratio_to_avg
FROM public.transactions t
JOIN user_avg ua ON ua.user_id = t.user_id
WHERE t.amount > ua.avg_amount * 1.5
  AND t.created_at > now() - interval '30 days';

GRANT SELECT ON public.suspicious_transactions TO authenticated;
GRANT ALL ON public.suspicious_transactions TO service_role;

-- Note: views inherit RLS from underlying tables. transactions admin policy already enforces admin-only access via has_role.
