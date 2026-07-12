
CREATE OR REPLACE FUNCTION public.claim_video_reward(video_id text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_ad public.ads%ROWTYPE;
  v_reward numeric := 50; -- default demo reward (LVP)
  v_last_ts timestamptz;
  v_existing uuid;
  v_task_id uuid;
  v_new_balance numeric;
  v_ad_uuid uuid;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Non authentifié' USING ERRCODE = '28000';
  END IF;

  IF video_id IS NULL OR length(trim(video_id)) = 0 THEN
    RAISE EXCEPTION 'video_id requis' USING ERRCODE = '22023';
  END IF;

  -- Cooldown 30s : refuser si une tâche a été complétée dans les 30 dernières secondes
  SELECT MAX(completed_at) INTO v_last_ts
  FROM public.tasks
  WHERE user_id = v_user
    AND status = 'completed';

  IF v_last_ts IS NOT NULL AND v_last_ts > now() - interval '30 seconds' THEN
    RAISE EXCEPTION 'Trop rapide : patientez % secondes avant une nouvelle validation',
      ceil(extract(epoch from (v_last_ts + interval '30 seconds' - now())))
      USING ERRCODE = 'P0001';
  END IF;

  -- Tenter de rattacher à une pub réelle si video_id est un UUID valide
  BEGIN
    v_ad_uuid := video_id::uuid;
  EXCEPTION WHEN others THEN
    v_ad_uuid := NULL;
  END;

  IF v_ad_uuid IS NOT NULL THEN
    SELECT * INTO v_ad FROM public.ads WHERE id = v_ad_uuid;
    IF FOUND THEN
      IF v_ad.status IS DISTINCT FROM 'active' THEN
        RAISE EXCEPTION 'Publicité inactive' USING ERRCODE = 'P0001';
      END IF;
      v_reward := COALESCE(v_ad.reward_points, v_reward);

      -- Anti-duplicata : refuser si déjà réclamée pour cette pub
      SELECT id INTO v_existing
      FROM public.tasks
      WHERE user_id = v_user AND ad_id = v_ad_uuid AND status = 'completed'
      LIMIT 1;
      IF v_existing IS NOT NULL THEN
        RAISE EXCEPTION 'Récompense déjà réclamée pour cette vidéo' USING ERRCODE = 'P0001';
      END IF;

      INSERT INTO public.tasks (user_id, ad_id, type, status, reward_points, completed_at)
      VALUES (v_user, v_ad_uuid, 'view', 'completed', v_reward, now())
      RETURNING id INTO v_task_id;
    END IF;
  END IF;

  -- Créditer le wallet de manière atomique
  PERFORM public.increment_wallet_vuc(v_user, v_reward);

  SELECT balance_vuc INTO v_new_balance FROM public.wallets WHERE user_id = v_user;

  RETURN jsonb_build_object(
    'success', true,
    'task_id', v_task_id,
    'video_id', video_id,
    'points_earned', v_reward,
    'new_balance', v_new_balance
  );
END;
$$;

REVOKE ALL ON FUNCTION public.claim_video_reward(text) FROM public;
GRANT EXECUTE ON FUNCTION public.claim_video_reward(text) TO authenticated;
