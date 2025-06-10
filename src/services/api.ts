
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

export class ApiService {
  // Gestion des utilisateurs
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<Tables['users']['Update']>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gestion des tâches
  static async getUserTasks(userId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        ads (
          title,
          content,
          image_url,
          reward_points
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getAvailableAds(limit = 10) {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  static async completeTask(taskData: {
    user_id: string;
    ad_id: string;
    type: string;
    reward_points: number;
    proof_url?: string;
  }) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...taskData,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gestion du portefeuille
  static async getUserWallet(userId: string) {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserTransactions(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Gestion des notifications
  static async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gestion des retraits
  static async createWithdrawal(withdrawalData: {
    user_id: string;
    amount: number;
    method: string;
    payment_details: any;
  }) {
    // Calculer les frais (exemple : 2% de frais)
    const fee = withdrawalData.amount * 0.02;
    const net_amount = withdrawalData.amount - fee;

    const { data, error } = await supabase
      .from('withdrawals')
      .insert({
        ...withdrawalData,
        fee,
        net_amount,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gestion des erreurs centralisée
  static handleError(error: any) {
    console.error('API Error:', error);
    
    if (error.message?.includes('auth')) {
      return 'Erreur d\'authentification. Veuillez vous reconnecter.';
    }
    
    if (error.message?.includes('network')) {
      return 'Erreur de connexion. Vérifiez votre connexion internet.';
    }
    
    return error.message || 'Une erreur inattendue s\'est produite.';
  }
}
