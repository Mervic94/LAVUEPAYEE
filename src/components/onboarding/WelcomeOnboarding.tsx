import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv,
  CheckSquare,
  Coins,
  ArrowRight,
  ArrowLeft,
  Compass,
  Gift,
  Sparkles,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface Step {
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  {
    title: 'Bienvenue sur LAVUEPAYEE ! 🎉',
    subtitle: "Votre portail de gains en Afrique",
    description:
      "Félicitations, votre compte est prêt ! LAVUEPAYEE vous permet de monétiser votre temps libre en regardant des publicités courtes et en exécutant des micro-tâches.",
    tip: "Le parrainage de vos amis vous rapporte un bonus dès leur inscription.",
    icon: Compass,
  },
  {
    title: '1. Regardez des publicités 📺',
    subtitle: 'Gagnez des LVP en quelques secondes',
    description:
      "Depuis l'onglet Publicités, lancez une vidéo sponsorisée et laissez le chronomètre défiler. Dès qu'il est terminé, réclamez vos points instantanément.",
    tip: 'Visez 5 vidéos par jour pour maintenir un rythme de gains régulier.',
    icon: Tv,
  },
  {
    title: '2. Exécutez des tâches ⚡',
    subtitle: 'Des missions simples à forte rémunération',
    description:
      "Dans la section Tâches, accomplissez des actions rapides : rejoindre un canal, s'abonner à une page, laisser un avis. Téléversez une preuve, notre équipe valide sous 24h.",
    tip: 'Chaque tâche validée crédite immédiatement vos LVP.',
    icon: CheckSquare,
  },
  {
    title: '3. Retirez vos gains 💰',
    subtitle: 'Mobile Money, PayPal ou virement',
    description:
      "Convertissez vos LVP en FCFA depuis l'onglet Échange, puis demandez un retrait via MTN MoMo, Orange Money, Wave ou PayPal. Traitement en 2 à 12 heures.",
    tip: 'Seuil minimal de retrait : 1 000 FCFA.',
    icon: Coins,
  },
];

const STORAGE_KEY = 'lvp_welcome_onboarding_done';

const WelcomeOnboarding: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const key = user?.id ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;

  useEffect(() => {
    const done = localStorage.getItem(key);
    if (!done) {
      // Petit délai pour ne pas apparaître avant le premier paint
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, [key]);

  const complete = () => {
    localStorage.setItem(key, 'true');
    setOpen(false);
    setStep(0);
  };

  const next = () => (step < STEPS.length - 1 ? setStep((s) => s + 1) : complete());
  const prev = () => step > 0 && setStep((s) => s - 1);

  const active = STEPS[step];
  const Icon = active.icon;

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : complete())}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:max-w-lg glass-card border-border p-0 gap-0 overflow-hidden max-h-[calc(100dvh-2rem)] flex flex-col">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40 z-10" />

        <div className="p-4 sm:p-8 pt-8 sm:pt-10 overflow-y-auto flex-1 min-h-0">
          {/* Tracker */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Guide de démarrage
            </span>
            <div className="flex gap-1">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? 'w-8 bg-primary' : 'w-2.5 bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="flex gap-4 items-start">
                <div className="p-4 rounded-2xl border border-primary/20 bg-primary/10 text-primary shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    {active.title}
                  </h2>
                  <p className="text-muted-foreground text-xs mt-1 font-medium">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed">{active.description}</p>

              <div className="p-4 bg-muted/40 border border-border rounded-2xl flex gap-3 items-start">
                <Gift className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <strong className="text-foreground block mb-0.5">Astuce LVP</strong>
                  {active.tip}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-border pt-5 mt-6">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={prev}
              className={step === 0 ? 'opacity-0 pointer-events-none' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Précédent
            </Button>

            <div className="flex items-center gap-2">
              {step < STEPS.length - 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={complete}>
                  Passer
                </Button>
              )}
              <Button type="button" size="sm" onClick={next} className="rounded-full">
                {step === STEPS.length - 1 ? "C'est parti !" : 'Suivant'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeOnboarding;
