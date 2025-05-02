
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import HCaptcha from '../auth/HCaptcha';
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';
import { PhoneRegisterFormValues, phoneRegisterSchema } from '@/schemas/registerSchemas';
import { PhoneNumberInput } from '@/components/ui/phone-input';
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

interface PhoneRegisterFormProps {
  onSubmit: (data: PhoneRegisterFormValues) => Promise<void>;
  isLoading?: boolean;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  sponsorUsername?: string | null;
  isReadOnlySponsor?: boolean;
}

const PhoneRegisterForm: React.FC<PhoneRegisterFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  sponsorInfo,
  checkingSponsor,
  sponsorUsername,
  isReadOnlySponsor 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef<HCaptchaComponent>(null);
  const form = useForm<PhoneRegisterFormValues>({
    resolver: zodResolver(phoneRegisterSchema),
    defaultValues: {
      phone: '',
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

  const handleSubmit = async (values: PhoneRegisterFormValues) => {
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

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <NameFields form={form} />
        <UsernameField form={form} />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <PhoneNumberInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Votre numéro de téléphone"
                  className="pl-10"
                  disabled={isLoading}
                />
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
              Création du compte...
            </>
          ) : (
            'Créer un compte'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PhoneRegisterForm;
