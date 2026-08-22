import Seo from '@/components/Seo';
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EmailRegisterFormValues, PhoneRegisterFormValues } from "@/schemas/registerSchemas";
import { checkSponsor, SponsorInfo } from "@/utils/sponsorUtils";
import { formatDateOfBirth } from "@/utils/dateUtils";
import { supabase } from "@/integrations/supabase/client";
import EmailRegisterForm from "@/components/register/EmailRegisterForm";
import PhoneRegisterForm from "@/components/register/PhoneRegisterForm";
import SocialAuth from "@/components/register/SocialAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  const [sponsorInfo, setSponsorInfo] = useState<SponsorInfo>(null);
  const [checkingSponsor, setCheckingSponsor] = useState(false);
  const [referralSponsor, setReferralSponsor] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setReferralSponsor(refParam);
      setCheckingSponsor(true);
      checkSponsor(refParam).then(info => {
        setSponsorInfo(info);
        setCheckingSponsor(false);
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!referralSponsor) {
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
    }
  }, [activeTab, referralSponsor]);

  const onEmailSubmit = async (data: EmailRegisterFormValues) => {
    const dateOfBirth = formatDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);
    
    let sponsorId = null;
    const sponsorUsername = referralSponsor || data.sponsorUsername;
    if (sponsorUsername && sponsorInfo) {
      const { data: sponsorData } = await supabase
        .from('public_profiles')
        .select('id')
        .eq('username', sponsorUsername)
        .maybeSingle();
      sponsorId = sponsorData?.id || null;
    }
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      sponsor_id: sponsorId,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    const result = await signUp(data.email, data.password, userData);
    if (!result.error) {
      localStorage.setItem('pendingEmail', data.email);
      navigate('/verify-email');
    }
  };

  const onPhoneSubmit = async (data: PhoneRegisterFormValues) => {
    const dateOfBirth = formatDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);
    
    let sponsorId = null;
    const sponsorUsername = referralSponsor || data.sponsorUsername;
    if (sponsorUsername && sponsorInfo) {
      const { data: sponsorData } = await supabase
        .from('public_profiles')
        .select('id')
        .eq('username', sponsorUsername)
        .maybeSingle();
      sponsorId = sponsorData?.id || null;
    }
    
    const userData = {
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      sponsor_id: sponsorId,
      date_of_birth: dateOfBirth,
      account_type: data.accountType,
    };
    
    const result = await signUp(data.email, data.password, userData);
    if (!result.error) {
      localStorage.setItem('pendingEmail', data.email);
      navigate('/verify-email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 relative overflow-hidden">
      <Seo title="Créer un compte LAVUEPAYEE" description="Inscrivez-vous gratuitement sur LAVUEPAYEE et commencez à gagner des points LVP en regardant des publicités." path="/register" />
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md space-y-6 relative z-10"
      >
        {/* Brand header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="inline-block">
            <img
              src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
              alt="LAVUEPAYEE"
              className="h-14 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Créer un compte</h1>
          <p className="text-muted-foreground mt-1">
            Rejoignez la communauté et commencez à gagner
            {referralSponsor && sponsorInfo && (
              <span className="block mt-1 text-primary font-medium">
                Parrainé par {sponsorInfo.fullName || sponsorInfo.username}
              </span>
            )}
          </p>
        </motion.div>

        <Card className="glass-card border-border/50 shadow-xl">
          <CardContent className="p-6 tablet-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <SocialAuth />
            </motion.div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">ou continuer avec</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
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
                    sponsorUsername={referralSponsor}
                    isReadOnlySponsor={!!referralSponsor}
                    isLoading={loading}
                  />
                </TabsContent>
                
                <TabsContent value="phone">
                  <PhoneRegisterForm 
                    onSubmit={onPhoneSubmit}
                    sponsorInfo={sponsorInfo}
                    checkingSponsor={checkingSponsor}
                    sponsorUsername={referralSponsor}
                    isReadOnlySponsor={!!referralSponsor}
                    isLoading={loading}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Retour à l'accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
