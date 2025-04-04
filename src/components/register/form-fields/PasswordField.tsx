
import React, { useState } from "react";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface PasswordFieldProps {
  form: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ form }) => {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
                type={showPassword ? "text" : "password"} 
                placeholder="Nouveau mot de passe" 
                className="pl-10 pr-10"
                {...field} 
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 
                  <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                  <Eye className="h-4 w-4 text-muted-foreground" />
                }
                <span className="sr-only">
                  {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                </span>
              </Button>
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
