import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, ExternalLink, RefreshCw } from 'lucide-react';
import AdminBackofficeLayout from '@/components/admin/AdminBackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';

interface Completion {
  id: string;
  user_id: string;
  task_id: string;
  status: string;
  proof_screenshot_url: string | null;
  vuc_earned: number | null;
  confidence_score: number | null;
  created_at: string;
}

const AdminProofs: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [rows, setRows] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('task_completions')
      .select('id, user_id, task_id, status, proof_screenshot_url, vuc_earned, confidence_score, created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Chargement impossible.' });
    } else {
      setRows((data as any) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const decide = async (id: string, approve: boolean) => {
    setBusy(id);
    const payload: Record<string, unknown> = {
      status: approve ? 'approved' : 'rejected',
      verified_at: new Date().toISOString(),
      verified_by: user?.id ?? null,
    };
    if (!approve) payload.rejection_reason = reasons[id] || 'Preuve non conforme';

    const { error } = await supabase.from('task_completions').update(payload as any).eq('id', id);
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Action refusée', description: error.message });
      return;
    }
    toast({ title: approve ? 'Preuve validée' : 'Preuve refusée' });
    load();
  };

  const pending = rows.filter((r) => ['pending', 'submitted', 'manual_review'].includes(r.status));
  const treated = rows.filter((r) => !['pending', 'submitted', 'manual_review'].includes(r.status));

  return (
    <AdminBackofficeLayout
      accreditation="proofs"
      title="Validation des preuves"
      description="Vérifiez les captures d'écran envoyées par les membres puis validez ou refusez le gain."
    >
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle className="text-base">À vérifier ({pending.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
          {!loading && pending.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune preuve en attente.</p>
          )}
          {pending.map((r) => (
            <div key={r.id} className="border border-border rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="text-sm">
                  <p className="font-medium">Tâche {r.task_id.slice(0, 8)}</p>
                  <p className="text-muted-foreground text-xs">
                    Membre {r.user_id.slice(0, 8)} · {new Date(r.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {r.confidence_score != null && (
                    <Badge variant="secondary">Confiance {Math.round(r.confidence_score)}%</Badge>
                  )}
                  {r.proof_screenshot_url && (
                    <a
                      href={r.proof_screenshot_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary text-xs inline-flex items-center gap-1"
                    >
                      Voir la preuve <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Motif de refus (optionnel)"
                  value={reasons[r.id] ?? ''}
                  onChange={(e) => setReasons((p) => ({ ...p, [r.id]: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button size="sm" disabled={busy === r.id} onClick={() => decide(r.id, true)}>
                    <Check className="h-4 w-4 mr-1" /> Valider
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={busy === r.id}
                    onClick={() => decide(r.id, false)}
                  >
                    <X className="h-4 w-4 mr-1" /> Refuser
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Historique récent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {treated.length === 0 && <p className="text-sm text-muted-foreground">Rien pour le moment.</p>}
          {treated.slice(0, 30).map((r) => (
            <div key={r.id} className="flex items-center justify-between text-sm border-b border-border pb-2">
              <span className="text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString('fr-FR')} · Tâche {r.task_id.slice(0, 8)}
              </span>
              <Badge variant={r.status === 'approved' ? 'default' : 'destructive'}>{r.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AdminBackofficeLayout>
  );
};

export default AdminProofs;
