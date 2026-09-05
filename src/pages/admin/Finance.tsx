import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, RefreshCw, ArrowDownToLine, Repeat } from 'lucide-react';
import AdminBackofficeLayout from '@/components/admin/AdminBackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number | null;
  amount_xof: number | null;
  fee: number | null;
  net_amount: number | null;
  method: string | null;
  status: string;
  mobile_operator: string | null;
  mobile_number: string | null;
  created_at: string;
}

interface ExchangeRequest {
  id: string;
  user_id: string;
  type: string;
  amount_points: number | null;
  amount_fiat: number | null;
  fiat_currency: string | null;
  status: string;
  created_at: string;
}

const statusVariant = (s: string) =>
  s === 'completed' || s === 'approved' ? 'default' : s === 'rejected' || s === 'failed' ? 'destructive' : 'secondary';

const AdminFinance: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [exchanges, setExchanges] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [refs, setRefs] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const [w, e] = await Promise.all([
      supabase
        .from('withdrawals')
        .select('id, user_id, amount, amount_xof, fee, net_amount, method, status, mobile_operator, mobile_number, created_at')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase
        .from('exchange_requests')
        .select('id, user_id, type, amount_points, amount_fiat, fiat_currency, status, created_at')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);
    if (w.error || e.error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Chargement partiel des données.' });
    }
    setWithdrawals((w.data as any) ?? []);
    setExchanges((e.data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const processWithdrawal = async (id: string, approve: boolean) => {
    setBusy(id);
    const { error } = await supabase.rpc('admin_process_withdrawal' as any, {
      p_withdrawal_id: id,
      p_status: approve ? 'completed' : 'rejected',
      p_transaction_id: refs[id] || null,
      p_notes: approve ? 'Validé depuis le backoffice finance' : 'Refusé depuis le backoffice finance',
    });
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Action refusée', description: error.message });
      return;
    }
    toast({ title: approve ? 'Retrait payé' : 'Retrait refusé' });
    load();
  };

  const processExchange = async (id: string, approve: boolean) => {
    setBusy(id);
    const { error } = await supabase
      .from('exchange_requests')
      .update({
        status: approve ? 'approved' : 'rejected',
        processed_by: user?.id ?? null,
        processed_at: new Date().toISOString(),
        admin_note: approve ? 'Validé (finance)' : 'Refusé (finance)',
      } as any)
      .eq('id', id);
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Action refusée', description: error.message });
      return;
    }
    toast({ title: approve ? 'Échange validé' : 'Échange refusé' });
    load();
  };

  const pendingW = withdrawals.filter((w) => ['pending', 'processing', 'manual_review'].includes(w.status));
  const pendingE = exchanges.filter((e) => e.status === 'pending');

  return (
    <AdminBackofficeLayout
      accreditation="finance"
      title="Finance & retraits"
      description="Traitez les demandes de retrait Mobile Money et les échanges de LVP contre produits ou FCFA."
    >
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Retraits en attente</p>
            <p className="text-2xl font-bold">{pendingW.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Échanges en attente</p>
            <p className="text-2xl font-bold">{pendingE.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Montant à payer (FCFA)</p>
            <p className="text-2xl font-bold">
              {pendingW
                .reduce((s, w) => s + Number(w.net_amount ?? w.amount_xof ?? w.amount ?? 0), 0)
                .toLocaleString('fr-FR')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="withdrawals">
        <TabsList className="mb-4">
          <TabsTrigger value="withdrawals">
            <ArrowDownToLine className="h-4 w-4 mr-1" /> Retraits
          </TabsTrigger>
          <TabsTrigger value="exchanges">
            <Repeat className="h-4 w-4 mr-1" /> Échanges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="withdrawals">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Demandes de retrait</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              {!loading && withdrawals.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune demande enregistrée.</p>
              )}
              {withdrawals.map((w) => {
                const isPending = ['pending', 'processing', 'manual_review'].includes(w.status);
                return (
                  <div key={w.id} className="border border-border rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm">
                        <p className="font-medium">
                          {Number(w.net_amount ?? w.amount_xof ?? w.amount ?? 0).toLocaleString('fr-FR')} FCFA
                          {w.fee ? (
                            <span className="text-muted-foreground text-xs"> (frais {Number(w.fee).toLocaleString('fr-FR')})</span>
                          ) : null}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {w.method ?? 'Mobile Money'} · {w.mobile_operator ?? '—'} {w.mobile_number ?? ''} ·{' '}
                          {new Date(w.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <Badge variant={statusVariant(w.status)}>{w.status}</Badge>
                    </div>
                    {isPending && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Référence de paiement"
                          value={refs[w.id] ?? ''}
                          onChange={(e) => setRefs((p) => ({ ...p, [w.id]: e.target.value }))}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" disabled={busy === w.id} onClick={() => processWithdrawal(w.id, true)}>
                            <Check className="h-4 w-4 mr-1" /> Marquer payé
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={busy === w.id}
                            onClick={() => processWithdrawal(w.id, false)}
                          >
                            <X className="h-4 w-4 mr-1" /> Refuser
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exchanges">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Demandes d'échange</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              {!loading && exchanges.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune demande enregistrée.</p>
              )}
              {exchanges.map((e) => (
                <div key={e.id} className="border border-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-medium">
                      {Number(e.amount_points ?? 0).toLocaleString('fr-FR')} LVP
                      {e.amount_fiat
                        ? ` → ${Number(e.amount_fiat).toLocaleString('fr-FR')} ${e.fiat_currency ?? 'XOF'}`
                        : ''}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {e.type} · {new Date(e.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(e.status)}>{e.status}</Badge>
                    {e.status === 'pending' && (
                      <>
                        <Button size="sm" disabled={busy === e.id} onClick={() => processExchange(e.id, true)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={busy === e.id}
                          onClick={() => processExchange(e.id, false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
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

export default AdminFinance;
