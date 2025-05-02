
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Demo account details
const demoUsers = {
  consumer: {
    email: "demo-consumer@example.com",
    password: "Demo123!@#",
    userData: {
      username: "demo-consumer",
      first_name: "Demo",
      last_name: "Consumer",
      date_of_birth: "1990-01-01",
      account_type: "consumer",
    }
  },
  advertiser: {
    email: "demo-advertiser@example.com",
    password: "Demo123!@#",
    userData: {
      username: "demo-advertiser",
      first_name: "Demo",
      last_name: "Advertiser",
      date_of_birth: "1990-01-01",
      account_type: "advertiser",
    }
  },
  admin: {
    email: "demo-admin@example.com",
    password: "Demo123!@#",
    userData: {
      username: "demo-admin",
      first_name: "Demo",
      last_name: "Admin",
      date_of_birth: "1990-01-01",
      account_type: "admin",
      is_admin: true,
    }
  }
};

export const useDemoAccounts = () => {
  const { toast } = useToast();
  
  /**
   * Sign in with a demo account
   * @param type The type of demo account to sign in with
   */
  const signInWithDemoAccount = async (type: "consumer" | "advertiser" | "admin") => {
    try {
      const account = demoUsers[type];
      if (!account) throw new Error("Invalid account type");
      
      // Check if the user exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", account.userData.username)
        .single();
        
      // If the user doesn't exist, create it
      if (!existingUser) {
        const { data: authUser, error: authError } = await supabase.auth.signUp({
          email: account.email,
          password: account.password,
          options: {
            data: account.userData,
          }
        });
        
        if (authError) throw authError;
        
        // If using phone auth for demo, you might need to manually verify the account
        // This would normally be done via email verification or admin action
        
        toast({
          title: "Demo account created",
          description: `${type} account successfully created.`,
        });
      }
      
      // Sign in with the demo account
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password,
      });
      
      if (signInError) throw signInError;
      
      toast({
        title: "Signed in as demo user",
        description: `You are now signed in as a demo ${type}.`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Demo login error:", error);
      
      toast({
        variant: "destructive",
        title: "Demo login failed",
        description: error.message || "An error occurred while signing in with the demo account.",
      });
      
      return false;
    }
  };
  
  return { signInWithDemoAccount };
};

export { demoUsers };
