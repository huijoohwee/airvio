/**
 * MCP协议和支付系统集成测试
 * 验证接口的可用性、扩展性和错误处理
 */

import { describe, test, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { MCPService } from '../src/services/mcpService';
import { PaymentService } from '../src/services/paymentService';

// 模拟Supabase客户端
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: { id: 'test_log_id' }, error: null }),
      select: jest.fn().mockResolvedValue({ data: [{ id: 'test_user' }], error: null })
    }))
  }
}));

describe('MCP协议接口测试', () => {
  let mcpService: MCPService;

  beforeAll(() => {
    mcpService = new MCPService();
  });

  describe('插件管理', () => {
    test('应该能够注册新插件', async () => {
      const plugin = {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
        capabilities: ['search_flights', 'get_weather']
      };

      const result = await mcpService.registerPlugin(plugin);
      expect(result.success).toBe(true);
      expect(result.plugin_id).toBe('test-plugin');
    });

    test('应该能够连接到插件', async () => {
      const connectionResult = await mcpService.connectPlugin('test-plugin', {
        api_key: 'test-key',
        endpoint: 'https://test-api.com'
      });

      expect(connectionResult.success).toBe(true);
      expect(connectionResult.connection_id).toBeDefined();
    });

    test('应该能够断开插件连接', async () => {
      const disconnectResult = await mcpService.disconnectPlugin('test-plugin');
      expect(disconnectResult.success).toBe(true);
    });
  });

  describe('消息传递', () => {
    test('应该能够发送航班搜索消息', async () => {
      const message = {
        type: 'data.exchange' as const,
        action: 'search_flights',
        payload: {
          origin: 'PEK',
          destination: 'SHA',
          departure_date: '2024-02-01'
        }
      };

      const result = await mcpService.sendMessage(message);
      expect(result.success).toBe(true);
      expect(result.data.flights).toBeDefined();
      expect(Array.isArray(result.data.flights)).toBe(true);
    });

    test('应该能够发送天气查询消息', async () => {
      const message = {
        type: 'data.exchange' as const,
        action: 'get_weather',
        payload: {
          location: '北京市'
        }
      };

      const result = await mcpService.sendMessage(message);
      expect(result.success).toBe(true);
      expect(result.data.temperature).toBeDefined();
      expect(result.data.description).toBeDefined();
    });

    test('应该能够发送货币转换消息', async () => {
      const message = {
        type: 'data.exchange' as const,
        action: 'convert_currency',
        payload: {
          from: 'USD',
          to: 'CNY',
          amount: 100
        }
      };

      const result = await mcpService.sendMessage(message);
      expect(result.success).toBe(true);
      expect(result.data.converted_amount).toBeDefined();
      expect(result.data.rate).toBeDefined();
    });

    test('应该正确处理无效的消息类型', async () => {
      const message = {
        type: 'data.exchange' as const,
        action: 'invalid_action',
        payload: {}
      };

      const result = await mcpService.sendMessage(message);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unsupported action');
    });
  });

  describe('状态查询', () => {
    test('应该能够查询插件状态', async () => {
      const message = {
        type: 'status.query' as const,
        plugin_id: 'test-plugin'
      };

      const result = await mcpService.sendMessage(message);
      expect(result.success).toBe(true);
      expect(result.data.status).toBeDefined();
    });
  });
});

