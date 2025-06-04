
import React, { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Outlet } from "react-router-dom";
import "./App.css";

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
      <AnimatedBackground>
        <ScrollToTopOnNavigate />
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
          <Outlet />
        </Suspense>
        <Footer />
        <Toaster />
      </AnimatedBackground>
    </AuthProvider>
  );
}

export default App;
