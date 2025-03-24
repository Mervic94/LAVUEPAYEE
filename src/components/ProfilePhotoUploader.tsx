
import React, { useState, useRef } from 'react';
import { Camera, Trash2, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';

interface ProfilePhotoUploaderProps {
  initialPhoto: string | null;
  userName: string;
  onPhotoChange: (photo: string | null) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({ 
  initialPhoto, 
  userName, 
  onPhotoChange 
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(initialPhoto);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "L'image ne doit pas dépasser 5 Mo",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newImage = e.target.result as string;
          setProfileImage(newImage);
          onPhotoChange(newImage);
          toast({
            title: "Photo de profil mise à jour",
            description: "Votre photo a été modifiée avec succès."
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDeletePhoto = () => {
    setProfileImage(null);
    onPhotoChange(null);
    setShowDeleteDialog(false);
    toast({
      title: "Photo supprimée",
      description: "Votre photo de profil a été supprimée."
    });
  };
  
  return (
    <>
      <div 
        className="relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div 
          className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden"
        >
          {profileImage ? (
            <img src={profileImage} alt={userName} className="h-full w-full object-cover" />
          ) : (
            userName.charAt(0)
          )}
          
          {showControls && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {profileImage ? <Pencil className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{profileImage ? "Modifier la photo" : "Ajouter une photo"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {profileImage && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Supprimer la photo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload}
        />
      </div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la photo de profil</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer votre photo de profil ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePhoto} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfilePhotoUploader;
