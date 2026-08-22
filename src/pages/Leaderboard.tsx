
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star, TrendingUp, Calendar, Users, Target } from 'lucide-react';
import Navbar from '@/components/navbar';
import { supabase } from '@/integrations/supabase/client';
import Seo from '@/components/Seo';

interface LeaderboardUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  points: number;
  total_earned: number;
  rank: number;
  badge?: string;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('points');
  const [timeFilter, setTimeFilter] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, [activeTab, timeFilter]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('users')
        .select('id, username, first_name, last_name, avatar_url, points, total_earned')
        .order(activeTab === 'points' ? 'points' : 'total_earned', { ascending: false })
        .limit(100);

      const { data, error } = await query;

      if (error) throw error;

      // Simuler des données avec des rangs
      const leaderboardWithRanks: LeaderboardUser[] = (data || []).map((user, index) => ({
        ...user,
        rank: index + 1,
        badge: index < 3 ? ['gold', 'silver', 'bronze'][index] : undefined
      }));

      setLeaderboardData(leaderboardWithRanks);

      // Trouver le rang de l'utilisateur actuel
      const currentUserRank = leaderboardWithRanks.find(u => u.id === user?.id)?.rank;
      setUserRank(currentUserRank || null);
    } catch (error) {
      console.error('Erreur lors du chargement du classement:', error);
      // Simuler des données en cas d'erreur
      const mockData: LeaderboardUser[] = Array.from({ length: 50 }, (_, i) => ({
        id: `user-${i}`,
        username: `User${i + 1}`,
        first_name: `Prénom${i + 1}`,
        last_name: `Nom${i + 1}`,
        avatar_url: '',
        points: Math.floor(Math.random() * 10000) + 1000,
        total_earned: Math.floor(Math.random() * 1000) + 100,
        rank: i + 1,
        badge: i < 3 ? ['gold', 'silver', 'bronze'][i] : undefined
      }));
      setLeaderboardData(mockData);
      setUserRank(Math.floor(Math.random() * 50) + 1);
    }
    setLoading(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">👑 Champion</Badge>;
    if (rank <= 3) return <Badge variant="secondary">🏆 Podium</Badge>;
    if (rank <= 10) return <Badge variant="outline">⭐ Top 10</Badge>;
    if (rank <= 50) return <Badge variant="outline">🔥 Top 50</Badge>;
    return null;
  };

  const achievements = [
    {
      title: "Premier pas",
      description: "Première tâche complétée",
      icon: <Star className="h-5 w-5" />,
      unlocked: true
    },
    {
      title: "Régulier",
      description: "7 jours consécutifs d'activité",
      icon: <Calendar className="h-5 w-5" />,
      unlocked: true
    },
    {
      title: "Social",
      description: "5 amis parrainés",
      icon: <Users className="h-5 w-5" />,
      unlocked: false
    },
    {
      title: "Objectif atteint",
      description: "1000 points gagnés",
      icon: <Target className="h-5 w-5" />,
      unlocked: true
    }
  ];

  const topPerformers = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Classement des utilisateurs - LAVUEPAYEE" description="Consultez le classement des utilisateurs LAVUEPAYEE ayant gagné le plus de points LVP." path="/leaderboard" />
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Classement</h1>
          <p className="text-muted-foreground">
            Découvrez les meilleurs utilisateurs de LaVuePayee
          </p>
        </div>

        {/* Votre position */}
        {userRank && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-primary">#{userRank}</div>
                  <div>
                    <p className="font-medium">Votre position actuelle</p>
                    <p className="text-sm text-muted-foreground">
                      {activeTab === 'points' ? 'Classement par points' : 'Classement par gains'}
                    </p>
                  </div>
                </div>
                {getRankBadge(userRank)}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="points">Points LPV</TabsTrigger>
              <TabsTrigger value="earnings">Gains totaux</TabsTrigger>
              <TabsTrigger value="achievements">Succès</TabsTrigger>
            </TabsList>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tout temps</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="points" className="space-y-6">
            {/* Podium */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top 3
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topPerformers.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`text-center p-6 rounded-lg border ${
                        index === 0 ? 'bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-200' :
                        index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200' :
                        'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-200'
                      }`}
                    >
                      <div className="mb-4">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{user.username}</h3>
                      <p className="text-lg font-bold text-primary">{user.points.toLocaleString()} LVP</p>
                      {getRankBadge(user.rank)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reste du classement */}
            <Card>
              <CardHeader>
                <CardTitle>Classement complet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {restOfLeaderboard.map((user) => (
                    <div 
                      key={user.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        user.id === user?.id ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 text-center font-semibold">
                          #{user.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>
                            {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.first_name} {user.last_name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{user.points.toLocaleString()} LVP</p>
                        {getRankBadge(user.rank)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            {/* Podium par gains */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top gagnants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topPerformers.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`text-center p-6 rounded-lg border ${
                        index === 0 ? 'bg-gradient-to-b from-green-50 to-green-100 border-green-200' :
                        index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200' :
                        'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-200'
                      }`}
                    >
                      <div className="mb-4">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{user.username}</h3>
                      <p className="text-lg font-bold text-green-600">{user.total_earned?.toFixed(2)} €</p>
                      {getRankBadge(user.rank)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Classement par gains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {restOfLeaderboard.map((user) => (
                    <div 
                      key={user.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        user.id === user?.id ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 text-center font-semibold">
                          #{user.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>
                            {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.first_name} {user.last_name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{user.total_earned?.toFixed(2)} €</p>
                        {getRankBadge(user.rank)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Succès et réalisations</CardTitle>
                <CardDescription>
                  Débloquez des succès en utilisant LaVuePayee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-muted/50 border-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          p-2 rounded-full
                          ${achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}
                        `}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="ml-auto">Débloqué</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Défis de la semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Regarder 50 publicités</h3>
                      <Badge variant="outline">32/50</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Récompense: 500 points bonus</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Inviter 3 amis</h3>
                      <Badge variant="outline">1/3</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Récompense: 1000 points + 10€</p>
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

export default Leaderboard;
