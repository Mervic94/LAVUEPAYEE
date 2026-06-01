import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useRole } from '@/hooks/useRole';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const PLATFORMS = [
  { id: 'lavuepayee', label: 'LAVUEPAYEE' },
  { id: 'socialpay', label: 'SOCIALPAY' },
  { id: 'lavueannonce', label: 'LAVUEANNONCE' },
  { id: 'zempro', label: 'ZEMPRO' },
  { id: 'beninhub', label: 'BENIN HUB' },
];

interface Stats {
  total_vuc: number;
  tx_count: number;
  views_count: number;
  suspicious_count: number;
}

const PlatformMonitor = () => {
  const { isAdmin, loading: roleLoading } = useRole();
  const [platform, setPlatform] = useState('lavuepayee');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      const [txRes, viewRes, susRes] = await Promise.all([
        supabase.from('transactions').select('points').eq('platform_id', platform),
        supabase.from('ad_views').select('id', { count: 'exact', head: true }).eq('platform_id', platform),
        supabase.from('suspicious_transactions').select('id', { count: 'exact', head: true }).eq('platform_id', platform),
      ]);
      const totalVuc = (txRes.data || []).reduce((s: number, r: any) => s + (r.points || 0), 0);
      setStats({
        total_vuc: totalVuc,
        tx_count: txRes.data?.length || 0,
        views_count: viewRes.count || 0,
        suspicious_count: susRes.count || 0,
      });
      setLoading(false);
    })();
  }, [platform, isAdmin]);

  if (roleLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!isAdmin) return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Monitoring Multi-Plateforme</h1>
            <p className="text-muted-foreground">Statistiques VueCoins par plateforme</p>
          </div>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[240px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </header>

        {loading || !stats ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total VUC distribués" value={stats.total_vuc.toLocaleString()} />
            <StatCard label="Transactions" value={stats.tx_count.toLocaleString()} />
            <StatCard label="Vues publicitaires" value={stats.views_count.toLocaleString()} />
            <StatCard label="Tx suspectes" value={stats.suspicious_count.toLocaleString()} highlight={stats.suspicious_count > 0} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

const StatCard = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <Card className={`glass-card p-6 ${highlight ? 'border-destructive/50' : ''}`}>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`text-3xl font-bold mt-2 ${highlight ? 'text-destructive' : 'text-foreground'}`}>{value}</p>
  </Card>
);

export default PlatformMonitor;
