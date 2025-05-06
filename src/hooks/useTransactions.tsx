
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from '@/components/advertiser/TransactionTable';

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
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  const [amount, setAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const accountBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleAddFundsSubmit = () => {
    if (paymentMethod === 'fedapay') {
      return true; // Return true to indicate we should open FedaPay modal
    }
    
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
    
    addTransaction(newTransaction);
    
    toast({
      title: "Dépôt en cours",
      description: `Votre dépôt de ${amount} LVC est en cours de traitement.`,
    });
    
    return false; // Return false to indicate we should close the dialog
  };

  // Gestion du message de succès après retour de FedaPay
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');
    
    if (status === 'success' && transactionId) {
      // Créer la nouvelle transaction
      const newTransaction: Transaction = {
        id: `tr-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split('T')[0],
        description: "Dépôt de fonds via FedaPay",
        amount: Number(amount),
        type: 'deposit',
        status: 'completed',
        reference: `feda-${transactionId}`
      };
      
      addTransaction(newTransaction);
      
      toast({
        title: "Paiement réussi",
        description: `Votre dépôt via FedaPay a été traité avec succès.`,
      });
      
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Gestion du retour de FedaPay via message event
  const handleFedaPayMessage = (event: MessageEvent) => {
    if (event.origin === 'https://me.fedapay.com' && event.data?.status === 'success') {
      // Créer la nouvelle transaction
      const newTransaction: Transaction = {
        id: `tr-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split('T')[0],
        description: "Dépôt de fonds via FedaPay",
        amount: Number(amount),
        type: 'deposit',
        status: 'completed',
        reference: `feda-${event.data.transaction_id || 'unknown'}`
      };
      
      addTransaction(newTransaction);
      
      toast({
        title: "Paiement réussi",
        description: `Votre dépôt de ${amount} LVC via FedaPay a été traité avec succès.`,
      });
      
      // Rediriger vers wallet
      navigate('/wallet');
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleFedaPayMessage);
    return () => {
      window.removeEventListener('message', handleFedaPayMessage);
    };
  }, [amount, transactions]);

  return {
    transactions,
    accountBalance,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    handleAddFundsSubmit
  };
};
