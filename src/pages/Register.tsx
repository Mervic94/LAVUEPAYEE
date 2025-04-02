
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EmailRegisterFormValues, PhoneRegisterFormValues } from "@/schemas/registerSchemas";
import { checkSponsor, SponsorInfo } from "@/utils/sponsorUtils";
import { formatDateOfBirth } from "@/utils/dateUtils";
import EmailRegisterForm from "@/components/register/EmailRegisterForm";
import PhoneRegisterForm from "@/components/register/PhoneRegisterForm";
import SocialAuth from "@/components/register/SocialAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signUpWithPhone, user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  const [sponsorInfo, setSponsorInfo] = useState<SponsorInfo>(null);
  const [checkingSponsor, setCheckingSponsor] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const debouncedCheckSponsor = setTimeout(() => {
      const sponsorUsername = document.querySelector(
        activeTab === 'email' 
          ? 'input[name="sponsorUsername"]' 
          : 'form:nth-of-type(2) input[name="sponsorUsername"]'
      ) as HTMLInputElement;
        
      if (sponsorUsername?.value) {
        setCheckingSponsor(true);
        checkSponsor(sponsorUsername.value).then(info => {
          setSponsorInfo(info);
          setCheckingSponsor(false);
        });
      } else {
        setSponsorInfo(null);
      }
    }, 500);
    
    return () => clearTimeout(debouncedCheckSponsor);
  }, [activeTab]);

  const onEmailSubmit = async (data: EmailRegisterFormValues) => {
    const dateOfBirth = formatDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      sponsor_username: data.sponsorUsername,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUp(data.email, data.password, userData);
  };

  const onPhoneSubmit = async (data: PhoneRegisterFormValues) => {
    const dateOfBirth = formatDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      sponsor_username: data.sponsorUsername,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    await signUpWithPhone(data.phone, data.password, userData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">S'inscrire</h1>
          <p className="text-muted-foreground mt-2">
            Créez votre compte pour commencer.
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-6 tablet-container">
            <div className="mb-6">
              <SocialAuth />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">ou continuer avec</span>
              </div>
            </div>

            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
              <TabsList className="grid grid-cols-2 mb-6 w-full">
                <TabsTrigger value="email" className="flex items-center gap-2 tab-trigger">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2 tab-trigger">
                  <Phone className="h-4 w-4" />
                  <span>Téléphone</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <EmailRegisterForm 
                  onSubmit={onEmailSubmit}
                  sponsorInfo={sponsorInfo}
                  checkingSponsor={checkingSponsor}
                />
              </TabsContent>
              
              <TabsContent value="phone">
                <PhoneRegisterForm 
                  onSubmit={onPhoneSubmit}
                  sponsorInfo={sponsorInfo}
                  checkingSponsor={checkingSponsor}
                />
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
