
import { supabase } from '@/integrations/supabase/client';

export interface ModerationAction {
  id: string;
  type: 'warning' | 'suspension' | 'ban' | 'content_removal';
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  duration?: number; // en heures
  appealable: boolean;
}

export interface ContentReport {
  id: string;
  reportedBy: string;
  contentType: 'ad' | 'user_profile' | 'comment' | 'task_proof';
  contentId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  evidence?: string[];
}

export class ModerationService {
  private static instance: ModerationService;

  static getInstance(): ModerationService {
    if (!ModerationService.instance) {
      ModerationService.instance = new ModerationService();
    }
    return ModerationService.instance;
  }

  // Auto-modération basée sur l'IA et des règles
  async autoModerate(content: any, contentType: string): Promise<ModerationAction | null> {
    try {
      const moderationResult = await this.analyzeContent(content, contentType);

      if (moderationResult.requiresAction) {
        return await this.createModerationAction({
          type: moderationResult.actionType,
          reason: moderationResult.reason,
          severity: moderationResult.severity,
          appealable: moderationResult.severity !== 'critical'
        });
      }

      return null;
    } catch (error) {
      console.error('Erreur auto-modération:', error);
      return null;
    }
  }

  private async analyzeContent(content: any, contentType: string) {
    const analysis = {
      requiresAction: false,
      actionType: 'warning' as const,
      reason: '',
      severity: 'low' as const
    };

    // Analyse du contenu textuel
    if (content.text) {
      const toxicityScore = await this.checkTextToxicity(content.text);
      if (toxicityScore > 0.8) {
        analysis.requiresAction = true;
        analysis.actionType = 'content_removal';
        analysis.reason = 'Contenu toxique détecté';
        analysis.severity = 'high';
      } else if (toxicityScore > 0.6) {
        analysis.requiresAction = true;
        analysis.actionType = 'warning';
        analysis.reason = 'Contenu potentiellement inapproprié';
        analysis.severity = 'medium';
      }
    }

    // Analyse des images (si présentes)
    if (content.images && content.images.length > 0) {
      const imageAnalysis = await this.analyzeImages(content.images);
      if (imageAnalysis.inappropriate) {
        analysis.requiresAction = true;
        analysis.actionType = 'content_removal';
        analysis.reason = 'Contenu visuel inapproprié';
        analysis.severity = 'high';
      }
    }

    // Détection de spam
    if (await this.isSpam(content)) {
      analysis.requiresAction = true;
      analysis.actionType = 'warning';
      analysis.reason = 'Contenu spam détecté';
      analysis.severity = 'medium';
    }

    // Vérification des liens malveillants
    if (content.links) {
      const maliciousLinks = await this.checkMaliciousLinks(content.links);
      if (maliciousLinks.length > 0) {
        analysis.requiresAction = true;
        analysis.actionType = 'content_removal';
        analysis.reason = 'Liens malveillants détectés';
        analysis.severity = 'critical';
      }
    }

    return analysis;
  }

  private async checkTextToxicity(text: string): Promise<number> {
    // Simulation d'une API de détection de toxicité
    const toxicWords = [
      'spam', 'scam', 'fraude', 'arnaque', 'fake', 'faux',
      'idiot', 'stupide', 'nul', 'débile'
    ];

    let toxicityScore = 0;
    const words = text.toLowerCase().split(' ');
    
    for (const word of words) {
      if (toxicWords.includes(word)) {
        toxicityScore += 0.3;
      }
    }

    // Vérifier la répétition excessive (spam)
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      toxicityScore += 0.4;
    }

