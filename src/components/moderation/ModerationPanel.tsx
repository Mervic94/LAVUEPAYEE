
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Ban, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ModerationService, ContentReport } from '@/services/moderationService';
import { useToast } from '@/hooks/use-toast';

const ModerationPanel = () => {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null);
  const { toast } = useToast();
  
  const moderationService = ModerationService.getInstance();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const fetchedReports = await moderationService.getReports();
      setReports(fetchedReports);
    } catch (error) {
      console.error('Erreur chargement rapports:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les rapports",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportAction = async (reportId: string, action: 'approve' | 'reject') => {
    try {
      const success = await moderationService.moderateReport(reportId, action === 'approve' ? 'approve' : 'dismiss', 'current_moderator');
      
      if (success) {
        const updatedReports = reports.map(report => 
          report.id === reportId 
            ? { ...report, status: action === 'approve' ? 'resolved' as const : 'dismissed' as const }
            : report
        );
        setReports(updatedReports);

        toast({
          title: "Action exécutée",
          description: `Rapport ${action === 'approve' ? 'approuvé' : 'rejeté'} avec succès`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Erreur action rapport:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'exécuter l'action",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: ContentReport['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'reviewed':
        return <Badge variant="default">Examiné</Badge>;
      case 'resolved':
        return <Badge variant="default">Résolu</Badge>;
      case 'dismissed':
        return <Badge variant="outline">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'high':
        return <Ban className="h-4 w-4 text-red-500" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Panneau de Modération</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {reports.filter(r => r.status === 'pending').length} en attente
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Signalements</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {reports.length === 0 ? (
            <Alert>
              <AlertDescription>
                Aucun signalement en attente.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSeverityIcon('medium')}
                        Signalement #{report.id}
                      </CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {report.contentType}
                      </div>
                      <div>
                        <span className="font-medium">Signalé par:</span> {report.reportedBy}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Raison:</span> {report.reason}
                    </div>
                    
                    {report.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleReportAction(report.id, 'approve')}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approuver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReportAction(report.id, 'reject')}
                          className="flex items-center gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          Rejeter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Historique des actions de modération - Fonctionnalité en développement
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Signalements Totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">En Attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {reports.filter(r => r.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Résolus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'resolved').length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModerationPanel;
