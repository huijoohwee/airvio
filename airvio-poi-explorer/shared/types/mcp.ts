/**
 * MCP (Model Context Protocol) Type Definitions
 * Types for MCP plugin system integration
 */

export interface MCPPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  category: string;
  status: 'active' | 'inactive' | 'error';
  health: 'healthy' | 'warning' | 'error';
  config: MCPPluginConfig;
  capabilities: string[];
  installedAt: string;
  updatedAt: string;
}

export interface MCPPluginConfig {
  [key: string]: any;
  enabled: boolean;
  autoStart: boolean;
  priority: number;
  timeout: number;
  retryCount: number;
}

export interface MCPPluginFunction {
  name: string;
  description: string;
  parameters: MCPFunctionParameter[];
  returnType: string;
  examples: MCPFunctionExample[];
}

export interface MCPFunctionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description: string;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];
  };
}

export interface MCPFunctionExample {
  description: string;
  input: Record<string, any>;
  output: any;
}

export interface MCPExecutionRequest {
  pluginId: string;
  function: string;
  parameters: Record<string, any>;
  timeout?: number;
  priority?: 'low' | 'normal' | 'high';
}

export interface MCPExecutionResult {
  success: boolean;
  result?: any;
  error?: string;
  executionTime: number;
  timestamp: string;
}

export interface MCPPluginInstallRequest {
  pluginId: string;
  source: 'registry' | 'url' | 'local';
  location: string;
  config?: Partial<MCPPluginConfig>;
  dependencies?: string[];
}

export interface MCPPluginStatus {
  pluginId: string;
  status: 'active' | 'inactive' | 'error' | 'installing' | 'uninstalling';
  health: 'healthy' | 'warning' | 'error';
  uptime: number;
  lastError?: string;
  metrics: {
    executionCount: number;
    successRate: number;
    averageExecutionTime: number;
    memoryUsage: number;
  };
}

export interface MCPApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  timestamp: string;
}

export interface MCPPluginRegistry {
  plugins: MCPPlugin[];
  total: number;
  categories: string[];
  featured: string[];
}

export interface MCPWebhookEvent {
  type: 'plugin.installed' | 'plugin.uninstalled' | 'plugin.error' | 'function.executed';
  pluginId: string;
  timestamp: string;
  data: Record<string, any>;
}

// MCP Protocol Constants
export const MCP_PROTOCOL_VERSION = '1.0.0';
export const MCP_SUPPORTED_FORMATS = ['json', 'yaml', 'xml'] as const;
export const MCP_EXECUTION_PRIORITIES = ['low', 'normal', 'high'] as const;
export const MCP_PLUGIN_CATEGORIES = [
  'ai-tools',
  'data-processing',
  'integrations',
  'utilities',
  'analytics',
  'communication',
  'security',
  'development'
] as const;

export type MCPFormat = typeof MCP_SUPPORTED_FORMATS[number];
export type MCPExecutionPriority = typeof MCP_EXECUTION_PRIORITIES[number];
export type MCPPluginCategory = typeof MCP_PLUGIN_CATEGORIES[number];