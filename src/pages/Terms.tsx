import Seo from '@/components/Seo';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo title="Conditions d'utilisation - LAVUEPAYEE" description="Consultez les conditions générales d'utilisation de la plateforme LAVUEPAYEE." path="/terms" />
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl flex-1">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Conditions d'Utilisation</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">Dernière mise à jour : 1er janvier 2026</p>
        
        <div className="prose prose-green max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              En accédant à ou en utilisant LAVUEPAYEE, vous acceptez d'être lié par ces Conditions d'Utilisation. 
              Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser notre plateforme.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
            <p className="text-muted-foreground leading-relaxed">
              LAVUEPAYEE est une plateforme permettant aux utilisateurs de gagner des points (LVP) en visionnant des publicités. 
              Ces points peuvent être convertis en Vuecoins (Vc) et échangés contre des produits disponibles sur notre marketplace
              ou retirés via différentes méthodes de paiement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Inscription et éligibilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour utiliser LAVUEPAYEE, vous devez créer un compte et être âgé d'au moins 18 ans. 
              Vous êtes responsable de maintenir la confidentialité de vos informations de connexion 
              et de toutes les activités qui se produisent sous votre compte. Une vérification KYC peut être requise
              pour accéder à certaines fonctionnalités, notamment les retraits.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Utilisation du service</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Vous acceptez d'utiliser LAVUEPAYEE conformément à toutes les lois et réglementations applicables.
              Vous ne devez pas :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Utiliser des moyens automatisés pour visionner des publicités ou gagner des points</li>
              <li>Créer plusieurs comptes pour accumuler des points</li>
              <li>Vendre ou transférer votre compte ou vos points à des tiers</li>
              <li>Tenter de contourner les mécanismes de vérification du visionnage des publicités</li>
              <li>Utiliser la plateforme pour tout acte illégal ou frauduleux</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Points LVP et Vuecoins</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les points LVP sont attribués pour le visionnage complet de publicités. Le taux de conversion est de 700 LVP pour 1 Vuecoin (Vc).
              Les points et Vuecoins n'ont pas de valeur monétaire intrinsèque et ne peuvent être échangés que contre des produits proposés sur notre plateforme
              ou retirés via les méthodes de paiement disponibles. LAVUEPAYEE se réserve le droit de modifier à tout moment les taux de conversion et les règles d'attribution des points.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Programme d'affiliation</h2>
            <p className="text-muted-foreground leading-relaxed">
              LAVUEPAYEE offre un programme d'affiliation permettant aux utilisateurs de gagner des commissions sur les points gagnés par leurs affiliés.
              Les commissions sont attribuées sur 5 niveaux d'affiliation, avec des taux dégressifs (10%, 8%, 6%, 4%, 2%).
              Nous nous réservons le droit de modifier ou de mettre fin au programme d'affiliation à tout moment.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Retrait des points</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les utilisateurs peuvent convertir leurs points en produits ou demander un retrait via les méthodes proposées (MTN BENIN, MOOV AFRICA BENIN, FEDAPAY, KIKIAPAY).
              Des frais peuvent s'appliquer selon la méthode de retrait choisie. LAVUEPAYEE se réserve le droit de vérifier l'identité des utilisateurs avant d'approuver un retrait.
              Le montant minimum de retrait est de 10 000 LVP.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Résiliation</h2>
            <p className="text-muted-foreground leading-relaxed">
              LAVUEPAYEE se réserve le droit de suspendre ou de résilier votre compte à tout moment en cas de violation de ces conditions d'utilisation.
              En cas de résiliation, tous les points et Vuecoins non utilisés seront perdus.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modifications des conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur la plateforme.
              Votre utilisation continue de LAVUEPAYEE après la publication des modifications constitue votre acceptation de ces modifications.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@lavuepayee.com" className="text-primary hover:underline">contact@lavuepayee.com</a>
            </p>
          </section>
        </div>

        {/* Cross-links */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/privacy">Politique de confidentialité <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/cookies">Politique de cookies <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/faq">FAQ <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
