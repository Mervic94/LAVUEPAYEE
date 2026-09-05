import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, RefreshCw, AlertTriangle, Megaphone } from 'lucide-react';
import AdminBackofficeLayout from '@/components/admin/AdminBackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';

interface Ad {
  id: string;
  title: string;
  type: string | null;
  status: string | null;
  approved: boolean | null;
  reward_points: number | null;
  platform: string | null;
  created_at: string;
}

interface FraudAlert {
  id: string;
  user_id: string | null;
  alert_type: string;
  details: any;
  severity: string | null;
  resolved: boolean | null;
  created_at: string;
}

const AdminModeration: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const [a, f] = await Promise.all([
      supabase
        .from('ads')
        .select('id, title, type, status, approved, reward_points, platform, created_at')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase
        .from('fraud_alerts')
        .select('id, user_id, alert_type, details, severity, resolved, created_at')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);
    if (a.error || f.error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Chargement partiel des données.' });
    }
    setAds((a.data as any) ?? []);
    setAlerts((f.data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const decideAd = async (id: string, approve: boolean) => {
    setBusy(id);
    const { error } = approve
      ? await supabase.rpc('admin_approve_ad' as any, { p_ad_id: id })
      : await supabase.rpc('admin_reject_ad' as any, {
          p_ad_id: id,
          p_reason: reasons[id] || 'Contenu non conforme aux règles LAVUEPAYEE',
        });
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Action refusée', description: error.message });
      return;
    }
    toast({ title: approve ? 'Publicité approuvée' : 'Publicité rejetée' });
    load();
  };

  const resolveAlert = async (id: string) => {
    setBusy(id);
    const { error } = await supabase
      .from('fraud_alerts')
      .update({ resolved: true, resolved_by: user?.id ?? null, resolved_at: new Date().toISOString() } as any)
      .eq('id', id);
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Action refusée', description: error.message });
      return;
    }
    toast({ title: 'Alerte traitée' });
    load();
  };

  const pendingAds = ads.filter((a) => !a.approved);
  const openAlerts = alerts.filter((a) => !a.resolved);

  return (
    <AdminBackofficeLayout
      accreditation="moderation"
      title="Modération"
      description="Approuvez les publicités avant diffusion et traitez les alertes de fraude signalées par le système."
    >
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Publicités à approuver</p>
            <p className="text-2xl font-bold">{pendingAds.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Alertes de fraude ouvertes</p>
            <p className="text-2xl font-bold">{openAlerts.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ads">
        <TabsList className="mb-4">
          <TabsTrigger value="ads">
            <Megaphone className="h-4 w-4 mr-1" /> Publicités
          </TabsTrigger>
          <TabsTrigger value="fraud">
            <AlertTriangle className="h-4 w-4 mr-1" /> Fraude
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ads">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">File de modération</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              {!loading && ads.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune publicité enregistrée.</p>
              )}
              {ads.map((a) => (
                <div key={a.id} className="border border-border rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <p className="font-medium">{a.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.type ?? 'vidéo'} · {a.platform ?? 'LAVUEPAYEE'} · {a.reward_points ?? 0} LVP ·{' '}
                        {new Date(a.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge variant={a.approved ? 'default' : 'secondary'}>
                      {a.approved ? 'approuvée' : (a.status ?? 'en attente')}
                    </Badge>
                  </div>
                  {!a.approved && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Motif de rejet (optionnel)"
                        value={reasons[a.id] ?? ''}
                        onChange={(e) => setReasons((p) => ({ ...p, [a.id]: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" disabled={busy === a.id} onClick={() => decideAd(a.id, true)}>
                          <Check className="h-4 w-4 mr-1" /> Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={busy === a.id}
                          onClick={() => decideAd(a.id, false)}
                        >
                          <X className="h-4 w-4 mr-1" /> Rejeter
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Alertes de fraude</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              {!loading && alerts.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune alerte.</p>
              )}
              {alerts.map((al) => (
                <div key={al.id} className="border border-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-medium">{al.alert_type}</p>
                    <p className="text-muted-foreground text-xs">
                      {al.user_id ? `Membre ${al.user_id.slice(0, 8)} · ` : ''}
                      {new Date(al.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={al.severity === 'high' ? 'destructive' : 'secondary'}>
                      {al.severity ?? 'info'}
                    </Badge>
                    {!al.resolved ? (
                      <Button size="sm" disabled={busy === al.id} onClick={() => resolveAlert(al.id)}>
                        <Check className="h-4 w-4 mr-1" /> Traiter
                      </Button>
                    ) : (
                      <Badge>traitée</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminBackofficeLayout>
  );
};

export default AdminModeration;
