
export interface ImpressionsData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export interface ConversionData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface AudienceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface CampaignSuggestion {
  id: number;
  title: string;
  description: string;
  improvement: string;
}

export interface CampaignHistoryItem {
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
}
