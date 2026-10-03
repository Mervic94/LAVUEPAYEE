
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
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container relative z-10 mx-auto px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
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
                  className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
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
                  className="max-w-lg text-base text-muted-foreground sm:text-lg lg:text-xl"
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
                className="grid grid-cols-3 gap-2 sm:gap-6"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary mr-1" />
                    <span className="text-lg font-bold sm:text-2xl">50K+</span>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">Utilisateurs actifs</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-primary mr-1" />
                    <span className="text-lg font-bold sm:text-2xl">€100K+</span>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">Distribués</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-primary mr-1" />
                    <span className="text-lg font-bold sm:text-2xl">4.8/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">Satisfaction</p>
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
                <Button size="lg" className="w-full px-6 py-6 text-base sm:w-auto sm:px-8 sm:text-lg" asChild>
                  <Link to="/register">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full px-6 py-6 text-base sm:w-auto sm:px-8 sm:text-lg"
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
                className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-4"
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
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 backdrop-blur-sm sm:p-8">
                <div className="flex h-44 w-full items-center justify-center sm:h-64 lg:h-80">
                  <img 
                    src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
                    alt="LAVUEPAYEE, plateforme de publicités rémunérées"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute right-2 top-2 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground sm:-right-4 sm:-top-4 sm:px-4 sm:text-sm"
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
