
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import VerifyEmail from '@/pages/VerifyEmail';
import Dashboard from '@/pages/Dashboard';
import Tasks from '@/pages/Tasks';
import Wallet from '@/pages/Wallet';
import Profile from '@/pages/Profile';
import Marketplace from '@/pages/Marketplace';
import Affiliates from '@/pages/Affiliates';
import Leaderboard from '@/pages/Leaderboard';
import Courses from '@/pages/Courses';
import FAQ from '@/pages/FAQ';
import Settings from '@/pages/Settings';
import Analytics from '@/pages/Analytics';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
import TestAuth from '@/pages/TestAuth';
import ResetPassword from '@/pages/ResetPassword';
import Help from '@/pages/Help';
import Support from '@/pages/Support';
import Notifications from '@/pages/Notifications';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import KYC from '@/pages/KYC';
import Messages from '@/pages/Messages';
import ViewAd from '@/pages/ViewAd';
import VerifyPhone from '@/pages/VerifyPhone';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={
                  <ProtectedRoute requireAuth={false}>
                    <Index />
                  </ProtectedRoute>
                } />
                
                <Route path="/login" element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } />
                
                <Route path="/register" element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                } />

                <Route path="/reset-password" element={
                  <ProtectedRoute requireAuth={false}>
                    <ResetPassword />
                  </ProtectedRoute>
                } />

                <Route path="/verify-email" element={
                  <ProtectedRoute requireAuth={false}>
                    <VerifyEmail />
                  </ProtectedRoute>
                } />

                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help" element={<Help />} />
                <Route path="/support" element={<Support />} />
                <Route path="/test-auth" element={<TestAuth />} />

                {/* Route notifications */}
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } />

                {/* Routes protégées */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/tasks" element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                } />
                
                <Route path="/wallet" element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                <Route path="/affiliates" element={
                  <ProtectedRoute>
                    <Affiliates />
                  </ProtectedRoute>
                } />

                <Route path="/courses" element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                } />

                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />

                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />

                {/* Routes admin */}
                <Route path="/admin/*" element={
                  <ProtectedRoute requiredRole="admin">
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Page d'erreur non autorisé */}
                 <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Route 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
