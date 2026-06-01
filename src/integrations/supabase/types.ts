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
      ad_views: {
        Row: {
          ad_id: string
          created_at: string | null
          device: string | null
          id: string
          ip_hash: string | null
          platform_id: string
          rewarded_vuc: number | null
          tab_active: boolean | null
          viewer_id: string
          watched_seconds: number
        }
        Insert: {
          ad_id: string
          created_at?: string | null
          device?: string | null
          id?: string
          ip_hash?: string | null
          platform_id?: string
          rewarded_vuc?: number | null
          tab_active?: boolean | null
          viewer_id: string
          watched_seconds?: number
        }
        Update: {
          ad_id?: string
          created_at?: string | null
          device?: string | null
          id?: string
          ip_hash?: string | null
          platform_id?: string
          rewarded_vuc?: number | null
          tab_active?: boolean | null
          viewer_id?: string
          watched_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: "ad_views_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_views_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "advertiser_stats"
            referencedColumns: ["ad_id"]
          },
          {
            foreignKeyName: "ad_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          approved: boolean | null
          campaign_id: string
          clicks_count: number | null
          content: string
          cooldown_seconds: number | null
          created_at: string | null
          daily_limit: number | null
          duration_sec: number | null
          id: string
          image_url: string | null
          link_url: string | null
          min_watch_percent: number | null
          platform: string | null
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
          approved?: boolean | null
          campaign_id: string
          clicks_count?: number | null
          content: string
          cooldown_seconds?: number | null
          created_at?: string | null
          daily_limit?: number | null
          duration_sec?: number | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          min_watch_percent?: number | null
          platform?: string | null
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
          approved?: boolean | null
          campaign_id?: string
          clicks_count?: number | null
          content?: string
          cooldown_seconds?: number | null
          created_at?: string | null
          daily_limit?: number | null
          duration_sec?: number | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          min_watch_percent?: number | null
          platform?: string | null
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
            referencedRelation: "advertiser_stats"
            referencedColumns: ["campaign_id"]
          },
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
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
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
          budget_vuc: number | null
          budget_xof: number | null
          created_at: string | null
          daily_view_limit: number | null
          description: string | null
          end_date: string | null
          id: string
          platform_id: string | null
          spent: number | null
          start_date: string | null
          status: string | null
          target_audience: Json | null
          target_criteria: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          advertiser_id: string
          budget: number
          budget_vuc?: number | null
          budget_xof?: number | null
          created_at?: string | null
          daily_view_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          platform_id?: string | null
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          target_criteria?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          advertiser_id?: string
          budget?: number
          budget_vuc?: number | null
          budget_xof?: number | null
          created_at?: string | null
          daily_view_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          platform_id?: string | null
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          target_criteria?: Json | null
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
      device_fingerprints: {
        Row: {
          created_at: string | null
          device_type: string | null
          fingerprint_hash: string
          flagged: boolean | null
          id: string
          ip_hash: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_type?: string | null
          fingerprint_hash: string
          flagged?: boolean | null
          id?: string
          ip_hash?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_type?: string | null
          fingerprint_hash?: string
          flagged?: boolean | null
          id?: string
          ip_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_fingerprints_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exchange_requests: {
        Row: {
          admin_note: string | null
          amount_fiat: number | null
          amount_points: number
          created_at: string
          fiat_currency: string | null
          id: string
          payment_details: Json | null
          processed_at: string | null
          processed_by: string | null
          product_id: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          amount_fiat?: number | null
          amount_points: number
          created_at?: string
          fiat_currency?: string | null
          id?: string
          payment_details?: Json | null
          processed_at?: string | null
          processed_by?: string | null
          product_id?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_note?: string | null
          amount_fiat?: number | null
          amount_points?: number
          created_at?: string
          fiat_currency?: string | null
          id?: string
          payment_details?: Json | null
          processed_at?: string | null
          processed_by?: string | null
          product_id?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exchange_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      fedapay_payments: {
        Row: {
          amount_vuc: number
          amount_xof: number
          callback_data: Json | null
          campaign_id: string | null
          created_at: string
          credited_at: string | null
          fedapay_id: string | null
          fedapay_ref: string | null
          fee_xof: number
          id: string
          net_xof: number
          operator: string | null
          payment_method: string | null
          phone_number: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_vuc: number
          amount_xof: number
          callback_data?: Json | null
          campaign_id?: string | null
          created_at?: string
          credited_at?: string | null
          fedapay_id?: string | null
          fedapay_ref?: string | null
          fee_xof?: number
          id?: string
          net_xof: number
          operator?: string | null
          payment_method?: string | null
          phone_number?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_vuc?: number
          amount_xof?: number
          callback_data?: Json | null
          campaign_id?: string | null
          created_at?: string
          credited_at?: string | null
          fedapay_id?: string | null
          fedapay_ref?: string | null
          fee_xof?: number
          id?: string
          net_xof?: number
          operator?: string | null
          payment_method?: string | null
          phone_number?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fedapay_payments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "advertiser_stats"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "fedapay_payments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fedapay_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      otp_verifications: {
        Row: {
          attempts: number
          channel: string
          created_at: string
          expires_at: string
          id: string
          phone: string
          status: string
          twilio_sid: string | null
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone: string
          status?: string
          twilio_sid?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone?: string
          status?: string
          twilio_sid?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "otp_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_verifications: {
        Row: {
          attempt_count: number
          channel: string
          created_at: string
          expires_at: string
          id: string
          phone_number: string
          status: string
          twilio_sid: string | null
          updated_at: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempt_count?: number
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone_number: string
          status?: string
          twilio_sid?: string | null
          updated_at?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempt_count?: number
          channel?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone_number?: string
          status?: string
          twilio_sid?: string | null
          updated_at?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_roles: {
        Row: {
          created_at: string | null
          id: string
          platform_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          platform_id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          platform_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          points_cost: number
          stock: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          points_cost: number
          stock?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          points_cost?: number
          stock?: number
          updated_at?: string
        }
        Relationships: []
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
      project_snapshots: {
        Row: {
          app_name: string
          category: string
          code: string | null
          component: string
          created_at: string
          description: string | null
          id: string
          metadata: Json
          status: string
          updated_at: string
          version: number
        }
        Insert: {
          app_name?: string
          category: string
          code?: string | null
          component: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          status?: string
          updated_at?: string
          version?: number
        }
        Update: {
          app_name?: string
          category?: string
          code?: string | null
          component?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          status?: string
          updated_at?: string
          version?: number
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
      reward_logs: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: string
          platform_id: string | null
          ref_id: string | null
          user_id: string
          vuc_earned: number
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          platform_id?: string | null
          ref_id?: string | null
          user_id: string
          vuc_earned?: number
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          platform_id?: string | null
          ref_id?: string | null
          user_id?: string
          vuc_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "reward_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_tasks: {
        Row: {
          advertiser_id: string
          approved: boolean
          completions_count: number
          created_at: string
          daily_limit: number
          description: string | null
          id: string
          metadata: Json
          network: string
          platform_id: string
          reward_vuc: number
          status: string
          target_url: string
          task_type: string
          title: string
          total_limit: number | null
          updated_at: string
        }
        Insert: {
          advertiser_id: string
          approved?: boolean
          completions_count?: number
          created_at?: string
          daily_limit?: number
          description?: string | null
          id?: string
          metadata?: Json
          network: string
          platform_id?: string
          reward_vuc?: number
          status?: string
          target_url: string
          task_type: string
          title: string
          total_limit?: number | null
          updated_at?: string
        }
        Update: {
          advertiser_id?: string
          approved?: boolean
          completions_count?: number
          created_at?: string
          daily_limit?: number
          description?: string | null
          id?: string
          metadata?: Json
          network?: string
          platform_id?: string
          reward_vuc?: number
          status?: string
          target_url?: string
          task_type?: string
          title?: string
          total_limit?: number | null
          updated_at?: string
        }
        Relationships: []
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
            foreignKeyName: "tasks_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "advertiser_stats"
            referencedColumns: ["ad_id"]
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
      token_rates: {
        Row: {
          created_at: string | null
          id: string
          source: string | null
          updated_at: string | null
          vuc_to_usdt: number | null
          vuc_to_xof: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          source?: string | null
          updated_at?: string | null
          vuc_to_usdt?: number | null
          vuc_to_xof?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          source?: string | null
          updated_at?: string | null
          vuc_to_usdt?: number | null
          vuc_to_xof?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          payment_details: Json | null
          payment_method: string | null
          platform_id: string
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
          platform_id?: string
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
          platform_id?: string
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          ip_address: unknown
          last_activity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown
          last_activity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown
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
          daily_vuc_earned: number | null
          daily_vuc_reset_at: string | null
          email: string
          email_verified: boolean | null
          first_name: string | null
          fraud_score: number | null
          id: string
          kyc_status: string | null
          last_name: string | null
          onboarded: boolean
          phone: string | null
          phone_verified: boolean | null
          phone_verified_at: string | null
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
          daily_vuc_earned?: number | null
          daily_vuc_reset_at?: string | null
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          fraud_score?: number | null
          id: string
          kyc_status?: string | null
          last_name?: string | null
          onboarded?: boolean
          phone?: string | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
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
          daily_vuc_earned?: number | null
          daily_vuc_reset_at?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          fraud_score?: number | null
          id?: string
          kyc_status?: string | null
          last_name?: string | null
          onboarded?: boolean
          phone?: string | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
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
      view_validations: {
        Row: {
          created_at: string | null
          flag_reason: string | null
          flagged: boolean | null
          id: string
          score: number | null
          validation_method: string
          view_id: string
        }
        Insert: {
          created_at?: string | null
          flag_reason?: string | null
          flagged?: boolean | null
          id?: string
          score?: number | null
          validation_method?: string
          view_id: string
        }
        Update: {
          created_at?: string | null
          flag_reason?: string | null
          flagged?: boolean | null
          id?: string
          score?: number | null
          validation_method?: string
          view_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "view_validations_view_id_fkey"
            columns: ["view_id"]
            isOneToOne: false
            referencedRelation: "ad_views"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          balance_vuc: number | null
          balance_xof: number | null
          created_at: string | null
          currency: string | null
          id: string
          locked_vuc: number | null
          pending_balance: number | null
          total_earned: number | null
          total_withdrawn: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          balance_vuc?: number | null
          balance_xof?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          locked_vuc?: number | null
          pending_balance?: number | null
          total_earned?: number | null
          total_withdrawn?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          balance_vuc?: number | null
          balance_xof?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          locked_vuc?: number | null
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
          amount_vuc: number | null
          amount_xof: number | null
          created_at: string | null
          fee: number | null
          id: string
          method: string
          mobile_number: string | null
          mobile_operator: string | null
          net_amount: number
          notes: string | null
          payment_details: Json
          payment_provider: string | null
          processed_at: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          amount_vuc?: number | null
          amount_xof?: number | null
          created_at?: string | null
          fee?: number | null
          id?: string
          method: string
          mobile_number?: string | null
          mobile_operator?: string | null
          net_amount: number
          notes?: string | null
          payment_details: Json
          payment_provider?: string | null
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          amount_vuc?: number | null
          amount_xof?: number | null
          created_at?: string | null
          fee?: number | null
          id?: string
          method?: string
          mobile_number?: string | null
          mobile_operator?: string | null
          net_amount?: number
          notes?: string | null
          payment_details?: Json
          payment_provider?: string | null
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
      admin_kpis: {
        Row: {
          active_campaigns: number | null
          active_users: number | null
          current_rate: number | null
          new_users_24h: number | null
          pending_ads: number | null
          pending_withdrawals: number | null
          total_ads: number | null
          total_campaigns: number | null
          total_users: number | null
          total_vuc_distributed: number | null
          total_vuc_withdrawn: number | null
          views_24h: number | null
        }
        Relationships: []
      }
      admin_platform_stats: {
        Row: {
          active_campaigns: number | null
          active_users: number | null
          new_users_7d: number | null
          pending_ads: number | null
          pending_withdrawals: number | null
          total_campaigns: number | null
          total_users: number | null
          total_vuc_distributed: number | null
          total_vuc_in_circulation: number | null
          total_vuc_withdrawn: number | null
        }
        Relationships: []
      }
      advertiser_stats: {
        Row: {
          ad_created_at: string | null
          ad_id: string | null
          ad_status: string | null
          ad_title: string | null
          advertiser_id: string | null
          approved: boolean | null
          budget_vuc: number | null
          campaign_id: string | null
          campaign_status: string | null
          campaign_title: string | null
          clicks_count: number | null
          reward_points: number | null
          spent: number | null
          views_count: number | null
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
      my_referral_summary: {
        Row: {
          active_referrals: number | null
          last_referral_at: string | null
          referrer_id: string | null
          total_referrals: number | null
          total_vuc_from_referrals: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          username?: string | null
        }
        Relationships: []
      }
      suspicious_transactions: {
        Row: {
          amount: number | null
          avg_amount: number | null
          created_at: string | null
          description: string | null
          id: string | null
          payment_details: Json | null
          payment_method: string | null
          platform_id: string | null
          points: number | null
          processed_at: string | null
          ratio_to_avg: number | null
          reference_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
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
      wallet_summary: {
        Row: {
          balance_vuc: number | null
          balance_xof: number | null
          email: string | null
          locked_vuc: number | null
          role: string | null
          total_earned: number | null
          total_withdrawn: number | null
          updated_at: string | null
          user_id: string | null
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
    }
    Functions: {
      admin_approve_ad: { Args: { p_ad_id: string }; Returns: undefined }
      admin_process_withdrawal: {
        Args: {
          p_notes?: string
          p_status: string
          p_transaction_id?: string
          p_withdrawal_id: string
        }
        Returns: undefined
      }
      admin_reject_ad: {
        Args: { p_ad_id: string; p_reason?: string }
        Returns: undefined
      }
      admin_set_fraud_score: {
        Args: { p_score: number; p_user_id: string }
        Returns: undefined
      }
      admin_set_token_rate: {
        Args: { p_vuc_to_xof: number }
        Returns: undefined
      }
      check_email_exists: { Args: { check_email: string }; Returns: boolean }
      check_phone_exists: { Args: { check_phone: string }; Returns: boolean }
      check_username_exists: {
        Args: { check_username: string }
        Returns: boolean
      }
      cleanup_expired_sessions: {
        Args: { expiry_days?: number }
        Returns: number
      }
      cleanup_old_sessions: { Args: never; Returns: undefined }
      count_recent_registrations_by_ip: {
        Args: { _hours?: number; _ip_hash: string }
        Returns: number
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
      create_user_session: {
        Args: {
          session_device_info?: Json
          session_ip_address?: unknown
          target_user_id: string
        }
        Returns: string
      }
      generate_referral_code: { Args: never; Returns: string }
      get_credentials_by_username: {
        Args: { lookup_username: string }
        Returns: {
          email: string
          phone: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_wallet_vuc: {
        Args: { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      is_admin_user: { Args: never; Returns: boolean }
      update_session_activity: {
        Args: { session_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "consumer" | "advertiser"
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
    Enums: {
      app_role: ["admin", "consumer", "advertiser"],
    },
  },
} as const
