
import React from 'react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary">Se connecter</h1>
      <p className="text-muted-foreground mt-2">
        Bienvenue! Connectez-vous à votre compte.
      </p>
    </div>
  );
};

export default LoginHeader;
