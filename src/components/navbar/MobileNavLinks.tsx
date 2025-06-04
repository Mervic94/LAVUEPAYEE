
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavLinksProps {
  user: any;
  onItemClick: () => void;
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ user, onItemClick }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex flex-col gap-1 w-full px-4">
      <Link
        to="/"
        className={`py-3 px-4 rounded-lg text-center transition-colors ${
          isActive('/') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
        }`}
        onClick={onItemClick}
      >
        Accueil
      </Link>
      
      {user ? (
        <>
          <Link
            to="/dashboard"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/dashboard') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Tableau de bord
          </Link>
          <Link
            to="/marketplace"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/marketplace') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Marketplace
          </Link>
          <Link
            to="/tasks"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/tasks') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Tâches
          </Link>
          <Link
            to="/wallet"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/wallet') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Portefeuille
          </Link>
          <Link
            to="/affiliates"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/affiliates') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Parrainage
          </Link>
          <Link
            to="/leaderboard"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/leaderboard') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Classement
          </Link>
          <Link
            to="/courses"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/courses') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Formation
          </Link>
          <Link
            to="/analytics"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/analytics') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Analytiques
          </Link>
          <Link
            to="/messages"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/messages') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Messages
          </Link>
          <Link
            to="/settings"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/settings') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Paramètres
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/register"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/register') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            S'inscrire
          </Link>
          <Link
            to="/marketplace"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/marketplace') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Marketplace
          </Link>
          <Link
            to="/leaderboard"
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              isActive('/leaderboard') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
            }`}
            onClick={onItemClick}
          >
            Classement
          </Link>
        </>
      )}
      
      <Link
        to="/faq"
        className={`py-3 px-4 rounded-lg text-center transition-colors ${
          isActive('/faq') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
        }`}
        onClick={onItemClick}
      >
        FAQ
      </Link>
      
      <Link
        to="/help"
        className={`py-3 px-4 rounded-lg text-center transition-colors ${
          isActive('/help') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
        }`}
        onClick={onItemClick}
      >
        Aide
      </Link>
    </nav>
  );
};

export default MobileNavLinks;
