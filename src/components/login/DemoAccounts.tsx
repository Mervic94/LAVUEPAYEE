
import React from "react";
import { Button } from "@/components/ui/button";
import { useDemoAccounts } from "@/utils/demoUsers";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const DemoAccounts: React.FC = () => {
  const { signInWithDemoAccount } = useDemoAccounts();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleDemoLogin = async (type: "consumer" | "advertiser" | "admin") => {
    setLoading(type);
    try {
      await signInWithDemoAccount(type);
      toast({
        title: "Connexion réussie",
        description: `Vous êtes maintenant connecté en tant que ${type === 'consumer' ? 'consommateur' : type === 'advertiser' ? 'annonceur' : 'administrateur'} de démonstration.`
      });
    } catch (error) {
      console.error("Demo login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Impossible de se connecter au compte de démonstration."
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3 mb-4">
      <h3 className="text-center text-sm font-medium text-muted-foreground">Comptes de démonstration</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleDemoLogin("consumer")}
          className="text-xs"
          disabled={loading !== null}
        >
          {loading === "consumer" ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Connexion...
            </>
          ) : (
            "Essai Consommateur"
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleDemoLogin("advertiser")}
          className="text-xs"
          disabled={loading !== null}
        >
          {loading === "advertiser" ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Connexion...
            </>
          ) : (
            "Essai Annonceur"
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleDemoLogin("admin")}
          className="text-xs"
          disabled={loading !== null}
        >
          {loading === "admin" ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Connexion...
            </>
          ) : (
            "Essai Admin"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DemoAccounts;
