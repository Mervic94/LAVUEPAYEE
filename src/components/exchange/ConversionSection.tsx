import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, Sparkles, Loader2, ArrowRight, Coins } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import lvpToken from '@/assets/lvp2/lvp-token.jpg';

interface Props {
  userPoints: number;
  onDone?: () => void;
}

const LVP_TO_FCFA = 0.5; // 1 LVP = 0.5 FCFA

const formatFCFA = (v: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 })
    .format(v).replace('XOF', 'FCFA');

const ConversionSection = ({ userPoints, onDone }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [points, setPoints] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState('');

  const computedCash = points * LVP_TO_FCFA;
  const valid = points > 0 && points <= userPoints && paymentInfo.trim().length > 3;

  const handleConvert = async () => {
    if (!user || !valid) return;
    setSubmitting(true);
    const { error } = await supabase.from('exchange_requests').insert({
      user_id: user.id,
      type: 'fiat',
      amount_points: points,
      amount_fiat: computedCash,
      fiat_currency: 'XOF',
      payment_details: { info: paymentInfo, rate: LVP_TO_FCFA },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: 'Demande envoyée',
      description: `Conversion de ${points} LVP en ${formatFCFA(computedCash)} en cours de validation.`,
    });
    setPoints(0);
    setPaymentInfo('');
    onDone?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <img
            src={lvpToken}
            className="w-7 h-7 rounded-lg object-cover border border-primary/20 shadow-md"
            alt="LVP"
          />
          Convertisseur LVP → FCFA
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Convertissez vos points LVP en FCFA retirables via Mobile Money.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass-card border-primary/10">
          <CardContent className="p-5 flex flex-col justify-between h-full gap-6">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                Cagnotte LVP
              </span>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src={lvpToken}
                  className="w-12 h-12 rounded-2xl object-cover border border-primary/20 shadow-lg"
                  alt="LVP Coin"
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {userPoints}{' '}
                    <span className="text-xs text-primary font-bold font-mono">LVP</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Points convertibles</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" /> Taux
              </span>
              <span className="text-primary font-bold">1 LVP = {LVP_TO_FCFA} FCFA</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/10 lg:col-span-2">
          <CardContent className="p-5 space-y-4">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
              Conversion instantanée
            </span>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-3">
              <div>
                <Label className="text-xs">Points à convertir</Label>
                <Input
                  type="number"
                  min={0}
                  max={userPoints}
                  value={points || ''}
                  onChange={(e) => setPoints(Math.max(0, parseInt(e.target.value || '0', 10)))}
                  placeholder="0"
                />
              </div>
              <div className="hidden md:flex items-center justify-center pb-2">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-xs">Vous recevez</Label>
                <div className="h-10 flex items-center px-3 rounded-md border border-border bg-muted/30 text-foreground font-bold">
                  {formatFCFA(computedCash)}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs">Numéro Mobile Money / IBAN</Label>
              <Input
                value={paymentInfo}
                onChange={(e) => setPaymentInfo(e.target.value)}
                placeholder="Ex: MTN 0170..., Orange 07..."
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[100, 500, 1000, userPoints].map((v, i) =>
                v > 0 && v <= userPoints ? (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPoints(v)}
                    className="text-xs"
                  >
                    {v === userPoints ? 'Max' : `${v} LVP`}
                  </Button>
                ) : null
              )}
            </div>

            <Button
              onClick={handleConvert}
              disabled={!valid || submitting}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Coins className="h-4 w-4" />
              )}
              Convertir {points > 0 ? `${points} LVP` : ''}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-primary/10">
        <CardContent className="p-5 space-y-3">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" /> Comment accumuler des LVP ?
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span> Parrainer des amis (bonus filleul)
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span> Regarder les publicités quotidiennes
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">✓</span> Compléter les tâches proposées
            </li>
          </ul>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-2 border-t border-border/60">
            <Wallet className="w-3.5 h-3.5 text-primary" />
            Les demandes sont validées sous 24-48h après vérification.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConversionSection;
