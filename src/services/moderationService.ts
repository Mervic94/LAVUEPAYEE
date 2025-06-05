
import { supabase } from '@/integrations/supabase/client';

export interface ContentReport {
  id: string;
  reportedBy: string;
  contentType: 'ad' | 'user_profile' | 'comment' | 'task_proof';
  contentId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  evidence?: string[];
  createdAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ModerationAction {
  id: string;
  type: 'warning' | 'content_removal' | 'account_suspension' | 'account_ban';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  targetUserId: string;
  moderatorId: string;
  createdAt: string;
  expiresAt?: string;
}

export interface AutoModerationResult {
  action: 'allow' | 'flag' | 'block';
  confidence: number;
  reasons: string[];
  suggestedAction?: ModerationAction['type'];
}

export class ModerationService {
  private static instance: ModerationService;

  static getInstance(): ModerationService {
    if (!ModerationService.instance) {
      ModerationService.instance = new ModerationService();
    }
    return ModerationService.instance;
  }

  // Auto-modération basique
  async autoModerateContent(content: string, contentType: string): Promise<AutoModerationResult> {
    const suspiciousWords = ['spam', 'scam', 'fake', 'fraud', 'hack', 'cheat'];
    const bannedWords = ['fuck', 'shit', 'damn'];
    
    const lowerContent = content.toLowerCase();
    let flagged = false;
    let blocked = false;
    const reasons: string[] = [];

    // Vérifier les mots suspects
    if (suspiciousWords.some(word => lowerContent.includes(word))) {
      flagged = true;
      reasons.push('Contenu potentiellement suspect détecté');
    }

    // Vérifier les mots interdits
    if (bannedWords.some(word => lowerContent.includes(word))) {
      blocked = true;
      reasons.push('Langage inapproprié détecté');
    }

    // Vérifier la longueur excessive (possible spam)
    if (content.length > 1000 && contentType === 'comment') {
      flagged = true;
      reasons.push('Commentaire excessivement long');
    }

    // Détection de liens suspects
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex);
    if (urls && urls.length > 3) {
      flagged = true;
      reasons.push('Trop de liens détectés');
    }

    if (blocked) {
      return {
        action: 'block',
        confidence: 0.9,
        reasons,
        suggestedAction: 'content_removal'
      };
    }

    if (flagged) {
      return {
        action: 'flag',
        confidence: 0.7,
        reasons,
        suggestedAction: 'warning'
      };
    }

    return {
      action: 'allow',
      confidence: 0.9,
      reasons: ['Contenu approuvé automatiquement']
    };
  }

  // Signaler du contenu
  async reportContent(report: Omit<ContentReport, 'id' | 'createdAt'>): Promise<string | null> {
    try {
      // Pour l'instant, utiliser un stockage local en attendant la table Supabase
      const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simuler le stockage
      const reportData = {
        ...report,
        id: reportId,
        createdAt: new Date().toISOString()
      };

      console.log('Rapport créé:', reportData);
      
      return reportId;
    } catch (error) {
      console.error('Erreur création rapport:', error);
      return null;
    }
  }

  // Récupérer les rapports (mock pour l'instant)
  async getReports(): Promise<ContentReport[]> {
    // Mock data en attendant la vraie base de données
    return [
      {
        id: '1',
        reportedBy: 'user123',
        contentType: 'ad',
        contentId: 'ad456',
        reason: 'Contenu inapproprié',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        reportedBy: 'user789',
        contentType: 'user_profile',
        contentId: 'user456',
        reason: 'Spam',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Modérer un rapport
  async moderateReport(reportId: string, action: 'approve' | 'dismiss', moderatorId: string): Promise<boolean> {
    try {
      console.log(`Rapport ${reportId} ${action === 'approve' ? 'approuvé' : 'rejeté'} par ${moderatorId}`);
      
      if (action === 'approve') {
        // Appliquer l'action de modération
        await this.applyModerationAction(reportId, 'warning', 'low', 'Rapport approuvé', 'target_user', moderatorId);
      }

      return true;
    } catch (error) {
      console.error('Erreur modération rapport:', error);
      return false;
    }
  }

  // Appliquer une action de modération
  async applyModerationAction(
    reportId: string,
    actionType: ModerationAction['type'],
    severity: ModerationAction['severity'],
    reason: string,
    targetUserId: string,
    moderatorId: string
  ): Promise<boolean> {
    try {
      const actionData: ModerationAction = {
        id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: actionType,
        severity,
        reason,
        targetUserId,
        moderatorId,
        createdAt: new Date().toISOString()
      };

      // Calculer l'expiration pour les suspensions
      if (actionType === 'account_suspension') {
        const expirationDays = severity === 'low' ? 1 : severity === 'medium' ? 7 : 30;
        actionData.expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toISOString();
      }

      console.log('Action de modération appliquée:', actionData);
      
      return true;
    } catch (error) {
      console.error('Erreur application action modération:', error);
      return false;
    }
  }

  // Vérifier le statut de modération d'un utilisateur
  async getUserModerationStatus(userId: string): Promise<{
    isBanned: boolean;
    isSuspended: boolean;
    warnings: number;
    suspensionExpiresAt?: string;
  }> {
    try {
      // Mock data - dans un vrai système, on interrogerait la base de données
      return {
        isBanned: false,
        isSuspended: false,
        warnings: 0
      };
    } catch (error) {
      console.error('Erreur vérification statut modération:', error);
      return {
        isBanned: false,
        isSuspended: false,
        warnings: 0
      };
    }
  }

  // Calculer un score de confiance pour un utilisateur
  async calculateUserTrustScore(userId: string): Promise<number> {
    try {
      // Facteurs à considérer :
      // - Ancienneté du compte
      // - Nombre de tâches complétées avec succès
      // - Rapports reçus
      // - Actions de modération passées
      
      // Mock calculation
      const baseScore = 50;
      const completedTasks = 25; // À récupérer de la DB
      const reportsReceived = 2; // À récupérer de la DB
      const accountAge = 30; // jours
      
      let score = baseScore;
      score += Math.min(completedTasks * 2, 40); // Max +40 pour les tâches
      score -= reportsReceived * 10; // -10 par rapport
      score += Math.min(accountAge, 10); // Max +10 pour l'ancienneté
      
      return Math.max(0, Math.min(100, score));
    } catch (error) {
      console.error('Erreur calcul score confiance:', error);
      return 50; // Score neutre par défaut
    }
  }

  // Détecter les comportements suspects
  async detectSuspiciousActivity(userId: string): Promise<{
    suspicious: boolean;
    reasons: string[];
    riskLevel: 'low' | 'medium' | 'high';
  }> {
    try {
      const reasons: string[] = [];
      let riskLevel: 'low' | 'medium' | 'high' = 'low';

      // Mock detection logic
      // Dans un vrai système, on analyserait :
      // - Fréquence de connexion
      // - Patterns de clic suspects
      // - Temps passé sur les tâches
      // - Géolocalisation incohérente
      
      return {
        suspicious: false,
        reasons,
        riskLevel
      };
    } catch (error) {
      console.error('Erreur détection activité suspecte:', error);
      return {
        suspicious: false,
        reasons: [],
        riskLevel: 'low'
      };
    }
  }
}
