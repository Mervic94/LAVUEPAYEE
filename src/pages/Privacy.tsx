import Seo from '@/components/Seo';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo title="Politique de confidentialité - LAVUEPAYEE" description="Comment LAVUEPAYEE collecte, utilise et protège vos données personnelles." path="/privacy" />
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Politique de Confidentialité</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">Dernière mise à jour : 1er janvier 2026</p>
        
        <div className="prose prose-green max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              LAVUEPAYEE s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, 
              utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Informations que nous collectons</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations personnelles</h3>
            <p className="text-muted-foreground mb-3">Lorsque vous créez un compte, nous collectons :</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Votre nom et prénom</li>
              <li>Votre adresse e-mail</li>
              <li>Votre numéro de téléphone</li>
              <li>Votre date de naissance</li>
              <li>Votre nom d'utilisateur</li>
              <li>Votre mot de passe (stocké de manière sécurisée et chiffrée)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations d'utilisation</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Les publicités que vous visionnez et le temps passé</li>
              <li>Les produits que vous consultez ou achetez</li>
              <li>Vos interactions avec d'autres utilisateurs</li>
              <li>Vos activités d'affiliation</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Informations techniques</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Adresse IP et type de navigateur</li>
              <li>Appareil utilisé et pages visitées</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Comment nous utilisons vos informations</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fournir, maintenir et améliorer notre plateforme</li>
              <li>Vous attribuer des points LVP pour le visionnage de publicités</li>
              <li>Gérer votre compte et vos transactions</li>
              <li>Vous permettre de participer au programme d'affiliation</li>
              <li>Vous proposer des publicités pertinentes</li>
              <li>Détecter et prévenir les fraudes et les abus</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Partage de vos informations</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Nos partenaires publicitaires pour les publicités ciblées</li>
              <li>Nos prestataires de paiement (MTN BENIN, MOOV AFRICA BENIN, FEDAPAY, KIKIAPAY)</li>
              <li>Les autorités compétentes lorsque la loi l'exige</li>
            </ul>
            <p className="text-muted-foreground mt-3 font-medium">
              Nous ne vendons jamais vos informations personnelles à des tiers.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sécurité de vos informations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité appropriées : chiffrement des données, pare-feu, 
              contrôles d'accès et politiques RLS (Row Level Security) sur nos bases de données. Cependant, aucune méthode 
              de transmission sur Internet n'est totalement sécurisée.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cadre légal (Bénin)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les traitements sont réalisés conformément au Livre V de la loi n°2017-20 du 20 avril 2018 portant Code du numérique
              en République du Bénin, sous le contrôle de l'Autorité de Protection des Données à caractère Personnel
              (<a href="https://apdp.bj" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">APDP</a>).
              Responsable du traitement : LAVUEPAYEE, Cotonou, Bénin. Délégué à la protection des données :{' '}
              <a href="mailto:dpo@lavuepayee.com" className="text-primary hover:underline">dpo@lavuepayee.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bases légales</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Exécution du contrat (compte, points, retraits)</li>
              <li>Consentement (cookies publicitaires, notifications marketing)</li>
              <li>Obligation légale (vérification KYC, lutte contre la fraude et le blanchiment)</li>
              <li>Intérêt légitime (sécurité de la plateforme)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Durées de conservation</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Données de compte : durée d'utilisation du compte, puis 1 an après sa suppression</li>
              <li>Transactions et retraits : 10 ans (obligations comptables)</li>
              <li>Documents KYC : 5 ans après la fin de la relation</li>
              <li>Cookies : 13 mois maximum</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Transferts hors du Bénin</h2>
            <p className="text-muted-foreground leading-relaxed">
              Certaines données sont hébergées par des prestataires situés hors du Bénin (hébergement cloud, suivi des erreurs).
              Ces transferts sont encadrés conformément au Code du numérique et soumis, le cas échéant, à l'autorisation de l'APDP,
              avec des garanties de sécurité appropriées.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Mineurs</h2>
            <p className="text-muted-foreground leading-relaxed">
              La plateforme est réservée aux personnes âgées d'au moins 18 ans. Nous ne collectons pas sciemment de données de mineurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Droit d'information et d'accès à vos données</li>
              <li>Droit de rectification et d'effacement</li>
              <li>Droit d'opposition, notamment à la prospection commerciale</li>
              <li>Droit à la limitation et à la portabilité</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Pour exercer ces droits, écrivez à <a href="mailto:dpo@lavuepayee.com" className="text-primary hover:underline">dpo@lavuepayee.com</a> avec
              une pièce d'identité. Réponse sous 30 jours. En cas de désaccord, vous pouvez saisir l'APDP sur{' '}
              <a href="https://apdp.bj" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">apdp.bj</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question : <a href="mailto:contact@lavuepayee.com" className="text-primary hover:underline">contact@lavuepayee.com</a>
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/terms">Conditions d'utilisation <ArrowRight className="ml-1 h-3 w-3" /></Link>
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

export default Privacy;
