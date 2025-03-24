
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Facebook, Instagram, Twitter, MessageCircle, Send, Pencil } from "lucide-react";

interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface SocialMediaManagerProps {
  onSave: (links: SocialMediaLink[]) => void;
  initialLinks?: SocialMediaLink[];
}

const SOCIAL_PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-4 w-4" />, color: 'bg-blue-500' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="h-4 w-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter className="h-4 w-4" />, color: 'bg-sky-500' },
  { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle className="h-4 w-4" />, color: 'bg-green-500' },
  { id: 'tiktok', name: 'TikTok', icon: <span className="text-xs font-bold">TT</span>, color: 'bg-black' },
  { id: 'threads', name: 'Threads', icon: <span className="text-xs font-bold">@</span>, color: 'bg-black' },
  { id: 'messenger', name: 'Messenger', icon: <Send className="h-4 w-4" />, color: 'bg-blue-600' },
];

const SocialMediaManager: React.FC<SocialMediaManagerProps> = ({ onSave, initialLinks = [] }) => {
  const [links, setLinks] = useState<SocialMediaLink[]>(initialLinks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddLink = () => {
    if (!newPlatform || !newUrl) return;
    
    const platform = SOCIAL_PLATFORMS.find(p => p.id === newPlatform);
    if (!platform) return;
    
    const newLink = {
      id: Date.now().toString(),
      platform: platform.name,
      url: newUrl,
      icon: platform.icon,
      color: platform.color
    };
    
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    onSave(updatedLinks);
    
    // Reset form
    setNewPlatform('');
    setNewUrl('');
    setShowAddForm(false);
  };
  
  const handleEditLink = (id: string) => {
    const link = links.find(l => l.id === id);
    if (!link) return;
    
    setEditingId(id);
    setNewPlatform(SOCIAL_PLATFORMS.find(p => p.name === link.platform)?.id || '');
    setNewUrl(link.url);
    setShowAddForm(true);
  };
  
  const handleUpdateLink = () => {
    if (!editingId || !newPlatform || !newUrl) return;
    
    const platform = SOCIAL_PLATFORMS.find(p => p.id === newPlatform);
    if (!platform) return;
    
    const updatedLinks = links.map(link => 
      link.id === editingId 
        ? { 
            ...link, 
            platform: platform.name, 
            url: newUrl,
            icon: platform.icon,
            color: platform.color
          } 
        : link
    );
    
    setLinks(updatedLinks);
    onSave(updatedLinks);
    
    // Reset form
    setEditingId(null);
    setNewPlatform('');
    setNewUrl('');
    setShowAddForm(false);
  };
  
  const handleRemoveLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    onSave(updatedLinks);
  };
  
  const usedPlatformIds = links.map(link => 
    SOCIAL_PLATFORMS.find(p => p.name === link.platform)?.id || ''
  );
  
  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    platform => !usedPlatformIds.includes(platform.id) || (editingId && newPlatform === platform.id)
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <div key={link.id} className="flex items-center gap-2 group">
            <div className={`h-8 w-8 ${link.color} text-white rounded flex items-center justify-center`}>
              {link.icon}
            </div>
            <Input 
              value={link.url} 
              readOnly 
              className="flex-grow group-hover:pr-20"
            />
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => handleEditLink(link.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-destructive"
                onClick={() => handleRemoveLink(link.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {showAddForm ? (
        <div className="space-y-3 bg-secondary/20 p-3 rounded-md">
          <div className="flex items-center gap-2">
            <select 
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/3"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
            >
              <option value="">Choisir...</option>
              {availablePlatforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="URL du réseau social"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setNewPlatform('');
                setNewUrl('');
              }}
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              size="sm"
              onClick={editingId ? handleUpdateLink : handleAddLink}
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full flex items-center gap-2 border-dashed"
          onClick={() => setShowAddForm(true)}
          disabled={availablePlatforms.length === 0}
        >
          <PlusCircle className="h-4 w-4" />
          Ajouter un réseau social
        </Button>
      )}
    </div>
  );
};

export default SocialMediaManager;
