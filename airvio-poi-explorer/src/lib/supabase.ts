import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  getCurrentSession: () => {
    return supabase.auth.getSession()
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Users
  getUser: async (id: string) => {
    return await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
  },

  updateUser: async (id: string, updates: any) => {
    return await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
  },

  // POIs
  getPOIs: async (filters?: any) => {
    let query = supabase
      .from('pois')
      .select('*')
      .eq('is_active', true)

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.location && filters?.radius) {
      // For nearby POIs, we'll use a different approach since RPC might not be available
      // This is a simplified version - in production you'd want proper geospatial queries
      query = query.limit(20)
    }

    return await query
  },

  getPOI: async (id: string) => {
    return await supabase
      .from('pois')
      .select('*')
      .eq('id', id)
      .single()
  },

  // Favorites
  getUserFavorites: async (userId: string) => {
    return await supabase
      .from('user_favorites')
      .select(`
        *,
        pois (*)
      `)
      .eq('user_id', userId)
  },

  addFavorite: async (userId: string, poiId: string) => {
    return await supabase
      .from('user_favorites')
      .insert({ user_id: userId, poi_id: poiId })
  },

  removeFavorite: async (userId: string, poiId: string) => {
    return await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('poi_id', poiId)
  },

  // Routes
  getUserRoutes: async (userId: string) => {
    return await supabase
      .from('routes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  saveRoute: async (routeData: any) => {
    return await supabase
      .from('routes')
      .insert(routeData)
  },

  // Reviews
  getPOIReviews: async (poiId: string) => {
    return await supabase
      .from('reviews')
      .select(`
        *,
        users (full_name, avatar_url)
      `)
      .eq('poi_id', poiId)
      .order('created_at', { ascending: false })
  },

  addReview: async (reviewData: any) => {
    return await supabase
      .from('reviews')
      .insert(reviewData)
  }
}