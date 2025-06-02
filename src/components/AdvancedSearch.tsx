
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, MapPin, Calendar, DollarSign, Star } from 'lucide-react';

interface SearchFilters {
  keyword: string;
  category: string;
  location: string;
  dateRange: string;
  minReward: number;
  maxReward: number;
  difficulty: string[];
  type: string[];
  rating: number;
  verified: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: '',
    location: '',
    dateRange: '',
    minReward: 0,
    maxReward: 100,
    difficulty: [],
    type: [],
    rating: 0,
    verified: false
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    'Technologie',
    'Mode',
    'Alimentation',
    'Voyage',
    'Santé',
    'Finance',
    'Éducation',
    'Divertissement'
  ];

  const adTypes = [
    'Vidéo',
    'Image',
    'Texte',
    'Interactive'
  ];

  const difficulties = [
    'Facile',
    'Moyen',
    'Difficile'
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key: 'difficulty' | 'type', value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value)
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    updateActiveFilters();
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      category: '',
      location: '',
      dateRange: '',
      minReward: 0,
      maxReward: 100,
      difficulty: [],
      type: [],
      rating: 0,
      verified: false
    });
    setActiveFilters([]);
    onReset();
  };

  const updateActiveFilters = () => {
    const active: string[] = [];
    
    if (filters.keyword) active.push(`Mot-clé: ${filters.keyword}`);
    if (filters.category) active.push(`Catégorie: ${filters.category}`);
    if (filters.location) active.push(`Localisation: ${filters.location}`);
    if (filters.dateRange) active.push(`Période: ${filters.dateRange}`);
    if (filters.minReward > 0 || filters.maxReward < 100) {
      active.push(`Récompense: ${filters.minReward}-${filters.maxReward} points`);
    }
    if (filters.difficulty.length > 0) active.push(`Difficulté: ${filters.difficulty.join(', ')}`);
    if (filters.type.length > 0) active.push(`Type: ${filters.type.join(', ')}`);
    if (filters.rating > 0) active.push(`Note min: ${filters.rating}/5`);
    if (filters.verified) active.push('Vérifié uniquement');

    setActiveFilters(active);
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = { ...filters };
    
    if (filterToRemove.startsWith('Mot-clé:')) newFilters.keyword = '';
    if (filterToRemove.startsWith('Catégorie:')) newFilters.category = '';
    if (filterToRemove.startsWith('Localisation:')) newFilters.location = '';
    if (filterToRemove.startsWith('Période:')) newFilters.dateRange = '';
    if (filterToRemove.startsWith('Récompense:')) {
      newFilters.minReward = 0;
      newFilters.maxReward = 100;
    }
    if (filterToRemove.startsWith('Difficulté:')) newFilters.difficulty = [];
    if (filterToRemove.startsWith('Type:')) newFilters.type = [];
    if (filterToRemove.startsWith('Note min:')) newFilters.rating = 0;
    if (filterToRemove === 'Vérifié uniquement') newFilters.verified = false;

    setFilters(newFilters);
    updateActiveFilters();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Recherche avancée
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recherche de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="keyword">Mot-clé</Label>
            <Input
              id="keyword"
              placeholder="Rechercher..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Localisation</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ville, pays..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Bouton pour afficher/masquer les filtres avancés */}
        <Button 
          variant="outline" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showAdvanced ? 'Masquer' : 'Afficher'} les filtres avancés
        </Button>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="space-y-6 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Période */}
              <div>
                <Label>Période</Label>
                <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les périodes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les périodes</SelectItem>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Note minimale */}
              <div>
                <Label>Note minimale</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Slider
                    value={[filters.rating]}
                    onValueChange={(value) => handleFilterChange('rating', value[0])}
                    max={5}
                    min={0}
                    step={1}
                    className="flex-1"
                  />
                  <span className="min-w-[2ch]">{filters.rating}</span>
                </div>
              </div>
            </div>

            {/* Récompenses */}
            <div>
              <Label>Plage de récompenses (points)</Label>
              <div className="flex items-center space-x-4 mt-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="min-w-[3ch]">{filters.minReward}</span>
                <Slider
                  value={[filters.minReward, filters.maxReward]}
                  onValueChange={(value) => {
                    handleFilterChange('minReward', value[0]);
                    handleFilterChange('maxReward', value[1]);
                  }}
                  max={1000}
                  min={0}
                  step={5}
                  className="flex-1"
                />
                <span className="min-w-[3ch]">{filters.maxReward}</span>
              </div>
            </div>

            {/* Types de publicité */}
            <div>
              <Label>Types de publicité</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {adTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.type.includes(type)}
                      onCheckedChange={(checked) => handleArrayFilterChange('type', type, checked as boolean)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulté */}
            <div>
              <Label>Difficulté</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {difficulties.map(difficulty => (
                  <div key={difficulty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`difficulty-${difficulty}`}
                      checked={filters.difficulty.includes(difficulty)}
                      onCheckedChange={(checked) => handleArrayFilterChange('difficulty', difficulty, checked as boolean)}
                    />
                    <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">{difficulty}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => handleFilterChange('verified', checked)}
              />
              <Label htmlFor="verified">Annonceurs vérifiés uniquement</Label>
            </div>
          </div>
        )}

        {/* Filtres actifs */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label>Filtres actifs :</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
