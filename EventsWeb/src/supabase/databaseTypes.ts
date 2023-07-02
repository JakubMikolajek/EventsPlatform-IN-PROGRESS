export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          category: string;
          id: number;
        };
        Insert: {
          category: string;
          id?: number;
        };
        Update: {
          category?: string;
          id?: number;
        };
      };
      comments: {
        Row: {
          body: string | null;
          created_at: string | null;
          creator_uuid: string | null;
          event_id: number | null;
          id: number;
        };
        Insert: {
          body?: string | null;
          created_at?: string | null;
          creator_uuid?: string | null;
          event_id?: number | null;
          id?: number;
        };
        Update: {
          body?: string | null;
          created_at?: string | null;
          creator_uuid?: string | null;
          event_id?: number | null;
          id?: number;
        };
      };
      event_tickets: {
        Row: {
          created_at: string | null;
          event_id: number | null;
          id: number;
          ticket_owner: string | null;
        };
        Insert: {
          created_at?: string | null;
          event_id?: number | null;
          id?: number;
          ticket_owner?: string | null;
        };
        Update: {
          created_at?: string | null;
          event_id?: number | null;
          id?: number;
          ticket_owner?: string | null;
        };
      };
      events: {
        Row: {
          archived_at: string | null;
          created_at: string | null;
          creator_uuid: string | null;
          description: string | null;
          event_category: string | null;
          event_date: string | null;
          event_location: string | null;
          id: number;
          image_url: string | null;
          tickets_number: number | null;
          title: string | null;
        };
        Insert: {
          archived_at?: string | null;
          created_at?: string | null;
          creator_uuid?: string | null;
          description?: string | null;
          event_category?: string | null;
          event_date?: string | null;
          event_location?: string | null;
          id?: number;
          image_url?: string | null;
          tickets_number?: number | null;
          title?: string | null;
        };
        Update: {
          archived_at?: string | null;
          created_at?: string | null;
          creator_uuid?: string | null;
          description?: string | null;
          event_category?: string | null;
          event_date?: string | null;
          event_location?: string | null;
          id?: number;
          image_url?: string | null;
          tickets_number?: number | null;
          title?: string | null;
        };
      };
      favorite_events: {
        Row: {
          created_at: string | null;
          creator_uuid: string | null;
          event_id: number | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          creator_uuid?: string | null;
          event_id?: number | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          creator_uuid?: string | null;
          event_id?: number | null;
          id?: number;
        };
      };
      users: {
        Row: {
          created_at: string | null;
          first_name: string | null;
          image_url: string | null;
          last_name: string | null;
          uuid: string;
        };
        Insert: {
          created_at?: string | null;
          first_name?: string | null;
          image_url?: string | null;
          last_name?: string | null;
          uuid: string;
        };
        Update: {
          created_at?: string | null;
          first_name?: string | null;
          image_url?: string | null;
          last_name?: string | null;
          uuid?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
