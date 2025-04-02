
import React from 'react';
import Stats from './Stats';
import AdSection from './AdSection';

interface OverviewProps {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: any;
  }>;
  mockAds: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    reward: number;
    adType?: "banner" | "interstitial" | "video" | "native" | "popup" | "audio";
  }>;
  adTypes: Array<"banner" | "interstitial" | "video" | "native" | "popup" | "audio">;
}

const Overview: React.FC<OverviewProps> = ({ stats, mockAds, adTypes }) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Stats stats={stats} />
      
      {/* Recommended Ads */}
      <AdSection 
        title="Publicités recommandées" 
        ads={mockAds.slice(0, 3)} 
      />
      
      {/* Latest Ads */}
      <AdSection 
        title="Dernières publicités" 
        ads={mockAds.slice(3, 6)} 
        adTypes={adTypes} 
      />
    </div>
  );
};

export default Overview;
