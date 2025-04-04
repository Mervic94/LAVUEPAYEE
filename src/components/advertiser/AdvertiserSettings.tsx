
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdvertiserSettings: React.FC = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Paramètres</h2>
      
      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>
                Modifiez les informations principales de votre compte annonceur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Nom de l'entreprise</Label>
                  <Input id="company" defaultValue="Ma Société SARL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input id="website" defaultValue="https://masociete.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Secteur d'activité</Label>
                  <Select defaultValue="retail">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Sélectionner un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Commerce de détail</SelectItem>
                      <SelectItem value="tech">Technologie</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Santé</SelectItem>
                      <SelectItem value="education">Éducation</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Taille de l'entreprise</Label>
                  <Select defaultValue="small">
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Sélectionner une taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Entrepreneur individuel</SelectItem>
                      <SelectItem value="micro">2-10 employés</SelectItem>
                      <SelectItem value="small">11-50 employés</SelectItem>
                      <SelectItem value="medium">51-200 employés</SelectItem>
                      <SelectItem value="large">201-1000 employés</SelectItem>
                      <SelectItem value="enterprise">1000+ employés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description de l'entreprise</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez votre entreprise en quelques phrases"
                  defaultValue="Nous proposons des produits innovants pour améliorer le quotidien de nos clients."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Documents légaux</CardTitle>
              <CardDescription>
                Documents nécessaires pour la vérification de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kbis">KBIS / Document d'immatriculation</Label>
                <div className="flex items-center gap-2">
                  <Input id="kbis" type="file" className="max-w-md" />
                  <Button variant="outline">Télécharger</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Format: PDF, JPG, PNG. Taille max: 5 MB
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id">Pièce d'identité du représentant légal</Label>
                <div className="flex items-center gap-2">
                  <Input id="id" type="file" className="max-w-md" />
                  <Button variant="outline">Télécharger</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Format: PDF, JPG, PNG. Taille max: 5 MB
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour: 15/05/2025
              </p>
              <Button onClick={handleSaveSettings}>Mettre à jour les documents</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moyens de paiement</CardTitle>
              <CardDescription>
                Gérez vos moyens de paiement pour les dépôts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 bg-secondary/30 rounded"></div>
                  <div>
                    <p className="font-medium">Carte Visa ••••1234</p>
                    <p className="text-sm text-muted-foreground">Expire: 05/2027</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Modifier</Button>
                  <Button variant="destructive" size="sm">Supprimer</Button>
                </div>
              </div>
              
              <Button variant="outline">
                Ajouter un moyen de paiement
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Informations de facturation</CardTitle>
              <CardDescription>
                Adresse et informations pour la facturation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-name">Nom de facturation</Label>
                  <Input id="billing-name" defaultValue="Ma Société SARL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Numéro TVA / SIRET</Label>
                  <Input id="tax-id" defaultValue="FR123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue="123 Rue du Commerce" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" defaultValue="Paris" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Code postal</Label>
                  <Input id="postal" defaultValue="75001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select defaultValue="france">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Sélectionner un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="belgium">Belgique</SelectItem>
                      <SelectItem value="switzerland">Suisse</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Configurez les notifications que vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notifications par email</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-campaigns" className="font-medium">Mises à jour des campagnes</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications lorsque vos campagnes sont approuvées, refusées ou terminées
                      </p>
                    </div>
                    <Switch id="email-campaigns" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-performance" className="font-medium">Rapports de performance</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des rapports hebdomadaires sur la performance de vos campagnes
                      </p>
                    </div>
                    <Switch id="email-performance" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-billing" className="font-medium">Notifications de facturation</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications concernant les paiements et les factures
                      </p>
                    </div>
                    <Switch id="email-billing" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-news" className="font-medium">Actualités et mises à jour</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des informations sur les nouvelles fonctionnalités et les mises à jour
                      </p>
                    </div>
                    <Switch id="email-news" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Notifications dans l'application</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-campaigns" className="font-medium">Mises à jour des campagnes</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications dans l'application sur vos campagnes
                      </p>
                    </div>
                    <Switch id="app-campaigns" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-performance" className="font-medium">Alertes de performance</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des alertes lorsque la performance de vos campagnes change significativement
                      </p>
                    </div>
                    <Switch id="app-performance" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-billing" className="font-medium">Notifications de facturation</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications concernant vos dépenses et votre solde
                      </p>
                    </div>
                    <Switch id="app-billing" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>Enregistrer les préférences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membres de l'équipe</CardTitle>
              <CardDescription>
                Gérez les accès à votre compte annonceur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      TD
                    </div>
                    <div>
                      <p className="font-medium">Thomas Dubois (Vous)</p>
                      <p className="text-sm text-muted-foreground">thomas.dubois@example.com</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Administrateur
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                Inviter un membre
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Plan actuel: 1 membre (Plan de base)
              </p>
              <Button variant="outline">Mettre à niveau le plan</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rôles et permissions</CardTitle>
              <CardDescription>
                Définissez les niveaux d'accès pour votre équipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Administrateur</p>
                      <p className="text-sm text-muted-foreground">Accès complet à toutes les fonctionnalités</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>✓ Gérer les campagnes</p>
                    <p>✓ Gérer les membres de l'équipe</p>
                    <p>✓ Facturation et paiements</p>
                    <p>✓ Paramètres du compte</p>
                  </div>
                </div>
                
                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Éditeur</p>
                      <p className="text-sm text-muted-foreground">Peut créer et gérer des campagnes</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>✓ Gérer les campagnes</p>
                    <p>✓ Voir les statistiques</p>
                    <p>✘ Gérer les membres de l'équipe</p>
                    <p>✘ Facturation et paiements</p>
                  </div>
                </div>
                
                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Analyste</p>
                      <p className="text-sm text-muted-foreground">Peut consulter les statistiques uniquement</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>✓ Voir les campagnes</p>
                    <p>✓ Voir les statistiques</p>
                    <p>✘ Modifier les campagnes</p>
                    <p>✘ Gérer les membres de l'équipe</p>
                    <p>✘ Facturation et paiements</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserSettings;
