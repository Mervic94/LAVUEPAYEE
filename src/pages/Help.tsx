
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MessageCircle, FileQuestion, BookOpen, HelpCircle, LifeBuoy, Settings, Tool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import ClientChat from '@/components/client-chat/ClientChat';

const Help = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  const helpCategories = [
    { 
      id: 'getting-started', 
      title: 'Bien débuter',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700',
      topics: [
        'Comment créer un compte',
        'Les différents types de comptes',
        'Comment gagner des points',
        'Comment échanger des points',
      ]
    },
    { 
      id: 'account', 
      title: 'Compte et sécurité',
      icon: Settings,
      color: 'bg-purple-100 text-purple-700',
      topics: [
        'Modifier mon profil',
        'Changer mon mot de passe',
        'Authentification à deux facteurs',
        'Supprimer mon compte',
      ]
    },
    { 
      id: 'tasks', 
      title: 'Tâches et missions',
      icon: Tool,
      color: 'bg-amber-100 text-amber-700',
      topics: [
        'Comment fonctionnent les tâches',
        'Types de tâches disponibles',
        'Problèmes avec les tâches',
        'Validation des tâches',
      ]
    },
    { 
      id: 'payments', 
      title: 'Paiements et retraits',
      icon: LifeBuoy,
      color: 'bg-emerald-100 text-emerald-700',
      topics: [
        'Méthodes de retrait disponibles',
        'Délais de traitement',
        'Frais de transaction',
        'Paiements refusés',
      ]
    },
    { 
      id: 'advertiser', 
      title: 'Pour les annonceurs',
      icon: FileQuestion,
      color: 'bg-red-100 text-red-700',
      topics: [
        'Créer une campagne',
        'Types d\'annonces disponibles',
        'Ciblage d\'audience',
        'Statistiques des campagnes',
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Centre d'aide</h1>
        </div>
        
        {user && (
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>Contacter le support</span>
          </Button>
        )}
      </div>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher dans le centre d'aide..." 
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle size={18} />
            <span>Questions fréquentes</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>Guides et tutoriels</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>Support client</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpCategories.map((category) => (
              <Card key={category.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.topics.map((topic, index) => (
                    <li key={index} className="text-sm text-muted-foreground hover:text-primary">
                      <a href={`#${category.id}-${index}`} className="flex items-center">
                        <span className="mr-2">•</span>
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="text-center py-12">
            <div className="mb-4">
              <BookOpen size={48} className="mx-auto text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Guides et tutoriels</h2>
            <p className="text-muted-foreground mb-6">
              Découvrez nos guides et tutoriels pour vous aider à utiliser notre plateforme.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Guide du débutant</h3>
                <p className="text-sm text-muted-foreground">Tout ce que vous devez savoir pour commencer.</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Comment maximiser vos gains</h3>
                <p className="text-sm text-muted-foreground">Astuces pour optimiser votre expérience.</p>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          {user ? (
            <div className="max-w-3xl mx-auto">
              <ClientChat />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <MessageCircle size={48} className="mx-auto text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Contacter le support</h2>
              <p className="text-muted-foreground mb-6">
                Veuillez vous connecter pour accéder au chat avec notre équipe de support.
              </p>
              <Button onClick={() => navigate('/login')}>Se connecter</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
