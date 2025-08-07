/**
 * 监控和日志管理API路由
 * 处理智能体监控、系统日志、性能指标等功能
 */
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

/**
 * 获取系统概览统计
 * GET /api/monitoring/overview
 */
router.get('/overview', async (req: Request, res: Response): Promise<void> => {
  try {
    // 获取项目统计
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, status');

    // 获取智能体统计
    const { data: agents, error: agentsError } = await supabase
      .from('agents')
      .select('id, status');

    // 获取编排统计
    const { data: orchestrations, error: orchestrationsError } = await supabase
      .from('orchestrations')
      .select('id, status');

    // 获取任务统计
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('id, status');

    if (projectsError || agentsError || orchestrationsError || tasksError) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch overview statistics'
      });
      return;
    }

    // 计算统计数据
    const overview = {
      projects: {
        total: projects?.length || 0,
        active: projects?.filter(p => p.status === 'active').length || 0,
        inactive: projects?.filter(p => p.status === 'inactive').length || 0
      },
      agents: {
        total: agents?.length || 0,
        running: agents?.filter(a => a.status === 'running').length || 0,
        stopped: agents?.filter(a => a.status === 'stopped').length || 0,
        error: agents?.filter(a => a.status === 'error').length || 0
      },
      orchestrations: {
        total: orchestrations?.length || 0,
        running: orchestrations?.filter(o => o.status === 'running').length || 0,
        completed: orchestrations?.filter(o => o.status === 'completed').length || 0,
        failed: orchestrations?.filter(o => o.status === 'failed').length || 0
      },
      tasks: {
        total: tasks?.length || 0,
        pending: tasks?.filter(t => t.status === 'pending').length || 0,
        running: tasks?.filter(t => t.status === 'running').length || 0,
        completed: tasks?.filter(t => t.status === 'completed').length || 0,
        failed: tasks?.filter(t => t.status === 'failed').length || 0
      }
    };

    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system overview'
    });
  }
});

/**
 * 获取智能体日志
 * GET /api/monitoring/agent-logs
 */
router.get('/agent-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      agent_id,
      level,
      start_date,
      end_date,
      limit = 100,
      offset = 0
    } = req.query;

    let query = supabase
      .from('agent_logs')
      .select(`
        *,
        agents(name, type)
      `)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (agent_id) {
      query = query.eq('agent_id', agent_id);
    }
    if (level) {
      query = query.eq('level', level);
    }
    if (start_date) {
      query = query.gte('created_at', start_date);
    }
    if (end_date) {
      query = query.lte('created_at', end_date);
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
 * 获取任务日志
 * GET /api/monitoring/task-logs
 */
router.get('/task-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      task_id,
      orchestration_id,
      level,
      start_date,
      end_date,
      limit = 100,
      offset = 0
    } = req.query;

    let query = supabase
      .from('task_logs')
      .select(`
        *,
        tasks(name, type),
        orchestrations(name)
      `)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (task_id) {
      query = query.eq('task_id', task_id);
    }
    if (orchestration_id) {
      query = query.eq('orchestration_id', orchestration_id);
    }
    if (level) {
      query = query.eq('level', level);
    }
    if (start_date) {
      query = query.gte('created_at', start_date);
    }
    if (end_date) {
      query = query.lte('created_at', end_date);
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
      error: 'Failed to fetch task logs'
    });
  }
});

/**
 * 获取性能指标
 * GET /api/monitoring/metrics
 */
router.get('/metrics', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      agent_id,
      orchestration_id,
      metric_type,
      start_date,
      end_date,
      interval = '1h'
    } = req.query;

    // 模拟性能指标数据（实际项目中应该从监控系统获取）
    const metrics = {
      cpu_usage: generateMetricData('cpu_usage', start_date as string, end_date as string, interval as string),
      memory_usage: generateMetricData('memory_usage', start_date as string, end_date as string, interval as string),
      response_time: generateMetricData('response_time', start_date as string, end_date as string, interval as string),
      throughput: generateMetricData('throughput', start_date as string, end_date as string, interval as string),
      error_rate: generateMetricData('error_rate', start_date as string, end_date as string, interval as string)
    };

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch performance metrics'
    });
  }
});

/**
 * 获取实时状态
 * GET /api/monitoring/realtime-status
 */
router.get('/realtime-status', async (req: Request, res: Response): Promise<void> => {
  try {
    // 获取当前运行中的智能体
    const { data: runningAgents, error: agentsError } = await supabase
      .from('agents')
      .select('id, name, type, status, last_heartbeat')
      .eq('status', 'running');

    // 获取当前运行中的编排
    const { data: runningOrchestrations, error: orchestrationsError } = await supabase
      .from('orchestrations')
      .select('id, name, status, started_at')
      .eq('status', 'running');

    // 获取最近的错误日志
    const { data: recentErrors, error: errorsError } = await supabase
      .from('agent_logs')
      .select(`
        *,
        agents(name, type)
      `)
      .eq('level', 'error')
      .order('created_at', { ascending: false })
      .limit(10);

    if (agentsError || orchestrationsError || errorsError) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch realtime status'
      });
      return;
    }

    // 计算系统健康状态
    const healthStatus = calculateSystemHealth(runningAgents, runningOrchestrations, recentErrors);

    res.json({
      success: true,
      data: {
        running_agents: runningAgents,
        running_orchestrations: runningOrchestrations,
        recent_errors: recentErrors,
        health_status: healthStatus,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch realtime status'
    });
  }
});

