export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// User types
export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  preferences: Json
  location: unknown | null
  created_at: string
  updated_at: string
}

export interface UserInsert {
  id: string
  email: string
  full_name?: string | null
  avatar_url?: string | null
  preferences?: Json
  location?: unknown | null
  created_at?: string
  updated_at?: string
}

export interface UserUpdate {
  id?: string
  email?: string
  full_name?: string | null
  avatar_url?: string | null
  preferences?: Json
  location?: unknown | null
  created_at?: string
  updated_at?: string
}

// POI types
export interface POI {
  id: string
  name: string
  description: string
  category: string
  subcategory: string | null
  location: unknown // PostGIS geometry
  address: string
  contact_info: Json
  business_hours: Json
  rating: number
  review_count: number
  price_range: string | null
  tags: string[]
  images: string[]
  verified: boolean
  merchant_id: string | null
  created_at: string
  updated_at: string
  distance?: number // Added for nearby queries
}

export interface POIInsert {
  id?: string
  name: string
  description: string
  category: string
  subcategory?: string | null
  location: unknown
  address: string
  contact_info?: Json
  business_hours?: Json
  rating?: number
  review_count?: number
  price_range?: string | null
  tags?: string[]
  images?: string[]
  verified?: boolean
  merchant_id?: string | null
  created_at?: string
  updated_at?: string
}

export interface POIUpdate {
  id?: string
  name?: string
  description?: string
  category?: string
  subcategory?: string | null
  location?: unknown
  address?: string
  contact_info?: Json
  business_hours?: Json
  rating?: number
  review_count?: number
  price_range?: string | null
  tags?: string[]
  images?: string[]
  verified?: boolean
  merchant_id?: string | null
  created_at?: string
  updated_at?: string
}

// User Favorites
export interface UserFavorite {
  id: string
  user_id: string
  poi_id: string
  created_at: string
}

// Routes
export interface Route {
  id: string
  user_id: string
  name: string
  description: string | null
  waypoints: Json
  total_distance: number
  estimated_duration: number
  transportation_mode: string
  is_public: boolean
  created_at: string
  updated_at: string
}

// MCP Plugins
export interface MCPPlugin {
  id: string
  name: string
  description: string | null
  version: string
  capabilities: Json
  is_active: boolean
  created_at: string
  updated_at: string
}

// Plugin Connections
export interface PluginConnection {
  id: string
  user_id: string
  plugin_id: string
  config: Json
  status: string
  last_used_at: string | null
  created_at: string
  updated_at: string
}

// Payment Orders
export interface PaymentOrder {
  id: string
  order_number: string
  user_id: string
  amount: number
  currency: string
  description: string
  status: string
  payment_method: string
  payment_data: Json | null
  transaction_id: string | null
  callback_url: string | null
  return_url: string | null
  completed_at: string | null
  metadata: Json
  created_at: string
  updated_at: string
}

// MCP Exchange Logs
export interface MCPExchangeLog {
  id: string
  connection_id: string
  action: string
  request_payload: Json
  response_data: Json
  created_at: string
}

// Reviews
export interface Review {
  id: string
  user_id: string
  poi_id: string
  rating: number
  title: string | null
  content: string | null
  images: string[]
  is_verified: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

// Database function types
export interface NearbyPOIsFunction {
  Args: {
    lat: number
    lng: number
    radius_km?: number
    limit_count?: number
  }
  Returns: POI[]
}

// Common type aliases for easier access
export type Database = {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: UserInsert
        Update: UserUpdate
      }
      pois: {
        Row: POI
        Insert: POIInsert
        Update: POIUpdate
      }
      user_favorites: {
        Row: UserFavorite
        Insert: Omit<UserFavorite, 'id' | 'created_at'>
        Update: Partial<UserFavorite>
      }
      routes: {
        Row: Route
        Insert: Omit<Route, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Route>
      }
      mcp_plugins: {
        Row: MCPPlugin
        Insert: Omit<MCPPlugin, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<MCPPlugin>
      }
      plugin_connections: {
        Row: PluginConnection
        Insert: Omit<PluginConnection, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<PluginConnection>
      }
      payment_orders: {
        Row: PaymentOrder
        Insert: Omit<PaymentOrder, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<PaymentOrder>
      }
      mcp_exchange_logs: {
        Row: MCPExchangeLog
        Insert: Omit<MCPExchangeLog, 'id' | 'created_at'>
        Update: Partial<MCPExchangeLog>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Review>
      }
    }
    Functions: {
      nearby_pois: NearbyPOIsFunction
    }
  }
}