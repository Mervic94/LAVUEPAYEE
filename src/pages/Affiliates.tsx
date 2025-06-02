
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Users, Share2, Gift, TrendingUp, Copy, Facebook, Twitter, Mail, MessageCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import { supabase } from '@/integrations/supabase/client';

const Affiliates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState('');
  const [affiliateStats, setAffiliateStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    referrals: []
  });

  useEffect(() => {
    if (user) {
      generateReferralCode();
      fetchAffiliateStats();
    }
  }, [user]);

  const generateReferralCode = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select('referral_code')
        .eq('id', user?.id)
        .single();

      if (data?.referral_code) {
        setReferralCode(data.referral_code);
      } else {
        // Générer un nouveau code
        const newCode = `${user?.email?.slice(0, 4).toUpperCase()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        
        const { error } = await supabase
          .from('users')
          .update({ referral_code: newCode })
          .eq('id', user?.id);

        if (!error) {
          setReferralCode(newCode);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la génération du code:', error);
    }
  };

  const fetchAffiliateStats = async () => {
    try {
      const { data: referrals } = await supabase
        .from('referrals')
        .select(`
          *,
          referred:users!referrals_referred_id_fkey(first_name, last_name, created_at, status)
        `)
        .eq('referrer_id', user?.id);

      const totalReferrals = referrals?.length || 0;
      const activeReferrals = referrals?.filter(r => r.status === 'active').length || 0;
      const totalEarnings = referrals?.reduce((sum, r) => sum + (r.reward_amount || 0), 0) || 0;

      setAffiliateStats({
        totalReferrals,
        activeReferrals,
        totalEarnings,
        monthlyEarnings: totalEarnings * 0.3, // Simulation
        referrals: referrals || []
      });
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Lien copié !",
      description: "Le lien de parrainage a été copié dans le presse-papiers."
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code copié !",
      description: "Le code de parrainage a été copié dans le presse-papiers."
    });
  };

  const shareOnSocial = (platform: string) => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    const message = `Rejoignez-moi sur LaVuePayee et gagnez de l'argent en regardant des publicités ! Utilisez mon code ${referralCode}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + referralLink)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Rejoignez LaVuePayee&body=${encodeURIComponent(message + '\n\n' + referralLink)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const levels = [
    { level: 1, referrals: 0, bonus: '50 points', reached: true },
    { level: 2, referrals: 5, bonus: '100 points + 5€', reached: affiliateStats.totalReferrals >= 5 },
    { level: 3, referrals: 10, bonus: '200 points + 15€', reached: affiliateStats.totalReferrals >= 10 },
    { level: 4, referrals: 25, bonus: '500 points + 50€', reached: affiliateStats.totalReferrals >= 25 },
    { level: 5, referrals: 50, bonus: '1000 points + 150€', reached: affiliateStats.totalReferrals >= 50 }
  ];

  const currentLevel = levels.findIndex(level => !level.reached);
  const nextLevel = levels[currentLevel] || levels[levels.length - 1];
  const progress = currentLevel === -1 ? 100 : (affiliateStats.totalReferrals / nextLevel.referrals) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Programme d'affiliation</h1>
          <p className="text-muted-foreground">
            Invitez vos amis et gagnez des récompenses à chaque parrainage
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total parrainages</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
              <p className="text-xs text-muted-foreground">
                {affiliateStats.activeReferrals} actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gains totaux</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.totalEarnings.toFixed(2)} €</div>
              <p className="text-xs text-muted-foreground">
                Depuis le début
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.monthlyEarnings.toFixed(2)} €</div>
              <p className="text-xs text-muted-foreground">
                +20% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Niveau actuel</CardTitle>
              <Badge variant="secondary">Niveau {currentLevel === -1 ? 5 : currentLevel + 1}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentLevel === -1 ? 'MAX' : `${affiliateStats.totalReferrals}/${nextLevel.referrals}`}
              </div>
              <Progress value={progress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invite" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="invite">Inviter des amis</TabsTrigger>
            <TabsTrigger value="referrals">Mes parrainages</TabsTrigger>
            <TabsTrigger value="levels">Niveaux & Récompenses</TabsTrigger>
            <TabsTrigger value="tools">Outils marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Votre code de parrainage</CardTitle>
                <CardDescription>
                  Partagez ce code avec vos amis pour gagner des récompenses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input value={referralCode} readOnly className="font-mono text-lg" />
                  <Button onClick={copyReferralCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label>Lien de parrainage</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input 
                      value={`${window.location.origin}/register?ref=${referralCode}`} 
                      readOnly 
                      className="font-mono"
                    />
                    <Button onClick={copyReferralLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => shareOnSocial('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => shareOnSocial('twitter')}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => shareOnSocial('whatsapp')}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => shareOnSocial('email')}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comment ça marche ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Share2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">1. Partagez</h3>
                    <p className="text-sm text-muted-foreground">
                      Partagez votre code avec vos amis et votre famille
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">2. Ils s'inscrivent</h3>
                    <p className="text-sm text-muted-foreground">
                      Vos amis s'inscrivent avec votre code de parrainage
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">3. Vous gagnez</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez 100 points et des bonus pour chaque parrainage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            {affiliateStats.referrals.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucun parrainage pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              affiliateStats.referrals.map((referral: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {referral.referred?.first_name || 'Utilisateur'} {referral.referred?.last_name || ''}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Inscrit le {new Date(referral.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={referral.status === 'active' ? 'default' : 'secondary'}>
                          {referral.status === 'active' ? 'Actif' : 'En attente'}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          +{referral.reward_points} points
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="levels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Système de niveaux</CardTitle>
                <CardDescription>
                  Plus vous parrainez, plus vous débloquez de récompenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {levels.map((level, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        level.reached ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Niveau {level.level}</h3>
                          <p className="text-sm text-muted-foreground">
                            {level.referrals} parrainages requis
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={level.reached ? 'default' : 'secondary'}>
                            {level.reached ? 'Atteint' : 'Verrouillé'}
                          </Badge>
                          <p className="text-sm font-medium mt-1">{level.bonus}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outils marketing</CardTitle>
                <CardDescription>
                  Ressources pour promouvoir LaVuePayee efficacement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Bannières publicitaires</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium">Bannière 728x90</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Télécharger
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium">Bannière 300x250</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Messages types</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm">Message pour réseaux sociaux</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Copier
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm">Email type</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Copier
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Affiliates;
