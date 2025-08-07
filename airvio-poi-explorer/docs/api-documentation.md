# API 接口文档

## MCP 协议接口

### 1. 数据交换接口

**接口地址：** `POST /api/mcp/exchange`

**功能描述：** 处理MCP协议的数据交换请求，支持插件间的消息传递和数据处理。

**请求参数：**

```json
{
  "connection_id": "string",     // 必需，插件连接ID
  "action": "string",           // 必需，操作类型
  "payload": "object"           // 可选，请求数据
}
```

**支持的操作类型：**

- `search_flights` - 航班搜索
- `search_hotels` - 酒店搜索
- `get_weather` - 天气查询
- `convert_currency` - 货币转换

**响应格式：**

```json
{
  "success": true,
  "data": {
    // 具体数据根据action类型而定
  },
  "message_id": "string"
}
```

**使用示例：**

```javascript
// 航班搜索示例
const response = await fetch('/api/mcp/exchange', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    connection_id: 'conn_123456',
    action: 'search_flights',
    payload: {
      origin: 'PEK',
      destination: 'SHA',
      departure_date: '2024-02-01',
      passengers: 1
    }
  })
});

const result = await response.json();
console.log(result.data.flights);
```

```javascript
// 天气查询示例
const response = await fetch('/api/mcp/exchange', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    connection_id: 'conn_123456',
    action: 'get_weather',
    payload: {
      location: '北京市'
    }
  })
});

const result = await response.json();
console.log(`当前温度: ${result.data.temperature}°C`);
```

## 支付系统接口

### 1. 创建订单

**接口地址：** `POST /api/payment/create-order`

**功能描述：** 创建支付订单，支持多种支付方式。

**请求参数：**

```json
{
  "user_id": "string",           // 必需，用户ID
  "amount": "number",            // 必需，支付金额（分）
  "currency": "string",          // 可选，货币类型，默认CNY
  "description": "string",       // 必需，订单描述
  "payment_method": "string",    // 必需，支付方式
  "metadata": "object",          // 可选，附加数据
  "callback_url": "string",      // 可选，回调地址
  "return_url": "string"         // 可选，返回地址
}
```

**支持的支付方式：**

- `wechat_pay` - 微信支付
- `alipay` - 支付宝
- `credit_card` - 信用卡支付
- `bank_transfer` - 银行转账

**响应格式：**

```json
{
  "success": true,
  "data": {
    "order_id": "string",
    "order_number": "string",
    "amount": "number",
    "currency": "string",
    "status": "pending",
    "payment_data": {
      // 支付相关数据，根据支付方式不同而不同
    },
    "created_at": "string"
  }
}
```

**使用示例：**

```javascript
// 创建微信支付订单
const response = await fetch('/api/payment/create-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'user_123',
    amount: 9900, // 99.00元
    currency: 'CNY',
    description: '旅游套餐预订',
    payment_method: 'wechat_pay',
    metadata: {
      package_id: 'pkg_456',
      booking_date: '2024-02-01'
    }
  })
});

const result = await response.json();
console.log('订单创建成功:', result.data.order_number);
```

### 2. 处理支付

**接口地址：** `POST /api/payment/process`

**功能描述：** 处理支付请求，完成支付流程。

**请求参数：**

```json
{
  "order_id": "string",          // 必需，订单ID
  "payment_data": "object",      // 必需，支付数据
  "verification_code": "string"  // 可选，验证码
}
```

**响应格式：**

```json
{
  "success": true,
  "data": {
    "transaction_id": "string",
    "status": "completed"
  },
  "message": "Payment processed successfully"
}
```

### 3. 查询订单状态

**接口地址：** `GET /api/payment/status/:orderId`

**功能描述：** 查询指定订单的支付状态。

**响应格式：**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "order_number": "string",
    "amount": "number",
    "currency": "string",
    "description": "string",
    "status": "completed",
    "payment_method": "string",
    "created_at": "string",
    "updated_at": "string",
    "completed_at": "string",
    "metadata": "object"
  }
}
```

**使用示例：**

```javascript
// 查询订单状态
const response = await fetch('/api/payment/status/order_123456');
const result = await response.json();

