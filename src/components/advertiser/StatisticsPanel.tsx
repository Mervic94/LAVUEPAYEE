
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "@/components/ui/chart";

const StatisticsPanel: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Données de démonstration pour les graphiques
  const impressionData = {
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
  
  const clicksData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Clics',
        data: [120, 190, 300, 500, 600, 700, 400],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      }
    ],
  };
  
  const conversionData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Taux de conversion (%)',
        data: [2.1, 3.4, 2.8, 3.1, 4.0, 3.2, 2.9],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      }
    ],
  };
  
  const audienceData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Répartition',
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(217, 70, 239, 0.7)',
          'rgba(107, 114, 128, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const deviceData = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [
      {
        label: 'Appareils',
        data: [68, 24, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const performanceByFormatData = {
    labels: ['Bannières', 'Vidéos', 'Carousels', 'Posts natifs'],
    datasets: [
      {
        label: 'CTR (%)',
        data: [1.8, 3.2, 2.5, 2.9],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h4 className="text-lg font-medium">Performances des campagnes</h4>
        <Select 
          defaultValue="7d" 
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 derniers jours</SelectItem>
            <SelectItem value="30d">30 derniers jours</SelectItem>
            <SelectItem value="90d">90 derniers jours</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
            <SelectItem value="all">Toutes les données</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Impressions</CardTitle>
            <CardDescription>Total sur la période</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">28,100</div>
            <span className="text-xs text-green-600 flex items-center">
              +12.5% par rapport à la période précédente
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Clics</CardTitle>
            <CardDescription>Total sur la période</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">2,810</div>
            <span className="text-xs text-green-600 flex items-center">
              +8.3% par rapport à la période précédente
            </span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">CTR moyen</CardTitle>
            <CardDescription>Taux de clic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">2.9%</div>
            <span className="text-xs text-amber-600 flex items-center">
              -0.2% par rapport à la période précédente
            </span>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="format">Format</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendances d'impressions</CardTitle>
              <CardDescription>Évolution sur la période sélectionnée</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={impressionData}
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
                className="aspect-[3/1]"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendances de clics</CardTitle>
                <CardDescription>Évolution sur la période sélectionnée</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={clicksData}
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
                <CardTitle>Taux de conversion</CardTitle>
                <CardDescription>Pourcentage de conversions par jour</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={conversionData}
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
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par âge</CardTitle>
              <CardDescription>Distribution démographique</CardDescription>
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
              <CardTitle>Répartition par appareil</CardTitle>
              <CardDescription>Types d'appareils utilisés</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={deviceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right' as const,
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
        </TabsContent>
        
        <TabsContent value="format">
          <Card>
            <CardHeader>
              <CardTitle>Performance par format</CardTitle>
              <CardDescription>Comparaison des taux de clic (CTR) par format</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={performanceByFormatData}
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
                className="aspect-[3/1]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsPanel;
