
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requiredRole,
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirection si auth requise mais pas connecté
      if (requireAuth && !user) {
        navigate(redirectTo);
        return;
      }

      // Redirection si pas d'auth requise mais connecté
      if (!requireAuth && user) {
        navigate('/dashboard');
        return;
      }

      // Vérification du rôle
      if (requiredRole && userProfile?.role !== requiredRole) {
        navigate('/unauthorized');
        return;
      }
    }
  }, [user, userProfile, loading, navigate, requireAuth, requiredRole, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Ne pas afficher le contenu si les conditions ne sont pas remplies
  if (requireAuth && !user) return null;
  if (!requireAuth && user) return null;
  if (requiredRole && userProfile?.role !== requiredRole) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
