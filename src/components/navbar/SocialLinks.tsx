
import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, Phone, Send } from 'lucide-react';

interface SocialLinksProps {
  size?: 'sm' | 'md';
}

const SocialLinks: React.FC<SocialLinksProps> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 16 : 20;
  
  return (
    <div className={`flex items-center gap-${size === 'sm' ? '3' : '4'}`}>
      <a href="https://facebook.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
        <Facebook size={iconSize} />
      </a>
      <a href="https://instagram.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors">
        <Instagram size={iconSize} />
      </a>
      <a href="https://twitter.com/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
        <Twitter size={iconSize} />
      </a>
      {size === 'md' && (
        <>
          <a href="https://t.me/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle size={iconSize} />
          </a>
          <a href="tel:+2290190069561" className="text-gray-500 hover:text-green-600 transition-colors">
            <Phone size={iconSize} />
          </a>
          <a href="https://m.me/lavuepayee" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
            <Send size={iconSize} />
          </a>
        </>
      )}
    </div>
  );
};

export default SocialLinks;
