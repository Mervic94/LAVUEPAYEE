import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail, User, User2, Calendar, Lock, Users, CheckCircle, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { emailRegisterSchema, EmailRegisterFormValues } from '@/schemas/registerSchemas';
import HCaptcha from '../auth/HCaptcha';
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';

interface EmailRegisterFormProps {
  onSubmit: (data: EmailRegisterFormValues) => Promise<void>;
  isLoading: boolean;
}

const EmailRegisterForm: React.FC<EmailRegisterFormProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef<HCaptchaComponent>(null);
  const form = useForm<EmailRegisterFormValues>({
    resolver: zodResolver(emailRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      sponsorUsername: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      accountType: 'consumer',
      termsAccepted: false,
      captchaToken: '',
    },
  });

  const handleVerify = (token: string) => {
    form.setValue('captchaToken', token);
    setCaptchaVerified(true);
    toast({
      title: "CAPTCHA vérifié",
      description: "Vérification humaine réussie",
    });
  };

  const handleExpire = () => {
    form.setValue('captchaToken', '');
    setCaptchaVerified(false);
    toast({
      variant: "destructive",
      title: "CAPTCHA expiré",
      description: "Veuillez vérifier à nouveau que vous n'êtes pas un robot",
    });
  };

  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Erreur CAPTCHA",
      description: "Un problème est survenu lors de la vérification",
    });
  };

  const handleSubmit = async (values: EmailRegisterFormValues) => {
    if (!captchaVerified) {
      toast({
        variant: "destructive",
        title: "Vérification requise",
        description: "Veuillez vérifier que vous n'êtes pas un robot",
      });
      return;
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Votre prénom"
                      className="pl-10"
                      disabled={isLoading}
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Votre nom de famille"
                      className="pl-10"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
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
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Votre nom d'utilisateur"
                    className="pl-10"
                    disabled={isLoading}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="votre@email.com"
                    type="email"
                    className="pl-10"
                    disabled={isLoading}
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    className="pl-10"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="birthDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jour</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Jour" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
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
                <FormLabel>Mois</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Mois" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
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
                <FormLabel>Année</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Année" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Type de compte</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type de compte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="consumer">Consommateur</SelectItem>
                  <SelectItem value="advertiser">Annonceur</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sponsorUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur du parrain (optionnel)</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Nom d'utilisateur du parrain"
                    className="pl-10"
                    disabled={isLoading}
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
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">conditions d'utilisation</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <HCaptcha
          ref={captchaRef}
          theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
          onVerify={handleVerify}
          onExpire={handleExpire}
          onError={handleError}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !captchaVerified}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              S'inscrire
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailRegisterForm;
