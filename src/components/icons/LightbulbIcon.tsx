
import React from 'react';

interface LightbulbIconProps {
  className?: string;
}

const LightbulbIcon: React.FC<LightbulbIconProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      stroke="none"
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 21h6m-3-3v2M12 3a6 6 0 00-6 6c0 2.6 2 5 3 6h6c1-1 3-3.4 3-6a6 6 0 00-6-6zM9.5 14.5h5" />
    </svg>
  );
};

export default LightbulbIcon;
