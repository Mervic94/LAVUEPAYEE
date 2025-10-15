
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLoginService = (setIsLoading: (isLoading: boolean) => void) => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Navigation will be handled through onAuthStateChange
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Une erreur est survenue lors de la connexion";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Identifiants invalides. Veuillez vérifier votre email et mot de passe.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Email non confirmé. Veuillez vérifier votre boîte de réception.";
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
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
      
      // Navigation will be handled through onAuthStateChange
    } catch (error: any) {
      console.error("Phone login error:", error);
      
      let errorMessage = "Une erreur est survenue lors de la connexion";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Identifiants invalides. Veuillez vérifier votre numéro et mot de passe.";
      } else if (error.message.includes("Phone not confirmed")) {
        errorMessage = "Téléphone non confirmé. Veuillez vérifier votre téléphone.";
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithUsername = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Utilise la fonction sécurisée pour obtenir les credentials sans exposer toutes les données
      const { data, error: rpcError } = await supabase
        .rpc('get_credentials_by_username', { lookup_username: username });
      
      if (rpcError || !data || data.length === 0) {
        throw new Error("Nom d'utilisateur non trouvé");
      }
      
      const credentials = data[0];
      
      if (credentials.email) {
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password
        });
        
        if (error) throw error;
      } else if (credentials.phone) {
        const { error } = await supabase.auth.signInWithPassword({
          phone: credentials.phone,
          password
        });
        
        if (error) throw error;
      } else {
        throw new Error("Aucune méthode de connexion disponible pour cet utilisateur");
      }
      
      // Navigation will be handled through onAuthStateChange
    } catch (error: any) {
      console.error("Username login error:", error);
      
      let errorMessage = "Une erreur est survenue lors de la connexion";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Identifiants invalides. Veuillez vérifier votre nom d'utilisateur et mot de passe.";
      } else if (error.message.includes("not found")) {
        errorMessage = "Nom d'utilisateur non trouvé. Veuillez vérifier votre saisie.";
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
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
      console.error("Magic link error:", error);
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
      console.error("Google login error:", error);
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
