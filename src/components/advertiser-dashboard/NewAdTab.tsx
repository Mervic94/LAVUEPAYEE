
import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const NewAdTab: React.FC = () => {
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adType, setAdType] = useState('banner');
  const [adBudget, setAdBudget] = useState('1000');
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ad submitted:', { adTitle, adDescription, adType, adBudget });
    // Reset form or show success message
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Créer une nouvelle publicité</h2>
      
      <form onSubmit={handleAdSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ad-title">Titre de la publicité</Label>
              <Input 
                id="ad-title"
                value={adTitle}
                onChange={(e) => setAdTitle(e.target.value)}
                placeholder="Entrez un titre accrocheur"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="ad-description">Description</Label>
              <Textarea 
                id="ad-description"
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
                placeholder="Décrivez votre produit ou service"
                className="mt-1 h-32"
              />
            </div>
            
            <div>
              <Label htmlFor="ad-type">Type de publicité</Label>
              <Select 
                value={adType}
                onValueChange={setAdType}
              >
                <SelectTrigger id="ad-type" className="mt-1">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banner">Bannière</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="interstitial">Interstitielle</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="ad-budget">Budget (LVC)</Label>
              <Input 
                id="ad-budget"
                type="number"
                value={adBudget}
                onChange={(e) => setAdBudget(e.target.value)}
                placeholder="Entrez votre budget"
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Télécharger vos médias</Label>
              <div className="mt-1 border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center">
                <UploadCloud className="h-8 w-8 mx-auto text-foreground/60" />
                <p className="mt-2 text-sm text-foreground/70">
                  Glissez-déposez vos fichiers ici ou cliquez pour parcourir
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Parcourir les fichiers
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Ciblage</Label>
              <div className="mt-1 p-4 rounded-lg border border-foreground/20">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="age-target" className="text-sm">Âge</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="age-target" className="mt-1">
                        <SelectValue placeholder="Sélectionnez une tranche d'âge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les âges</SelectItem>
                        <SelectItem value="18-24">18-24 ans</SelectItem>
                        <SelectItem value="25-34">25-34 ans</SelectItem>
                        <SelectItem value="35-44">35-44 ans</SelectItem>
                        <SelectItem value="45-54">45-54 ans</SelectItem>
                        <SelectItem value="55+">55 ans et plus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="gender-target" className="text-sm">Genre</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="gender-target" className="mt-1">
                        <SelectValue placeholder="Sélectionnez un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="location-target" className="text-sm">Localisation</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="location-target" className="mt-1">
                        <SelectValue placeholder="Sélectionnez une localisation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toute la France</SelectItem>
                        <SelectItem value="paris">Paris et région parisienne</SelectItem>
                        <SelectItem value="lyon">Lyon et sa périphérie</SelectItem>
                        <SelectItem value="marseille">Marseille et sa périphérie</SelectItem>
                        <SelectItem value="custom">Personnalisé...</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button">
            Enregistrer le brouillon
          </Button>
          <Button type="submit">
            Créer la publicité
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewAdTab;
