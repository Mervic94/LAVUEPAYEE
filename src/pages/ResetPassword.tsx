import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthProvider";
import { useAccountManagementService } from "@/contexts/auth/services/accountManagement";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <ResetPasswordHeader stage={stage} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-lg border-border/50 shadow-xl"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Retour à la connexion
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
