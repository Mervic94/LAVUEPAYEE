
import React from 'react';
import { CreditCard, Building, Wallet, AlertCircle, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CashoutMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  minPoints: number;
  conversionRate: number;
  processingTime: string;
  fees: string;
}

interface CashoutOptionsProps {
  userPoints: number;
  onSelectMethod: (method: CashoutMethod) => void;
}

const CashoutOptions: React.FC<CashoutOptionsProps> = ({ userPoints, onSelectMethod }) => {
  // Méthodes de paiement disponibles avec leurs seuils minimums
  const paymentMethods: CashoutMethod[] = [
    {
      id: 'bank-transfer',
      name: 'Virement bancaire',
      icon: <Building className="h-6 w-6 text-primary" />,
      minPoints: 1000,
      conversionRate: 0.00143, // 700 points = 1€ (1/700)
      processingTime: '2-3 jours ouvrés',
      fees: 'Gratuit (minimum 10€)'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Wallet className="h-6 w-6 text-primary" />,
      minPoints: 500,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: '24 heures',
      fees: '2% du montant retiré'
    },
    {
      id: 'credit-card',
      name: 'Carte bancaire',
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      minPoints: 2500,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: '3-5 jours ouvrés',
      fees: 'Gratuit (minimum 25€)'
    },
    {
      id: 'mtn-benin',
      name: 'MTN Bénin',
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      minPoints: 300,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: 'Instantané',
      fees: '1% du montant retiré'
    },
    {
      id: 'moov-africa',
      name: 'Moov Africa Bénin',
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      minPoints: 300,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: 'Instantané',
      fees: '1% du montant retiré'
    },
    {
      id: 'fedapay',
      name: 'FedaPay',
      icon: <Wallet className="h-6 w-6 text-primary" />,
      minPoints: 400,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: '24 heures',
      fees: '1.5% du montant retiré'
    },
    {
      id: 'kikiapay',
      name: 'KikiaPay',
      icon: <Wallet className="h-6 w-6 text-primary" />,
      minPoints: 400,
      conversionRate: 0.00143, // 700 points = 1€
      processingTime: '24 heures',
      fees: '1.5% du montant retiré'
    }
  ];

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription>
          Vous avez actuellement <span className="font-bold">{userPoints} points LVP</span> disponibles pour un retrait.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => {
          const isEligible = userPoints >= method.minPoints;
          const cashValue = (userPoints * method.conversionRate).toFixed(2);
          
          return (
            <div 
              key={method.id}
              className={`glass-card rounded-lg p-5 transition-all ${
                isEligible 
                  ? 'cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50' 
                  : 'opacity-70 border-gray-200 cursor-not-allowed'
              }`}
              onClick={() => isEligible && onSelectMethod(method)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{method.name}</h3>
                  <p className="text-sm text-foreground/60">
                    Minimum: {method.minPoints} LVP
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Valeur estimée:</span>
                  <span className="font-medium">{cashValue}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Frais:</span>
                  <span>{method.fees}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Délai:</span>
                  <span>{method.processingTime}</span>
                </div>
              </div>
              
              <button 
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                  isEligible 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-gray-200 text-gray-500'
                }`}
                disabled={!isEligible}
              >
                {isEligible ? 'Choisir ce moyen' : 'Points insuffisants'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CashoutOptions;
