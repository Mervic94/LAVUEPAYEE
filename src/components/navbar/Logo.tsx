
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-10 w-10 lvp-icon-container">
        <img 
          src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
          alt="LAVUEPAYEE" 
          className="h-10 w-10 object-contain"
        />
      </div>
      <span className="font-bold text-lg text-primary">LAVUEPAYEE</span>
    </Link>
  );
};

export default Logo;
