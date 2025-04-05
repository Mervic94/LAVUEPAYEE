
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InfoIcon, BookIcon, LifeBuoyIcon, ToolIcon, MailIcon, PhoneIcon } from 'lucide-react';
import Navbar from '@/components/navbar';

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl pt-24 pb-12">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Centre d'Aide et Support</h1>
          <p className="text-muted-foreground max-w-2xl">
            Vous trouverez ici toutes les ressources nécessaires pour vous aider à naviguer et tirer le meilleur parti de la plateforme LAVUEPAYEE.
          </p>
        </div>
        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookIcon className="h-4 w-4" />
              <span>Guides</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <ToolIcon className="h-4 w-4" />
              <span>Outils</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
          </TabsList>
          
          {/* FAQ Section */}
          <TabsContent value="faq" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Questions Fréquemment Posées</CardTitle>
                <CardDescription>
                  Trouvez rapidement des réponses aux questions les plus courantes concernant la plateforme LAVUEPAYEE.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Comment fonctionnent les points LVP?</AccordionTrigger>
                    <AccordionContent>
                      Les points LVP sont la monnaie de la plateforme LAVUEPAYEE. Vous gagnez des points en regardant des publicités, 
                      en accomplissant des tâches et grâce au programme d'affiliation. Ces points peuvent être échangés contre des produits 
                      dans la marketplace ou convertis en argent réel via différentes méthodes de retrait.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Comment fonctionne le programme d'affiliation?</AccordionTrigger>
                    <AccordionContent>
                      Notre programme d'affiliation vous permet de gagner des commissions sur 5 niveaux. Vous recevez 10% des points gagnés 
                      par vos affiliés directs (niveau 1), puis 5% au niveau 2, 3% au niveau 3, etc. Partagez simplement votre lien d'affiliation 
                      et invitez d'autres personnes à rejoindre la plateforme pour commencer à gagner des commissions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Comment puis-je convertir mes LVP en argent réel?</AccordionTrigger>
                    <AccordionContent>
                      Vous pouvez convertir vos LVP en argent réel une fois que vous avez atteint le seuil minimum de retrait. 
                      Allez dans votre profil, cliquez sur "Retirer" et choisissez votre méthode de paiement préférée: virement bancaire, 
                      PayPal, mobile money ou carte cadeau. Le taux de conversion est généralement de 1000 LVP = 10€, mais peut varier.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Comment devenir annonceur sur la plateforme?</AccordionTrigger>
                    <AccordionContent>
                      Pour devenir annonceur, vous devez d'abord vous inscrire en tant qu'utilisateur, puis compléter la 
                      vérification KYC/KYB dans votre profil. Une fois vérifié, vous pouvez activer votre compte annonceur 
                      et commencer à créer des campagnes publicitaires. Un solde minimum est requis pour lancer vos premières campagnes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Quels sont les différents types de packs disponibles?</AccordionTrigger>
                    <AccordionContent>
                      LAVUEPAYEE propose plusieurs packs qui déterminent le nombre et le type de tâches disponibles quotidiennement. 
                      Le pack Gratuit offre des fonctionnalités de base, tandis que les packs Premium, Business et Enterprise 
                      débloquent des tâches mieux rémunérées, des formations exclusives et d'autres avantages.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Guides Section */}
          <TabsContent value="guides" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Guides et Tutoriels</CardTitle>
                <CardDescription>
                  Consultez nos guides détaillés pour découvrir comment utiliser toutes les fonctionnalités de la plateforme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Guide du débutant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Tout ce que vous devez savoir pour bien démarrer sur LAVUEPAYEE. Apprenez à créer votre compte, 
                        compléter votre profil et gagner vos premiers points.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Maximisez vos gains</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Stratégies avancées pour optimiser vos revenus sur la plateforme. Découvrez les meilleures pratiques 
                        pour l'affiliation et les tâches les plus rentables.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Guide de l'annonceur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comment créer des campagnes publicitaires efficaces. Apprenez à cibler votre audience, 
                        créer du contenu engageant et analyser vos performances.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Sécurité et confidentialité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Protégez votre compte et vos données personnelles. Conseils sur l'authentification à deux facteurs, 
                        la sécurité des mots de passe et la confidentialité.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tools Section */}
          <TabsContent value="tools" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Outils et Utilitaires</CardTitle>
                <CardDescription>
                  Accédez à des outils pratiques pour améliorer votre expérience sur LAVUEPAYEE.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Calculateur de Revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Estimez vos revenus potentiels en fonction de vos activités et de votre réseau d'affiliation.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Générateur de Liens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Créez des liens d'affiliation personnalisés pour différentes plateformes et campagnes.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Analyseur de Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Analysez vos statistiques et identifiez les opportunités d'amélioration.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Planificateur de Tâches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Organisez votre emploi du temps pour maximiser votre productivité sur la plateforme.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Extensions Navigateur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Téléchargez nos extensions pour Chrome, Firefox et autres navigateurs.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Vérificateur de Compte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Vérifiez l'état de votre compte et complétez les étapes manquantes pour débloquer toutes les fonctionnalités.
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Accéder à l'outil
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Contact Section */}
          <TabsContent value="contact" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Contactez-nous</CardTitle>
                <CardDescription>
                  Vous ne trouvez pas ce que vous cherchez ? Notre équipe de support est là pour vous aider.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MailIcon className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">support@lavuepayee.com</p>
                        <p className="text-sm text-muted-foreground">Réponse sous 24-48 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <PhoneIcon className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Téléphone</h4>
                        <p className="text-sm text-muted-foreground">+33 (0)1 23 45 67 89</p>
                        <p className="text-sm text-muted-foreground">Lundi au vendredi, 9h-18h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <LifeBuoyIcon className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Chat en direct</h4>
                        <p className="text-sm text-muted-foreground">Disponible 7j/7, 24h/24</p>
                        <p className="text-sm text-muted-foreground">Réponse en quelques minutes</p>
                      </div>
                    </div>
                  </div>
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                      <input
                        id="name"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="votre@email.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea
                        id="message"
                        className="w-full p-2 border rounded-md bg-background min-h-[100px]"
                        placeholder="Comment pouvons-nous vous aider ?"
                      ></textarea>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                      Envoyer
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;
