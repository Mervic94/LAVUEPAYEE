
import React from 'react';

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
}

interface TransactionsHistoryProps {
  transactions: Transaction[];
}

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ transactions }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/50 font-medium">
        <div className="col-span-2">Transaction</div>
        <div className="text-center">Date</div>
        <div className="text-right">Points</div>
      </div>
      
      {transactions.map((transaction) => (
        <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4 border-t border-border">
          <div className="col-span-2">{transaction.description}</div>
          <div className="text-center">{formatDate(transaction.date)}</div>
          <div className={`text-right font-medium ${
            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsHistory;
