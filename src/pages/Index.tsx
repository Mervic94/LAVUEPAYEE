
import React, { useRef } from 'react';
import { ArrowRight, Users, ShoppingBag, PlayCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              Suivez ces étapes simples pour commencer à gagner des points et recevoir des récompenses
            </p>
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
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="Points" 
                  className="h-8 w-8 text-primary bg-transparent"
                />
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
                Utilisez vos points pour obtenir des produits physiques ou convertissez-les en argent réel.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center flex flex-col md:flex-row justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-full">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Regarder la vidéo de présentation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
                <div className="aspect-video w-full">
                  <video 
                    ref={videoRef} 
                    controls 
                    className="w-full h-full object-cover"
                    poster="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
                  >
                    <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild size="lg" className="rounded-full">
              <Link to="/register">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
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
                Multipliez vos gains avec notre programme d'affiliation
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
                    <p className="text-foreground/70">Commission directe sur les points gagnés par vos affiliés.</p>
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
                  <h3 className="text-2xl font-bold mb-6">Exemple de gains</h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveau 1 (10 affiliés)</h4>
                        <p className="text-sm text-foreground/70">10% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="LVC" 
                          className="h-5 w-5 bg-transparent" 
                        />
                        <span>1,500</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveau 2 (50 affiliés)</h4>
                        <p className="text-sm text-foreground/70">5% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="LVC" 
                          className="h-5 w-5 bg-transparent" 
                        />
                        <span>3,750</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h4 className="font-medium">Niveaux 3-5</h4>
                        <p className="text-sm text-foreground/70">2-3% de commission</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="LVC" 
                          className="h-5 w-5 bg-transparent" 
                        />
                        <span>5,250</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <h4 className="font-semibold text-lg">Total mensuel</h4>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-lg text-primary">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="LVC" 
                          className="h-5 w-5 bg-transparent" 
                        />
                        <span>10,500 pts</span>
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
      <footer className="bg-white py-12 border-t">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
                    alt="LAVUEPAYEE"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-semibold text-lg">LAVUEPAYEE</span>
              </div>
              <p className="text-foreground/70">
                La plateforme qui récompense votre attention et vous permet de gagner des points échangeables.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-foreground/70 hover:text-primary transition-colors">Accueil</Link></li>
                <li><Link to="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">Tableau de bord</Link></li>
                <li><Link to="/marketplace" className="text-foreground/70 hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/profile" className="text-foreground/70 hover:text-primary transition-colors">Profil</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Aide</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-foreground/70 hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Politique de confidentialité</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Restez connecté</h4>
              <p className="text-foreground/70 mb-4">
                Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.
              </p>
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="default" size="sm">
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t text-center text-foreground/60 text-sm">
            © {new Date().getFullYear()} LAVUEPAYEE. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
