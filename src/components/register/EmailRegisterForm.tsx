
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { emailRegisterSchema, EmailRegisterFormValues } from '@/schemas/registerSchemas';
import HCaptcha from '../auth/HCaptcha';
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';
import { SponsorInfo } from '@/utils/sponsorUtils';
import { 
  NameFields, 
  UsernameField, 
  SponsorField, 
  DateOfBirthFields, 
  PasswordField, 
  AccountTypeField, 
  TermsCheckbox 
} from './form-fields';

interface EmailRegisterFormProps {
  onSubmit: (data: EmailRegisterFormValues) => Promise<void>;
  isLoading?: boolean;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  sponsorUsername?: string | null;
  isReadOnlySponsor?: boolean;
}

const EmailRegisterForm: React.FC<EmailRegisterFormProps> = ({ 
  onSubmit,
  isLoading = false,
  sponsorInfo,
  checkingSponsor,
  sponsorUsername,
  isReadOnlySponsor 
}) => {
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
      sponsorUsername: sponsorUsername || '',
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

  const handleError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Erreur CAPTCHA",
      description: "Un problème est survenu lors de la vérification",
    });
    console.error("HCaptcha error:", error);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <NameFields form={form} />
        <UsernameField form={form} />
        
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    disabled={isLoading}
                    {...field}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordField form={form} />
        <DateOfBirthFields form={form} />
        <AccountTypeField form={form} />
        
        <SponsorField 
          form={form} 
          sponsorInfo={sponsorInfo} 
          checkingSponsor={checkingSponsor} 
          isReadOnly={isReadOnlySponsor}
        />
        
        <TermsCheckbox form={form} />

        <div className="flex justify-center w-full">
          <div className="w-full max-w-md">
            <HCaptcha
              ref={captchaRef}
              theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
              onVerify={handleVerify}
              onExpire={handleExpire}
              onError={handleError}
            />
          </div>
        </div>

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
