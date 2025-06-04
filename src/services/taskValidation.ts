
import { supabase } from '@/integrations/supabase/client';

export interface TaskValidationResult {
  isValid: boolean;
  score: number;
  reasons: string[];
  approved: boolean;
}

export interface ValidationCriteria {
  minViewDuration: number;
  requiredInteractions: string[];
  fraudDetection: boolean;
  geoValidation: boolean;
}

export class TaskValidationService {
  private static instance: TaskValidationService;

  static getInstance(): TaskValidationService {
    if (!TaskValidationService.instance) {
      TaskValidationService.instance = new TaskValidationService();
    }
    return TaskValidationService.instance;
  }

  async validateTask(taskId: string, proofData: any): Promise<TaskValidationResult> {
    try {
      // Récupérer les détails de la tâche
      const { data: task, error: taskError } = await supabase
        .from('tasks')
        .select(`
          *,
          ads (
            type,
            title,
            content
          )
        `)
        .eq('id', taskId)
        .single();

      if (taskError || !task) {
        throw new Error('Tâche introuvable');
      }

      const validationResult: TaskValidationResult = {
        isValid: true,
        score: 100,
        reasons: [],
        approved: false
      };

      // Validation selon le type de tâche
      switch (task.type) {
        case 'view_ad':
          await this.validateViewTask(proofData, validationResult);
          break;
        case 'click_ad':
          await this.validateClickTask(proofData, validationResult);
          break;
        case 'share_ad':
          await this.validateShareTask(proofData, validationResult);
          break;
        case 'survey':
          await this.validateSurveyTask(proofData, validationResult);
          break;
        default:
          validationResult.isValid = false;
          validationResult.reasons.push('Type de tâche non reconnu');
      }

      // Détection de fraude générale
      await this.detectFraud(taskId, proofData, validationResult);

      // Validation géographique
      await this.validateGeolocation(proofData, validationResult);

      // Calcul du score final
      validationResult.approved = validationResult.isValid && validationResult.score >= 70;

      return validationResult;
    } catch (error) {
      console.error('Erreur validation tâche:', error);
      return {
        isValid: false,
        score: 0,
        reasons: ['Erreur technique lors de la validation'],
        approved: false
      };
    }
  }

  private async validateViewTask(proofData: any, result: TaskValidationResult) {
    const { viewDuration, interactionEvents, timestamp } = proofData;

    // Vérifier la durée minimale de visionnage
    if (viewDuration < 15) {
      result.score -= 30;
      result.reasons.push('Durée de visionnage insuffisante');
    }

    // Vérifier les interactions (clics, mouvements de souris)
    if (!interactionEvents || interactionEvents.length < 3) {
      result.score -= 20;
      result.reasons.push('Interactions insuffisantes détectées');
    }

    // Vérifier la cohérence temporelle
    const now = Date.now();
    if (Math.abs(now - timestamp) > 300000) { // 5 minutes
      result.score -= 40;
      result.reasons.push('Horodatage suspect');
    }
  }

  private async validateClickTask(proofData: any, result: TaskValidationResult) {
    const { clickCoordinates, targetUrl, referrer } = proofData;

    // Vérifier les coordonnées du clic
    if (!clickCoordinates || clickCoordinates.x < 0 || clickCoordinates.y < 0) {
      result.score -= 50;
      result.reasons.push('Coordonnées de clic invalides');
    }

    // Vérifier l'URL de destination
    if (!targetUrl || !this.isValidUrl(targetUrl)) {
      result.score -= 30;
      result.reasons.push('URL de destination invalide');
    }

    // Vérifier le referrer
    if (!referrer || !referrer.includes(window.location.hostname)) {
      result.score -= 20;
      result.reasons.push('Referrer suspect');
    }
  }

  private async validateShareTask(proofData: any, result: TaskValidationResult) {
    const { platform, shareUrl, engagementMetrics } = proofData;

    // Vérifier la plateforme de partage
    const allowedPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'whatsapp'];
    if (!allowedPlatforms.includes(platform)) {
      result.score -= 40;
      result.reasons.push('Plateforme de partage non autorisée');
    }

