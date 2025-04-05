
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <a 
        href="https://facebook.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={18} />
      </a>
      <a 
        href="https://twitter.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Twitter"
      >
        <Twitter size={18} />
      </a>
      <a 
        href="https://instagram.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>
      <a 
        href="https://linkedin.com/company/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
    </div>
  );
};

export default SocialLinks;
