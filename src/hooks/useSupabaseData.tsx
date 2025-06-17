
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PostgrestError } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

interface UseSupabaseDataOptions<T extends TableName> {
  table: T;
  select?: string;
  filter?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

interface UseSupabaseDataResult<T extends TableName> {
  data: Database['public']['Tables'][T]['Row'][] | null;
  loading: boolean;
  error: PostgrestError | null;
  refetch: () => Promise<void>;
}

export function useSupabaseData<T extends TableName>(
  options: UseSupabaseDataOptions<T>
): UseSupabaseDataResult<T> {
  const [data, setData] = useState<Database['public']['Tables'][T]['Row'][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from(options.table)
        .select(options.select || '*');

      // Appliquer les filtres
      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Appliquer l'ordre
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }

      // Appliquer la limite
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: queryError } = await query;

      if (queryError) {
        setError(queryError);
        toast({
          title: "Erreur de chargement",
          description: `Impossible de charger les données: ${queryError.message}`,
          variant: "destructive"
        });
        setData(null);
      } else {
        setData(result as any);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(options)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