/**
 * 创建智能体日志
 * POST /api/monitoring/agent-logs
 */
router.post('/agent-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      agent_id,
      level,
      message,
      metadata
    } = req.body;

    if (!agent_id || !level || !message) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: agent_id, level, message'
      });
      return;
    }

    const { data: log, error } = await supabase
      .from('agent_logs')
      .insert({
        agent_id,
        level,
        message,
        metadata: metadata || {}
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
      data: log
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create agent log'
    });
  }
});

/**
 * 创建任务日志
 * POST /api/monitoring/task-logs
 */
router.post('/task-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      task_id,
      orchestration_id,
      level,
      message,
      metadata
    } = req.body;

    if (!task_id || !orchestration_id || !level || !message) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: task_id, orchestration_id, level, message'
      });
      return;
    }

    const { data: log, error } = await supabase
      .from('task_logs')
      .insert({
        task_id,
        orchestration_id,
        level,
        message,
        metadata: metadata || {}
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
      data: log
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task log'
    });
  }
});

/**
 * 获取告警规则
 * GET /api/monitoring/alerts
 */
router.get('/alerts', async (req: Request, res: Response): Promise<void> => {
  try {
    // 模拟告警规则数据（实际项目中应该从数据库获取）
    const alerts = [
      {
        id: '1',
        name: 'High CPU Usage',
        type: 'metric',
        condition: 'cpu_usage > 80',
        severity: 'warning',
        enabled: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Agent Offline',
        type: 'status',
        condition: 'agent_status = offline',
        severity: 'critical',
        enabled: true,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'High Error Rate',
        type: 'metric',
        condition: 'error_rate > 5',
        severity: 'error',
        enabled: true,
        created_at: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts'
    });
  }
});

/**
 * 获取系统健康检查
 * GET /api/monitoring/health
 */
router.get('/health', async (req: Request, res: Response): Promise<void> => {
  try {
    // 检查数据库连接
    const { data: dbCheck, error: dbError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: dbError ? 'unhealthy' : 'healthy',
          response_time: Math.random() * 100 + 10, // 模拟响应时间
          error: dbError?.message || null
        },
        api: {
          status: 'healthy',
          response_time: Math.random() * 50 + 5,
          uptime: process.uptime()
        }
      },
      version: process.env.npm_package_version || '1.0.0'
    };

    // 如果有服务不健康，整体状态为不健康
    if (Object.values(health.services).some(service => service.status === 'unhealthy')) {
      health.status = 'unhealthy';
    }

    res.json({
      success: true,
      data: health
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to perform health check'
    });
  }
});

// 辅助函数：生成模拟指标数据
function generateMetricData(metricType: string, startDate: string, endDate: string, interval: string) {
  const data = [];
  const start = startDate ? new Date(startDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
  const end = endDate ? new Date(endDate) : new Date();
  const intervalMs = getIntervalMs(interval);

  for (let time = start.getTime(); time <= end.getTime(); time += intervalMs) {
    let value;
    switch (metricType) {
      case 'cpu_usage':
        value = Math.random() * 100;
        break;
      case 'memory_usage':
        value = Math.random() * 100;
        break;
      case 'response_time':
        value = Math.random() * 1000 + 100;
        break;
      case 'throughput':
        value = Math.random() * 1000;
        break;
      case 'error_rate':
        value = Math.random() * 10;
        break;
      default:
        value = Math.random() * 100;
    }

    data.push({
      timestamp: new Date(time).toISOString(),
      value: Math.round(value * 100) / 100
    });
  }

  return data;
}

// 辅助函数：获取时间间隔毫秒数
function getIntervalMs(interval: string): number {
  const intervalMap: { [key: string]: number } = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '6h': 6 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000
  };
  return intervalMap[interval] || intervalMap['1h'];
}

// 辅助函数：计算系统健康状态
function calculateSystemHealth(runningAgents: any[], runningOrchestrations: any[], recentErrors: any[]) {
  let score = 100;
  let status = 'healthy';
  const issues = [];

  // 检查运行中的智能体数量
  if (runningAgents.length === 0) {
    score -= 30;
    issues.push('No agents are currently running');
  }

  // 检查最近的错误
  const recentErrorCount = recentErrors.filter(error => {
    const errorTime = new Date(error.created_at).getTime();
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    return errorTime > oneHourAgo;
  }).length;

  if (recentErrorCount > 10) {
    score -= 40;
    issues.push(`High error rate: ${recentErrorCount} errors in the last hour`);
  } else if (recentErrorCount > 5) {
    score -= 20;
    issues.push(`Moderate error rate: ${recentErrorCount} errors in the last hour`);
  }

  // 检查智能体心跳
  const staleAgents = runningAgents.filter(agent => {
    if (!agent.last_heartbeat) return true;
    const heartbeatTime = new Date(agent.last_heartbeat).getTime();
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return heartbeatTime < fiveMinutesAgo;
  });

  if (staleAgents.length > 0) {
    score -= 25;
    issues.push(`${staleAgents.length} agents have stale heartbeats`);
  }

  // 确定状态
  if (score >= 80) {
    status = 'healthy';
  } else if (score >= 60) {
    status = 'warning';
  } else {
    status = 'critical';
  }

  return {
    score: Math.max(0, score),
    status,
    issues
  };
}

export default router;