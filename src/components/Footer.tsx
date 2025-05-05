
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Copyright } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8">
                <img 
                  src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
                  alt="LAVUEPAYEE"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">LAVUEPAYEE</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Transformez votre temps de visionnage en opportunité de revenus. Une expérience publicitaire révolutionnaire.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="text-gray-600 hover:text-primary transition-colors">
                  Tâches
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-600 hover:text-primary transition-colors">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">
                  Profil
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-primary transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary transition-colors">
                  Politique de cookies
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Restez connecté</h3>
            <p className="text-gray-600 mb-4">
              Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.
            </p>
            <div className="flex gap-2 mb-6">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1"
              />
              <Button variant="default" size="sm">
                S'inscrire
              </Button>
            </div>
            
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <a href="mailto:contact@lavuepayee.com" className="text-gray-600 hover:text-primary transition-colors">
                  contact@lavuepayee.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <a href="tel:+22901900695" className="text-gray-600 hover:text-primary transition-colors">
                  +229 01 900 695 61
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span className="text-gray-600">
                  LAVUEPAYEE SAS<br />
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0 flex items-center">
            <Copyright className="h-4 w-4 mr-1" /> {new Date().getFullYear()} LAVUEPAYEE. Tous droits réservés.
          </p>
          
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="LVP" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-medium">1 LVP = 0.01€</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
