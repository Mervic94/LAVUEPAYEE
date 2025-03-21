
import React from 'react';
import { ArrowRight, PlayCircle, Eye, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-green-50/30 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-24 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-12 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 animate-fade-in mb-6">
            <span className="flex items-center gap-1.5">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="LVP" 
                className="h-4 w-4"
              />
              Gagnez des LVP en regardant des publicités
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in">
            Soyez <span className="text-green-600">récompensé</span> pour 
            <br className="hidden md:block" /> votre attention
          </h1>
          
          <p className="text-foreground/70 text-lg md:text-xl max-w-3xl mb-8 animate-fade-in delay-75">
            Regardez des publicités, gagnez des LVP, échangez-les contre des Vuecoins
            et convertissez-les en produits ou en argent réel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-100">
            <Button asChild size="lg" className="rounded-full bg-green-600 hover:bg-green-700">
              <Link to="/dashboard">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-green-600 text-green-600">
              <Link to="/#how-it-works">
                <PlayCircle className="mr-2 h-4 w-4" />
                Comment ça marche
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-slide-up">
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-green-600/10 rounded-full flex items-center justify-center mb-5">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Gagnez des LVP</h3>
            <p className="text-foreground/70">
              Regardez des publicités qui vous intéressent et soyez récompensé pour chaque seconde de votre attention.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-amber-400/10 rounded-full flex items-center justify-center mb-5">
              <Package className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Échangez des Vuecoins</h3>
            <p className="text-foreground/70">
              Convertissez vos LVP en Vuecoins (700 LVP = 1 Vc) et utilisez-les pour obtenir des produits ou de l'argent réel.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-green-600/10 rounded-full flex items-center justify-center mb-5">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Programme d'affiliation</h3>
            <p className="text-foreground/70">
              Invitez vos amis et gagnez des commissions sur cinq niveaux d'affiliation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
