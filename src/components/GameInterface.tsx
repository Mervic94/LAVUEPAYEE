
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Gamepad2, Zap, Target, Trophy, Gift, Star } from 'lucide-react';

interface GameStats {
  level: number;
  experience: number;
  experienceToNext: number;
  streak: number;
  dailyTarget: number;
  dailyProgress: number;
  powerUps: {
    doublePoints: number;
    bonusTime: number;
    multiplier: number;
  };
}

interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  reward: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  available: boolean;
}

const GameInterface: React.FC = () => {
  const { toast } = useToast();
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 3,
    experience: 750,
    experienceToNext: 1000,
    streak: 7,
    dailyTarget: 100,
    dailyProgress: 65,
    powerUps: {
      doublePoints: 2,
      bonusTime: 1,
      multiplier: 0
    }
  });

  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const miniGames: MiniGame[] = [
    {
      id: 'memory',
      name: 'Jeu de mémoire',
      description: 'Mémorisez les publicités et gagnez des points',
      icon: <Target className="h-5 w-5" />,
      reward: 25,
      difficulty: 'Facile',
      available: true
    },
    {
      id: 'quiz',
      name: 'Quiz produits',
      description: 'Répondez aux questions sur les publicités vues',
      icon: <Star className="h-5 w-5" />,
      reward: 50,
      difficulty: 'Moyen',
      available: true
    },
    {
      id: 'speed',
      name: 'Clics rapides',
      description: 'Cliquez rapidement sur les bonnes publicités',
      icon: <Zap className="h-5 w-5" />,
      reward: 75,
      difficulty: 'Difficile',
      available: gameStats.level >= 5
    },
    {
      id: 'puzzle',
      name: 'Puzzle pub',
      description: 'Reconstituez les logos des marques',
      icon: <Gamepad2 className="h-5 w-5" />,
      reward: 100,
      difficulty: 'Difficile',
      available: gameStats.level >= 10
    }
  ];

  const playGame = (gameId: string) => {
    setSelectedGame(gameId);
    setGameInProgress(true);
    
    // Simuler le jeu
    setTimeout(() => {
      const game = miniGames.find(g => g.id === gameId);
      const success = Math.random() > 0.3; // 70% de chance de réussite
      
      if (success && game) {
        setGameStats(prev => ({
          ...prev,
          experience: prev.experience + game.reward,
          dailyProgress: Math.min(prev.dailyProgress + game.reward, prev.dailyTarget)
        }));
        
        toast({
          title: "Félicitations !",
          description: `Vous avez gagné ${game.reward} points LPV !`
        });
      } else {
        toast({
          title: "Dommage !",
          description: "Réessayez pour gagner des points.",
          variant: "destructive"
        });
      }
      
      setGameInProgress(false);
      setSelectedGame(null);
    }, 3000);
  };

  const usePowerUp = (type: keyof typeof gameStats.powerUps) => {
    if (gameStats.powerUps[type] > 0) {
      setGameStats(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          [type]: prev.powerUps[type] - 1
        }
      }));
      
      toast({
        title: "Power-up activé !",
        description: `${type} est maintenant actif.`
      });
    }
  };

  const progressPercentage = (gameStats.experience / gameStats.experienceToNext) * 100;
  const dailyProgressPercentage = (gameStats.dailyProgress / gameStats.dailyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Stats du joueur */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Progression du joueur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Niveau {gameStats.level}</div>
              <p className="text-sm text-muted-foreground">Rang actuel</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{gameStats.streak}</div>
              <p className="text-sm text-muted-foreground">Jours consécutifs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{gameStats.experience}</div>
              <p className="text-sm text-muted-foreground">Points d'expérience</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Expérience niveau suivant</span>
              <span>{gameStats.experience}/{gameStats.experienceToNext}</span>
            </div>
            <Progress value={progressPercentage} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Objectif quotidien</span>
              <span>{gameStats.dailyProgress}/{gameStats.dailyTarget} points</span>
            </div>
            <Progress value={dailyProgressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Power-ups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Power-ups disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Double Points</h3>
                <Badge>{gameStats.powerUps.doublePoints}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Double les points de la prochaine publicité
              </p>
              <Button 
                size="sm" 
                className="w-full"
                disabled={gameStats.powerUps.doublePoints === 0}
                onClick={() => usePowerUp('doublePoints')}
              >
                Utiliser
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Temps Bonus</h3>
                <Badge>{gameStats.powerUps.bonusTime}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Ajoute 30 secondes au timer des jeux
              </p>
              <Button 
                size="sm" 
                className="w-full"
                disabled={gameStats.powerUps.bonusTime === 0}
                onClick={() => usePowerUp('bonusTime')}
              >
                Utiliser
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Multiplicateur x2</h3>
                <Badge>{gameStats.powerUps.multiplier}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Multiplie les gains pendant 10 minutes
              </p>
              <Button 
                size="sm" 
                className="w-full"
                disabled={gameStats.powerUps.multiplier === 0}
                onClick={() => usePowerUp('multiplier')}
              >
                Utiliser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mini-jeux */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Mini-jeux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miniGames.map((game) => (
              <div 
                key={game.id}
                className={`p-4 border rounded-lg ${
                  !game.available ? 'opacity-50' : 'hover:bg-muted/50 transition-colors'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-primary">{game.icon}</div>
                  <div>
                    <h3 className="font-medium">{game.name}</h3>
                    <p className="text-xs text-muted-foreground">{game.difficulty}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline">+{game.reward} pts</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {game.description}
                </p>
                
                <Button 
                  className="w-full"
                  disabled={!game.available || gameInProgress}
                  onClick={() => playGame(game.id)}
                >
                  {!game.available ? 'Verrouillé' : 
                   gameInProgress && selectedGame === game.id ? 'En cours...' : 
                   'Jouer'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Récompenses quotidiennes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Récompense quotidienne
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl">🎁</div>
            <div>
              <h3 className="text-lg font-medium">Bonus quotidien disponible !</h3>
              <p className="text-muted-foreground">
                Connectez-vous chaque jour pour gagner des power-ups
              </p>
            </div>
            <Button size="lg">
              <Gift className="h-4 w-4 mr-2" />
              Récupérer ma récompense
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameInterface;
