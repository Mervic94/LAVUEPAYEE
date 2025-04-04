
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
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
import { PhoneNumberInput } from "@/components/ui/phone-input";

const phoneSchema = z.object({
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

interface PhoneLoginFormProps {
  onSubmit: (data: PhoneFormValues) => Promise<void>;
  isLoading: boolean;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <PhoneNumberInput
                  value={field.value}
                  onChange={(phone) => field.onChange(phone)}
                />
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
              <div className="text-right mt-1">
                <Link
                  to="/reset-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
};

export default PhoneLoginForm;
