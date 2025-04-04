
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useLoginService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ phone, password });
      
      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithUsername = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Use the newly added columns to the profiles table
      // Check if profile data exists and get related email/phone
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('username, email, phone')
        .eq('username', username)
        .maybeSingle();
      
      if (profileError || !data) {
        throw new Error("Nom d'utilisateur non trouvé");
      }
      
      if (data.email) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password
        });
        
        if (error) throw error;
      } else if (data.phone) {
        const { error } = await supabase.auth.signInWithPassword({
          phone: data.phone,
          password
        });
        
        if (error) throw error;
      } else {
        throw new Error("Aucune méthode de connexion disponible pour cet utilisateur");
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Lien magique envoyé",
        description: "Vérifiez votre boîte de réception pour vous connecter",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error.message || "Une erreur est survenue lors de l'envoi du lien magique",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion avec Google",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signInWithPhone,
    signInWithUsername,
    signInWithMagicLink,
    signInWithGoogle
  };
};
