
import React from "react";
import { Users } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { SponsorInfo } from "@/utils/sponsorUtils";

interface SponsorFieldProps {
  form: any;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
}

const SponsorField: React.FC<SponsorFieldProps> = ({ form, sponsorInfo, checkingSponsor }) => {
  const isMobile = useIsMobile();

  return (
    <FormField
      control={form.control}
      name="sponsorUsername"
      render={({ field }) => (
        <FormItem className="form-field">
          <FormLabel className={isMobile ? "text-sm" : ""}>Parrain (optionnel)</FormLabel>
          <FormControl>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Nom d'utilisateur du parrain" 
                className="pl-10" 
                {...field} 
              />
            </div>
          </FormControl>
          {sponsorInfo && (
            <div className="text-xs text-green-600 font-medium mt-1">
              Parrain trouvé: {sponsorInfo.fullName || sponsorInfo.username}
            </div>
          )}
          {checkingSponsor && (
            <div className="text-xs text-muted-foreground mt-1">
              Vérification en cours...
            </div>
          )}
          {!sponsorInfo && field.value && !checkingSponsor && field.value.length > 2 && (
            <div className="text-xs text-amber-600 mt-1">
              Parrain non trouvé
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SponsorField;
