
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast({ 
            title: "Connexion réussie", 
            description: "Bienvenue sur votre compte"
          });
        } else if (event === 'SIGNED_OUT') {
          toast({ 
            title: "Déconnexion réussie", 
            description: "À bientôt!"
          });
        } else if (event === 'PASSWORD_RECOVERY') {
          // Instead of directly navigating, we'll set a flag in the return value
          // that the component using this hook can use for navigation
          toast({
            title: "Récupération de mot de passe",
            description: "Vous allez être redirigé vers la page de réinitialisation"
          });
        } else if (event === 'USER_UPDATED') {
          toast({ 
            title: "Profil mis à jour", 
            description: "Vos informations ont été mises à jour"
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return {
    session,
    user,
    isLoading,
    setIsLoading
  };
};
