import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Transaction } from '@/components/advertiser/TransactionTable';
import { useFedaPayPayment } from './useFedaPayPayment';

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

export const useTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  const [amount, setAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const accountBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  // Use the FedaPay hook
  const { handleFedaPayRedirect } = useFedaPayPayment(amount, addTransaction);

  const handleAddFundsSubmit = () => {
    if (paymentMethod === 'fedapay') {
      return true; // Return true to indicate we should open FedaPay modal
    }
    
    // Simulate adding funds for other payment methods
    const newTransaction: Transaction = {
      id: `tr-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      description: "Dépôt de fonds",
      amount: Number(amount),
      type: 'deposit',
      status: 'pending',
      reference: `dep-${Math.floor(Math.random() * 10000)}`
    };
    
    addTransaction(newTransaction);
    
    toast({
      title: "Dépôt en cours",
      description: `Votre dépôt de ${amount} LVC est en cours de traitement.`,
    });
    
    return false; // Return false to indicate we should close the dialog
  };

  // Check for FedaPay redirect on initial load
  useEffect(() => {
    handleFedaPayRedirect();
  }, []);

  return {
    transactions,
    accountBalance,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    handleAddFundsSubmit,
    addTransaction
  };
};
