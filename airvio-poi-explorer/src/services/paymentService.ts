import { supabase } from '../lib/supabase';
import { PaymentOrder } from '../types/database';

// 支付方式枚举
export enum PaymentMethod {
  WECHAT_PAY = 'wechat_pay',
  ALIPAY = 'alipay',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer'
}

// 支付状态枚举
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

// 订单创建参数
export interface CreateOrderParams {
  user_id: string;
  amount: number;
  currency: string;
  description: string;
  payment_method: PaymentMethod;
  metadata?: Record<string, any>;
  callback_url?: string;
  return_url?: string;
}

// 支付处理参数
export interface ProcessPaymentParams {
  order_id: string;
  payment_data: Record<string, any>;
  verification_code?: string;
}

// 支付回调数据
export interface PaymentCallback {
  order_id: string;
  status: PaymentStatus;
  transaction_id?: string;
  amount: number;
  currency: string;
  timestamp: string;
  signature: string;
  metadata?: Record<string, any>;
}

// 退款参数
export interface RefundParams {
  order_id: string;
  amount?: number; // 部分退款金额，不传则全额退款
  reason: string;
}

class PaymentService {
  private webhookHandlers: Map<PaymentMethod, (callback: PaymentCallback) => Promise<void>> = new Map();
  private paymentGateways: Map<PaymentMethod, any> = new Map();

  constructor() {
    this.initializePaymentGateways();
    this.initializeWebhookHandlers();
  }

  /**
   * 初始化支付网关
   */
  private initializePaymentGateways() {
    // 这里可以初始化各种支付网关的SDK
    // 例如：微信支付、支付宝、Stripe等
    
    // 微信支付网关配置
    this.paymentGateways.set(PaymentMethod.WECHAT_PAY, {
      appId: process.env.WECHAT_APP_ID,
      mchId: process.env.WECHAT_MCH_ID,
      apiKey: process.env.WECHAT_API_KEY,
      notifyUrl: process.env.WECHAT_NOTIFY_URL
    });

    // 支付宝网关配置
    this.paymentGateways.set(PaymentMethod.ALIPAY, {
      appId: process.env.ALIPAY_APP_ID,
      privateKey: process.env.ALIPAY_PRIVATE_KEY,
      publicKey: process.env.ALIPAY_PUBLIC_KEY,
      notifyUrl: process.env.ALIPAY_NOTIFY_URL
    });

    // 信用卡支付网关配置（例如Stripe）
    this.paymentGateways.set(PaymentMethod.CREDIT_CARD, {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    });
  }

  /**
   * 初始化Webhook处理器
   */
  private initializeWebhookHandlers() {
    this.webhookHandlers.set(PaymentMethod.WECHAT_PAY, this.handleWechatCallback.bind(this));
    this.webhookHandlers.set(PaymentMethod.ALIPAY, this.handleAlipayCallback.bind(this));
    this.webhookHandlers.set(PaymentMethod.CREDIT_CARD, this.handleStripeCallback.bind(this));
  }

  /**
   * 创建支付订单
   */
  async createOrder(params: CreateOrderParams): Promise<PaymentOrder> {
    try {
      // 生成订单号
      const orderNumber = this.generateOrderNumber();
      
      // 创建订单记录
      const { data, error } = await supabase
        .from('payment_orders')
        .insert({
          order_number: orderNumber,
          user_id: params.user_id,
          amount: params.amount,
          currency: params.currency,
          description: params.description,
          payment_method: params.payment_method,
          status: PaymentStatus.PENDING,
          metadata: params.metadata || {},
          callback_url: params.callback_url,
          return_url: params.return_url
        })
        .select()
        .single();

      if (error) throw error;

      // 根据支付方式创建支付请求
      const paymentData = await this.createPaymentRequest(data, params.payment_method);
      
      // 更新订单的支付数据
      await supabase
        .from('payment_orders')
        .update({ payment_data: paymentData })
        .eq('id', data.id);

      return { ...data, payment_data: paymentData };
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('Order creation failed');
    }
  }

