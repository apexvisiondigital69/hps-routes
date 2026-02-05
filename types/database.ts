export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'rep'
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          role: 'admin' | 'rep'
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'rep'
          full_name?: string | null
          created_at?: string
        }
      }
      routes: {
        Row: {
          id: string
          rep_id: string
          route_date: string
          title: string | null
          created_by: string
          created_at: string
          last_optimized_at: string | null
        }
        Insert: {
          id?: string
          rep_id: string
          route_date: string
          title?: string | null
          created_by: string
          created_at?: string
          last_optimized_at?: string | null
        }
        Update: {
          id?: string
          rep_id?: string
          route_date?: string
          title?: string | null
          created_by?: string
          created_at?: string
          last_optimized_at?: string | null
        }
      }
      stops: {
        Row: {
          id: string
          route_id: string
          sort_order: number
          address: string
          phone: string | null
          email: string | null
          notes: string | null
          status: 'pending' | 'finished' | 'skipped'
          completed_at: string | null
          updated_at: string
          lat: number | null
          lng: number | null
          geocode_provider: string | null
          geocoded_at: string | null
        }
        Insert: {
          id?: string
          route_id: string
          sort_order: number
          address: string
          phone?: string | null
          email?: string | null
          notes?: string | null
          status?: 'pending' | 'finished' | 'skipped'
          completed_at?: string | null
          updated_at?: string
          lat?: number | null
          lng?: number | null
          geocode_provider?: string | null
          geocoded_at?: string | null
        }
        Update: {
          id?: string
          route_id?: string
          sort_order?: number
          address?: string
          phone?: string | null
          email?: string | null
          notes?: string | null
          status?: 'pending' | 'finished' | 'skipped'
          completed_at?: string | null
          updated_at?: string
          lat?: number | null
          lng?: number | null
          geocode_provider?: string | null
          geocoded_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
