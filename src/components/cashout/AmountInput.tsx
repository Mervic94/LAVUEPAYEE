
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface AmountInputProps {
  form: UseFormReturn<any>;
  maxCashValue: number;
  pointsNeeded: number;
  isAmountValid: boolean;
  minAmount: number;
}

const AmountInput: React.FC<AmountInputProps> = ({ 
  form, 
  maxCashValue, 
  pointsNeeded, 
  isAmountValid,
  minAmount
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Montant à retirer (Vc)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type="number"
                  min={minAmount}
                  max={maxCashValue}
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">Vc</span>
              </div>
            </FormControl>
            <div className="flex justify-between text-sm">
              <FormMessage />
              <span className="text-foreground/60">
                LVP nécessaires: <strong>{pointsNeeded}</strong>
              </span>
            </div>
          </FormItem>
        )}
      />
      
      {!isAmountValid && (
        <Alert variant="destructive">
          <AlertDescription>
            Le montant demandé dépasse vos LVP disponibles ou est invalide.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AmountInput;
