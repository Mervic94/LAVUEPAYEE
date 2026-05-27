import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, Megaphone, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthProvider';
import { useRole } from '@/hooks/useRole';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ROLE_INFO = {
  admin: {
    icon: Shield,
    title: 'Administrateur',
    desc: 'Vous supervisez la plateforme, validez les demandes et gérez les utilisateurs.',
    cta: 'Gérer les utilisateurs',
    route: '/admin/users',
    color: 'from-red-500 to-orange-500',
  },
  advertiser: {
    icon: Megaphone,
    title: 'Annonceur',
    desc: 'Créez des campagnes publicitaires et touchez votre audience cible.',
    cta: 'Créer ma première campagne',
    route: '/analytics',
    color: 'from-blue-500 to-purple-500',
  },
  consumer: {
    icon: Eye,
    title: 'Consommateur',
    desc: 'Regardez des publicités, gagnez des LVP points et échangez-les contre des récompenses.',
    cta: 'Voir une première publicité',
    route: '/tasks',
    color: 'from-green-500 to-emerald-500',
  },
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { primaryRole, loading: rolesLoading } = useRole();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (userProfile?.onboarded) navigate('/dashboard');
  }, [userProfile, navigate]);

  const role = primaryRole ?? 'consumer';
  const info = ROLE_INFO[role];
  const Icon = info.icon;

  const handleStart = async () => {
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase
      .from('users')
      .update({ onboarded: true })
      .eq('id', user.id);
    setSubmitting(false);
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      return;
    }
    navigate(info.route);
  };

  if (rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <Card className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${info.color}`} />
            <CardContent className="p-8 text-center">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${info.color} mb-6`}>
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Bienvenue {userProfile?.first_name || userProfile?.username || ''} !
              </h1>
              <p className="text-muted-foreground mb-2">Votre rôle :</p>
              <h2 className="text-2xl font-semibold mb-4">{info.title}</h2>
              <p className="text-muted-foreground mb-8">{info.desc}</p>

              <Button size="lg" onClick={handleStart} disabled={submitting} className="w-full sm:w-auto">
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {info.cta}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <button
                onClick={() => navigate('/dashboard')}
                className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground"
              >
                Passer pour l'instant
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default Onboarding;
