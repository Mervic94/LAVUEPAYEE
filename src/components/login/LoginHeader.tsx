
import React from 'react';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <p className="text-muted-foreground mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default LoginHeader;
