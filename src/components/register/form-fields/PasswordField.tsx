
import React from "react";
import { KeyRound } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface PasswordFieldProps {
  form: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ form }) => {
  const isMobile = useIsMobile();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className="form-field">
          <FormLabel className={isMobile ? "text-sm" : ""}>Mot de passe</FormLabel>
          <FormControl>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="Nouveau mot de passe" 
                className="pl-10"
                {...field} 
              />
            </div>
          </FormControl>
          <FormDescription className="text-xs">
            Au moins 8 caractères, une majuscule et un chiffre
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
