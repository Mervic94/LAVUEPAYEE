import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneNumberInput } from "@/components/ui/phone-input";
import { Building, Mail, Phone, Shield, User, KeyRound, Users } from "lucide-react";

const commonSchema = {
  firstName: z.string().min(2, { message: "Prénom requis" }),
  lastName: z.string().min(2, { message: "Nom de famille requis" }),
  username: z.string().min(3, { message: "Nom d'utilisateur requis (min. 3 caractères)" })
    .regex(/^[a-zA-Z0-9._-]+$/, { message: "Nom d'utilisateur invalide" }),
  sponsorUsername: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  birthDay: z.string().min(1, { message: "Jour requis" }),
  birthMonth: z.string().min(1, { message: "Mois requis" }),
  birthYear: z.string().min(4, { message: "Année requise" }),
  accountType: z.enum(["consumer", "advertiser"], {
    required_error: "Veuillez sélectionner un type de compte",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
};

const emailRegisterSchema = z.object({
  ...commonSchema,
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
});

const phoneRegisterSchema = z.object({
  ...commonSchema,
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  email: z.string().optional(),
});

type EmailRegisterFormValues = z.infer<typeof emailRegisterSchema>;
type PhoneRegisterFormValues = z.infer<typeof phoneRegisterSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signUpWithPhone, user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  const [googleLoading, setGoogleLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    { value: "1", label: "Janvier" },
    { value: "2", label: "Février" },
    { value: "3", label: "Mars" },
    { value: "4", label: "Avril" },
    { value: "5", label: "Mai" },
    { value: "6", label: "Juin" },
    { value: "7", label: "Juillet" },
    { value: "8", label: "Août" },
    { value: "9", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const emailForm = useForm<EmailRegisterFormValues>({
    resolver: zodResolver(emailRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      sponsorUsername: "",
      email: "",
      phone: "",
      password: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      accountType: "consumer",
      termsAccepted: false,
    },
  });

  const phoneForm = useForm<PhoneRegisterFormValues>({
    resolver: zodResolver(phoneRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      sponsorUsername: "",
      email: "",
      phone: "",
      password: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      accountType: "consumer",
      termsAccepted: false,
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onEmailSubmit = async (data: EmailRegisterFormValues) => {
    const dateOfBirth = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      sponsor_username: data.sponsorUsername,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUp(data.email, data.password, userData);
  };

  const onPhoneSubmit = async (data: PhoneRegisterFormValues) => {
    const dateOfBirth = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      sponsor_username: data.sponsorUsername,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUpWithPhone(data.phone, data.password, userData);
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription avec Google",
      });
      setGoogleLoading(false);
    }
  };

  const renderCommonFields = (formType: "email" | "phone") => {
    const form = formType === "email" ? emailForm : phoneForm;
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nom de famille" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Nom d'utilisateur" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sponsorUsername"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Nom d'utilisateur du parrain (optionnel)" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="block mb-2">Date de naissance</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Jour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className="text-xs mt-1">
            <Calendar className="inline-block h-3 w-3 mr-1" />
            Les autres utilisateurs ne verront pas votre âge
          </FormDescription>
        </div>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Nouveau mot de passe" 
                    className="pl-10"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                Au moins 8 caractères, une majuscule et un chiffre
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type de compte</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                    <FormControl>
                      <RadioGroupItem value="consumer" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Consommateur (gagner des points)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                    <FormControl>
                      <RadioGroupItem value="advertiser" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Annonceur (diffuser des publicités)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  En cliquant sur S'inscrire, vous acceptez nos <Link to="/terms" className="text-primary hover:underline">Conditions</Link>, notre <Link to="/privacy" className="text-primary hover:underline">Politique de confidentialité</Link> et notre <Link to="/cookies" className="text-primary hover:underline">Politique d'utilisation des cookies</Link>.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">S'inscrire</h1>
          <p className="text-muted-foreground mt-2">
            Créez votre compte pour commencer.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg shadow-md bg-card">
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                "Inscription en cours..."
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                    <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                    <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                    <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                  </svg>
                  S'inscrire avec Google
                </>
              )}
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">ou continuer avec</span>
            </div>
          </div>

          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Téléphone</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Email" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneNumberInput
                            value={field.value || ""}
                            onChange={(phone) => field.onChange(phone)}
                            placeholder="Numéro de téléphone (optionnel)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {renderCommonFields("email")}
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="phone">
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneNumberInput
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            placeholder="Numéro de téléphone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={phoneForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Email (optionnel)" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {renderCommonFields("phone")}
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
