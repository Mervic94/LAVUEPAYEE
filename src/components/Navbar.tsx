
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, ShoppingBag, Eye, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PointsIndicator from './PointsIndicator';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
              alt="LAVUEPAYEE" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="font-bold text-lg text-green-800">LAVUEPAYEE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary after:scale-x-100' : ''}`}>
            Accueil
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'text-primary after:scale-x-100' : ''}`}>
            Tableau de bord
          </Link>
          <Link to="/marketplace" className={`nav-link ${isActive('/marketplace') ? 'text-primary after:scale-x-100' : ''}`}>
            Marketplace
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'text-primary after:scale-x-100' : ''}`}>
            Profil
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <PointsIndicator points={1250} />
          <div className="flex items-center px-3 py-1.5 gap-1.5 rounded-full bg-green-100 text-green-800 font-medium">
            <img 
              src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
              alt="Vuecoin" 
              className="h-4 w-4"
            />
            <span>1 Vc</span>
          </div>
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link to="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="rounded-full bg-green-600 hover:bg-green-700">
            <Link to="/login">Se connecter</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col z-40 pt-20 px-6 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-3">
            <PointsIndicator points={1250} />
            <div className="flex items-center px-3 py-1.5 gap-1.5 rounded-full bg-green-100 text-green-800 font-medium">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="Vuecoin" 
                className="h-4 w-4"
              />
              <span>1 Vc</span>
            </div>
          </div>
          
          <Link to="/" onClick={closeMenu} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}>
              Accueil
            </div>
          </Link>
          
          <Link to="/dashboard" onClick={closeMenu} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : ''}`}>
              Tableau de bord
            </div>
          </Link>
          
          <Link to="/marketplace" onClick={closeMenu} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/marketplace') ? 'bg-primary/10 text-primary' : ''}`}>
              Marketplace
            </div>
          </Link>
          
          <Link to="/profile" onClick={closeMenu} className="w-full">
            <div className={`py-3 px-4 rounded-lg transition-colors ${isActive('/profile') ? 'bg-primary/10 text-primary' : ''}`}>
              Profil
            </div>
          </Link>
          
          <Button asChild className="w-full mt-4" variant="default">
            <Link to="/login" onClick={closeMenu}>
              Se connecter
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
