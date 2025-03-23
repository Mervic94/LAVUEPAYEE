
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, KeyRound, User, Building, Phone, Calendar, ArrowRight, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { PhoneNumberInput } from "@/components/ui/phone-input";

// Common schema fields
const commonSchema = {
  firstName: z.string().min(2, { message: "Prénom requis" }),
  lastName: z.string().min(2, { message: "Nom de famille requis" }),
  username: z.string().min(3, { message: "Nom d'utilisateur requis (min. 3 caractères)" })
    .regex(/^[a-zA-Z0-9._-]+$/, { message: "Nom d'utilisateur invalide" }),
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

// Email registration schema
const emailRegisterSchema = z.object({
  ...commonSchema,
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
});

// Phone registration schema
const phoneRegisterSchema = z.object({
  ...commonSchema,
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  email: z.string().optional(),
});

type EmailRegisterFormValues = z.infer<typeof emailRegisterSchema>;
type PhoneRegisterFormValues = z.infer<typeof phoneRegisterSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signUpWithPhone, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  
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

  // Create forms for each registration method
  const emailForm = useForm<EmailRegisterFormValues>({
    resolver: zodResolver(emailRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
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

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onEmailSubmit = async (data: EmailRegisterFormValues) => {
    const dateOfBirth = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
    
    // Préparer les données de l'utilisateur pour le profil
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUp(data.email, data.password, userData);
  };

  const onPhoneSubmit = async (data: PhoneRegisterFormValues) => {
    const dateOfBirth = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
    
    // Préparer les données de l'utilisateur pour le profil
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUpWithPhone(data.phone, data.password, userData);
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

        {/* Birth Date Fields */}
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
        
        {/* Password Field */}
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

        {/* Account Type Field */}
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

        {/* Terms and Conditions Field */}
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
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">S'inscrire</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            C'est rapide et facile.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg shadow-md bg-card">
          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
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

export default Register;
