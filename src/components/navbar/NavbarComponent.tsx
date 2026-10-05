
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';

// Import components
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import UserControls from './UserControls';
import SocialLinks from './SocialLinks';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

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

  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
    <nav 
      className={`fixed left-0 right-0 top-0 z-50 px-3 py-2 transition-all duration-300 sm:px-5 xl:px-6 ${
        scrolled || isOpen ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50' : 'bg-background/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex min-h-12 max-w-[1536px] items-center justify-between gap-3">
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav user={user} />

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <div className="hidden 2xl:block">
            <SocialLinks size="sm" />
          </div>
          <UserControls />
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative z-50 shrink-0 xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </nav>

      {/* Mobile Menu (outside nav so it covers the full screen) */}
      <MobileNav 
        isOpen={isOpen} 
        user={user} 
        onItemClick={closeMenu} 
      />
    </>
  );
};

export default Navbar;
