export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      article_reads: {
        Row: {
          article_id: string;
          created_at: string;
          id: string;
        };
        Insert: {
          article_id: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          article_id?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "article_reads_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      articles: {
        Row: {
          author: string | null;
          content: string | null;
          created_at: string;
          excerpt: string | null;
          feed_id: string;
          id: string;
          published_at: string | null;
          title: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          feed_id: string;
          id?: string;
          published_at?: string | null;
          title: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          feed_id?: string;
          id?: string;
          published_at?: string | null;
          title?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "articles_feed_id_fkey";
            columns: ["feed_id"];
            isOneToOne: false;
            referencedRelation: "feeds";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmarks: {
        Row: {
          article_id: string;
          created_at: string;
          id: string;
        };
        Insert: {
          article_id: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          article_id?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      feed_catalog: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          url: string;
          logo_url: string | null;
          category: string;
          agency: string | null;
          tags: string[] | null;
          popularity_score: number | null;
          last_updated: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          url: string;
          logo_url?: string | null;
          category: string;
          agency?: string | null;
          tags?: string[] | null;
          popularity_score?: number | null;
          last_updated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          url?: string;
          logo_url?: string | null;
          category?: string;
          agency?: string | null;
          tags?: string[] | null;
          popularity_score?: number | null;
          last_updated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      feeds: {
        Row: {
          created_at: string;
          folder_id: string | null;
          id: string;
          last_fetched_at: string | null;
          title: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          folder_id?: string | null;
          id?: string;
          last_fetched_at?: string | null;
          title: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          created_at?: string;
          folder_id?: string | null;
          id?: string;
          last_fetched_at?: string | null;
          title?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feeds_folder_id_fkey";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "folders";
            referencedColumns: ["id"];
          },
        ];
      };
      folders: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_feed_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          feed_id: string;
          notification_enabled: boolean;
          notification_frequency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          feed_id: string;
          notification_enabled?: boolean;
          notification_frequency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          feed_id?: string;
          notification_enabled?: boolean;
          notification_frequency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_feed_subscriptions_feed_id_fkey";
            columns: ["feed_id"];
            isOneToOne: false;
            referencedRelation: "feed_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_feed_subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
};
