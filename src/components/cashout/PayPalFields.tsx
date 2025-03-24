
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface PayPalFieldsProps {
  form: UseFormReturn<any>;
}

const PayPalFields: React.FC<PayPalFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Adresse email PayPal</FormLabel>
          <FormControl>
            <Input {...field} type="email" placeholder="votre@email.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayPalFields;
