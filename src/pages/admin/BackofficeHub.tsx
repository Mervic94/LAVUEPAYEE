import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCheck2, Wallet, ShieldCheck, Headphones, Users, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import Seo from '@/components/Seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAccreditation, ACCREDITATION_LABELS, Accreditation } from '@/hooks/useAccreditation';
import { useRole } from '@/hooks/useRole';

const SECTIONS: {
  acc: Accreditation;
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    acc: 'proofs',
    to: '/admin/proofs',
    title: 'Validation des preuves',
    description: 'Vérifier les captures envoyées pour les tâches et créditer ou refuser les gains.',
    icon: FileCheck2,
  },
  {
    acc: 'finance',
    to: '/admin/finance',
    title: 'Finance & retraits',
    description: 'Traiter les demandes de retrait et les échanges de points contre produits ou FCFA.',
    icon: Wallet,
  },
  {
    acc: 'moderation',
    to: '/admin/moderation',
    title: 'Modération',
    description: 'Approuver les publicités et traiter les alertes de fraude.',
    icon: ShieldCheck,
  },
  {
    acc: 'support',
    to: '/admin/support',
    title: 'Support client',
    description: 'Suivre les messages des membres et répondre aux demandes d’aide.',
    icon: Headphones,
  },
  {
    acc: 'general',
    to: '/admin/users',
    title: 'Gestion des comptes',
    description: 'Comptes, rôles et accréditations des administrateurs. Réservé à l’admin général.',
    icon: Users,
  },
];

const BackofficeHub: React.FC = () => {
  const { can, accreditations, isGeneral, loading } = useAccreditation();
  const { isAdmin, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/unauthorized" replace />;

  const visible = SECTIONS.filter((s) => (s.acc === 'general' ? isGeneral : can(s.acc)));

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Backoffice administrateur | LAVUEPAYEE"
        description="Espace d'administration LAVUEPAYEE réservé aux administrateurs accrédités."
        path="/admin"
        noindex
      />
      <Navbar />
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Backoffice</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Vos espaces de travail selon votre accréditation.
          </p>
          <div className="flex flex-wrap gap-2">
            {(isGeneral ? (['general'] as Accreditation[]) : accreditations).map((a) => (
              <Badge key={a} variant="secondary">
                {ACCREDITATION_LABELS[a]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={s.to}>
                  <Card className="glass-card h-full hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{s.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">{s.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                        Ouvrir <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default BackofficeHub;
