
import React from 'react';
import Navbar from '@/components/Navbar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Conditions d'Utilisation</h1>
        
        <div className="prose prose-green max-w-none">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p>
              En accédant à ou en utilisant LAVUEPAYEE, vous acceptez d'être lié par ces Conditions d'Utilisation. 
              Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser notre plateforme.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
            <p>
              LAVUEPAYEE est une plateforme permettant aux utilisateurs de gagner des points (LVP) en visionnant des publicités. 
              Ces points peuvent être convertis en Vuecoins (Vc) et échangés contre des produits disponibles sur notre marketplace.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Inscription et éligibilité</h2>
            <p>
              Pour utiliser LAVUEPAYEE, vous devez créer un compte et être âgé d'au moins 18 ans. 
              Vous êtes responsable de maintenir la confidentialité de vos informations de connexion 
              et de toutes les activités qui se produisent sous votre compte.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. Utilisation du service</h2>
            <p>
              Vous acceptez d'utiliser LAVUEPAYEE conformément à toutes les lois et réglementations applicables.
              Vous ne devez pas:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Utiliser des moyens automatisés pour visionner des publicités ou gagner des points</li>
              <li>Créer plusieurs comptes pour accumuler des points</li>
              <li>Vendre ou transférer votre compte ou vos points à des tiers</li>
              <li>Tenter de contourner les mécanismes de vérification du visionnage des publicités</li>
              <li>Utiliser la plateforme pour tout acte illégal ou frauduleux</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. Points LVP et Vuecoins</h2>
            <p>
              Les points LVP sont attribués pour le visionnage complet de publicités. Le taux de conversion est de 700 LVP pour 1 Vuecoin (Vc).
              Les points et Vuecoins n'ont pas de valeur monétaire et ne peuvent être échangés que contre des produits proposés sur notre plateforme.
              LAVUEPAYEE se réserve le droit de modifier à tout moment les taux de conversion et les règles d'attribution des points.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Programme d'affiliation</h2>
            <p>
              LAVUEPAYEE offre un programme d'affiliation permettant aux utilisateurs de gagner des commissions sur les points gagnés par leurs affiliés.
              Les commissions sont attribuées sur 5 niveaux d'affiliation, avec des taux dégressifs.
              Nous nous réservons le droit de modifier ou de mettre fin au programme d'affiliation à tout moment.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Retrait des points</h2>
            <p>
              Les utilisateurs peuvent convertir leurs points en produits ou demander un retrait via les méthodes proposées (MTN BENIN, MOOV AFRICA BENIN, FEDAPAY, KIKIAPAY).
              Des frais peuvent s'appliquer selon la méthode de retrait choisie.
              LAVUEPAYEE se réserve le droit de vérifier l'identité des utilisateurs avant d'approuver un retrait.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Résiliation</h2>
            <p>
              LAVUEPAYEE se réserve le droit de suspendre ou de résilier votre compte à tout moment en cas de violation de ces conditions d'utilisation.
              En cas de résiliation, tous les points et Vuecoins non utilisés seront perdus.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur la plateforme.
              Votre utilisation continue de LAVUEPAYEE après la publication des modifications constitue votre acceptation de ces modifications.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante: contact@lavuepayee.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
