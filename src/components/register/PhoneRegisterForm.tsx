
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneNumberInput } from "@/components/ui/phone-input";
import CommonFormFields from "./CommonFormFields";
import { PhoneRegisterFormValues, phoneRegisterSchema } from "@/schemas/registerSchemas";
import { SponsorInfo } from "@/utils/sponsorUtils";

interface PhoneRegisterFormProps {
  onSubmit: (data: PhoneRegisterFormValues) => Promise<void>;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  sponsorUsername?: string | null;
  isReadOnlySponsor?: boolean;
}

const PhoneRegisterForm: React.FC<PhoneRegisterFormProps> = ({
  onSubmit,
  sponsorInfo,
  checkingSponsor,
  sponsorUsername = null,
  isReadOnlySponsor = false
}) => {
  const isMobile = useIsMobile();
  const form = useForm<PhoneRegisterFormValues>({
    resolver: zodResolver(phoneRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      sponsorUsername: sponsorUsername || "",
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

  const handleSubmit = async (data: PhoneRegisterFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 form-container">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="form-field">
              <FormLabel className={isMobile ? "text-sm" : ""}>Téléphone</FormLabel>
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
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-field">
              <FormLabel className={isMobile ? "text-sm" : ""}>Email (optionnel)</FormLabel>
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
        
        <CommonFormFields 
          formType="phone"
          form={form}
          sponsorInfo={sponsorInfo}
          checkingSponsor={checkingSponsor}
          isSubmitting={form.formState.isSubmitting}
          isReadOnlySponsor={isReadOnlySponsor}
        />
      </form>
    </Form>
  );
};

export default PhoneRegisterForm;
