
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Copy, Check } from 'lucide-react';
import SocialShareLinks from '@/components/SocialShareLinks';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface AffiliationSectionProps {
  userData: {
    name: string;
    affiliationCode: string;
    affiliationStats: {
      totalAffiliates: number;
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
      earnings: number;
    };
  };
}

const AffiliationSection: React.FC<AffiliationSectionProps> = ({ userData }) => {
  const [expanded, setExpanded] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Automatiser le lien d'affiliation en fonction du nom d'utilisateur
  const username = user?.user_metadata?.username || userData.name.toLowerCase().replace(/\s+/g, '');
  const affiliationLink = `https://lavuepayee.com/ref/${username}`;

  // Handle copy affiliation link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliationLink);
    setCopiedToClipboard(true);
    toast({
      title: "Lien copié !",
      description: "Le lien a été copié dans le presse-papier."
    });
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Programme d'affiliation</h2>
          <p className="text-foreground/60">Invitez des amis et gagnez des commissions sur 5 niveaux</p>
        </div>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <SocialShareLinks 
            username={username}
            affiliationLink={affiliationLink}
          />
          
          <button 
            className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Réduire' : 'Voir les détails'}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      {/* Affiliation Link */}
      <div className="glass-card rounded-lg p-4 mb-6">
        <p className="text-sm text-foreground/60 mb-2">Votre lien d'affiliation</p>
        <div className="flex items-center gap-2">
          <div className="flex-grow bg-background rounded-lg px-4 py-2.5 border border-border overflow-hidden overflow-ellipsis">
            {affiliationLink}
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
      {expanded && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Total affiliés</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.totalAffiliates}</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Niveau 1</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.level1}</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Niveau 2</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.level2}</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Niveau 3</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.level3}</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Niveau 4</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.level4}</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <h4 className="text-foreground/60 text-xs mb-1">Niveau 5</h4>
              <p className="text-xl font-semibold">{userData.affiliationStats.level5}</p>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Commissions gagnées</h4>
              <span className="text-green-500 font-semibold">+{userData.affiliationStats.earnings} LVP</span>
            </div>
            <p className="text-sm text-foreground/60">
              Ces commissions sont calculées sur l'activité de tous vos affiliés, sur 5 niveaux de profondeur. Plus vous avez d'affiliés actifs, plus vos gains augmentent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliationSection;
