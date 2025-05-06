
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from '@/components/advertiser/TransactionTable';

export const useFedaPayPayment = (amount: string, addTransaction: (transaction: Transaction) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle FedaPay payment message event
  const handleFedaPayMessage = (event: MessageEvent) => {
    if (event.origin === 'https://me.fedapay.com' && event.data?.status === 'success') {
      // Create the new transaction
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
      
      // Redirect to wallet
      navigate('/wallet');
    }
  };

  // Handle URL params for FedaPay redirect
  const handleFedaPayRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');
    
    if (status === 'success' && transactionId) {
      // Create the new transaction
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
      
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return true;
    }
    
    return false;
  };

  // Add event listener for FedaPay message
  useEffect(() => {
    window.addEventListener('message', handleFedaPayMessage);
    return () => {
      window.removeEventListener('message', handleFedaPayMessage);
    };
  }, [amount]);

  // Check for FedaPay redirect params on load
  useEffect(() => {
    handleFedaPayRedirect();
  }, []);

  return {
    handleFedaPayRedirect
  };
};
