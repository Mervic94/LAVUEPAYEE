
import { 
  ImpressionsData, 
  ConversionData, 
  AudienceData, 
  CampaignSuggestion,
  CampaignHistoryItem
} from '../charts/ChartModels';

export const impressionsData: ImpressionsData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Impressions',
      data: [1200, 1900, 3000, 5000, 6000, 7000, 4000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    }
  ],
};

export const conversionData: ConversionData = {
  labels: ['Vues', 'Clics', 'Conversions'],
  datasets: [
    {
      label: 'Taux',
      data: [5000, 1500, 300],
      backgroundColor: [
        'rgba(155, 135, 245, 0.7)',
        'rgba(14, 165, 233, 0.7)',
        'rgba(217, 70, 239, 0.7)'
      ],
      borderColor: [
        'rgb(155, 135, 245)',
        'rgb(14, 165, 233)',
        'rgb(217, 70, 239)',
      ],
      borderWidth: 1,
    },
  ],
};

export const audienceData: AudienceData = {
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      label: 'Audience',
      data: [15, 30, 25, 20, 10],
      backgroundColor: [
        'rgba(249, 115, 22, 0.7)',
        'rgba(14, 165, 233, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(217, 70, 239, 0.7)',
        'rgba(142, 145, 150, 0.7)'
      ],
      borderColor: [
        'rgb(249, 115, 22)',
        'rgb(14, 165, 233)',
        'rgb(139, 92, 246)',
        'rgb(217, 70, 239)',
        'rgb(142, 145, 150)',
      ],
      borderWidth: 1,
    },
  ],
};

export const campaignSuggestions: CampaignSuggestion[] = [
  {
    id: 1,
    title: "Optimisez pour les 25-34 ans",
    description: "Ce groupe démographique a montré le meilleur taux de conversion pour vos publicités précédentes.",
    improvement: "+15% de conversions potentielles"
  },
  {
    id: 2,
    title: "Augmentez votre budget le vendredi",
    description: "Vos impressions sont les plus élevées en fin de semaine, augmentez votre budget pour maximiser l'impact.",
    improvement: "+22% de visibilité estimée"
  },
  {
    id: 3,
    title: "Utilisez plus de vidéos interstitielles",
    description: "Les publicités vidéo ont un taux d'engagement 3x supérieur à vos bannières actuelles.",
    improvement: "+30% d'engagement estimé"
  }
];

export const campaignHistory: CampaignHistoryItem[] = [
  {
    id: "camp-001",
    name: "Promotion estivale 2023",
    type: "Vidéo",
    dateRange: "01/06/2023 - 31/08/2023",
    impressions: 42500,
    clicks: 3800,
    conversions: 720,
    budget: "15000 LVC",
    status: "completed",
    performance: [
      { date: "Juin", impressions: 12000, clicks: 1100, conversions: 210 },
      { date: "Juillet", impressions: 15500, clicks: 1400, conversions: 260 },
      { date: "Août", impressions: 15000, clicks: 1300, conversions: 250 }
    ]
  },
  {
    id: "camp-002",
    name: "Lancement nouvelle application",
    type: "Native",
    dateRange: "15/09/2023 - 15/10/2023",
    impressions: 28700,
    clicks: 3200,
    conversions: 650,
    budget: "12000 LVC",
    status: "completed",
    performance: [
      { date: "Sem 1-2", impressions: 14000, clicks: 1600, conversions: 320 },
      { date: "Sem 3-4", impressions: 14700, clicks: 1600, conversions: 330 }
    ]
  },
  {
    id: "camp-003",
    name: "Offres de fin d'année",
    type: "Bannière",
    dateRange: "01/12/2023 - 31/12/2023",
    impressions: 35600,
    clicks: 2800,
    conversions: 560,
    budget: "13500 LVC",
    status: "completed",
    performance: [
      { date: "Sem 1", impressions: 8500, clicks: 650, conversions: 130 },
      { date: "Sem 2", impressions: 9000, clicks: 700, conversions: 140 },
      { date: "Sem 3", impressions: 9500, clicks: 750, conversions: 150 },
      { date: "Sem 4", impressions: 8600, clicks: 700, conversions: 140 }
    ]
  }
];
