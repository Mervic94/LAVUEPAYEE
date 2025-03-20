
import React from 'react';
import { ArrowRight, PlayCircle, BadgeDollarSign, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-24 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-12 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground/70 animate-fade-in mb-6">
            <span className="flex items-center gap-1.5">
              <BadgeDollarSign className="h-4 w-4" />
              Gagnez des points en regardant des publicités
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in">
            Soyez <span className="text-primary">récompensé</span> pour 
            <br className="hidden md:block" /> votre attention
          </h1>
          
          <p className="text-foreground/70 text-lg md:text-xl max-w-3xl mb-8 animate-fade-in delay-75">
            Regardez des publicités, gagnez des points, échangez-les contre des produits ou 
            convertissez-les en argent réel. Invitez vos amis et gagnez encore plus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-100">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/dashboard">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
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
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
              <BadgeDollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Gagnez des points</h3>
            <p className="text-foreground/70">
              Regardez des publicités qui vous intéressent et soyez récompensé pour chaque seconde de votre attention.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Échangez des récompenses</h3>
            <p className="text-foreground/70">
              Convertissez vos points contre des produits de notre marketplace ou retirez-les en argent réel.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
              <Users className="h-6 w-6 text-primary" />
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
