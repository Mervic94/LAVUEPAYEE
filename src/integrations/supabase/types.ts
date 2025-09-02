export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          campaign_id: string
          clicks_count: number | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          link_url: string | null
          reward_amount: number | null
          reward_points: number
          shares_count: number | null
          status: string | null
          title: string
          type: string
          updated_at: string | null
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          campaign_id: string
          clicks_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          reward_amount?: number | null
          reward_points?: number
          shares_count?: number | null
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          campaign_id?: string
          clicks_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          reward_amount?: number | null
          reward_points?: number
          shares_count?: number | null
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string | null
          balance: number
          bank_name: string
          bic: string
          created_at: string | null
          currency: string
          iban: string
          id: string
          is_default: boolean
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_name: string
          account_number?: string | null
          balance?: number
          bank_name: string
          bic: string
          created_at?: string | null
          currency?: string
          iban: string
          id?: string
          is_default?: boolean
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string | null
          balance?: number
          bank_name?: string
          bic?: string
          created_at?: string | null
          currency?: string
          iban?: string
          id?: string
          is_default?: boolean
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      bank_transfers: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          description: string | null
          error_message: string | null
          id: string
          recipient_bic: string
          recipient_iban: string
          recipient_name: string
          source_account_id: string
          status: string
          transaction_reference: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          error_message?: string | null
          id?: string
          recipient_bic: string
          recipient_iban: string
          recipient_name: string
          source_account_id: string
          status?: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          error_message?: string | null
          id?: string
          recipient_bic?: string
          recipient_iban?: string
          recipient_name?: string
          source_account_id?: string
          status?: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transfers_source_account_id_fkey"
            columns: ["source_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          advertiser_id: string
          budget: number
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          spent: number | null
          start_date: string | null
          status: string | null
          target_audience: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          advertiser_id: string
          budget: number
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          advertiser_id?: string
          budget?: number
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lavuepayee: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string | null
          id: string
          read_at: string | null
          recipient_id: string
          sender_id: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          level: number | null
          referred_id: string
          referrer_id: string
          reward_amount: number | null
          reward_points: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          level?: number | null
          referred_id: string
          referrer_id: string
          reward_amount?: number | null
          reward_points?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: number | null
          referred_id?: string
          referrer_id?: string
          reward_amount?: number | null
          reward_points?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          ad_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          proof_url: string | null
          reward_amount: number | null
          reward_points: number
          status: string | null
          type: string
          updated_at: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          ad_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          proof_url?: string | null
          reward_amount?: number | null
          reward_points: number
          status?: string | null
          type: string
          updated_at?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          ad_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          proof_url?: string | null
          reward_amount?: number | null
          reward_points?: number
          status?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          payment_details: Json | null
          payment_method: string | null
          points: number | null
          processed_at: string | null
          reference_id: string | null
          status: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          points?: number | null
          processed_at?: string | null
          reference_id?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          points?: number | null
          processed_at?: string | null
          reference_id?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          ip_address: unknown | null
          last_activity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notifications_email: boolean | null
          notifications_push: boolean | null
          notifications_sms: boolean | null
          privacy_activity: boolean | null
          privacy_profile: string | null
          theme: string | null
          timezone: string | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          notifications_email?: boolean | null
          notifications_push?: boolean | null
          notifications_sms?: boolean | null
          privacy_activity?: boolean | null
          privacy_profile?: string | null
          theme?: string | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notifications_email?: boolean | null
          notifications_push?: boolean | null
          notifications_sms?: boolean | null
          privacy_activity?: boolean | null
          privacy_profile?: string | null
          theme?: string | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          phone_verified: boolean | null
          points: number | null
          referral_code: string | null
          referred_by: string | null
          role: string | null
          status: string | null
          total_earned: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          points?: number | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          status?: string | null
          total_earned?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          points?: number | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          status?: string | null
          total_earned?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          pending_balance: number | null
          total_earned: number | null
          total_withdrawn: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          pending_balance?: number | null
          total_earned?: number | null
          total_withdrawn?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          pending_balance?: number | null
          total_earned?: number | null
          total_withdrawn?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string | null
          fee: number | null
          id: string
          method: string
          net_amount: number
          notes: string | null
          payment_details: Json
          processed_at: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          fee?: number | null
          id?: string
          method: string
          net_amount: number
          notes?: string | null
          payment_details: Json
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          fee?: number | null
          id?: string
          method?: string
          net_amount?: number
          notes?: string | null
          payment_details?: Json
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_system_notification: {
        Args: {
          notification_message: string
          notification_title: string
          notification_type?: string
          target_user_id: string
        }
        Returns: string
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
