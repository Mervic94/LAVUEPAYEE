
import React from 'react';
import { History, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface HistoryTabProps {
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
  selectedCampaign: string | null;
  handleCampaignSelect: (id: string) => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({
  campaignHistory,
  selectedCampaign,
  handleCampaignSelect
}) => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Historique des campagnes</h2>
      
      <div className="space-y-6">
        {campaignHistory.map((campaign) => (
          <Card key={campaign.id} className={`overflow-hidden transition-all duration-300 ${selectedCampaign === campaign.id ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="cursor-pointer" onClick={() => handleCampaignSelect(campaign.id)}>
              <CardTitle>{campaign.name}</CardTitle>
              <CardDescription className="flex flex-wrap gap-x-4 gap-y-2">
                <span className="flex items-center gap-1">
                  <History className="h-4 w-4 text-foreground/60" />
                  {campaign.dateRange}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart2 className="h-4 w-4 text-foreground/60" />
                  {new Intl.NumberFormat('fr-FR').format(campaign.impressions)} impressions
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                      alt="LVC" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {campaign.budget}
                </span>
              </CardDescription>
            </CardHeader>
            
            {selectedCampaign === campaign.id && (
              <CardContent>
                <h4 className="font-medium mb-3">Détails de performance</h4>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3">Période</th>
                        <th className="text-right py-2 px-3">Impressions</th>
                        <th className="text-right py-2 px-3">Clics</th>
                        <th className="text-right py-2 px-3">Conversions</th>
                        <th className="text-right py-2 px-3">Taux de clic</th>
                        <th className="text-right py-2 px-3">Taux de conversion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaign.performance.map((period, index) => {
                        const ctr = ((period.clicks / period.impressions) * 100).toFixed(2);
                        const convRate = ((period.conversions / period.clicks) * 100).toFixed(2);
                        
                        return (
                          <tr key={index} className="border-b border-border/50 hover:bg-secondary/5">
                            <td className="py-2 px-3">{period.date}</td>
                            <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.impressions)}</td>
                            <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.clicks)}</td>
                            <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.conversions)}</td>
                            <td className="text-right py-2 px-3">{ctr}%</td>
                            <td className="text-right py-2 px-3">{convRate}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryTab;
