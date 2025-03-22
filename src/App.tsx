
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Marketplace from '@/pages/Marketplace'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'
import NotFound from '@/pages/NotFound'
import Tasks from '@/pages/Tasks'
import Profile from '@/pages/Profile'
import ViewAd from '@/pages/ViewAd'
import Messages from '@/pages/Messages'
import FAQ from '@/pages/FAQ'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import Cookies from '@/pages/Cookies'
import ClientChat from '@/components/ClientChat'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-ad/:id" element={<ViewAd />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ClientChat />
      <Toaster />
    </Router>
  )
}

export default App
