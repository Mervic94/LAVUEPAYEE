import { useEffect, useState } from 'react';
import { Loader2, Search, Shield } from 'lucide-react';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type AdminUser = {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  role: string;
  status: string;
  points: number;
  created_at: string;
};

const ROLES = ['admin', 'advertiser', 'consumer'] as const;

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    else setUsers((data ?? []) as AdminUser[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const changeRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.functions.invoke('admin-update-role', {
      body: { user_id: userId, role: newRole },
    });
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Rôle mis à jour' });
    load();
  };

  const openHistory = async (u: AdminUser) => {
    setSelectedUser(u);
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', u.id)
      .order('created_at', { ascending: false })
      .limit(50);
    setHistory(data ?? []);
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Rechercher email ou username..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Utilisateurs ({filtered.length})</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-2">Utilisateur</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Rôle</th>
                        <th className="p-2">Points</th>
                        <th className="p-2">Statut</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-muted/30">
                          <td className="p-2">{u.username}</td>
                          <td className="p-2 text-muted-foreground">{u.email}</td>
                          <td className="p-2">
                            <Select value={u.role} onValueChange={(v) => changeRole(u.id, v)}>
                              <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2">{u.points}</td>
                          <td className="p-2">
                            <Badge variant={u.status === 'active' ? 'default' : 'secondary'}>{u.status}</Badge>
                          </td>
                          <td className="p-2">
                            <Button size="sm" variant="outline" onClick={() => openHistory(u)}>
                              Historique
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={!!selectedUser} onOpenChange={(o) => !o && setSelectedUser(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Historique – {selectedUser?.username}</DialogTitle></DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Aucune transaction</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead><tr className="border-b text-left">
                      <th className="p-2">Date</th><th className="p-2">Type</th>
                      <th className="p-2">Points</th><th className="p-2">Montant</th><th className="p-2">Statut</th>
                    </tr></thead>
                    <tbody>
                      {history.map((t) => (
                        <tr key={t.id} className="border-b">
                          <td className="p-2">{new Date(t.created_at).toLocaleDateString()}</td>
                          <td className="p-2">{t.type}</td>
                          <td className="p-2">{t.points}</td>
                          <td className="p-2">{t.amount}</td>
                          <td className="p-2"><Badge variant="outline">{t.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUsers;
