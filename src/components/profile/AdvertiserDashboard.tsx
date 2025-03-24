
import React from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

interface AdvertiserDashboardProps {
  isVerified: boolean;
}

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ isVerified }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Gestion des campagnes publicitaires</h3>
      
      <div className="space-y-6">
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <h4 className="font-medium mb-2">Compte annonceur actif</h4>
          <p className="text-sm">Votre compte annonceur a été vérifié et approuvé par l'équipe LAVUEPAYEE.</p>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center text-center py-8">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BadgeDollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Créer une campagne</h3>
            <p className="text-sm text-foreground/60 mb-4">Lancez votre première campagne publicitaire</p>
            <Button>Commencer</Button>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-medium mb-4 flex items-center justify-between">
              Statistiques
              <span className="text-xs bg-secondary px-2 py-1 rounded">Cette semaine</span>
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground/60 text-sm">Impressions</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60 text-sm">Clics</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60 text-sm">Taux de conversion</span>
                <span className="font-medium">0%</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-medium mb-4">Solde du compte</h3>
            <div className="text-3xl font-bold mb-2">0.00€</div>
            <p className="text-xs text-foreground/60 mb-4">Créditez votre compte pour lancer des campagnes</p>
            <Button size="sm" className="w-full">Ajouter des fonds</Button>
          </div>
        </div>
        
        <div className="bg-secondary/20 rounded-lg p-4">
          <h4 className="font-medium mb-2">Aucune campagne active</h4>
          <p className="text-sm text-foreground/60">
            Vous n'avez pas encore de campagnes publicitaires. Créez votre première campagne pour commencer à promouvoir vos produits ou services.
          </p>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Rappel des règles publicitaires</h4>
          <div className="glass-card p-4 rounded-lg bg-amber-50 border-amber-200">
            <p className="text-sm mb-2">
              <strong>Important:</strong> Le non-respect des règles publicitaires peut entraîner la suspension ou la suppression de votre compte annonceur.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Toutes les publicités doivent être conformes aux lois en vigueur</li>
              <li>Les publicités trompeuses ou mensongères sont strictement interdites</li>
              <li>Le contenu doit être approprié pour tous les publics</li>
              <li>L'équipe LAVUEPAYEE se réserve le droit de refuser toute publicité</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full">Consulter toutes les règles</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
