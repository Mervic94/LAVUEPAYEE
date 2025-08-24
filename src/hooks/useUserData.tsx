import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  username?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  points?: number;
  total_earned?: number;
  referral_code?: string;
  role?: string;
  status?: string;
}

export interface UserWallet {
  id: string;
  balance: number;
  pending_balance: number;
  total_earned: number;
  total_withdrawn: number;
  currency: string;
}

export interface UserTransaction {
  id: string;
  amount: number;
  points: number;
  type: string;
  status: string;
  description: string;
  created_at: string;
  payment_method?: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userWallet, setUserWallet] = useState<UserWallet | null>(null);
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUserProfile(data);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger le profil utilisateur"
      });
    }
  };

  // Fetch user wallet
  const fetchUserWallet = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUserWallet(data);
    } catch (error: any) {
      console.error('Error fetching user wallet:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger le portefeuille"
      });
    }
  };

  // Fetch user transactions
  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les transactions"
      });
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      await fetchUserProfile();
      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès"
      });
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le profil"
      });
      return false;
    }
  };

  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchUserProfile(),
      fetchUserWallet(),
      fetchTransactions()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      refreshData();
    } else {
      setLoading(false);
      setUserProfile(null);
      setUserWallet(null);
      setTransactions([]);
    }
  }, [user]);

  return {
    loading,
    userProfile,
    userWallet,
    transactions,
    updateUserProfile,
    refreshData,
    fetchUserProfile,
    fetchUserWallet,
    fetchTransactions
  };
};