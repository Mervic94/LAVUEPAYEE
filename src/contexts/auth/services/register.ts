
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useRegisterService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });
      
      if (error) throw error;
      
      // Add sponsor relationship if sponsor username is provided
      if (userData.sponsor_username) {
        try {
          const { data: sponsorData, error: sponsorError } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', userData.sponsor_username)
            .single();
            
          if (sponsorError || !sponsorData) {
            console.log('Sponsor not found, but continuing registration');
          } else {
            // Store this for later when profile is created
            localStorage.setItem('sponsor_id', sponsorData.id);
          }
        } catch (err) {
          console.error('Error checking sponsor:', err);
        }
      }
      
      toast({
        title: "Inscription réussie!",
        description: "Un email de confirmation a été envoyé à votre adresse.",
      });
      
      navigate('/verify-email');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithPhone = async (phone: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Check if sponsor exists if provided
      if (userData.sponsor_username) {
        try {
          const { data: sponsorData, error: sponsorError } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', userData.sponsor_username)
            .single();
            
          if (sponsorError || !sponsorData) {
            console.log('Sponsor not found, but continuing registration');
          } else {
            // Store this for later when profile is created
            localStorage.setItem('sponsor_id', sponsorData.id);
          }
        } catch (err) {
          console.error('Error checking sponsor:', err);
        }
      }
      
      const { error } = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Code de vérification envoyé!",
        description: "Un code de vérification a été envoyé à votre numéro de téléphone.",
      });
      
      localStorage.setItem('pendingPhone', phone);
      
      navigate('/verify-phone');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    signUpWithPhone
  };
};
