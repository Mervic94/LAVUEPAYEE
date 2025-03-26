import React from 'react';
import Navbar from '@/components/navbar';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Foire Aux Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              Comment gagner des points LVP sur LAVUEPAYEE ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Vous pouvez gagner des points LVP en visionnant des publicités disponibles sur notre plateforme. Il existe différents types de publicités (bannières, interstitielles, vidéos, natives) qui rapportent différents montants de points. Pour recevoir les points, vous devez visionner au moins 90% de la durée de la publicité.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">
              Quelle est la différence entre LVP et Vuecoin (Vc) ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Les LVP sont les points que vous gagnez en visionnant des publicités. Les Vuecoins (Vc) sont une monnaie virtuelle obtenue en convertissant vos LVP au taux de 700 LVP pour 1 Vc. Les Vuecoins peuvent être utilisés pour acheter des produits sur notre marketplace ou être retirés via différentes méthodes de paiement.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">
              Comment fonctionne le programme d'affiliation ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Notre programme d'affiliation vous permet de gagner des commissions sur les points gagnés par les utilisateurs que vous parrainez. Le système fonctionne sur 5 niveaux :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Niveau 1 (vos affiliés directs) : 10% de commission</li>
                <li>Niveau 2 (les affiliés de vos affiliés) : 8% de commission</li>
                <li>Niveau 3 : 6% de commission</li>
                <li>Niveau 4 : 4% de commission</li>
                <li>Niveau 5 : 2% de commission</li>
              </ul>
              <p className="mt-2">Vous pouvez trouver votre lien d'affiliation dans votre profil.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">
              Comment retirer mes points ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Vous pouvez retirer vos points de plusieurs façons :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>En les échangeant contre des produits sur notre marketplace</li>
                <li>En les retirant via MTN BENIN</li>
                <li>En les retirant via MOOV AFRICA BENIN</li>
                <li>En les retirant via FEDAPAY</li>
                <li>En les retirant via KIKIAPAY</li>
              </ul>
              <p className="mt-2">Chaque méthode de retrait a des conditions spécifiques (minimum de points, frais, délai de traitement). Consultez la section "Retirer mes points" dans votre profil pour plus de détails.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">
              Combien de publicités puis-je regarder par jour ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Il n'y a pas de limite stricte au nombre de publicités que vous pouvez regarder par jour. Cependant, la disponibilité des publicités dépend de plusieurs facteurs, notamment votre localisation, vos centres d'intérêt et l'inventaire publicitaire disponible sur notre plateforme.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium">
              Puis-je créer plusieurs comptes ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Non, il est strictement interdit de créer plusieurs comptes. Cette pratique est considérée comme frauduleuse et peut entraîner la suspension définitive de tous vos comptes, ainsi que la perte de tous les points accumulés.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium">
              Comment fonctionnent les tâches quotidiennes, hebdomadaires et mensuelles ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Les tâches sont des défis que vous pouvez accomplir pour gagner des points ou des récompenses supplémentaires. Vous pouvez accéder aux tâches en achetant des packs qui vous donnent accès à différentes catégories de tâches (quotidiennes, hebdomadaires, mensuelles). Chaque tâche a un objectif spécifique à accomplir dans un temps imparti, comme visionner un certain nombre de publicités ou atteindre un seuil de points.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg font-medium">
              Quels sont les packs disponibles pour les tâches ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Nous proposons trois packs différents :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Pack Standard</strong> : Donne accès aux tâches quotidiennes</li>
                <li><strong>Pack Premium</strong> : Donne accès aux tâches quotidiennes et hebdomadaires</li>
                <li><strong>Pack Elite</strong> : Donne accès à toutes les tâches (quotidiennes, hebdomadaires et mensuelles)</li>
              </ul>
              <p className="mt-2">Les packs peuvent être achetés avec des Vuecoins ou directement via les méthodes de paiement supportées.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg font-medium">
              Comment contacter le support ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Vous pouvez contacter notre équipe de support via :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Email : support@lavuepayee.com</li>
                <li>Le système de messagerie intégré dans votre compte</li>
                <li>Nos réseaux sociaux (Facebook, Instagram, Twitter, etc.)</li>
              </ul>
              <p className="mt-2">Notre équipe s'efforce de répondre à toutes les demandes dans un délai de 48 heures.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-lg font-medium">
              Mes données sont-elles sécurisées ?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              <p>Oui, la sécurité de vos données est notre priorité. Nous utilisons des protocoles de chiffrement modernes pour protéger vos informations personnelles et financières. Nous ne partageons vos données avec des tiers que lorsque cela est nécessaire pour fournir nos services (par exemple, avec nos partenaires de paiement pour traiter vos retraits).</p>
              <p className="mt-2">Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};

export default FAQ;
