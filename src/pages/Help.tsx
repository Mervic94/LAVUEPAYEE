import React from "react";
import { Link } from "react-router-dom";
import { Wrench, MessageCircle, Book, PhoneCall, Mail, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/navbar';

const Help = () => {
  const supportChannels = [
    {
      icon: HelpCircle,
      title: "FAQ & Dépannage",
      description: "Réponses aux questions courantes",
      availability: "Disponible 24h/24",
      link: "/faq",
      buttonText: "Consulter la FAQ"
    },
    {
      icon: MessageCircle,
      title: "Support avancé",
      description: "Centre d'aide complet avec tickets",
      availability: "Support personnalisé",
      link: "/support",
      buttonText: "Accéder au support"
    },
    {
      icon: Book,
      title: "Base de connaissances",
      description: "Guides détaillés et tutoriels",
      availability: "Toujours accessible",
      link: "/faq",
      buttonText: "Explorer les guides"
    },
    {
      icon: PhoneCall,
      title: "Support téléphonique",
      description: "Assistance directe par téléphone",
      availability: "Lun-Ven 9h-18h",
      link: "tel:+2290190069561",
      buttonText: "+229 01 900 695 61",
      external: true
    },
    {
      icon: Mail,
      title: "Support par e-mail",
      description: "Réponse sous 24h maximum",
      availability: "contact@lavuepayee.com",
      link: "mailto:contact@lavuepayee.com",
      buttonText: "Envoyer un e-mail",
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Comment pouvons-nous vous aider ?</h1>
          <p className="text-muted-foreground text-lg">
            Trouvez l'assistance dont vous avez besoin pour utiliser LaVuePayee
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-xl">{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    {channel.availability}
                  </div>
                  <Button asChild variant="default" className="w-full">
                    {channel.external ? (
                      <a href={channel.link}>{channel.buttonText}</a>
                    ) : (
                      <Link to={channel.link}>{channel.buttonText}</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <Card>
          <CardHeader>
            <CardTitle>Accès rapide</CardTitle>
            <CardDescription>
              Liens vers les pages importantes de notre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="justify-start">
                <Link to="/terms">
                  <Book className="h-4 w-4 mr-2" />
                  Conditions d'utilisation
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/privacy">
                  <Book className="h-4 w-4 mr-2" />
                  Politique de confidentialité
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/cookies">
                  <Book className="h-4 w-4 mr-2" />
                  Politique de cookies
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Help;
