import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, Gift, Award, MessageCircle, Send, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface Filleul {
  id: string;
  referred_id: string;
  status: string;
  reward_points: number | null;
  created_at: string;
  users?: { username: string | null; email: string | null } | null;
}

const REWARD_LVP = 100;

const maskEmail = (email?: string | null) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!domain) return email;
  return `${name.slice(0, 2)}***@${domain}`;
};

const ReferralSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState<string>('');
  const [filleuls, setFilleuls] = useState<Filleul[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);

  const inviteLink = `${window.location.origin}/register?ref=${code}`;

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const [{ data: u }, { data: r }] = await Promise.all([
        supabase.from('users').select('referral_code').eq('id', user.id).maybeSingle(),
        supabase
          .from('referrals')
          .select('id, referred_id, status, reward_points, created_at, users:users!referrals_referred_id_fkey(username, email)')
          .eq('referrer_id', user.id)
          .order('created_at', { ascending: false }),
      ]);
      setCode(u?.referral_code ?? user.id.slice(0, 8).toUpperCase());
      setFilleuls((r ?? []) as unknown as Filleul[]);
      setLoading(false);
    })();
  }, [user]);

  const copy = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({ title: type === 'code' ? 'Code copié' : 'Lien copié' });
    setTimeout(() => setCopied(null), 2000);
  };

  const totalBonus = filleuls.reduce((s, f) => s + (f.reward_points ?? REWARD_LVP), 0);
  const waMsg = `Salut ! Rejoins-moi sur LAVUEPAYEE et gagne de l'argent réel en regardant des pubs courtes. Utilise mon code ${code} et reçois +${REWARD_LVP} LVP de bienvenue : ${inviteLink}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Programme de parrainage
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Partagez votre code et gagnez <span className="text-primary font-semibold">{REWARD_LVP} LVP</span> à chaque inscription (bonus partagé).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="glass-card border-primary/10 lg:col-span-3">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-xl">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-foreground text-base font-bold">Partagez & Gagnez</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Bonus partagé : {REWARD_LVP} LVP chacun à l'inscription
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/60">
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Votre code
                </span>
                <div className="flex items-center gap-2 bg-muted/40 border border-border px-3 py-2.5 rounded-xl">
                  <span className="text-xs text-foreground font-mono select-all truncate flex-1">{code}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(code, 'code')}
                    className="h-7 px-2 text-xs"
                  >
                    {copied === 'code' ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'code' ? 'Copié' : 'Copier'}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Lien d'invitation
                </span>
                <div className="flex items-center gap-2 bg-muted/40 border border-border px-3 py-2.5 rounded-xl">
                  <span className="text-xs text-foreground font-mono select-all truncate flex-1">{inviteLink}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(inviteLink, 'link')}
                    className="h-7 px-2 text-xs"
                  >
                    {copied === 'link' ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'link' ? 'Copié' : 'Copier'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 space-y-2">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                Partage rapide
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold text-xs rounded-xl transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-semibold text-xs rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <Button
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() =>
                      (navigator as any).share({ title: 'LAVUEPAYEE', text: waMsg, url: inviteLink })
                    }
                  >
                    <Share2 className="w-4 h-4 mr-1" /> Partager
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Award className="w-4 h-4 text-primary" /> Bonus cumulé
              </span>
              <span className="text-primary font-bold">{totalBonus} LVP</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/10 lg:col-span-2">
          <CardContent className="p-5 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Fonctionnement</h4>
            {[
              'Copiez et partagez votre lien ou code sur WhatsApp, Telegram ou vos réseaux.',
              'Votre filleul s\'inscrit avec votre code (ou via votre lien pré-rempli).',
              `Dès validation, ${REWARD_LVP} LVP sont crédités instantanément à vous deux.`,
            ].map((txt, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary shrink-0 text-[10px]">
                  {i + 1}
                </div>
                <p className="text-muted-foreground mt-0.5 leading-relaxed">{txt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-primary/10">
        <CardContent className="p-6">
          <h3 className="text-foreground font-bold text-base mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Vos filleuls ({filleuls.length})
          </h3>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 bg-muted/30 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filleuls.length === 0 ? (
            <div className="text-center py-10 bg-muted/20 border border-dashed border-border rounded-2xl">
              <Users className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Vous n'avez pas encore de filleul.</p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Partagez votre lien pour récolter vos premiers bonus !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filleuls.map((f) => {
                const name = f.users?.username || maskEmail(f.users?.email) || 'Filleul';
                return (
                  <div
                    key={f.id}
                    className="bg-muted/20 border border-border p-3 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs">
                      {name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h5 className="text-foreground font-semibold text-xs truncate">{name}</h5>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                        {new Date(f.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge
                      variant={f.status === 'confirmed' || f.status === 'active' ? 'default' : 'secondary'}
                      className="text-[10px]"
                    >
                      +{f.reward_points ?? REWARD_LVP} LVP
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReferralSection;
