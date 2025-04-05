
import React from 'react';
import { BarChart2, Users, Clock, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, PieChart, BarChart } from "@/components/ui/chart";
import LightbulbIcon from '../icons/LightbulbIcon';

interface AnalyticsTabProps {
  impressionsData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  audienceData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  conversionData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  campaignSuggestions: {
    id: number;
    title: string;
    description: string;
    improvement: string;
  }[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  impressionsData,
  audienceData,
  conversionData,
  campaignSuggestions
}) => {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Tableau de bord Annonceur</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="h-4 w-4 mr-2 text-primary" />
              Impressions Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24,842</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Taux de Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6.2%</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.8% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="h-4 w-4 mr-2 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="LVC" 
                  className="w-full h-full object-contain"
                />
              </div>
              Budget Dépensé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,420 LVC</div>
            <p className="text-xs text-foreground/60 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Mis à jour il y a 3 heures
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-amber-500" />
            Suggestions d'optimisation
          </CardTitle>
          <CardDescription>
            Basées sur l'analyse de vos campagnes précédentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignSuggestions.map(suggestion => (
              <div key={suggestion.id} className="p-4 rounded-lg border bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <h3 className="font-medium text-primary mb-2">{suggestion.title}</h3>
                <p className="text-sm text-foreground/70 mb-2">{suggestion.description}</p>
                <p className="text-sm font-medium text-green-600">{suggestion.improvement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Impressions quotidiennes</CardTitle>
            <CardDescription>Performance sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={impressionsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
              }}
              className="aspect-[2/1]"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition de l'audience</CardTitle>
            <CardDescription>Par tranches d'âge</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={audienceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right' as const,
                  },
                },
              }}
              className="aspect-[2/1]"
            />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance de conversion</CardTitle>
            <CardDescription>Taux de vues, clics et conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={conversionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
              className="aspect-[3/1]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
