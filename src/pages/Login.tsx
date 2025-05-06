
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import GoogleAuthButton from "@/components/login/GoogleAuthButton";
import EmailLoginForm from "@/components/login/EmailLoginForm";
import PhoneLoginForm from "@/components/login/PhoneLoginForm";
import UsernameLoginForm from "@/components/login/UsernameLoginForm";
import LoginDivider from "@/components/login/LoginDivider";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";
import DemoAccounts from "@/components/login/DemoAccounts";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, signInWithPhone, signInWithUsername, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");

  // Redirect already authenticated users
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Handle different form submissions
  const handleEmailLogin = async (data: { email: string; password: string }) => {
    try {
      await signIn(data.email, data.password);
      // Auth state change will trigger the useEffect above to redirect
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handlePhoneLogin = async (data: { phone: string; password: string }) => {
    try {
      await signInWithPhone(data.phone, data.password);
      // Auth state change will trigger the useEffect above to redirect
    } catch (error) {
      console.error("Phone login error:", error);
    }
  };

  const handleUsernameLogin = async (data: { username: string; password: string }) => {
    try {
      await signInWithUsername(data.username, data.password);
      // Auth state change will trigger the useEffect above to redirect
    } catch (error) {
      console.error("Username login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <LoginHeader title="Se connecter" subtitle="Accédez à votre compte" />

        <DemoAccounts />
        
        <Card className="glass-card">
          <CardContent className="p-6 tablet-container">
            <div className="mb-6">
              <GoogleAuthButton isLoading={isLoading} />
            </div>

            <LoginDivider />

            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
              <TabsList className="grid grid-cols-3 mb-6 w-full">
                <TabsTrigger value="email" className="flex items-center gap-2 tab-trigger">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2 tab-trigger">
                  <Phone className="h-4 w-4" />
                  <span>Téléphone</span>
                </TabsTrigger>
                <TabsTrigger value="username" className="flex items-center gap-2 tab-trigger">
                  <User className="h-4 w-4" />
                  <span>Identifiant</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <EmailLoginForm onSubmit={handleEmailLogin} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="phone">
                <PhoneLoginForm onSubmit={handlePhoneLogin} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="username">
                <UsernameLoginForm onSubmit={handleUsernameLogin} isLoading={isLoading} />
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <LoginFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