    // Vérifier l'URL partagée
    if (!shareUrl || !this.isValidUrl(shareUrl)) {
      result.score -= 50;
      result.reasons.push('URL de partage invalide');
    }

    // Analyser les métriques d'engagement (si disponibles)
    if (engagementMetrics && engagementMetrics.likes > 1000) {
      result.score += 10; // Bonus pour engagement élevé
      result.reasons.push('Engagement élevé détecté');
    }
  }

  private async validateSurveyTask(proofData: any, result: TaskValidationResult) {
    const { responses, completionTime, consistencyScore } = proofData;

    // Vérifier la complétude des réponses
    if (!responses || Object.keys(responses).length < 5) {
      result.score -= 30;
      result.reasons.push('Réponses incomplètes');
    }

    // Vérifier le temps de completion
    if (completionTime < 30) { // Moins de 30 secondes
      result.score -= 40;
      result.reasons.push('Temps de completion trop rapide');
    }

    // Vérifier la cohérence des réponses
    if (consistencyScore < 0.7) {
      result.score -= 25;
      result.reasons.push('Réponses incohérentes détectées');
    }
  }

  private async detectFraud(taskId: string, proofData: any, result: TaskValidationResult) {
    const { userAgent, ipAddress, deviceFingerprint } = proofData;

    // Vérifier les tentatives multiples du même utilisateur
    const { data: recentTasks } = await supabase
      .from('tasks')
      .select('id')
      .eq('user_id', proofData.userId)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString()) // 1 heure
      .neq('id', taskId);

    if (recentTasks && recentTasks.length > 10) {
      result.score -= 30;
      result.reasons.push('Activité suspecte: trop de tâches en peu de temps');
    }

    // Vérifier l'empreinte digitale de l'appareil
    if (deviceFingerprint) {
      const { data: duplicateDevices } = await supabase
        .from('task_validations')
        .select('id')
        .eq('device_fingerprint', deviceFingerprint)
        .gte('created_at', new Date(Date.now() - 86400000).toISOString()); // 24 heures

      if (duplicateDevices && duplicateDevices.length > 5) {
        result.score -= 40;
        result.reasons.push('Appareil utilisé par plusieurs comptes');
      }
    }

    // Vérifier la cohérence du User-Agent
    if (!userAgent || userAgent.includes('bot') || userAgent.includes('crawler')) {
      result.score -= 60;
      result.reasons.push('User-Agent suspect détecté');
    }
  }

  private async validateGeolocation(proofData: any, result: TaskValidationResult) {
    const { latitude, longitude, country } = proofData.geolocation || {};

    if (!latitude || !longitude) {
      result.score -= 10;
      result.reasons.push('Géolocalisation manquante');
      return;
    }

    // Vérifier que la localisation est cohérente avec le pays déclaré
    // (Ici vous pourriez utiliser une API de géocodage)
    
    // Vérifier les coordonnées suspectes (0,0 ou valeurs par défaut)
    if (latitude === 0 && longitude === 0) {
      result.score -= 30;
      result.reasons.push('Coordonnées géographiques suspectes');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async saveValidationResult(taskId: string, result: TaskValidationResult, proofData: any) {
    try {
      const { error } = await supabase
        .from('task_validations')
        .insert({
          task_id: taskId,
          is_valid: result.isValid,
          score: result.score,
          reasons: result.reasons,
          approved: result.approved,
          proof_data: proofData,
          validated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Mettre à jour le statut de la tâche
      if (result.approved) {
        await supabase
          .from('tasks')
          .update({
            status: 'completed',
            verified_at: new Date().toISOString()
          })
          .eq('id', taskId);
      } else {
        await supabase
          .from('tasks')
          .update({
            status: 'rejected',
            verified_at: new Date().toISOString()
          })
          .eq('id', taskId);
      }

      return true;
    } catch (error) {
      console.error('Erreur sauvegarde validation:', error);
      return false;
    }
  }
}
