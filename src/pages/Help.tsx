
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail, FileQuestion, Wrench, ShieldCheck } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Aide et Support</h1>
        <p className="text-muted-foreground mt-2">Trouvez toutes les réponses à vos questions</p>
      </div>

      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 sm:grid-cols-5">
          <TabsTrigger value="faq" className="flex flex-col items-center gap-1 py-2">
            <FileQuestion className="h-4 w-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex flex-col items-center gap-1 py-2">
            <MessageCircle className="h-4 w-4" />
            <span>Contact</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex flex-col items-center gap-1 py-2">
            <Wrench className="h-4 w-4" />
            <span>Support technique</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col items-center gap-1 py-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex flex-col items-center gap-1 py-2">
            <FileQuestion className="h-4 w-4" />
            <span>Mentions légales</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Foire aux questions</CardTitle>
              <CardDescription>Les réponses aux questions les plus fréquentes</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>Qu'est-ce que LaVuePayee ?</AccordionTrigger>
                  <AccordionContent>
                    LaVuePayee est une plateforme innovante qui permet aux utilisateurs de gagner des récompenses en effectuant différentes tâches en ligne. Nous connectons les consommateurs et les entreprises pour créer une relation mutuellement bénéfique.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>Comment gagner des points ?</AccordionTrigger>
                  <AccordionContent>
                    Vous pouvez gagner des points en accomplissant diverses tâches comme répondre à des sondages, visionner des publicités, partager du contenu sur vos réseaux sociaux, ou encore inviter des amis à rejoindre la plateforme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>Comment convertir mes points en argent ?</AccordionTrigger>
                  <AccordionContent>
                    Vous pouvez convertir vos points en argent via différentes méthodes de paiement comme PayPal, virement bancaire, ou cartes-cadeaux. Consultez la section "Portefeuille" pour plus de détails.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger>Comment fonctionne le programme de parrainage ?</AccordionTrigger>
                  <AccordionContent>
                    Notre programme de parrainage vous permet de gagner des points supplémentaires lorsque vous invitez des amis à rejoindre LaVuePayee. Vous recevez une commission sur les gains de vos filleuls, créant ainsi une source de revenus passive.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
              <CardDescription>Nous sommes là pour vous aider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Phone className="h-4 w-4 mr-2" /> Par téléphone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Du lundi au vendredi, 9h - 18h</p>
                    <p className="font-medium">+33 1 23 45 67 89</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Mail className="h-4 w-4 mr-2" /> Par email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Réponse sous 24h ouvrées</p>
                    <p className="font-medium">support@lavuepayee.com</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground">
                Notre équipe de support client est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter pour toute assistance.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Technique</CardTitle>
              <CardDescription>Résolution des problèmes techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech-1">
                  <AccordionTrigger>Je ne peux pas me connecter à mon compte</AccordionTrigger>
                  <AccordionContent>
                    Vérifiez si votre adresse email et mot de passe sont corrects. Si vous avez oublié votre mot de passe, utilisez l'option "Mot de passe oublié". Si le problème persiste, contactez notre support technique.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tech-2">
                  <AccordionTrigger>L'application est lente ou ne répond pas</AccordionTrigger>
                  <AccordionContent>
                    Essayez de rafraîchir la page ou de vous déconnecter puis reconnecter. Vérifiez également votre connexion internet. Si le problème persiste, effacez votre cache et vos cookies ou essayez d'utiliser un autre navigateur.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tech-3">
                  <AccordionTrigger>Je n'ai pas reçu mes points pour une tâche terminée</AccordionTrigger>
                  <AccordionContent>
                    Les points peuvent prendre jusqu'à 24 heures pour être crédités après la vérification de la tâche. Si après ce délai vous n'avez toujours pas reçu vos points, contactez notre équipe de support avec les détails de la tâche.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tech-4">
                  <AccordionTrigger>Mon paiement est en attente depuis longtemps</AccordionTrigger>
                  <AccordionContent>
                    Les demandes de paiement peuvent prendre jusqu'à 7 jours ouvrables pour être traitées. Si votre paiement est en attente depuis plus longtemps, vérifiez que vos informations de paiement sont correctes et contactez notre support.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Pour tout autre problème technique, n'hésitez pas à contacter notre équipe de support à support@lavuepayee.com
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Protection de vos données et de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <h3 className="text-lg font-semibold">Conseils de sécurité</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Utilisez un mot de passe fort et unique pour votre compte LaVuePayee</li>
                  <li>Activez l'authentification à deux facteurs pour une sécurité renforcée</li>
                  <li>Ne partagez jamais vos identifiants de connexion avec qui que ce soit</li>
                  <li>Méfiez-vous des emails de phishing prétendant provenir de LaVuePayee</li>
                  <li>Vérifiez régulièrement l'historique de connexion à votre compte</li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-4">Notre engagement</h3>
                <p>
                  LaVuePayee s'engage à protéger vos données personnelles et financières avec les technologies de cryptage les plus avancées. Toutes les transactions sont sécurisées et nous ne stockons jamais vos informations bancaires complètes sur nos serveurs.
                </p>
                
                <h3 className="text-lg font-semibold mt-4">Signaler un problème</h3>
                <p>
                  Si vous suspectez une activité frauduleuse sur votre compte ou si vous avez des préoccupations concernant la sécurité, contactez immédiatement notre équipe de sécurité à securite@lavuepayee.com
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="legal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mentions Légales</CardTitle>
              <CardDescription>Informations juridiques sur LaVuePayee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">À propos de notre société</h3>
              <p>
                LaVuePayee est une entreprise enregistrée en France sous le numéro SIRET 123 456 789 00010, dont le siège social est situé au 1 rue de l'Innovation, 75001 Paris.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Droits d'auteur</h3>
              <p>
                Tout le contenu présent sur LaVuePayee, y compris les textes, graphiques, logos, images et logiciels, est la propriété de LaVuePayee ou de ses fournisseurs de contenu et est protégé par les lois françaises et internationales sur le droit d'auteur.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Politique de confidentialité</h3>
              <p>
                Notre politique de confidentialité détaillée est disponible <Link to="/privacy" className="text-primary hover:underline">ici</Link>.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Conditions d'utilisation</h3>
              <p>
                En utilisant notre plateforme, vous acceptez nos conditions d'utilisation disponibles <Link to="/terms" className="text-primary hover:underline">ici</Link>.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Contactez notre service juridique</h3>
              <p>
                Pour toute question juridique, vous pouvez contacter notre service juridique à juridique@lavuepayee.com
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpPage;
