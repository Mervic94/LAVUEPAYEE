
import React from 'react';
import { Phone } from 'lucide-react';
import SocialLinks from './SocialLinks';
import UserControls from './UserControls';
import MobileNavLinks from './MobileNavLinks';
import UserPoints from './UserPoints';

interface MobileNavProps {
  isOpen: boolean;
  user: any;
  onLogout: () => void;
  onItemClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, user, onLogout, onItemClick }) => {
  return (
    <div 
      className={`fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col z-40 pt-20 px-6 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } md:hidden overflow-y-auto`}
    >
      <div className="flex flex-col gap-6 items-center">
        {user && <UserPoints />}
        
        <MobileNavLinks user={user} onItemClick={onItemClick} />
        
        <div className="w-full px-4 py-3 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-3 text-center">Suivez-nous</p>
          <div className="flex justify-center">
            <SocialLinks size="md" />
          </div>
        </div>
        
        <div className="w-full px-4 py-3 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-3 text-center">Contact</p>
          <div className="flex items-center justify-center">
            <a href="tel:+2290190069561" className="flex items-center gap-2 text-gray-700 hover:text-primary">
              <Phone size={16} />
              <span>+229 01 900 695 61</span>
            </a>
          </div>
        </div>
        
        <UserControls />
      </div>
    </div>
  );
};

export default MobileNav;
