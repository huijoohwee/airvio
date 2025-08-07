/**
 * MCP协议和支付系统集成示例
 * 展示如何在实际应用中使用这些接口
 */

import { MCPService } from '../src/services/mcpService';
import { PaymentService } from '../src/services/paymentService';

// 初始化服务
const mcpService = new MCPService();
const paymentService = new PaymentService();

/**
 * 示例1: 旅游套餐预订流程
 * 包含航班搜索、酒店查询、天气信息获取和支付处理
 */
export async function travelPackageBooking() {
  try {
    console.log('=== 开始旅游套餐预订流程 ===');
    
    // 1. 搜索航班信息
    console.log('1. 搜索航班...');
    const flightResponse = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'search_flights',
      payload: {
        origin: 'PEK',
        destination: 'SHA',
        departure_date: '2024-02-15',
        return_date: '2024-02-20',
        passengers: 2
      }
    });
    
    console.log('找到航班:', flightResponse.data.flights.length, '个选项');
    const selectedFlight = flightResponse.data.flights[0];
    
    // 2. 搜索酒店
    console.log('2. 搜索酒店...');
    const hotelResponse = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'search_hotels',
      payload: {
        location: '上海市',
        check_in: '2024-02-15',
        check_out: '2024-02-20',
        guests: 2,
        rooms: 1
      }
    });
    
    console.log('找到酒店:', hotelResponse.data.hotels.length, '个选项');
    const selectedHotel = hotelResponse.data.hotels[0];
    
    // 3. 获取目的地天气信息
    console.log('3. 获取天气信息...');
    const weatherResponse = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'get_weather',
      payload: {
        location: '上海市',
        date: '2024-02-15'
      }
    });
    
    console.log('天气信息:', weatherResponse.data.temperature, '°C,', weatherResponse.data.description);
    
    // 4. 计算总价格
    const totalAmount = selectedFlight.price + selectedHotel.price;
    console.log('套餐总价:', totalAmount, '元');
    
    // 5. 创建支付订单
    console.log('4. 创建支付订单...');
    const order = await paymentService.createOrder({
      user_id: 'user_123456',
      amount: totalAmount * 100, // 转换为分
      currency: 'CNY',
      description: `旅游套餐: ${selectedFlight.airline} + ${selectedHotel.name}`,
      payment_method: 'wechat_pay',
      metadata: {
        flight_id: selectedFlight.id,
        hotel_id: selectedHotel.id,
        package_type: 'flight_hotel'
      }
    });
    
    console.log('订单创建成功:', order.order_number);
    
    // 6. 处理支付
    console.log('5. 处理支付...');
    const paymentResult = await paymentService.processPayment({
      order_id: order.id,
      payment_data: {
        payment_code: 'wx_pay_code_123',
        user_openid: 'openid_123456'
      }
    });
    
    if (paymentResult.success) {
      console.log('支付成功! 交易ID:', paymentResult.transaction_id);
      console.log('=== 预订完成 ===');
      
      return {
        success: true,
        order_id: order.id,
        flight: selectedFlight,
        hotel: selectedHotel,
        weather: weatherResponse.data,
        total_amount: totalAmount
      };
    } else {
      throw new Error('支付失败');
    }
    
  } catch (error) {
    console.error('预订流程出错:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 示例2: 货币转换和国际支付
 * 展示多币种支付和汇率转换功能
 */
export async function internationalPayment() {
  try {
    console.log('=== 国际支付示例 ===');
    
    // 1. 获取汇率信息
    console.log('1. 获取汇率...');
    const exchangeResponse = await mcpService.sendMessage({
      type: 'data.exchange',
      action: 'convert_currency',
      payload: {
        from: 'USD',
        to: 'CNY',
        amount: 100
      }
    });
    
    const convertedAmount = exchangeResponse.data.converted_amount;
    console.log('100 USD =', convertedAmount, 'CNY');
    
    // 2. 创建美元订单
    const usdOrder = await paymentService.createOrder({
      user_id: 'user_international',
      amount: 10000, // 100.00 USD
      currency: 'USD',
      description: '国际旅游保险',
      payment_method: 'credit_card',
      metadata: {
        insurance_type: 'travel',
        coverage_period: '30_days'
      }
    });
    
    console.log('美元订单创建:', usdOrder.order_number);
    
    // 3. 处理信用卡支付
    const cardPayment = await paymentService.processPayment({
      order_id: usdOrder.id,
      payment_data: {
        card_number: '4111111111111111',
        expiry_month: '12',
        expiry_year: '2025',
        cvv: '123',
        cardholder_name: 'John Doe'
      }
    });
    
    console.log('信用卡支付结果:', cardPayment.success ? '成功' : '失败');
    
    return {
      success: cardPayment.success,
      exchange_rate: exchangeResponse.data.rate,
      usd_amount: 100,
      cny_equivalent: convertedAmount
    };
    
  } catch (error) {
    console.error('国际支付出错:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 示例3: 订单状态监控和退款处理
 * 展示订单生命周期管理
 */
export async function orderLifecycleManagement(orderId: string) {
  try {
    console.log('=== 订单生命周期管理 ===');
    
    // 1. 查询订单状态
    console.log('1. 查询订单状态...');
    const orderStatus = await paymentService.getOrderStatus(orderId);
    console.log('当前状态:', orderStatus.status);
    
    // 2. 如果订单已完成，演示退款流程
    if (orderStatus.status === 'completed') {
      console.log('2. 申请部分退款...');
      
      // 申请50%退款
      const refundAmount = Math.floor(orderStatus.amount / 2);
      const refundResult = await paymentService.requestRefund({
        order_id: orderId,
        amount: refundAmount,
        reason: '用户取消部分服务'
      });
      
      console.log('退款申请结果:', refundResult.success ? '成功' : '失败');
      
      if (refundResult.success) {
        console.log('退款ID:', refundResult.refund_id);
      }
      
      return {
        success: true,
        original_amount: orderStatus.amount,
        refund_amount: refundAmount,
        refund_id: refundResult.refund_id
      };
    } else {
      console.log('订单状态不允许退款:', orderStatus.status);
      return {
        success: false,
        reason: 'Order status does not allow refund'
      };
    }
    
  } catch (error) {
    console.error('订单管理出错:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 示例4: 批量操作和错误处理
 * 展示如何处理多个并发请求和错误恢复
 */
export async function batchOperationsExample() {
  try {
    console.log('=== 批量操作示例 ===');
    
    // 1. 并发搜索多个目的地的信息
    const destinations = ['北京', '上海', '广州', '深圳'];
    
    console.log('1. 并发查询多个城市天气...');
    const weatherPromises = destinations.map(city => 
      mcpService.sendMessage({
        type: 'data.exchange',
        action: 'get_weather',
        payload: { location: city }
      }).catch(error => ({ error: error.message, city }))
    );
    
    const weatherResults = await Promise.all(weatherPromises);
    
    // 2. 处理结果和错误
    const successfulResults = weatherResults.filter(result => !result.error);
    const failedResults = weatherResults.filter(result => result.error);
    
    console.log('成功查询:', successfulResults.length, '个城市');
    console.log('查询失败:', failedResults.length, '个城市');
    
    // 3. 重试失败的请求
    if (failedResults.length > 0) {
      console.log('2. 重试失败的请求...');
      
      for (const failed of failedResults) {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
          const retryResult = await mcpService.sendMessage({
            type: 'data.exchange',
            action: 'get_weather',
            payload: { location: failed.city }
          });
          console.log('重试成功:', failed.city);
          successfulResults.push(retryResult);
        } catch (retryError) {
          console.log('重试仍失败:', failed.city, retryError.message);
        }
      }
    }
    
    return {
      success: true,
      total_cities: destinations.length,
      successful_queries: successfulResults.length,
      failed_queries: destinations.length - successfulResults.length,
      weather_data: successfulResults
    };
    
  } catch (error) {
    console.error('批量操作出错:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 示例5: 实时状态监控
 * 展示如何监控支付状态变化
 */
export async function realTimeStatusMonitoring(orderId: string) {
  return new Promise((resolve, reject) => {
    console.log('=== 实时状态监控 ===');
    console.log('开始监控订单:', orderId);
    
    let attempts = 0;
    const maxAttempts = 30; // 最多检查30次
    const interval = 2000; // 每2秒检查一次
    
    const checkStatus = async () => {
      try {
        attempts++;
        console.log(`检查状态 (${attempts}/${maxAttempts})...`);
        
        const status = await paymentService.getOrderStatus(orderId);
        console.log('当前状态:', status.status);
        
        // 如果状态已完成或失败，停止监控
        if (status.status === 'completed' || status.status === 'failed' || status.status === 'cancelled') {
          console.log('订单状态已确定:', status.status);
          clearInterval(statusInterval);
          resolve({
            success: true,
            final_status: status.status,
            attempts_made: attempts,
            order_details: status
          });
          return;
        }
        
        // 如果达到最大尝试次数，停止监控
        if (attempts >= maxAttempts) {
          console.log('达到最大监控次数，停止监控');
          clearInterval(statusInterval);
          resolve({
            success: false,
            reason: 'Monitoring timeout',
            last_status: status.status,
            attempts_made: attempts
          });
        }
        
      } catch (error) {
        console.error('状态检查出错:', error);
        clearInterval(statusInterval);
        reject(error);
      }
    };
    
    // 立即检查一次
    checkStatus();
    
    // 设置定时检查
    const statusInterval = setInterval(checkStatus, interval);
  });
}

/**
 * 运行所有示例
 */
export async function runAllExamples() {
  console.log('\n🚀 开始运行所有集成示例...\n');
  
  try {
    // 示例1: 旅游套餐预订
    const bookingResult = await travelPackageBooking();
    console.log('\n📋 旅游套餐预订结果:', bookingResult.success ? '✅ 成功' : '❌ 失败');
    
    // 示例2: 国际支付
    const internationalResult = await internationalPayment();
    console.log('\n💳 国际支付结果:', internationalResult.success ? '✅ 成功' : '❌ 失败');
    
    // 示例3: 订单管理（如果有成功的订单）
    if (bookingResult.success && bookingResult.order_id) {
      const managementResult = await orderLifecycleManagement(bookingResult.order_id);
      console.log('\n📊 订单管理结果:', managementResult.success ? '✅ 成功' : '❌ 失败');
    }
    
    // 示例4: 批量操作
    const batchResult = await batchOperationsExample();
    console.log('\n🔄 批量操作结果:', batchResult.success ? '✅ 成功' : '❌ 失败');
    
    console.log('\n🎉 所有示例运行完成!');
    
    return {
      booking: bookingResult,
      international: internationalResult,
      batch: batchResult
    };
    
  } catch (error) {
    console.error('\n❌ 示例运行出错:', error);
    throw error;
  }
}

// 如果直接运行此文件，执行所有示例
if (require.main === module) {
  runAllExamples()
    .then(results => {
      console.log('\n📈 最终结果:', results);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 运行失败:', error);
      process.exit(1);
    });
}