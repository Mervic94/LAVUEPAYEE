
-- Fix withdrawals: Replace overly broad ALL policy with specific policies
DROP POLICY IF EXISTS "Users can manage their own withdrawals" ON public.withdrawals;

-- Users can view their own withdrawals
CREATE POLICY "Users can view their own withdrawals"
ON public.withdrawals FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own withdrawals
CREATE POLICY "Users can create their own withdrawals"
ON public.withdrawals FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users cannot update or delete withdrawals (admin only via service role)
-- No UPDATE/DELETE policies = blocked for regular users

-- Fix users table: ensure policies are scoped to authenticated only
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id);
