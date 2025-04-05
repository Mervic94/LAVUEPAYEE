
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialLinksProps {
  size?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ size }) => {
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 18;
  
  return (
    <div className="flex items-center gap-3">
      <a 
        href="https://facebook.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={iconSize} />
      </a>
      <a 
        href="https://twitter.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Twitter"
      >
        <Twitter size={iconSize} />
      </a>
      <a 
        href="https://instagram.com/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={iconSize} />
      </a>
      <a 
        href="https://linkedin.com/company/lavuepayee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={iconSize} />
      </a>
    </div>
  );
};

export default SocialLinks;
