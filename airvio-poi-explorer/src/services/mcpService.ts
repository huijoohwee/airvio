import { supabase } from '../lib/supabase';
import { MCPPlugin, PluginConnection } from '../types/database';

// MCP协议消息类型
export interface MCPMessage {
  id: string;
  type: 'request' | 'response' | 'notification';
  method: string;
  params?: any;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// MCP插件能力定义
export interface MCPCapabilities {
  actions: string[];
  data_types: string[];
  version: string;
  description?: string;
}

// MCP连接状态
export type MCPConnectionStatus = 'active' | 'inactive' | 'error' | 'connecting';

class MCPService {
  private connections: Map<string, PluginConnection> = new Map();
  private messageHandlers: Map<string, (message: MCPMessage) => Promise<any>> = new Map();

  constructor() {
    this.initializeDefaultHandlers();
  }

  /**
   * 初始化默认消息处理器
   */
  private initializeDefaultHandlers() {
    // 插件注册处理器
    this.messageHandlers.set('plugin.register', this.handlePluginRegister.bind(this));
    
    // 插件连接处理器
    this.messageHandlers.set('plugin.connect', this.handlePluginConnect.bind(this));
    
    // 插件断开处理器
    this.messageHandlers.set('plugin.disconnect', this.handlePluginDisconnect.bind(this));
    
    // 数据交换处理器
    this.messageHandlers.set('data.exchange', this.handleDataExchange.bind(this));
    
    // 状态查询处理器
    this.messageHandlers.set('status.query', this.handleStatusQuery.bind(this));
  }

