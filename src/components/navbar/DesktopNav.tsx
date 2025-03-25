
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DesktopNavProps {
  user: any;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ user }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center gap-6">
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
          <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'text-primary after:scale-x-100' : ''}`}>
            Messages
          </Link>
        </>
      ) : (
        <>
          <a href="#how-it-works" className={`nav-link`}>
            Comment ça marche
          </a>
          <Link to="/marketplace" className={`nav-link ${isActive('/marketplace') ? 'text-primary after:scale-x-100' : ''}`}>
            Marketplace
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
