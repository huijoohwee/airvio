import { Request, Response } from 'express';
import { paymentService, PaymentMethod, PaymentCallback } from '../../src/services/paymentService';

/**
 * 支付回调接口
 * POST /api/payment/callback/:method
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { method } = req.query;
    const callbackData = req.body;

    // 验证支付方式
    if (!method || !Object.values(PaymentMethod).includes(method as PaymentMethod)) {
      return res.status(400).json({
        error: 'Invalid payment method'
      });
    }

    const paymentMethod = method as PaymentMethod;

    // 验证回调数据
    if (!callbackData) {
      return res.status(400).json({
        error: 'Missing callback data'
      });
    }

    // 根据不同支付方式验证签名
    const isValidSignature = await verifyCallbackSignature(paymentMethod, callbackData);
    if (!isValidSignature) {
      return res.status(401).json({
        error: 'Invalid signature'
      });
    }

    // 处理支付回调
    await paymentService.handlePaymentCallback(paymentMethod, callbackData);

    // 返回成功响应（不同支付方式可能需要不同的响应格式）
    const response = getCallbackResponse(paymentMethod);
    return res.status(200).send(response);

  } catch (error) {
    console.error('Payment callback error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * 验证回调签名
 */
async function verifyCallbackSignature(
  paymentMethod: PaymentMethod,
  callbackData: any
): Promise<boolean> {
  try {
    switch (paymentMethod) {
      case PaymentMethod.WECHAT_PAY:
        return verifyWechatSignature(callbackData);
      case PaymentMethod.ALIPAY:
        return verifyAlipaySignature(callbackData);
      case PaymentMethod.CREDIT_CARD:
        return verifyStripeSignature(callbackData);
      default:
        return false;
    }
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * 验证微信支付签名
 */
function verifyWechatSignature(callbackData: any): boolean {
  // 这里应该实现微信支付的签名验证逻辑
  // 实际项目中需要使用微信提供的签名验证方法
  console.log('Verifying WeChat Pay signature:', callbackData);
  return true; // 模拟验证通过
}

/**
 * 验证支付宝签名
 */
function verifyAlipaySignature(callbackData: any): boolean {
  // 这里应该实现支付宝的签名验证逻辑
  // 实际项目中需要使用支付宝提供的签名验证方法
  console.log('Verifying Alipay signature:', callbackData);
  return true; // 模拟验证通过
}

/**
 * 验证Stripe签名
 */
function verifyStripeSignature(callbackData: any): boolean {
  // 这里应该实现Stripe的签名验证逻辑
  // 实际项目中需要使用Stripe提供的webhook签名验证方法
  console.log('Verifying Stripe signature:', callbackData);
  return true; // 模拟验证通过
}

/**
 * 获取回调响应
 */
function getCallbackResponse(paymentMethod: PaymentMethod): string {
  switch (paymentMethod) {
    case PaymentMethod.WECHAT_PAY:
      return '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
    case PaymentMethod.ALIPAY:
      return 'success';
    case PaymentMethod.CREDIT_CARD:
      return JSON.stringify({ received: true });
    default:
      return 'OK';
  }
}