
import { supabase } from '@/integrations/supabase/client';

export interface ModerationResult {
  action: 'allow' | 'flag' | 'block';
  confidence: number;
  reasons: string[];
}

export interface ContentReport {
  id: string;
  content: string;
  contentType: string;
  reportType: 'spam' | 'inappropriate' | 'fake' | 'other';
  reporterId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export class ModerationService {
  private static instance: ModerationService;

  private static suspiciousWords = [
    'spam', 'scam', 'fake', 'fraud', 'hack', 'cheat', 'bot', 'abuse'
  ];

  private static bannedWords = [
    'fuck', 'shit', 'damn', 'asshole', 'bitch'
  ];

  static getInstance(): ModerationService {
    if (!ModerationService.instance) {
      ModerationService.instance = new ModerationService();
    }
    return ModerationService.instance;
  }

  async getReports(): Promise<ContentReport[]> {
    try {
      const { data: reports, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('action', 'report_content')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (reports || []).map(report => ({
        id: report.id,
        content: report.new_values?.content || '',
        contentType: report.entity_type,
        reportType: report.new_values?.reason || 'other',
        reporterId: report.user_id || '',
        reportedBy: report.user_id || '',
        reason: report.new_values?.reason || '',
        status: 'pending',
        createdAt: new Date(report.created_at)
      }));
    } catch (error) {
      console.error('Erreur chargement rapports:', error);
      return [];
    }
  }

  async moderateReport(reportId: string, action: 'approve' | 'dismiss', moderatorId: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('audit_logs').insert({
        user_id: moderatorId,
        action: `moderate_${action}`,
        entity_type: 'report',
        entity_id: reportId,
        new_values: { action, moderatedAt: new Date().toISOString() }
      });

      return !error;
    } catch (error) {
      console.error('Erreur modération rapport:', error);
      return false;
    }
  }

  static async moderateContent(content: string, contentType: string): Promise<ModerationResult> {
    const result: ModerationResult = {
      action: 'allow',
      confidence: 0.9,
      reasons: ['Contenu approuvé automatiquement']
    };

    const lowerContent = content.toLowerCase();

    // Vérifier les mots interdits
    const hasBannedWords = this.bannedWords.some(word => lowerContent.includes(word));
    if (hasBannedWords) {
      result.action = 'block';
      result.confidence = 0.95;
      result.reasons = ['Langage inapproprié détecté'];
      return result;
    }

    // Vérifier les mots suspects
    const hasSuspiciousWords = this.suspiciousWords.some(word => lowerContent.includes(word));
    if (hasSuspiciousWords) {
      result.action = 'flag';
      result.confidence = 0.7;
      result.reasons = ['Contenu potentiellement suspect'];
      return result;
    }

    // Vérifier la longueur excessive
    if (content.length > 1000 && contentType === 'comment') {
      result.action = 'flag';
      result.confidence = 0.6;
      result.reasons = ['Commentaire excessivement long'];
      return result;
    }

    // Détecter les liens suspects
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex);
    if (urls && urls.length > 3) {
      result.action = 'flag';
      result.confidence = 0.8;
      result.reasons = ['Trop de liens détectés'];
      return result;
    }

    return result;
  }

  static async reportContent(
    reportedBy: string,
    contentType: string,
    contentId: string,
    reason: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from('audit_logs').insert({
        user_id: reportedBy,
        action: 'report_content',
        entity_type: contentType,
        entity_id: contentId,
        new_values: { reason }
      });

      return !error;
    } catch (error) {
      console.error('Erreur signalement:', error);
      return false;
    }
  }

  static async getUserModerationStatus(userId: string) {
    try {
      const { data: reports } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('entity_id', userId)
        .eq('action', 'report_content');

      const reportCount = reports?.length || 0;

      return {
        isBanned: reportCount >= 10,
        isSuspended: reportCount >= 5,
        warnings: reportCount,
        riskLevel: reportCount >= 5 ? 'high' : reportCount >= 2 ? 'medium' : 'low'
      };
    } catch (error) {
      console.error('Erreur statut modération:', error);
      return {
        isBanned: false,
        isSuspended: false,
        warnings: 0,
        riskLevel: 'low' as const
      };
    }
  }
}
