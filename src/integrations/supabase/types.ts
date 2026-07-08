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
      completion_reviews: {
        Row: {
          comment: string | null
          completion_id: string
          decision: string | null
          id: string
          reviewed_at: string
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          completion_id: string
          decision?: string | null
          id?: string
          reviewed_at?: string
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          completion_id?: string
          decision?: string | null
          id?: string
          reviewed_at?: string
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "completion_reviews_completion_id_fkey"
            columns: ["completion_id"]
            isOneToOne: false
            referencedRelation: "task_completions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "completion_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_orders: {
        Row: {
          client_id: string
          created_at: string
          delivery_address: string | null
          delivery_fee_xof: number
          delivery_lat: number | null
          delivery_lng: number | null
          driver_id: string | null
          estimated_min: number | null
          id: string
          items: Json
          note: string | null
          partner_id: string
          payment_method: string
          platform_id: string
          status: string
          subtotal_xof: number
          total_vuc: number
          total_xof: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          delivery_address?: string | null
          delivery_fee_xof?: number
          delivery_lat?: number | null
          delivery_lng?: number | null
          driver_id?: string | null
          estimated_min?: number | null
          id?: string
          items?: Json
          note?: string | null
          partner_id: string
          payment_method?: string
          platform_id?: string
          status?: string
          subtotal_xof?: number
          total_vuc?: number
          total_xof?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          delivery_address?: string | null
          delivery_fee_xof?: number
          delivery_lat?: number | null
          delivery_lng?: number | null
          driver_id?: string | null
          estimated_min?: number | null
          id?: string
          items?: Json
          note?: string | null
          partner_id?: string
          payment_method?: string
          platform_id?: string
          status?: string
          subtotal_xof?: number
          total_vuc?: number
          total_xof?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_orders_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_orders_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "zempro_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_tracking: {
        Row: {
          driver_id: string
          heading: number | null
          id: string
          lat: number
          lng: number
          ride_id: string
          speed_kmh: number | null
          status: string
          updated_at: string
        }
        Insert: {
          driver_id: string
          heading?: number | null
          id?: string
          lat: number
          lng: number
          ride_id: string
          speed_kmh?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          driver_id?: string
          heading?: number | null
          id?: string
          lat?: number
          lng?: number
          ride_id?: string
          speed_kmh?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_tracking_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
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
      driver_milestones: {
        Row: {
          achieved_at: string
          bonus_vuc: number
          credited: boolean
          credited_at: string | null
          driver_id: string
          id: string
          milestone: number
        }
        Insert: {
          achieved_at?: string
          bonus_vuc: number
          credited?: boolean
          credited_at?: string | null
          driver_id: string
          id?: string
          milestone: number
        }
        Update: {
          achieved_at?: string
          bonus_vuc?: number
          credited?: boolean
          credited_at?: string | null
          driver_id?: string
          id?: string
          milestone?: number
        }
        Relationships: [
          {
            foreignKeyName: "driver_milestones_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_zones: {
        Row: {
          active: boolean
          center_lat: number | null
          center_lng: number | null
          city: string
          country: string
          created_at: string
          id: string
          name: string
          radius_km: number | null
        }
        Insert: {
          active?: boolean
          center_lat?: number | null
          center_lng?: number | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          name: string
          radius_km?: number | null
        }
        Update: {
          active?: boolean
          center_lat?: number | null
          center_lng?: number | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          name?: string
          radius_km?: number | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          city: string
          created_at: string
          current_lat: number | null
          current_lng: number | null
          id: string
          is_available: boolean
          is_online: boolean
          kyc_docs_url: string[] | null
          last_location_at: string | null
          license_number: string | null
          plate_number: string | null
          platform_id: string
          rating: number
          status: string
          total_earnings_vuc: number
          total_earnings_xof: number
          total_rides: number
          updated_at: string
          user_id: string
          vehicle_brand: string | null
          vehicle_color: string | null
          vehicle_type: string
          verified: boolean
          verified_at: string | null
          zone: string
        }
        Insert: {
          city?: string
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          id?: string
          is_available?: boolean
          is_online?: boolean
          kyc_docs_url?: string[] | null
          last_location_at?: string | null
          license_number?: string | null
          plate_number?: string | null
          platform_id?: string
          rating?: number
          status?: string
          total_earnings_vuc?: number
          total_earnings_xof?: number
          total_rides?: number
          updated_at?: string
          user_id: string
          vehicle_brand?: string | null
          vehicle_color?: string | null
          vehicle_type?: string
          verified?: boolean
          verified_at?: string | null
          zone?: string
        }
        Update: {
          city?: string
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          id?: string
          is_available?: boolean
          is_online?: boolean
          kyc_docs_url?: string[] | null
          last_location_at?: string | null
          license_number?: string | null
          plate_number?: string | null
          platform_id?: string
          rating?: number
          status?: string
          total_earnings_vuc?: number
          total_earnings_xof?: number
          total_rides?: number
          updated_at?: string
          user_id?: string
          vehicle_brand?: string | null
          vehicle_color?: string | null
          vehicle_type?: string
          verified?: boolean
          verified_at?: string | null
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tickets: {
        Row: {
          active: boolean
          buyer_id: string | null
          city: string
          created_at: string
          description: string | null
          event_date: string
          event_id: string | null
          event_name: string
          id: string
          image_url: string | null
          organizer_id: string | null
          payment_method: string | null
          platform_id: string
          price_paid_vuc: number | null
          price_paid_xof: number | null
          price_vuc: number
          price_xof: number
          qr_code: string | null
          sold_seats: number
          status: string | null
          total_seats: number | null
          used_at: string | null
          venue: string | null
        }
        Insert: {
          active?: boolean
          buyer_id?: string | null
          city?: string
          created_at?: string
          description?: string | null
          event_date: string
          event_id?: string | null
          event_name: string
          id?: string
          image_url?: string | null
          organizer_id?: string | null
          payment_method?: string | null
          platform_id?: string
          price_paid_vuc?: number | null
          price_paid_xof?: number | null
          price_vuc?: number
          price_xof?: number
          qr_code?: string | null
          sold_seats?: number
          status?: string | null
          total_seats?: number | null
          used_at?: string | null
          venue?: string | null
        }
        Update: {
          active?: boolean
          buyer_id?: string | null
          city?: string
          created_at?: string
          description?: string | null
          event_date?: string
          event_id?: string | null
          event_name?: string
          id?: string
          image_url?: string | null
          organizer_id?: string | null
          payment_method?: string | null
          platform_id?: string
          price_paid_vuc?: number | null
          price_paid_xof?: number | null
          price_vuc?: number
          price_xof?: number
          qr_code?: string | null
          sold_seats?: number
          status?: string | null
          total_seats?: number | null
          used_at?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tickets_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tickets_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string | null
          city: string
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          lat: number | null
          lng: number | null
          max_tickets: number | null
          organizer_id: string | null
          radio_fm_link: boolean
          starts_at: string
          status: string
          ticket_price_vuc: number | null
          ticket_price_xof: number
          tickets_sold: number
          title: string
          venue: string | null
        }
        Insert: {
          category?: string | null
          city?: string
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          max_tickets?: number | null
          organizer_id?: string | null
          radio_fm_link?: boolean
          starts_at: string
          status?: string
          ticket_price_vuc?: number | null
          ticket_price_xof?: number
          tickets_sold?: number
          title: string
          venue?: string | null
        }
        Update: {
          category?: string | null
          city?: string
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          max_tickets?: number | null
          organizer_id?: string | null
          radio_fm_link?: boolean
          starts_at?: string
          status?: string
          ticket_price_vuc?: number | null
          ticket_price_xof?: number
          tickets_sold?: number
          title?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
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
      financing_installments: {
        Row: {
          amount_xof: number
          created_at: string
          financing_id: string
          id: string
          paid_at: string | null
          ride_id: string | null
          status: string
        }
        Insert: {
          amount_xof: number
          created_at?: string
          financing_id: string
          id?: string
          paid_at?: string | null
          ride_id?: string | null
          status?: string
        }
        Update: {
          amount_xof?: number
          created_at?: string
          financing_id?: string
          id?: string
          paid_at?: string | null
          ride_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "financing_installments_financing_id_fkey"
            columns: ["financing_id"]
            isOneToOne: false
            referencedRelation: "vehicle_financing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financing_installments_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      financing_repayments: {
        Row: {
          amount_xof: number
          created_at: string
          financing_id: string
          id: string
          ride_id: string
        }
        Insert: {
          amount_xof: number
          created_at?: string
          financing_id: string
          id?: string
          ride_id: string
        }
        Update: {
          amount_xof?: number
          created_at?: string
          financing_id?: string
          id?: string
          ride_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financing_repayments_financing_id_fkey"
            columns: ["financing_id"]
            isOneToOne: false
            referencedRelation: "vehicle_financing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financing_repayments_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      food_orders: {
        Row: {
          client_id: string
          created_at: string
          delivered_at: string | null
          delivery_address: string | null
          delivery_fee_xof: number
          delivery_lat: number | null
          delivery_lng: number | null
          estimated_at: string | null
          id: string
          items: Json
          payment_method: string
          restaurant_id: string
          ride_id: string | null
          status: string
          total_xof: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          delivered_at?: string | null
          delivery_address?: string | null
          delivery_fee_xof: number
          delivery_lat?: number | null
          delivery_lng?: number | null
          estimated_at?: string | null
          id?: string
          items?: Json
          payment_method?: string
          restaurant_id: string
          ride_id?: string | null
          status?: string
          total_xof: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          delivered_at?: string | null
          delivery_address?: string | null
          delivery_fee_xof?: number
          delivery_lat?: number | null
          delivery_lng?: number | null
          estimated_at?: string | null
          id?: string
          items?: Json
          payment_method?: string
          restaurant_id?: string
          ride_id?: string | null
          status?: string
          total_xof?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_orders_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_alerts: {
        Row: {
          alert_type: string
          created_at: string
          details: Json | null
          id: string
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          details?: Json | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          details?: Json | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fraud_alerts_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fraud_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_claims: {
        Row: {
          amount_approved_xof: number | null
          amount_claimed_xof: number | null
          claimant_id: string
          created_at: string
          description: string
          evidence_urls: string[] | null
          id: string
          insurance_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          amount_approved_xof?: number | null
          amount_claimed_xof?: number | null
          claimant_id: string
          created_at?: string
          description: string
          evidence_urls?: string[] | null
          id?: string
          insurance_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          amount_approved_xof?: number | null
          amount_claimed_xof?: number | null
          claimant_id?: string
          created_at?: string
          description?: string
          evidence_urls?: string[] | null
          id?: string
          insurance_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_claimant_id_fkey"
            columns: ["claimant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_claims_insurance_id_fkey"
            columns: ["insurance_id"]
            isOneToOne: false
            referencedRelation: "ride_insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_claims_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_registrations: {
        Row: {
          created_at: string
          id: string
          ip_hash: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_hash: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_hash?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean
          name: string
          price_vuc: number | null
          price_xof: number
          restaurant_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name: string
          price_vuc?: number | null
          price_xof: number
          restaurant_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name?: string
          price_vuc?: number | null
          price_xof?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
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
      platform_credentials: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_refreshed_at: string | null
          platform: string
          provider: string
          scopes: string[] | null
          social_account_id: string | null
          status: string
          token_ref: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_refreshed_at?: string | null
          platform: string
          provider?: string
          scopes?: string[] | null
          social_account_id?: string | null
          status?: string
          token_ref: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_refreshed_at?: string | null
          platform?: string
          provider?: string
          scopes?: string[] | null
          social_account_id?: string | null
          status?: string
          token_ref?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_credentials_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_credentials_user_id_fkey"
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
      price_negotiations: {
        Row: {
          created_at: string
          direction: string
          driver_id: string
          id: string
          proposed_price: number
          request_id: string
          status: string
        }
        Insert: {
          created_at?: string
          direction: string
          driver_id: string
          id?: string
          proposed_price: number
          request_id: string
          status?: string
        }
        Update: {
          created_at?: string
          direction?: string
          driver_id?: string
          id?: string
          proposed_price?: number
          request_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_negotiations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_negotiations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "ride_requests"
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
          city: string | null
          country: string | null
          created_at: string | null
          display_name: string | null
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
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
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
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
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
      push_tokens: {
        Row: {
          active: boolean
          created_at: string
          id: string
          is_active: boolean
          platform: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          is_active?: boolean
          platform?: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          is_active?: boolean
          platform?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      restaurants: {
        Row: {
          address: string | null
          avg_prep_min: number
          city: string
          created_at: string
          cuisine_type: string | null
          delivery_fee_xof: number
          description: string | null
          id: string
          image_url: string | null
          is_open: boolean
          lat: number | null
          lng: number | null
          min_order_xof: number
          name: string
          owner_id: string | null
          platform_id: string
          rating: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avg_prep_min?: number
          city?: string
          created_at?: string
          cuisine_type?: string | null
          delivery_fee_xof?: number
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean
          lat?: number | null
          lng?: number | null
          min_order_xof?: number
          name: string
          owner_id?: string | null
          platform_id?: string
          rating?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avg_prep_min?: number
          city?: string
          created_at?: string
          cuisine_type?: string | null
          delivery_fee_xof?: number
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean
          lat?: number | null
          lng?: number | null
          min_order_xof?: number
          name?: string
          owner_id?: string | null
          platform_id?: string
          rating?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
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
      ride_insurance: {
        Row: {
          client_id: string
          coverage_xof: number
          created_at: string
          driver_id: string | null
          expires_at: string
          id: string
          premium_vuc: number
          ride_id: string
          status: string
        }
        Insert: {
          client_id: string
          coverage_xof?: number
          created_at?: string
          driver_id?: string | null
          expires_at: string
          id?: string
          premium_vuc?: number
          ride_id: string
          status?: string
        }
        Update: {
          client_id?: string
          coverage_xof?: number
          created_at?: string
          driver_id?: string | null
          expires_at?: string
          id?: string
          premium_vuc?: number
          ride_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_insurance_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_insurance_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_insurance_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          ride_id: string
          role: string
          sender_id: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          ride_id: string
          role?: string
          sender_id: string
          type?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          ride_id?: string
          role?: string
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_messages_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_requests: {
        Row: {
          accepted_at: string | null
          cancel_reason: string | null
          cancelled_at: string | null
          client_id: string
          client_price_xof: number | null
          client_proposed_price: number | null
          client_proposed_price_xof: number | null
          created_at: string
          distance_km: number | null
          driver_counter_price: number | null
          driver_counter_price_xof: number | null
          driver_counter_xof: number | null
          driver_id: string | null
          dropoff_address: string | null
          dropoff_lat: number
          dropoff_lng: number
          duration_min: number | null
          expires_at: string | null
          id: string
          negotiation_expires_at: string | null
          negotiation_mode: boolean
          negotiation_status: string | null
          note_client: string | null
          payment_method: string
          pickup_address: string | null
          pickup_lat: number
          pickup_lng: number
          platform_id: string
          price_vuc: number | null
          price_xof: number | null
          scheduled_at: string | null
          status: string
          surge_multiplier: number | null
          type: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          client_id: string
          client_price_xof?: number | null
          client_proposed_price?: number | null
          client_proposed_price_xof?: number | null
          created_at?: string
          distance_km?: number | null
          driver_counter_price?: number | null
          driver_counter_price_xof?: number | null
          driver_counter_xof?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          dropoff_lat: number
          dropoff_lng: number
          duration_min?: number | null
          expires_at?: string | null
          id?: string
          negotiation_expires_at?: string | null
          negotiation_mode?: boolean
          negotiation_status?: string | null
          note_client?: string | null
          payment_method?: string
          pickup_address?: string | null
          pickup_lat: number
          pickup_lng: number
          platform_id?: string
          price_vuc?: number | null
          price_xof?: number | null
          scheduled_at?: string | null
          status?: string
          surge_multiplier?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          client_id?: string
          client_price_xof?: number | null
          client_proposed_price?: number | null
          client_proposed_price_xof?: number | null
          created_at?: string
          distance_km?: number | null
          driver_counter_price?: number | null
          driver_counter_price_xof?: number | null
          driver_counter_xof?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          dropoff_lat?: number
          dropoff_lng?: number
          duration_min?: number | null
          expires_at?: string | null
          id?: string
          negotiation_expires_at?: string | null
          negotiation_mode?: boolean
          negotiation_status?: string | null
          note_client?: string | null
          payment_method?: string
          pickup_address?: string | null
          pickup_lat?: number
          pickup_lng?: number
          platform_id?: string
          price_vuc?: number | null
          price_xof?: number | null
          scheduled_at?: string | null
          status?: string
          surge_multiplier?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_requests_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          client_id: string
          comment_client: string | null
          comment_driver: string | null
          completed_at: string | null
          created_at: string
          distance_km: number | null
          driver_earnings_vuc: number | null
          driver_earnings_xof: number | null
          driver_id: string
          duration_min: number | null
          final_price_vuc: number | null
          final_price_xof: number | null
          id: string
          payment_method: string
          payment_status: string
          platform_fee_pct: number
          platform_fee_xof: number | null
          platform_id: string
          rating_client: number | null
          rating_driver: number | null
          request_id: string
          started_at: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          comment_client?: string | null
          comment_driver?: string | null
          completed_at?: string | null
          created_at?: string
          distance_km?: number | null
          driver_earnings_vuc?: number | null
          driver_earnings_xof?: number | null
          driver_id: string
          duration_min?: number | null
          final_price_vuc?: number | null
          final_price_xof?: number | null
          id?: string
          payment_method?: string
          payment_status?: string
          platform_fee_pct?: number
          platform_fee_xof?: number | null
          platform_id?: string
          rating_client?: number | null
          rating_driver?: number | null
          request_id: string
          started_at?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          comment_client?: string | null
          comment_driver?: string | null
          completed_at?: string | null
          created_at?: string
          distance_km?: number | null
          driver_earnings_vuc?: number | null
          driver_earnings_xof?: number | null
          driver_id?: string
          duration_min?: number | null
          final_price_vuc?: number | null
          final_price_xof?: number | null
          id?: string
          payment_method?: string
          payment_status?: string
          platform_fee_pct?: number
          platform_fee_xof?: number | null
          platform_id?: string
          rating_client?: number | null
          rating_driver?: number | null
          request_id?: string
          started_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rides_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "ride_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          account_type: string
          created_at: string
          followers_count: number | null
          handle: string | null
          id: string
          is_active: boolean
          linked_at: string
          metadata: Json | null
          oauth_token_ref: string | null
          platform: string
          profile_url: string | null
          updated_at: string
          user_id: string
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          account_type?: string
          created_at?: string
          followers_count?: number | null
          handle?: string | null
          id?: string
          is_active?: boolean
          linked_at?: string
          metadata?: Json | null
          oauth_token_ref?: string | null
          platform: string
          profile_url?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean
          verified_at?: string | null
        }
        Update: {
          account_type?: string
          created_at?: string
          followers_count?: number | null
          handle?: string | null
          id?: string
          is_active?: boolean
          linked_at?: string
          metadata?: Json | null
          oauth_token_ref?: string | null
          platform?: string
          profile_url?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_tasks: {
        Row: {
          action_type: string
          advertiser_id: string
          approved: boolean
          budget_vuc: number
          completions_count: number
          content_text: string | null
          created_at: string
          daily_limit: number
          description: string | null
          duration_hours: number
          end_date: string | null
          id: string
          media_url: string | null
          metadata: Json
          min_followers: number | null
          network: string
          platform: string | null
          platform_id: string
          platform_task_config: Json
          reward_vuc: number
          spent_vuc: number
          start_date: string | null
          status: string
          target_url: string
          task_type: string
          title: string
          total_limit: number | null
          updated_at: string
          verification_mode: string
          verification_source: string
        }
        Insert: {
          action_type?: string
          advertiser_id: string
          approved?: boolean
          budget_vuc?: number
          completions_count?: number
          content_text?: string | null
          created_at?: string
          daily_limit?: number
          description?: string | null
          duration_hours?: number
          end_date?: string | null
          id?: string
          media_url?: string | null
          metadata?: Json
          min_followers?: number | null
          network: string
          platform?: string | null
          platform_id?: string
          platform_task_config?: Json
          reward_vuc?: number
          spent_vuc?: number
          start_date?: string | null
          status?: string
          target_url: string
          task_type: string
          title: string
          total_limit?: number | null
          updated_at?: string
          verification_mode?: string
          verification_source?: string
        }
        Update: {
          action_type?: string
          advertiser_id?: string
          approved?: boolean
          budget_vuc?: number
          completions_count?: number
          content_text?: string | null
          created_at?: string
          daily_limit?: number
          description?: string | null
          duration_hours?: number
          end_date?: string | null
          id?: string
          media_url?: string | null
          metadata?: Json
          min_followers?: number | null
          network?: string
          platform?: string | null
          platform_id?: string
          platform_task_config?: Json
          reward_vuc?: number
          spent_vuc?: number
          start_date?: string | null
          status?: string
          target_url?: string
          task_type?: string
          title?: string
          total_limit?: number | null
          updated_at?: string
          verification_mode?: string
          verification_source?: string
        }
        Relationships: []
      }
      sos_alerts: {
        Row: {
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          message: string | null
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          ride_id: string
          role: string | null
          sender_id: string
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          message?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          ride_id: string
          role?: string | null
          sender_id: string
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          message?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          ride_id?: string
          role?: string | null
          sender_id?: string
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sos_alerts_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      status_campaigns: {
        Row: {
          advertiser_id: string
          approved: boolean
          budget_vuc: number
          completions_count: number
          content_text: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          max_completions: number | null
          media_url: string | null
          min_followers: number
          platform_id: string
          reward_per_post: number
          spent_vuc: number
          start_date: string | null
          status: string
          target_criteria: Json | null
          target_platforms: string[]
          title: string
          updated_at: string
        }
        Insert: {
          advertiser_id: string
          approved?: boolean
          budget_vuc?: number
          completions_count?: number
          content_text: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          max_completions?: number | null
          media_url?: string | null
          min_followers?: number
          platform_id?: string
          reward_per_post?: number
          spent_vuc?: number
          start_date?: string | null
          status?: string
          target_criteria?: Json | null
          target_platforms?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          advertiser_id?: string
          approved?: boolean
          budget_vuc?: number
          completions_count?: number
          content_text?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          max_completions?: number | null
          media_url?: string | null
          min_followers?: number
          platform_id?: string
          reward_per_post?: number
          spent_vuc?: number
          start_date?: string | null
          status?: string
          target_criteria?: Json | null
          target_platforms?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_campaigns_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      task_completions: {
        Row: {
          api_verification_payload: Json
          api_verified_at: string | null
          confidence_score: number | null
          created_at: string
          expires_at: string | null
          id: string
          proof_metadata: Json | null
          proof_screenshot_url: string | null
          published_at: string | null
          rejection_reason: string | null
          status: string
          task_id: string
          updated_at: string
          user_id: string
          verified_at: string | null
          verified_by: string | null
          vuc_earned: number
        }
        Insert: {
          api_verification_payload?: Json
          api_verified_at?: string | null
          confidence_score?: number | null
          created_at?: string
          expires_at?: string | null
          id?: string
          proof_metadata?: Json | null
          proof_screenshot_url?: string | null
          published_at?: string | null
          rejection_reason?: string | null
          status?: string
          task_id: string
          updated_at?: string
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
          vuc_earned?: number
        }
        Update: {
          api_verification_payload?: Json
          api_verified_at?: string | null
          confidence_score?: number | null
          created_at?: string
          expires_at?: string | null
          id?: string
          proof_metadata?: Json | null
          proof_screenshot_url?: string | null
          published_at?: string | null
          rejection_reason?: string | null
          status?: string
          task_id?: string
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
          vuc_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "social_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_completions_verified_by_fkey"
            columns: ["verified_by"]
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
      ticket_purchases: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          paid_vuc: number
          paid_xof: number
          payment_method: string
          qr_code: string | null
          quantity: number
          ticket_id: string
          used: boolean
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          paid_vuc?: number
          paid_xof?: number
          payment_method?: string
          qr_code?: string | null
          quantity?: number
          ticket_id: string
          used?: boolean
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          paid_vuc?: number
          paid_xof?: number
          payment_method?: string
          qr_code?: string | null
          quantity?: number
          ticket_id?: string
          used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ticket_purchases_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_purchases_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "event_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      token_rates: {
        Row: {
          advertiser_rate_vuc_to_xof: number
          advertiser_spread: number
          created_at: string | null
          daily_limit_vuc: number
          id: string
          min_withdrawal_vuc: number
          source: string | null
          updated_at: string | null
          vuc_to_usdt: number | null
          vuc_to_xof: number
          withdrawal_fee_pct: number
        }
        Insert: {
          advertiser_rate_vuc_to_xof?: number
          advertiser_spread?: number
          created_at?: string | null
          daily_limit_vuc?: number
          id?: string
          min_withdrawal_vuc?: number
          source?: string | null
          updated_at?: string | null
          vuc_to_usdt?: number | null
          vuc_to_xof?: number
          withdrawal_fee_pct?: number
        }
        Update: {
          advertiser_rate_vuc_to_xof?: number
          advertiser_spread?: number
          created_at?: string | null
          daily_limit_vuc?: number
          id?: string
          min_withdrawal_vuc?: number
          source?: string | null
          updated_at?: string | null
          vuc_to_usdt?: number | null
          vuc_to_xof?: number
          withdrawal_fee_pct?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          amount_vuc: number | null
          amount_xof: number | null
          created_at: string | null
          description: string | null
          from_wallet: string | null
          id: string
          payment_details: Json | null
          payment_method: string | null
          platform_id: string
          points: number | null
          processed_at: string | null
          reference_id: string | null
          status: string | null
          to_wallet: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          amount_vuc?: number | null
          amount_xof?: number | null
          created_at?: string | null
          description?: string | null
          from_wallet?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          platform_id?: string
          points?: number | null
          processed_at?: string | null
          reference_id?: string | null
          status?: string | null
          to_wallet?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          amount_vuc?: number | null
          amount_xof?: number | null
          created_at?: string | null
          description?: string | null
          from_wallet?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          platform_id?: string
          points?: number | null
          processed_at?: string | null
          reference_id?: string | null
          status?: string | null
          to_wallet?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_from_wallet_fkey"
            columns: ["from_wallet"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_to_wallet_fkey"
            columns: ["to_wallet"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
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
      vehicle_financing: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          completed_at: string | null
          created_at: string
          deduction_pct: number
          down_payment_xof: number
          driver_id: string
          duration_months: number
          id: string
          installments_paid: number
          monthly_xof: number
          next_payment_at: string | null
          paid_xof: number
          platform_id: string
          remaining_xof: number
          status: string
          total_months: number
          updated_at: string
          vehicle_desc: string
          vehicle_description: string
          vehicle_price_xof: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          created_at?: string
          deduction_pct?: number
          down_payment_xof?: number
          driver_id: string
          duration_months?: number
          id?: string
          installments_paid?: number
          monthly_xof: number
          next_payment_at?: string | null
          paid_xof?: number
          platform_id?: string
          remaining_xof: number
          status?: string
          total_months?: number
          updated_at?: string
          vehicle_desc: string
          vehicle_description?: string
          vehicle_price_xof: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          created_at?: string
          deduction_pct?: number
          down_payment_xof?: number
          driver_id?: string
          duration_months?: number
          id?: string
          installments_paid?: number
          monthly_xof?: number
          next_payment_at?: string | null
          paid_xof?: number
          platform_id?: string
          remaining_xof?: number
          status?: string
          total_months?: number
          updated_at?: string
          vehicle_desc?: string
          vehicle_description?: string
          vehicle_price_xof?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_financing_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_financing_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
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
      zempro_partners: {
        Row: {
          active: boolean
          address: string | null
          avg_prep_min: number
          category: string
          city: string
          created_at: string
          delivery_fee_xof: number
          id: string
          image_url: string | null
          is_open: boolean
          lat: number | null
          lng: number | null
          min_order_xof: number
          name: string
          phone: string | null
          rating: number
        }
        Insert: {
          active?: boolean
          address?: string | null
          avg_prep_min?: number
          category?: string
          city?: string
          created_at?: string
          delivery_fee_xof?: number
          id?: string
          image_url?: string | null
          is_open?: boolean
          lat?: number | null
          lng?: number | null
          min_order_xof?: number
          name: string
          phone?: string | null
          rating?: number
        }
        Update: {
          active?: boolean
          address?: string | null
          avg_prep_min?: number
          category?: string
          city?: string
          created_at?: string
          delivery_fee_xof?: number
          id?: string
          image_url?: string | null
          is_open?: boolean
          lat?: number | null
          lng?: number | null
          min_order_xof?: number
          name?: string
          phone?: string | null
          rating?: number
        }
        Relationships: []
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
      socialpay_kpis: {
        Row: {
          active_campaigns: number | null
          completions_24h: number | null
          linked_accounts: number | null
          pending_verifications: number | null
          total_campaigns: number | null
          total_completions: number | null
          total_vuc_distributed: number | null
          verified_completions: number | null
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
      zempro_kpis: {
        Row: {
          active_drivers: number | null
          active_financing: number | null
          active_sos: number | null
          completed_rides: number | null
          milestones_awarded: number | null
          online_drivers: number | null
          open_restaurants: number | null
          pending_requests: number | null
          platform_revenue_xof: number | null
          requests_24h: number | null
          revenue_xof: number | null
          tickets_sold: number | null
          total_drivers: number | null
          total_food_orders: number | null
          total_requests: number | null
        }
        Relationships: []
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
      estimate_ride_price: {
        Args: { p_distance_km: number; p_type?: string }
        Returns: Json
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
      app_role: "admin" | "consumer" | "advertiser" | "driver" | "viewer"
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
      app_role: ["admin", "consumer", "advertiser", "driver", "viewer"],
    },
  },
} as const
