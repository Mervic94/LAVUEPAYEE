
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title,
  description = "Cette page est en cours de construction. Revenez plus tard !",
  linkTo = "/dashboard",
  linkText = "Retour au tableau de bord"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <Construction className="h-24 w-24 text-primary mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">{description}</p>
      <Button asChild>
        <Link to={linkTo}>{linkText}</Link>
      </Button>
    </div>
  );
};

export default PlaceholderPage;
