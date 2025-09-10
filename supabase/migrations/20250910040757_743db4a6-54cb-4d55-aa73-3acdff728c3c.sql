-- Phase 1: Corriger l'authentification et synchroniser la base de données

-- 1. Créer un trigger pour synchroniser automatiquement users et profiles lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insérer dans la table users
  INSERT INTO public.users (
    id, 
    username, 
    email, 
    first_name, 
    last_name, 
    avatar_url,
    points,
    role,
    status
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url',
    0,
    'consumer',
    'active'
  );

  -- Insérer dans la table profiles (pour compatibilité)
  INSERT INTO public.profiles (
    id,
    username,
    email,
    first_name,
    last_name,
    avatar_url
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  RETURN NEW;
END;
$$;

-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Créer le nouveau trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Ajouter les foreign keys manquantes (avec vérification d'existence)
DO $$
BEGIN
  -- Campaigns
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_advertiser_id_fkey') THEN
    ALTER TABLE public.campaigns 
    ADD CONSTRAINT campaigns_advertiser_id_fkey 
    FOREIGN KEY (advertiser_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  -- Ads
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ads_campaign_id_fkey') THEN
    ALTER TABLE public.ads 
    ADD CONSTRAINT ads_campaign_id_fkey 
    FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;
  END IF;

  -- Tasks
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tasks_user_id_fkey') THEN
    ALTER TABLE public.tasks 
    ADD CONSTRAINT tasks_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tasks_ad_id_fkey') THEN
    ALTER TABLE public.tasks 
    ADD CONSTRAINT tasks_ad_id_fkey 
    FOREIGN KEY (ad_id) REFERENCES public.ads(id) ON DELETE CASCADE;
  END IF;

  -- Transactions
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transactions_user_id_fkey') THEN
    ALTER TABLE public.transactions 
    ADD CONSTRAINT transactions_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  -- Withdrawals
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'withdrawals_user_id_fkey') THEN
    ALTER TABLE public.withdrawals 
    ADD CONSTRAINT withdrawals_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  -- Wallets
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'wallets_user_id_fkey') THEN
    ALTER TABLE public.wallets 
    ADD CONSTRAINT wallets_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  -- Referrals
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'referrals_referrer_id_fkey') THEN
    ALTER TABLE public.referrals 
    ADD CONSTRAINT referrals_referrer_id_fkey 
    FOREIGN KEY (referrer_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'referrals_referred_id_fkey') THEN
    ALTER TABLE public.referrals 
    ADD CONSTRAINT referrals_referred_id_fkey 
    FOREIGN KEY (referred_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 3. Générer des codes de parrainage automatiques
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  exists_code BOOLEAN;
BEGIN
  LOOP
    -- Générer un code de 8 caractères alphanumériques
    code := UPPER(
      substr(md5(random()::text), 1, 4) || 
      substr(md5(random()::text), 1, 4)
    );
    
    -- Vérifier si le code existe déjà
    SELECT EXISTS(SELECT 1 FROM public.users WHERE referral_code = code) INTO exists_code;
    
    -- Si le code n'existe pas, on le retourne
    IF NOT exists_code THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Trigger pour générer automatiquement un code de parrainage
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_user_referral_code ON public.users;
CREATE TRIGGER set_user_referral_code
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION set_referral_code();