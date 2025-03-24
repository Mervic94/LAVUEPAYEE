
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { PhoneNumberInput } from '@/components/ui/phone-input';
import { UseFormReturn } from 'react-hook-form';

interface MobileMoneyFieldsProps {
  form: UseFormReturn<any>;
}

const MobileMoneyFields: React.FC<MobileMoneyFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Numéro de téléphone</FormLabel>
          <FormControl>
            <PhoneNumberInput 
              value={field.value || ''} 
              onChange={field.onChange}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MobileMoneyFields;
