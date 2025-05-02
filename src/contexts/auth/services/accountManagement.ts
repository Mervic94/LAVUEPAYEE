
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAccountManagementService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Let the navigation be handled by the component using this hook
      // or by the auth state change listener
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de réinitialisation",
        description: error.message || "Une erreur est survenue lors de l'envoi de l'email de réinitialisation",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été mis à jour avec succès",
      });
      
      // Navigation will be handled by the component
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description: error.message || "Une erreur est survenue lors de la mise à jour du mot de passe",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (newEmail: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ 
        email: newEmail 
      });
      
      if (error) throw error;
      
      toast({
        title: "Email mis à jour",
        description: "Un email de confirmation a été envoyé à votre nouvelle adresse",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description: error.message || "Une erreur est survenue lors de la mise à jour de l'email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    resetPassword,
    updatePassword,
    updateEmail
  };
};
