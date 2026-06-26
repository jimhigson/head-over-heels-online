export type Json =
  | { [key: string]: Json | undefined }
  | boolean
  | Json[]
  | null
  | number
  | string;

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
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
          created_at: null | string;
          created_by: null | string;
          data_preview: null | string;
          id: null | number;
          name: null | string;
          published: boolean | null;
          username: null | string;
          version: null | number;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_all_users_latest_campaigns:
        | { Args: { p_published_only?: boolean }; Returns: Json }
        | { Args: never; Returns: Json };
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
      get_latest_campaign_version: {
        Args: { p_campaign_name: string; p_user_id?: string };
        Returns: number;
      };
      get_username: { Args: { p_user_id: string }; Returns: string };
      save_campaign_version: {
        Args: {
          p_base_version?: number;
          p_created_by?: string;
          p_data: string;
          p_force?: boolean;
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
    | { schema: keyof DatabaseWithoutInternals }
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
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
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Tables"],
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
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Tables"],
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
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Enums"],
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
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["CompositeTypes"],
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
