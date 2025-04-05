
import React, { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneRegisterFormValues } from "@/schemas/registerSchemas";
import { SponsorInfo } from "@/utils/sponsorUtils";
import CommonFormFields from "./CommonFormFields";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/hooks/use-toast";
import HCaptcha from '../auth/HCaptcha';
import HCaptchaComponent from 'hcaptcha';

interface PhoneRegisterFormProps {
  onSubmit: (values: PhoneRegisterFormValues) => Promise<void>;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  isReadOnlySponsor?: boolean;
  sponsorUsername?: string | null;
}

const formSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  username: z.string().min(3, "Nom d'utilisateur requis (min. 3 caractères)"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().min(7, "Numéro de téléphone invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string().min(8, "Veuillez confirmer votre mot de passe"),
  birthDay: z.string().min(1, "Jour requis"),
  birthMonth: z.string().min(1, "Mois requis"),
  birthYear: z.string().min(4, "Année requise"),
  accountType: z.enum(["personal", "business"]),
  sponsorUsername: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les termes et conditions" }),
  }),
  captchaToken: z.string().min(1, "Veuillez vérifier que vous n'êtes pas un robot"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const PhoneRegisterForm: React.FC<PhoneRegisterFormProps> = ({
  onSubmit,
  sponsorInfo,
  checkingSponsor,
  isReadOnlySponsor = false,
  sponsorUsername = null,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef<HCaptchaComponent>(null);

  const form = useForm<PhoneRegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      accountType: "personal",
      sponsorUsername: sponsorUsername || "",
      terms: false,
      captchaToken: "",
    },
  });

  const handleVerify = (token: string) => {
    form.setValue('captchaToken', token);
    toast({
      title: "CAPTCHA vérifié",
      description: "Vérification humaine réussie",
    });
  };

  const handleExpire = () => {
    form.setValue('captchaToken', '');
    toast({
      variant: "destructive",
      title: "CAPTCHA expiré",
      description: "Veuillez vérifier à nouveau que vous n'êtes pas un robot",
    });
  };

  const handleFormSubmit = async (values: PhoneRegisterFormValues) => {
    if (!values.captchaToken) {
      toast({
        variant: "destructive",
        title: "Vérification requise",
        description: "Veuillez vérifier que vous n'êtes pas un robot",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="FR"
                  placeholder="Votre numéro de téléphone"
                  value={field.value}
                  onChange={field.onChange}
                />
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
              <FormLabel>Email (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CommonFormFields
          formType="phone"
          form={form}
          sponsorInfo={sponsorInfo}
          checkingSponsor={checkingSponsor}
          isSubmitting={isSubmitting}
          isReadOnlySponsor={isReadOnlySponsor}
        />

        <div className="mb-4">
          <HCaptcha
            ref={captchaRef}
            theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
            onVerify={handleVerify}
            onExpire={handleExpire}
            onError={() => {
              toast({
                variant: "destructive",
                title: "Erreur CAPTCHA",
                description: "Un problème est survenu lors de la vérification",
              });
            }}
          />
        </div>
      </form>
    </Form>
  );
};

export default PhoneRegisterForm;
