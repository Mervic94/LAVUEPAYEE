
import React from "react";
import { User, Building } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";

interface AccountTypeFieldProps {
  form: any;
}

const AccountTypeField: React.FC<AccountTypeFieldProps> = ({ form }) => {
  const isMobile = useIsMobile();

  return (
    <FormField
      control={form.control}
      name="accountType"
      render={({ field }) => (
        <FormItem className="space-y-3 form-field">
          <FormLabel className={isMobile ? "text-sm" : ""}>Type de compte</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6"
            >
              <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                <FormControl>
                  <RadioGroupItem value="consumer" />
                </FormControl>
                <FormLabel className="font-normal flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Consommateur (gagner des points)
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                <FormControl>
                  <RadioGroupItem value="advertiser" />
                </FormControl>
                <FormLabel className="font-normal flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Annonceur (diffuser des publicités)
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountTypeField;
