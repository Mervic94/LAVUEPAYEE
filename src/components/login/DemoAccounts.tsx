
import React from "react";
import { Button } from "@/components/ui/button";
import { useDemoAccounts } from "@/utils/demoUsers";

const DemoAccounts: React.FC = () => {
  const { signInWithDemoAccount } = useDemoAccounts();

  return (
    <div className="space-y-3 mb-4">
      <h3 className="text-center text-sm font-medium text-muted-foreground">Comptes de démonstration</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signInWithDemoAccount("consumer")}
          className="text-xs"
        >
          Essai Consommateur
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signInWithDemoAccount("advertiser")}
          className="text-xs"
        >
          Essai Annonceur
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signInWithDemoAccount("admin")}
          className="text-xs"
        >
          Essai Admin
        </Button>
      </div>
    </div>
  );
};

export default DemoAccounts;
