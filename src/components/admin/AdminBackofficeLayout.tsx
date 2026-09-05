import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/navbar';
import Seo from '@/components/Seo';
import { useAccreditation, Accreditation, ACCREDITATION_LABELS } from '@/hooks/useAccreditation';
import { useRole } from '@/hooks/useRole';

interface Props {
  accreditation: Accreditation;
  title: string;
  description: string;
  children: React.ReactNode;
}

const AdminBackofficeLayout: React.FC<Props> = ({ accreditation, title, description, children }) => {
  const { can, loading } = useAccreditation();
  const { isAdmin, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/unauthorized" replace />;

  if (!can(accreditation)) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container px-4 mx-auto max-w-3xl pt-24 pb-12">
          <div className="glass-card rounded-xl p-8 text-center">
            <ShieldAlert className="h-10 w-10 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Accès non autorisé</h1>
            <p className="text-muted-foreground text-sm">
              Ce backoffice est réservé à l'accréditation « {ACCREDITATION_LABELS[accreditation]} ».
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${title} | Backoffice LAVUEPAYEE`}
        description={description}
        path="/admin"
        noindex
      />
      <Navbar />
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
            {ACCREDITATION_LABELS[accreditation]}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminBackofficeLayout;
