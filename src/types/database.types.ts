/**
 * Hand-maintained mirror of supabase/migrations/*.sql.
 * Regenerate with `npm run db:types` once the project is linked to a live
 * Supabase project, then diff against this file before committing.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type FamilyRole =
  | "mother"
  | "father"
  | "parent"
  | "grandmother"
  | "grandfather"
  | "caregiver"
  | "other"

export type BabySex = "girl" | "boy" | "unknown"

export type FeedType = "breast" | "bottle" | "solid"
export type FeedSide = "left" | "right" | "both"
export type FeedIntensity = "short" | "normal" | "long"

export type DiaperType = "wee" | "poop" | "both"

export type MilestoneAgeRange = "0-1m" | "2-3m" | "4-6m" | "6-9m" | "9-12m"

export type HardMomentCategory =
  | "crying"
  | "cramps"
  | "spitting_up"
  | "bad_night"
  | "teething"
  | "fever"
  | "vaccination"
  | "restlessness"
  | "cold"
  | "other"

export type PhotoReminderKey =
  | "1_day"
  | "1_week"
  | "2_weeks"
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "5_months"
  | "6_months"
  | "9_months"
  | "12_months"
  | "18_months"
  | "2_years"

export type TimelineEventType =
  | "birth"
  | "feed"
  | "sleep"
  | "diaper"
  | "photo"
  | "milestone"
  | "visitor"
  | "growth"
  | "note"
  | "hard_moment"

export type AiInsightType =
  | "weekly_summary"
  | "monthly_report"
  | "sleep_advice"
  | "feeding_pattern"
  | "growth_explainer"
  | "tip"
  | "yearbook_story"

export type NotificationType =
  | "photo_reminder"
  | "feeding_reminder"
  | "nap_reminder"
  | "new_milestone"
  | "weekly_summary"
  | "system"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      families: {
        Row: {
          id: string
          name: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["families"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "families_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          id: string
          family_id: string
          profile_id: string
          role: FamilyRole
          created_at: string
        }
        Insert: {
          id?: string
          family_id: string
          profile_id: string
          role?: FamilyRole
          created_at?: string
        }
        Update: Partial<
          Database["public"]["Tables"]["family_members"]["Insert"]
        >
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      babies: {
        Row: {
          id: string
          family_id: string
          first_name: string
          nickname: string | null
          sex: BabySex | null
          birth_date: string
          birth_time: string | null
          birth_weight_grams: number | null
          birth_length_cm: number | null
          birth_head_circumference_cm: number | null
          hospital: string | null
          midwife: string | null
          blood_type: string | null
          allergies: string | null
          medication: string | null
          general_practitioner: string | null
          health_insurance: string | null
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          family_id: string
          first_name: string
          nickname?: string | null
          sex?: BabySex | null
          birth_date: string
          birth_time?: string | null
          birth_weight_grams?: number | null
          birth_length_cm?: number | null
          birth_head_circumference_cm?: number | null
          hospital?: string | null
          midwife?: string | null
          blood_type?: string | null
          allergies?: string | null
          medication?: string | null
          general_practitioner?: string | null
          health_insurance?: string | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["babies"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "babies_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      feeds: {
        Row: {
          id: string
          baby_id: string
          type: FeedType
          side: FeedSide | null
          amount_ml: number | null
          duration_minutes: number | null
          intensity: FeedIntensity | null
          started_at: string
          note: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          type: FeedType
          side?: FeedSide | null
          amount_ml?: number | null
          duration_minutes?: number | null
          intensity?: FeedIntensity | null
          started_at?: string
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["feeds"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "feeds_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feeds_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_sessions: {
        Row: {
          id: string
          baby_id: string
          started_at: string
          ended_at: string | null
          note: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          started_at: string
          ended_at?: string | null
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<
          Database["public"]["Tables"]["sleep_sessions"]["Insert"]
        >
        Relationships: [
          {
            foreignKeyName: "sleep_sessions_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleep_sessions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diapers: {
        Row: {
          id: string
          baby_id: string
          type: DiaperType
          occurred_at: string
          note: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          type: DiaperType
          occurred_at?: string
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["diapers"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "diapers_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diapers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth: {
        Row: {
          id: string
          baby_id: string
          measured_at: string
          weight_grams: number | null
          height_cm: number | null
          head_circumference_cm: number | null
          note: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          measured_at?: string
          weight_grams?: number | null
          height_cm?: number | null
          head_circumference_cm?: number | null
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["growth"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "growth_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          id: string
          baby_id: string
          title: string
          age_range: MilestoneAgeRange
          achieved_at: string | null
          photo_url: string | null
          note: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          title: string
          age_range: MilestoneAgeRange
          achieved_at?: string | null
          photo_url?: string | null
          note?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["milestones"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "milestones_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          id: string
          baby_id: string
          storage_path: string
          taken_at: string
          caption: string | null
          is_favorite: boolean
          milestone_id: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          storage_path: string
          taken_at?: string
          caption?: string | null
          is_favorite?: boolean
          milestone_id?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["photos"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "photos_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          id: string
          baby_id: string
          name: string
          relation: string | null
          visited_at: string
          photo_url: string | null
          gift: string | null
          note: string | null
          memory: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          name: string
          relation?: string | null
          visited_at?: string
          photo_url?: string | null
          gift?: string | null
          note?: string | null
          memory?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["visitors"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "visitors_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visitors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          id: string
          baby_id: string
          title: string | null
          body: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          title?: string | null
          body: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "notes_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hard_moments: {
        Row: {
          id: string
          baby_id: string
          category: HardMomentCategory
          occurred_at: string
          note: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          category: HardMomentCategory
          occurred_at?: string
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["hard_moments"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "hard_moments_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hard_moments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_reminders: {
        Row: {
          id: string
          baby_id: string
          milestone_key: PhotoReminderKey
          due_date: string
          completed_at: string | null
          photo_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          milestone_key: PhotoReminderKey
          due_date: string
          completed_at?: string | null
          photo_id?: string | null
          created_at?: string
        }
        Update: Partial<
          Database["public"]["Tables"]["photo_reminders"]["Insert"]
        >
        Relationships: [
          {
            foreignKeyName: "photo_reminders_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_reminders_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline: {
        Row: {
          id: string
          baby_id: string
          type: TimelineEventType
          title: string
          description: string | null
          occurred_at: string
          metadata: Json
          source_table: string | null
          source_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          type: TimelineEventType
          title: string
          description?: string | null
          occurred_at?: string
          metadata?: Json
          source_table?: string | null
          source_id?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["timeline"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "timeline_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insights: {
        Row: {
          id: string
          baby_id: string
          type: AiInsightType
          title: string
          content: string
          period_start: string | null
          period_end: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          type: AiInsightType
          title: string
          content: string
          period_start?: string | null
          period_end?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["ai_insights"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "ai_insights_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      yearbooks: {
        Row: {
          id: string
          baby_id: string
          year: number
          title: string | null
          cover_photo_url: string | null
          content: Json
          generated_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          year: number
          title?: string | null
          cover_photo_url?: string | null
          content?: Json
          generated_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["yearbooks"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "yearbooks_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          profile_id: string
          family_id: string
          type: NotificationType
          title: string
          body: string | null
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          family_id: string
          type: NotificationType
          title: string
          body?: string | null
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      is_family_member: {
        Args: { target_family_id: string }
        Returns: boolean
      }
      family_id_for_baby: {
        Args: { target_baby_id: string }
        Returns: string
      }
    }
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
