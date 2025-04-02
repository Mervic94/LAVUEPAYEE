
import React from "react";
import { Link } from "react-router-dom";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  form: any;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 form-field">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-normal">
              En cliquant sur S'inscrire, vous acceptez nos <Link to="/terms" className="text-primary hover:underline">Conditions</Link>, notre <Link to="/privacy" className="text-primary hover:underline">Politique de confidentialité</Link> et notre <Link to="/cookies" className="text-primary hover:underline">Politique d'utilisation des cookies</Link>.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsCheckbox;
