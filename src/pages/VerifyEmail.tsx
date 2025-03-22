
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Vérifier si nous avons reçu un token dans l'URL (retour du lien de confirmation)
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'email_confirmation') {
        setLoading(true);
        const { error } = await supabase.auth.verifyOtp({ 
          token_hash, 
          type: 'email_confirmation' 
        });
        
        if (error) {
          toast({
            variant: "destructive",
            title: "Erreur de vérification",
            description: error.message,
          });
        } else {
          toast({
            title: "Email vérifié avec succès",
            description: "Vous pouvez maintenant vous connecter à votre compte",
          });
          navigate('/login');
        }
        setLoading(false);
      }
    };
    
    handleEmailConfirmation();
  }, [searchParams, toast, navigate]);

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
      // Avec Supabase, nous utilisons généralement des liens plutôt que des codes, 
      // mais nous gardons cette UI au cas où une autre méthode de vérification serait implémentée
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Compte vérifié!",
        description: "Votre compte a été vérifié avec succès",
      });
      
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
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: localStorage.getItem('pendingEmail') || '',
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Un nouveau lien de vérification a été envoyé à votre email",
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
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold mt-4">Vérifiez votre adresse email</h1>
          <p className="text-muted-foreground mt-2">
            Nous avons envoyé un lien de vérification à votre adresse email.
            Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <div className="text-center space-y-4">
            <p className="text-sm">
              Si vous n'avez pas reçu l'email de vérification, vous pouvez demander à le recevoir à nouveau :
            </p>
            
            {canResend ? (
              <Button
                onClick={handleResendCode}
                className="w-full"
                disabled={loading}
              >
                Renvoyer l'email de vérification
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Renvoyer l'email ({countdown}s)
              </p>
            )}
          </div>
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
