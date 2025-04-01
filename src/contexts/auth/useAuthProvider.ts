
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAuthProvider = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

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
      
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
      
      if (profileError || !profiles) {
        throw new Error("Nom d'utilisateur non trouvé");
      }

      const { data, error: userError } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('id', profiles.id)
        .single();

      if (userError || !data) {
        throw new Error("Utilisateur non trouvé");
      }
      
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(profiles.id);
      
      if (authError || !authUser || !authUser.user) {
        throw new Error("Informations d'identification utilisateur non trouvées");
      }
      
      if (authUser.user.email) {
        const { error } = await supabase.auth.signInWithPassword({
          email: authUser.user.email,
          password
        });
        
        if (error) throw error;
      } else if (authUser.user.phone) {
        const { error } = await supabase.auth.signInWithPassword({
          phone: authUser.user.phone,
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

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
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

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      
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

  return {
    session,
    user,
    isLoading,
    signIn,
    signInWithPhone,
    signInWithUsername,
    signInWithGoogle,
    signUp,
    signUpWithPhone,
    signOut,
    resetPassword,
  };
};
