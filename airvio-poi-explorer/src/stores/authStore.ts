import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { User as DBUser } from '../types/database'

interface AuthState {
  user: SupabaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<DBUser>) => Promise<{ error: any }>
  getProfile: () => Promise<DBUser | null>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
      user: null,
      loading: true,

      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          return { error }
        }

        set({
          user: data.user,
          loading: false,
        })

        return { error: null }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) {
          return { error }
        }

        set({
          user: data.user,
          loading: false,
        })

        return { error: null }
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({
          user: null,
          loading: false,
        })
      },

      updateProfile: async (updates: Partial<DBUser>) => {
        const state = get()
        if (!state.user) {
          return { error: 'Not authenticated' }
        }

        const { error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', state.user.id)

        if (error) {
          return { error }
        }

        return { error: null }
      },

      getProfile: async () => {
        const state = get()
        if (!state.user) return null
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', state.user.id)
          .single()
        
        if (error) {
          console.error('Error fetching profile:', error)
          return null
        }
        
        return data
      },

}))

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    useAuthStore.setState({
      user: session.user,
      loading: false,
    })
  } else {
    useAuthStore.setState({
      loading: false,
    })
  }
})

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.setState({
      user: session.user,
      loading: false,
    })
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      loading: false,
    })
  }
})