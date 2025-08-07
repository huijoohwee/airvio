import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { error }
      }

      set({ user: data.user })
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        return { error }
      }

      set({ user: data.user })
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut()
      set({ user: null })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  },

  initialize: async () => {
    try {
      set({ loading: true })
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      set({ user, loading: false })

      // 监听认证状态变化
      supabase.auth.onAuthStateChange((event, session) => {
        set({ user: session?.user ?? null })
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  }
}))

// 初始化认证状态
useAuthStore.getState().initialize()