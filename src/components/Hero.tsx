
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

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
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  🎉 Plateforme 100% gratuite
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
                >
                  Gagnez de l'argent en 
                  <span className="text-primary"> regardant </span>
                  des publicités
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="text-xl text-muted-foreground max-w-lg"
                >
                  LAVUEPAYEE vous récompense pour votre attention. Regardez, cliquez, partagez et gagnez de l'argent réel.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="grid grid-cols-3 gap-6"
              >
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
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-col sm:flex-row gap-4"
              >
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
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Noté 4.8/5 par nos utilisateurs
                </span>
              </motion.div>
            </div>

            {/* Right Content - Hero Image with Logo */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center w-full h-80">
                  <img 
                    src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
                    alt="LAVUEPAYEE Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium"
                >
                  En ligne maintenant
                </motion.div>
              </div>
            </motion.div>
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
