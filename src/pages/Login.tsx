
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User } from "lucide-react";
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

// Import components
import GoogleAuthButton from "@/components/login/GoogleAuthButton";
import EmailLoginForm from "@/components/login/EmailLoginForm";
import PhoneLoginForm from "@/components/login/PhoneLoginForm";
import UsernameLoginForm from "@/components/login/UsernameLoginForm";
import LoginHeader from "@/components/login/LoginHeader";
import LoginDivider from "@/components/login/LoginDivider";
import LoginFooter from "@/components/login/LoginFooter";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithPhone, signInWithUsername, user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  // Handler functions
  const onEmailSubmit = async (data: { email: string, password: string }) => {
    await signIn(data.email, data.password);
  };

  const onPhoneSubmit = async (data: { phone: string, password: string }) => {
    await signInWithPhone(data.phone, data.password);
  };

  const onUsernameSubmit = async (data: { username: string, password: string }) => {
    await signInWithUsername(data.username, data.password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <LoginHeader />

        <div className="glass-card p-6 rounded-lg shadow-md bg-card">
          <div className="mb-6">
            <GoogleAuthButton 
              isLoading={isLoading} 
              setGoogleLoading={setGoogleLoading} 
              googleLoading={googleLoading} 
            />
          </div>

          <LoginDivider />

          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Téléphone</span>
              </TabsTrigger>
              <TabsTrigger value="username" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Utilisateur</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <EmailLoginForm onSubmit={onEmailSubmit} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="phone">
              <PhoneLoginForm onSubmit={onPhoneSubmit} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="username">
              <UsernameLoginForm onSubmit={onUsernameSubmit} isLoading={isLoading} />
            </TabsContent>
          </Tabs>

          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
