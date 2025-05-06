
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Type for the transactions
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'campaign' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
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
  );
};

export default TransactionTable;
