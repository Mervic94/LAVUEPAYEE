
import React from "react";
import { Shield } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { getDays, getMonths, getYears } from "@/utils/dateUtils";

interface DateOfBirthFieldsProps {
  form: any;
}

const DateOfBirthFields: React.FC<DateOfBirthFieldsProps> = ({ form }) => {
  const isMobile = useIsMobile();
  const days = getDays();
  const months = getMonths();
  const years = getYears();

  return (
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
  );
};

export default DateOfBirthFields;
