
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface NameFieldsProps {
  form: any;
}

const NameFields: React.FC<NameFieldsProps> = ({ form }) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-container">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="form-field">
            <FormLabel className={isMobile ? "text-sm" : ""}>Prénom</FormLabel>
            <FormControl>
              <Input placeholder="Prénom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="form-field">
            <FormLabel className={isMobile ? "text-sm" : ""}>Nom</FormLabel>
            <FormControl>
              <Input placeholder="Nom de famille" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default NameFields;
