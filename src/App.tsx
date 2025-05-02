
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import "./App.css";

// Lazy loaded page components
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));
const VerifyPhone = lazy(() => import("@/pages/VerifyPhone"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Wallet = lazy(() => import("@/pages/Wallet"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Messages = lazy(() => import("@/pages/Messages"));
const ViewAd = lazy(() => import("@/pages/ViewAd"));

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedBackground>
          <ScrollToTopOnNavigate />
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/verify-phone" element={<VerifyPhone />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/view-ad/:id" element={<ViewAd />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <Toaster />
        </AnimatedBackground>
      </Router>
    </AuthProvider>
  );
}

export default App;
