
import React from 'react';
import { BadgeDollarSign, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AccountBalanceCardProps {
  accountBalance: number;
  onAddFundsClick: () => void;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ 
  accountBalance, 
  onAddFundsClick 
}) => {
  return (
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
        <Button className="w-full" onClick={onAddFundsClick}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter des fonds
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountBalanceCard;
