
import React, { useState } from 'react';
import { BadgeDollarSign, Users, Clock, ChevronDown, ChevronUp, Check, Link as LinkIcon, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import PointsIndicator from '@/components/PointsIndicator';

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Mock user data
  const userData = {
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    points: 1250,
    affiliationCode: 'THOMAS25',
    affiliationLink: 'https://rewardads.com/ref/THOMAS25',
    affiliationStats: {
      totalAffiliates: 12,
      level1: 5,
      level2: 4,
      level3: 2,
      level4: 1,
      level5: 0,
      earnings: 387
    }
  };
  
  // Mock transaction history
  const transactions = [
    { id: 1, type: 'earning', description: 'Publicité visionnée', amount: 50, date: '2023-06-15T14:30:00' },
    { id: 2, type: 'earning', description: 'Commission d\'affiliation - Niveau 1', amount: 25, date: '2023-06-14T11:15:00' },
    { id: 3, type: 'spending', description: 'Conversion en euros', amount: -5000, date: '2023-06-10T09:45:00' },
    { id: 4, type: 'earning', description: 'Publicité visionnée', amount: 75, date: '2023-06-08T16:20:00' },
    { id: 5, type: 'earning', description: 'Commission d\'affiliation - Niveau 2', amount: 10, date: '2023-06-05T13:10:00' },
    { id: 6, type: 'spending', description: 'Écouteurs sans fil premium', amount: -15000, date: '2023-06-01T10:30:00' },
  ];
  
  // Mock affiliates data
  const affiliates = [
    { id: 1, name: 'Marie Laurent', level: 1, joinDate: '2023-05-20T10:30:00', earnings: 250 },
    { id: 2, name: 'Jean Petit', level: 1, joinDate: '2023-05-18T14:15:00', earnings: 180 },
    { id: 3, name: 'Claire Martin', level: 1, joinDate: '2023-05-15T09:45:00', earnings: 320 },
    { id: 4, name: 'Lucas Bernard', level: 2, joinDate: '2023-05-10T11:30:00', earnings: 150 },
    { id: 5, name: 'Sophie Durand', level: 2, joinDate: '2023-05-05T16:20:00', earnings: 200 },
  ];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  // Handle copy affiliation link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.affiliationLink);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        
        {/* User Profile Card */}
        <div className="glass-card rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            
            {/* User Info */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-foreground/60 mb-4">{userData.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <PointsIndicator points={userData.points} size="lg" />
                <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
                  <Users className="h-4 w-4" />
                  <span>{userData.affiliationStats.totalAffiliates} affiliés</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="btn-primary w-full md:w-auto">
                Modifier mon profil
              </button>
              <button className="btn-secondary w-full md:w-auto">
                Paramètres du compte
              </button>
            </div>
          </div>
        </div>
        
        {/* Affiliation Section */}
        <div className="glass-card rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Programme d'affiliation</h2>
              <p className="text-foreground/60">Invitez des amis et gagnez des commissions sur 5 niveaux</p>
            </div>
            
            <button 
              className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium mt-2 md:mt-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Réduire' : 'Voir les détails'}
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          
          {/* Affiliation Link */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground/60 mb-2">Votre lien d'affiliation</p>
            <div className="flex items-center gap-2">
              <div className="flex-grow bg-background rounded-lg px-4 py-2.5 border border-border overflow-hidden overflow-ellipsis">
                {userData.affiliationLink}
              </div>
              <button 
                className={`min-w-24 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  copiedToClipboard 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-primary-foreground'
                }`}
                onClick={copyToClipboard}
              >
                {copiedToClipboard ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copier
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-foreground/60 mt-2">Code: <span className="font-medium">{userData.affiliationCode}</span></p>
          </div>
          
          {/* Affiliation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-lg p-4 text-center">
              <p className="text-foreground/60 text-sm mb-1">Total des affiliés</p>
              <div className="flex items-center justify-center gap-1">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">{userData.affiliationStats.totalAffiliates}</span>
              </div>
            </div>
            <div className="glass-card rounded-lg p-4 text-center">
              <p className="text-foreground/60 text-sm mb-1">Points gagnés</p>
              <div className="flex items-center justify-center gap-1">
                <BadgeDollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">{userData.affiliationStats.earnings}</span>
              </div>
            </div>
            <div className="glass-card rounded-lg p-4 text-center">
              <p className="text-foreground/60 text-sm mb-1">Commission moyenne</p>
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">32 pts/jour</span>
              </div>
            </div>
          </div>
          
          {/* Expanded Affiliation Details */}
          {expanded && (
            <div className="mt-6 pt-6 border-t border-border animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Détails par niveau</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((level) => {
                  const levelKey = `level${level}` as keyof typeof userData.affiliationStats;
                  const affiliateCount = userData.affiliationStats[levelKey];
                  const commission = 10 - (level - 1) * 2; // Commission rates: 10%, 8%, 6%, 4%, 2%
                  
                  return (
                    <div key={level} className="glass-card rounded-lg p-4 text-center">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium mx-auto mb-2">
                        {level}
                      </div>
                      <p className="font-medium mb-1">{affiliateCount} affilié{affiliateCount !== 1 ? 's' : ''}</p>
                      <p className="text-foreground/60 text-sm">{commission}% de commission</p>
                    </div>
                  );
                })}
              </div>
              
              {/* Top Affiliates */}
              <h3 className="text-lg font-semibold mb-4">Mes meilleurs affiliés</h3>
              <div className="glass-card rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-secondary/50 font-medium">
                  <div className="col-span-2">Nom</div>
                  <div className="text-center">Niveau</div>
                  <div className="text-center">Date d'inscription</div>
                  <div className="text-center">Points générés</div>
                </div>
                
                {affiliates.map((affiliate) => (
                  <div key={affiliate.id} className="grid grid-cols-5 gap-4 p-4 border-t border-border">
                    <div className="col-span-2">{affiliate.name}</div>
                    <div className="text-center">{affiliate.level}</div>
                    <div className="text-center">{formatDate(affiliate.joinDate)}</div>
                    <div className="text-center font-medium">{affiliate.earnings} pts</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Tabs for History and Settings */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="history" className="text-base">Historique</TabsTrigger>
            <TabsTrigger value="settings" className="text-base">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="animate-fade-in">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/50 font-medium">
                <div className="col-span-2">Transaction</div>
                <div className="text-center">Date</div>
                <div className="text-right">Points</div>
              </div>
              
              {transactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4 border-t border-border">
                  <div className="col-span-2">{transaction.description}</div>
                  <div className="text-center">{formatDate(transaction.date)}</div>
                  <div className={`text-right font-medium ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Préférences de compte</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-foreground/70 mb-2">Nom complet</label>
                  <input 
                    type="text" 
                    value={userData.name}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-foreground/70 mb-2">Adresse email</label>
                  <input 
                    type="email" 
                    value={userData.email}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-foreground/70 mb-2">Préférences de notification</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_new_ads" className="rounded border-border focus:ring-primary" />
                      <label htmlFor="notify_new_ads" className="ml-2">Nouvelles publicités disponibles</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_earnings" className="rounded border-border focus:ring-primary" />
                      <label htmlFor="notify_earnings" className="ml-2">Gains de points</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_affiliates" className="rounded border-border focus:ring-primary" />
                      <label htmlFor="notify_affiliates" className="ml-2">Activité des affiliés</label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button className="btn-primary">Enregistrer les modifications</button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
