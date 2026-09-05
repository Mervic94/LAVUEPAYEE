import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, RefreshCw, Send, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminBackofficeLayout from '@/components/admin/AdminBackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

const AdminSupport: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('id, sender_id, recipient_id, content, read_at, created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Chargement impossible.' });
    }
    setMessages((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) => m.content.toLowerCase().includes(q) || m.sender_id.toLowerCase().includes(q)
    );
  }, [messages, query]);

  const incoming = filtered.filter((m) => m.sender_id !== user?.id);
  const unread = incoming.filter((m) => !m.read_at);

  const send = async (m: Message) => {
    const text = (reply[m.id] ?? '').trim();
    if (!text) return;
    setBusy(m.id);
    const { error } = await supabase.from('messages').insert({
      sender_id: user?.id,
      recipient_id: m.sender_id,
      content: text,
      type: 'text',
    } as any);
    if (!error) {
      await supabase.from('messages').update({ read_at: new Date().toISOString() } as any).eq('id', m.id);
    }
    setBusy(null);
    if (error) {
      toast({ variant: 'destructive', title: 'Envoi impossible', description: error.message });
      return;
    }
    toast({ title: 'Réponse envoyée' });
    setReply((p) => ({ ...p, [m.id]: '' }));
    load();
  };

  return (
    <AdminBackofficeLayout
      accreditation="support"
      title="Support client"
      description="Suivez les messages reçus des membres et répondez directement depuis le backoffice."
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Rechercher un message ou un membre"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/messages">
              <MessageSquare className="h-4 w-4 mr-1" /> Messagerie
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Messages reçus</p>
            <p className="text-2xl font-bold">{incoming.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Non lus</p>
            <p className="text-2xl font-bold">{unread.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Demandes des membres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
          {!loading && incoming.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun message pour le moment.</p>
          )}
          {incoming.map((m) => (
            <div key={m.id} className="border border-border rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  Membre {m.sender_id.slice(0, 8)} · {new Date(m.created_at).toLocaleString('fr-FR')}
                </p>
                {!m.read_at && <Badge variant="secondary">nouveau</Badge>}
              </div>
              <p className="text-sm text-foreground/90">{m.content}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Textarea
                  placeholder="Votre réponse..."
                  value={reply[m.id] ?? ''}
                  onChange={(e) => setReply((p) => ({ ...p, [m.id]: e.target.value }))}
                  className="min-h-[60px]"
                />
                <Button size="sm" disabled={busy === m.id || !(reply[m.id] ?? '').trim()} onClick={() => send(m)}>
                  <Send className="h-4 w-4 mr-1" /> Envoyer
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AdminBackofficeLayout>
  );
};

export default AdminSupport;
