
import React from 'react';
import { Phone } from 'lucide-react';
import SocialLinks from './SocialLinks';
import UserControls from './UserControls';
import MobileNavLinks from './MobileNavLinks';
import UserPoints from './UserPoints';

interface MobileNavProps {
  isOpen: boolean;
  user: any;
  onItemClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, user, onItemClick }) => {
  return (
    <div 
      className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-20 backdrop-blur-md transition-all duration-300 ease-in-out xl:hidden sm:px-8 ${
        isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 py-4">
        {user && <UserPoints />}
        
        <MobileNavLinks user={user} onItemClick={onItemClick} />
        
        <div className="w-full border-t border-border px-4 py-3">
          <p className="text-muted-foreground text-sm mb-3 text-center">Suivez-nous</p>
          <div className="flex justify-center">
            <SocialLinks size="md" />
          </div>
        </div>
        
        <div className="w-full border-t border-border px-4 py-3">
          <p className="text-muted-foreground text-sm mb-3 text-center">Contact</p>
          <div className="flex items-center justify-center">
            <a href="tel:+2290190069561" className="flex items-center gap-2 text-foreground hover:text-primary">
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
