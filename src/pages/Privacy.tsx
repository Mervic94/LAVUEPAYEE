import React from 'react';
import Navbar from '@/components/navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
        
        <div className="prose prose-green max-w-none">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              LAVUEPAYEE s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, 
              utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Informations que nous collectons</h2>
            <p>Nous collectons les types d'informations suivants :</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations personnelles</h3>
            <p>Lorsque vous créez un compte, nous collectons :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Votre nom et prénom</li>
              <li>Votre adresse e-mail</li>
              <li>Votre numéro de téléphone</li>
              <li>Votre date de naissance</li>
              <li>Votre nom d'utilisateur</li>
              <li>Votre mot de passe (stocké de manière sécurisée)</li>
              <li>Type de compte (particulier, entreprise, etc.)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations d'utilisation</h3>
            <p>Nous collectons également des informations sur la façon dont vous utilisez notre plateforme :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Les publicités que vous visionnez</li>
              <li>Le temps passé sur chaque publicité</li>
              <li>Les produits que vous consultez ou achetez</li>
              <li>Vos interactions avec d'autres utilisateurs</li>
              <li>Vos activités d'affiliation</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations techniques</h3>
            <p>Nous collectons automatiquement certaines informations techniques lorsque vous utilisez notre plateforme :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Adresse IP</li>
              <li>Type de navigateur</li>
              <li>Appareil utilisé</li>
              <li>Pages visitées</li>
              <li>Temps passé sur la plateforme</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations pour :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Fournir, maintenir et améliorer notre plateforme</li>
              <li>Vous attribuer des points LVP pour le visionnage de publicités</li>
              <li>Gérer votre compte et vos transactions</li>
              <li>Vous permettre de participer au programme d'affiliation</li>
              <li>Vous proposer des publicités pertinentes</li>
              <li>Communiquer avec vous concernant votre compte, nos services et nos promotions</li>
              <li>Détecter et prévenir les fraudes et les abus</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Partage de vos informations</h2>
            <p>Nous pouvons partager vos informations avec :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Nos partenaires publicitaires (Google, Facebook, etc.) pour leur permettre de vous proposer des publicités ciblées</li>
              <li>Nos prestataires de services de paiement (MTN BENIN, MOOV AFRICA BENIN, FEDAPAY, KIKIAPAY) pour traiter vos retraits</li>
              <li>Vos affiliés, mais uniquement les informations nécessaires au fonctionnement du programme d'affiliation</li>
              <li>Les autorités compétentes lorsque la loi l'exige</li>
            </ul>
            <p>
              Nous ne vendons pas vos informations personnelles à des tiers.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Sécurité de vos informations</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé, 
              altération, divulgation ou destruction. Ces mesures comprennent le chiffrement des données, les pare-feu, 
              et les contrôles d'accès à nos systèmes.
            </p>
            <p>
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée. 
              Par conséquent, nous ne pouvons garantir une sécurité absolue.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <p>Vous disposez des droits suivants concernant vos informations personnelles :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Droit d'accès et de rectification de vos informations</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : contact@lavuepayee.com
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Modifications de cette politique</h2>
            <p>
              Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur la plateforme.
              Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : contact@lavuepayee.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
