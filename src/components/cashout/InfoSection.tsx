
import React from 'react';

interface InfoSectionProps {
  method: {
    processingTime: string;
    fees: string;
    minPoints: number;
    conversionRate: number;
  };
}

const InfoSection: React.FC<InfoSectionProps> = ({ method }) => {
  return (
    <div className="text-sm text-foreground/60">
      <p><strong>Informations importantes:</strong></p>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <li>Délai de traitement estimé: {method.processingTime}</li>
        <li>Frais applicables: {method.fees}</li>
        <li>Taux de conversion: 1 LVP = 0.00014 Vc</li>
        <li>Seuil minimum de retrait: {method.minPoints} LVP ({Math.ceil(method.minPoints * method.conversionRate)}€)</li>
      </ul>
    </div>
  );
};

export default InfoSection;
