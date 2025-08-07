/**
 * 智能体管理API路由
 * 处理智能体的创建、查询、更新、状态监控等操作
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取所有智能体
 * GET /api/agents
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id, status, type } = req.query;

    let query = supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (project_id) {
      query = query.eq('project_id', project_id);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (type) {
      query = query.eq('type', type);
    }

    const { data: agents, error } = await query;

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: agents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agents'
    });
  }
});

/**
 * 根据ID获取智能体详情
 * GET /api/agents/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
      return;
    }

    res.json({
      success: true,
      data: agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agent'
    });
  }
});

/**
 * 创建新智能体
 * POST /api/agents
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      type,
      project_id,
      config,
      capabilities
    } = req.body;

    // 验证必填字段
    if (!name || !type || !project_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, type, project_id'
      });
      return;
    }

    const { data: agent, error } = await supabase
      .from('agents')
      .insert({
        name,
        description,
        type,
        project_id,
        config: config || {},
        capabilities: capabilities || [],
        status: 'inactive'
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create agent'
    });
  }
});

/**
 * 更新智能体
 * PUT /api/agents/:id
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      config,
      capabilities,
      status
    } = req.body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (config !== undefined) updateData.config = config;
    if (capabilities !== undefined) updateData.capabilities = capabilities;
    if (status !== undefined) updateData.status = status;

    const { data: agent, error } = await supabase
      .from('agents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update agent'
    });
  }
});

/**
 * 启动智能体
 * POST /api/agents/:id/start
 */
router.post('/:id/start', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 更新智能体状态为活跃
    const { data: agent, error } = await supabase
      .from('agents')
      .update({
        status: 'active',
        last_active_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    // 记录智能体日志
    await supabase
      .from('agent_logs')
      .insert({
        agent_id: id,
        level: 'info',
        message: 'Agent started',
        metadata: {
          action: 'start',
          timestamp: new Date().toISOString()
        }
      });

    res.json({
      success: true,
      data: agent,
      message: 'Agent started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start agent'
    });
  }
});

/**
 * 停止智能体
 * POST /api/agents/:id/stop
 */
router.post('/:id/stop', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 更新智能体状态为非活跃
    const { data: agent, error } = await supabase
      .from('agents')
      .update({
        status: 'inactive',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    // 记录智能体日志
    await supabase
      .from('agent_logs')
      .insert({
        agent_id: id,
        level: 'info',
        message: 'Agent stopped',
        metadata: {
          action: 'stop',
          timestamp: new Date().toISOString()
        }
      });

    res.json({
      success: true,
      data: agent,
      message: 'Agent stopped successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to stop agent'
    });
  }
});

/**
 * 获取智能体状态
 * GET /api/agents/:id/status
 */
router.get('/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data: agent, error } = await supabase
      .from('agents')
      .select('id, name, status, last_active_at, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
      return;
    }

    // 获取最近的日志
    const { data: recentLogs } = await supabase
      .from('agent_logs')
      .select('*')
      .eq('agent_id', id)
      .order('created_at', { ascending: false })
      .limit(10);

    res.json({
      success: true,
      data: {
        ...agent,
        recent_logs: recentLogs || []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agent status'
    });
  }
});

/**
 * 获取智能体日志
 * GET /api/agents/:id/logs
 */
router.get('/:id/logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit = 100, offset = 0, level } = req.query;

    let query = supabase
      .from('agent_logs')
      .select('*')
      .eq('agent_id', id)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (level) {
      query = query.eq('level', level);
    }

    const { data: logs, error } = await query;

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agent logs'
    });
  }
});

/**
 * 获取智能体性能指标
 * GET /api/agents/:id/metrics
 */
router.get('/:id/metrics', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { timeframe = '24h' } = req.query;

    // 计算时间范围
    const now = new Date();
    let startTime: Date;
    
    switch (timeframe) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // 获取智能体基本信息
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (!agent) {
      res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
      return;
    }

    // 获取日志统计
    const { data: logStats } = await supabase
      .from('agent_logs')
      .select('level')
      .eq('agent_id', id)
      .gte('created_at', startTime.toISOString());

    // 统计日志级别分布
    const logLevelCounts = (logStats || []).reduce((acc: any, log: any) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    // 计算活跃时间
    const totalLogs = logStats?.length || 0;
    const errorLogs = logLevelCounts.error || 0;
    const successRate = totalLogs > 0 ? ((totalLogs - errorLogs) / totalLogs * 100).toFixed(2) : '100.00';

    res.json({
      success: true,
      data: {
        agent_id: id,
        timeframe,
        metrics: {
          total_logs: totalLogs,
          log_level_distribution: logLevelCounts,
          success_rate: `${successRate}%`,
          status: agent.status,
          last_active: agent.last_active_at,
          uptime: agent.status === 'active' ? 'Running' : 'Stopped'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agent metrics'
    });
  }
});

/**
 * 删除智能体
 * DELETE /api/agents/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
      return;
    }

    res.json({
      success: true,
      message: 'Agent deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete agent'
    });
  }
});

export default router;