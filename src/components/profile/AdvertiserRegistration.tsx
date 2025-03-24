
import React from 'react';
import { AlertTriangle, Shield, FileCheck, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AdvertiserRequirement {
  text: string;
}

interface AdvertiserViolation {
  level: string;
  examples: string[];
  penalty: string;
  duration: string;
}

interface AdvertiserRegistrationProps {
  kycVerified: boolean;
  kybVerified: boolean;
  advertiserVerificationRequested: boolean;
  onRequestVerification: () => void;
  advertiserRequirements: string[];
  advertiserViolations: AdvertiserViolation[];
}

const AdvertiserRegistration: React.FC<AdvertiserRegistrationProps> = ({
  kycVerified,
  kybVerified,
  advertiserVerificationRequested,
  onRequestVerification,
  advertiserRequirements,
  advertiserViolations
}) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Devenir Annonceur LAVUEPAYEE</h3>
      <p className="text-foreground/70 mb-6">
        Pour diffuser des publicités sur notre plateforme, vous devez soumettre une demande de vérification et respecter nos conditions strictes.
      </p>
      
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          L'activation d'un compte annonceur est permanente. Une fois activé, ce compte ne peut être désactivé que par l'équipe LAVUEPAYEE.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary" />
            Conditions requises
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            {advertiserRequirements.map((req, index) => (
              <li key={index} className="text-foreground/80">{req}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Infractions et pénalités
          </h4>
          <div className="space-y-4">
            {advertiserViolations.map((violation, index) => (
              <div key={index} className="glass-card p-3 rounded-lg border border-border">
                <div className="font-medium text-base mb-1">Niveau {violation.level}</div>
                <div className="text-sm text-foreground/70 mb-2">
                  <span className="font-medium">Exemples:</span> {violation.examples.join(", ")}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Sanction:</span> {violation.penalty}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Durée:</span> {violation.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-3">Vérifications obligatoires</h4>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Vérification d'identité (KYC)</div>
                <p className="text-sm text-foreground/60">Téléchargez une pièce d'identité valide</p>
              </div>
              {kycVerified ? (
                <div className="flex items-center text-green-600 gap-1">
                  <Check className="h-4 w-4" />
                  <span>Vérifié</span>
                </div>
              ) : (
                <Button size="sm" variant="outline">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Soumettre
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Vérification d'entreprise (KYB)</div>
                <p className="text-sm text-foreground/60">Téléchargez les documents officiels de votre entreprise</p>
              </div>
              {kybVerified ? (
                <div className="flex items-center text-green-600 gap-1">
                  <Check className="h-4 w-4" />
                  <span>Vérifié</span>
                </div>
              ) : (
                <Button size="sm" variant="outline">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Soumettre
                </Button>
              )}
            </div>
          </div>
          
          <Button
            onClick={onRequestVerification}
            disabled={advertiserVerificationRequested}
            className="w-full sm:w-auto"
          >
            {advertiserVerificationRequested 
              ? "Demande en cours d'examen" 
              : "Demander la vérification"}
          </Button>
          {advertiserVerificationRequested && (
            <p className="text-sm text-foreground/60 mt-2">
              Notre équipe examine votre demande. Vous recevrez une réponse dans les 48 heures.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvertiserRegistration;
