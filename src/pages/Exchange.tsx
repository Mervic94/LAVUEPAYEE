import { useEffect, useState } from 'react';
import { Loader2, Gift, Wallet, Coins } from 'lucide-react';
import ConversionSection from '@/components/exchange/ConversionSection';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserData } from '@/hooks/useUserData';

const Exchange = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { userProfile } = useUserData();
  const [products, setProducts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fiatPoints, setFiatPoints] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const FIAT_RATE = 100; // 100 points = 1 EUR

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from('products').select('*').eq('active', true).order('points_cost'),
      supabase.from('exchange_requests').select('*, products(name)').order('created_at', { ascending: false }),
    ]);
    setProducts(p ?? []);
    setRequests(r ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const requestProduct = async (product: any) => {
    if (!user) return;
    if ((userProfile?.points ?? 0) < product.points_cost) {
      toast({ title: 'Points insuffisants', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('exchange_requests').insert({
      user_id: user.id,
      type: 'product',
      product_id: product.id,
      amount_points: product.points_cost,
    });
    if (error) toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Demande envoyée' }); load(); }
  };

  const requestFiat = async () => {
    if (!user) return;
    const points = parseInt(fiatPoints, 10);
    if (!points || points <= 0) return;
    if ((userProfile?.points ?? 0) < points) {
      toast({ title: 'Points insuffisants', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('exchange_requests').insert({
      user_id: user.id,
      type: 'fiat',
      amount_points: points,
      amount_fiat: points / FIAT_RATE,
      payment_details: { info: paymentInfo },
    });
    setSubmitting(false);
    if (error) toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Demande envoyée' }); setFiatPoints(''); setPaymentInfo(''); load(); }
  };

  return (
    <ProtectedRoute allowedRoles={['consumer', 'admin']}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container px-6 mx-auto max-w-6xl pt-24 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Échanger mes points</h1>
              <p className="text-muted-foreground">Solde : <b>{userProfile?.points ?? 0} LVP</b></p>
            </div>
          </div>

          <Tabs defaultValue="convert">
            <TabsList>
              <TabsTrigger value="convert"><Coins className="h-4 w-4 mr-2" />Conversion</TabsTrigger>
              <TabsTrigger value="products"><Gift className="h-4 w-4 mr-2" />Produits</TabsTrigger>
              <TabsTrigger value="fiat"><Wallet className="h-4 w-4 mr-2" />Retrait fiat</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="convert">
              <ConversionSection userPoints={userProfile?.points ?? 0} onDone={load} />
            </TabsContent>

            <TabsContent value="products">
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : products.length === 0 ? (
                <Card><CardContent className="p-12 text-center text-muted-foreground">Aucun produit disponible</CardContent></Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <Card key={p.id} className="overflow-hidden">
                      {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover" />}
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{p.points_cost} LVP</Badge>
                          <Button size="sm" onClick={() => requestProduct(p)} disabled={p.stock <= 0}>
                            {p.stock <= 0 ? 'Rupture' : 'Échanger'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="fiat">
              <Card className="max-w-lg">
                <CardHeader><CardTitle>Retrait en euros</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Taux : {FIAT_RATE} LVP = 1 €</p>
                  <div>
                    <Label>Nombre de points à convertir</Label>
                    <Input type="number" value={fiatPoints} onChange={(e) => setFiatPoints(e.target.value)} placeholder="Ex: 1000" />
                    {fiatPoints && <p className="text-sm mt-1">≈ <b>{(parseInt(fiatPoints || '0') / FIAT_RATE).toFixed(2)} €</b></p>}
                  </div>
                  <div>
                    <Label>Informations de paiement (IBAN, mobile money, etc.)</Label>
                    <Input value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} />
                  </div>
                  <Button onClick={requestFiat} disabled={submitting || !fiatPoints || !paymentInfo}>
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Demander le retrait
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              {requests.length === 0 ? (
                <Card><CardContent className="p-12 text-center text-muted-foreground">Aucune demande</CardContent></Card>
              ) : (
                <div className="space-y-3">
                  {requests.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {r.type === 'product' ? r.products?.name ?? 'Produit' : `Retrait ${r.amount_fiat} ${r.fiat_currency}`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {r.amount_points} LVP · {new Date(r.created_at).toLocaleDateString()}
                          </div>
                          {r.admin_note && <div className="text-xs mt-1">Note: {r.admin_note}</div>}
                        </div>
                        <Badge variant={
                          r.status === 'pending' ? 'secondary' :
                          r.status === 'approved' ? 'default' : 'destructive'
                        }>{r.status === 'pending' ? 'En attente' : r.status === 'approved' ? 'Validé' : 'Refusé'}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Exchange;
