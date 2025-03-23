
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phone: string, password: string) => Promise<void>;
  signInWithUsername: (username: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signUpWithPhone: (phone: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Configurer le listener pour les changements d'état d'authentification
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

    // Vérifier s'il existe déjà une session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Function to sign in with email
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

  // Function to sign in with phone number
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

  // Function to sign in with username
  const signInWithUsername = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // First, we need to find the user's email or phone by their username
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
      
      if (profileError || !profiles) {
        throw new Error("Nom d'utilisateur non trouvé");
      }

      // Get the user from auth schema using the profile id
      const { data: authData, error: authError } = await supabase.auth.admin.getUserById(
        profiles.id
      );
      
      if (authError || !authData.user) {
        throw new Error("Utilisateur non trouvé");
      }
      
      let signInWith = {};
      
      // Determine if we should sign in with email or phone
      if (authData.user.email) {
        signInWith = { email: authData.user.email, password };
      } else if (authData.user.phone) {
        signInWith = { phone: authData.user.phone, password };
      } else {
        throw new Error("Aucune méthode de connexion disponible pour cet utilisateur");
      }
      
      // Now sign in
      const { error } = await supabase.auth.signInWithPassword(signInWith);
      
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

  // Function to sign up with email
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

  // Function to sign up with phone
  const signUpWithPhone = async (phone: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // For phone sign up, we need to initiate the sign up process which sends an OTP
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
      
      // Store the phone in localStorage for use in the verification page
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

  const value = {
    session,
    user,
    isLoading,
    signIn,
    signInWithPhone,
    signInWithUsername,
    signUp,
    signUpWithPhone,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