describe('支付系统接口测试', () => {
  let paymentService: PaymentService;

  beforeAll(() => {
    paymentService = new PaymentService();
  });

  describe('订单创建', () => {
    test('应该能够创建微信支付订单', async () => {
      const orderParams = {
        user_id: 'test_user_123',
        amount: 9900, // 99.00元
        currency: 'CNY',
        description: '测试订单',
        payment_method: 'wechat_pay' as const
      };

      const result = await paymentService.createOrder(orderParams);
      expect(result.success).toBe(true);
      expect(result.order_id).toBeDefined();
      expect(result.order_number).toBeDefined();
      expect(result.amount).toBe(9900);
      expect(result.status).toBe('pending');
    });

    test('应该能够创建支付宝订单', async () => {
      const orderParams = {
        user_id: 'test_user_123',
        amount: 5000,
        currency: 'CNY',
        description: '支付宝测试订单',
        payment_method: 'alipay' as const
      };

      const result = await paymentService.createOrder(orderParams);
      expect(result.success).toBe(true);
      expect(result.payment_data.qr_code).toBeDefined();
    });

    test('应该能够创建信用卡订单', async () => {
      const orderParams = {
        user_id: 'test_user_123',
        amount: 10000,
        currency: 'USD',
        description: '信用卡测试订单',
        payment_method: 'credit_card' as const
      };

      const result = await paymentService.createOrder(orderParams);
      expect(result.success).toBe(true);
      expect(result.currency).toBe('USD');
    });

    test('应该拒绝无效的订单参数', async () => {
      const invalidParams = {
        user_id: '',
        amount: -100,
        currency: 'CNY',
        description: '',
        payment_method: 'invalid_method' as any
      };

      await expect(paymentService.createOrder(invalidParams))
        .rejects.toThrow('Invalid order parameters');
    });
  });

  describe('支付处理', () => {
    let testOrderId: string;

    beforeAll(async () => {
      const order = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 1000,
        currency: 'CNY',
        description: '处理测试订单',
        payment_method: 'wechat_pay'
      });
      testOrderId = order.order_id;
    });

    test('应该能够处理微信支付', async () => {
      const paymentParams = {
        order_id: testOrderId,
        payment_data: {
          payment_code: 'wx_test_code_123',
          user_openid: 'test_openid'
        }
      };

      const result = await paymentService.processPayment(paymentParams);
      expect(result.success).toBe(true);
      expect(result.transaction_id).toBeDefined();
    });

    test('应该能够处理支付宝支付', async () => {
      const alipayOrder = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 2000,
        currency: 'CNY',
        description: '支付宝处理测试',
        payment_method: 'alipay'
      });

      const paymentParams = {
        order_id: alipayOrder.order_id,
        payment_data: {
          auth_code: 'alipay_auth_123',
          user_id: 'alipay_user_123'
        }
      };

      const result = await paymentService.processPayment(paymentParams);
      expect(result.success).toBe(true);
    });

    test('应该能够处理信用卡支付', async () => {
      const cardOrder = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 5000,
        currency: 'USD',
        description: '信用卡处理测试',
        payment_method: 'credit_card'
      });

      const paymentParams = {
        order_id: cardOrder.order_id,
        payment_data: {
          card_number: '4111111111111111',
          expiry_month: '12',
          expiry_year: '2025',
          cvv: '123'
        }
      };

      const result = await paymentService.processPayment(paymentParams);
      expect(result.success).toBe(true);
    });
  });

  describe('订单状态查询', () => {
    test('应该能够查询存在的订单状态', async () => {
      const order = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 1500,
        currency: 'CNY',
        description: '状态查询测试',
        payment_method: 'wechat_pay'
      });

      const status = await paymentService.getOrderStatus(order.order_id);
      expect(status.id).toBe(order.order_id);
      expect(status.amount).toBe(1500);
      expect(status.status).toBeDefined();
    });

    test('应该正确处理不存在的订单', async () => {
      await expect(paymentService.getOrderStatus('non_existent_order'))
        .rejects.toThrow('Order not found');
    });
  });

  describe('退款处理', () => {
    let completedOrderId: string;

    beforeAll(async () => {
      const order = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 3000,
        currency: 'CNY',
        description: '退款测试订单',
        payment_method: 'wechat_pay'
      });

      await paymentService.processPayment({
        order_id: order.order_id,
        payment_data: { payment_code: 'test_code' }
      });

      completedOrderId = order.order_id;
    });

    test('应该能够申请全额退款', async () => {
      const refundParams = {
        order_id: completedOrderId,
        reason: '用户取消订单'
      };

      const result = await paymentService.requestRefund(refundParams);
      expect(result.success).toBe(true);
      expect(result.refund_id).toBeDefined();
    });

    test('应该能够申请部分退款', async () => {
      const partialOrder = await paymentService.createOrder({
        user_id: 'test_user_123',
        amount: 5000,
        currency: 'CNY',
        description: '部分退款测试',
        payment_method: 'alipay'
      });

      await paymentService.processPayment({
        order_id: partialOrder.order_id,
        payment_data: { auth_code: 'test_auth' }
      });

      const refundParams = {
        order_id: partialOrder.order_id,
        amount: 2000, // 部分退款
        reason: '部分服务取消'
      };

      const result = await paymentService.requestRefund(refundParams);
      expect(result.success).toBe(true);
    });
  });

  describe('支付回调处理', () => {
    test('应该能够处理微信支付回调', async () => {
      const callbackData = {
        order_id: 'test_order_123',
        transaction_id: 'wx_trans_123',
        status: 'success',
        amount: 1000,
        signature: 'test_signature'
      };

      const result = await paymentService.handlePaymentCallback('wechat_pay', callbackData);
      expect(result.success).toBe(true);
    });

    test('应该能够处理支付宝回调', async () => {
      const callbackData = {
        order_id: 'test_order_456',
        trade_no: 'alipay_trade_456',
        trade_status: 'TRADE_SUCCESS',
        total_amount: '20.00',
        sign: 'test_sign'
      };

      const result = await paymentService.handlePaymentCallback('alipay', callbackData);
      expect(result.success).toBe(true);
    });

    test('应该拒绝无效的回调签名', async () => {
      const invalidCallbackData = {
        order_id: 'test_order_789',
        transaction_id: 'invalid_trans',
        status: 'success',
        amount: 1000,
        signature: 'invalid_signature'
      };

      const result = await paymentService.handlePaymentCallback('wechat_pay', invalidCallbackData);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid signature');
    });
  });
});

