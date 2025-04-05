
import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cn } from '@/lib/utils';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  defaultCountry?: string;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, defaultCountry = 'ci', ...props }, ref) => {
    return (
      <div className={cn("phone-input-container relative", className)}>
        <PhoneInput
          country={defaultCountry}
          value={value}
          onChange={onChange}
          inputClass={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-12",
            className
          )}
          containerClass="relative"
          buttonClass="absolute left-0 top-0 h-10 flex items-center justify-center border-r border-input px-3 bg-muted/20"
          dropdownClass="bg-background border border-input shadow-md rounded-md max-h-[200px] overflow-y-auto z-50"
          searchClass="bg-background border border-input rounded-md p-2 my-2 mx-2 text-sm"
          enableSearch={true}
          disableSearchIcon={false}
          searchPlaceholder="Rechercher un pays..."
          {...props}
        />
      </div>
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export { PhoneNumberInput };
// Make sure PhoneInput is exported for direct usage
export { PhoneInput };
