
import React, { useState } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionsHistory from '@/components/profile/TransactionsHistory';
import CashoutDialog from '@/components/CashoutDialog';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/navbar';

// Données fictives pour les transactions
const mockTransactions = [
  {
    id: 1,
    type: 'gain',
    description: 'Visionnage de publicité',
    amount: 250,
    date: '2025-04-02T10:30:00'
  },
  {
    id: 2,
    type: 'gain',
    description: 'Bonus parrainage',
    amount: 500,
    date: '2025-04-01T14:15:00'
  },
  {
    id: 3,
    type: 'conversion',
    description: 'Conversion LVP en Vc',
    amount: -700,
    date: '2025-03-30T09:45:00'
  },
  {
    id: 4,
    type: 'retrait',
    description: 'Retrait PayPal',
    amount: -1000,
    date: '2025-03-25T16:20:00'
  }
];

const Wallet = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Solde fictif de l'utilisateur
  const userPoints = 1250;
  const userVc = (userPoints * 0.00143).toFixed(2); // Conversion approximative
  
  // Ouvrir la boîte de dialogue de retrait
  const handleCashout = () => {
    setDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Mon Portefeuille</h1>
      
      {/* Cartes de solde */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="h-8 w-8 lvp-icon-container">
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="LVP" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Solde LVP</h2>
              <p className="text-foreground/60 text-sm">Points de fidélité</p>
            </div>
          </div>
          
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold">{userPoints}</span>
            <span className="text-lg ml-2 text-foreground/70">LVP</span>
          </div>
          
          <Button onClick={handleCashout} className="w-full">
            Retirer mes LVP
          </Button>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="h-8 w-8 lvp-icon-container">
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="Vc" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Solde Vc</h2>
              <p className="text-foreground/60 text-sm">Valeur convertie</p>
            </div>
          </div>
          
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold">{userVc}</span>
            <span className="text-lg ml-2 text-foreground/70">Vc</span>
          </div>
          
          <Alert className="bg-primary/5 border-primary/20">
            <AlertDescription>
              Taux de conversion: 1 LVP = 0.00143 Vc (700 LVP = 1 Vc)
            </AlertDescription>
          </Alert>
        </div>
      </div>
      
      {/* Onglets avec l'historique des transactions */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes les transactions</TabsTrigger>
          <TabsTrigger value="gains">Gains</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <TransactionsHistory transactions={mockTransactions} />
        </TabsContent>
        
        <TabsContent value="gains">
          <TransactionsHistory transactions={mockTransactions.filter(t => t.type === 'gain')} />
        </TabsContent>
        
        <TabsContent value="conversions">
          <TransactionsHistory transactions={mockTransactions.filter(t => t.type === 'conversion')} />
        </TabsContent>
        
        <TabsContent value="withdrawals">
          <TransactionsHistory transactions={mockTransactions.filter(t => t.type === 'retrait')} />
        </TabsContent>
      </Tabs>
      
      {/* Boîte de dialogue de retrait */}
      <CashoutDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        userPoints={userPoints}
      />
      </main>
    </div>
  );
};

export default Wallet;
