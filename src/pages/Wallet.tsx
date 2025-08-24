
import React, { useState } from 'react';
import { BadgeDollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionsHistory from '@/components/profile/TransactionsHistory';
import CashoutDialog from '@/components/CashoutDialog';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/navbar';
import { useUserData } from '@/hooks/useUserData';

const Wallet = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { loading, userProfile, userWallet, transactions } = useUserData();

  // Transform transactions to match TransactionsHistory expectations
  const transformedTransactions = transactions.map((transaction, index) => ({
    id: index + 1, // Convert string ID to number for compatibility
    type: transaction.type === 'earning' ? 'earning' : 
          transaction.type === 'withdrawal' ? 'spending' : 
          transaction.type === 'cashout' ? 'retrait' : 'conversion',
    description: transaction.description || 'Transaction',
    amount: transaction.type === 'earning' ? transaction.points : -Math.abs(transaction.points),
    date: transaction.created_at
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Chargement de votre portefeuille...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!userProfile || !userWallet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
          <Alert className="max-w-md mx-auto">
            <AlertDescription>
              Impossible de charger les données du portefeuille. Veuillez rafraîchir la page.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  // Calculate conversion rate: 1 LVP = 0.00143 Vc (as shown in original)
  const userPoints = userProfile.points || 0;
  const userVc = (userPoints * 0.00143).toFixed(2);
  
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
          <TransactionsHistory transactions={transformedTransactions} />
        </TabsContent>
        
        <TabsContent value="gains">
          <TransactionsHistory transactions={transformedTransactions.filter(t => t.type === 'earning')} />
        </TabsContent>
        
        <TabsContent value="conversions">
          <TransactionsHistory transactions={transformedTransactions.filter(t => t.type === 'conversion')} />
        </TabsContent>
        
        <TabsContent value="withdrawals">
          <TransactionsHistory transactions={transformedTransactions.filter(t => t.type === 'retrait')} />
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
