
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ChevronRight, CreditCard, Building, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { PhoneNumberInput } from '@/components/ui/phone-input';

interface CashoutMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  minPoints: number;
  conversionRate: number;
  processingTime: string;
  fees: string;
}

interface CashoutFormProps {
  method: CashoutMethod;
  userPoints: number;
  onBack: () => void;
  onComplete: () => void;
}

interface FormValues {
  amount: string;
  accountName?: string;
  accountNumber?: string;
  iban?: string;
  email?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  phoneNumber?: string;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ method, userPoints, onBack, onComplete }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const maxCashValue = Math.floor(userPoints * method.conversionRate);
  
  const form = useForm<FormValues>({
    defaultValues: {
      amount: String(Math.floor(maxCashValue / 2)), // Set default to half of max by default
    },
  });
  
  const watchAmount = form.watch('amount');
  const pointsNeeded = watchAmount ? Math.ceil(parseInt(watchAmount) / method.conversionRate) : 0;
  const isAmountValid = pointsNeeded <= userPoints && parseInt(watchAmount) > 0;
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Demande de retrait envoyée",
        description: `Votre demande de retrait de ${values.amount}€ a été envoyée avec succès.`,
      });
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
              alt="LVP" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium">{userPoints} LVP disponibles</span>
        </div>
      </div>
      
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
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant à retirer (€)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        min={Math.ceil(method.minPoints * method.conversionRate)}
                        max={maxCashValue}
                        className="pl-8"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">€</span>
                    </div>
                  </FormControl>
                  <div className="flex justify-between text-sm">
                    <FormMessage />
                    <span className="text-foreground/60">
                      LVP nécessaires: <strong>{pointsNeeded}</strong>
                    </span>
                  </div>
                </FormItem>
              )}
            />
            
            {!isAmountValid && (
              <Alert variant="destructive">
                <AlertDescription>
                  Le montant demandé dépasse vos LVP disponibles ou est invalide.
                </AlertDescription>
              </Alert>
            )}
            
            {method.id === 'bank-transfer' && (
              <>
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du titulaire</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IBAN</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="FR76..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {method.id === 'paypal' && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email PayPal</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="votre@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {method.id === 'credit-card' && (
              <>
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="4242 4242 4242 4242" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            
            {(method.id === 'mtn-benin' || method.id === 'moov-africa' || method.id === 'fedapay' || method.id === 'kikiapay') && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <PhoneNumberInput 
                        value={field.value || ''} 
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full gap-2" 
              disabled={!isAmountValid || isSubmitting}
            >
              {isSubmitting ? "Traitement en cours..." : "Confirmer le retrait"} 
              {!isSubmitting && <ChevronRight className="h-4 w-4" />}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="text-sm text-foreground/60">
        <p><strong>Informations importantes:</strong></p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Délai de traitement estimé: {method.processingTime}</li>
          <li>Frais applicables: {method.fees}</li>
          <li>Taux de conversion: 1 LVP = 0.00014 Vc</li>
          <li>Seuil minimum de retrait: {method.minPoints} LVP ({Math.ceil(method.minPoints * method.conversionRate)}€)</li>
        </ul>
      </div>
    </div>
  );
};

export default CashoutForm;
