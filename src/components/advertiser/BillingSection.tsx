
import React, { useState } from 'react';
import { CreditCard, Download, Plus, FileText, BadgeDollarSign, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Type pour les transactions
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'campaign' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

// Données de démonstration
const demoTransactions: Transaction[] = [
  {
    id: 'tr-001',
    date: '2025-06-15',
    description: "Dépôt de fonds",
    amount: 1000,
    type: 'deposit',
    status: 'completed',
    reference: 'dep-8721'
  },
  {
    id: 'tr-002',
    date: '2025-06-16',
    description: "Campagne - Lancement produit été 2025",
    amount: -250,
    type: 'campaign',
    status: 'completed',
    reference: 'camp-1'
  },
  {
    id: 'tr-003',
    date: '2025-06-20',
    description: "Campagne - Lancement produit été 2025",
    amount: -120,
    type: 'campaign',
    status: 'completed',
    reference: 'camp-1'
  },
  {
    id: 'tr-004',
    date: '2025-07-01',
    description: "Dépôt de fonds",
    amount: 500,
    type: 'deposit',
    status: 'pending',
    reference: 'dep-8945'
  },
  {
    id: 'tr-005',
    date: '2025-06-25',
    description: "Remboursement - Campagne refusée",
    amount: 150,
    type: 'refund',
    status: 'completed',
    reference: 'ref-321'
  },
];

const BillingSection: React.FC = () => {
  const { toast } = useToast();
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [amount, setAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  
  const accountBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  const handleAddFunds = () => {
    // Simuler l'ajout de fonds
    const newTransaction: Transaction = {
      id: `tr-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      description: "Dépôt de fonds",
      amount: Number(amount),
      type: 'deposit',
      status: 'pending',
      reference: `dep-${Math.floor(Math.random() * 10000)}`
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: "Dépôt en cours",
      description: `Votre dépôt de ${amount} LVC est en cours de traitement.`,
    });
    
    setAddFundsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeDollarSign className="h-5 w-5 text-primary" />
              Solde du compte
            </CardTitle>
            <CardDescription>Fonds disponibles pour vos campagnes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{accountBalance.toLocaleString()} LVC</div>
            <p className="text-sm text-muted-foreground">
              {accountBalance < 100 ? 
                "Votre solde est faible. Ajoutez des fonds pour continuer vos campagnes." : 
                "Votre solde est suffisant pour vos campagnes actuelles."}
            </p>
          </CardContent>
          <CardFooter>
            <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter des fonds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter des fonds</DialogTitle>
                  <DialogDescription>
                    Créditez votre compte publicitaire pour financer vos campagnes.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant (LVC)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Montant minimum: 100 LVC
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Mode de paiement</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Carte bancaire
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex items-center">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVC" 
                            className="h-4 w-4 mr-2"
                          />
                          Cryptomonnaie
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Date d'expiration</Label>
                          <Input id="expiryDate" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'crypto' && (
                    <div className="space-y-2">
                      <Label htmlFor="cryptoType">Type de cryptomonnaie</Label>
                      <Select defaultValue="btc">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une cryptomonnaie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-2">
                        Taux de conversion: 1 LVC = 0.0001 BTC
                      </p>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddFundsOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddFunds}>
                    Procéder au paiement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Résumé des transactions</CardTitle>
            <CardDescription>Aperçu de l'activité sur votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-secondary/20">
                <p className="text-sm text-muted-foreground mb-1">Total dépensé (30j)</p>
                <p className="text-xl font-bold">370 LVC</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <p className="text-sm text-muted-foreground mb-1">Dépôts (30j)</p>
                <p className="text-xl font-bold">1,500 LVC</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <p className="text-sm text-muted-foreground mb-1">Remboursements (30j)</p>
                <p className="text-xl font-bold">150 LVC</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Télécharger un résumé fiscal
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Historique des transactions</CardTitle>
            <CardDescription>Toutes les transactions de votre compte</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  // Détermine la classe de couleur pour le montant et le statut
                  const amountColorClass = 
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600';
                  
                  const statusColorClass = 
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800';
                  
                  const statusLabel = 
                    transaction.status === 'completed' ? 'Complété' :
                    transaction.status === 'pending' ? 'En attente' :
                    'Échoué';
                  
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorClass}`}>
                          {statusLabel}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${amountColorClass}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} LVC
                      </TableCell>
                    </TableRow>
                  );
                })}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Aucune transaction trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSection;
