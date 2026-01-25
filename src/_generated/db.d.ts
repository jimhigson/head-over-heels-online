export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
  public: {
    Tables: {
      campaigns: {
        Row: {
          created_at: string;
          created_by: string;
          data: string;
          id: number;
          name: string;
          published: boolean;
          version: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          data: string;
          id?: number;
          name: string;
          published?: boolean;
          version?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          data?: string;
          id?: number;
          name?: string;
          published?: boolean;
          version?: number;
        };
        Relationships: [];
      };
      user_details: {
        Row: {
          userId: string;
          username: string;
        };
        Insert: {
          userId: string;
          username: string;
        };
        Update: {
          userId?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      latest_campaigns_view: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          data_preview: string | null;
          id: number | null;
          name: string | null;
          published: boolean | null;
          username: string | null;
          version: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_all_users_latest_campaigns:
        | { Args: never; Returns: Json }
        | { Args: { p_published_only?: boolean }; Returns: Json };
      get_latest_campaign: {
        Args: {
          p_campaign_name: string;
          p_user_id?: string;
          p_version?: number;
        };
        Returns: {
          created_at: string;
          created_by: string;
          data: string;
          id: number;
          name: string;
          published: boolean;
          version: number;
        };
        SetofOptions: {
          from: "*";
          to: "campaigns";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      save_campaign_version: {
        Args: {
          p_created_by?: string;
          p_data: string;
          p_name: string;
          p_published?: boolean;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : DefaultSchemaTableNameOrOptions extends (
    keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ) ?
    (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> =
  DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ?
    DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> =
  PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends (
    keyof DefaultSchema["CompositeTypes"]
  ) ?
    DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
