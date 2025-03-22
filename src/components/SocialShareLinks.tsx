
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Share, Facebook, Instagram, Twitter, MessageCircle, Copy, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SocialShareLinksProps {
  username: string;
  affiliationLink: string;
}

const SocialShareLinks: React.FC<SocialShareLinksProps> = ({ username, affiliationLink }) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Format the affiliation link with the correct domain
  const formattedLink = affiliationLink.includes('ref/') 
    ? `lavuepayee.com/${affiliationLink.split('ref/')[1]}`
    : `lavuepayee.com/ref/${username.toUpperCase()}`;
  
  const shareMessage = `Bienvenue sur LAVUEPAYEE. Vous êtes invité(e) par ${username} à vous inscrire. Votre bonus d'inscription est de 1 Vc, valable pendant 24 heures: ${formattedLink}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedToClipboard(true);
    toast({
      title: "Lien copié !",
      description: "Le message a été copié dans le presse-papier."
    });
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://${formattedLink}`)}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };
  
  const shareViaTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };
  
  const shareViaWhatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          Partager
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Partager votre lien d'affiliation</h3>
          <p className="text-sm text-foreground/70">
            Partagez votre lien d'affiliation sur les réseaux sociaux et gagnez des commissions !
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600"
              onClick={shareViaFacebook}
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 bg-sky-500 text-white hover:bg-sky-600"
              onClick={shareViaTwitter}
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 bg-green-500 text-white hover:bg-green-600"
              onClick={shareViaWhatsapp}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-2">Message de partage</h4>
            <div className="p-2 bg-secondary/20 rounded-md text-xs">
              {shareMessage}
            </div>
            <Button 
              className="w-full mt-2 flex items-center justify-center gap-2" 
              size="sm" 
              onClick={copyToClipboard}
            >
              {copiedToClipboard ? (
                <>
                  <Check className="h-4 w-4" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copier le message
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialShareLinks;
