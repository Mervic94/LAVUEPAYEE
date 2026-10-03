
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label="Accueil LAVUEPAYEE">
      <div className="h-9 w-9 shrink-0 lvp-icon-container sm:h-10 sm:w-10">
        <img 
          src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
          alt="LAVUEPAYEE" 
          className="h-full w-full object-contain"
        />
      </div>
      <span className="text-base font-bold text-primary sm:text-lg">LAVUEPAYEE</span>
    </Link>
  );
};

export default Logo;
