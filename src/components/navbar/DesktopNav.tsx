
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DesktopNavProps {
  user: any;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ user }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden xl:flex min-w-0 flex-1 items-center justify-center gap-2 2xl:gap-4">
      <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary after:scale-x-100' : ''}`}>
        Accueil
      </Link>
      {user ? (
        <>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'text-primary after:scale-x-100' : ''}`}>
            Tableau de bord
          </Link>
          <Link to="/marketplace" className={`nav-link ${isActive('/marketplace') ? 'text-primary after:scale-x-100' : ''}`}>
            Marketplace
          </Link>
          <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'text-primary after:scale-x-100' : ''}`}>
            Tâches
          </Link>
          <Link to="/wallet" className={`nav-link ${isActive('/wallet') ? 'text-primary after:scale-x-100' : ''}`}>
            Portefeuille
          </Link>
          <Link to="/affiliates" className={`nav-link ${isActive('/affiliates') ? 'text-primary after:scale-x-100' : ''}`}>
            Parrainage
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'text-primary after:scale-x-100' : ''}`}>
            Classement
          </Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'text-primary after:scale-x-100' : ''}`}>
            Formation
          </Link>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics') ? 'text-primary after:scale-x-100' : ''}`}>
            Analytiques
          </Link>
          <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'text-primary after:scale-x-100' : ''}`}>
            Messages
          </Link>
        </>
      ) : (
        <>
          <a href="#how-it-works" className="nav-link">
            Fonctionnement
          </a>
          <Link to="/marketplace" className={`nav-link ${isActive('/marketplace') ? 'text-primary after:scale-x-100' : ''}`}>
            Marketplace
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'text-primary after:scale-x-100' : ''}`}>
            Classement
          </Link>
        </>
      )}
      <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'text-primary after:scale-x-100' : ''}`}>
        FAQ
      </Link>
    </div>
  );
};

export default DesktopNav;
