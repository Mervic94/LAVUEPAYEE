
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Import des pages
import Index from './pages/Index.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Profile from './pages/Profile.tsx'
import Tasks from './pages/Tasks.tsx'
import Wallet from './pages/Wallet.tsx'
import Messages from './pages/Messages.tsx'
import Settings from './pages/Settings.tsx'
import ViewAd from './pages/ViewAd.tsx'
import Marketplace from './pages/Marketplace.tsx'
import Help from './pages/Help.tsx'
import FAQ from './pages/FAQ.tsx'
import Terms from './pages/Terms.tsx'
import Privacy from './pages/Privacy.tsx'
import Cookies from './pages/Cookies.tsx'
import NotFound from './pages/NotFound.tsx'
import ResetPassword from './pages/ResetPassword.tsx'
import VerifyEmail from './pages/VerifyEmail.tsx'
import VerifyPhone from './pages/VerifyPhone.tsx'

// Import des nouvelles pages
import Analytics from './pages/Analytics.tsx'
import KYC from './pages/KYC.tsx'
import Support from './pages/Support.tsx'
import Notifications from './pages/Notifications.tsx'
import Affiliates from './pages/Affiliates.tsx'
import Leaderboard from './pages/Leaderboard.tsx'
import Courses from './pages/Courses.tsx'

import { Toaster } from "@/components/ui/toaster"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "verify-phone", element: <VerifyPhone /> },
      
      // Pages publiques (accessible sans authentification)
      { path: "marketplace", element: <Marketplace /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "faq", element: <FAQ /> },
      { path: "help", element: <Help /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
      { path: "cookies", element: <Cookies /> },
      
      // Pages protégées (nécessitent une authentification)
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "tasks", element: <Tasks /> },
      { path: "wallet", element: <Wallet /> },
      { path: "messages", element: <Messages /> },
      { path: "settings", element: <Settings /> },
      { path: "view-ad/:id", element: <ViewAd /> },
      { path: "analytics", element: <Analytics /> },
      { path: "kyc", element: <KYC /> },
      { path: "support", element: <Support /> },
      { path: "notifications", element: <Notifications /> },
      { path: "affiliates", element: <Affiliates /> },
      { path: "courses", element: <Courses /> },
      
      { path: "*", element: <NotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
