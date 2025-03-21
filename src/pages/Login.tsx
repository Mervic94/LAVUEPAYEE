
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, KeyRound, ArrowRight, AlertCircle, Shield, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Email, téléphone ou nom d'utilisateur requis" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    
    try {
      // Simulation de l'identification du type d'identifiant
      const identifier = data.identifier;
      let identifierType = "username";
      
      if (identifier.includes("@")) {
        identifierType = "email";
      } else if (/^\d+$/.test(identifier)) {
        identifierType = "phone";
      }
      
      console.log(`Tentative de connexion avec ${identifierType}: ${identifier}`);
      
      // Simulation d'appel API pour la connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une vraie app, le backend déterminerait si 2FA est requis
      setShowTwoFactorDialog(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateTwoFactorCode = async () => {
    if (twoFactorCode.length !== 6) {
      setTwoFactorError("Le code doit contenir 6 chiffres");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulation d'appel API pour valider le code 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Effacer le dialogue et naviguer vers le dashboard en cas de succès
      setShowTwoFactorDialog(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre dashboard",
      });
      navigate("/dashboard");
    } catch (error) {
      setTwoFactorError("Code incorrect. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Se connecter</h1>
          <p className="text-muted-foreground mt-2">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg shadow-md bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email, téléphone ou nom d'utilisateur</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">
                          {field.value.includes('@') ? (
                            <Mail className="h-4 w-4" />
                          ) : field.value && /^\d+$/.test(field.value) ? (
                            <Phone className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <Input 
                          placeholder="Email, téléphone ou nom d'utilisateur" 
                          className="pl-10" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="Votre mot de passe" 
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary" size="lg" disabled={loading}>
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
              
              <div className="flex justify-center">
                <Link to="/reset-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
            </form>
          </Form>

          <Separator className="my-6" />
          
          <div className="text-center">
            <Button variant="outline" className="w-full border-2" asChild>
              <Link to="/register">
                Créer un nouveau compte
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showTwoFactorDialog} onOpenChange={setShowTwoFactorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Authentification à deux facteurs</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Un code de vérification à 6 chiffres a été envoyé à votre adresse email. Veuillez l'entrer ci-dessous.
            </p>
            
            {twoFactorError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{twoFactorError}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col space-y-2">
              <FormLabel htmlFor="code">Code de vérification</FormLabel>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="code"
                  placeholder="123456"
                  className="pl-10"
                  value={twoFactorCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length <= 6) {
                      setTwoFactorCode(value);
                      setTwoFactorError("");
                    }
                  }}
                />
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={validateTwoFactorCode} 
              disabled={loading}
            >
              {loading ? "Vérification en cours..." : "Vérifier"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
