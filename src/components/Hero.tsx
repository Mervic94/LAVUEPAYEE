
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  🎉 Plateforme 100% gratuite
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Gagnez de l'argent en 
                  <span className="text-primary"> regardant </span>
                  des publicités
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  LAVUEPAYEE vous récompense pour votre attention. Regardez, cliquez, partagez et gagnez de l'argent réel.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">50K+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">€100K+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Distribués</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">4.8/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/register">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={scrollToHowItWorks}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Comment ça marche
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Noté 4.8/5 par nos utilisateurs
                </span>
              </div>
            </div>

            {/* Right Content - Hero Image/Video */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
                <img 
                  src="/lovable-uploads/eb1af938-5661-4d56-b98f-aa658853984a.png"
                  alt="LAVUEPAYEE Dashboard Preview"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  En ligne maintenant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
