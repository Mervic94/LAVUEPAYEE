
import React, { useState } from 'react';
import { Grid, List, Plus, Filter, Search, Image, Film, MoreVertical, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Type pour les créations publicitaires
interface AdCreative {
  id: string;
  name: string;
  type: 'image' | 'video' | 'carousel';
  thumbnail: string;
  dimensions: string;
  created: string;
  usedIn: string[];
}

// Données de démonstration
const demoCreatives: AdCreative[] = [
  {
    id: 'cr-001',
    name: 'Bannière produit principal',
    type: 'image',
    thumbnail: '/placeholder.svg',
    dimensions: '1200x628px',
    created: '2025-05-15',
    usedIn: ['Lancement produit été 2025']
  },
  {
    id: 'cr-002',
    name: 'Vidéo présentation',
    type: 'video',
    thumbnail: '/placeholder.svg',
    dimensions: '1080x1080px',
    created: '2025-05-20',
    usedIn: ['Lancement produit été 2025', 'Campagne fidélité clients']
  },
  {
    id: 'cr-003',
    name: 'Carousel produits',
    type: 'carousel',
    thumbnail: '/placeholder.svg',
    dimensions: '1080x1080px',
    created: '2025-05-25',
    usedIn: []
  },
  {
    id: 'cr-004',
    name: 'Bannière promotionnelle',
    type: 'image',
    thumbnail: '/placeholder.svg',
    dimensions: '1200x628px',
    created: '2025-06-01',
    usedIn: ['Promotion Black Friday']
  }
];

const AdCreativeLibrary: React.FC = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [creatives, setCreatives] = useState<AdCreative[]>(demoCreatives);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video' | 'carousel'>('all');
  
  const filteredCreatives = creatives.filter(creative => {
    const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeFilter === 'all' || creative.type === activeFilter;
    return matchesSearch && matchesType;
  });
  
  const handleDelete = (id: string) => {
    setCreatives(creatives.filter(c => c.id !== id));
    toast({
      title: "Création supprimée",
      description: "La création publicitaire a été supprimée.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Bibliothèque de créations</h2>
          <p className="text-muted-foreground">
            Gérez vos images, vidéos et autres créations publicitaires
          </p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle création
        </Button>
      </div>
      
      <Tabs defaultValue="library" className="w-full">
        <TabsList>
          <TabsTrigger value="library">Bibliothèque</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des créations..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex items-center border rounded-md p-1">
                <Button
                  variant={activeFilter === 'all' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter('all')}
                >
                  Tout
                </Button>
                <Button
                  variant={activeFilter === 'image' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter('image')}
                >
                  Images
                </Button>
                <Button
                  variant={activeFilter === 'video' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter('video')}
                >
                  Vidéos
                </Button>
                <Button
                  variant={activeFilter === 'carousel' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter('carousel')}
                >
                  Carousels
                </Button>
              </div>
              
              <div className="flex items-center border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {filteredCreatives.length === 0 ? (
            <div className="text-center p-8 border rounded-lg bg-secondary/10">
              <Image className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">Aucune création trouvée</p>
              <p className="text-sm text-muted-foreground mb-4">
                Aucune création ne correspond à vos critères de recherche.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCreatives.map(creative => (
                <Card key={creative.id}>
                  <div className="relative aspect-video bg-secondary/30 flex items-center justify-center overflow-hidden">
                    {creative.type === 'video' ? (
                      <Film className="h-12 w-12 text-muted-foreground" />
                    ) : (
                      <img
                        src={creative.thumbnail}
                        alt={creative.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Dupliquer</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(creative.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium truncate">{creative.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      {creative.dimensions} • Créé le {creative.created}
                    </div>
                    {creative.usedIn.length > 0 && (
                      <div className="text-xs mt-1">
                        <span className="text-muted-foreground">Utilisé dans: </span>
                        <span>{creative.usedIn.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      Utiliser
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y">
                <thead className="bg-secondary/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Dimensions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                      Créé le
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {filteredCreatives.map(creative => (
                    <tr key={creative.id} className="hover:bg-secondary/5">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-secondary/20 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                            {creative.type === 'video' ? (
                              <Film className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <img
                                src={creative.thumbnail}
                                alt={creative.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="truncate max-w-[200px]">{creative.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                        <span className="capitalize">{creative.type}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                        {creative.dimensions}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
                        {creative.created}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          Utiliser
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Dupliquer</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(creative.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Bannière promo',
                type: 'Image',
                dimensions: '1200×628',
                description: 'Idéal pour un lancement produit ou une offre limitée.',
                icon: Image,
              },
              {
                name: 'Vidéo courte',
                type: 'Vidéo',
                dimensions: '1080×1080 · 15s',
                description: 'Format carré optimisé pour le feed mobile et les stories.',
                icon: Film,
              },
              {
                name: 'Annonce native',
                type: 'Native',
                dimensions: 'Responsive',
                description: 'S\'intègre au design des plateformes partenaires.',
                icon: Image,
              },
            ].map((tpl) => {
              const Icon = tpl.icon;
              return (
                <Card key={tpl.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{tpl.name}</p>
                        <p className="text-xs text-muted-foreground">{tpl.type} · {tpl.dimensions}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{tpl.description}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        toast({ title: 'Modèle sélectionné', description: `Utilisation du modèle « ${tpl.name} »` })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Utiliser ce modèle
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdCreativeLibrary;
