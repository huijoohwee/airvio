/**
 * Integration Configuration
 * Configuration for MCP Protocol and Payment System integrations
 */

import type { MCPPluginConfig } from '../types/mcp.js';
import type { PaymentMethod } from '../types/payment.js';

// MCP Protocol Configuration
export const MCP_CONFIG = {
  // Protocol Settings
  protocol: {
    version: '1.0.0',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
  
  // Plugin Registry Settings
  registry: {
    url: process.env.MCP_REGISTRY_URL || 'https://registry.mcp.dev',
    apiKey: process.env.MCP_REGISTRY_API_KEY,
    cacheTtl: 3600000, // 1 hour
  },
  
  // Plugin Execution Settings
  execution: {
    maxConcurrent: 10,
    defaultTimeout: 15000, // 15 seconds
    memoryLimit: 512, // MB
    cpuLimit: 80, // percentage
  },
  
  // Security Settings
  security: {
    allowedOrigins: ['localhost', '127.0.0.1'],
    requireSignature: true,
    encryptionKey: process.env.MCP_ENCRYPTION_KEY,
  },
  
  // Default Plugin Configuration
  defaultPluginConfig: {
    enabled: true,
    autoStart: false,
    priority: 5,
    timeout: 15000,
    retryCount: 2,
  } as MCPPluginConfig,
  
  // Featured Plugins
  featuredPlugins: [
    'ai-assistant',
    'data-analyzer',
    'image-processor',
    'text-translator',
    'weather-service'
  ],
} as const;

// Payment System Configuration
export const PAYMENT_CONFIG = {
  // General Settings
  general: {
    defaultCurrency: 'USD',
    minAmount: 0.50,
    maxAmount: 999999.99,
    orderTimeout: 1800000, // 30 minutes
    refundWindow: 15552000000, // 180 days
  },
  
  // Gateway Settings
  gateways: {
    stripe: {
      enabled: !!process.env.STRIPE_SECRET_KEY,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      apiVersion: '2023-10-16',
    },
    paypal: {
      enabled: !!process.env.PAYPAL_CLIENT_ID,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
    },
    square: {
      enabled: !!process.env.SQUARE_ACCESS_TOKEN,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      applicationId: process.env.SQUARE_APPLICATION_ID,
      environment: process.env.SQUARE_ENVIRONMENT || 'sandbox',
    },
  },
  
  // Security Settings
  security: {
    encryptionKey: process.env.PAYMENT_ENCRYPTION_KEY,
    hashAlgorithm: 'sha256',
    tokenExpiry: 3600000, // 1 hour
    maxRetries: 3,
  },
  
  // Webhook Settings
  webhooks: {
    retryAttempts: 5,
    retryDelay: 2000, // 2 seconds
    timeout: 10000, // 10 seconds
    verifySignature: true,
  },
  
  // Fee Configuration
  fees: {
    creditCard: { percentage: 2.9, fixed: 0.30 },
    debitCard: { percentage: 2.6, fixed: 0.30 },
    paypal: { percentage: 3.49, fixed: 0.49 },
    applePay: { percentage: 2.9, fixed: 0.30 },
    googlePay: { percentage: 2.9, fixed: 0.30 },
    bankTransfer: { percentage: 0.8, fixed: 0.00 },
  },
  
  // Supported Payment Methods
  supportedMethods: [
    {
      id: 'credit_card',
      name: 'Credit Card',
      enabled: true,
      fees: { percentage: 2.9, fixed: 0.30 },
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
      processingTime: 'Instant',
      description: 'Pay with Visa, Mastercard, or American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      enabled: true,
      fees: { percentage: 3.49, fixed: 0.49 },
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      processingTime: 'Instant',
      description: 'Pay securely with your PayPal account'
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      enabled: true,
      fees: { percentage: 2.9, fixed: 0.30 },
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
      processingTime: 'Instant',
      description: 'Pay with Touch ID or Face ID'
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      enabled: true,
      fees: { percentage: 2.9, fixed: 0.30 },
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
      processingTime: 'Instant',
      description: 'Pay with your Google account'
    }
  ] as PaymentMethod[],
} as const;

// Integration Health Check Configuration
export const HEALTH_CHECK_CONFIG = {
  mcp: {
    enabled: true,
    interval: 60000, // 1 minute
    timeout: 5000, // 5 seconds
    endpoints: [
      '/api/mcp/plugins',
      '/api/mcp/plugins/status'
    ],
  },
  payment: {
    enabled: true,
    interval: 30000, // 30 seconds
    timeout: 5000, // 5 seconds
    endpoints: [
      '/api/payment/methods',
      '/api/payment/orders/health'
    ],
  },
} as const;

// Environment-specific Configuration
export const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  const configs = {
    development: {
      mcp: {
        ...MCP_CONFIG,
        security: {
          ...MCP_CONFIG.security,
          requireSignature: false,
        },
      },
      payment: {
        ...PAYMENT_CONFIG,
        general: {
          ...PAYMENT_CONFIG.general,
          minAmount: 0.01, // Lower minimum for testing
        },
      },
    },
    production: {
      mcp: {
        ...MCP_CONFIG,
        execution: {
          ...MCP_CONFIG.execution,
          maxConcurrent: 50,
          memoryLimit: 1024,
        },
      },
      payment: {
        ...PAYMENT_CONFIG,
        security: {
          ...PAYMENT_CONFIG.security,
          maxRetries: 5,
        },
      },
    },
    test: {
      mcp: {
        ...MCP_CONFIG,
        protocol: {
          ...MCP_CONFIG.protocol,
          timeout: 5000,
        },
      },
      payment: {
        ...PAYMENT_CONFIG,
        general: {
          ...PAYMENT_CONFIG.general,
          orderTimeout: 60000, // 1 minute for testing
        },
      },
    },
  };
  
  return configs[env as keyof typeof configs] || configs.development;
};

// Export environment-specific configuration
export const ENV_CONFIG = getEnvironmentConfig();

// Utility functions for configuration validation
export const validateMCPConfig = (config: Partial<typeof MCP_CONFIG>) => {
  const errors: string[] = [];
  
  if (config.protocol?.timeout && config.protocol.timeout < 1000) {
    errors.push('MCP protocol timeout must be at least 1000ms');
  }
  
  if (config.execution?.maxConcurrent && config.execution.maxConcurrent < 1) {
    errors.push('MCP max concurrent executions must be at least 1');
  }
  
  return errors;
};

export const validatePaymentConfig = (config: Partial<typeof PAYMENT_CONFIG>) => {
  const errors: string[] = [];
  
  if (config.general?.minAmount && config.general.minAmount < 0) {
    errors.push('Payment minimum amount must be non-negative');
  }
  
  if (config.general?.maxAmount && config.general?.minAmount && 
      config.general.maxAmount < config.general.minAmount) {
    errors.push('Payment maximum amount must be greater than minimum amount');
  }
  
  return errors;
};