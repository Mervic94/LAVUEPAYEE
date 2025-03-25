
import React from 'react';
import { Users, Building, CreditCard } from 'lucide-react';
import PointsIndicator from '@/components/PointsIndicator';
import ProfilePhotoUploader from '@/components/ProfilePhotoUploader';
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  userData: {
    name: string;
    email: string;
    points: number;
    affiliationStats: {
      totalAffiliates: number;
    };
  };
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  isAdvertiser: boolean;
  setCashoutDialogOpen: (open: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  userData, 
  profileImage, 
  setProfileImage, 
  isAdvertiser,
  setCashoutDialogOpen 
}) => {
  return (
    <div className="glass-card rounded-xl p-6 mb-10">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Avatar with Upload */}
        <ProfilePhotoUploader 
          initialPhoto={profileImage}
          userName={userData.name}
          onPhotoChange={setProfileImage}
        />
        
        {/* User Info */}
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-foreground/60 mb-4">{userData.email}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <PointsIndicator points={userData.points} size="lg" />
            <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
              <Users className="h-4 w-4" />
              <span>{userData.affiliationStats.totalAffiliates} affiliés</span>
            </div>
            {isAdvertiser && (
              <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
                <Building className="h-4 w-4" />
                <span>Annonceur</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <Button
            className="flex items-center gap-2"
            onClick={() => setCashoutDialogOpen(true)}
          >
            <CreditCard className="h-4 w-4" />
            Retirer mes LVP
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            Paramètres du compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
