
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VerifyPhone = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Code invalide",
        description: "Veuillez entrer un code à 6 chiffres",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const pendingPhone = localStorage.getItem('pendingPhone');
      
      if (!pendingPhone) {
        throw new Error("Numéro de téléphone non trouvé. Veuillez réessayer l'inscription");
      }
      
      const { error } = await supabase.auth.verifyOtp({
        phone: pendingPhone,
        token: verificationCode,
        type: 'sms'
      });
      
      if (error) throw error;
      
      toast({
        title: "Compte vérifié!",
        description: "Votre compte a été vérifié avec succès",
      });
      
      // Clean up localStorage
      localStorage.removeItem('pendingPhone');
      
      // Redirect to login
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de vérification",
        description: error.message || "Code de vérification incorrect",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    
    try {
      const pendingPhone = localStorage.getItem('pendingPhone');
      
      if (!pendingPhone) {
        throw new Error("Numéro de téléphone non trouvé. Veuillez réessayer l'inscription");
      }
      
      const { error } = await supabase.auth.resend({
        type: 'sms',
        phone: pendingPhone,
      });
      
      if (error) throw error;
      
      toast({
        title: "Code envoyé",
        description: "Un nouveau code de vérification a été envoyé à votre numéro",
      });
      
      setCountdown(30);
      setCanResend(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec d'envoi",
        description: error.message || "Erreur lors de l'envoi du code. Veuillez réessayer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Phone className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold mt-4">Vérifiez votre numéro de téléphone</h1>
          <p className="text-muted-foreground mt-2">
            Nous avons envoyé un code de vérification à votre numéro de téléphone.
            Veuillez entrer ce code pour activer votre compte.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Code de vérification à 6 chiffres"
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading || verificationCode.length !== 6}
            >
              {loading ? "Vérification..." : "Vérifier"}
              <Check className="ml-2 h-4 w-4" />
            </Button>
            
            {canResend ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                className="w-full"
                disabled={loading}
              >
                Renvoyer le code
              </Button>
            ) : (
              <p className="text-sm text-center text-muted-foreground">
                Renvoyer le code ({countdown}s)
              </p>
            )}
          </form>
        </div>

        <div className="text-center">
          <Link to="/login" className="text-primary text-sm hover:underline inline-flex items-center">
            Retour à la connexion
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
