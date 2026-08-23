import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

export type Accreditation = 'general' | 'proofs' | 'finance' | 'moderation' | 'support';

export const ACCREDITATION_LABELS: Record<Accreditation, string> = {
  general: 'Administrateur général',
  proofs: 'Validation des preuves',
  finance: 'Finance & retraits',
  moderation: 'Modération',
  support: 'Support client',
};

export const useAccreditation = () => {
  const { user, loading: authLoading } = useAuth();
  const [accreditations, setAccreditations] = useState<Accreditation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setAccreditations([]);
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from('admin_accreditations' as any)
        .select('accreditation')
        .eq('user_id', user.id);
      if (!error && data) {
        setAccreditations((data as any[]).map((r) => r.accreditation as Accreditation));
      }
      setLoading(false);
    })();
  }, [user, authLoading]);

  const isGeneral = accreditations.includes('general');
  const can = (acc: Accreditation) => isGeneral || accreditations.includes(acc);

  return { accreditations, can, isGeneral, loading };
};
