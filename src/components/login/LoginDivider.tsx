
import React from 'react';

const LoginDivider: React.FC = () => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-card px-2 text-muted-foreground">ou continuer avec</span>
      </div>
    </div>
  );
};

export default LoginDivider;
