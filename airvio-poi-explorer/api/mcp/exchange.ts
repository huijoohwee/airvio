import { Request, Response } from 'express';
import { mcpService, MCPMessage } from '../../src/services/mcpService';
import { supabase } from '../../src/lib/supabase';

/**
 * MCP协议数据交换接口
 * POST /api/mcp/exchange
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { connection_id, action, payload } = req.body;

    // 验证必需参数
    if (!connection_id || !action) {
      return res.status(400).json({
        error: 'Missing required parameters: connection_id, action'
      });
    }

    // 验证连接是否存在且有效
    const { data: connection, error: connectionError } = await supabase
      .from('plugin_connections')
      .select('*')
      .eq('id', connection_id)
      .eq('status', 'active')
      .single();

    if (connectionError || !connection) {
      return res.status(404).json({
        error: 'Connection not found or inactive'
      });
    }

    // 构造MCP消息
    const message: MCPMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
      type: 'request',
      method: 'data.exchange',
      params: {
        connectionId: connection_id,
        action,
        payload
      }
    };

    // 发送消息并获取结果
    const result = await mcpService.sendMessage(connection_id, message);

    // 记录交换日志
    await logMCPExchange(connection_id, action, payload, result);

    return res.status(200).json({
      success: true,
      data: result,
      message_id: message.id
    });

  } catch (error) {
    console.error('MCP exchange error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * 记录MCP数据交换日志
 */
async function logMCPExchange(
  connectionId: string,
  action: string,
  payload: any,
  result: any
): Promise<void> {
  try {
    await supabase
      .from('mcp_exchange_logs')
      .insert({
        connection_id: connectionId,
        action,
        request_payload: payload,
        response_data: result,
        created_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Failed to log MCP exchange:', error);
  }
}