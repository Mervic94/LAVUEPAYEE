
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PointsIndicator from '@/components/PointsIndicator';

interface UserControlsProps {
  user: any;
  onLogout: () => void;
  isMobile?: boolean;
}

const UserControls: React.FC<UserControlsProps> = ({ user, onLogout, isMobile = false }) => {
  if (!user) {
    return (
      <Button 
        asChild 
        variant="default" 
        size={isMobile ? "default" : "sm"} 
        className={`${isMobile ? 'w-full mt-4' : 'rounded-full bg-green-600 hover:bg-green-700'}`}
      >
        <Link to="/login">Se connecter</Link>
      </Button>
    );
  }

  if (isMobile) {
    return (
      <Button className="w-full mt-4" variant="outline" onClick={onLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Déconnexion
      </Button>
    );
  }

  return (
    <>
      <PointsIndicator points={1250} />
      <div className="flex items-center px-3 py-1.5 gap-1.5 rounded-full bg-green-100 text-green-800 font-medium">
        <img 
          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
          alt="Vuecoin" 
          className="h-4 w-4 object-contain bg-transparent"
        />
        <span>1 Vc</span>
      </div>
      <Button asChild variant="ghost" size="icon" className="rounded-full">
        <Link to="/messages">
          <MessageCircle className="h-5 w-5" />
        </Link>
      </Button>
      <Button asChild variant="ghost" size="icon" className="rounded-full">
        <Link to="/profile">
          <User className="h-5 w-5" />
        </Link>
      </Button>
      <Button variant="outline" size="sm" className="rounded-full" onClick={onLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Déconnexion
      </Button>
    </>
  );
};

export default UserControls;
