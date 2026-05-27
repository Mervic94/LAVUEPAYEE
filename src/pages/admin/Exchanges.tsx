import { useEffect, useState } from 'react';
import { Loader2, Package } from 'lucide-react';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminExchanges = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('exchange_requests')
      .select('*, products(name)')
      .order('created_at', { ascending: false });
    setRequests(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const decide = async (id: string, decision: 'approved' | 'rejected') => {
    setProcessing(id);
    const { error } = await supabase.functions.invoke('process-exchange', {
      body: { request_id: id, decision, admin_note: notes[id] ?? null },
    });
    setProcessing(null);
    if (error) toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    else { toast({ title: `Demande ${decision === 'approved' ? 'validée' : 'refusée'}` }); load(); }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Demandes d'échange</h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : requests.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">Aucune demande</CardContent></Card>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => (
                <Card key={r.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {r.type === 'product' ? `Produit : ${r.products?.name ?? '—'}` : `Retrait fiat`}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(r.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={
                        r.status === 'pending' ? 'secondary' :
                        r.status === 'approved' ? 'default' : 'destructive'
                      }>{r.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div><span className="text-muted-foreground">Points :</span> <b>{r.amount_points}</b></div>
                      {r.amount_fiat && (
                        <div><span className="text-muted-foreground">Montant :</span> <b>{r.amount_fiat} {r.fiat_currency}</b></div>
                      )}
                      <div className="col-span-2"><span className="text-muted-foreground">User ID :</span> <code className="text-xs">{r.user_id}</code></div>
                      {r.payment_details && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Détails :</span>
                          <pre className="text-xs bg-muted p-2 rounded mt-1">{JSON.stringify(r.payment_details, null, 2)}</pre>
                        </div>
                      )}
                      {r.admin_note && (
                        <div className="col-span-2"><span className="text-muted-foreground">Note admin :</span> {r.admin_note}</div>
                      )}
                    </div>
                    {r.status === 'pending' && (
                      <>
                        <Textarea
                          placeholder="Note (optionnelle)"
                          value={notes[r.id] ?? ''}
                          onChange={(e) => setNotes((n) => ({ ...n, [r.id]: e.target.value }))}
                          className="mb-3"
                        />
                        <div className="flex gap-2">
                          <Button onClick={() => decide(r.id, 'approved')} disabled={processing === r.id}>
                            {processing === r.id && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Valider
                          </Button>
                          <Button variant="destructive" onClick={() => decide(r.id, 'rejected')} disabled={processing === r.id}>
                            Refuser
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminExchanges;
