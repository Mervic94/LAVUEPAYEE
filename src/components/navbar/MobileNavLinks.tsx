
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
    <>
      <Link to="/" onClick={onItemClick} className="w-full">
        <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}>
          Accueil
        </div>
      </Link>
      
      {user ? (
        <>
          <Link to="/dashboard" onClick={onItemClick} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : ''}`}>
              Tableau de bord
            </div>
          </Link>
          
          <Link to="/marketplace" onClick={onItemClick} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/marketplace') ? 'bg-primary/10 text-primary' : ''}`}>
              Marketplace
            </div>
          </Link>
          
          <Link to="/tasks" onClick={onItemClick} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/tasks') ? 'bg-primary/10 text-primary' : ''}`}>
              Tâches
            </div>
          </Link>
          
          <Link to="/messages" onClick={onItemClick} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/messages') ? 'bg-primary/10 text-primary' : ''}`}>
              Messages
            </div>
          </Link>
          
          <Link to="/profile" onClick={onItemClick} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/profile') ? 'bg-primary/10 text-primary' : ''}`}>
              Profil
            </div>
          </Link>
        </>
      ) : (
        <a href="#how-it-works" onClick={onItemClick} className="w-full">
          <div className={`py-3 px-4 rounded-lg transition-colors`}>
            Comment ça marche
          </div>
        </a>
      )}
      
      <Link to="/faq" onClick={onItemClick} className="w-full">
        <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/faq') ? 'bg-primary/10 text-primary' : ''}`}>
          FAQ
        </div>
      </Link>
    </>
  );
};

export default MobileNavLinks;
