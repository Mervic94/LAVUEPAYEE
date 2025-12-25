import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  
  // Récupérer l'email en attente
  useEffect(() => {
    const email = localStorage.getItem('pendingEmail');
    setPendingEmail(email);
  }, []);

  // Vérifier si nous avons reçu un token dans l'URL (retour du lien de confirmation)
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'email') {
        setLoading(true);
        try {
          const { error } = await supabase.auth.verifyOtp({ 
            token_hash, 
            type: 'email' 
          });
          
          if (error) {
            toast({
              variant: "destructive",
              title: "Erreur de vérification",
              description: error.message,
            });
          } else {
            setVerified(true);
            localStorage.removeItem('pendingEmail');
            toast({
              title: "Email vérifié avec succès !",
              description: "Vous pouvez maintenant vous connecter à votre compte",
            });
            // Redirection après 3 secondes
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: error.message || "Une erreur est survenue",
          });
        } finally {
          setLoading(false);
        }
      }
      
      // Vérifier aussi avec les paramètres access_token et refresh_token
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        setLoading(true);
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            toast({
              variant: "destructive",
              title: "Erreur de vérification",
              description: error.message,
            });
          } else {
            setVerified(true);
            localStorage.removeItem('pendingEmail');
            toast({
              title: "Email vérifié avec succès !",
              description: "Redirection vers votre tableau de bord...",
            });
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: error.message || "Une erreur est survenue",
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    handleEmailConfirmation();
  }, [searchParams, toast, navigate]);

  // Countdown pour le renvoi
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendCode = async () => {
    if (!pendingEmail) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Aucun email en attente de vérification. Veuillez vous réinscrire.",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: pendingEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé !",
        description: "Un nouveau lien de vérification a été envoyé à votre adresse email",
      });
      
      setCountdown(60);
      setCanResend(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec d'envoi",
        description: error.message || "Erreur lors de l'envoi de l'email. Veuillez réessayer",
      });
    } finally {
      setLoading(false);
    }
  };

  // Affichage si l'email est vérifié
  if (verified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold mt-4 text-green-600">Email vérifié !</h1>
            <p className="text-muted-foreground mt-2">
              Votre adresse email a été vérifiée avec succès.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Redirection en cours...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-4">Vérifiez votre adresse email</h1>
          <p className="text-muted-foreground mt-2">
            Nous avons envoyé un lien de vérification à :
          </p>
          {pendingEmail && (
            <p className="font-medium text-primary mt-1">{pendingEmail}</p>
          )}
        </div>

        <Card className="glass-card">
          <CardContent className="p-6 space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Instructions
              </h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>Ouvrez votre boîte de réception email</li>
                <li>Recherchez l'email de LAVUEPAYEE</li>
                <li>Cliquez sur le lien de vérification</li>
                <li>Vous serez redirigé automatiquement</li>
              </ol>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas reçu l'email ?
              </p>
              
              {canResend ? (
                <Button
                  onClick={handleResendCode}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Renvoyer l'email de vérification
                    </>
                  )}
                </Button>
              ) : (
                <Button variant="outline" disabled className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Renvoyer dans {countdown}s
                </Button>
              )}
              
              <p className="text-xs text-muted-foreground">
                Vérifiez également votre dossier spam ou courrier indésirable
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <Link to="/login" className="text-primary text-sm hover:underline inline-flex items-center">
            Retour à la connexion
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
          <p className="text-xs text-muted-foreground">
            Besoin d'aide ?{" "}
            <Link to="/support" className="text-primary hover:underline">
              Contactez le support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
