import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  user_id: string;
  ad_id: string;
  type: string;
  status: string;
  reward_points: number;
  reward_amount: number;
  proof_url?: string;
  completed_at?: string;
  verified_at?: string;
  created_at: string;
}

export interface TaskWithAd extends Task {
  ad?: {
    title: string;
    content: string;
    image_url?: string;
    type: string;
  };
}

export const useTasksData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskWithAd[]>([]);

  // Fetch user tasks
  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          ad:ads(title, content, image_url, type)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les tâches"
      });
    }
  };

  // Create a new task
  const createTask = async (adId: string, type: string, rewardPoints: number, rewardAmount: number = 0) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          ad_id: adId,
          type,
          reward_points: rewardPoints,
          reward_amount: rewardAmount,
          status: 'pending'
        });

      if (error) throw error;

      await fetchTasks();
      toast({
        title: "Succès",
        description: "Tâche créée avec succès"
      });
      return true;
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la tâche"
      });
      return false;
    }
  };

  // Complete a task
  const completeTask = async (taskId: string, proofUrl?: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          proof_url: proofUrl
        })
        .eq('id', taskId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchTasks();
      toast({
        title: "Succès",
        description: "Tâche terminée avec succès"
      });
      return true;
    } catch (error: any) {
      console.error('Error completing task:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de terminer la tâche"
      });
      return false;
    }
  };

  // Get tasks by status
  const getTasksByStatus = (status: string): TaskWithAd[] => {
    return tasks.filter(task => task.status === status);
  };

  // Get pending tasks
  const getPendingTasks = (): TaskWithAd[] => {
    return getTasksByStatus('pending');
  };

  // Get completed tasks
  const getCompletedTasks = (): TaskWithAd[] => {
    return getTasksByStatus('completed');
  };

  // Refresh data
  const refreshData = async () => {
    setLoading(true);
    await fetchTasks();
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      refreshData();
    } else {
      setLoading(false);
      setTasks([]);
    }
  }, [user]);

  return {
    loading,
    tasks,
    createTask,
    completeTask,
    getTasksByStatus,
    getPendingTasks,
    getCompletedTasks,
    refreshData,
    fetchTasks
  };
};