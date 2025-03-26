
import React from 'react';
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
        
        <SocialLinks size="md" />
        
        <UserControls user={user} onLogout={onLogout} isMobile={true} />
      </div>
    </div>
  );
};

export default MobileNav;
