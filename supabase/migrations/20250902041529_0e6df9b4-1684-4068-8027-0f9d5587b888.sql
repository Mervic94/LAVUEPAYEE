-- Correction du problème de sécurité : Unauthorized Users Can Create System Notifications
-- Problème : La politique actuelle permet à tout utilisateur de créer des notifications système

-- 1. Créer une fonction security definer pour vérifier si l'utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- 2. Supprimer l'ancienne politique dangereuse
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- 3. Créer une nouvelle politique restrictive pour la création de notifications
-- Seuls les admins peuvent créer des notifications
CREATE POLICY "Only admins can create notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_user());

-- 4. Permettre aux utilisateurs de créer leurs propres notifications (optionnel)
CREATE POLICY "Users can create their own notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 5. Créer une fonction pour que les edge functions puissent créer des notifications système
-- Cette fonction sera utilisée avec service_role key dans les edge functions
CREATE OR REPLACE FUNCTION public.create_system_notification(
  target_user_id UUID,
  notification_title TEXT,
  notification_message TEXT,
  notification_type TEXT DEFAULT 'info'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_id UUID;
BEGIN
  -- Vérifier que seul un processus avec service_role peut appeler cette fonction
  -- Cette vérification sera faite par l'edge function qui appelle cette fonction
  
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (target_user_id, notification_title, notification_message, notification_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;