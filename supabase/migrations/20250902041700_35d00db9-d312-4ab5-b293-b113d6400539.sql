-- Correction du problème de sécurité : Session Data Could Be Manipulated by Unauthorized Users
-- Problème : La politique "System can manage sessions" permet à tout utilisateur de manipuler toutes les sessions

-- 1. Supprimer l'ancienne politique dangereuse
DROP POLICY IF EXISTS "System can manage sessions" ON public.user_sessions;

-- 2. Créer des politiques restrictives pour les utilisateurs
-- Les utilisateurs peuvent seulement insérer leurs propres sessions (pour le login)
CREATE POLICY "Users can create their own sessions"
ON public.user_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres sessions (pour last_activity)
CREATE POLICY "Users can update their own sessions"
ON public.user_sessions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres sessions (pour le logout)
CREATE POLICY "Users can delete their own sessions"
ON public.user_sessions
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 3. Créer des fonctions système sécurisées pour la gestion des sessions
-- Fonction pour créer une session système (appelée par les edge functions)
CREATE OR REPLACE FUNCTION public.create_user_session(
  target_user_id UUID,
  session_device_info JSONB DEFAULT NULL,
  session_ip_address INET DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  session_id UUID;
BEGIN
  INSERT INTO public.user_sessions (user_id, device_info, ip_address)
  VALUES (target_user_id, session_device_info, session_ip_address)
  RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;

-- 4. Fonction pour mettre à jour l'activité d'une session
CREATE OR REPLACE FUNCTION public.update_session_activity(
  session_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.user_sessions 
  SET last_activity = now()
  WHERE id = session_id;
  
  RETURN FOUND;
END;
$$;

-- 5. Fonction pour nettoyer les sessions expirées (système)
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions(
  expiry_days INTEGER DEFAULT 30
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.user_sessions 
  WHERE last_activity < now() - (expiry_days || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;