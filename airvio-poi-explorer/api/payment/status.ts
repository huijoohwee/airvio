import { Request, Response } from 'express';
import { paymentService } from '../../src/services/paymentService';

/**
 * 查询订单状态接口
 * GET /api/payment/status/:orderId
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId } = req.query;

    // 验证订单ID
    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid order ID'
      });
    }

    // 查询订单状态
    const order = await paymentService.getOrderStatus(orderId);

    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    // 返回订单信息（隐藏敏感数据）
    const orderInfo = {
      id: order.id,
      order_number: order.order_number,
      amount: order.amount,
      currency: order.currency,
      description: order.description,
      status: order.status,
      payment_method: order.payment_method,
      created_at: order.created_at,
      updated_at: order.updated_at,
      completed_at: order.completed_at,
      metadata: order.metadata
    };

    return res.status(200).json({
      success: true,
      data: orderInfo
    });

  } catch (error) {
    console.error('Get order status error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}