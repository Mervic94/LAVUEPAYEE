
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, ArrowRight } from "lucide-react";

const VerifyEmail = () => {
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
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Compte vérifié!",
        description: "Votre compte a été vérifié avec succès",
      });
      
      // Redirect to login
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec de vérification",
        description: "Code de vérification incorrect",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    
    try {
      // Simulate API call to resend code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Code envoyé",
        description: "Un nouveau code de vérification a été envoyé à votre email",
      });
      
      setCountdown(30);
      setCanResend(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec d'envoi",
        description: "Erreur lors de l'envoi du code. Veuillez réessayer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold mt-4">Vérifiez votre adresse email</h1>
          <p className="text-muted-foreground mt-2">
            Nous avons envoyé un code de vérification à votre adresse email.
            Veuillez l'entrer ci-dessous pour activer votre compte.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium">
                Code de vérification
              </label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 6) {
                    setVerificationCode(value);
                  }
                }}
                className="text-center text-lg tracking-wider"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || verificationCode.length !== 6}
            >
              {loading ? "Vérification..." : "Vérifier mon email"}
              {!loading && <Check className="ml-2 h-4 w-4" />}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas reçu de code?
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-primary text-sm hover:underline mt-1"
                  disabled={loading}
                >
                  Renvoyer le code
                </button>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Renvoyer le code ({countdown}s)
                </p>
              )}
            </div>
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

export default VerifyEmail;
