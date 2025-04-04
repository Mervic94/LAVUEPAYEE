
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Play, Pause, Trash2, Edit, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types pour les données de campagne
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'ended' | 'pending' | 'rejected';
  type: 'image' | 'video' | 'carousel';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  startDate: string;
  endDate?: string;
}

// Données de démonstration
const demoData: Campaign[] = [
  {
    id: '1',
    name: 'Lancement produit été 2025',
    status: 'active',
    type: 'image',
    budget: 1200,
    spent: 450,
    impressions: 15000,
    clicks: 320,
    ctr: 2.13,
    startDate: '2025-06-15',
    endDate: '2025-08-15'
  },
  {
    id: '2',
    name: 'Promotion Black Friday',
    status: 'pending',
    type: 'video',
    budget: 3500,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    startDate: '2025-11-20',
    endDate: '2025-11-30'
  },
  {
    id: '3',
    name: 'Campagne fidélité clients',
    status: 'paused',
    type: 'carousel',
    budget: 800,
    spent: 220,
    impressions: 7200,
    clicks: 95,
    ctr: 1.32,
    startDate: '2025-05-01',
    endDate: undefined
  },
  {
    id: '4',
    name: 'Notoriété marque - Version A',
    status: 'ended',
    type: 'image',
    budget: 1500,
    spent: 1500,
    impressions: 38500,
    clicks: 920,
    ctr: 2.39,
    startDate: '2025-03-10',
    endDate: '2025-04-10'
  }
];

// Fonction pour obtenir la couleur en fonction du statut
const getStatusColorClass = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'paused':
      return 'bg-amber-100 text-amber-800';
    case 'ended':
      return 'bg-gray-100 text-gray-800';
    case 'pending':
      return 'bg-blue-100 text-blue-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Fonction pour obtenir le libellé en français du statut
const getStatusLabel = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'paused':
      return 'En pause';
    case 'ended':
      return 'Terminée';
    case 'pending':
      return 'En attente';
    case 'rejected':
      return 'Refusée';
    default:
      return status;
  }
};

const CampaignsList: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>(demoData);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  
  // Filtrer les campagnes en fonction de la recherche et des filtres
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Gérer le changement de statut d'une campagne (activer/mettre en pause)
  const handleStatusChange = (id: string, newStatus: 'active' | 'paused') => {
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === id ? { ...campaign, status: newStatus } : campaign
      )
    );
    
    toast({
      title: newStatus === 'active' ? 'Campagne activée' : 'Campagne mise en pause',
      description: `Le statut de la campagne a été mis à jour.`,
    });
  };
  
  // Gérer la suppression d'une campagne
  const handleDelete = (id: string) => {
    setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign.id !== id));
    toast({
      title: 'Campagne supprimée',
      description: 'La campagne a été supprimée avec succès.',
    });
  };
  
  // Gérer l'affichage des détails d'une campagne
  const showDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des campagnes..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select 
              defaultValue="all" 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="paused">En pause</SelectItem>
                <SelectItem value="ended">Terminées</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="rejected">Refusées</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline">
            Exporter les données
          </Button>
          
          <Button>
            Nouvelle campagne
          </Button>
        </div>
      </div>
      
      {filteredCampaigns.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-secondary/10">
          <p className="text-muted-foreground">Aucune campagne ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom de la campagne</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Budget</TableHead>
                  <TableHead className="hidden md:table-cell">Impressions</TableHead>
                  <TableHead className="hidden md:table-cell">Clics</TableHead>
                  <TableHead className="hidden lg:table-cell">CTR</TableHead>
                  <TableHead className="hidden lg:table-cell">Dates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="cursor-pointer hover:bg-secondary/5" onClick={() => showDetails(campaign)}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(campaign.status)}`}>
                        {getStatusLabel(campaign.status)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {campaign.budget.toLocaleString()} LVC
                      <div className="w-full bg-secondary/30 h-1.5 rounded-full mt-1">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {campaign.spent.toLocaleString()} LVC dépensés
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{campaign.impressions.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{campaign.clicks.toLocaleString()}</TableCell>
                    <TableCell className="hidden lg:table-cell">{campaign.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-xs">
                        <div>Début: {campaign.startDate}</div>
                        {campaign.endDate && <div>Fin: {campaign.endDate}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              showDetails(campaign);
                            }}
                          >
                            <BarChart2 className="mr-2 h-4 w-4" />
                            <span>Voir les détails</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Edit campaign', campaign.id);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {campaign.status === 'active' ? (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(campaign.id, 'paused');
                              }}
                            >
                              <Pause className="mr-2 h-4 w-4" />
                              <span>Mettre en pause</span>
                            </DropdownMenuItem>
                          ) : campaign.status === 'paused' ? (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(campaign.id, 'active');
                              }}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              <span>Activer</span>
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(campaign.id);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedCampaign.name}</DialogTitle>
                <DialogDescription>Détails de la campagne</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(selectedCampaign.status)}`}>
                      {getStatusLabel(selectedCampaign.status)}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Type de contenu</h4>
                    <p>{selectedCampaign.type === 'image' ? 'Image' : selectedCampaign.type === 'video' ? 'Vidéo' : 'Carousel'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Période</h4>
                    <p>Début: {selectedCampaign.startDate}</p>
                    {selectedCampaign.endDate && <p>Fin: {selectedCampaign.endDate}</p>}
                    {!selectedCampaign.endDate && <p>Campagne continue (sans date de fin)</p>}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Budget</h4>
                    <div className="flex items-center justify-between mb-1">
                      <span>{selectedCampaign.spent.toLocaleString()} LVC dépensés sur {selectedCampaign.budget.toLocaleString()} LVC</span>
                      <span className="text-sm">{Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (selectedCampaign.spent / selectedCampaign.budget) * 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Impressions</h4>
                      <p className="font-bold">{selectedCampaign.impressions.toLocaleString()}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Clics</h4>
                      <p className="font-bold">{selectedCampaign.clicks.toLocaleString()}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">CTR</h4>
                      <p className="font-bold">{selectedCampaign.ctr.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                  Fermer
                </Button>
                <div className="flex gap-2">
                  {selectedCampaign.status === 'active' ? (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(selectedCampaign.id, 'paused');
                        setShowDetailDialog(false);
                      }}
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Mettre en pause
                    </Button>
                  ) : selectedCampaign.status === 'paused' ? (
                    <Button 
                      onClick={() => {
                        handleStatusChange(selectedCampaign.id, 'active');
                        setShowDetailDialog(false);
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Activer
                    </Button>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
