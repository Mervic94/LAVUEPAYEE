
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, KeyRound, AlertCircle, Shield } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");

  // Rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await signIn(data.email, data.password);
  };

  const validateTwoFactorCode = async () => {
    if (twoFactorCode.length !== 6) {
      setTwoFactorError("Le code doit contenir 6 chiffres");
      return;
    }
    
    // Note: Dans cette version, nous n'utilisons pas réellement la 2FA
    // C'est juste pour la démonstration
    setShowTwoFactorDialog(false);
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre dashboard",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
                alt="LAVUEPAYEE"
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-800">Se connecter</h1>
          <p className="text-muted-foreground mt-2">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg shadow-md bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="votre@email.com" 
                          className="pl-10" 
                          {...field}
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

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>
              
              <div className="flex justify-center">
                <Link to="/reset-password" className="text-sm text-green-600 hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
            </form>
          </Form>

          <Separator className="my-6" />
          
          <div className="text-center">
            <Button variant="outline" className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50" asChild>
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
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={validateTwoFactorCode} 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Vérification en cours..." : "Vérifier"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
