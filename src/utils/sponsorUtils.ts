
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
      .select('username')
      .eq('username', username)
      .single();
    
    if (error || !data) {
      return null;
    } else {
      return {
        username: data.username,
        fullName: data.username // Since first_name and last_name don't exist, we'll just use username
      };
    }
  } catch (err) {
    console.error('Error checking sponsor:', err);
    return null;
  }
}
