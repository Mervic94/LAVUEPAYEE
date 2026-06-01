DROP VIEW IF EXISTS public.suspicious_transactions;

CREATE VIEW public.suspicious_transactions
WITH (security_invoker = true) AS
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