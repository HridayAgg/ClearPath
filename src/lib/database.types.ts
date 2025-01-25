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
          email: string
          role: 'admin' | 'user'
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'user'
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      aqi_readings: {
        Row: {
          id: string
          location: unknown
          aqi_value: number
          pm25: number | null
          pm10: number | null
          no2: number | null
          so2: number | null
          o3: number | null
          co: number | null
          alert_level: 'low' | 'moderate' | 'high' | 'severe' | null
          recommendations: string[] | null
          created_at: string
        }
      }
      infrastructure_issues: {
        Row: {
          id: string
          reporter_id: string
          issue_type: string
          status: string
          location: unknown
          address: string
          description: string
          images: string[] | null
          points_awarded: number
          created_at: string
          updated_at: string
        }
      }
      transport_routes: {
        Row: {
          id: string
          type: 'bus' | 'metro'
          route_number: string
          start_location: string
          end_location: string
          created_at: string
        }
      }
      transport_schedules: {
        Row: {
          id: string
          route_id: string
          departure_time: string
          arrival_time: string
          frequency_minutes: number
          status: 'on-time' | 'delayed' | 'cancelled'
          created_at: string
          updated_at: string
        }
      }
      rewards: {
        Row: {
          id: string
          title: string
          description: string
          points_cost: number
          sponsor_name: string
          sponsor_logo: string
          valid_until: string
          created_at: string
        }
      }
      claimed_rewards: {
        Row: {
          id: string
          reward_id: string
          user_id: string
          claimed_at: string
        }
      }
    }
    Functions: {
      get_nearby_aqi_readings: {
        Args: {
          lat: number
          lng: number
          radius_meters: number
        }
        Returns: Database['public']['Tables']['aqi_readings']['Row'][]
      }
    }
  }
}