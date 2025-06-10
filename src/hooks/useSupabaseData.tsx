
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseDataOptions {
  table: string;
  select?: string;
  filter?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

interface UseSupabaseDataResult<T> {
  data: T[] | null;
  loading: boolean;
  error: PostgrestError | null;
  refetch: () => Promise<void>;
}

export function useSupabaseData<T = any>(
  options: UseSupabaseDataOptions
): UseSupabaseDataResult<T> {
  const [data, setData] = useState<T[] | null>(null);
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
      } else {
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
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
