
import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cn } from '@/lib/utils';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    return (
      <div className={cn("phone-input-container", className)}>
        <PhoneInput
          country={'ci'} // Default to Côte d'Ivoire
          value={value}
          onChange={onChange}
          inputClass={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          buttonClass="dropdown-button"
          dropdownClass="country-dropdown"
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
