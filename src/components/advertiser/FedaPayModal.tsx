
import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface FedaPayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FedaPayModal: React.FC<FedaPayModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] p-0 overflow-hidden">
        <div className="aspect-video w-full h-[600px]">
          <iframe 
            src="https://me.fedapay.com/3i0DOiZr" 
            title="Paiement FedaPay" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FedaPayModal;
