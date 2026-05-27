import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useRole, AppRole } from '@/hooks/useRole';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: AppRole[];
  requiredRole?: AppRole; // backwards compat
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
  allowedRoles,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { roles, loading: rolesLoading } = useRole();
  const navigate = useNavigate();

  const effectiveAllowed = allowedRoles ?? (requiredRole ? [requiredRole] : undefined);

  useEffect(() => {
    if (loading || rolesLoading) return;

    if (requireAuth && !user) {
      navigate(redirectTo);
      return;
    }
    if (!requireAuth && user) {
      navigate('/dashboard');
      return;
    }
    if (effectiveAllowed && user) {
      const ok = effectiveAllowed.some((r) => roles.includes(r));
      if (!ok) navigate('/unauthorized');
    }
  }, [user, loading, rolesLoading, roles, navigate, requireAuth, redirectTo, effectiveAllowed]);

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) return null;
  if (!requireAuth && user) return null;
  if (effectiveAllowed && user && !effectiveAllowed.some((r) => roles.includes(r))) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