  /**
   * 处理支付
   */
  async processPayment(params: ProcessPaymentParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // 获取订单信息
      const { data: order, error: orderError } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('id', params.order_id)
        .single();

      if (orderError || !order) {
        throw new Error('Order not found');
      }

      if (order.status !== PaymentStatus.PENDING) {
        throw new Error('Order is not in pending status');
      }

      // 更新订单状态为处理中
      await this.updateOrderStatus(params.order_id, PaymentStatus.PROCESSING);

      // 根据支付方式处理支付
      const result = await this.processPaymentByMethod(
        order.payment_method as PaymentMethod,
        order,
        params.payment_data
      );

      if (result.success) {
        // 支付成功，更新订单状态
        await this.updateOrderStatus(params.order_id, PaymentStatus.COMPLETED, {
          transaction_id: result.transaction_id,
          completed_at: new Date().toISOString()
        });
      } else {
        // 支付失败，更新订单状态
        await this.updateOrderStatus(params.order_id, PaymentStatus.FAILED, {
          error_message: result.error
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to process payment:', error);
      
      // 更新订单状态为失败
      await this.updateOrderStatus(params.order_id, PaymentStatus.FAILED, {
        error_message: error.message
      });
      
      return { success: false, error: error.message };
    }
  }

  /**
   * 查询订单状态
   */
  async getOrderStatus(orderId: string): Promise<PaymentOrder | null> {
    try {
      const { data, error } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get order status:', error);
      return null;
    }
  }

  /**
   * 获取用户订单列表
   */
  async getUserOrders(userId: string, limit: number = 20, offset: number = 0): Promise<PaymentOrder[]> {
    try {
      const { data, error } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get user orders:', error);
      return [];
    }
  }

  /**
   * 处理支付回调
   */
  async handlePaymentCallback(paymentMethod: PaymentMethod, callbackData: any): Promise<void> {
    try {
      const handler = this.webhookHandlers.get(paymentMethod);
      if (!handler) {
        throw new Error(`No handler found for payment method: ${paymentMethod}`);
      }

      await handler(callbackData);
    } catch (error) {
      console.error('Failed to handle payment callback:', error);
      throw error;
    }
  }

  /**
   * 申请退款
   */
  async requestRefund(params: RefundParams): Promise<{ success: boolean; refund_id?: string; error?: string }> {
    try {
      // 获取订单信息
      const { data: order, error: orderError } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('id', params.order_id)
        .single();

      if (orderError || !order) {
        throw new Error('Order not found');
      }

      if (order.status !== PaymentStatus.COMPLETED) {
        throw new Error('Only completed orders can be refunded');
      }

      // 计算退款金额
      const refundAmount = params.amount || order.amount;
      if (refundAmount > order.amount) {
        throw new Error('Refund amount cannot exceed order amount');
      }

      // 根据支付方式处理退款
      const result = await this.processRefundByMethod(
        order.payment_method as PaymentMethod,
        order,
        refundAmount,
        params.reason
      );

      if (result.success) {
        // 更新订单状态
        await this.updateOrderStatus(params.order_id, PaymentStatus.REFUNDED, {
          refund_id: result.refund_id,
          refund_amount: refundAmount,
          refund_reason: params.reason,
          refunded_at: new Date().toISOString()
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to request refund:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 生成订单号
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD${timestamp}${random}`;
  }

  /**
   * 创建支付请求
   */
  private async createPaymentRequest(order: PaymentOrder, paymentMethod: PaymentMethod): Promise<any> {
    switch (paymentMethod) {
      case PaymentMethod.WECHAT_PAY:
        return this.createWechatPayRequest(order);
      case PaymentMethod.ALIPAY:
        return this.createAlipayRequest(order);
      case PaymentMethod.CREDIT_CARD:
        return this.createStripeRequest(order);
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
  }

  /**
   * 根据支付方式处理支付
   */
  private async processPaymentByMethod(
    paymentMethod: PaymentMethod,
    order: PaymentOrder,
    paymentData: any
  ): Promise<{ success: boolean; transaction_id?: string; error?: string }> {
    // 这里是模拟实现，实际应该调用真实的支付网关API
    switch (paymentMethod) {
      case PaymentMethod.WECHAT_PAY:
        return this.processWechatPay(order, paymentData);
      case PaymentMethod.ALIPAY:
        return this.processAlipay(order, paymentData);
      case PaymentMethod.CREDIT_CARD:
        return this.processStripe(order, paymentData);
      default:
        return { success: false, error: `Unsupported payment method: ${paymentMethod}` };
    }
  }

  /**
   * 根据支付方式处理退款
   */
  private async processRefundByMethod(
    paymentMethod: PaymentMethod,
    order: PaymentOrder,
    amount: number,
    reason: string
  ): Promise<{ success: boolean; refund_id?: string; error?: string }> {
    // 这里是模拟实现，实际应该调用真实的支付网关退款API
    switch (paymentMethod) {
      case PaymentMethod.WECHAT_PAY:
        return this.processWechatRefund(order, amount, reason);
      case PaymentMethod.ALIPAY:
        return this.processAlipayRefund(order, amount, reason);
      case PaymentMethod.CREDIT_CARD:
        return this.processStripeRefund(order, amount, reason);
      default:
        return { success: false, error: `Unsupported payment method: ${paymentMethod}` };
    }
  }

  /**
   * 更新订单状态
   */
  private async updateOrderStatus(
    orderId: string,
    status: PaymentStatus,
    additionalData: Record<string, any> = {}
  ): Promise<void> {
    try {
      await supabase
        .from('payment_orders')
        .update({
          status,
          ...additionalData,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }

  // 以下是各支付方式的具体实现方法（模拟）
  private async createWechatPayRequest(order: PaymentOrder): Promise<any> {
    return {
      appId: this.paymentGateways.get(PaymentMethod.WECHAT_PAY)?.appId,
      timeStamp: Math.floor(Date.now() / 1000).toString(),
      nonceStr: Math.random().toString(36).substring(2, 15),
      package: `prepay_id=wx${Date.now()}`,
      signType: 'MD5'
    };
  }

  private async createAlipayRequest(order: PaymentOrder): Promise<any> {
    return {
      app_id: this.paymentGateways.get(PaymentMethod.ALIPAY)?.appId,
      method: 'alipay.trade.app.pay',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
  }

  private async createStripeRequest(order: PaymentOrder): Promise<any> {
    return {
      publishableKey: this.paymentGateways.get(PaymentMethod.CREDIT_CARD)?.publishableKey,
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`
    };
  }

  private async processWechatPay(order: PaymentOrder, paymentData: any): Promise<any> {
    // 模拟微信支付处理
    return {
      success: true,
      transaction_id: `wx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
  }

  private async processAlipay(order: PaymentOrder, paymentData: any): Promise<any> {
    // 模拟支付宝支付处理
    return {
      success: true,
      transaction_id: `alipay_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
  }

  private async processStripe(order: PaymentOrder, paymentData: any): Promise<any> {
    // 模拟Stripe支付处理
    return {
      success: true,
      transaction_id: `stripe_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
  }

  private async processWechatRefund(order: PaymentOrder, amount: number, reason: string): Promise<any> {
    return {
      success: true,
      refund_id: `wx_refund_${Date.now()}`
    };
  }

  private async processAlipayRefund(order: PaymentOrder, amount: number, reason: string): Promise<any> {
    return {
      success: true,
      refund_id: `alipay_refund_${Date.now()}`
    };
  }

  private async processStripeRefund(order: PaymentOrder, amount: number, reason: string): Promise<any> {
    return {
      success: true,
      refund_id: `stripe_refund_${Date.now()}`
    };
  }

  // Webhook处理方法
  private async handleWechatCallback(callback: PaymentCallback): Promise<void> {
    // 处理微信支付回调
    console.log('Handling WeChat Pay callback:', callback);
  }

  private async handleAlipayCallback(callback: PaymentCallback): Promise<void> {
    // 处理支付宝回调
    console.log('Handling Alipay callback:', callback);
  }

  private async handleStripeCallback(callback: PaymentCallback): Promise<void> {
    // 处理Stripe回调
    console.log('Handling Stripe callback:', callback);
  }
}

// 导出单例实例
export const paymentService = new PaymentService();
export default paymentService;