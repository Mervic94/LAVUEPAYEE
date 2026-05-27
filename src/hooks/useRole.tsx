import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'consumer' | 'advertiser';

export const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
      if (!error && data) setRoles(data.map((r: any) => r.role));
      setLoading(false);
    })();
  }, [user, authLoading]);

  const hasRole = (role: AppRole) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isAdvertiser = hasRole('advertiser');
  const isConsumer = hasRole('consumer');
  const primaryRole: AppRole | null =
    isAdmin ? 'admin' : isAdvertiser ? 'advertiser' : isConsumer ? 'consumer' : null;

  return { roles, hasRole, isAdmin, isAdvertiser, isConsumer, primaryRole, loading };
};
