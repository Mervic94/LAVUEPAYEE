import React from 'react';

interface PointsIndicatorProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
}

const PointsIndicator: React.FC<PointsIndicatorProps> = ({ points, size = 'md' }) => {
  // Format points with thousands separator
  const formattedPoints = new Intl.NumberFormat('fr-FR').format(points);
  
  // Calculate Vuecoin equivalent
  const vuecoins = Math.floor(points / 700);
  const formattedVuecoins = new Intl.NumberFormat('fr-FR').format(vuecoins);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2'
  };
  
  // Icon sizes
  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  return (
    <div 
      className={`flex items-center ${sizeClasses[size]} rounded-full 
                  bg-transparent text-green-900 font-medium 
                  transition-all duration-300 hover:scale-105`}
      title={`${formattedPoints} LVP = ${formattedVuecoins} Vc`}
    >
      <div className={`${iconSizes[size]} rounded-full flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
          alt="LVP" 
          className="w-full h-full object-contain"
        />
      </div>
      <span>{formattedPoints} LVP</span>
    </div>
  );
};

export default PointsIndicator;
