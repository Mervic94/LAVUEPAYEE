import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, ShoppingBag, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '@/components/navbar';
import Hero from '@/components/Hero';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import Footer from '@/components/Footer';
import WelcomeOnboarding from '@/components/onboarding/WelcomeOnboarding';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <WelcomeOnboarding />
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="py-20 bg-muted/50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-6 mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Comment ça marche</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
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
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              {
                icon: <PlayCircle className="h-8 w-8 text-primary" />,
                step: 1,
                title: "Regardez des publicités",
                desc: "Choisissez parmi une variété de publicités et de contenu sponsorisé qui vous intéresse.",
              },
              {
                icon: (
                  <div className="h-8 w-8 lvp-icon-container">
                    <img src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" alt="Points" className="h-8 w-8" />
                  </div>
                ),
                step: 2,
                title: "Gagnez des points",
                desc: "Accumulez des points pour chaque publicité visionnée. Plus vous regardez, plus vous gagnez.",
              },
              {
                icon: <ShoppingBag className="h-8 w-8 text-primary" />,
                step: 3,
                title: "Échangez vos récompenses",
                desc: "Utilisez vos LPV pour obtenir des produits physiques ou convertissez-les en argent réel.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                  <div className="absolute -right-1 -top-1 h-6 w-6 bg-primary rounded-full text-primary-foreground flex items-center justify-center font-medium text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="mt-16 text-center flex flex-col md:flex-row justify-center gap-4"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="rounded-full">
              <Link to="/register">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Testimonial Carousel Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <TestimonialCarousel />
      </motion.div>
      
      {/* Affiliation Section */}
      <motion.section
        className="py-20 bg-muted/50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <motion.div
              className="md:w-1/2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                <Users className="h-4 w-4" />
                Programme d'affiliation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Multipliez vos LVP avec notre programme d'affiliation
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Invitez vos amis, votre famille et vos relations à rejoindre la plateforme et gagnez des commissions sur leurs activités. Notre programme d'affiliation sur cinq niveaux vous permet de maximiser vos revenus.
              </p>
              
              <motion.div
                className="space-y-4 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Niveau 1: 10%</h4>
                    <p className="text-muted-foreground">Commission directe sur les LVP gagnés par vos affiliés.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Niveaux 2-5: 2-5%</h4>
                    <p className="text-muted-foreground">Commissions supplémentaires sur les affiliés de vos affiliés.</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <Button asChild size="lg" className="rounded-full">
                <Link to="/login">
                  Voir mon réseau d'affiliation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl -z-10 animate-pulse-light"></div>
                <div className="glass-card rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Exemple de LVP</h3>
                  
                  <div className="space-y-6">
                    {[
                      { label: "Niveau 1 (10 affiliés)", sub: "10% de commission", value: "1,500" },
                      { label: "Niveau 2 (50 affiliés)", sub: "5% de commission", value: "3,750" },
                      { label: "Niveaux 3-5", sub: "2-3% de commission", value: "5,250" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center border-b border-border pb-4">
                        <div>
                          <h4 className="font-medium">{row.label}</h4>
                          <p className="text-sm text-foreground/70">{row.sub}</p>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-lg">
                          <div className="h-5 w-5 lvp-icon-container">
                            <img src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" alt="LVP" className="h-5 w-5" />
                          </div>
                          <span>{row.value}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <h4 className="font-semibold text-lg">Total mensuel</h4>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-lg text-primary">
                        <div className="h-5 w-5 lvp-icon-container">
                          <img src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" alt="LVP" className="h-5 w-5" />
                        </div>
                        <span>10,500 lvp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
