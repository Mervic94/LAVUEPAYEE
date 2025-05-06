
import React, { useState } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useTransactions } from "@/hooks/useTransactions";
import AccountBalanceCard from './AccountBalanceCard';
import AccountSummaryCard from './AccountSummaryCard';
import TransactionTable from './TransactionTable';
import AddFundsForm from './AddFundsForm';
import FedaPayModal from './FedaPayModal';

const BillingSection: React.FC = () => {
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [fedaPayModalOpen, setFedaPayModalOpen] = useState(false);
  
  const {
    transactions,
    accountBalance,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    handleAddFundsSubmit
  } = useTransactions();
  
  const handleAddFunds = () => {
    const shouldOpenFedaPayModal = handleAddFundsSubmit();
    
    if (shouldOpenFedaPayModal) {
      setFedaPayModalOpen(true);
      setAddFundsOpen(false);
    } else {
      setAddFundsOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
          <DialogTrigger asChild>
            <AccountBalanceCard 
              accountBalance={accountBalance} 
              onAddFundsClick={() => setAddFundsOpen(true)}
            />
          </DialogTrigger>
          
          <AddFundsForm
            amount={amount}
            setAmount={setAmount}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onClose={() => setAddFundsOpen(false)}
            onSubmit={handleAddFunds}
          />
        </Dialog>
        
        <FedaPayModal 
          open={fedaPayModalOpen} 
          onOpenChange={setFedaPayModalOpen} 
        />
        
        <AccountSummaryCard />
      </div>
      
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default BillingSection;
