import { Request, Response } from 'express';
import { paymentService, ProcessPaymentParams } from '../../src/services/paymentService';

/**
 * 处理支付接口
 * POST /api/payment/process
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      order_id,
      payment_data,
      verification_code
    } = req.body;

    // 验证必需参数
    if (!order_id || !payment_data) {
      return res.status(400).json({
        error: 'Missing required parameters: order_id, payment_data'
      });
    }

    // 处理支付参数
    const processParams: ProcessPaymentParams = {
      order_id,
      payment_data,
      verification_code
    };

    // 处理支付
    const result = await paymentService.processPayment(processParams);

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.data,
        message: 'Payment processed successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: result.error || 'Payment processing failed'
      });
    }

  } catch (error) {
    console.error('Process payment error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}