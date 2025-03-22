
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
      fill="none"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2v2" />
      <path d="M12 6a6 6 0 0 1 5 9 2 2 0 0 1-2 2H9a2 2 0 0 1-2-2 6 6 0 0 1 5-9Z" />
    </svg>
  );
};

export default LightbulbIcon;
