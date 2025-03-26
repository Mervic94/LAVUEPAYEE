
import React from 'react';
import PointsIndicator from '@/components/PointsIndicator';

interface UserPointsProps {
  showVuecoin?: boolean;
}

const UserPoints: React.FC<UserPointsProps> = ({ showVuecoin = true }) => {
  return (
    <div className="flex items-center gap-3">
      <PointsIndicator points={1250} />
      
      {showVuecoin && (
        <div className="flex items-center px-3 py-1.5 gap-1.5 rounded-full bg-green-100 text-green-800 font-medium">
          <img 
            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
            alt="Vuecoin" 
            className="h-4 w-4 object-contain bg-transparent"
          />
          <span>1 Vc</span>
        </div>
      )}
    </div>
  );
};

export default UserPoints;
