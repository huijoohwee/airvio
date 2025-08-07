import { Request, Response } from 'express';
import { paymentService, RefundParams } from '../../src/services/paymentService';

/**
 * 申请退款接口
 * POST /api/payment/refund
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      order_id,
      amount,
      reason
    } = req.body;

    // 验证必需参数
    if (!order_id || !reason) {
      return res.status(400).json({
        error: 'Missing required parameters: order_id, reason'
      });
    }

    // 验证退款金额（如果提供）
    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({
        error: 'Refund amount must be greater than 0'
      });
    }

    // 退款参数
    const refundParams: RefundParams = {
      order_id,
      amount,
      reason
    };

    // 处理退款
    const result = await paymentService.requestRefund(refundParams);

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: {
          refund_id: result.refund_id,
          message: 'Refund request submitted successfully'
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        error: result.error || 'Refund request failed'
      });
    }

  } catch (error) {
    console.error('Refund request error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}