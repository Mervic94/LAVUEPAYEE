
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthProvider";
import { useAccountManagementService } from "@/contexts/auth/services/accountManagement";

// Import components
import RequestResetForm from "@/components/reset-password/RequestResetForm";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ResetPasswordHeader from "@/components/reset-password/ResetPasswordHeader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"request" | "reset">("request");
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { resetPassword, updatePassword } = useAccountManagementService(setLoading);

  useEffect(() => {
    // Vérifier si nous avons un token de réinitialisation dans l'URL
    const hasResetToken = searchParams.get('token_hash') && searchParams.get('type') === 'recovery';
    if (hasResetToken) {
      setStage("reset");
    }
  }, [searchParams]);

  const onRequestSubmit = async (data: { email: string }) => {
    await resetPassword(data.email);
  };

  const onResetSubmit = async (data: { password: string; confirmPassword: string }) => {
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    
    if (token_hash && type === 'recovery') {
      await updatePassword(data.password);
      navigate("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Lien invalide",
        description: "Le lien de réinitialisation est invalide ou expiré",
      });
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