  /**
   * 注册新的MCP插件
   */
  async registerPlugin(pluginData: {
    name: string;
    version: string;
    capabilities: MCPCapabilities;
    description?: string;
  }): Promise<MCPPlugin> {
    try {
      const { data, error } = await supabase
        .from('mcp_plugins')
        .insert({
          name: pluginData.name,
          version: pluginData.version,
          capabilities: pluginData.capabilities,
          description: pluginData.description,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to register plugin:', error);
      throw new Error('Plugin registration failed');
    }
  }

  /**
   * 获取所有可用插件
   */
  async getAvailablePlugins(): Promise<MCPPlugin[]> {
    try {
      const { data, error } = await supabase
        .from('mcp_plugins')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch plugins:', error);
      return [];
    }
  }

  /**
   * 建立插件连接
   */
  async connectPlugin(userId: string, pluginId: string, config: any = {}): Promise<PluginConnection> {
    try {
      // 检查插件是否存在
      const { data: plugin, error: pluginError } = await supabase
        .from('mcp_plugins')
        .select('*')
        .eq('id', pluginId)
        .eq('is_active', true)
        .single();

      if (pluginError || !plugin) {
        throw new Error('Plugin not found or inactive');
      }

      // 创建连接记录
      const { data, error } = await supabase
        .from('plugin_connections')
        .insert({
          user_id: userId,
          plugin_id: pluginId,
          config,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      // 缓存连接
      this.connections.set(data.id, data);
      
      return data;
    } catch (error) {
      console.error('Failed to connect plugin:', error);
      throw new Error('Plugin connection failed');
    }
  }

  /**
   * 断开插件连接
   */
  async disconnectPlugin(connectionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('plugin_connections')
        .update({ status: 'inactive' })
        .eq('id', connectionId);

      if (error) throw error;

      // 从缓存中移除
      this.connections.delete(connectionId);
    } catch (error) {
      console.error('Failed to disconnect plugin:', error);
      throw new Error('Plugin disconnection failed');
    }
  }

  /**
   * 获取用户的插件连接
   */
  async getUserConnections(userId: string): Promise<PluginConnection[]> {
    try {
      const { data, error } = await supabase
        .from('plugin_connections')
        .select(`
          *,
          mcp_plugins!inner(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch user connections:', error);
      return [];
    }
  }

  /**
   * 发送MCP消息
   */
  async sendMessage(connectionId: string, message: MCPMessage): Promise<any> {
    try {
      const connection = this.connections.get(connectionId);
      if (!connection || connection.status !== 'active') {
        throw new Error('Invalid or inactive connection');
      }

      // 处理消息
      const handler = this.messageHandlers.get(message.method);
      if (!handler) {
        throw new Error(`Unknown method: ${message.method}`);
      }

      const result = await handler(message);
      
      // 更新最后使用时间
      await this.updateConnectionLastUsed(connectionId);
      
      return result;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * 处理插件注册消息
   */
  private async handlePluginRegister(message: MCPMessage): Promise<any> {
    const { name, version, capabilities, description } = message.params;
    return await this.registerPlugin({ name, version, capabilities, description });
  }

  /**
   * 处理插件连接消息
   */
  private async handlePluginConnect(message: MCPMessage): Promise<any> {
    const { userId, pluginId, config } = message.params;
    return await this.connectPlugin(userId, pluginId, config);
  }

  /**
   * 处理插件断开消息
   */
  private async handlePluginDisconnect(message: MCPMessage): Promise<any> {
    const { connectionId } = message.params;
    await this.disconnectPlugin(connectionId);
    return { success: true };
  }

  /**
   * 处理数据交换消息
   */
  private async handleDataExchange(message: MCPMessage): Promise<any> {
    const { connectionId, action, payload } = message.params;
    
    // 这里可以根据不同的action执行不同的数据处理逻辑
    // 例如：航班搜索、酒店预订、天气查询等
    
    switch (action) {
      case 'search_flights':
        return await this.handleFlightSearch(payload);
      case 'search_hotels':
        return await this.handleHotelSearch(payload);
      case 'get_weather':
        return await this.handleWeatherQuery(payload);
      case 'convert_currency':
        return await this.handleCurrencyConversion(payload);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  /**
   * 处理状态查询消息
   */
  private async handleStatusQuery(message: MCPMessage): Promise<any> {
    const { connectionId } = message.params;
    const connection = this.connections.get(connectionId);
    
    if (!connection) {
      return { status: 'not_found' };
    }
    
    return {
      status: connection.status,
      last_used: connection.last_used_at,
      config: connection.config
    };
  }

  /**
   * 更新连接最后使用时间
   */
  private async updateConnectionLastUsed(connectionId: string): Promise<void> {
    try {
      await supabase
        .from('plugin_connections')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', connectionId);
    } catch (error) {
      console.error('Failed to update last used time:', error);
    }
  }

  // 示例数据处理方法
  private async handleFlightSearch(payload: any): Promise<any> {
    // 模拟航班搜索
    return {
      flights: [
        {
          id: 'flight_001',
          airline: 'China Airlines',
          departure: payload.origin,
          arrival: payload.destination,
          price: 1200,
          duration: '2h 30m'
        }
      ]
    };
  }

  private async handleHotelSearch(payload: any): Promise<any> {
    // 模拟酒店搜索
    return {
      hotels: [
        {
          id: 'hotel_001',
          name: 'Grand Hotel',
          location: payload.location,
          price: 200,
          rating: 4.5
        }
      ]
    };
  }

  private async handleWeatherQuery(payload: any): Promise<any> {
    // 模拟天气查询
    return {
      location: payload.location,
      temperature: 25,
      condition: 'sunny',
      humidity: 60
    };
  }

  private async handleCurrencyConversion(payload: any): Promise<any> {
    // 模拟货币转换
    const rate = 6.8; // USD to CNY
    return {
      from: payload.from,
      to: payload.to,
      amount: payload.amount,
      converted: payload.amount * rate,
      rate
    };
  }

  /**
   * 注册自定义消息处理器
   */
  registerMessageHandler(method: string, handler: (message: MCPMessage) => Promise<any>): void {
    this.messageHandlers.set(method, handler);
  }

  /**
   * 移除消息处理器
   */
  unregisterMessageHandler(method: string): void {
    this.messageHandlers.delete(method);
  }
}

// 导出单例实例
export const mcpService = new MCPService();
export default mcpService;