import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  role: 'entrepreneur' | 'enterprise' | 'developer' | 'investor'
  plan: 'free' | 'basic' | 'pro' | 'enterprise'
  token_balance: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  template: string
  config: Record<string, any>
  status: 'created' | 'configuring' | 'orchestrating' | 'developing' | 'testing' | 'deploying' | 'deployed' | 'failed'
  progress: number
  created_at: string
  updated_at: string
}

export interface Orchestration {
  id: string
  project_id: string
  workflow_config: Record<string, any>
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  estimated_time?: number
  actual_time?: number
  started_at?: string
  completed_at?: string
  created_at: string
}

export interface Agent {
  id: string
  orchestration_id: string
  name: string
  type: 'development' | 'discovery' | 'validation' | 'monitoring' | 'deployment' | 'documentation'
  config: Record<string, any>
  status: 'idle' | 'running' | 'completed' | 'failed' | 'paused'
  token_usage: number
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  project_id: string
  type: 'business_plan' | 'pitch_deck' | 'market_research' | 'financial_model' | 'technical_doc' | 'user_manual'
  template?: string
  data: Record<string, any>
  file_url?: string
  status: 'pending' | 'generating' | 'completed' | 'failed'
  generated_at: string
}