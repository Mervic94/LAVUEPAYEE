
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from "@/hooks/use-toast";
import { Palette, Monitor, Globe, Accessibility } from 'lucide-react';

const AppearanceSettings: React.FC = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('fr');
  const [fontSize, setFontSize] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Langue modifiée",
      description: `La langue a été changée vers ${value === 'fr' ? 'Français' : value === 'en' ? 'Anglais' : 'Espagnol'}.`
    });
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    toast({
      title: "Taille de police modifiée",
      description: `La taille de police a été changée vers ${value}.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Thème et couleurs
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Thème</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Mode sombre/clair :</span>
              <ThemeToggle variant="toggle" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Contraste élevé</Label>
              <p className="text-sm text-muted-foreground">
                Améliore la lisibilité avec des couleurs plus contrastées
              </p>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Mode compact</Label>
              <p className="text-sm text-muted-foreground">
                Affichage plus dense avec moins d'espacement
              </p>
            </div>
            <Switch
              checked={compactMode}
              onCheckedChange={setCompactMode}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Langue et région
          </CardTitle>
          <CardDescription>
            Choisissez votre langue et vos préférences régionales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Langue de l'interface</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Taille de police</Label>
            <Select value={fontSize} onValueChange={handleFontSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Petite</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="extra-large">Très grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibilité
          </CardTitle>
          <CardDescription>
            Options pour améliorer l'accessibilité de l'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Réduire les animations</Label>
              <p className="text-sm text-muted-foreground">
                Limite les animations et transitions pour réduire les distractions
              </p>
            </div>
            <Switch
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Affichage
          </CardTitle>
          <CardDescription>
            Paramètres d'affichage et de mise en page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-2"></div>
              <p className="text-sm font-medium">Thème par défaut</p>
            </div>
            <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded mb-2"></div>
              <p className="text-sm font-medium">Thème nature</p>
            </div>
            <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded mb-2"></div>
              <p className="text-sm font-medium">Thème coucher de soleil</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
