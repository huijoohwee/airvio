import { Request, Response } from 'express';
import { paymentService, CreateOrderParams, PaymentMethod } from '../../src/services/paymentService';
import { supabase } from '../../src/lib/supabase';

/**
 * 创建支付订单接口
 * POST /api/payment/create-order
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      user_id,
      amount,
      currency = 'CNY',
      description,
      payment_method,
      metadata,
      callback_url,
      return_url
    } = req.body;

    // 验证必需参数
    if (!user_id || !amount || !description || !payment_method) {
      return res.status(400).json({
        error: 'Missing required parameters: user_id, amount, description, payment_method'
      });
    }

    // 验证金额
    if (amount <= 0) {
      return res.status(400).json({
        error: 'Amount must be greater than 0'
      });
    }

    // 验证支付方式
    if (!Object.values(PaymentMethod).includes(payment_method)) {
      return res.status(400).json({
        error: 'Invalid payment method'
      });
    }

    // 验证用户是否存在
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // 创建订单参数
    const orderParams: CreateOrderParams = {
      user_id,
      amount,
      currency,
      description,
      payment_method,
      metadata,
      callback_url,
      return_url
    };

    // 创建订单
    const order = await paymentService.createOrder(orderParams);

    return res.status(201).json({
      success: true,
      data: {
        order_id: order.id,
        order_number: order.order_number,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        payment_data: order.payment_data,
        created_at: order.created_at
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}