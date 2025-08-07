/**
 * API Client for MCP Protocol and Payment System
 * Provides convenient methods for frontend integration
 */

import type {
  MCPPlugin,
  MCPPluginInstallRequest,
  MCPExecutionRequest,
  MCPExecutionResult,
  MCPPluginStatus,
  MCPApiResponse
} from '../../shared/types/mcp.js';

import type {
  PaymentOrder,
  PaymentProcessRequest,
  PaymentTransaction,
  PaymentRefund,
  PaymentMethod,
  PaymentApiResponse,
  PaymentAnalytics
} from '../../shared/types/payment.js';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // MCP Protocol API methods
  mcp = {
    // Get all available plugins
    getPlugins: async (): Promise<MCPApiResponse<{ plugins: MCPPlugin[]; total: number }>> => {
      return this.request('/api/mcp/plugins');
    },

    // Install a new plugin
    installPlugin: async (request: MCPPluginInstallRequest): Promise<MCPApiResponse<MCPPlugin>> => {
      return this.request('/api/mcp/plugins/install', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    },

    // Update plugin configuration
    updatePluginConfig: async (
      pluginId: string,
      config: Record<string, any>
    ): Promise<MCPApiResponse<MCPPlugin>> => {
      return this.request(`/api/mcp/plugins/${pluginId}/config`, {
        method: 'PUT',
        body: JSON.stringify({ config }),
      });
    },

    // Execute plugin function
    executeFunction: async (request: MCPExecutionRequest): Promise<MCPApiResponse<MCPExecutionResult>> => {
      return this.request(`/api/mcp/plugins/${request.pluginId}/execute`, {
        method: 'POST',
        body: JSON.stringify({
          function: request.function,
          parameters: request.parameters,
          timeout: request.timeout,
          priority: request.priority,
        }),
      });
    },

    // Get plugin status
    getPluginStatus: async (pluginId: string): Promise<MCPApiResponse<MCPPluginStatus>> => {
      return this.request(`/api/mcp/plugins/${pluginId}/status`);
    },

    // Uninstall plugin
    uninstallPlugin: async (pluginId: string): Promise<MCPApiResponse<{ pluginId: string; status: string }>> => {
      return this.request(`/api/mcp/plugins/${pluginId}`, {
        method: 'DELETE',
      });
    },
  };

  // Payment System API methods
  payment = {
    // Create payment order
    createOrder: async (orderData: {
      amount: number;
      currency?: string;
      description: string;
      userId: string;
      merchantId?: string;
      items: any[];
    }): Promise<PaymentApiResponse<PaymentOrder>> => {
      return this.request('/api/payment/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },

    // Process payment
    processPayment: async (request: PaymentProcessRequest): Promise<PaymentApiResponse<PaymentTransaction>> => {
      return this.request('/api/payment/process', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    },

    // Get payment status
    getOrderStatus: async (orderId: string): Promise<PaymentApiResponse<PaymentOrder>> => {
      return this.request(`/api/payment/orders/${orderId}/status`);
    },

    // Process refund
    processRefund: async (refundData: {
      orderId: string;
      transactionId: string;
      amount: number;
      reason: string;
    }): Promise<PaymentApiResponse<PaymentRefund>> => {
      return this.request('/api/payment/refund', {
        method: 'POST',
        body: JSON.stringify(refundData),
      });
    },

    // Get transaction history
    getTransactions: async (params: {
      userId?: string;
      page?: number;
      limit?: number;
      status?: string;
    } = {}): Promise<PaymentApiResponse<{
      transactions: PaymentTransaction[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>> => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
      
      const queryString = queryParams.toString();
      const endpoint = queryString ? `/api/payment/transactions?${queryString}` : '/api/payment/transactions';
      
      return this.request(endpoint);
    },

    // Get available payment methods
    getPaymentMethods: async (): Promise<PaymentApiResponse<{ methods: PaymentMethod[] }>> => {
      return this.request('/api/payment/methods');
    },

    // Cancel payment order
    cancelOrder: async (orderId: string): Promise<PaymentApiResponse<PaymentOrder>> => {
      return this.request(`/api/payment/orders/${orderId}`, {
        method: 'DELETE',
      });
    },

    // Get payment analytics (for merchants)
    getAnalytics: async (params: {
      period?: 'day' | 'week' | 'month' | 'year';
      startDate?: string;
      endDate?: string;
    } = {}): Promise<PaymentApiResponse<PaymentAnalytics>> => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
      
      const queryString = queryParams.toString();
      const endpoint = queryString ? `/api/payment/analytics?${queryString}` : '/api/payment/analytics';
      
      return this.request(endpoint);
    },
  };

  // Health check methods
  health = {
    // Check API health
    check: async (): Promise<{ success: boolean; message: string }> => {
      return this.request('/api/health');
    },

    // Check MCP system health
    checkMCP: async (): Promise<MCPApiResponse<{ status: string; plugins: number }>> => {
      return this.request('/api/mcp/health');
    },

    // Check payment system health
    checkPayment: async (): Promise<PaymentApiResponse<{ status: string; gateways: Record<string, boolean> }>> => {
      return this.request('/api/payment/health');
    },
  };
}

// Create and export a default instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export { ApiClient };

// Utility functions for common operations
export const mcpUtils = {
  // Format plugin execution result for display
  formatExecutionResult: (result: MCPExecutionResult): string => {
    if (result.success) {
      return `Execution completed in ${result.executionTime}ms`;
    } else {
      return `Execution failed: ${result.error}`;
    }
  },

  // Check if plugin is healthy
  isPluginHealthy: (status: MCPPluginStatus): boolean => {
    return status.status === 'active' && status.health === 'healthy';
  },

  // Get plugin performance rating
  getPluginPerformance: (status: MCPPluginStatus): 'excellent' | 'good' | 'fair' | 'poor' => {
    const { successRate, averageExecutionTime } = status.metrics;
    
    if (successRate >= 0.95 && averageExecutionTime < 1000) return 'excellent';
    if (successRate >= 0.90 && averageExecutionTime < 2000) return 'good';
    if (successRate >= 0.80 && averageExecutionTime < 5000) return 'fair';
    return 'poor';
  },
};

export const paymentUtils = {
  // Format currency amount
  formatAmount: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  // Calculate total with fees
  calculateTotal: (amount: number, fees: { percentage: number; fixed: number }): number => {
    return amount + (amount * fees.percentage / 100) + fees.fixed;
  },

  // Get payment status color
  getStatusColor: (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      completed: '#10b981',
      failed: '#ef4444',
      cancelled: '#6b7280',
      refunded: '#8b5cf6',
    };
    return colors[status] || '#6b7280';
  },

  // Validate payment amount
  validateAmount: (amount: number, min: number = 0.50, max: number = 999999.99): boolean => {
    return amount >= min && amount <= max;
  },
};