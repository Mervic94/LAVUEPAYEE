
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAccountManagementService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
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
        description: "Les instructions de réinitialisation ont été envoyées à votre adresse email",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de l'email",
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
        description: "Votre mot de passe a été modifié avec succès.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
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
        email: newEmail,
        // Fix the options issue by using the correct structure
        options: {
          emailRedirectTo: `${window.location.origin}/profile`
        }
      } as any); // Use type assertion as a temporary fix
      
      if (error) throw error;
      
      toast({
        title: "Demande de changement d'email envoyée",
        description: "Un email de vérification a été envoyé à votre nouvelle adresse email.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
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
