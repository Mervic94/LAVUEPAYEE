
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useRegisterService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();
        
      if (existingUser) {
        throw new Error("Cette adresse email est déjà utilisée");
      }
      
      // Check if username already exists
      if (userData.username) {
        const { data: existingUsername } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', userData.username)
          .single();
          
        if (existingUsername) {
          throw new Error("Ce nom d'utilisateur est déjà pris");
        }
      }
      
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
      console.error("Registration error:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      if (error.message.includes("already registered")) {
        errorMessage = "Cette adresse email est déjà utilisée. Essayez de vous connecter.";
      } else if (error.message.includes("already") || error.message.includes("déjà")) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithPhone = async (phone: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Check if phone already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('phone')
        .eq('phone', phone)
        .single();
        
      if (existingUser) {
        throw new Error("Ce numéro de téléphone est déjà utilisé");
      }
      
      // Check if username already exists
      if (userData.username) {
        const { data: existingUsername } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', userData.username)
          .single();
          
        if (existingUsername) {
          throw new Error("Ce nom d'utilisateur est déjà pris");
        }
      }
      
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
      console.error("Phone registration error:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      if (error.message.includes("already registered")) {
        errorMessage = "Ce numéro de téléphone est déjà utilisé. Essayez de vous connecter.";
      } else if (error.message.includes("already") || error.message.includes("déjà")) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: errorMessage,
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
