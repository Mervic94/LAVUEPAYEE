
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Loader2 } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast";
import HCaptcha from '../auth/HCaptcha';
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  captchaToken: z.string().optional(),
});

interface EmailLoginFormProps {
  onSubmit: (data: { email: string, password: string }) => Promise<void>;
  isLoading: boolean;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef<HCaptchaComponent>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!captchaVerified) {
      toast({
        variant: "destructive",
        title: "Vérification requise",
        description: "Veuillez vérifier que vous n'êtes pas un robot",
      });
      return;
    }
    
    try {
      await onSubmit({ email: values.email, password: values.password });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
              Connexion...
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailLoginForm;
