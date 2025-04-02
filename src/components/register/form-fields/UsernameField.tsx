
import React from "react";
import { User } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface UsernameFieldProps {
  form: any;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ form }) => {
  const isMobile = useIsMobile();

  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem className="form-field">
          <FormLabel className={isMobile ? "text-sm" : ""}>Nom d'utilisateur</FormLabel>
          <FormControl>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Nom d'utilisateur" className="pl-10" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UsernameField;
