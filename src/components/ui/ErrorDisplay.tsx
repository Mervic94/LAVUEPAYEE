import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  title = "Une erreur s'est produite",
  message = "Impossible de charger les données. Veuillez réessayer.",
  onRetry,
  className
}) => {
  return (
    <div className={className}>
      <Alert className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="space-y-4">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{message}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorDisplay;