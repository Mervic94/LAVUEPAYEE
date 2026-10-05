import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const KEY = 'lvp_cookie_consent';

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  const decide = (value: 'all' | 'essential') => {
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-label="Consentement aux cookies" className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="glass-card mx-auto max-w-3xl rounded-xl border border-border bg-background/95 p-4 shadow-lg">
        <div className="flex gap-3">
          <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Conformément au Code du numérique du Bénin (APDP), nous utilisons des cookies essentiels au fonctionnement du site.
            Les cookies publicitaires et de mesure ne sont déposés qu'avec votre accord.{' '}
            <Link to="/cookies" className="text-primary hover:underline">En savoir plus</Link>
          </p>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" size="sm" onClick={() => decide('essential')}>Refuser (essentiels uniquement)</Button>
          <Button size="sm" onClick={() => decide('all')}>Tout accepter</Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
