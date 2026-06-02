
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';
import { Sentry } from '@/integrations/sentry';

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
}

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback((error: any, context?: string) => {
    console.error(`Error in ${context || 'application'}:`, error);

    let message = 'Une erreur inattendue s\'est produite';
    
    if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    // Personnaliser les messages selon le type d'erreur
    if (error?.code === 'auth/user-not-found') {
      message = 'Utilisateur non trouvé';
    } else if (error?.code === 'auth/wrong-password') {
      message = 'Mot de passe incorrect';
    } else if (error?.code === 'network-request-failed') {
      message = 'Erreur de connexion réseau';
    }

    toast({
      title: "Erreur",
      description: message,
      variant: "destructive"
    });

    // Log pour le monitoring
    if (process.env.NODE_ENV === 'production') {
      // Ici on pourrait envoyer vers un service de monitoring
      console.error('Production error:', { error, context, timestamp: new Date().toISOString() });
    }
  }, [toast]);

  const handleSuccess = useCallback((message: string) => {
    toast({
      title: "Succès",
      description: message,
      variant: "default"
    });
  }, [toast]);

  return { handleError, handleSuccess };
};
