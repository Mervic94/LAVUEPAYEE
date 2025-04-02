
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Building, KeyRound, User, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { EmailRegisterFormValues, PhoneRegisterFormValues } from "@/schemas/registerSchemas";
import { getDays, getMonths, getYears } from "@/utils/dateUtils";
import { SponsorInfo } from "@/utils/sponsorUtils";

interface CommonFormFieldsProps {
  formType: "email" | "phone";
  form: ReturnType<typeof useForm<EmailRegisterFormValues | PhoneRegisterFormValues>>;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  isSubmitting: boolean;
}

const CommonFormFields: React.FC<CommonFormFieldsProps> = ({
  formType,
  form,
  sponsorInfo,
  checkingSponsor,
  isSubmitting
}) => {
  const isMobile = useIsMobile();
  const days = getDays();
  const months = getMonths();
  const years = getYears();

  return (
    <>
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

      <div className="form-group">
        <FormLabel className={`block mb-2 ${isMobile ? "text-sm" : ""}`}>Date de naissance</FormLabel>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="birthDay"
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Jour" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="birthMonth"
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Mois" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="birthYear"
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Année" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription className="text-xs mt-1">
          <Shield className="inline-block h-3 w-3 mr-1" />
          Les autres utilisateurs ne verront pas votre âge
        </FormDescription>
      </div>
      
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

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg mobile-full-width" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </>
  );
};

export default CommonFormFields;
