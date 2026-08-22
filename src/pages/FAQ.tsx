import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { 
import Seo from '@/components/Seo';
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqSections = [
    {
      title: "Gagner des points",
      items: [
        {
          question: "Comment gagner des points LVP sur LAVUEPAYEE ?",
          answer: "Vous pouvez gagner des points LVP en visionnant des publicités disponibles sur notre plateforme. Il existe différents types de publicités (bannières, interstitielles, vidéos, natives) qui rapportent différents montants de points. Pour recevoir les points, vous devez visionner au moins 90% de la durée de la publicité."
        },
        {
          question: "Combien de publicités puis-je regarder par jour ?",
          answer: "Il n'y a pas de limite stricte au nombre de publicités que vous pouvez regarder par jour. Cependant, la disponibilité des publicités dépend de plusieurs facteurs, notamment votre localisation, vos centres d'intérêt et l'inventaire publicitaire disponible sur notre plateforme."
        },
        {
          question: "Comment fonctionnent les tâches quotidiennes, hebdomadaires et mensuelles ?",
          answer: "Les tâches sont des défis que vous pouvez accomplir pour gagner des points ou des récompenses supplémentaires. Vous pouvez accéder aux tâches en achetant des packs qui vous donnent accès à différentes catégories de tâches (quotidiennes, hebdomadaires, mensuelles). Chaque tâche a un objectif spécifique à accomplir dans un temps imparti."
        }
      ]
    },
    {
      title: "Points et Vuecoins",
      items: [
        {
          question: "Quelle est la différence entre LVP et Vuecoin (Vc) ?",
          answer: "Les LVP sont les points que vous gagnez en visionnant des publicités. Les Vuecoins (Vc) sont une monnaie virtuelle obtenue en convertissant vos LVP au taux de 700 LVP pour 1 Vc. Les Vuecoins peuvent être utilisés pour acheter des produits sur notre marketplace ou être retirés via différentes méthodes de paiement."
        },
        {
          question: "Comment retirer mes points ?",
          answer: "Vous pouvez retirer vos points de plusieurs façons : en les échangeant contre des produits sur notre marketplace, ou via MTN BENIN, MOOV AFRICA BENIN, FEDAPAY, ou KIKIAPAY. Chaque méthode a des conditions spécifiques. Consultez votre portefeuille pour plus de détails."
        }
      ]
    },
    {
      title: "Parrainage et packs",
      items: [
        {
          question: "Comment fonctionne le programme d'affiliation ?",
          answer: "Notre programme d'affiliation vous permet de gagner des commissions sur les points gagnés par les utilisateurs que vous parrainez. Le système fonctionne sur 5 niveaux : Niveau 1 (10%), Niveau 2 (8%), Niveau 3 (6%), Niveau 4 (4%), Niveau 5 (2%). Trouvez votre lien d'affiliation dans votre profil."
        },
        {
          question: "Quels sont les packs disponibles pour les tâches ?",
          answer: "Nous proposons trois packs : Pack Standard (tâches quotidiennes), Pack Premium (quotidiennes + hebdomadaires), Pack Elite (toutes les tâches). Les packs peuvent être achetés avec des Vuecoins ou via les méthodes de paiement supportées."
        }
      ]
    },
    {
      title: "Sécurité et compte",
      items: [
        {
          question: "Puis-je créer plusieurs comptes ?",
          answer: "Non, il est strictement interdit de créer plusieurs comptes. Cette pratique est considérée comme frauduleuse et peut entraîner la suspension définitive de tous vos comptes, ainsi que la perte de tous les points accumulés."
        },
        {
          question: "Mes données sont-elles sécurisées ?",
          answer: "Oui, la sécurité de vos données est notre priorité. Nous utilisons des protocoles de chiffrement modernes pour protéger vos informations personnelles et financières. Pour plus d'informations, consultez notre Politique de Confidentialité."
        },
        {
          question: "Comment contacter le support ?",
          answer: "Vous pouvez contacter notre équipe via email (support@lavuepayee.com), le système de messagerie intégré, ou nos réseaux sociaux. Notre équipe s'efforce de répondre dans un délai de 48 heures."
        }
      ]
    }
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="FAQ - LAVUEPAYEE"
        description="Réponses aux questions fréquentes sur LAVUEPAYEE : points LVP, Vuecoins, retraits mobile money, affiliation et sécurité."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl flex-1">
        <div className="text-center mb-10">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-3">Foire Aux Questions</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes sur LaVuePayee
          </p>
        </div>

        <div className="space-y-8">
          {faqSections.map((section, sIndex) => (
            <div key={sIndex}>
              <h2 className="text-xl font-semibold mb-4 text-primary">{section.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((faq, index) => (
                  <AccordionItem key={index} value={`section-${sIndex}-item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12">
          <CardContent className="pt-6 text-center">
            <MessageCircle className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="text-muted-foreground mb-4">
              Notre équipe de support est disponible pour vous aider
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/support">
                  Contacter le support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/help">Centre d'aide</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
