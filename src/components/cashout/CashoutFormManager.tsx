
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Building, CreditCard, Wallet } from 'lucide-react';
import FormHeader from './FormHeader';
import AmountInput from './AmountInput';
import BankTransferFields from './BankTransferFields';
import PayPalFields from './PayPalFields';
import CreditCardFields from './CreditCardFields';
import MobileMoneyFields from './MobileMoneyFields';
import InfoSection from './InfoSection';
import SubmitButton from './SubmitButton';

interface CashoutMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  minPoints: number;
  conversionRate: number;
  processingTime: string;
  fees: string;
}

interface CashoutFormManagerProps {
  method: CashoutMethod;
  userPoints: number;
  onBack: () => void;
  onComplete: () => void;
}

const CashoutFormManager: React.FC<CashoutFormManagerProps> = ({ 
  method, 
  userPoints, 
  onBack, 
  onComplete 
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const maxCashValue = Math.floor(userPoints * method.conversionRate);
  const minAmount = Math.ceil(method.minPoints * method.conversionRate);
  
  const form = useForm({
    defaultValues: {
      amount: String(Math.floor(maxCashValue / 2)), // Set default to half of max by default
    },
  });
  
  const watchAmount = form.watch('amount');
  const pointsNeeded = watchAmount ? Math.ceil(parseInt(watchAmount) / method.conversionRate) : 0;
  const isAmountValid = pointsNeeded <= userPoints && parseInt(watchAmount) > 0;
  
  const onSubmit = (values: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <FormHeader userPoints={userPoints} onBack={onBack} />
      
      <div className="glass-card rounded-lg p-5 mb-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            {method.id === 'bank-transfer' && <Building className="h-6 w-6 text-primary" />}
            {method.id === 'paypal' && <Wallet className="h-6 w-6 text-primary" />}
            {method.id === 'credit-card' && <CreditCard className="h-6 w-6 text-primary" />}
          </div>
          <div>
            <h3 className="font-medium text-lg">{method.name}</h3>
            <p className="text-sm text-foreground/60">
              Taux de conversion: 1 LVP = {method.conversionRate}€
            </p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <AmountInput 
              form={form} 
              maxCashValue={maxCashValue} 
              pointsNeeded={pointsNeeded} 
              isAmountValid={isAmountValid}
              minAmount={minAmount}
            />
            
            {method.id === 'bank-transfer' && <BankTransferFields form={form} />}
            {method.id === 'paypal' && <PayPalFields form={form} />}
            {method.id === 'credit-card' && <CreditCardFields form={form} />}
            
            {(method.id === 'mtn-benin' || method.id === 'moov-africa' || 
              method.id === 'fedapay' || method.id === 'kikiapay') && (
              <MobileMoneyFields form={form} />
            )}
            
            <SubmitButton isAmountValid={isAmountValid} isSubmitting={isSubmitting} />
          </form>
        </Form>
      </div>
      
      <InfoSection method={method} />
    </div>
  );
};

export default CashoutFormManager;