    return Math.min(toxicityScore, 1);
  }

  private async analyzeImages(images: string[]): Promise<{ inappropriate: boolean }> {
    // Simulation d'analyse d'images
    // En production, vous utiliseriez une API comme Google Vision API ou AWS Rekognition
    
    for (const imageUrl of images) {
      // Vérifier la taille et le format
      if (!this.isValidImageFormat(imageUrl)) {
        return { inappropriate: true };
      }
    }

    return { inappropriate: false };
  }

  private isValidImageFormat(url: string): boolean {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  private async isSpam(content: any): Promise<boolean> {
    // Détecter la répétition excessive
    if (content.text) {
      const words = content.text.split(' ');
      const wordCount = new Map();
      
      for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }

      // Si un mot apparaît plus de 5 fois dans un texte court
      for (const count of wordCount.values()) {
        if (count > 5 && words.length < 50) {
          return true;
        }
      }
    }

    return false;
  }

  private async checkMaliciousLinks(links: string[]): Promise<string[]> {
    const maliciousLinks: string[] = [];
    const suspiciousDomains = [
      'bit.ly', 'tinyurl.com', 'short.link', // Raccourcisseurs d'URL suspects
      'phishing-site.com', 'malware-host.com' // Domaines connus malveillants
    ];

    for (const link of links) {
      try {
        const url = new URL(link);
        if (suspiciousDomains.some(domain => url.hostname.includes(domain))) {
          maliciousLinks.push(link);
        }
      } catch {
        // URL invalide
        maliciousLinks.push(link);
      }
    }

    return maliciousLinks;
  }

  async reportContent(report: Omit<ContentReport, 'id' | 'status'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('content_reports')
        .insert({
          reported_by: report.reportedBy,
          content_type: report.contentType,
          content_id: report.contentId,
          reason: report.reason,
          evidence: report.evidence,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Déclencher une analyse automatique
      await this.triggerAutoReview(data.id);

      return data.id;
    } catch (error) {
      console.error('Erreur signalement contenu:', error);
      throw error;
    }
  }

  private async triggerAutoReview(reportId: string) {
    // Implémenter la logique de révision automatique
    setTimeout(async () => {
      try {
        const { data: report } = await supabase
          .from('content_reports')
          .select('*')
          .eq('id', reportId)
          .single();

        if (report) {
          // Analyser le contenu signalé
          const content = await this.getReportedContent(report.content_type, report.content_id);
          const moderationAction = await this.autoModerate(content, report.content_type);

          if (moderationAction) {
            await this.executeModerationAction(moderationAction, report.content_id);
            
            // Marquer le rapport comme résolu
            await supabase
              .from('content_reports')
              .update({ 
                status: 'resolved',
                reviewed_at: new Date().toISOString()
              })
              .eq('id', reportId);
          }
        }
      } catch (error) {
        console.error('Erreur révision automatique:', error);
      }
    }, 5000); // Délai de 5 secondes pour la démonstration
  }

  private async getReportedContent(contentType: string, contentId: string) {
    switch (contentType) {
      case 'ad':
        const { data: ad } = await supabase
          .from('ads')
          .select('*')
          .eq('id', contentId)
          .single();
        return ad;
      
      case 'user_profile':
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', contentId)
          .single();
        return profile;
      
      default:
        return null;
    }
  }

  private async createModerationAction(action: Omit<ModerationAction, 'id'>): Promise<ModerationAction> {
    const { data, error } = await supabase
      .from('moderation_actions')
      .insert({
        type: action.type,
        reason: action.reason,
        severity: action.severity,
        duration: action.duration,
        appealable: action.appealable,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async executeModerationAction(action: ModerationAction, targetId: string) {
    try {
      switch (action.type) {
        case 'content_removal':
          await this.removeContent(targetId);
          break;
        
        case 'warning':
          await this.issueWarning(targetId, action.reason);
          break;
        
        case 'suspension':
          await this.suspendUser(targetId, action.duration || 24);
          break;
        
        case 'ban':
          await this.banUser(targetId);
          break;
      }

      // Enregistrer l'action
      await supabase
        .from('moderation_actions')
        .update({
          executed_at: new Date().toISOString(),
          target_id: targetId
        })
        .eq('id', action.id);

    } catch (error) {
      console.error('Erreur exécution action modération:', error);
    }
  }

  private async removeContent(contentId: string) {
    // Marquer le contenu comme supprimé
    await supabase
      .from('ads')
      .update({ status: 'removed' })
      .eq('id', contentId);
  }

  private async issueWarning(userId: string, reason: string) {
    // Créer un avertissement
    await supabase
      .from('user_warnings')
      .insert({
        user_id: userId,
        reason: reason,
        issued_at: new Date().toISOString()
      });
  }

  private async suspendUser(userId: string, duration: number) {
    const suspendUntil = new Date(Date.now() + duration * 3600000); // duration en heures
    
    await supabase
      .from('users')
      .update({
        status: 'suspended',
        suspended_until: suspendUntil.toISOString()
      })
      .eq('id', userId);
  }

  private async banUser(userId: string) {
    await supabase
      .from('users')
      .update({ status: 'banned' })
      .eq('id', userId);
  }

  // Système d'appel
  async submitAppeal(actionId: string, reason: string, evidence?: string[]) {
    try {
      const { error } = await supabase
        .from('moderation_appeals')
        .insert({
          action_id: actionId,
          reason: reason,
          evidence: evidence,
          status: 'pending',
          submitted_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur soumission appel:', error);
      return false;
    }
  }
}
