import React from 'react';
import { ArrowRight, Users, ShoppingBag, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '@/components/navbar';
import Hero from '@/components/Hero';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              Suivez ces étapes simples pour commencer à gagner des points et recevoir des récompenses
            </p>
            
            {/* Video Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="lg" className="mt-6 rounded-full">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Voir la vidéo de présentation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[80vh] p-0 overflow-hidden">
                <div className="aspect-video w-full">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/YNU-zfSeK20" 
                    title="Présentation de LAVUEPAYEE" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <PlayCircle className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 h-6 w-6 bg-primary rounded-full text-white flex items-center justify-center font-medium text-sm">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Regardez des publicités</h3>
              <p className="text-foreground/70">
                Choisissez parmi une variété de publicités et de contenu sponsorisé qui vous intéresse.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <div className="h-8 w-8 lvp-icon-container">
                  <img 
                    src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                    alt="Points" 
                    className="h-8 w-8"
                  />
                </div>
                <div className="absolute -right-1 -top-1 h-6 w-6 bg-primary rounded-full text-white flex items-center justify-center font-medium text-sm">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Gagnez des points</h3>
              <p className="text-foreground/70">
                Accumulez des points pour chaque publicité visionnée. Plus vous regardez, plus vous gagnez.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 h-6 w-6 bg-primary rounded-full text-white flex items-center justify-center font-medium text-sm">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Échangez vos récompenses</h3>
              <p className="text-foreground/70">
                Utilisez vos LPV pour obtenir des produits physiques ou convertissez-les en argent réel.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center flex flex-col md:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/register">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial Carousel Section */}
      <TestimonialCarousel />
      
      {/* Affiliation Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                <Users className="h-4 w-4" />
                Programme d'affiliation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Multipliez vos LVP avec notre programme d'affiliation
              </h2>
              <p className="text-foreground/70 text-lg mb-8">
                Invitez vos amis, votre famille et vos relations à rejoindre la plateforme et gagnez des commissions sur leurs activités. Notre programme d'affiliation sur cinq niveaux vous permet de maximiser vos revenus.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Niveau 1: 10%</h4>
                    <p className="text-foreground/70">Commission directe sur les LVP gagnés par vos affiliés.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Niveaux 2-5: 2-5%</h4>
                    <p className="text-foreground/70">Commissions supplémentaires sur les affiliés de vos affiliés.</p>
                  </div>
                </div>
              </div>
              
              <Button asChild size="lg" className="rounded-full">
                <Link to="/login">
                  Voir mon réseau d'affiliation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl -z-10 animate-pulse-light"></div>
                <div className="glass-card rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Exemple de LVP</h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveau 1 (10 affiliés)</h4>
                        <p className="text-sm text-foreground/70">10% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <div className="h-5 w-5 lvp-icon-container">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVP" 
                            className="h-5 w-5" 
                          />
                        </div>
                        <span>1,500</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveau 2 (50 affiliés)</h4>
                        <p className="text-sm text-foreground/70">5% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <div className="h-5 w-5 lvp-icon-container">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVP" 
                            className="h-5 w-5" 
                          />
                        </div>
                        <span>3,750</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveaux 3-5</h4>
                        <p className="text-sm text-foreground/70">2-3% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <div className="h-5 w-5 lvp-icon-container">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVP" 
                            className="h-5 w-5" 
                          />
                        </div>
                        <span>5,250</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <h4 className="font-semibold text-lg">Total mensuel</h4>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-lg text-primary">
                        <div className="h-5 w-5 lvp-icon-container">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVP" 
                            className="h-5 w-5" 
                          />
                        </div>
                        <span>10,500 lvp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
