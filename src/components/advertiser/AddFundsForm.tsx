
import React from 'react';
import { CreditCard, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddFundsFormProps {
  amount: string;
  setAmount: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const AddFundsForm: React.FC<AddFundsFormProps> = ({
  amount,
  setAmount,
  paymentMethod,
  setPaymentMethod,
  onClose,
  onSubmit
}) => {
  return (
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
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="fedapay" id="fedapay" />
              <Label htmlFor="fedapay" className="flex items-center">
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="FedaPay" 
                  className="h-4 w-4 mr-2"
                />
                FedaPay
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
        
        {paymentMethod === 'fedapay' && (
          <div className="space-y-2">
            <p className="text-sm">
              Vous allez être redirigé vers FedaPay pour finaliser votre paiement.
            </p>
            <p className="text-sm font-medium">
              Après le paiement, vous serez redirigé vers votre portefeuille.
            </p>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={onSubmit}>
          Procéder au paiement
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddFundsForm;