describe('集成测试', () => {
  let mcpService: MCPService;
  let paymentService: PaymentService;

  beforeAll(() => {
    mcpService = new MCPService();
    paymentService = new PaymentService();
  });

  test('完整的旅游预订流程', async () => {
    // 1. 搜索航班
    const flightSearch = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'search_flights',
      payload: {
        origin: 'PEK',
        destination: 'SHA',
        departure_date: '2024-03-01'
      }
    });

    expect(flightSearch.success).toBe(true);
    expect(flightSearch.data.flights.length).toBeGreaterThan(0);

    // 2. 获取天气信息
    const weather = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'get_weather',
      payload: { location: '上海市' }
    });

    expect(weather.success).toBe(true);
    expect(weather.data.temperature).toBeDefined();

    // 3. 创建订单
    const selectedFlight = flightSearch.data.flights[0];
    const order = await paymentService.createOrder({
      user_id: 'integration_test_user',
      amount: selectedFlight.price * 100,
      currency: 'CNY',
      description: `航班预订: ${selectedFlight.airline}`,
      payment_method: 'wechat_pay',
      metadata: {
        flight_id: selectedFlight.id,
        weather_info: weather.data
      }
    });

    expect(order.success).toBe(true);

    // 4. 处理支付
    const payment = await paymentService.processPayment({
      order_id: order.order_id,
      payment_data: {
        payment_code: 'integration_test_code'
      }
    });

    expect(payment.success).toBe(true);

    // 5. 验证订单状态
    const finalStatus = await paymentService.getOrderStatus(order.order_id);
    expect(finalStatus.status).toBe('completed');
  });

  test('错误恢复和重试机制', async () => {
    // 模拟网络错误
    const originalSendMessage = mcpService.sendMessage;
    let attemptCount = 0;

    mcpService.sendMessage = jest.fn().mockImplementation(async (message) => {
      attemptCount++;
      if (attemptCount < 3) {
        throw new Error('Network error');
      }
      return originalSendMessage.call(mcpService, message);
    });

    // 实现重试逻辑
    const retryRequest = async (maxRetries = 3) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await mcpService.sendMessage({
            type: 'data.exchange',
            action: 'get_weather',
            payload: { location: '北京市' }
          });
        } catch (error) {
          if (i === maxRetries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };

    const result = await retryRequest();
    expect(result.success).toBe(true);
    expect(attemptCount).toBe(3);

    // 恢复原始方法
    mcpService.sendMessage = originalSendMessage;
  });
});

describe('性能和扩展性测试', () => {
  let mcpService: MCPService;
  let paymentService: PaymentService;

  beforeAll(() => {
    mcpService = new MCPService();
    paymentService = new PaymentService();
  });

  test('并发请求处理能力', async () => {
    const concurrentRequests = 10;
    const requests = Array.from({ length: concurrentRequests }, (_, i) => 
      mcpService.sendMessage({
        type: 'data.exchange',
        action: 'get_weather',
        payload: { location: `城市${i}` }
      })
    );

    const startTime = Date.now();
    const results = await Promise.all(requests);
    const endTime = Date.now();

    expect(results.length).toBe(concurrentRequests);
    expect(results.every(r => r.success)).toBe(true);
    expect(endTime - startTime).toBeLessThan(5000); // 应在5秒内完成
  });

  test('大量订单创建性能', async () => {
    const orderCount = 50;
    const orders = Array.from({ length: orderCount }, (_, i) => 
      paymentService.createOrder({
        user_id: `perf_test_user_${i}`,
        amount: 1000 + i,
        currency: 'CNY',
        description: `性能测试订单 ${i}`,
        payment_method: 'wechat_pay'
      })
    );

    const startTime = Date.now();
    const results = await Promise.all(orders);
    const endTime = Date.now();

    expect(results.length).toBe(orderCount);
    expect(results.every(r => r.success)).toBe(true);
    expect(endTime - startTime).toBeLessThan(10000); // 应在10秒内完成
  });

  test('内存使用情况', async () => {
    const initialMemory = process.memoryUsage().heapUsed;

    // 执行大量操作
    for (let i = 0; i < 100; i++) {
      await mcpService.sendMessage({
        type: 'data.exchange',
        action: 'get_weather',
        payload: { location: `测试城市${i}` }
      });
    }

    // 强制垃圾回收（如果可用）
    if (global.gc) {
      global.gc();
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;

    // 内存增长应该在合理范围内（小于50MB）
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });
});