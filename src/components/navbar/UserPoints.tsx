
import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';

const UserPoints = () => {
  const { userProfile, user } = useAuth();

  if (!user) {
    return null;
  }

  const points = userProfile?.points || 0;

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
      <div className="h-4 w-4 lvp-icon-container">
        <img 
          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
          alt="LVP" 
          className="h-4 w-4" 
        />
      </div>
      <span>{points.toLocaleString()} LVP</span>
    </div>
  );
};

export default UserPoints;
