import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Ad {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  link_url?: string;
  type: string;
  status: string;
  reward_points: number;
  reward_amount: number;
  views_count: number;
  clicks_count: number;
  shares_count: number;
  created_at: string;
  campaign_id: string;
}

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  budget: number;
  spent: number;
  status: string;
  start_date?: string;
  end_date?: string;
  target_audience?: any;
  advertiser_id: string;
}

export const useAdsData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<Ad[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Fetch available ads
  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error: any) {
      console.error('Error fetching ads:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les publicités"
      });
    }
  };

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les campagnes"
      });
    }
  };

  // Get ad by ID
  const getAdById = (id: string): Ad | undefined => {
    return ads.find(ad => ad.id === id);
  };

  // Get campaign by ID
  const getCampaignById = (id: string): Campaign | undefined => {
    return campaigns.find(campaign => campaign.id === id);
  };

  // Refresh data
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchAds(), fetchCampaigns()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    loading,
    ads,
    campaigns,
    getAdById,
    getCampaignById,
    refreshData,
    fetchAds,
    fetchCampaigns
  };
};