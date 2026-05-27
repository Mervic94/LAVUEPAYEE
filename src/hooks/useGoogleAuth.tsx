
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useGoogleAuth = () => {
  const { toast } = useToast();
  const [googleLoading, setGoogleLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
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
      // Redirection en cours vers Google : pas de reset ici, la page va naviguer.
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion Google",
        description: error.message || "Une erreur est survenue lors de la connexion avec Google. Vérifiez que le provider Google est activé dans Supabase.",
      });
      setGoogleLoading(false);
    }
  };

  return {
    googleLoading,
    setGoogleLoading,
    signInWithGoogle
  };
};
