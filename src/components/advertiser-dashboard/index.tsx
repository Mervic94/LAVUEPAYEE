
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import AnalyticsTab from './AnalyticsTab';
import CampaignsTab from './CampaignsTab';
import HistoryTab from './HistoryTab';
import NewAdTab from './NewAdTab';
import SocialMediaTab from './SocialMediaTab';
import {
  impressionsData,
  conversionData,
  audienceData,
  campaignSuggestions,
  campaignHistory
} from './data/mock-data';

interface AdvertiserDashboardProps {
  className?: string;
}

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ className }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleCampaignSelect = (id: string) => {
    setSelectedCampaign(id === selectedCampaign ? null : id);
  };
  
  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="social-media">Réseaux Sociaux</TabsTrigger>
          <TabsTrigger value="new-ad">Nouvelle Publicité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <AnalyticsTab 
            impressionsData={impressionsData}
            conversionData={conversionData}
            audienceData={audienceData}
            campaignSuggestions={campaignSuggestions}
          />
        </TabsContent>
        
        <TabsContent value="campaigns">
          <CampaignsTab 
            campaignHistory={campaignHistory}
            handleCampaignSelect={handleCampaignSelect}
          />
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryTab 
            campaignHistory={campaignHistory}
            selectedCampaign={selectedCampaign}
            handleCampaignSelect={handleCampaignSelect}
          />
        </TabsContent>

        <TabsContent value="social-media">
          <SocialMediaTab />
        </TabsContent>
        
        <TabsContent value="new-ad">
          <NewAdTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserDashboard;
