import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Cookie, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo title="Politique de cookies - LAVUEPAYEE" description="Informations sur l'utilisation des cookies sur la plateforme LAVUEPAYEE." path="/cookies" />
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Politique de Cookies</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">Dernière mise à jour : 1er janvier 2026</p>
        
        <div className="prose prose-green max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. 
              Les cookies sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, 
              ainsi que pour fournir des informations aux propriétaires du site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Comment nous utilisons les cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LAVUEPAYEE utilise des cookies pour diverses raisons. Il est recommandé de laisser tous les cookies activés 
              si vous souhaitez profiter pleinement de toutes les fonctionnalités de la plateforme.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Les cookies que nous utilisons</h3>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">🔐 Cookies d'authentification</h4>
                <p className="text-sm text-muted-foreground">
                  Nous utilisons des cookies pour vous garder connecté et sécuriser votre session. 
                  Ils sont supprimés lorsque vous vous déconnectez.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">📝 Cookies de formulaires</h4>
                <p className="text-sm text-muted-foreground">
                  Lorsque vous remplissez des formulaires, les cookies peuvent mémoriser vos informations 
                  pour faciliter vos futures interactions.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">⚙️ Cookies de préférences</h4>
                <p className="text-sm text-muted-foreground">
                  Ces cookies mémorisent vos préférences (thème sombre/clair, langue, etc.) 
                  pour personnaliser votre expérience.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">📊 Cookies publicitaires</h4>
                <p className="text-sm text-muted-foreground">
                  Nos partenaires publicitaires (Google, Facebook, etc.) peuvent utiliser des cookies 
                  pour analyser votre comportement et vous proposer des publicités pertinentes.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contrôle de vos cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous pouvez empêcher l'installation de cookies via les paramètres de votre navigateur. 
              La désactivation des cookies affectera certaines fonctionnalités du site, notamment la connexion 
              et la sauvegarde de vos préférences.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Plus d'informations</h2>
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
            <Link to="/privacy">Politique de confidentialité <ArrowRight className="ml-1 h-3 w-3" /></Link>
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

export default Cookies;
