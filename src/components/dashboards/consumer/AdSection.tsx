
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import AdCard from '@/components/AdCard';

interface AdSectionProps {
  title: string;
  ads: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    reward: number;
    adType?: "banner" | "interstitial" | "video" | "native" | "popup" | "audio";
  }>;
  adTypes?: Array<"banner" | "interstitial" | "video" | "native" | "popup" | "audio">;
}

const AdSection: React.FC<AdSectionProps> = ({ title, ads, adTypes }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button 
          onClick={() => {}}
          className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm font-medium"
        >
          Voir tout
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad, index) => (
          <AdCard 
            key={ad.id} 
            {...ad} 
            adType={adTypes ? adTypes[index % adTypes.length] : ad.adType} 
          />
        ))}
      </div>
    </div>
  );
};

export default AdSection;
