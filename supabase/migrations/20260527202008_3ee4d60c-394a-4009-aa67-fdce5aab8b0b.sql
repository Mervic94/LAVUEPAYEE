
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  assigned_role TEXT;
BEGIN
  assigned_role := CASE LOWER(NEW.email)
    WHEN 'melvicsotch@gmail.com' THEN 'admin'
    WHEN 'vicsotchenou@gmail.com' THEN 'consumer'
    WHEN 'victorsotch@gmail.com' THEN 'advertiser'
    ELSE COALESCE(NEW.raw_user_meta_data->>'account_type', 'consumer')
  END;

  INSERT INTO public.users (
    id, username, email, first_name, last_name, avatar_url,
    points, role, status
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url',
    0,
    assigned_role,
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role;

  INSERT INTO public.profiles (
    id, username, email, first_name, last_name, avatar_url
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$function$;

UPDATE public.users SET role = 'admin' WHERE LOWER(email) = 'melvicsotch@gmail.com';
UPDATE public.users SET role = 'consumer' WHERE LOWER(email) = 'vicsotchenou@gmail.com';
UPDATE public.users SET role = 'advertiser' WHERE LOWER(email) = 'victorsotch@gmail.com';
