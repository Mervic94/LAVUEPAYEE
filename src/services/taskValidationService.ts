
import { supabase } from '@/integrations/supabase/client';

export interface TaskValidationResult {
  isValid: boolean;
  score: number;
  reasons: string[];
  fraudRisk: 'low' | 'medium' | 'high';
  requiresManualReview: boolean;
}

export interface TaskProof {
  type: 'screenshot' | 'click_data' | 'time_spent' | 'geolocation';
  data: any;
  timestamp: string;
}

export class TaskValidationService {
  static async validateTask(
    taskId: string, 
    userId: string, 
    proofs: TaskProof[]
  ): Promise<TaskValidationResult> {
    try {
      // Validation de base
      const result: TaskValidationResult = {
        isValid: false,
        score: 0,
        reasons: [],
        fraudRisk: 'low',
        requiresManualReview: false
      };

      // Vérifier les preuves
      if (!proofs || proofs.length === 0) {
        result.reasons.push('Aucune preuve fournie');
        return result;
      }

      // Validation des captures d'écran
      const screenshots = proofs.filter(p => p.type === 'screenshot');
      if (screenshots.length > 0) {
        result.score += 30;
        result.reasons.push('Capture d\'écran fournie');
      }

      // Validation du temps passé
      const timeProofs = proofs.filter(p => p.type === 'time_spent');
      if (timeProofs.length > 0) {
        const timeSpent = timeProofs[0].data.duration;
        if (timeSpent >= 10000) { // Au moins 10 secondes
          result.score += 25;
          result.reasons.push('Temps de visionnage suffisant');
        } else {
          result.fraudRisk = 'high';
          result.reasons.push('Temps de visionnage suspect');
          result.requiresManualReview = true;
        }
      }

      // Validation des clics
      const clickProofs = proofs.filter(p => p.type === 'click_data');
      if (clickProofs.length > 0) {
        result.score += 20;
        result.reasons.push('Interaction avec la publicité détectée');
      }

      // Validation géographique
      const geoProofs = proofs.filter(p => p.type === 'geolocation');
      if (geoProofs.length > 0) {
        result.score += 15;
        result.reasons.push('Géolocalisation confirmée');
      }

      // Calcul final
      if (result.score >= 70 && result.fraudRisk !== 'high') {
        result.isValid = true;
      }

      // Sauvegarder la validation
      await supabase.from('tasks').update({
        status: result.isValid ? 'completed' : 'rejected',
        verified_at: new Date().toISOString()
      }).eq('id', taskId);

      return result;
    } catch (error) {
      console.error('Erreur validation tâche:', error);
      return {
        isValid: false,
        score: 0,
        reasons: ['Erreur système lors de la validation'],
        fraudRisk: 'low',
        requiresManualReview: true
      };
    }
  }

  static async getUserTrustScore(userId: string): Promise<number> {
    try {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('status')
        .eq('user_id', userId);

      if (!tasks) return 50;

      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const rejectedTasks = tasks.filter(t => t.status === 'rejected').length;
      const totalTasks = tasks.length;

      let score = 50; // Score de base
      
      // Bonus pour les tâches complétées
      score += Math.min(completedTasks * 2, 30);
      
      // Malus pour les tâches rejetées
      if (totalTasks > 0) {
        const rejectionRate = rejectedTasks / totalTasks;
        score -= rejectionRate * 30;
      }

      return Math.max(0, Math.min(100, score));
    } catch (error) {
      console.error('Erreur calcul score confiance:', error);
      return 50;
    }
  }
}
