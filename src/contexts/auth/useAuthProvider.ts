
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
          // Rediriger vers la page de réinitialisation du mot de passe
          navigate('/reset-password');
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
  }, [toast, navigate]);

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

      // Récupérer l'email ou le téléphone associé à ce profil
      const { data: authUser, error: authError } = await supabase
        .from('profiles')
        .select('id, username, email, phone')
        .eq('id', profiles.id)
        .single();
      
      if (authError || !authUser) {
        throw new Error("Utilisateur non trouvé");
      }
      
      if (authUser.email) {
        const { error } = await supabase.auth.signInWithPassword({
          email: authUser.email,
          password
        });
        
        if (error) throw error;
      } else if (authUser.phone) {
        const { error } = await supabase.auth.signInWithPassword({
          phone: authUser.phone,
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
        password: newPassword,
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
        options: {
          emailRedirectTo: `${window.location.origin}/profile`,
        },
      });
      
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
    session,
    user,
    isLoading,
    signIn,
    signInWithPhone,
    signInWithUsername,
    signInWithMagicLink,
    signInWithGoogle,
    signUp,
    signUpWithPhone,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
  };
};
