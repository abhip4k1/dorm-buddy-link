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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          is_important: boolean
          title: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          is_important?: boolean
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_important?: boolean
          title?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_id: string
          created_at: string
          doctor_id: string
          id: string
          reason: string | null
          slot_id: string
          status: string
          student_enrollment: string
          student_name: string
          updated_at: string
        }
        Insert: {
          appointment_id: string
          created_at?: string
          doctor_id: string
          id?: string
          reason?: string | null
          slot_id: string
          status?: string
          student_enrollment: string
          student_name: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string
          created_at?: string
          doctor_id?: string
          id?: string
          reason?: string | null
          slot_id?: string
          status?: string
          student_enrollment?: string
          student_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "doctor_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          message: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          message?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          message?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "room_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          category: string
          complaint_id: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          complaint_id: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          complaint_id?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      doctor_slots: {
        Row: {
          created_at: string
          doctor_id: string
          end_time: string
          id: string
          is_booked: boolean
          slot_date: string
          start_time: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          end_time: string
          id?: string
          is_booked?: boolean
          slot_date: string
          start_time: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          end_time?: string
          id?: string
          is_booked?: boolean
          slot_date?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_slots_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          created_at: string
          department: string
          id: string
          is_available: boolean
          name: string
          profile_image: string | null
          qualification: string | null
        }
        Insert: {
          created_at?: string
          department: string
          id?: string
          is_available?: boolean
          name: string
          profile_image?: string | null
          qualification?: string | null
        }
        Update: {
          created_at?: string
          department?: string
          id?: string
          is_available?: boolean
          name?: string
          profile_image?: string | null
          qualification?: string | null
        }
        Relationships: []
      }
      emergency_alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          location: string | null
          message: string | null
          status: string
          user_id: string
        }
        Insert: {
          alert_type?: string
          created_at?: string
          id?: string
          location?: string | null
          message?: string | null
          status?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          location?: string | null
          message?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      fee_records: {
        Row: {
          amount: number
          breakdown: Json | null
          created_at: string
          due_date: string | null
          id: string
          paid_date: string | null
          semester: string
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          breakdown?: Json | null
          created_at?: string
          due_date?: string | null
          id?: string
          paid_date?: string | null
          semester: string
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          breakdown?: Json | null
          created_at?: string
          due_date?: string | null
          id?: string
          paid_date?: string | null
          semester?: string
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: string
          is_anonymous: boolean
          message: string
          satisfaction: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_anonymous?: boolean
          message: string
          satisfaction: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_anonymous?: boolean
          message?: string
          satisfaction?: string
          user_id?: string | null
        }
        Relationships: []
      }
      gate_passes: {
        Row: {
          approved_by: string | null
          created_at: string
          departure_date: string
          id: string
          pass_id: string
          reason: string
          return_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          departure_date: string
          id?: string
          pass_id: string
          reason: string
          return_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          departure_date?: string
          id?: string
          pass_id?: string
          reason?: string
          return_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lost_found_items: {
        Row: {
          contact_info: string | null
          created_at: string
          description: string
          id: string
          is_resolved: boolean
          item_name: string
          item_type: string
          location: string
          user_id: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          description: string
          id?: string
          is_resolved?: boolean
          item_name: string
          item_type?: string
          location: string
          user_id?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          description?: string
          id?: string
          is_resolved?: boolean
          item_name?: string
          item_type?: string
          location?: string
          user_id?: string | null
        }
        Relationships: []
      }
      mess_menu: {
        Row: {
          created_at: string
          day_of_week: string
          id: string
          items: string[]
          meal_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: string
          id?: string
          items?: string[]
          meal_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: string
          id?: string
          items?: string[]
          meal_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          enrollment_id: string
          full_name: string
          hostel_block: string | null
          id: string
          phone: string | null
          room_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          full_name: string
          hostel_block?: string | null
          id: string
          phone?: string | null
          room_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          full_name?: string
          hostel_block?: string | null
          id?: string
          phone?: string | null
          room_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      room_listings: {
        Row: {
          amenities: string[] | null
          created_at: string
          description: string
          id: string
          is_available: boolean
          location: string | null
          owner_id: string
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string
          description: string
          id?: string
          is_available?: boolean
          location?: string | null
          owner_id: string
          price?: number
          title: string
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string
          description?: string
          id?: string
          is_available?: boolean
          location?: string | null
          owner_id?: string
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
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
