
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowRight } from "lucide-react";
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

const requestResetSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
});

type RequestResetFormValues = z.infer<typeof requestResetSchema>;

interface RequestResetFormProps {
  onSubmit: (data: RequestResetFormValues) => Promise<void>;
  loading: boolean;
}

const RequestResetForm: React.FC<RequestResetFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<RequestResetFormValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="vous@exemple.com" 
                    className="pl-10" 
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer les instructions"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};

export default RequestResetForm;
