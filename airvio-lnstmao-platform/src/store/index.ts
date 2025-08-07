/**
 * 全局状态管理 - 使用 Zustand
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 用户状态接口
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
}

// 项目状态接口
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'stopped' | 'error';
  created_at: string;
  updated_at: string;
  agent_count?: number;
  orchestration_count?: number;
  mvp_config?: {
    type: string;
    [key: string]: any;
  };
}

// 智能体状态接口
interface Agent {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'running' | 'stopped' | 'error' | 'idle' | 'active' | 'busy';
  created_at: string;
  updated_at: string;
  config?: Record<string, any>;
  project_id?: string;
  task_count?: number;
  version?: string;
  last_active_at?: string;
  cpu_usage?: number;
  memory_usage?: number;
}

// 编排状态接口
interface Orchestration {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  project_id: string;
  project_name?: string;
  workflow: Record<string, any>;
  started_at?: string;
  completed_at?: string;
  next_execution_at?: string;
  last_execution_at?: string;
  type?: string;
  trigger?: string;
  created_at?: string;
  updated_at?: string;
  task_count?: number;
  execution_count?: number;
  agent_count?: number;
}

// 文档状态接口
export interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

// 动态字段接口
export interface DynamicField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect';
  label: string;
  description?: string;
  required: boolean;
  default_value?: any;
  options?: string[];
  validation_rules?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// 应用状态接口
interface AppState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;
  
  // 项目状态
  projects: Project[];
  currentProject: Project | null;
  recentProjects: Project[];
  
  // 智能体状态
  agents: Agent[];
  
  // 编排状态
  orchestrations: Orchestration[];
  currentOrchestration: Orchestration | null;
  recentOrchestrations: Orchestration[];
  notifications: any[];
  
  // UI状态
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  
  // 实时监控数据
  systemStats: {
    totalProjects: number;
    activeProjects: number;
    activeAgents: number;
    runningAgents: number;
    runningOrchestrations: number;
    errorCount: number;
    todayTasks: number;
  };
}

// 应用操作接口
interface AppActions {
  // 用户操作
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // 项目操作
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  fetchRecentProjects: () => void;
  
  // 智能体操作
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  
  // 编排操作
  setOrchestrations: (orchestrations: Orchestration[]) => void;
  setCurrentOrchestration: (orchestration: Orchestration | null) => void;
  addOrchestration: (orchestration: Orchestration) => void;
  updateOrchestration: (id: string, updates: Partial<Orchestration>) => void;
  deleteOrchestration: (id: string) => void;
  fetchRecentOrchestrations: () => void;
  
  // 文档操作
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  
  // 动态字段操作
  setDynamicFields: (fields: DynamicField[]) => void;
  addDynamicField: (field: DynamicField) => void;
  updateDynamicField: (id: string, updates: Partial<DynamicField>) => void;
  deleteDynamicField: (id: string) => void;
  
  // UI操作
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 系统统计
  updateSystemStats: (stats: Partial<AppState['systemStats']>) => void;
  
  // 数据获取
  fetchProjects: () => Promise<void>;
  fetchAgents: (projectId?: string) => Promise<void>;
  fetchOrchestrations: (projectId?: string) => Promise<void>;
  fetchSystemStats: () => Promise<void>;
}

// 创建状态store
export const useAppStore = create<AppState & AppActions>()(devtools(
  (set, get) => ({
    // 初始状态
    user: null,
    isAuthenticated: false,
    projects: [],
    currentProject: null,
    recentProjects: [],
    agents: [],
    orchestrations: [],
    currentOrchestration: null,
    recentOrchestrations: [],
    notifications: [],
    sidebarCollapsed: false,
    theme: 'light',
    loading: false,
    systemStats: {
      totalProjects: 0,
      activeProjects: 0,
      activeAgents: 0,
      runningAgents: 0,
      runningOrchestrations: 0,
      errorCount: 0,
      todayTasks: 0
    },
    
    // 用户操作
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    
    login: async (email, password) => {
      set({ loading: true });
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
          const data = await response.json();
          set({ user: data.user, isAuthenticated: true, loading: false });
          return true;
        } else {
          set({ loading: false });
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        set({ loading: false });
        return false;
      }
    },
    
    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
        projects: [],
        currentProject: null,
        agents: [],
        orchestrations: [],
        currentOrchestration: null
      });
    },
    
    // 项目操作
    setProjects: (projects) => set({ projects }),
    setCurrentProject: (currentProject) => set({ currentProject }),
    
    fetchRecentProjects: () => {
      const { projects } = get();
      const recent = projects.slice(0, 5);
      set({ recentProjects: recent });
    },
    
    addProject: (project) => set((state) => ({
      projects: [...state.projects, project]
    })),
    
    updateProject: (id, updates) => set((state) => ({
      projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
      currentProject: state.currentProject?.id === id 
        ? { ...state.currentProject, ...updates } 
        : state.currentProject
    })),
    
    deleteProject: (id) => set((state) => ({
      projects: state.projects.filter(p => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject
    })),
    
    // 智能体操作
    setAgents: (agents) => set({ agents }),
    
    addAgent: (agent) => set((state) => ({
      agents: [...state.agents, agent]
    })),
    
    updateAgent: (id, updates) => set((state) => ({
      agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
    })),
    
    deleteAgent: (id) => set((state) => ({
      agents: state.agents.filter(a => a.id !== id)
    })),
    
    // 编排操作
    setOrchestrations: (orchestrations) => set({ orchestrations }),
    setCurrentOrchestration: (currentOrchestration) => set({ currentOrchestration }),
    
    addOrchestration: (orchestration) => set((state) => ({
      orchestrations: [...state.orchestrations, orchestration]
    })),
    
    updateOrchestration: (id, updates) => set((state) => ({
      orchestrations: state.orchestrations.map(o => o.id === id ? { ...o, ...updates } : o),
      currentOrchestration: state.currentOrchestration?.id === id 
        ? { ...state.currentOrchestration, ...updates } 
        : state.currentOrchestration
    })),
    
    deleteOrchestration: (id) => set((state) => ({
      orchestrations: state.orchestrations.filter(o => o.id !== id),
      currentOrchestration: state.currentOrchestration?.id === id ? null : state.currentOrchestration
    })),
    
    fetchRecentOrchestrations: () => {
      const { orchestrations } = get();
      const recent = orchestrations.slice(0, 5);
      set({ recentOrchestrations: recent });
    },
    
    // UI操作
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    setTheme: (theme) => set({ theme }),
    setLoading: (loading) => set({ loading }),
    
    // 系统统计
    updateSystemStats: (stats) => set((state) => ({
      systemStats: { ...state.systemStats, ...stats }
    })),
    
    // 数据获取
    fetchProjects: async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          set({ projects: data.data || [] });
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    },
    
    fetchAgents: async (projectId) => {
      try {
        const url = projectId ? `/api/agents?project_id=${projectId}` : '/api/agents';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          set({ agents: data.data || [] });
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    },
    
    fetchOrchestrations: async (projectId) => {
      try {
        const url = projectId ? `/api/orchestrations?project_id=${projectId}` : '/api/orchestrations';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          set({ orchestrations: data.data || [] });
        }
      } catch (error) {
        console.error('Failed to fetch orchestrations:', error);
      }
    },
    
    fetchSystemStats: async () => {
      try {
        const response = await fetch('/api/monitoring/overview');
        if (response.ok) {
          const data = await response.json();
          const stats = data.data;
          set({
            systemStats: {
              totalProjects: stats.projects?.total || 0,
              activeProjects: stats.projects?.active || 0,
              activeAgents: stats.agents?.active || 0,
              runningAgents: stats.agents?.running || 0,
              runningOrchestrations: stats.orchestrations?.running || 0,
              errorCount: stats.agents?.error || 0,
              todayTasks: stats.tasks?.today || 0
            }
          });
        }
      } catch (error) {
        console.error('Failed to fetch system stats:', error);
      }
    }
  }),
  {
    name: 'airvio-platform-store'
  }
));

// 导出类型
export type { User, Project, Agent, Orchestration, AppState, AppActions };