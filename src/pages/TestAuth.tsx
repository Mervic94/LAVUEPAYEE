import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/navbar';

const TestAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
      });

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès !",
          variant: "default"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
          variant: "default"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté.",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test d'Authentification</CardTitle>
              <CardDescription>
                Testez l'inscription et la connexion avec le nouveau système
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800">Utilisateur connecté :</h3>
                    <p className="text-green-700">Email: {user.email}</p>
                    <p className="text-green-700">ID: {user.id}</p>
                    {userProfile && (
                      <div className="mt-2">
                        <p className="text-green-700">Nom: {userProfile.first_name} {userProfile.last_name}</p>
                        <p className="text-green-700">Username: {userProfile.username}</p>
                        <p className="text-green-700">Points: {userProfile.points}</p>
                        <p className="text-green-700">Rôle: {userProfile.role}</p>
                        <p className="text-green-700">Statut: {userProfile.status}</p>
                      </div>
                    )}
                  </div>
                  <Button onClick={handleSignOut} variant="outline">
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inscription */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Inscription</h3>
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signupPassword">Mot de passe</Label>
                        <Input
                          id="signupPassword"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? 'Inscription...' : 'S\'inscrire'}
                      </Button>
                    </form>
                  </div>

                  {/* Connexion */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Connexion</h3>
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div>
                        <Label htmlFor="signinEmail">Email</Label>
                        <Input
                          id="signinEmail"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signinPassword">Mot de passe</Label>
                        <Input
                          id="signinPassword"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions de test</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Remplissez le formulaire d'inscription avec de fausses données</li>
                <li>Cliquez sur "S'inscrire" pour créer un compte</li>
                <li>Vérifiez que les données utilisateur s'affichent correctement</li>
                <li>Déconnectez-vous et reconnectez-vous avec les mêmes identifiants</li>
                <li>Allez dans le dashboard pour tester les publicités</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;