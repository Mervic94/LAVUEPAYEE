
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CampaignsTabProps {
  campaignHistory: {
    id: string;
    name: string;
    type: string;
    dateRange: string;
    impressions: number;
    clicks: number;
    conversions: number;
    budget: string;
    status: string;
    performance: {
      date: string;
      impressions: number;
      clicks: number;
      conversions: number;
    }[];
  }[];
  handleCampaignSelect: (id: string) => void;
}

const CampaignsTab: React.FC<CampaignsTabProps> = ({ 
  campaignHistory,
  handleCampaignSelect
}) => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Vos campagnes publicitaires</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les campagnes</SelectItem>
              <SelectItem value="active">Campagnes actives</SelectItem>
              <SelectItem value="inactive">Campagnes inactives</SelectItem>
              <SelectItem value="completed">Campagnes terminées</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="banner">Bannières</SelectItem>
              <SelectItem value="video">Vidéos</SelectItem>
              <SelectItem value="interstitial">Interstitielles</SelectItem>
              <SelectItem value="native">Natives</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button>Nouvelle campagne</Button>
      </div>
      
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-secondary/50 font-medium">
          <div className="col-span-2">Nom de la campagne</div>
          <div>Type</div>
          <div>Impressions</div>
          <div>Budget</div>
          <div>Statut</div>
        </div>
        
        <div className="divide-y">
          {campaignHistory.map((campaign) => (
            <div 
              key={campaign.id}
              className="grid grid-cols-6 gap-4 p-4 hover:bg-secondary/10 transition-colors cursor-pointer"
              onClick={() => handleCampaignSelect(campaign.id)}
            >
              <div className="col-span-2 font-medium">{campaign.name}</div>
              <div>{campaign.type}</div>
              <div>{new Intl.NumberFormat('fr-FR').format(campaign.impressions)}</div>
              <div>{campaign.budget}</div>
              <div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Terminée
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignsTab;
