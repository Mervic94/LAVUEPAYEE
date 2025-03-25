
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import UserControls from './UserControls';

interface MobileNavProps {
  isOpen: boolean;
  user: any;
  onLogout: () => void;
  onItemClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, user, onLogout, onItemClick }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className={`fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col z-40 pt-20 px-6 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } md:hidden overflow-y-auto`}
    >
      <div className="flex flex-col gap-6 items-center">
        {user && (
          <div className="flex items-center gap-3">
            <PointsIndicator points={1250} />
            <div className="flex items-center px-3 py-1.5 gap-1.5 rounded-full bg-green-100 text-green-800 font-medium">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="Vuecoin" 
                className="h-4 w-4 object-contain bg-transparent"
              />
              <span>1 Vc</span>
            </div>
          </div>
        )}
        
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
        
        <SocialLinks size="md" />
        
        <UserControls user={user} onLogout={onLogout} isMobile={true} />
      </div>
    </div>
  );
};

export default MobileNav;
