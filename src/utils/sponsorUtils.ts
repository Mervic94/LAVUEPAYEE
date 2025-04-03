
import { supabase } from "@/integrations/supabase/client";

export type SponsorInfo = {
  username: string;
  fullName: string;
} | null;

export async function checkSponsor(username: string): Promise<SponsorInfo> {
  if (!username || username.length < 3) {
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, first_name, last_name')
      .eq('username', username)
      .single();
    
    if (error || !data) {
      return null;
    } else {
      return {
        username: data.username,
        fullName: data.first_name && data.last_name 
          ? `${data.first_name} ${data.last_name}` 
          : data.username
      };
    }
  } catch (err) {
    console.error('Error checking sponsor:', err);
    return null;
  }
}

export function generateAffiliationCode(username: string): string {
  // Générer un code unique basé sur le nom d'utilisateur
  const timestamp = new Date().getTime().toString(36).slice(-4);
  const usernameSlice = username.slice(0, 4).toUpperCase();
  return `${usernameSlice}${timestamp}`;
}

export function generateAffiliationLink(username: string): string {
  return `${window.location.origin}/register?ref=${username}`;
}
