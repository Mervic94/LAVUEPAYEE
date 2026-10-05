import Seo from '@/components/Seo';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Scale, ArrowRight } from 'lucide-react';

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:gap-4 py-2 border-b border-border last:border-0">
    <span className="font-medium sm:w-64 shrink-0">{label}</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

const LegalNotice = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Seo title="Mentions légales - LAVUEPAYEE" description="Mentions légales de LAVUEPAYEE conformément au Code du numérique de la République du Bénin." path="/mentions-legales" />
    <Navbar />
    <main className="container mx-auto px-4 py-24 max-w-4xl flex-1">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Mentions légales</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Conformément à la loi n°2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin.
      </p>

      <div className="space-y-8">
        <section className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
          <Row label="Dénomination" value="LAVUEPAYEE" />
          <Row label="Forme juridique" value="[À compléter]" />
          <Row label="Siège social" value="[Adresse à compléter], Bénin" />
          <Row label="N° RCCM" value="[À compléter]" />
          <Row label="N° IFU" value="[À compléter]" />
          <Row label="Directeur de la publication" value="[Nom à compléter]" />
          <Row label="Téléphone" value={<a href="tel:+2290190069561" className="text-primary hover:underline">+229 01 900 695 61</a>} />
          <Row label="E-mail" value={<a href="mailto:contact@lavuepayee.com" className="text-primary hover:underline">contact@lavuepayee.com</a>} />
        </section>

        <section className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Protection des données (APDP)</h2>
          <Row label="Autorité de contrôle" value={<a href="https://apdp.bj" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Autorité de Protection des Données à caractère Personnel (APDP)</a>} />
          <Row label="N° de déclaration / autorisation APDP" value="[En cours / à compléter]" />
          <Row label="Délégué à la protection des données" value={<a href="mailto:dpo@lavuepayee.com" className="text-primary hover:underline">dpo@lavuepayee.com</a>} />
        </section>

        <section className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
          <Row label="Hébergeur du site" value="Lovable (lovable.dev)" />
          <Row label="Hébergeur des données" value="Supabase Inc. — transfert hors du Bénin encadré (voir Politique de confidentialité)" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
          <p className="text-muted-foreground leading-relaxed">
            Les marques, logos, textes et contenus du site sont la propriété de LAVUEPAYEE ou de ses partenaires.
            Toute reproduction sans autorisation écrite est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Droit applicable</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le présent site est régi par le droit béninois. Tout litige relève des juridictions compétentes de Cotonou, sauf disposition contraire.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild variant="outline" size="sm"><Link to="/privacy">Politique de confidentialité <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
        <Button asChild variant="outline" size="sm"><Link to="/terms">Conditions d'utilisation <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
        <Button asChild variant="outline" size="sm"><Link to="/cookies">Politique de cookies <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default LegalNotice;
