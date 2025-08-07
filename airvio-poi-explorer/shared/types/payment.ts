/**
 * Payment System Type Definitions
 * Types for payment processing and order management
 */

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  userId: string;
  merchantId?: string;
  items: PaymentItem[];
  paymentMethod?: PaymentMethodType;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  completedAt?: string;
  cancelledAt?: string;
  metadata?: Record<string, any>;
}

export interface PaymentItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category?: string;
  sku?: string;
  metadata?: Record<string, any>;
}

export interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  enabled: boolean;
  fees: PaymentFees;
  supportedCurrencies: string[];
  minAmount?: number;
  maxAmount?: number;
  processingTime: string;
  description?: string;
  icon?: string;
}

export interface PaymentFees {
  percentage: number;
  fixed: number;
  currency?: string;
}

export interface PaymentProcessRequest {
  orderId: string;
  paymentMethod: PaymentMethodType;
  paymentDetails: PaymentDetails;
  billingAddress?: BillingAddress;
  savePaymentMethod?: boolean;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentDetails {
  // Credit Card
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
  
  // Digital Wallets
  walletToken?: string;
  walletType?: 'paypal' | 'apple_pay' | 'google_pay';
  
  // Bank Transfer
  bankAccount?: string;
  routingNumber?: string;
  
  // Cryptocurrency
  walletAddress?: string;
  cryptoType?: string;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentTransaction {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: PaymentMethodType;
  fees: number;
  netAmount: number;
  gatewayResponse?: GatewayResponse;
  createdAt: string;
  processedAt?: string;
  settledAt?: string;
  metadata?: Record<string, any>;
}

export interface GatewayResponse {
  gatewayTransactionId: string;
  gatewayName: string;
  responseCode: string;
  responseMessage: string;
  authorizationCode?: string;
  avsResult?: string;
  cvvResult?: string;
  riskScore?: number;
}

export interface PaymentRefund {
  refundId: string;
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  reason: string;
  status: RefundStatus;
  requestedBy: string;
  processedAt?: string;
  gatewayRefundId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentWebhook {
  id: string;
  event: PaymentWebhookEvent;
  data: Record<string, any>;
  timestamp: string;
  signature: string;
  processed: boolean;
  retryCount: number;
  nextRetryAt?: string;
}

export interface PaymentAnalytics {
  period: 'day' | 'week' | 'month' | 'year';
  totalRevenue: number;
  totalTransactions: number;
  averageOrderValue: number;
  successRate: number;
  topPaymentMethods: PaymentMethodStats[];
  revenueByDay: RevenueData[];
  refundRate: number;
  chargebackRate: number;
}

export interface PaymentMethodStats {
  method: PaymentMethodType;
  count: number;
  percentage: number;
  revenue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
}

export interface PaymentApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  timestamp: string;
}

export interface PaymentPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Payment Status Types
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired'
  | 'refunded'
  | 'partially_refunded';

export type TransactionStatus = 
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'settled'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type TransactionType = 
  | 'payment'
  | 'refund'
  | 'chargeback'
  | 'fee'
  | 'adjustment';

export type RefundStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type PaymentMethodType = 
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'bank_transfer'
  | 'cryptocurrency'
  | 'cash'
  | 'check';

export type PaymentWebhookEvent = 
  | 'payment.created'
  | 'payment.completed'
  | 'payment.failed'
  | 'payment.cancelled'
  | 'refund.created'
  | 'refund.completed'
  | 'refund.failed'
  | 'chargeback.created'
  | 'subscription.created'
  | 'subscription.cancelled';

// Payment Constants
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY'] as const;
export const DEFAULT_CURRENCY = 'USD';
export const MIN_PAYMENT_AMOUNT = 0.50;
export const MAX_PAYMENT_AMOUNT = 999999.99;
export const PAYMENT_TIMEOUT_MINUTES = 30;
export const REFUND_TIMEOUT_DAYS = 180;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];