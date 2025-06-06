import { ProofData, TaskSubmission, TaskType } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  score: number;
  reasons: string[];
  fraudRisk: 'low' | 'medium' | 'high';
  requiresManualReview: boolean;
}

export interface FraudDetectionResult {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  indicators: string[];
  recommended: 'approve' | 'review' | 'reject';
}

export interface TaskValidation {
  id: string;
  taskId: string;
  userId: string;
  status: 'approved' | 'rejected' | 'pending';
  score: number;
  validatedAt: string;
  validatedBy: string;
}

export class TaskValidationService {
  private static instance: TaskValidationService;

  static getInstance(): TaskValidationService {
    if (!TaskValidationService.instance) {
      TaskValidationService.instance = new TaskValidationService();
    }
    return TaskValidationService.instance;
  }

  async validateTaskCompletion(submission: TaskSubmission): Promise<ValidationResult> {
    try {
      const result: ValidationResult = {
        isValid: false,
        score: 0,
        reasons: [],
        fraudRisk: 'low',
        requiresManualReview: false
      };

      // Validation de base
      if (!submission.proof || submission.proof.length === 0) {
        result.reasons.push('Aucune preuve fournie');
        return result;
      }

      // Validation du temps
      const timeSpent = submission.completionTime - submission.startTime;
      if (timeSpent < 5000) { // Moins de 5 secondes
        result.reasons.push('Temps de completion suspect');
        result.fraudRisk = 'high';
        result.requiresManualReview = true;
      }

      // Validation des preuves
      const proofValidation = await this.validateProof(submission.proof, submission.taskType);
      result.score += proofValidation.score;
      result.reasons.push(...proofValidation.reasons);

      // Calcul du score final
      if (result.score >= 70 && result.fraudRisk !== 'high') {
        result.isValid = true;
      }

      // Enregistrer la validation (mock)
      console.log('Validation de tâche:', { 
        taskId: submission.taskId, 
        userId: submission.userId,
        result 
      });

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

  async validateProof(proof: ProofData[], taskType: TaskType): Promise<{ score: number; reasons: string[] }> {
    let score = 0;
    const reasons: string[] = [];

    for (const item of proof) {
      switch (item.type) {
        case 'screenshot':
          if (item.data && item.data.length > 1000) { // Vérifier la taille minimale
            score += 30;
            reasons.push('Capture d\'écran valide');
          } else {
            reasons.push('Capture d\'écran invalide ou trop petite');
          }
          break;

        case 'click_tracking':
          if (item.metadata?.clickCount && item.metadata.clickCount > 0) {
            score += 20;
            reasons.push('Clics trackés correctement');
          }
          break;

        case 'time_spent':
          const timeSpent = item.metadata?.timeSpent || 0;
          if (timeSpent >= 10000) { // Au moins 10 secondes
            score += 25;
            reasons.push('Temps de visionnage suffisant');
          } else {
            reasons.push('Temps de visionnage insuffisant');
          }
          break;

        case 'geolocation':
          if (item.metadata?.latitude && item.metadata?.longitude) {
            score += 15;
            reasons.push('Géolocalisation confirmée');
          }
          break;

        default:
          reasons.push(`Type de preuve non reconnu: ${item.type}`);
      }
    }

    return { score: Math.min(score, 100), reasons };
  }

  async calculateUserTrustScore(userId: string): Promise<number> {
    try {
      // Mock calculation - dans un vrai système, analyser l'historique
      const baseScore = 50;
      const completedTasks = 25; // Récupérer de la DB
      const successRate = 0.85; // Taux de succès
      const accountAge = 30; // Jours

      let score = baseScore;
      score += Math.min(completedTasks * 1.5, 30); // Max +30 pour les tâches
      score += successRate * 15; // Max +15 pour le taux de succès
      score += Math.min(accountAge * 0.5, 10); // Max +10 pour l'ancienneté

      return Math.max(0, Math.min(100, score));
    } catch (error) {
      console.error('Erreur calcul score confiance:', error);
      return 50;
    }
  }

  async detectFraud(submission: TaskSubmission): Promise<FraudDetectionResult> {
    const indicators: string[] = [];
    let riskScore = 0;

    // Analyse du timing
    const timeSpent = submission.completionTime - submission.startTime;
    if (timeSpent < 3000) {
      indicators.push('Completion extrêmement rapide');
      riskScore += 40;
    } else if (timeSpent < 5000) {
      indicators.push('Completion très rapide');
      riskScore += 20;
    }

    // Analyse des patterns
    if (submission.proof.length === 0) {
      indicators.push('Aucune preuve fournie');
      riskScore += 50;
    }

    // Analyse géographique (mock)
    const userTrustScore = await this.calculateUserTrustScore(submission.userId);
    if (userTrustScore < 30) {
      indicators.push('Score de confiance utilisateur faible');
      riskScore += 25;
    }

    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 30) riskLevel = 'medium';

    return {
      riskLevel,
      riskScore,
      indicators,
      recommended: riskLevel === 'high' ? 'reject' : riskLevel === 'medium' ? 'review' : 'approve'
    };
  }

  async getValidationHistory(userId: string): Promise<TaskValidation[]> {
    // Mock data - dans un vrai système, récupérer depuis la base de données
    return [
      {
        id: '1',
        taskId: 'task_123',
        userId,
        status: 'approved',
        score: 85,
        validatedAt: new Date().toISOString(),
        validatedBy: 'auto'
      },
      {
        id: '2',
        taskId: 'task_124',
        userId,
        status: 'rejected',
        score: 25,
        validatedAt: new Date(Date.now() - 86400000).toISOString(),
        validatedBy: 'moderator_1'
      }
    ];
  }

  async submitTaskValidation(taskId: string, userId: string, result: ValidationResult): Promise<boolean> {
    try {
      // Mock - dans un vrai projet, sauvegarder en base de données
      console.log('Validation sauvegardée:', {
        taskId,
        userId,
        status: result.isValid ? 'approved' : 'rejected',
        score: result.score,
        reasons: result.reasons,
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Erreur sauvegarde validation:', error);
      return false;
    }
  }
}
