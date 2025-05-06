
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccountSummaryCard: React.FC = () => {
  return (
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
  );
};

export default AccountSummaryCard;
