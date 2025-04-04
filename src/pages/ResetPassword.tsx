
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Import components
import RequestResetForm from "@/components/reset-password/RequestResetForm";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ResetPasswordHeader from "@/components/reset-password/ResetPasswordHeader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"request" | "reset">("request");
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Vérifier si nous avons un token de réinitialisation dans l'URL
    const hasResetToken = searchParams.get('token_hash') && searchParams.get('type') === 'recovery';
    if (hasResetToken) {
      setStage("reset");
    }
  }, [searchParams]);

  const onRequestSubmit = async (data: { email: string }) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
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
        description: error.message || "Une erreur est survenue. Veuillez réessayer",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetSubmit = async (data: { password: string; confirmPassword: string }) => {
    setLoading(true);
    
    try {
      // Si nous avons un token dans l'URL, c'est une réinitialisation via lien
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'recovery') {
        // Utilisons la structure correcte pour verifyOtp avec type 'recovery'
        const { error } = await supabase.auth.updateUser({
          password: data.password
        });
        
        if (error) throw error;
        
        toast({
          title: "Mot de passe réinitialisé",
          description: "Votre mot de passe a été modifié avec succès",
        });
        
        navigate("/login");
      } else {
        throw new Error("Lien de réinitialisation invalide ou expiré");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de réinitialisation",
        description: error.message || "Une erreur est survenue. Veuillez réessayer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <ResetPasswordHeader stage={stage} />

        <div className="glass-card p-6 rounded-lg">
          {stage === "request" ? (
            <RequestResetForm onSubmit={onRequestSubmit} loading={loading} />
          ) : (
            <ResetPasswordForm 
              onSubmit={onResetSubmit} 
              loading={loading}
              onBack={() => setStage("request")}
              showBackButton={!searchParams.get('token_hash')}
            />
          )}
        </div>

        <div className="text-center">
          <Link to="/login" className="text-primary text-sm hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
