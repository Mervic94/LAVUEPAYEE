
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    },
  });

  const handleSubmit = async (values: PhoneRegisterFormValues) => {
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

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
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