if (result.data.status === 'completed') {
  console.log('支付成功！');
} else if (result.data.status === 'pending') {
  console.log('支付处理中...');
} else {
  console.log('支付失败或已取消');
}
```

### 4. 申请退款

**接口地址：** `POST /api/payment/refund`

**功能描述：** 申请订单退款，支持全额和部分退款。

**请求参数：**

```json
{
  "order_id": "string",    // 必需，订单ID
  "amount": "number",      // 可选，退款金额，不传则全额退款
  "reason": "string"       // 必需，退款原因
}
```

**响应格式：**

```json
{
  "success": true,
  "data": {
    "refund_id": "string",
    "message": "Refund request submitted successfully"
  }
}
```

### 5. 支付回调

**接口地址：** `POST /api/payment/callback/:method`

**功能描述：** 处理支付网关的回调通知，更新订单状态。

**路径参数：**

- `method` - 支付方式（wechat_pay, alipay, credit_card等）

**请求体：** 根据不同支付方式的回调格式

**响应格式：** 根据支付方式返回相应的确认格式

## 错误处理

所有接口在出现错误时都会返回统一的错误格式：

```json
{
  "error": "错误类型",
  "message": "详细错误信息"
}
```

**常见错误码：**

- `400` - 请求参数错误
- `401` - 未授权访问
- `404` - 资源不存在
- `405` - 请求方法不允许
- `500` - 服务器内部错误

## 认证和安全

1. **API密钥认证：** 所有接口调用都需要在请求头中包含有效的API密钥
2. **签名验证：** 支付回调接口会验证来源签名确保安全性
3. **HTTPS加密：** 生产环境必须使用HTTPS协议
4. **频率限制：** 接口调用有频率限制，防止滥用

## SDK 使用示例

### JavaScript SDK

```javascript
import { MCPService, PaymentService } from '@airvio/sdk';

// 初始化服务
const mcpService = new MCPService({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.airvio.com'
});

const paymentService = new PaymentService({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.airvio.com'
});

// MCP数据交换
const flightData = await mcpService.exchange({
  connectionId: 'conn_123',
  action: 'search_flights',
  payload: {
    origin: 'PEK',
    destination: 'SHA'
  }
});

// 创建支付订单
const order = await paymentService.createOrder({
  userId: 'user_123',
  amount: 9900,
  description: '旅游套餐',
  paymentMethod: 'wechat_pay'
});

// 查询订单状态
const status = await paymentService.getOrderStatus(order.orderId);
```

### React Hook 示例

```javascript
import { usePayment, useMCP } from '@airvio/react-hooks';

function BookingComponent() {
  const { createOrder, processPayment, orderStatus } = usePayment();
  const { exchangeData } = useMCP();

  const handleBooking = async () => {
    // 搜索航班
    const flights = await exchangeData({
      action: 'search_flights',
      payload: { origin: 'PEK', destination: 'SHA' }
    });

    // 创建订单
    const order = await createOrder({
      amount: 9900,
      description: '航班预订',
      paymentMethod: 'wechat_pay'
    });

    // 处理支付
    await processPayment(order.orderId, paymentData);
  };

  return (
    <div>
      <button onClick={handleBooking}>预订航班</button>
      {orderStatus && <div>订单状态: {orderStatus}</div>}
    </div>
  );
}
```

## 测试环境

**测试基础URL：** `https://api-test.airvio.com`

**测试API密钥：** `test_key_123456789`

**测试支付方式：** 在测试环境中，所有支付都会模拟成功，不会产生实际费用。

**测试数据：** 可以使用以下测试数据进行接口调试：

```javascript
// 测试用户ID
const testUserId = 'test_user_123';

// 测试连接ID
const testConnectionId = 'test_conn_456';

// 测试订单金额
const testAmount = 100; // 1.00元
```