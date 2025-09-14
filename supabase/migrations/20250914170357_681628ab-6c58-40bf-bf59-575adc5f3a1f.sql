-- Corriger les problèmes de sécurité détectés
-- Ajouter SET search_path aux fonctions qui n'en ont pas

-- Fonction generate_referral_code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fonction set_referral_code
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$;