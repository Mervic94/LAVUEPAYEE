
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Marketplace from '@/pages/Marketplace'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'
import VerifyPhone from '@/pages/VerifyPhone'
import NotFound from '@/pages/NotFound'
import Tasks from '@/pages/Tasks'
import Profile from '@/pages/Profile'
import ViewAd from '@/pages/ViewAd'
import Messages from '@/pages/Messages'
import FAQ from '@/pages/FAQ'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import Cookies from '@/pages/Cookies'
import ClientChat from '@/components/client-chat'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/navbar'

import './App.css'
import './styles/phone-input.css'

// Fonction pour mettre à jour le favicon
const updateFavicon = () => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
  if (link) {
    link.href = "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png";
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png";
    document.head.appendChild(newLink);
  }
};

function App() {
  // Mettre à jour le favicon au chargement de l'application
  React.useEffect(() => {
    updateFavicon();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/verify-phone" element={<VerifyPhone />} />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/view-ad/:id" element={<ViewAd />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <ClientChat />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
