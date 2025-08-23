
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/navbar';
import AccountSettings from '@/components/settings/AccountSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import SocialSettings from '@/components/settings/SocialSettings';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-background transition-theme">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap md:flex-nowrap overflow-x-auto">
            <TabsTrigger value="account" className="text-sm md:text-base">Compte</TabsTrigger>
            <TabsTrigger value="security" className="text-sm md:text-base">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm md:text-base">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="text-sm md:text-base">Confidentialité</TabsTrigger>
            <TabsTrigger value="appearance" className="text-sm md:text-base">Apparence</TabsTrigger>
            <TabsTrigger value="social" className="text-sm md:text-base">Réseaux sociaux</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="animate-fade-in">
            <AccountSettings user={user} />
          </TabsContent>
          
          <TabsContent value="security" className="animate-fade-in">
            <SecuritySettings user={user} />
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-fade-in">
            <NotificationSettings user={user} />
          </TabsContent>
          
          <TabsContent value="privacy" className="animate-fade-in">
            <PrivacySettings user={user} />
          </TabsContent>
          
          <TabsContent value="appearance" className="animate-fade-in">
            <AppearanceSettings />
          </TabsContent>
          
          <TabsContent value="social" className="animate-fade-in">
            <SocialSettings user={user} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
