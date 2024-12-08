export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      folders: {
        Row: {
          id: string;
          name: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      feeds: {
        Row: {
          id: string;
          title: string;
          url: string;
          folder_id: string | null;
          user_id: string;
          last_fetched_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          folder_id?: string | null;
          user_id: string;
          last_fetched_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          url?: string;
          folder_id?: string | null;
          user_id?: string;
          last_fetched_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          url: string;
          author: string | null;
          content: string | null;
          excerpt: string | null;
          feed_id: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          author?: string | null;
          content?: string | null;
          excerpt?: string | null;
          feed_id: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          url?: string;
          author?: string | null;
          content?: string | null;
          excerpt?: string | null;
          feed_id?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      article_reads: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          user_id?: string;
          created_at?: string;
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
  };
}
