
export interface User {
  id: string;
  name: string;
  avatar: string | null;
  lastSeen: string;
  isAffiliate: boolean; // Make this required across all components
  level?: number;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    sender: string;
  };
  unread: number;
}
